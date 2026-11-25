import { parseLimit, makePlan } from '@compass/platform-core'
export default defineEventHandler((event) => {
  const limit = parseLimit(getQuery(event).limit)
  if (limit === null)
    throw createError({ statusCode: 400, statusMessage: 'Invalid limit' })
  return { items: makePlan(limit) }
})
