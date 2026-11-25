import { before, after, test } from 'node:test'
import assert from 'node:assert/strict'
import { once } from 'node:events'
import { readFile } from 'node:fs/promises'
import { createLab } from '../server.mjs'
import {
  readJSON,
  decodePage,
  latestLoader,
  safeRead,
  retryAfterMillis,
  apiURL,
} from '../client.mjs'
const server = createLab()
let origin
before(async () => {
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  origin = `http://127.0.0.1:${server.address().port}`
})
after(() => {
  server.close()
  server.closeAllConnections()
})
test('real HTTP: status, parse, schema and content-type failures are distinct', async () => {
  assert.equal(decodePage(await readJSON(origin + '/api/v1/items')).items.length, 2)
  await assert.rejects(
    readJSON(origin + '/missing'),
    (e) => e.kind === 'http' && e.status === 404,
  )
  await assert.rejects(readJSON(origin + '/api/bad-json'), (e) => e.kind === 'parse')
  const malformed = await readJSON(origin + '/api/wrong-schema')
  assert.throws(
    () => decodePage(malformed),
    (e) => e.kind === 'schema',
  )
  await assert.rejects(readJSON(origin + '/api/html'), (e) => e.kind === 'content-type')
  assert.equal(await readJSON(origin + '/api/no-content'), null)
})
test('real cancellation and timeout reject rather than turning into empty success', async () => {
  const controller = new AbortController()
  const request = readJSON(origin + '/api/v1/items?delay=200', {
    signal: controller.signal,
  })
  controller.abort()
  await assert.rejects(request, (e) => e.name === 'AbortError')
  await assert.rejects(
    readJSON(origin + '/api/v1/items?delay=200', { signal: AbortSignal.timeout(10) }),
    (e) => e.name === 'TimeoutError',
  )
})
test('controlled late result ignoring abort cannot replace newer state or cleared state', async () => {
  const pending = new Map(),
    states = []
  const latest = latestLoader(
    (q) => new Promise((resolve) => pending.set(q, resolve)),
    (s) => states.push(s),
  )
  const a = latest.load('old'),
    b = latest.load('new')
  pending.get('new')({ items: [{ id: 'b', title: 'new' }], total: 1 })
  await b
  pending.get('old')({ items: [{ id: 'a', title: 'old' }], total: 1 })
  await a
  assert.equal(states.at(-1).items[0].id, 'b')
  const c = latest.load('clear')
  await latest.load('')
  pending.get('clear')({ items: [{ id: 'c', title: 'late' }], total: 1 })
  await c
  assert.equal(states.at(-1).kind, 'empty')
  const d = latest.load('disposed')
  latest.dispose()
  const count = states.length
  pending.get('disposed')({ items: [], total: 0 })
  await d
  assert.equal(states.length, count)
})
test('stable pagination and bounds match contract', async () => {
  const all = await readJSON(origin + '/api/v1/items?size=3'),
    second = await readJSON(origin + '/api/v1/items?page=2&size=3')
  const ids = [...all.items, ...second.items].map((x) => x.id)
  assert.equal(new Set(ids).size, 5)
  const vue = await readJSON(origin + '/api/v1/items?q=Vue&size=3')
  assert.deepEqual(
    vue.items.map((x) => x.id),
    ['a', 'c'],
  )
  assert.equal((await fetch(origin + '/api/v1/items?size=99')).status, 400)
  assert.deepEqual((await readJSON(origin + '/api/v1/items?page=99')).items, [])
})
test('FormData generated boundary, server file limits and Blob response', async () => {
  const form = new FormData()
  form.set('file', new File(['hello'], 'note.txt', { type: 'text/plain' }))
  const response = await fetch(origin + '/api/upload', { method: 'POST', body: form })
  assert.equal(response.status, 201)
  assert.deepEqual(await response.json(), { name: 'note.txt', bytes: 5, stored: false })
  assert.equal(
    (
      await fetch(origin + '/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        body: form,
      })
    ).status,
    400,
  )
  const large = new FormData()
  large.set('file', new File(['a'.repeat(1025)], 'large.txt', { type: 'text/plain' }))
  assert.equal(
    (await fetch(origin + '/api/upload', { method: 'POST', body: large })).status,
    413,
  )
  const excessive = new FormData()
  excessive.set(
    'file',
    new File(['a'.repeat(8192)], 'excessive.txt', { type: 'text/plain' }),
  )
  assert.equal(
    (await fetch(origin + '/api/upload', { method: 'POST', body: excessive })).status,
    413,
  )
  const binary = new FormData()
  binary.set(
    'file',
    new File([new Uint8Array([0, 1, 2])], 'pretend.txt', { type: 'text/plain' }),
  )
  assert.equal(
    (await fetch(origin + '/api/upload', { method: 'POST', body: binary })).status,
    415,
  )
  const download = await fetch(origin + '/api/download')
  assert.match(download.headers.get('content-disposition'), /attachment/)
  assert.equal(await (await download.blob()).text(), 'Public teaching download\n')
})
test('bounded retry honors status and Retry-After budget; non-read not retried', async () => {
  const result = await safeRead(origin + '/api/retry?case=once')
  assert.equal(result.status, 200)
  assert.equal((await result.json()).attempt, 2)
  const capped = await safeRead(origin + '/api/retry-cap')
  assert.equal(capped.status, 503)
  assert.equal((await capped.json()).attempt, 3)
  let calls = 0
  const stop = await safeRead(origin + '/api/always-busy', {
    fetcher: (...args) => {
      calls++
      return fetch(...args)
    },
  })
  assert.equal(stop.status, 503)
  assert.equal(calls, 1)
  assert.equal((await safeRead(origin + '/api/forbidden')).status, 403)
  await assert.rejects(
    safeRead(origin + '/api/create', { method: 'POST' }),
    (e) => e.kind === 'policy',
  )
  assert.equal(retryAfterMillis('120'), null)
  assert.equal(retryAfterMillis('junk'), null)
  assert.equal(retryAfterMillis('1', 0), 1000)
  assert.equal(retryAfterMillis('Thu, 01 Jan 1970 00:00:01 GMT', 0), 1000)
})
test('idempotency is a server contract: same key+body same result, conflict body 409', async () => {
  const send = (body) =>
    fetch(origin + '/api/create', {
      method: 'POST',
      headers: { 'Idempotency-Key': 'demo-write-1', 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  const first = await send({ title: 'a' }),
    again = await send({ title: 'a' })
  assert.equal(first.status, 201)
  assert.equal(again.status, 200)
  assert.deepEqual(await first.json(), await again.json())
  assert.equal((await send({ title: 'b' })).status, 409)
})
test('allowlisted base URL cannot become arbitrary credential destination', () => {
  assert.equal(apiURL(origin, '/api/v1/items', [origin]).origin, origin)
  assert.throws(
    () => apiURL('https://not-approved.invalid', '/api', [origin]),
    (e) => e.kind === 'config',
  )
  assert.throws(
    () => apiURL(origin, 'https://other.invalid/steal', [origin]),
    (e) => e.kind === 'config',
  )
})
test('OpenAPI fixture documents actual route, pagination and multipart statuses', async () => {
  const document = JSON.parse(
    await readFile(new URL('../openapi.json', import.meta.url), 'utf8'),
  )
  assert.equal(document.openapi, '3.1.1')
  const get = document.paths['/api/v1/items'].get
  assert.equal(get.parameters.find((p) => p.name === 'size').schema.maximum, 3)
  assert.ok(get.responses['200'].content['application/json'])
  assert.ok(document.paths['/api/upload'].post.responses['413'])
  assert.ok(document.components.schemas.Page.required.includes('items'))
  // This checks our known fixture invariants, not every rule of the OpenAPI standard.
})
