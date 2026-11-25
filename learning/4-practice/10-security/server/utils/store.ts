import { randomBytes, timingSafeEqual } from 'node:crypto'
export interface Session {
  csrf: string
  expires: number
}
export interface Note {
  id: string
  owner: string
  text: string
}
export function createStore(now = () => Date.now()) {
  const sessions = new Map<string, Session>(),
    notes = new Map<string, Note>()
  const ttl = 15 * 60_000
  function revoke(id: string) {
    sessions.delete(id)
    for (const [n, note] of notes) if (note.owner === id) notes.delete(n)
  }
  function clean() {
    for (const [id, s] of sessions) if (s.expires <= now()) revoke(id)
  }
  function start(old?: string) {
    clean()
    if (old) revoke(old)
    if (sessions.size >= 64) throw new Error('Session capacity')
    const id = randomBytes(32).toString('base64url'),
      csrf = randomBytes(32).toString('base64url')
    const session = { csrf, expires: now() + ttl }
    sessions.set(id, session)
    return { id, ...session }
  }
  function get(id: string | undefined) {
    clean()
    return id ? sessions.get(id) : undefined
  }
  function verify(id: string, token: unknown) {
    const s = get(id)
    if (!s || typeof token !== 'string') return false
    const a = Buffer.from(s.csrf),
      b = Buffer.from(token)
    return a.length === b.length && timingSafeEqual(a, b)
  }
  function list(id: string) {
    if (!get(id)) throw new Error('Unauthorized')
    return [...notes.values()]
      .filter((n) => n.owner === id)
      .map(({ id, text }) => ({ id, text }))
  }
  function create(id: string, text: string) {
    if (!get(id)) throw new Error('Unauthorized')
    if (typeof text !== 'string' || !text.trim() || text.length > 500)
      throw new TypeError('Invalid text')
    if (list(id).length >= 20) throw new Error('Note capacity')
    const note = { id: randomBytes(16).toString('hex'), owner: id, text }
    notes.set(note.id, note)
    return { id: note.id, text: note.text }
  }
  function read(id: string, noteId: string) {
    if (!get(id)) throw new Error('Unauthorized')
    const note = notes.get(noteId)
    return note?.owner === id ? { id: note.id, text: note.text } : undefined
  }
  function remove(id: string, noteId: string) {
    if (!read(id, noteId)) return false
    notes.delete(noteId)
    return true
  }
  return { start, get, verify, list, create, read, remove, revoke }
}
// Explicit bounded backend session store, NOT a shared current-user SSR state.
export const store = createStore()
