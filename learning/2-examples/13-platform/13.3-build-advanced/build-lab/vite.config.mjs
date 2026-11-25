import { defineConfig } from "vite";
import { buildInfoPlugin } from "./plugin.mjs";
export default defineConfig({
  base: "./",
  plugins: [buildInfoPlugin()],
  build: { outDir: "dist/app", manifest: true },
});
