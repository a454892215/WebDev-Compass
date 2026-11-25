import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { once } from 'node:events'
import { mkdir, writeFile } from 'node:fs/promises'
import { start } from './server.mjs'
const require = createRequire(
  new URL('../../../../4-practice/14-bff-runtime/package.json', import.meta.url),
)
const { chromium } = require('@playwright/test')
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH ||
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--enable-unsafe-swiftshader'],
})
const server = start()
await once(server, 'listening')
const context = await browser.newContext()
const page = await context.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
const rows = []
try {
  const cdp = await context.newCDPSession(page)
  await cdp.send('WebAuthn.enable')
  const { authenticatorId } = await cdp.send('WebAuthn.addVirtualAuthenticator', {
    options: {
      protocol: 'ctap2',
      transport: 'internal',
      hasResidentKey: true,
      hasUserVerification: true,
      isUserVerified: true,
      automaticPresenceSimulation: true,
    },
  })
  await page.goto('http://localhost:4576')
  await page.waitForFunction(() => window.lab)
  assert.equal(await page.locator('#module-result').textContent(), '本地 ESM：目录')
  rows.push('native importmap bare specifier resolves local ESM')
  await page.locator('#wasm').click()
  await page.waitForFunction(() =>
    document.querySelector('#wasm-result').textContent.includes('sum'),
  )
  const wasm = JSON.parse(await page.locator('#wasm-result').textContent())
  assert.equal(wasm.sum, 7)
  assert.equal(wasm.oldBufferDetached, true)
  assert.equal(wasm.newBytes, 131072)
  assert.equal(wasm.simdResult, 5)
  assert.equal(wasm.sharedWorker, null)
  rows.push(
    'actual Wasm scalar/SIMD and memory growth; ordinary document no shared worker',
  )
  await page.locator('#render').click()
  const gl = JSON.parse(await page.locator('#scene-text').textContent())
  assert.deepEqual(gl.pixel, [0, 64, 191, 255])
  assert.deepEqual(gl.center, [255, 128, 0, 255])
  assert.equal(gl.bufferAlive, true)
  assert.equal(gl.error, 0)
  await page.locator('#release').click()
  assert.equal(await page.evaluate(() => lab.getBufferAlive()), false)
  rows.push('WebGL actual pixel and buffer release')
  await page.locator('#register').click()
  await page.waitForFunction(() =>
    document.querySelector('#auth-result').textContent.includes('webauthn.create'),
  )
  let auth = JSON.parse(await page.locator('#auth-result').textContent())
  assert.equal(auth.challengeMatches, true)
  assert.equal(auth.origin, 'http://localhost:4576')
  assert.equal(auth.serverVerified, false)
  await page.locator('#assert').click()
  await page.waitForFunction(() =>
    document.querySelector('#auth-result').textContent.includes('webauthn.get'),
  )
  auth = JSON.parse(await page.locator('#auth-result').textContent())
  assert.ok(auth.signatureBytes > 0)
  assert.equal(auth.serverVerified, false)
  rows.push(
    'virtual authenticator create/get client ceremony, not server verification or login',
  )
  const caps = JSON.parse(await page.locator('#capabilities').textContent())
  assert.equal(typeof caps.paymentRequest, 'boolean')
  rows.push('PaymentRequest interface presence only, no show/merchant/order')
  await page.goto('http://localhost:4576/isolated')
  await page.waitForFunction(() => window.lab)
  const isolated = await page.evaluate(() => lab.wasmExperiment())
  assert.equal(isolated.crossOriginIsolated, true)
  assert.equal(isolated.sharedWorker, 1)
  rows.push(
    'isolated shared Wasm memory sent to Worker; JS Atomics increment, not compiled pthreads',
  )
  await page.goto('http://localhost:4576/?fallback')
  await page.waitForFunction(() => window.lab)
  assert.equal((await page.evaluate(() => lab.wasmExperiment())).fallback, true)
  await page.locator('#render').click()
  assert.match(await page.locator('#scene-text').textContent(), /文字替代/)
  await page.locator('#register').click()
  assert.match(await page.locator('#auth-result').textContent(), /不可用/)
  rows.push('forced unavailable fallback keeps text and bounded JS path')
  await page.goto('http://localhost:4576/?no-importmap')
  assert.match(await page.locator('#module-result').textContent(), /基础目录内容仍可读/)
  assert.equal(await page.locator('#wasm').isDisabled(), true)
  rows.push(
    'importmap bootstrap feature gate skips dependent module with readable baseline',
  )
  assert.deepEqual(errors, [])
  await cdp.send('WebAuthn.removeVirtualAuthenticator', { authenticatorId })
  const report = {
    checkedAt: new Date().toISOString(),
    node: process.version,
    browser: browser.version(),
    checks: rows,
    passed: rows.length,
    failed: 0,
    wasm,
    isolated,
    webgl: gl,
    limitations: [
      'Virtual authenticator and browser ceremony only; no server verification, identity provider or real passkeys.',
      'Payment Request only typeof; no actual payment/UI/canMakePayment or merchant.',
      'Local native ESM not CDN, scalar/SIMD actual tiny Wasm not compiled Emscripten/pthreads.',
      'Shared Wasm memory+JS Atomics Worker not a Wasm pthread runtime.',
      'Native WebGL/SwiftShader not Three.js, hardware GPU or performance evidence.',
      'Chrome one desktop viewport, forced capability fallback not another browser engine.',
    ],
  }
  await mkdir(new URL('./dist/', import.meta.url), { recursive: true })
  await writeFile(
    new URL('./dist/runtime.json', import.meta.url),
    JSON.stringify(report, null, 2) + '\n',
  )
  console.log(JSON.stringify(report, null, 2))
} finally {
  await context.close()
  await browser.close()
  await new Promise((resolve) => server.close(resolve))
}
