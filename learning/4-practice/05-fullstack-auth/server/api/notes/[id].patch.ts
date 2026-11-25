import { readBoundedJson } from '../../utils/body'
import { requireWrite, requireUser } from '../../utils/auth'
import { notes } from '../../utils/note-store'
export default defineEventHandler(async (event) => {
  requireWrite(event)
  const { user } = requireUser(event)
  const body: unknown = await readBoundedJson(event)
  if (typeof body !== 'object' || body === null || !('title' in body))
    throw createError({ statusCode: 400, statusMessage: 'Title required' })
  try {
    const note = notes.update(
      user,
      getRouterParam(event, 'id') ?? '',
      body.title,
      getHeader(event, 'if-match'),
    )
    setHeader(event, 'ETag', `"${note.version}"`)
    return note
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    throw createError({ statusCode: 400, statusMessage: 'Invalid title' })
  }
})
