import { asLocale, catalog } from '#shared/utils/catalog'
export default defineEventHandler((event) => {
  const query = getQuery(event)
  const locale = asLocale(query.locale ?? 'zh-CN')
  if (!locale || (query.q !== undefined && typeof query.q !== 'string'))
    throw createError({ statusCode: 400, statusMessage: 'Invalid catalogue query' })
  return catalog(locale, typeof query.q === 'string' ? query.q.slice(0, 80) : '')
})
