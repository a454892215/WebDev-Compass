import { searchResources } from '#shared/utils/resources'
export default defineEventHandler((event) => {
  const query = getQuery(event)
  if (query.fail === '1')
    throw createError({ statusCode: 503, statusMessage: 'Teaching fixture unavailable' })
  if (query.q !== undefined && typeof query.q !== 'string')
    throw createError({ statusCode: 400, statusMessage: 'q must be a single string' })
  return searchResources(typeof query.q === 'string' ? query.q : '')
})
