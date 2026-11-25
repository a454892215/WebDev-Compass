import type { StorybookConfig } from "@storybook/vue3-vite";
const config: StorybookConfig = {
  framework: "@storybook/vue3-vite",
  stories: ["../stories/**/*.stories.ts"],
  core: { disableTelemetry: true },
  async viteFinal(config) {
    return { ...config, resolve: { ...config.resolve, dedupe: ["vue"] } };
  },
};
export default config;
