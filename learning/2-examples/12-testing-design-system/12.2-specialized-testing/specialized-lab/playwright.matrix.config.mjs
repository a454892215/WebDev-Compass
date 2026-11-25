// Template only: this matrix is not the verification record.
import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./matrix-tests",
  use: { baseURL: "http://127.0.0.1:4543" },
  webServer: {
    command: "node server.mjs",
    url: "http://127.0.0.1:4543",
    reuseExistingServer: false,
  },
  projects: [
    { name: "chromium-desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox-desktop", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit-desktop", use: { ...devices["Desktop Safari"] } },
  ],
});
