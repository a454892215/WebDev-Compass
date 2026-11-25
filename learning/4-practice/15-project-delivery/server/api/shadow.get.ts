import { shadowCompare } from '../utils/catalog'
export default defineEventHandler((event) => {
  const raw = getQuery(event).mismatch
  if (raw !== undefined && raw !== '0' && raw !== '1')
    throw createError({ statusCode: 400, statusMessage: 'Invalid fixture mode' })
  const differences = shadowCompare(raw === '1')
  return {
    match: differences.length === 0,
    differences,
    notice: '只读合成双源比较，不发两次写请求',
  }
})
