import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests",
  testMatch: "*.spec.mjs",
  fullyParallel: true,
  workers: 2,
  retries: 0,
  reporter: "list",
  use: { baseURL: "http://127.0.0.1:4542" },
  webServer: {
    command: "node server.mjs",
    url: "http://127.0.0.1:4542/summary",
    timeout: 5000,
  },
});
