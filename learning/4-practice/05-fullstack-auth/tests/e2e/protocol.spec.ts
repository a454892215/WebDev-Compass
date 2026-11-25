import { test, expect } from '@playwright/test'
import type { BrowserContext } from '@playwright/test'
import { randomUUID } from 'node:crypto'
const origin = 'http://127.0.0.1:4400'
const name = 'compass_stage5_sid'
async function enter(context: BrowserContext, user = 'alice') {
  const boot = await context.request.post('/api/session/bootstrap', {
    headers: { Origin: origin },
    data: {},
  })
  expect(boot.status()).toBe(200)
  const before = (await context.cookies()).find((c) => c.name === name)!.value
  const anon = await boot.json()
  const login = await context.request.post('/api/login', {
    headers: { Origin: origin, 'X-CSRF-Token': anon.csrfToken },
    data: { demoUser: user, role: 'admin' },
  })
  expect(login.status()).toBe(200)
  const session = await login.json()
  const after = (await context.cookies()).find((c) => c.name === name)!.value
  expect(after).not.toBe(before)
  return {
    session,
    before,
    after,
    headers: { Origin: origin, 'X-CSRF-Token': session.csrfToken },
  }
}
test('CSRF, rotation, owner/admin, idempotency, If-Match, upload limits, revoke and expiry', async ({
  browser,
  request,
}) => {
  const context = await browser.newContext({ baseURL: origin })
  try {
    expect((await context.request.get('/api/notes')).status()).toBe(401)
    const boot = await context.request.post('/api/session/bootstrap', {
      headers: { Origin: origin },
      data: {},
    })
    const anon = await boot.json()
    expect(
      (
        await context.request.post('/api/login', {
          headers: { Origin: 'http://untrusted.invalid', 'X-CSRF-Token': anon.csrfToken },
          data: { demoUser: 'alice' },
        })
      ).status(),
    ).toBe(403)
    expect(
      (
        await context.request.post('/api/login', {
          headers: { Origin: origin },
          data: { demoUser: 'alice' },
        })
      ).status(),
    ).toBe(403)
    expect(
      (
        await context.request.post('/api/login', {
          headers: {
            Origin: origin,
            'X-CSRF-Token': anon.csrfToken,
            'Content-Type': 'text/plain',
          },
          data: 'alice',
        })
      ).status(),
    ).toBe(415)
    const auth = await enter(context)
    expect(auth.session.user).toEqual({ id: 'alice', role: 'reader' })
    expect(
      (
        await request.get('/api/notes', { headers: { Cookie: `${name}=${auth.before}` } })
      ).status(),
    ).toBe(401)
    expect(
      (
        await context.request.get('/api/admin', { headers: { 'X-Role': 'admin' } })
      ).status(),
    ).toBe(403)
    expect((await context.request.get('/api/notes/b1')).status()).toBe(404)
    expect(
      (
        await context.request.patch('/api/notes/b1', {
          headers: { ...auth.headers, 'If-Match': '"1"' },
          data: { title: 'unauthorized change' },
        })
      ).status(),
    ).toBe(404)
    expect((await context.request.get('/api/notes?page=0')).status()).toBe(400)
    expect((await context.request.get('/api/notes?q=a&q=b')).status()).toBe(400)
    expect(
      (await context.request.get('/api/notes?q=not-present-anywhere')).status(),
    ).toBe(200)
    const key = randomUUID()
    const header = { ...auth.headers, 'Idempotency-Key': key }
    const first = await context.request.post('/api/notes', {
      headers: header,
      data: { title: 'Protocol note' },
    })
    expect(first.status()).toBe(201)
    const note = await first.json()
    const repeat = await context.request.post('/api/notes', {
      headers: header,
      data: { title: 'Protocol note' },
    })
    expect(repeat.status()).toBe(200)
    expect((await repeat.json()).id).toBe(note.id)
    expect(repeat.headers()['idempotency-replayed']).toBe('true')
    expect(
      (
        await context.request.post('/api/notes', {
          headers: header,
          data: { title: 'Different payload' },
        })
      ).status(),
    ).toBe(409)
    const before = await context.request.get(`/api/notes/${note.id}`)
    expect(before.headers().etag).toBe('"1"')
    expect(
      (
        await context.request.patch(`/api/notes/${note.id}`, {
          headers: auth.headers,
          data: { title: 'updated' },
        })
      ).status(),
    ).toBe(428)
    const updated = await context.request.patch(`/api/notes/${note.id}`, {
      headers: { ...auth.headers, 'If-Match': before.headers().etag! },
      data: { title: 'updated' },
    })
    expect(updated.status()).toBe(200)
    expect(updated.headers().etag).toBe('"2"')
    expect(
      (
        await context.request.patch(`/api/notes/${note.id}`, {
          headers: { ...auth.headers, 'If-Match': '"1"' },
          data: { title: 'stale' },
        })
      ).status(),
    ).toBe(412)
    expect(
      (
        await context.request.post('/api/notes', {
          headers: { ...header, 'Content-Type': 'application/json' },
          data: JSON.stringify({ title: 'x'.repeat(5000) }),
        })
      ).status(),
    ).toBe(413)
    const valid = await context.request.post('/api/uploads', {
      headers: auth.headers,
      multipart: {
        file: { name: 'safe.txt', mimeType: 'text/plain', buffer: Buffer.from('hello') },
      },
    })
    expect(valid.status()).toBe(200)
    expect(await valid.json()).toEqual({ fileName: 'safe.txt', bytes: 5, saved: false })
    expect(
      (
        await context.request.post('/api/uploads', {
          headers: auth.headers,
          multipart: {
            file: {
              name: 'large.txt',
              mimeType: 'text/plain',
              buffer: Buffer.alloc(4097, 97),
            },
          },
        })
      ).status(),
    ).toBe(413)
    expect(
      (
        await context.request.post('/api/uploads', {
          headers: auth.headers,
          multipart: {
            file: {
              name: 'huge.txt',
              mimeType: 'text/plain',
              buffer: Buffer.alloc(20000, 97),
            },
          },
        })
      ).status(),
    ).toBe(413)
    expect(
      (
        await context.request.post('/api/uploads', {
          headers: auth.headers,
          multipart: {
            file: {
              name: 'wrong.bin',
              mimeType: 'application/octet-stream',
              buffer: Buffer.from('text'),
            },
          },
        })
      ).status(),
    ).toBe(415)
    expect(
      (
        await context.request.post('/api/uploads', {
          headers: auth.headers,
          multipart: {
            file: { name: 'bad.txt', mimeType: 'text/plain', buffer: Buffer.from([255]) },
          },
        })
      ).status(),
    ).toBe(415)
    expect(
      (
        await context.request.post('/api/logout', { headers: auth.headers, data: {} })
      ).status(),
    ).toBe(200)
    expect(
      (
        await request.get('/api/notes', { headers: { Cookie: `${name}=${auth.after}` } })
      ).status(),
    ).toBe(401)
    const next = await enter(context)
    expect(
      (
        await context.request.post('/api/lab/expire', { headers: next.headers, data: {} })
      ).status(),
    ).toBe(200)
    expect((await context.request.get('/api/notes')).status()).toBe(401)
    expect((await (await context.request.get('/api/session')).json()).user).toBeNull()
  } finally {
    await context.close()
  }
})
test('two-user SSR cookie forwarding, anonymous isolation, private cache and admin server gate', async ({
  browser,
}) => {
  const a = await browser.newContext({ baseURL: origin }),
    b = await browser.newContext({ baseURL: origin }),
    guest = await browser.newContext({ baseURL: origin }),
    admin = await browser.newContext({ baseURL: origin })
  try {
    const aa = await enter(a, 'alice')
    await enter(b, 'bob')
    await enter(admin, 'admin')
    const [ar, br, gr] = await Promise.all([
      a.request.get('/'),
      b.request.get('/'),
      guest.request.get('/'),
    ])
    const [ah, bh, gh] = await Promise.all([ar.text(), br.text(), gr.text()])
    expect(ar.status()).toBe(200)
    expect(br.status()).toBe(200)
    expect(ar.headers()['cache-control']).toContain('no-store')
    expect(ar.headers().vary).toContain('Cookie')
    expect(br.headers()['cache-control']).toContain('private')
    expect(ah).toContain('alice / reader')
    expect(bh).toContain('bob / reader')
    expect(ah).not.toContain('Bob 私人笔记')
    expect(bh).not.toContain('Alice 私人笔记')
    expect(gh).toContain('未登录')
    expect(gh).not.toContain('Bob 私人笔记')
    expect(gh).not.toContain('Alice 私人笔记')
    expect(ah).not.toContain(aa.after)
    expect(gr.headers()['set-cookie']).toBeUndefined()
    expect((await guest.cookies()).filter((c) => c.name === name)).toHaveLength(0)
    expect((await a.request.get('/admin', { maxRedirects: 0 })).status()).toBe(302)
    expect((await admin.request.get('/api/admin')).status()).toBe(200)
    expect((await admin.request.get('/api/notes/b1')).status()).toBe(200)
  } finally {
    await Promise.all([a.close(), b.close(), guest.close(), admin.close()])
  }
})
