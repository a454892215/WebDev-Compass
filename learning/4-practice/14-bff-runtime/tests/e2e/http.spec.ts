import { test, expect, request } from '@playwright/test'
import { matches, type Schema } from '../../shared/contracts'
const base = 'http://127.0.0.1:4561'
test('HTTP auth, error mapping, isolation, no-store and schema', async () => {
  const a = await request.newContext({ baseURL: base }),
    b = await request.newContext({ baseURL: base })
  try {
    expect((await a.get('/api/dashboard')).status()).toBe(401)
    expect(
      (
        await a.post('/api/session', {
          data: { user: 'alice' },
          headers: { origin: 'http://untrusted.invalid' },
        })
      ).status(),
    ).toBe(403)
    expect(
      (
        await a.post('/api/session', {
          data: { user: 'alice', extra: 1 },
          headers: { origin: base },
        })
      ).status(),
    ).toBe(400)
    expect(
      (
        await a.post('/api/session', {
          data: { user: 'x'.repeat(300) },
          headers: { origin: base },
        })
      ).status(),
    ).toBe(413)
    for (const [ctx, user] of [
      [a, 'alice'],
      [b, 'bob'],
    ] as const)
      expect(
        (
          await ctx.post('/api/session', { data: { user }, headers: { origin: base } })
        ).ok(),
      ).toBe(true)
    expect(
      (
        await a.post('/api/session', {
          data: { user: ['alice'] },
          headers: { origin: base },
        })
      ).status(),
    ).toBe(400)
    const actualSpec = await (await a.get('/api/openapi')).json()
    const actualSchema = actualSpec.paths['/api/dashboard'].get.responses['200'].content[
      'application/json'
    ].schema as Schema
    const responses = await Promise.all(
      Array.from({ length: 8 }, (_, i) => (i % 2 ? a : b).get('/api/dashboard')),
    )
    const traces = new Set<string>()
    for (let i = 0; i < responses.length; i++) {
      const res = responses[i]!
      const dto = await res.json()
      expect(matches(dto, actualSchema)).toBe(true)
      expect(dto.user.id).toBe(i % 2 ? 'alice' : 'bob')
      expect(res.headers()['cache-control']).toContain('no-store')
      expect(res.headers()['access-control-allow-origin']).toBeUndefined()
      expect(JSON.stringify(dto)).not.toMatch(
        /fixture-private|internalSecret|internalCost|fixture-alice/,
      )
      traces.add(dto.traceId)
    }
    expect(traces.size).toBe(8)
    expect((await a.get('/api/dashboard?mode=wat')).status()).toBe(400)
    for (const [mode, status] of [
      ['timeout', 504],
      ['invalid', 502],
      ['denied', 502],
    ] as const) {
      const res = await a.get('/api/dashboard?mode=' + mode)
      expect(res.status()).toBe(status)
      expect(JSON.stringify(await res.json())).not.toContain('secret')
    }
    const partial = await a.get('/api/dashboard?mode=optional-fail')
    expect(partial.status()).toBe(200)
    expect((await partial.json()).warnings).toHaveLength(1)
    const html = await Promise.all([a.get('/'), b.get('/')])
    expect(await html[0]!.text()).toContain('Alice 合成用户')
    expect(await html[0]!.text()).not.toContain('Bob 合成用户')
    expect(await html[1]!.text()).toContain('Bob 合成用户')
    const spec = await (await a.get('/api/openapi')).json()
    expect(spec.openapi).toBe('3.1.1')
    expect(
      spec.paths['/api/dashboard'].get.responses['200'].content['application/json'].schema
        .required,
    ).toContain('traceId')
    const cookie = (await a.storageState()).cookies.find((c) => c.name === 'demo_session')
    expect(cookie?.httpOnly).toBe(true)
    expect(cookie?.sameSite).toBe('Lax')
  } finally {
    await a.dispose()
    await b.dispose()
  }
})
test('per-session rate limit returns retry-after', async ({ request }) => {
  await request.post('/api/session', {
    data: { user: 'alice' },
    headers: { origin: base },
  })
  for (let i = 0; i < 20; i++)
    expect((await request.get('/api/dashboard')).status()).toBe(200)
  const denied = await request.get('/api/dashboard')
  expect(denied.status()).toBe(429)
  expect(denied.headers()['retry-after']).toBe('60')
})
