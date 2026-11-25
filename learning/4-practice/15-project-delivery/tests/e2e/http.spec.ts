import { test, expect } from '@playwright/test'
test('read-only parity, rollout, rollback, deep link and safe legacy output', async ({
  request,
}) => {
  for (const [path, target] of [
    ['/entry?bucket=0', '/catalog'],
    ['/entry?bucket=99', '/legacy/catalog'],
    ['/entry?bucket=0&rollback=1', '/legacy/catalog'],
  ] as const) {
    const res = await request.get(path, { maxRedirects: 0 })
    expect(res.status()).toBe(302)
    expect(res.headers().location).toContain(target + '?q=')
  }
  expect((await request.get('/entry?bucket=100')).status()).toBe(400)
  const res = await request.get('/api/catalog?q=' + encodeURIComponent('背包'))
  expect(res.status()).toBe(200)
  expect((await res.json()).items).toEqual([
    { id: 'p1', title: '旅行背包', cents: 12900 },
  ])
  expect((await (await request.get('/api/shadow')).json()).match).toBe(true)
  expect((await (await request.get('/api/shadow?mismatch=1')).json()).match).toBe(false)
  const legacy = await request.get('/legacy/catalog')
  const html = await legacy.text()
  expect(html).toContain('&lt;script&gt;fixture&lt;/script&gt;')
  expect(html).not.toContain('<script>fixture</script>')
  expect(html).not.toContain('internal_cost')
  const safe = await request.get(
    '/legacy/catalog?q=' + encodeURIComponent('<img src=x onerror=alert(1)>'),
  )
  expect(await safe.text()).not.toContain('<img src=x')
  expect((await request.get('/api/catalog?broken=1')).status()).toBe(503)
  const product = await request.get('/product/p1')
  expect(product.status()).toBe(200)
  expect(await product.text()).toContain('旅行背包')
  expect((await request.get('/product/p999')).status()).toBe(404)
  expect((await request.get('/product/p1?broken=1')).status()).toBe(503)
})
