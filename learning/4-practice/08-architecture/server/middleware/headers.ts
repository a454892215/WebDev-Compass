export default defineEventHandler((event) => {
  setResponseHeader(event, 'x-content-type-options', 'nosniff')
  setResponseHeader(event, 'referrer-policy', 'strict-origin-when-cross-origin')
})
