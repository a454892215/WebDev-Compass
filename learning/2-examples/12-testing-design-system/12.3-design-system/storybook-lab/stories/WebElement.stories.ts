import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineCustomElement, h, ref } from "vue";
import { expect, userEvent, within } from "storybook/test";
const Counter = defineCustomElement({
  shadowRootOptions: { delegatesFocus: true },
  emits: ["changed"],
  props: { label: { type: String, default: "合成计数" } },
  setup(props, { emit }) {
    const count = ref(0);
    return () =>
      h(
        "button",
        {
          type: "button",
          onClick: () => {
            count.value++;
            emit("changed", count.value);
          },
        },
        props.label + "：" + count.value,
      );
  },
  styles: [
    ":host{display:inline-block}button{font:inherit;min-height:44px;padding:.5rem}",
  ],
});
if (!customElements.get("compass-counter"))
  customElements.define("compass-counter", Counter);
const meta = {
  title: "Compass/WebElement",
  render: () => ({
    template:
      '<div><compass-counter label="合成计数"></compass-counter><p id="event-count" aria-live="polite"></p></div>',
    mounted() {
      const host = document.querySelector("compass-counter");
      host?.addEventListener("changed", ((e: CustomEvent) => {
        document.querySelector("#event-count")!.textContent =
          "事件参数：" + e.detail[0];
      }) as EventListener);
    },
  }),
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const NativeHost: Story = {
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector("compass-counter")!;
    const button = host.shadowRoot!.querySelector("button")!;
    await userEvent.click(button);
    await expect(button).toHaveTextContent("合成计数：1");
    await expect(within(canvasElement).getByText("事件参数：1")).toBeVisible();
    canvasElement.dataset.playDone = "yes";
  },
};
