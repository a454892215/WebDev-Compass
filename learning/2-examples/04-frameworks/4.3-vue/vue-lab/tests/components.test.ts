import { afterEach, describe, expect, it } from "vitest";
import {
  computed,
  defineComponent,
  effectScope,
  h,
  nextTick,
  reactive,
  readonly,
  ref,
  toRefs,
  watchEffect,
} from "vue";
import { enableAutoUnmount, flushPromises, mount } from "@vue/test-utils";
import { createPinia, setActivePinia, storeToRefs } from "pinia";
import { createMemoryHistory } from "vue-router";
import ReadingCard from "../src/components/ReadingCard.vue";
import ThemeBadge from "../src/components/ThemeBadge.vue";
import FocusInput from "../src/components/FocusInput.vue";
import CounterPanel from "../src/components/CounterPanel.vue";
import Playground from "../src/pages/Playground.vue";
import { themeKey } from "../src/context";
import { makeRouter } from "../src/router";
import { useReadingStore } from "../src/stores/reading";
import { useLatestSearch } from "../src/composables/useLatestSearch";
enableAutoUnmount(afterEach);
describe("Vue public contracts", () => {
  it("SFC setup state belongs to each component instance", async () => {
    const first = mount(CounterPanel),
      second = mount(CounterPanel);
    await first.get("button").trigger("click");
    expect(first.text()).toBe("缓存计数 1");
    expect(second.text()).toBe("缓存计数 0");
  });
  it("reactive property extraction loses connection; toRefs preserves it", () => {
    const state = reactive({ count: 1 });
    const { count } = state;
    const connected = toRefs(state);
    const double = computed(() => connected.count.value * 2);
    state.count++;
    expect(count).toBe(1);
    expect(double.value).toBe(4);
  });
  it("watchEffect tracks synchronous reads and scope disposal cleans up", async () => {
    const source = ref(0);
    const observed: number[] = [];
    let cleaned = 0;
    const scope = effectScope();
    scope.run(() =>
      watchEffect((onCleanup) => {
        observed.push(source.value);
        onCleanup(() => cleaned++);
      }),
    );
    source.value = 1;
    await nextTick();
    scope.stop();
    source.value = 2;
    await nextTick();
    expect(observed).toEqual([0, 1]);
    expect(cleaned).toBe(2);
  });
  it("props, emit, named model and scoped slot retain contracts", async () => {
    const wrapper = mount(ReadingCard, {
      props: {
        item: { id: "1", title: "<b>safe</b>", done: false },
        draft: "",
      },
      slots: { meta: ({ id }: { id: string }) => h("span", `slot:${id}`) },
    });
    expect(wrapper.find("h3 b").exists()).toBe(false);
    expect(wrapper.text()).toContain("slot:1");
    await wrapper.get("input").setValue("draft");
    expect(wrapper.emitted("update:draft")).toEqual([["draft"]]);
    await wrapper.get("button").trigger("click");
    expect(wrapper.emitted("toggle")).toEqual([["1"]]);
    await wrapper.setProps({ item: { id: "1", title: "next", done: true } });
    expect(wrapper.get("button").attributes("aria-pressed")).toBe("true");
  });
  it("inject uses provider ref and provider-owned mutation", async () => {
    const value = ref<"light" | "dark">("light");
    const wrapper = mount(ThemeBadge, {
      global: {
        provide: {
          [themeKey as symbol]: {
            value: readonly(value),
            toggle: () => {
              value.value = "dark";
            },
          },
        },
      },
    });
    await wrapper.get("button").trigger("click");
    expect(wrapper.text()).toContain("dark");
  });
  it("v-if ref becomes available only after update and can receive focus", async () => {
    const wrapper = mount(FocusInput, { attachTo: document.body });
    expect(wrapper.find("input").exists()).toBe(false);
    await wrapper.get("button").trigger("click");
    await nextTick();
    expect(document.activeElement).toBe(wrapper.get("input").element);
  });
  it("Pinia app instances isolate state and storeToRefs keeps getters live", () => {
    setActivePinia(createPinia());
    const first = useReadingStore();
    const { doneCount } = storeToRefs(first);
    first.toggle("1");
    expect(doneCount.value).toBe(1);
    const second = useReadingStore(createPinia());
    expect(second.doneCount).toBe(0);
  });
  it("route params update reused detail and guard redirects only as UX", async () => {
    const router = makeRouter(createMemoryHistory());
    await router.push("/items/1");
    await router.isReady();
    const wrapper = mount(defineComponent({ template: "<RouterView />" }), {
      global: {
        plugins: [createPinia(), router],
        provide: { [themeKey as symbol]: { value: ref("light"), toggle() {} } },
      },
    });
    await flushPromises();
    expect(wrapper.text()).toContain("动态详情 1");
    await router.push("/items/2");
    await flushPromises();
    expect(wrapper.text()).toContain("动态详情 2");
    expect(wrapper.text()).toContain("路由与状态");
    await router.push("/restricted");
    expect(router.currentRoute.value.fullPath).toBe("/?denied=1");
  });
  it("KeepAlive deactivates and reactivates without discarding local count", async () => {
    const router = makeRouter(createMemoryHistory());
    await router.push("/");
    await router.isReady();
    const wrapper = mount(Playground, {
      global: {
        plugins: [createPinia(), router],
        provide: { [themeKey as symbol]: { value: ref("light"), toggle() {} } },
      },
    });
    const button = (name: string) =>
      wrapper.findAll("button").find((b) => b.text() === name)!;
    await button("缓存计数 0").trigger("click");
    await button("笔记面板").trigger("click");
    expect(wrapper.get("[data-testid=lifecycle]").text()).toContain(
      "deactivated",
    );
    await button("计数面板").trigger("click");
    expect(button("缓存计数 1").exists()).toBe(true);
    expect(
      wrapper
        .get("[data-testid=lifecycle]")
        .text()
        .match(/mounted/g)?.length,
    ).toBe(1);
  });
});
function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: Error) => void;
  const promise = new Promise<T>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}
describe("watch latest-result boundary", () => {
  it("invalidates an old result even if the loader ignores abort", async () => {
    const query = ref("first");
    const first = deferred<string[]>();
    const second = deferred<string[]>();
    const signals: AbortSignal[] = [];
    const scope = effectScope();
    const search = scope.run(() =>
      useLatestSearch(query, (q, signal) => {
        signals.push(signal);
        return q === "first" ? first.promise : second.promise;
      }),
    )!;
    query.value = "second";
    await nextTick();
    expect(signals[0]?.aborted).toBe(true);
    second.resolve(["new"]);
    await flushPromises();
    first.resolve(["old"]);
    await flushPromises();
    expect(search.results.value).toEqual(["new"]);
    scope.stop();
    expect(signals[1]?.aborted).toBe(true);
  });
  it("handles empty/error/reset and disposal without stale write", async () => {
    const query = ref("empty");
    const late = deferred<string[]>();
    const scope = effectScope();
    const search = scope.run(() =>
      useLatestSearch(query, async (q) => {
        if (q === "error") throw new Error("bad");
        if (q === "late") return late.promise;
        return [];
      }),
    )!;
    await flushPromises();
    expect(search.status.value).toBe("empty");
    query.value = "error";
    await nextTick();
    await flushPromises();
    expect(search.status.value).toBe("error");
    query.value = "";
    await nextTick();
    expect(search.status.value).toBe("idle");
    query.value = "late";
    await nextTick();
    scope.stop();
    late.resolve(["unexpected"]);
    await flushPromises();
    expect(search.results.value).toEqual([]);
  });
});
