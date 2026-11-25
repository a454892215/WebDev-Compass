import { test, expect } from '@playwright/test'
test('shared runtime validation, meaningful SSR, and bounded synthetic DTO', async ({
  request,
}) => {
  const html = await (await request.get('/')).text()
  expect(html).toContain('计划共3项')
  expect(html).toContain('合成任务 3')
  for (const limit of [1, 10]) {
    const response = await request.get('/api/catalog?limit=' + limit)
    expect(response.status()).toBe(200)
    expect((await response.json()).items).toHaveLength(limit)
    expect(response.headers()['cache-control']).toContain('no-store')
  }
  for (const query of ['0', '11', '-1', '1.2', 'foo', '1&limit=2'])
    expect((await request.get('/api/catalog?limit=' + query)).status()).toBe(400)
  expect((await request.get('/missing')).status()).toBe(404)
})
