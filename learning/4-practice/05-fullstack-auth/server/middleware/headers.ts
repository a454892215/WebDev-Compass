export default defineEventHandler((event) => {
  const path = getRequestURL(event).pathname
  if (!path.startsWith('/_nuxt/')) {
    setHeader(event, 'Cache-Control', 'private, no-store')
    setHeader(event, 'Vary', 'Cookie')
    setHeader(event, 'X-Content-Type-Options', 'nosniff')
    setHeader(event, 'Referrer-Policy', 'same-origin')
    setHeader(event, 'X-Frame-Options', 'DENY')
    setHeader(
      event,
      'Content-Security-Policy',
      "frame-ancestors 'none'; base-uri 'self'; object-src 'none'",
    )
  }
})
