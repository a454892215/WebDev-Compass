import { describe, it, expect } from 'vitest'
import {
  decodePage,
  validateTitle,
  parsePositive,
  canRead,
} from '../../shared/utils/contracts'
import { createSessionStore } from '../../server/utils/session-store'
import { createNoteStore } from '../../server/utils/note-store'
const alice = { id: 'alice' as const, role: 'reader' as const },
  bob = { id: 'bob' as const, role: 'reader' as const },
  admin = { id: 'admin' as const, role: 'admin' as const }
describe('untrusted data', () => {
  it('strips extras, returns copies, rejects malformed and duplicate records', () => {
    const value = {
      items: [
        { id: 'a', ownerId: 'alice', title: 'A', version: 1, secret: 'not in DTO' },
      ],
      page: 1,
      pageSize: 2,
      total: 1,
    }
    expect(decodePage(value).items[0]).not.toHaveProperty('secret')
    expect(() =>
      decodePage({ ...value, items: [value.items[0], value.items[0]], total: 2 }),
    ).toThrow()
    expect(() =>
      decodePage({ items: [{ title: null }], page: 1, pageSize: 2, total: 1 }),
    ).toThrow()
  })
  it.each([null, 42, '', ' '.repeat(2), 'a'.repeat(81)])('rejects title %j', (value) =>
    expect(() => validateTitle(value)).toThrow(),
  )
  it('validates pagination instead of coercing arrays/NaN', () => {
    expect(parsePositive(undefined, 2, 20)).toBe(2)
    expect(parsePositive('2', 1, 20)).toBe(2)
    for (const v of ['0', '2x', '21', ['2']])
      expect(() => parsePositive(v, 1, 20)).toThrow()
  })
})
describe('sessions', () => {
  it('expires/revokes and creates independent opaque identities', () => {
    let time = 100
    const s = createSessionStore(() => time)
    const a = s.create(alice),
      b = s.create(bob)
    expect(a.id).not.toBe(b.id)
    expect(a.id).toHaveLength(64)
    expect(s.view(a).user?.id).toBe('alice')
    s.revoke(a.id)
    expect(s.get(a.id)).toBeUndefined()
    time += 16 * 60 * 1000
    expect(s.get(b.id)).toBeUndefined()
  })
  it('does not expose the session id in serialized view', () => {
    const s = createSessionStore()
    const a = s.create(alice)
    expect(s.view(a)).not.toHaveProperty('id')
    s.expire(a.id)
    expect(s.get(a.id)).toBeUndefined()
  })
})
describe('authorization and write protocols', () => {
  it('isolates owners and allows administrator scope', () => {
    const s = createNoteStore()
    expect(s.get(alice, 'b1')).toBeUndefined()
    expect(s.get(bob, 'a1')).toBeUndefined()
    expect(s.get(admin, 'b1')).toBeTruthy()
    expect(canRead(alice, { id: 'b', title: 'B', ownerId: 'bob', version: 1 })).toBe(
      false,
    )
  })
  it('has stable tie-breaks and no cross-owner pagination', () => {
    const s = createNoteStore()
    const p = s.list(alice, '共同', 1, 1),
      q = s.list(alice, '共同', 2, 1)
    expect(p.items[0]!.id).toBe('a2')
    expect(q.items[0]!.id).toBe('a3')
    expect(s.list(alice, '', 1, 20).items.every((n) => n.ownerId === 'alice')).toBe(true)
  })
  it('deduplicates same scoped key and rejects changed payload', () => {
    const s = createNoteStore()
    const first = s.create(alice, 'one', 'key-12345678')
    const retry = s.create(alice, 'one', 'key-12345678')
    expect(retry.replayed).toBe(true)
    expect(retry.note.id).toBe(first.note.id)
    expect(() => s.create(alice, 'two', 'key-12345678')).toThrow()
    expect(s.create(bob, 'one', 'key-12345678').note.id).not.toBe(first.note.id)
  })
  it('requires If-Match and rejects stale versions without mutation', () => {
    const s = createNoteStore()
    expect(() => s.update(alice, 'a1', 'new', undefined)).toThrow()
    expect(s.update(alice, 'a1', 'new', '"1"').version).toBe(2)
    expect(() => s.update(alice, 'a1', 'stale', '"1"')).toThrow()
    expect(s.get(alice, 'a1')!.title).toBe('new')
  })
})
