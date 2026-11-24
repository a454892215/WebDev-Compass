import assert from 'node:assert/strict'
import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
const modulePath = process.env.PLAYWRIGHT_MODULE
const { chromium } = await import(modulePath ? pathToFileURL(resolve(modulePath)).href : 'playwright-core')
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const base = process.env.STAGE2_BASE_URL || 'http://127.0.0.1:4190/'
const path = 'learning/4-practice/02-javascript-browser/index.html'
const report = { date: new Date().toISOString(), browser: browser.version(), checks: [], scope: 'Headless Chrome desktop/mobile viewport simulation, real loopback API and IndexedDB; injected API/storage failures are controlled branches, not real-device or full security/performance certification.' }
async function wait(page, state) { await page.waitForFunction(state => document.querySelector('#results').dataset.state === state, state) }
async function query(page, word, mode = 'ok') { await page.locator('#q').fill(word); await page.locator('#mode').selectOption(mode); await page.locator('button[type=submit]').click(); await wait(page, ['error', 'invalid', 'shape'].includes(mode) ? 'error' : 'success') }
try {
 for (const width of [390, 1440]) {
  const context = await browser.newContext({ viewport: { width, height: 900 } })
  const page = await context.newPage(); const errors = []; page.on('pageerror', e => errors.push(e.message))
  const requests = []; page.on('request', r => { if (r.url().includes('/stage2-api/items')) requests.push(r.url()) })
  await page.goto(new URL(path, base).href); await wait(page, 'success')
  assert.equal(await page.locator('#list > li').count(), 8)
  await page.waitForFunction(() => document.querySelector('#worker-info').textContent.includes('Worker：8'))
  await page.waitForFunction(() => document.querySelector('#size-info').textContent.includes('CSS px'))
  await page.waitForFunction(() => document.querySelector('#mutation-info').textContent !== '列表变更记录：0')
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false)
  report.checks.push({ name: 'initial list, Worker, Resize/Mutation, viewport', width, status: 'passed' })
  let before = requests.length
  await query(page, 'HTTP 缓存'); await page.waitForTimeout(360)
  assert.equal(requests.length - before, 1); assert.equal(await page.locator('#list > li').count(), 1)
  assert.equal(new URL(page.url()).searchParams.get('q'), 'HTTP 缓存')
  await query(page, 'Observer'); await page.goBack(); await page.waitForFunction(() => document.querySelector('#q').value === 'HTTP 缓存'); await wait(page, 'success')
  assert.ok((await page.locator('#list').innerText()).includes('HTTP 缓存'))
  await page.reload(); await wait(page, 'success'); assert.equal(await page.locator('#q').inputValue(), 'HTTP 缓存')
  report.checks.push({ name: 'debounce cancel on submit, URL, back, refresh', width, status: 'passed' })
  await page.locator('#theme').click(); await page.reload(); await wait(page, 'success'); assert.equal(await page.locator('#theme').getAttribute('aria-pressed'), 'true')
  await page.locator('#draft').fill('演示草稿 <b>不会成为HTML</b>')
  await page.locator('#save').click(); await page.waitForFunction(() => document.querySelector('#draft-status').textContent.includes('事务已提交'))
  await page.reload(); await wait(page, 'success'); await page.locator('#restore').click(); await page.waitForFunction(() => document.querySelector('#draft').value.startsWith('演示草稿'))
  await page.locator('#clear').click(); await page.waitForFunction(() => document.querySelector('#draft-status').textContent.includes('已删除'))
  await page.locator('#restore').click(); await page.waitForFunction(() => document.querySelector('#draft').value === '')
  report.checks.push({ name: 'localStorage theme, real IDB commit/read/delete', width, status: 'passed' })
  await query(page, '没有这个主题'); assert.equal(await page.locator('#list > li').count(), 0)
  for (const [mode, message] of [['error', 'HTTP 503'], ['invalid', '有效 JSON'], ['shape', '结构不正确']]) { await query(page, '', mode); assert.ok((await page.locator('#request-status').innerText()).includes(message)) }
  await query(page, '')
  await page.locator('#mode').selectOption('slow'); await page.locator('button[type=submit]').click(); await page.locator('#cancel').click(); await wait(page, 'cancelled')
  await page.locator('button[type=submit]').click(); await page.locator('#mode').selectOption('ok'); await page.locator('#q').fill('IndexedDB'); await page.locator('button[type=submit]').click(); await wait(page, 'success'); await page.waitForTimeout(750)
  assert.equal(await page.locator('#list > li').count(), 1); assert.ok((await page.locator('#list').innerText()).includes('IndexedDB'))
  report.checks.push({ name: 'empty, HTTP, parse, schema, cancel, latest request', width, status: 'passed' })
  await page.locator('#mode').selectOption('slow'); await page.locator('button[type=submit]').click(); await page.locator('#dispose').click(); await wait(page, 'disposed')
  const mutations = await page.locator('#mutation-info').textContent()
  await page.evaluate(() => document.querySelector('#list').append(document.createElement('li')))
  await page.waitForTimeout(750); assert.equal(await page.locator('#results').getAttribute('data-state'), 'disposed'); assert.equal(await page.locator('#mutation-info').textContent(), mutations)
  await page.locator('#mount').click(); await page.locator('#mode').selectOption('ok'); await page.locator('#q').fill(''); await page.locator('button[type=submit]').click(); await wait(page, 'success'); assert.equal(await page.locator('#list > li').count(), 8)
  await page.locator('#sentinel').scrollIntoViewIfNeeded(); await page.waitForFunction(() => document.querySelector('#intersection-info').textContent.includes('进入视口'))
  assert.deepEqual(errors, [])
  await page.screenshot({ path: `/tmp/webdev-stage2-practice-${width}.png`, fullPage: true })
  report.checks.push({ name: 'dispose ignores stale work, Observer disconnect, remount, Intersection', width, status: 'passed' })
  await context.close()
 }
 const nojs = await browser.newContext({ javaScriptEnabled: false }); const fallback = await nojs.newPage(); await fallback.goto(new URL(path, base).href); assert.equal(await fallback.locator('#static-catalog a').count(), 4); assert.ok(await fallback.locator('h1').isVisible()); await nojs.close()
 report.checks.push({ name: 'no JavaScript readable fallback', status: 'passed' })
 const denied = await browser.newContext(); await denied.addInitScript(() => { Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('test denied', 'SecurityError') } }); Object.defineProperty(window, 'indexedDB', { get() { throw new DOMException('test denied', 'SecurityError') } }) })
 const blocked = await denied.newPage(); await blocked.goto(new URL(path, base).href); await wait(blocked, 'success'); assert.ok((await blocked.locator('#storage-status').innerText()).includes('不可用')); await blocked.locator('#draft').fill('保留输入'); await blocked.locator('#save').click(); await blocked.waitForFunction(() => document.querySelector('#draft-status').textContent.includes('失败')); assert.equal(await blocked.locator('#draft').inputValue(), '保留输入'); await denied.close()
 report.checks.push({ name: 'controlled storage denial preserves core UI and draft input', status: 'passed' })
 const malformed = await browser.newContext(); await malformed.addInitScript(() => localStorage.setItem('webdev-stage2-theme-v1', '{broken')); const bad = await malformed.newPage(); await bad.goto(new URL(path, base).href); await wait(bad, 'success'); assert.ok((await bad.locator('#storage-status').innerText()).includes('不可用')); await malformed.close()
 report.checks.push({ name: 'malformed persisted theme handled', status: 'passed' })
 report.status = 'passed'; console.log(`Stage 2 practice: ${report.checks.length} scenario groups passed`)
} catch (error) { report.status = 'failed'; report.error = error.message; throw error }
finally { await browser.close(); await writeFile(process.env.STAGE2_REPORT || resolve('docs/audits/stage-2-practice-runtime.json'), JSON.stringify(report, null, 2) + '\n') }
