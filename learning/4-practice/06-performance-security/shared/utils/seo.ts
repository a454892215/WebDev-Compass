import { LOCALES } from './catalog'
export function siteOrigin(value: string) {
  const url = new URL(value)
  if (
    !['http:', 'https:'].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.pathname !== '/' ||
    url.search ||
    url.hash
  )
    throw new Error('siteUrl must be a clean HTTP(S) origin')
  return url.origin
}
export function jsonLd(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}
export function alternates(origin: string, suffix = '') {
  return [
    ...LOCALES.map((locale) => ({
      rel: 'alternate' as const,
      type: 'text/html' as const,
      hreflang: locale,
      href: `${origin}/${locale}${suffix}`,
    })),
    {
      rel: 'alternate' as const,
      type: 'text/html' as const,
      hreflang: 'x-default',
      href: `${origin}/zh-CN${suffix}`,
    },
  ]
}
export function xmlEscape(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
