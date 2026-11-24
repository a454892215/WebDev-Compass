import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: { isCustomElement: (tag) => tag === "search" },
      },
    }),
  ],
  test: { environment: "jsdom", include: ["tests/**/*.test.ts"] },
});
