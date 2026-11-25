import { newCatalog } from '../utils/catalog'
import { filterProducts } from '../../shared/catalog'
export default defineEventHandler((event) => {
  const query = getQuery(event)
  const q = query.q ?? ''
  if (typeof q !== 'string' || q.length > 40)
    throw createError({ statusCode: 400, statusMessage: 'Invalid query' })
  if (query.broken === '1')
    throw createError({
      statusCode: 503,
      statusMessage: 'Synthetic new catalog unavailable',
    })
  return { items: filterProducts(newCatalog(), q), source: 'vue-fixture' }
})
