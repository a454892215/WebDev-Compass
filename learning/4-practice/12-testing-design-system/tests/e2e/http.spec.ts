import { test, expect } from '@playwright/test'
test('parallel fixture SSR carries only its DTO, never shares personalized cache', async ({
  request,
}) => {
  const result = await Promise.all(
    ['a', 'b'].map(async (fixture) => {
      const response = await request.get('/', {
        headers: { cookie: 'stage12_fixture=' + fixture },
      })
      return {
        fixture,
        status: response.status(),
        headers: response.headers(),
        html: await response.text(),
      }
    }),
  )
  for (const row of result) {
    expect(row.status).toBe(200)
    expect(row.headers['cache-control']).toContain('private')
    expect(row.headers['cache-control']).toContain('no-store')
    const current = row.fixture === 'a' ? 'A' : 'B',
      other = current === 'A' ? 'B' : 'A'
    expect(row.html).toContain('当前：合成用户' + current)
    expect(row.html).toContain(current + '的草稿')
    expect(row.html).not.toContain('当前：合成用户' + other)
    expect(row.html).not.toContain(other + '的草稿')
    expect(row.html).not.toContain('stage12_fixture=')
  }
  const guest = await request.get('/', {
    headers: { cookie: 'stage12_fixture=untrusted' },
  })
  expect(await guest.text()).toContain('当前：访客')
  expect((await request.get('/does-not-exist')).status()).toBe(404)
})
