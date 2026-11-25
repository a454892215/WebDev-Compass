import { test, expect, request as playwrightRequest } from '@playwright/test'
import { request as nodeRequest } from 'node:http'
const baseURL = 'http://127.0.0.1:4521'
const origin = { origin: baseURL }
test('object authorization, CSRF, bounded raw body, parallel SSR and revoked credentials', async ({
  request,
}) => {
  const a = await playwrightRequest.newContext({ baseURL }),
    b = await playwrightRequest.newContext({ baseURL })
  try {
    const sa = await a.post('/api/session', { headers: origin }),
      sb = await b.post('/api/session', { headers: origin })
    expect(sa.status()).toBe(200)
    const ca = (await sa.json()).csrf,
      cb = (await sb.json()).csrf
    const as = (await a.storageState()).cookies.find(
        (x) => x.name === 'stage10_session',
      )!.value,
      bs = (await b.storageState()).cookies.find(
        (x) => x.name === 'stage10_session',
      )!.value
    const ha = { ...origin, 'x-csrf-token': ca },
      hb = { ...origin, 'x-csrf-token': cb }
    const made = await a.post('/api/notes', {
      headers: ha,
      data: { text: 'SESSION_A_TEXT' },
    })
    expect(made.status()).toBe(201)
    const note = await made.json()
    expect(
      (
        await b.post('/api/notes', { headers: hb, data: { text: 'SESSION_B_TEXT' } })
      ).status(),
    ).toBe(201)
    expect((await request.get(`/api/notes/${note.id}`)).status()).toBe(401)
    expect((await b.get(`/api/notes/${note.id}`)).status()).toBe(404)
    expect((await b.delete(`/api/notes/${note.id}`, { headers: hb })).status()).toBe(404)
    expect((await a.get(`/api/notes/${note.id}`)).status()).toBe(200)
    expect(
      (
        await a.post('/api/notes', { headers: origin, data: { text: 'missing csrf' } })
      ).status(),
    ).toBe(403)
    expect(
      (
        await a.post('/api/notes', {
          headers: { ...ha, origin: 'https://other.invalid' },
          data: { text: 'evil' },
        })
      ).status(),
    ).toBe(403)
    expect(
      (
        await a.post('/api/notes', {
          headers: { 'x-csrf-token': ca },
          data: { text: 'no origin' },
        })
      ).status(),
    ).toBe(403)
    expect(
      (
        await a.post('/api/notes', {
          headers: ha,
          data: { text: 'massassign', owner: bs },
        })
      ).status(),
    ).toBe(400)
    expect(
      (
        await a.post('/api/notes', { headers: ha, data: { text: 'x'.repeat(6000) } })
      ).status(),
    ).toBe(413)
    const chunked = await new Promise<number>((resolve, reject) => {
      const req = nodeRequest(
        baseURL + '/api/notes',
        {
          method: 'POST',
          headers: {
            ...ha,
            cookie: `stage10_session=${as}`,
            'content-type': 'application/json',
            'transfer-encoding': 'chunked',
          },
        },
        (res) => {
          res.resume()
          res.on('end', () => resolve(res.statusCode || 0))
        },
      )
      req.on('error', reject)
      req.write(JSON.stringify({ text: 'x'.repeat(6000) }))
      req.end()
    })
    expect(chunked).toBe(413)
    await Promise.all(
      [
        { ctx: a, own: 'SESSION_A_TEXT', foreign: 'SESSION_B_TEXT' },
        { ctx: b, own: 'SESSION_B_TEXT', foreign: 'SESSION_A_TEXT' },
      ].map(async ({ ctx, own, foreign }) => {
        const res = await ctx.get('/')
        const html = await res.text()
        expect(res.status()).toBe(200)
        expect(res.headers()['cache-control']).toContain('no-store')
        expect(html).toContain(own)
        expect(html).not.toContain(foreign)
        expect(html).not.toContain(as)
        expect(html).not.toContain(bs)
      }),
    )
    expect((await a.delete('/api/session', { headers: ha })).status()).toBe(200)
    expect(
      (
        await request.get(`/api/notes/${note.id}`, {
          headers: { cookie: `stage10_session=${as}` },
        })
      ).status(),
    ).toBe(401)
    expect((await b.get('/api/workspace')).status()).toBe(200)
    expect((await request.get('/missing')).status()).toBe(404)
    expect((await request.get('/api/health')).status()).toBe(200)
  } finally {
    await a.dispose()
    await b.dispose()
  }
})
