import { requireUser } from '../../utils/auth'
import { notes } from '../../utils/note-store'
export default defineEventHandler((event) => {
  const { user } = requireUser(event)
  const note = notes.get(user, getRouterParam(event, 'id') ?? '')
  if (!note) throw createError({ statusCode: 404, statusMessage: 'Note not found' })
  setHeader(event, 'ETag', `"${note.version}"`)
  return note
})
