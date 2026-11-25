import type { H3Event } from 'h3'
export function requireOrigin(event: H3Event) {
  if (
    getHeader(event, 'origin') !== useRuntimeConfig(event).siteOrigin ||
    getHeader(event, 'sec-fetch-site') === 'cross-site'
  )
    throw createError({ statusCode: 403, statusMessage: 'Origin rejected' })
}
export async function smallBody(event: H3Event) {
  if (
    getHeader(event, 'content-type')?.split(';')[0]?.trim() !== 'application/json' ||
    (getHeader(event, 'content-encoding') || 'identity') !== 'identity'
  )
    throw createError({ statusCode: 415, statusMessage: 'JSON required' })
  const chunks: Buffer[] = []
  let size = 0
  const timer = setTimeout(() => event.node.req.destroy(new Error('timeout')), 2000)
  try {
    for await (const chunk of event.node.req.iterator({ destroyOnReturn: false })) {
      const b = Buffer.from(chunk)
      size += b.length
      if (size <= 2048) chunks.push(b)
      if (size > 8192) {
        setResponseHeader(event, 'connection', 'close')
        event.node.req.resume()
        break
      }
    }
  } finally {
    clearTimeout(timer)
  }
  if (size > 2048) throw createError({ statusCode: 413, statusMessage: 'Body too large' })
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Invalid JSON' })
  }
}
