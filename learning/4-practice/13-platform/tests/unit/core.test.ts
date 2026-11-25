import { describe, it, expect } from 'vitest'
import { parseLimit, makePlan, formatCount } from '@compass/platform-core'
import { importProblems } from '../../scripts/boundaries.mjs'
describe('core public contract and source boundary', () => {
  it('accepts explicit valid bounds without coercing arbitrary inputs', () => {
    expect(parseLimit(undefined)).toBe(3)
    expect(parseLimit('1')).toBe(1)
    expect(parseLimit('10')).toBe(10)
    for (const raw of [null, 3, [], {}, '0', '11', '01', '1.2', 'Infinity'])
      expect(parseLimit(raw)).toBeNull()
  })
  it('keeps each plan independent with stable DTO and count', () => {
    const a = makePlan(3),
      b = makePlan(3)
    a[0]!.label = 'changed'
    expect(b[0]!.label).toBe('合成任务 1')
    expect(formatCount(b.length)).toBe('计划共3项')
    expect(() => makePlan(0)).toThrow(RangeError)
  })
  it('rejects relative layer escape and computed imports, not comments', () => {
    const root = '/fixture/packages/core',
      file = root + '/src/index.ts'
    expect(
      importProblems(
        '// import bad from "../../../apps/web/x"\nexport const x=1',
        file,
        root,
      ),
    ).toEqual([])
    expect(
      importProblems('export {x} from "../../../apps/web/x"', file, root)[0],
    ).toContain('Cross-package')
    expect(importProblems('import("../../../apps/web/x")', file, root)[0]).toContain(
      'Cross-package',
    )
    expect(importProblems('import(variable)', file, root)).toContain(
      'Core requires static module specifiers',
    )
    expect(importProblems('import x from "undeclared"', file, root)[0]).toContain(
      'Undeclared',
    )
    expect(importProblems('import {x} from "./helper"', file, root)).toEqual([])
  })
})
