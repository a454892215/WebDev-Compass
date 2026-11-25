import { asLocale } from '../../shared/utils/catalog'
export default defineNuxtRouteMiddleware((to) => {
  if (to.params.locale === undefined) return
  const locale = asLocale(to.params.locale)
  if (!locale) throw createError({ statusCode: 404, statusMessage: 'Locale not found' })
  useNuxtApp().$setCatalogLocale(locale)
})
