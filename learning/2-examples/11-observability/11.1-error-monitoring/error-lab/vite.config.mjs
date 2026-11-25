import { defineConfig } from "vite";
export default defineConfig({
  build: { sourcemap: "hidden" },
  server: { host: "127.0.0.1", port: 4532 },
});
