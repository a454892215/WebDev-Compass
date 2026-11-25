import { test, expect } from '@playwright/test'
import { spawn } from 'node:child_process'
import { request as nodeRequest } from 'node:http'
test('trace isolation, telemetry trust/limits, SSR fixtures and runtime kill switch', async ({
  request,
}) => {
  const a = '1'.repeat(32),
    b = '2'.repeat(32)
  const responses = await Promise.all(
    [a, b].map((id) =>
      request.get('/api/workspace?secret=fixture-secret', {
        headers: { traceparent: '00-' + id + '-' + '3'.repeat(16) + '-01' },
      }),
    ),
  )
  for (const [i, response] of responses.entries()) {
    expect(response.status()).toBe(200)
    expect((await response.json()).traceId).toBe([a, b][i])
    expect(response.headers().traceparent).toMatch(
      new RegExp('^00-' + [a, b][i] + '-[0-9a-f]{16}-00$'),
    )
  }
  const invalid = await request.get('/api/workspace', {
    headers: { traceparent: '00-' + '0'.repeat(32) + '-' + '0'.repeat(16) + '-01' },
  })
  expect((await invalid.json()).traceId).not.toBe('0'.repeat(32))
  const fixture = await request.post('/api/fixture', {
    headers: { origin: 'http://127.0.0.1:4531' },
    data: { subject: 'fixture-a' },
  })
  expect(fixture.status()).toBe(200)
  const state = await (await request.get('/api/workspace')).json()
  expect(state.subject).toBe('fixture-a')
  const html = await (await request.get('/')).text()
  expect(html).toContain('当前分组：fixture-a')
  const ssrResponse = await request.get('/')
  const ssrHtml = await ssrResponse.text()
  expect(ssrHtml).toContain(ssrResponse.headers().traceparent.split('-')[1]!)
  expect(html.includes('id="new-panel"')).toBe(state.flag.enabled)
  expect(html).not.toContain('stage11_fixture=')
  expect((await request.get('/api/demo-failure')).status()).toBe(503)
  const body = { version: 1, events: [{ code: 'manual_demo' }] }
  expect((await request.post('/api/telemetry', { data: body })).status()).toBe(403)
  expect(
    (
      await request.post('/api/telemetry', {
        headers: { origin: 'https://example.invalid' },
        data: body,
      })
    ).status(),
  ).toBe(403)
  expect(
    (
      await request.post('/api/telemetry', {
        headers: { origin: 'http://127.0.0.1:4531' },
        data: { ...body, email: 'synthetic@example.invalid' },
      })
    ).status(),
  ).toBe(400)
  expect(
    (
      await request.post('/api/telemetry', {
        headers: { origin: 'http://127.0.0.1:4531' },
        data: body,
      })
    ).status(),
  ).toBe(204)
  const chunked = await new Promise<number>((resolve, reject) => {
    const req = nodeRequest(
      'http://127.0.0.1:4531/api/telemetry',
      {
        method: 'POST',
        headers: {
          origin: 'http://127.0.0.1:4531',
          'content-type': 'application/json',
          'transfer-encoding': 'chunked',
        },
      },
      (res) => {
        res.resume()
        res.on('end', () => resolve(res.statusCode!))
      },
    )
    req.on('error', reject)
    req.write('x'.repeat(3000))
    req.end()
  })
  expect(chunked).toBe(413)
  const diagnostic = await (await request.get('/api/diagnostics')).json()
  expect(JSON.stringify(diagnostic)).not.toMatch(
    /fixture-secret|synthetic@example|Bearer|stage11_fixture/,
  )
  expect(
    diagnostic.logs.some(
      (x: { traceId: string; status: number }) => x.traceId === a && x.status === 200,
    ),
  ).toBe(true)
  expect(
    diagnostic.logs.some(
      (x: { route: string; level: string; status: number }) =>
        x.route === '/api/demo-failure' && x.level === 'error' && x.status === 503,
    ),
  ).toBe(true)
  const process = spawn(globalThis.process.execPath, ['.output/server/index.mjs'], {
    env: {
      ...globalThis.process.env,
      NODE_ENV: 'production',
      HOST: '127.0.0.1',
      PORT: '4539',
      NUXT_KILL_NEW_PANEL: 'true',
    },
    stdio: 'ignore',
  })
  try {
    let ready = false
    for (let i = 0; i < 60; i++) {
      try {
        const r = await fetch('http://127.0.0.1:4539/api/health')
        if (r.ok) {
          ready = true
          break
        }
      } catch {
        /* The local process is still starting; retry until the bounded deadline. */
      }
      await new Promise((r) => setTimeout(r, 50))
    }
    expect(ready).toBe(true)
    const killed = await (
      await fetch('http://127.0.0.1:4539/api/workspace', {
        headers: { cookie: 'stage11_fixture=fixture-a' },
      })
    ).json()
    expect(killed.flag.reason).toBe('kill-switch')
    expect(killed.flag.enabled).toBe(false)
    const killedHtml = await (
      await fetch('http://127.0.0.1:4539/', {
        headers: { cookie: 'stage11_fixture=fixture-a' },
      })
    ).text()
    expect(killedHtml).not.toContain('id="new-panel"')
  } finally {
    if (process.exitCode === null) {
      const exit = new Promise((resolve) => process.once('exit', resolve))
      process.kill('SIGTERM')
      await exit
    }
  }
})
