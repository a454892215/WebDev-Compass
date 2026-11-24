import { describe, expect, it, vi } from 'vitest'
import { loadTasks } from '../../src/services/load-tasks'
describe('request, status, parsing and model decoding boundary', () => {
  it('passes signal and decodes response', async () => {
    const fake = vi
      .fn<typeof fetch>()
      .mockResolvedValue(
        new Response(
          JSON.stringify([{ id: 'a', title: '任务', done: false }]),
          { status: 200 },
        ),
      )
    const controller = new AbortController()
    expect(await loadTasks('/fixture', fake, controller.signal)).toHaveLength(1)
    expect(fake).toHaveBeenCalledWith('/fixture', { signal: controller.signal })
  })
  it('checks HTTP status before trying to parse HTML error output', async () => {
    const fake = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response('<h1>missing</h1>', { status: 404 }))
    await expect(loadTasks('/fixture', fake)).rejects.toThrow('HTTP 404')
  })
  it('distinguishes invalid JSON and valid wrong schema', async () => {
    const fake = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(new Response('{broken'))
      .mockResolvedValueOnce(new Response('{"items":[]}'))
    await expect(loadTasks('/fixture', fake)).rejects.toThrow('有效 JSON')
    await expect(loadTasks('/fixture', fake)).rejects.toThrow('列表')
  })
  it('preserves transport failures for the view to handle', async () => {
    const fake = vi
      .fn<typeof fetch>()
      .mockRejectedValue(new TypeError('network unavailable'))
    await expect(loadTasks('/fixture', fake)).rejects.toThrow(
      'network unavailable',
    )
  })
})
