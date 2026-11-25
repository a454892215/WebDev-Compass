import { asLocale, findCourse } from '#shared/utils/catalog'
export default defineEventHandler((event) => {
  const locale = asLocale(getQuery(event).locale ?? 'zh-CN')
  if (!locale) throw createError({ statusCode: 400, statusMessage: 'Invalid locale' })
  const course = findCourse(locale, getRouterParam(event, 'slug') ?? '')
  if (!course) throw createError({ statusCode: 404, statusMessage: 'Course not found' })
  return course
})
