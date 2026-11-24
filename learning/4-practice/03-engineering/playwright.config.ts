import { defineConfig } from '@playwright/test'
import { existsSync } from 'node:fs'
const installedChrome =
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const executablePath =
  process.env.CHROME_PATH ||
  (existsSync(installedChrome) ? installedChrome : undefined)
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [
    ['list'],
    ['json', { outputFile: 'test-results/e2e-results.json' }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:4200',
    launchOptions: executablePath ? { executablePath } : {},
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile-viewport', use: { viewport: { width: 390, height: 844 } } },
  ],
  webServer: {
    command: 'pnpm preview',
    url: 'http://127.0.0.1:4200',
    reuseExistingServer: false,
    timeout: 15000,
  },
})
