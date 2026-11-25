import { smallJson } from '../utils/guards'
import { reportSink } from '../utils/reports'
export default defineEventHandler(async (event) => {
  const value = await smallJson(event, 'application/csp-report')
  if (!reportSink.record(value))
    throw createError({ statusCode: 400, statusMessage: 'Invalid report' })
  setResponseStatus(event, 204)
  return null
})
