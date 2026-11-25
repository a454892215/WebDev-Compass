import { test, expect } from '@playwright/test'
test('parallel SSR, DTO boundaries, degradation and real status codes', async ({
  request,
}) => {
  await Promise.all(
    ['alice', 'bob', 'alice', 'bob'].map(async (scope) => {
      const response = await request.get(`/?scope=${scope}`)
      expect(response.status()).toBe(200)
      expect(response.headers()['cache-control']).toContain('no-store')
      const text = await response.text()
      expect(text).toContain(`Vue 3 模块边界 · ${scope}`)
      expect(text).not.toContain(scope === 'alice' ? '· bob' : '· alice')
      expect(text).not.toContain('STAGE8_INTERNAL_ONLY')
      expect(text).not.toContain('STAGE8_SERVER_CANARY')
    }),
  )
  const degraded = await request.get('/api/workspace?scope=bob&failOptional=1')
  expect(degraded.status()).toBe(200)
  const data = await degraded.json()
  expect(data.completed).toBeNull()
  expect(data.warnings).toHaveLength(1)
  expect(data.courses).toHaveLength(2)
  expect(JSON.stringify(data)).not.toContain('internal_note')
  expect((await request.get('/api/workspace?scope=other')).status()).toBe(400)
  expect((await request.get('/?scope=other')).status()).toBe(400)
  expect((await request.get('/courses/absent?scope=alice')).status()).toBe(404)
  expect((await request.get('/_nuxt/missing.js')).status()).toBe(404)
})
