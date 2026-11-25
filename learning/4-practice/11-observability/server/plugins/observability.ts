import type { H3Event } from 'h3'
import { observability } from '../utils/observability'
import { routeLabel } from '../utils/trace'
export default defineNitroPlugin((app) => {
  function record(event: H3Event, status: number) {
    const ctx = event.context.observation
    if (!ctx || ctx.recorded) return
    ctx.recorded = true
    observability.log({
      level: status >= 500 ? 'error' : 'info',
      traceId: ctx.traceId,
      spanId: ctx.spanId,
      route: routeLabel(getRequestURL(event).pathname),
      status,
      durationMs: Math.max(0, Math.round(performance.now() - ctx.started)),
      release: String(useRuntimeConfig(event).release),
    })
  }
  app.hooks.hook('error', (error, { event }) => {
    if (!event) return
    const code =
      error && typeof error === 'object' && 'statusCode' in error
        ? Number(error.statusCode)
        : 500
    record(event, Number.isInteger(code) && code >= 400 && code <= 599 ? code : 500)
  })
  app.hooks.hook('afterResponse', (event) => record(event, getResponseStatus(event)))
})
