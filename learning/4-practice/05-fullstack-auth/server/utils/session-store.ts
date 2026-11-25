import { randomBytes } from 'node:crypto'
import type { DemoUser, SessionView } from '#shared/utils/contracts'
export const DEMO_USERS: readonly DemoUser[] = [
  { id: 'alice', role: 'reader' },
  { id: 'bob', role: 'reader' },
  { id: 'admin', role: 'admin' },
]
export interface SessionRecord {
  id: string
  user: DemoUser | null
  csrfToken: string
  expiresAt: number
}
export function createSessionStore(now: () => number = Date.now) {
  const entries = new Map<string, SessionRecord>()
  function get(id: string | undefined) {
    if (!id) return undefined
    const value = entries.get(id)
    if (value && value.expiresAt <= now()) {
      entries.delete(id)
      return undefined
    }
    return value
  }
  function create(user: DemoUser | null) {
    for (const [id, s] of entries) if (s.expiresAt <= now()) entries.delete(id)
    if (entries.size >= 200) throw new Error('Teaching session capacity reached')
    const session = {
      id: randomBytes(32).toString('hex'),
      user,
      csrfToken: randomBytes(32).toString('hex'),
      expiresAt: now() + 15 * 60 * 1000,
    }
    entries.set(session.id, session)
    return session
  }
  function revoke(id: string) {
    entries.delete(id)
  }
  function expire(id: string) {
    const s = entries.get(id)
    if (s) s.expiresAt = now() - 1
  }
  function view(s: SessionRecord | undefined): SessionView {
    return { user: s?.user ? { ...s.user } : null, csrfToken: s?.csrfToken ?? null }
  }
  return { get, create, revoke, expire, view }
}
// This is a bounded teaching backend store keyed by opaque IDs, not a Vue/Nuxt user-state singleton.
export const sessions = createSessionStore()
