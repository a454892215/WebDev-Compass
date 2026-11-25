import { requireUser } from '../utils/auth'
import { notes } from '../utils/note-store'
import { parsePositive } from '#shared/utils/contracts'
export default defineEventHandler((event) => {
  const { user } = requireUser(event)
  const query = getQuery(event)
  try {
    if (query.q !== undefined && typeof query.q !== 'string')
      throw new Error('q must be one string')
    return notes.list(
      user,
      typeof query.q === 'string' ? query.q.slice(0, 80) : '',
      parsePositive(query.page, 1, 1000),
      parsePositive(query.pageSize, 2, 20),
    )
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Invalid query' })
  }
})
