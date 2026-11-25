import { requireOrigin, smallBody } from '../utils/body'
import { validBatch, observability } from '../utils/observability'
export default defineEventHandler(async (event) => {
  requireOrigin(event)
  const body = await smallBody(event)
  if (!validBatch(body))
    throw createError({ statusCode: 400, statusMessage: 'Invalid event batch' })
  observability.add(body.events)
  setResponseStatus(event, 204)
  return null
})
