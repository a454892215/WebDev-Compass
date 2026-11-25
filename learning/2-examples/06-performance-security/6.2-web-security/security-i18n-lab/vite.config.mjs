import { defineConfig } from "vite";
export default defineConfig({
  base: "./",
  build: {
    sourcemap: "hidden",
    rollupOptions: { input: ["index.html", "security.html"] },
  },
});
