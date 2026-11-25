import { migrationTarget } from '../../shared/catalog'
export default defineEventHandler((event) => {
  const query = getQuery(event)
  const raw = query.bucket ?? '0'
  const q = query.q ?? ''
  if (
    typeof raw !== 'string' ||
    !/^([0-9]|[1-9][0-9])$/.test(raw) ||
    typeof q !== 'string' ||
    q.length > 40 ||
    (query.rollback !== undefined && query.rollback !== '1')
  )
    throw createError({ statusCode: 400, statusMessage: 'Invalid rollout input' })
  const percent = Number(useRuntimeConfig(event).migrationPercent)
  if (!Number.isInteger(percent) || percent < 0 || percent > 100)
    throw createError({ statusCode: 503, statusMessage: 'Invalid rollout configuration' })
  // Request-scoped fixture controls, NOT a production feature flag or authorization service.
  const target = migrationTarget(Number(raw), percent, query.rollback === '1')
  return sendRedirect(event, target + '?' + new URLSearchParams({ q }).toString(), 302)
})
