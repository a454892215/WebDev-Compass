import { readBoundedJson } from '../utils/body'
import { requireWrite, requireUser } from '../utils/auth'
import { notes } from '../utils/note-store'
export default defineEventHandler(async (event) => {
  requireWrite(event)
  const { user } = requireUser(event)
  const body: unknown = await readBoundedJson(event)
  if (typeof body !== 'object' || body === null || !('title' in body))
    throw createError({ statusCode: 400, statusMessage: 'Title required' })
  try {
    const result = notes.create(
      user,
      body.title,
      getHeader(event, 'idempotency-key') ?? '',
    )
    setHeader(event, 'Idempotency-Replayed', String(result.replayed))
    setResponseStatus(event, result.replayed ? 200 : 201)
    return result.note
  } catch (error) {
    if (error instanceof Error && 'statusCode' in error) throw error
    throw createError({ statusCode: 400, statusMessage: 'Invalid title' })
  }
})
