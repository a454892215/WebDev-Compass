import { writeSession } from '../../utils/guards'
import { store } from '../../utils/store'
export default defineEventHandler((event) => {
  const id = writeSession(event)
  if (!store.remove(id, getRouterParam(event, 'id') || ''))
    throw createError({ statusCode: 404, statusMessage: 'Note not found' })
  return { removed: true }
})
