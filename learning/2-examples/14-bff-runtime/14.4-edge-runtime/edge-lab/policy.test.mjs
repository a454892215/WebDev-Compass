import test from 'node:test'
import assert from 'node:assert/strict'
import { chooseVariant, createHandler, createPublicCache, createEventualStore } from './policy.mjs'

const request = (path, headers = {}) => new Request('https://local.invalid' + path, { headers })
const fixtures = new Map([['session-a', { name: 'Alice' }], ['session-b', { name: 'Bob' }]])
const handler = createHandler({
  resolveSession: async req => fixtures.get(req.headers.get('cookie')?.replace('sid=', '')),
  catalog: async lang => ({ title: lang === 'zh' ? '公开商品' : 'Public catalog' }),
  trustedCountry: () => 'JP',
})

test('14.4.1 portable Request/Response contract, not platform compatibility proof', async () => {
  const res = await handler(request('/catalog'))
  assert.equal(res.status, 200)
  assert.deepEqual(await res.json(), { title: '公开商品' })
})
test('14.4.2 fixed routes and methods; no arbitrary URL proxy', async () => {
  assert.equal((await handler(request('/unknown'))).status, 404)
  assert.equal((await handler(new Request('https://local.invalid/catalog', { method: 'POST' }))).status, 405)
})
test('14.4.3 forged user/geo headers do not grant access or choose trusted region', async () => {
  assert.equal((await handler(request('/private', { 'x-user-id': 'admin' }))).status, 401)
  assert.equal((await handler(request('/catalog', { 'x-country': 'CN' }))).headers.get('X-Demo-Region'), 'default')
})
test('14.4.3 two fixture sessions isolate projection and forbid shared caching', async () => {
  const [a, b] = await Promise.all(['a', 'b'].map(id => handler(request('/private', { cookie: 'sid=session-' + id }))))
  assert.deepEqual(await a.json(), { name: 'Alice' })
  assert.deepEqual(await b.json(), { name: 'Bob' })
  assert.equal(a.headers.get('Cache-Control'), 'private, no-store')
})
test('14.4.3 cohort is deterministic but never authorization', async () => {
  const result = await chooseVariant('fixture-user-7')
  assert.ok(['A', 'B'].includes(result))
  assert.equal(await chooseVariant('fixture-user-7'), result)
})
test('14.4.4 stale replica illustrates unsafe immediate revocation', () => {
  const store = createEventualStore()
  store.write('revoked', false)
  assert.equal(store.read('region-b', 'revoked'), false)
  store.write('revoked', true)
  assert.equal(store.read('region-b', 'revoked'), false)
  store.refresh('region-b')
  assert.equal(store.read('region-b', 'revoked'), true)
})
test('14.4.5 fresh, stale/background refresh and expired boundaries', async () => {
  let time = 0, version = 1, loads = 0
  const cache = createPublicCache({ now: () => time, load: async key => ({ key, version: version++, loads: ++loads }) })
  assert.equal((await cache.get('zh')).version, 1)
  time = 9999
  assert.equal((await cache.get('zh')).version, 1)
  time = 10000
  assert.equal((await cache.get('zh')).version, 1)
  await cache.settle()
  assert.equal((await cache.get('zh')).version, 2)
  time = 40000
  assert.equal((await cache.get('zh')).version, 3)
  assert.equal(loads, 3)
})
test('14.4.5 expired upstream failure does not return arbitrarily old data', async () => {
  let time = 0, fail = false
  const cache = createPublicCache({ now: () => time, load: async () => { if (fail) throw Error('fixture failure'); return 'v1' } })
  await cache.get('zh')
  fail = true
  time = 10000
  assert.equal(await cache.get('zh'), 'v1')
  await cache.settle()
  time = 30000
  await assert.rejects(cache.get('zh'), /fixture failure/)
})
test('14.4.5 concurrent misses deduplicate; memory entries are bounded', async () => {
  let loads = 0
  const cache = createPublicCache({ now: () => 0, load: async key => { loads++; await Promise.resolve(); return key }, maxEntries: 2 })
  assert.deepEqual(await Promise.all([cache.get('zh'), cache.get('zh')]), ['zh', 'zh'])
  assert.equal(loads, 1)
  await cache.get('en'); await cache.get('fr')
  assert.equal(cache.size(), 2)
})
test('14.4.5 credentials bypass public cache; query key dimensions explicit', async () => {
  let loads = 0
  const cache = createPublicCache({ now: () => 0, load: async lang => ({ lang, call: ++loads }) })
  const handle = createHandler({ resolveSession: async () => null, catalog: (lang, shared) => cache.get(lang, shared) })
  const first = await (await handle(request('/catalog?lang=zh'))).json()
  assert.deepEqual(await (await handle(request('/catalog?lang=zh'))).json(), first)
  const privateRes = await handle(request('/catalog?lang=zh', { authorization: 'fixture' }))
  assert.equal(privateRes.headers.get('Cache-Control'), 'private, no-store')
  assert.equal((await privateRes.json()).call, 2)
  assert.equal((await (await handle(request('/catalog?lang=en'))).json()).lang, 'en')
  assert.equal((await handle(request('/catalog?tenant=other'))).status, 400)
})
