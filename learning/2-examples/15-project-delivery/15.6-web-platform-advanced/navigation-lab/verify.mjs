import assert from 'node:assert/strict'
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from '@playwright/test'
import { createLabServer } from './serve.mjs'
const server = createLabServer()
await new Promise((resolve) => server.listen(4575, '127.0.0.1', resolve))
let browser
const checks = []
try {
  browser = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH ??
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
  })
  const page = await browser.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto('http://127.0.0.1:4575/')
  await page.waitForFunction(() => window.lab)
  assert.equal(await page.evaluate(() => !!document.startViewTransition), true)
  await page.click('#transition')
  await page.waitForFunction(() => document.activeElement?.id === 'route-heading')
  assert.equal(await page.textContent('#route-heading'), '局部详情')
  assert.equal(await page.evaluate(() => lab.state.transition), 'native')
  checks.push('15.6.1 actual ViewTransition update+finished focus')
  assert.equal(await page.evaluate(() => lab.state.navigation), 'native')
  await page.evaluate(() => (window.fixtureMarker = 'same-document'))
  await page.click('a[href="http://127.0.0.1:4575/nav/two"]')
  await page.waitForURL('**/nav/two')
  assert.equal(await page.textContent('#route-heading'), '视图二')
  assert.equal(await page.evaluate(() => window.fixtureMarker), 'same-document')
  assert.equal(await page.title(), '视图二 · 浏览器实验')
  await page.goBack()
  await page.waitForFunction(
    () => document.querySelector('#route-heading').textContent === '视图一',
  )
  assert.equal(await page.textContent('#route-heading'), '视图一')
  checks.push('15.6.2 actual intercept link+history back+title')
  const opfs = await page.evaluate(() => lab.opfsRoundTrip())
  assert.equal(opfs.text, 'synthetic-local-draft')
  assert.equal(
    await page.evaluate(async () => {
      const names = []
      for await (const name of (await navigator.storage.getDirectory()).keys())
        if (name.startsWith('compass-fixture-')) names.push(name)
      return names.length
    }),
    0,
  )
  checks.push('15.6.3 actual OPFS unique write/read/finally delete')
  const rtc = await page.evaluate(() => lab.rtcRoundTrip())
  assert.equal(rtc.text, 'synthetic-ping')
  assert.equal(await page.evaluate(() => lab.state.rtcClosed), true)
  checks.push('15.6.4 actual two-peer data channel+close')
  assert.equal((await page.evaluate(() => lab.opfsRoundTrip(true))).supported, false)
  assert.equal((await page.evaluate(() => lab.rtcRoundTrip(true))).supported, false)
  checks.push('OPFS and RTC explicit unsupported fallbacks')
  await page.goto('http://127.0.0.1:4575/?fallback=1')
  await page.click('#transition')
  await page.waitForFunction(() => document.activeElement?.id === 'route-heading')
  assert.equal(await page.evaluate(() => lab.state.transition), 'fallback')
  await page.click('a[href="http://127.0.0.1:4575/nav/two"]')
  await page.waitForURL('**/nav/two')
  assert.equal(await page.textContent('#route-heading'), '视图二')
  checks.push('15.6.1/2 forced fallback updates+ordinary document link')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.click('#transition')
  await page.waitForFunction(() => lab.state.transition === 'fallback')
  checks.push('reduced motion bypasses visual transition')
  assert.deepEqual(errors, [])
  const report = {
    checkedAt: new Date().toISOString(),
    browser: browser.version(),
    node: process.version,
    passed: checks.length,
    checks,
    errors,
    scope:
      'Headless local Chrome only; no audio/video permissions, STUN/TURN, remote peers or Nuxt router integration.',
  }
  await mkdir(new URL('./dist/', import.meta.url), { recursive: true })
  await writeFile(
    new URL('./dist/runtime.json', import.meta.url),
    JSON.stringify(report, null, 2) + '\n',
  )
  console.log(JSON.stringify(report, null, 2))
} finally {
  await browser?.close()
  await new Promise((resolve) => server.close(resolve))
}
