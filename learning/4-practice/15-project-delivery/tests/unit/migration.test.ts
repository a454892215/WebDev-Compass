import { describe, it, expect } from 'vitest'
import {
  normalizeLegacy,
  parseProducts,
  compareCatalog,
  migrationTarget,
  escapeHTML,
} from '../../shared/catalog'
import { oldCatalog, newCatalog, shadowCompare } from '../../server/utils/catalog'
describe('migration contract', () => {
  it('keeps public meaning and detects changed/new/missing records', () => {
    expect(normalizeLegacy(oldCatalog())).toEqual(newCatalog())
    expect(shadowCompare()).toEqual([])
    expect(shadowCompare(true)).toEqual([{ id: 'p1', reason: 'changed' }])
    expect(
      compareCatalog(
        [{ id: 'p1', title: 'A', cents: 0 }],
        [{ id: 'p2', title: 'B', cents: 0 }],
      ),
    ).toEqual([
      { id: 'p1', reason: 'missing' },
      { id: 'p2', reason: 'added' },
    ])
  })
  it('rejects invalid contracts and strips private fields', () => {
    expect(() =>
      normalizeLegacy([{ product_code: 'p1', product_name: 'A', price: '1.2x' }]),
    ).toThrow()
    expect(() => parseProducts([{ id: 'p1', title: 'A', cents: -1 }])).toThrow()
    expect(() => parseProducts([...newCatalog(), newCatalog()[0]])).toThrow()
    expect(JSON.stringify(normalizeLegacy(oldCatalog()))).not.toContain('internal_cost')
  })
  it('uses bounded rollout and immediate routing rollback', () => {
    expect(migrationTarget(0, 50, false)).toBe('/catalog')
    expect(migrationTarget(50, 50, false)).toBe('/legacy/catalog')
    expect(migrationTarget(0, 50, true)).toBe('/legacy/catalog')
    expect(() => migrationTarget(100, 50, false)).toThrow()
    expect(escapeHTML('<script>"&')).toBe('&lt;script&gt;&quot;&amp;')
  })
})
