import { siteOrigin, xmlEscape } from '#shared/utils/seo'
import { LOCALES, catalog } from '#shared/utils/catalog'
export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  const origin = siteOrigin(useRuntimeConfig(event).public.siteUrl)
  const urls = LOCALES.flatMap((locale) => [
    `/${locale}`,
    ...catalog(locale).map((c) => `/${locale}/courses/${c.slug}`),
  ])
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((path) => `<url><loc>${xmlEscape(origin + path)}</loc></url>`).join('')}</urlset>`
})
