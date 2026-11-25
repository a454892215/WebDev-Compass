import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import { strict as assert } from 'node:assert'
import { once } from 'node:events'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { createLab } from './server.mjs'
const require = createRequire(
  new URL('../../../../4-practice/04-frameworks/package.json', import.meta.url),
)
const playwright = await import(
  pathToFileURL(process.env.PLAYWRIGHT_MODULE || require.resolve('@playwright/test')).href
)
const { chromium } = playwright.chromium ? playwright : playwright.default
const server = createLab()
let browser
const results = []
try {
  server.listen(4401, '127.0.0.1')
  await once(server, 'listening')
  browser = await chromium.launch({
    headless: true,
    executablePath:
      process.env.CHROME_PATH ||
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  })
  for (const width of [390, 1440]) {
    const page = await browser.newPage({
      viewport: { width, height: 900 },
      acceptDownloads: true,
    })
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto('http://127.0.0.1:4401/')
    await page.getByLabel('标题查询').fill('Vue')
    await page.getByRole('button', { name: '查询', exact: true }).click()
    await page
      .getByRole('status', { name: '查询结果' })
      .filter({ hasText: '共2项' })
      .waitFor()
    assert.equal(await page.locator('#items li').count(), 2)
    await page.getByLabel('标题查询').fill('not-found')
    await page.getByRole('button', { name: '查询', exact: true }).click()
    await page
      .getByRole('status', { name: '查询结果' })
      .filter({ hasText: '无匹配资料' })
      .waitFor()
    await page.getByLabel('文本文件（最多1024字节）').setInputFiles({
      name: 'note.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('hello'),
    })
    await page.getByRole('button', { name: '上传校验', exact: true }).click()
    await page
      .getByRole('status', { name: '上传结果' })
      .filter({ hasText: '校验通过：note.txt，5字节，未保存' })
      .waitFor()
    assert.equal(
      await page.locator('#progress').evaluate((element) => element.value),
      100,
    )
    await page.getByLabel('文本文件（最多1024字节）').setInputFiles({
      name: 'large.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('a'.repeat(1025)),
    })
    await page.getByRole('button', { name: '上传校验', exact: true }).click()
    await page
      .getByRole('status', { name: '上传结果' })
      .filter({ hasText: 'HTTP 413' })
      .waitFor()
    await page.getByRole('button', { name: '准备下载' }).click()
    const link = page.getByRole('link', { name: '下载公开示例' })
    await link.waitFor()
    assert.match(await link.getAttribute('href'), /^blob:/)
    const [download] = await Promise.all([page.waitForEvent('download'), link.click()])
    assert.equal(download.suggestedFilename(), 'sample.txt')
    assert.equal(
      await readFile(await download.path(), 'utf8'),
      'Public teaching download\n',
    )
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
      false,
    )
    assert.deepEqual(errors, [])
    results.push({
      width,
      passed: true,
      observed:
        'actual search/empty, XHR upload progress100, server413, Blob object URL download, no overflow/pageerror',
    })
    await page.close()
  }
} finally {
  await browser?.close()
  server.close()
  server.closeAllConnections()
}
await mkdir(new URL('./test-results', import.meta.url), { recursive: true })
await writeFile(
  new URL('./test-results/browser.json', import.meta.url),
  JSON.stringify(results, null, 2) + '\n',
)
console.log(JSON.stringify(results, null, 2))
