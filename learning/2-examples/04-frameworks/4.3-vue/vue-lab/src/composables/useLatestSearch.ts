import { onScopeDispose, ref, watch, type Ref } from "vue";
export type SearchLoader = (
  query: string,
  signal: AbortSignal,
) => Promise<string[]>;
export function useLatestSearch(query: Ref<string>, loader: SearchLoader) {
  const results = ref<string[]>([]);
  const status = ref<"idle" | "loading" | "success" | "empty" | "error">(
    "idle",
  );
  let revision = 0;
  const stop = watch(
    query,
    async (value, _previous, onCleanup) => {
      const own = ++revision;
      const controller = new AbortController();
      // Register before awaiting; cleanup also invalidates loaders which ignore abort.
      onCleanup(() => {
        controller.abort();
        revision++;
      });
      results.value = [];
      if (!value.trim()) {
        status.value = "idle";
        return;
      }
      status.value = "loading";
      try {
        const data = await loader(value, controller.signal);
        if (own !== revision) return;
        results.value = data;
        status.value = data.length ? "success" : "empty";
      } catch {
        if (own !== revision) return;
        status.value = "error";
      }
    },
    { immediate: true },
  );
  onScopeDispose(stop);
  return { results, status };
}
// Explicit in-memory delayed fixture, NOT a real HTTP backend.
export const demoSearch: SearchLoader = (query, signal) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(
      () =>
        query === "error"
          ? reject(new Error("fixture failure"))
          : resolve(query === "empty" ? [] : [`结果：${query}`]),
      query === "slow" ? 120 : 15,
    );
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
