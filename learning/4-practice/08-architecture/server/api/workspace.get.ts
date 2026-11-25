import { parseScope } from '../../shared/contracts/workspace'
import { loadWorkspace } from '../features/workspace/application/load'
import { fixturePorts } from '../features/workspace/infra/fixtures'
export default defineEventHandler(async (event) => {
  setResponseHeader(event, 'cache-control', 'private, no-store')
  const query = getQuery(event)
  let scope
  try {
    scope = parseScope(query.scope || 'alice')
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Invalid scope' })
  }
  try {
    return await loadWorkspace(scope, fixturePorts(query.failOptional === '1'))
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Catalogue unavailable' })
  }
})
