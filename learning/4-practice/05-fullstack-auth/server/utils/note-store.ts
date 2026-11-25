import { createError } from 'h3'
import { randomUUID } from 'node:crypto'
import type { DemoUser, Note, NotePage } from '#shared/utils/contracts'
import { canRead, validateTitle } from '#shared/utils/contracts'
export function createNoteStore() {
  const notes: Note[] = [
    { id: 'a1', ownerId: 'alice', title: 'Alice 私人笔记', version: 1 },
    { id: 'a2', ownerId: 'alice', title: '共同标题', version: 1 },
    { id: 'a3', ownerId: 'alice', title: '共同标题', version: 1 },
    { id: 'b1', ownerId: 'bob', title: 'Bob 私人笔记', version: 1 },
  ]
  const replays = new Map<string, { title: string; result: Note }>()
  function list(user: DemoUser, q: string, page: number, pageSize: number): NotePage {
    const filtered = notes
      .filter((n) => canRead(user, n) && n.title.toLowerCase().includes(q.toLowerCase()))
      .sort((a, b) => a.title.localeCompare(b.title, 'zh-CN') || a.id.localeCompare(b.id))
    return {
      items: filtered
        .slice((page - 1) * pageSize, page * pageSize)
        .map((n) => ({ ...n })),
      total: filtered.length,
      page,
      pageSize,
    }
  }
  function get(user: DemoUser, id: string) {
    const n = notes.find((n) => n.id === id)
    return n && canRead(user, n) ? { ...n } : undefined
  }
  function create(user: DemoUser, titleInput: unknown, key: string) {
    const title = validateTitle(titleInput)
    if (!/^[a-zA-Z0-9-]{8,80}$/.test(key))
      throw createError({ statusCode: 400, statusMessage: 'Invalid idempotency key' })
    const scope = `${user.id}:${key}`
    const prior = replays.get(scope)
    if (prior) {
      if (prior.title !== title)
        throw createError({
          statusCode: 409,
          statusMessage: 'Idempotency key payload conflict',
        })
      return { note: { ...prior.result }, replayed: true }
    }
    if (replays.size >= 300)
      throw createError({
        statusCode: 503,
        statusMessage: 'Teaching replay capacity reached',
      })
    const note = { id: randomUUID(), ownerId: user.id, title, version: 1 }
    notes.push(note)
    replays.set(scope, { title, result: { ...note } })
    return { note: { ...note }, replayed: false }
  }
  function update(
    user: DemoUser,
    id: string,
    titleInput: unknown,
    match: string | undefined,
  ) {
    const note = notes.find((n) => n.id === id && canRead(user, n))
    if (!note) throw createError({ statusCode: 404, statusMessage: 'Note not found' })
    if (!match) throw createError({ statusCode: 428, statusMessage: 'If-Match required' })
    if (
      match !== '*' &&
      !match
        .split(',')
        .map((tag) => tag.trim())
        .includes(`"${note.version}"`)
    )
      throw createError({ statusCode: 412, statusMessage: 'Note version changed' })
    note.title = validateTitle(titleInput)
    note.version++
    return { ...note }
  }
  return { list, get, create, update }
}
export const notes = createNoteStore()
