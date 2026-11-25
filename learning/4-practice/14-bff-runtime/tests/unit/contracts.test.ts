import { describe, it, expect } from 'vitest'
import { matches, dashboardSchema } from '../../shared/contracts'
import { issueSession, resolveSession, consume } from '../../server/utils/state'
import { profileDTO, itemsDTO } from '../../server/utils/aggregate'
describe('BFF boundaries', () => {
  it('checks actual shared schema and rejects drift', () => {
    const x = { user: { id: 'a', name: 'A' }, items: [], warnings: [], traceId: 't' }
    expect(matches(x, dashboardSchema)).toBe(true)
    expect(matches({ ...x, secret: 'x' }, dashboardSchema)).toBe(false)
    expect(matches({ ...x, user: { id: 1, name: 'A' } }, dashboardSchema)).toBe(false)
  })
  it('projects private fields and rejects malformed upstream', () => {
    expect(profileDTO({ id: 'a', name: 'A', secret: 1 })).toEqual({ id: 'a', name: 'A' })
    expect(() => itemsDTO([{ id: 1, title: 'bad' }])).toThrow()
    expect(() => profileDTO(null)).toThrow()
  })
  it('isolates identities and bounds per-session limit', () => {
    const a = issueSession('alice'),
      b = issueSession('bob')
    expect(resolveSession(a)?.user).toBe('alice')
    expect(resolveSession(b)?.user).toBe('bob')
    expect(resolveSession('fake')).toBeUndefined()
    for (let i = 0; i < 20; i++) expect(consume(a, 100)).toBe(true)
    expect(consume(a, 100)).toBe(false)
    expect(consume(b, 100)).toBe(true)
    expect(consume(a, 60101)).toBe(true)
  })
})
