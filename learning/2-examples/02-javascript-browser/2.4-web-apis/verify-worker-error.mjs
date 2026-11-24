import assert from 'node:assert/strict'
import { writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(resolve(process.env.PLAYWRIGHT_MODULE)).href : 'playwright-core')
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true })
const base = process.env.STAGE2_BASE_URL || 'http://127.0.0.1:4190/'
const report = { date: new Date().toISOString(), checks: [], scope: 'Actual Worker error event with a controlled local script failure, then successful worker restart. Not mobile or production certification.' }
try {
 const page = await browser.newPage(); const errors = []; page.on('pageerror', e => errors.push(e.message))
 await page.route('**/2.4-web-apis/assets/worker.mjs', route => route.fulfill({ status: 200, contentType: 'text/javascript', body: 'throw new Error("controlled worker failure")' }))
 await page.goto(new URL('learning/2-examples/02-javascript-browser/2.4-web-apis/2.4.8.web-workers-demo.html', base).href)
 await page.locator('#compute').click(); await page.waitForFunction(() => document.querySelector('#output').textContent.includes('Worker错误'))
 assert.deepEqual(errors, []); report.checks.push({ name: 'Worker runtime error produces local fallback without unhandled page exception', status: 'passed' })
 await page.unroute('**/2.4-web-apis/assets/worker.mjs'); await page.locator('#compute').click(); await page.waitForFunction(() => document.querySelector('#output').dataset.state === 'success')
 assert.ok((await page.locator('#output').textContent()).includes('total')); assert.deepEqual(errors, [])
 report.checks.push({ name: 'next explicit action creates a working Worker after failure', status: 'passed' }); report.status = 'passed'; console.log('Worker failure/recovery: 2 passed')
} catch (error) { report.status = 'failed'; report.error = error.message; throw error }
finally { await browser.close(); await writeFile(resolve('docs/audits/stage-2-worker-error-runtime.json'), JSON.stringify(report, null, 2) + '\n') }
