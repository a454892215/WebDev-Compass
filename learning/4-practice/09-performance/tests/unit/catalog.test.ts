import { describe, it, expect } from 'vitest'
import { loadCatalogue } from '../../server/utils/load-catalog'
import { parseMode } from '../../shared/catalog'
function gate() {
  let release!: () => void
  const promise = new Promise<void>((resolve) => (release = resolve))
  return { promise, release }
}
describe('dependency schedule', () => {
  it('starts both independent reads before either resolves in parallel', async () => {
    const a = gate(),
      b = gate(),
      starts: string[] = []
    const result = loadCatalogue('parallel', {
      courses: async () => {
        starts.push('courses')
        await a.promise
        return []
      },
      summary: async () => {
        starts.push('summary')
        await b.promise
        return 'ok'
      },
    })
    expect(starts).toEqual(['courses', 'summary'])
    b.release()
    a.release()
    expect((await result).mode).toBe('parallel')
  })
  it('starts serial second read only after first completes', async () => {
    const a = gate(),
      starts: string[] = []
    const result = loadCatalogue('serial', {
      courses: async () => {
        starts.push('courses')
        await a.promise
        return []
      },
      summary: async () => {
        starts.push('summary')
        return 'ok'
      },
    })
    expect(starts).toEqual(['courses'])
    a.release()
    await result
    expect(starts).toEqual(['courses', 'summary'])
  })
  it('does not convert required failure into empty success', async () => {
    await expect(
      loadCatalogue('parallel', {
        courses: async () => {
          throw new Error('bad')
        },
        summary: async () => '',
      }),
    ).rejects.toThrow('bad')
  })
  it('validates mode before work', () => {
    expect(parseMode(undefined)).toBe('parallel')
    expect(parseMode('serial')).toBe('serial')
    expect(() => parseMode('other')).toThrow()
  })
})
