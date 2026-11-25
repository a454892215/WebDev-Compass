import { defineConfig } from '@playwright/test'
import { existsSync } from 'node:fs'
const chrome =
  process.env.CHROME_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
export default defineConfig({
  testDir: 'tests/e2e',
  globalTeardown: './tests/e2e/teardown.ts',
  workers: 1,
  retries: 0,
  timeout: 20000,
  reporter: [['list'], ['json', { outputFile: 'test-results/e2e-results.json' }]],
  use: {
    baseURL: 'http://127.0.0.1:4400',
    launchOptions: existsSync(chrome) ? { executablePath: chrome } : {},
  },
  projects: [
    {
      name: 'desktop',
      testMatch: 'ui.spec.ts',
      use: { viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'mobile-viewport',
      testMatch: 'ui.spec.ts',
      use: { viewport: { width: 390, height: 844 } },
    },
    { name: 'protocol', testMatch: 'protocol.spec.ts' },
  ],
  webServer: {
    command: 'node scripts/serve-test.mjs',
    url: 'http://127.0.0.1:4400',
    reuseExistingServer: false,
    timeout: 15000,
    env: {
      HOST: '127.0.0.1',
      PORT: '4400',
      NUXT_ALLOWED_ORIGIN: 'http://127.0.0.1:4400',
    },
  },
})
