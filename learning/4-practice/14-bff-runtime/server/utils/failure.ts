import type { H3Event } from 'h3'
export function fail(event: H3Event, status: number, code: string, message: string) {
  setResponseStatus(event, status)
  return {
    error: { code, message, traceId: String(event.context.traceId ?? 'unavailable') },
  }
}
