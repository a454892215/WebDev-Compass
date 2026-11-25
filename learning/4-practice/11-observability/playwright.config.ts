import { defineConfig } from '@playwright/test'
import { existsSync } from 'node:fs'
const chrome =
  process.env.CHROME_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
export default defineConfig({
  testDir: 'tests/e2e',
  workers: 1,
  retries: 0,
  timeout: 20000,
  globalTeardown: './tests/e2e/teardown.ts',
  reporter: [['list'], ['json', { outputFile: 'test-results/e2e-results.json' }]],
  use: {
    baseURL: 'http://127.0.0.1:4531',
    launchOptions: existsSync(chrome) ? { executablePath: chrome } : {},
  },
  projects: [
    {
      name: 'desktop',
      testMatch: 'flow.spec.ts',
      use: { viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'mobile-viewport',
      testMatch: 'flow.spec.ts',
      use: { viewport: { width: 390, height: 844 } },
    },
    { name: 'http', testMatch: 'http.spec.ts' },
  ],
  webServer: {
    command: 'node scripts/serve-test.mjs',
    url: 'http://127.0.0.1:4531/api/health',
    timeout: 15000,
    env: { NODE_ENV: 'production', HOST: '127.0.0.1', PORT: '4531' },
  },
})
