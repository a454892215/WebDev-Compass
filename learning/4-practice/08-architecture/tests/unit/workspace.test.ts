import { describe, it, expect } from 'vitest'
import { loadWorkspace } from '../../server/features/workspace/application/load'
import { fixturePorts } from '../../server/features/workspace/infra/fixtures'
import { decodeWorkspace } from '../../shared/contracts/workspace'
import { catalogueView } from '../../app/features/catalog/application/view'
describe('workspace boundaries', () => {
  it('maps only allowed upstream fields', async () => {
    const data = await loadWorkspace('alice', fixturePorts(false))
    expect(JSON.stringify(data)).not.toContain('STAGE8_INTERNAL_ONLY')
    expect(decodeWorkspace(data).courses).toHaveLength(2)
    expect(catalogueView(data, 'vue').items).toHaveLength(1)
  })
  it('keeps optional failure distinct from legitimate zero', async () => {
    const ports = fixturePorts(true)
    expect((await loadWorkspace('bob', ports)).completed).toBeNull()
    ports.readProgress = async () => 0
    expect((await loadWorkspace('bob', ports)).completed).toBe(0)
  })
  it('rejects bad required DTO rather than empty success', async () => {
    const ports = fixturePorts(false)
    ports.readCourses = async () => [{ course_id: 'vue' }]
    await expect(loadWorkspace('alice', ports)).rejects.toThrow('Invalid upstream')
  })
  it('isolates concurrent request scopes', async () => {
    const [a, b] = await Promise.all(
      ['alice', 'bob'].map((scope) =>
        loadWorkspace(scope as 'alice' | 'bob', fixturePorts(false)),
      ),
    )
    expect(a?.scope).toBe('alice')
    expect(b?.scope).toBe('bob')
  })
  it('rejects invalid browser data and scope', () => {
    expect(() => decodeWorkspace({ scope: 'other', version: 1 })).toThrow()
    expect(() =>
      decodeWorkspace({
        scope: 'alice',
        version: 1,
        courses: [],
        warnings: [],
        completed: -1,
      }),
    ).toThrow()
  })
})
