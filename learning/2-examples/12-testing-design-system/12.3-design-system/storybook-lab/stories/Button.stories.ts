import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import UiButton from "../../../../../4-practice/12-testing-design-system/lib/src/UiButton.vue";
const meta = {
  title: "Compass/UiButton",
  component: UiButton,
  args: { onClick: fn() },
  argTypes: {
    variant: { options: ["primary", "secondary"], control: "select" },
  },
  render: (args) => ({
    components: { UiButton },
    setup: () => ({ args }),
    template: '<UiButton v-bind="args">保存合成偏好</UiButton>',
  }),
} satisfies Meta<typeof UiButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: { variant: "primary" },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "保存合成偏好" });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
    await expect(button).toHaveAttribute("type", "button");
    canvasElement.dataset.playDone = "yes";
  },
};
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "保存合成偏好" });
    await expect(button).toBeDisabled();
    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
    canvasElement.dataset.playDone = "yes";
  },
};
export const DarkBrand: Story = {
  args: { variant: "secondary" },
  render: (args) => ({
    components: { UiButton },
    setup: () => ({ args }),
    template:
      '<section data-theme="dark" data-brand="plum" class="theme-panel"><h2>深色品牌示例</h2><UiButton v-bind="args">保存合成偏好</UiButton></section>',
  }),
};
