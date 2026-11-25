import { sessionId } from '../../utils/guards'
import { store } from '../../utils/store'
export default defineEventHandler((event) => {
  const id = sessionId(event)
  const note = store.read(id, getRouterParam(event, 'id') || '')
  if (!note) throw createError({ statusCode: 404, statusMessage: 'Note not found' })
  return note
})
