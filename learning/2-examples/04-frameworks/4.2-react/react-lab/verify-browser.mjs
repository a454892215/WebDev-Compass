import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { chromium } from '@playwright/test'
const base = 'http://127.0.0.1:4305'
const service = spawn(
  process.execPath,
  [
    'node_modules/vite/bin/vite.js',
    'preview',
    '--host',
    '127.0.0.1',
    '--port',
    '4305',
    '--strictPort',
  ],
  { cwd: new URL('.', import.meta.url), stdio: ['ignore', 'pipe', 'pipe'] },
)
let log = ''
service.stdout.on('data', (d) => (log += d))
service.stderr.on('data', (d) => (log += d))
let browser
try {
  const started = Date.now()
  while (true) {
    if (service.exitCode !== null) throw new Error('preview exited: ' + log)
    try {
      const r = await fetch(base)
      if (r.ok) break
    } catch {}
    if (Date.now() - started > 12000)
      throw new Error('preview not ready: ' + log)
    await new Promise((r) => setTimeout(r, 100))
  }
  browser = await chromium.launch({
    headless: true,
    executablePath:
      process.env.CHROME_PATH ||
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  })
  const results = []
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 1440, height: 900 },
  ]) {
    const page = await browser.newPage({ viewport })
    const errors = []
    page.on('pageerror', (e) => errors.push(e.message))
    await page.goto(base)
    await page.getByRole('button', { name: '计数 0', exact: true }).click()
    await page.getByRole('button', { name: '计数 2', exact: true }).waitFor()
    await page.getByRole('button', { name: '聚焦标题', exact: true }).click()
    assert.equal(
      await page
        .locator('#focus-input')
        .evaluate((el) => el === document.activeElement),
      true,
    )
    await page.getByRole('button', { name: '保存标题', exact: true }).click()
    await page.locator('#rhf-error').filter({ hasText: '请输入标题' }).waitFor()
    await page.getByLabel('任务标题', { exact: true }).fill('  Nuxt对照  ')
    await page.getByRole('button', { name: '保存标题', exact: true }).click()
    await page.getByText('已保存 Nuxt对照', { exact: true }).waitFor()
    await page.getByRole('link', { name: '任务7', exact: true }).click()
    await page.getByRole('heading', { name: '任务 7', exact: true }).waitFor()
    await page.getByRole('button', { name: '更新查询', exact: true }).click()
    assert(new URL(page.url()).searchParams.get('q') === 'Nuxt')
    await page.reload()
    await page.getByRole('heading', { name: '任务 7', exact: true }).waitFor()
    await page.getByRole('link', { name: '受限页', exact: true }).click()
    await page
      .getByRole('heading', { name: '登录占位：未连接认证服务', exact: true })
      .waitFor()
    await page.getByRole('link', { name: '懒报告', exact: true }).click()
    await page.getByText('懒模块已加载').last().waitFor()
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      ),
      false,
    )
    assert.deepEqual(errors, [])
    results.push({
      viewport,
      passed: true,
      cases: [
        'counter+2',
        'real focus',
        'RHF error then Zod trimmed success',
        'URL query/deep reload',
        'client redirect',
        'lazy route',
        'no overflow/pageerror',
      ],
    })
    await page.close()
  }
  console.log(
    JSON.stringify({ browser: 'local headless Chrome', results }, null, 2),
  )
} finally {
  await browser?.close()
  service.kill('SIGTERM')
}
