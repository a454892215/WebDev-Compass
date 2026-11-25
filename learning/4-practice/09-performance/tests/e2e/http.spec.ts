import { test, expect } from '@playwright/test'
test('server timing samples, statuses and a real unbuffered HTTP stream', async ({
  request,
}, info) => {
  const samples: Record<string, number[]> = { parallel: [], serial: [] }
  for (let i = 0; i < 3; i++)
    for (const mode of ['serial', 'parallel']) {
      const response = await request.get(`/api/catalog?mode=${mode}`)
      expect(response.status()).toBe(200)
      expect(response.headers()['server-timing']).toMatch(/^catalogue;dur=\d+(\.\d+)?$/)
      const data = await response.json()
      expect(data.mode).toBe(mode)
      expect(data.courses).toHaveLength(2)
      samples[mode]!.push(data.durationMs)
    }
  expect((await request.get('/api/catalog?mode=invalid')).status()).toBe(400)
  expect((await request.get('/?mode=invalid')).status()).toBe(400)
  expect((await request.get('/missing')).status()).toBe(404)
  const response = await fetch('http://127.0.0.1:4517/stream-demo')
  expect(response.status).toBe(200)
  const reader = response.body!.getReader()
  const decoder = new TextDecoder()
  const chunks: string[] = []
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(decoder.decode(value, { stream: true }))
  }
  chunks.push(decoder.decode())
  const body = chunks.join('')
  expect(body).toContain('先发送的静态HTML')
  expect(body).toContain('稍后发送的内容')
  expect(chunks.filter(Boolean).length).toBeGreaterThanOrEqual(2)
  await info.attach('controlled-samples.json', {
    body: JSON.stringify({
      samples,
      chunkCount: chunks.filter(Boolean).length,
      scope:
        'Local controlled synthetic waits,not production p75;raw HTTP streaming,not Nuxt component StreamingSSR',
    }),
    contentType: 'application/json',
  })
})
