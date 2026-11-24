import { describe, it, expect } from 'vitest'
import { searchResources, validateTitle, resources } from '../../shared/utils/resources'
describe('public resource model', () => {
  it('filters and returns detached records', () => {
    const result = searchResources('Nuxt')
    expect(result).toHaveLength(1)
    result[0]!.title = 'changed'
    expect(resources[2]!.title).toBe('Nuxt SSR 与数据')
  })
  it('handles empty and missing query', () => {
    expect(searchResources('')).toHaveLength(3)
    expect(searchResources('not-found')).toEqual([])
  })
  it.each([null, 42, {}, '', ' '.repeat(3), 'a'.repeat(61)])(
    'rejects invalid title %j',
    (value) => {
      expect(() => validateTitle(value)).toThrow()
    },
  )
  it('normalizes valid title', () => {
    expect(validateTitle('  Vue  ')).toBe('Vue')
  })
})
