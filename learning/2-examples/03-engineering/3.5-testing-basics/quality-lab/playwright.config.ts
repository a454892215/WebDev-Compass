import { existsSync } from 'node:fs'
import { defineConfig } from '@playwright/test'
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
export default defineConfig({
  testDir: './e2e',
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4203',
    headless: true,
    launchOptions: {
      executablePath:
        process.env.CHROME_PATH || (existsSync(chrome) ? chrome : undefined),
    },
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile-viewport', use: { viewport: { width: 390, height: 844 } } },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://127.0.0.1:4203',
    reuseExistingServer: false,
  },
})
