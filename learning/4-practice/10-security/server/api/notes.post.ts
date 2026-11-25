import { writeSession, smallJson } from '../utils/guards'
import { store } from '../utils/store'
export default defineEventHandler(async (event) => {
  const id = writeSession(event)
  const body = await smallJson(event)
  if (
    Object.keys(body).some((k) => k !== 'text') ||
    typeof body.text !== 'string' ||
    !body.text.trim() ||
    body.text.length > 500
  )
    throw createError({ statusCode: 400, statusMessage: 'Invalid note' })
  try {
    const note = store.create(id, body.text)
    setResponseStatus(event, 201)
    return note
  } catch {
    throw createError({ statusCode: 409, statusMessage: 'Note capacity reached' })
  }
})
