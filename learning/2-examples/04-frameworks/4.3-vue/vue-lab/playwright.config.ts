import { existsSync } from "node:fs";
import { defineConfig } from "@playwright/test";
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const executablePath =
  process.env.CHROME_PATH || (existsSync(chrome) ? chrome : undefined);
export default defineConfig({
  testDir: "./e2e",
  workers: 1,
  retries: 0,
  reporter: [["list"], ["json", { outputFile: "test-results/e2e.json" }]],
  use: {
    baseURL: "http://127.0.0.1:4301",
    headless: true,
    launchOptions: executablePath ? { executablePath } : {},
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { viewport: { width: 390, height: 844 } } },
  ],
  webServer: {
    command: "pnpm dev",
    url: "http://127.0.0.1:4301",
    reuseExistingServer: false,
    timeout: 15000,
  },
});
