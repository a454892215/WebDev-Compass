import { randomUUID } from 'node:crypto'
export type FixtureUser = 'alice' | 'bob'
interface Session {
  user: FixtureUser
  expires: number
}
// Only the synthetic local session store is shared. No currentUser/currentRequest singleton.
const sessions = new Map<string, Session>()
const buckets = new Map<string, { count: number; reset: number }>()
export function issueSession(user: FixtureUser) {
  const now = Date.now()
  for (const [id, s] of sessions) if (s.expires <= now) sessions.delete(id)
  if (sessions.size >= 100) sessions.delete(sessions.keys().next().value!)
  const id = randomUUID()
  sessions.set(id, { user, expires: now + 600000 })
  return id
}
export function resolveSession(id: string | undefined) {
  const s = id ? sessions.get(id) : undefined
  return s && s.expires > Date.now() ? s : undefined
}
export function consume(id: string, now = Date.now()) {
  for (const [key, b] of buckets) if (b.reset <= now) buckets.delete(key)
  const old = buckets.get(id)
  const bucket = old && old.reset > now ? old : { count: 0, reset: now + 60000 }
  if (!old && buckets.size >= 1000) return false
  bucket.count++
  buckets.set(id, bucket)
  return bucket.count <= 20
}
