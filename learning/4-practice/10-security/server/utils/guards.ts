import type { H3Event } from 'h3'
import { store } from './store'
export const cookieName = 'stage10_session'
export function sessionId(event: H3Event) {
  const id = getCookie(event, cookieName)
  if (!id || !store.get(id))
    throw createError({ statusCode: 401, statusMessage: 'Session required' })
  return id
}
export function sameOrigin(event: H3Event) {
  const expected = useRuntimeConfig(event).siteOrigin
  if (
    getHeader(event, 'origin') !== expected ||
    getHeader(event, 'sec-fetch-site') === 'cross-site'
  )
    throw createError({ statusCode: 403, statusMessage: 'Origin rejected' })
}
export function writeSession(event: H3Event) {
  sameOrigin(event)
  const id = sessionId(event)
  if (!store.verify(id, getHeader(event, 'x-csrf-token')))
    throw createError({ statusCode: 403, statusMessage: 'CSRF rejected' })
  return id
}
export async function smallJson(
  event: H3Event,
  contentType = 'application/json',
): Promise<Record<string, unknown>> {
  if (
    getHeader(event, 'content-type')?.split(';')[0]?.trim() !== contentType ||
    (getHeader(event, 'content-encoding') || 'identity') !== 'identity'
  )
    throw createError({ statusCode: 415, statusMessage: 'JSON required' })
  let size = 0,
    oversized = false
  const chunks: Buffer[] = []
  const deadline = setTimeout(
    () => event.node.req.destroy(new Error('Body read timeout')),
    2000,
  )
  try {
    for await (const chunk of event.node.req.iterator({ destroyOnReturn: false })) {
      const buffer = Buffer.from(chunk)
      size += buffer.length
      if (size > 4096) oversized = true
      if (!oversized) chunks.push(buffer)
      if (size > 16384) {
        setResponseHeader(event, 'connection', 'close')
        event.node.req.resume()
        break
      }
    }
  } catch {
    throw createError({ statusCode: 408, statusMessage: 'Body read failed' })
  } finally {
    clearTimeout(deadline)
  }
  if (oversized) throw createError({ statusCode: 413, statusMessage: 'Body too large' })
  let value: unknown
  try {
    value = JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Invalid JSON' })
  }
  if (!value || typeof value !== 'object' || Array.isArray(value))
    throw createError({ statusCode: 400, statusMessage: 'Object required' })
  return value as Record<string, unknown>
}
