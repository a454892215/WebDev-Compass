import { defineConfig } from '@playwright/test'
import { existsSync } from 'node:fs'
const chrome =
  process.env.CHROME_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
export default defineConfig({
  testDir: 'tests/e2e',
  workers: 1,
  retries: 0,
  timeout: 15000,
  globalTeardown: './tests/e2e/teardown.ts',
  reporter: [['list'], ['json', { outputFile: 'test-results/e2e-results.json' }]],
  use: {
    launchOptions: existsSync(chrome) ? { executablePath: chrome } : {},
    colorScheme: 'light',
  },
  projects: ['ssr', 'ssg', 'csr'].flatMap((profile, i) =>
    ['desktop', 'mobile-viewport'].map((view) => ({
      name: `${profile}-${view}`,
      use: {
        baseURL: `http://127.0.0.1:${[4507, 4510, 4511][i]}`,
        viewport:
          view === 'desktop' ? { width: 1440, height: 900 } : { width: 390, height: 844 },
      },
    })),
  ),
  webServer: [
    {
      command: 'node scripts/serve-test.mjs',
      url: 'http://127.0.0.1:4507/api/health',
      timeout: 15000,
      env: {
        NODE_ENV: 'production',
        HOST: '127.0.0.1',
        PORT: '4507',
        NUXT_PUBLIC_RELEASE_ID: 'browser-runtime',
        NUXT_PUBLIC_SITE_LABEL: 'Browser runtime',
      },
    },
    {
      command: 'node scripts/static-server.mjs ssg',
      url: 'http://127.0.0.1:4510',
      timeout: 15000,
      env: { PORT: '4510' },
    },
    {
      command: 'node scripts/static-server.mjs csr',
      url: 'http://127.0.0.1:4511',
      timeout: 15000,
      env: { PORT: '4511' },
    },
  ],
})
