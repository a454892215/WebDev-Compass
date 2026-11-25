import { siteOrigin } from '#shared/utils/seo'
export default defineEventHandler((event) => {
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  const origin = siteOrigin(useRuntimeConfig(event).public.siteUrl)
  return `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${origin}/sitemap.xml\n`
})
