import { parseMode } from '../../shared/catalog'
import { loadCatalogue, localSources } from '../utils/load-catalog'
export default defineEventHandler(async (event) => {
  let mode
  try {
    mode = parseMode(getQuery(event).mode)
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Invalid mode' })
  }
  const result = await loadCatalogue(mode, localSources())
  setResponseHeader(
    event,
    'server-timing',
    `catalogue;dur=${result.durationMs.toFixed(2)}`,
  )
  return result
})
