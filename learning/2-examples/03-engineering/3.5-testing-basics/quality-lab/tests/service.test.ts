import { expect, it, vi } from 'vitest'
import { loadTasks } from '../src/service'
import type { FetchJson } from '../src/service'
it('服务适配检查HTTP和数据协议', async () => {
  const fetcher = vi.fn<FetchJson>().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => [{ id: 1, title: '接口样本', done: false }],
  })
  await expect(loadTasks(fetcher)).resolves.toHaveLength(1)
  expect(fetcher).toHaveBeenCalledWith('/demo/tasks')
})
it('HTTP失败先于JSON读取', async () => {
  const json = vi.fn(async () => [])
  await expect(
    loadTasks(async () => ({ ok: false, status: 503, json })),
  ).rejects.toThrow('HTTP 503')
  expect(json).not.toHaveBeenCalled()
})
it('区分传输、解析和结构错误', async () => {
  await expect(
    loadTasks(async () => {
      throw new TypeError('断网样本')
    }),
  ).rejects.toThrow('断网')
  await expect(
    loadTasks(async () => ({
      ok: true,
      status: 200,
      json: async () => {
        throw new SyntaxError('坏JSON')
      },
    })),
  ).rejects.toThrow('坏JSON')
  await expect(
    loadTasks(async () => ({
      ok: true,
      status: 200,
      json: async () => ({ items: [] }),
    })),
  ).rejects.toThrow('数组')
})
