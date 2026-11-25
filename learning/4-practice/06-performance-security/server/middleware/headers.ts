export default defineEventHandler((event) => {
  setHeader(
    event,
    'Content-Security-Policy',
    "frame-ancestors 'none'; base-uri 'self'; object-src 'none'",
  )
  setHeader(event, 'X-Content-Type-Options', 'nosniff')
  setHeader(event, 'Referrer-Policy', 'strict-origin-when-cross-origin')
})
