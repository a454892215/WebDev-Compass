import { describe, it, expect } from 'vitest'
import { createStore } from '../../server/utils/store'
describe('bounded demo session store', () => {
  it('isolates owners even if a note id is known', () => {
    const db = createStore(),
      a = db.start(),
      b = db.start()
    const n = db.create(a.id, 'synthetic')
    expect(db.read(b.id, n.id)).toBeUndefined()
    expect(db.remove(b.id, n.id)).toBe(false)
    expect(db.read(a.id, n.id)?.text).toBe('synthetic')
  })
  it('binds CSRF to session and revokes all session notes', () => {
    const db = createStore(),
      a = db.start(),
      b = db.start()
    expect(db.verify(a.id, a.csrf)).toBe(true)
    expect(db.verify(a.id, b.csrf)).toBe(false)
    db.create(a.id, 'one')
    db.revoke(a.id)
    expect(db.get(a.id)).toBeUndefined()
    expect(db.verify(a.id, a.csrf)).toBe(false)
  })
  it('expires and rotates without retaining prior state', () => {
    let now = 0
    const db = createStore(() => now),
      a = db.start()
    db.create(a.id, 'old')
    const fresh = db.start(a.id)
    expect(fresh.id).not.toBe(a.id)
    expect(db.get(a.id)).toBeUndefined()
    now = 900001
    expect(db.get(fresh.id)).toBeUndefined()
  })
  it('rejects invalid text and bounds per-session content', () => {
    const db = createStore(),
      s = db.start()
    expect(() => db.create(s.id, ' ')).toThrow()
    for (let i = 0; i < 20; i++) db.create(s.id, String(i))
    expect(() => db.create(s.id, 'overflow')).toThrow('capacity')
  })
})
