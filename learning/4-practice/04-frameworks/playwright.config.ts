import { defineConfig } from '@playwright/test'
import { existsSync } from 'node:fs'
const chrome =
  process.env.CHROME_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
export default defineConfig({
  testDir: './tests/e2e',
  workers: 1,
  retries: 0,
  timeout: 20000,
  reporter: [['list'], ['json', { outputFile: 'test-results/e2e-results.json' }]],
  use: {
    baseURL: 'http://127.0.0.1:4300',
    launchOptions: existsSync(chrome) ? { executablePath: chrome } : {},
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'mobile-viewport', use: { viewport: { width: 390, height: 844 } } },
  ],
  webServer: {
    command: 'node .output/server/index.mjs',
    url: 'http://127.0.0.1:4300',
    reuseExistingServer: false,
    timeout: 20000,
    env: {
      HOST: '127.0.0.1',
      PORT: '4300',
      NUXT_PRIVATE_DEMO_LABEL: 'server-private-regression-marker',
      NUXT_PUBLIC_COURSE_LABEL: 'Runtime public course',
    },
  },
})
