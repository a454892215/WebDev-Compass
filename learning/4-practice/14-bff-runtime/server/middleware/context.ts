import { randomUUID } from 'node:crypto'
export default defineEventHandler((event) => {
  event.context.traceId = randomUUID()
  setResponseHeader(event, 'x-request-id', event.context.traceId)
  setResponseHeader(event, 'cache-control', 'private, no-store')
  setResponseHeader(event, 'x-content-type-options', 'nosniff')
  // This same-origin teaching BFF deliberately grants no cross-origin access.
  // CORS is a browser read policy, not authentication or a substitute for CSRF checks.
})
