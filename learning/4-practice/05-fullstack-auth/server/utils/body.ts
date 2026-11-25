import type { H3Event } from 'h3'
export async function readLimitedBody(event: H3Event, limit: number): Promise<Buffer> {
  const chunks: Buffer[] = []
  let size = 0
  let exceeded = false
  // Node's default async iterator destroys the request on early return.
  // Keep the socket alive long enough to return a valid 413; drain without buffering.
  for await (const part of event.node.req.iterator({ destroyOnReturn: false })) {
    const chunk = Buffer.isBuffer(part) ? part : Buffer.from(part)
    size += chunk.length
    if (size > limit) {
      exceeded = true
      break
    }
    chunks.push(chunk)
  }
  if (exceeded) {
    event.node.req.resume()
    throw createError({ statusCode: 413, statusMessage: 'Request body too large' })
  }
  return Buffer.concat(chunks)
}
export async function readBoundedJson(event: H3Event): Promise<unknown> {
  const body = await readLimitedBody(event, 4096)
  try {
    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(body)) as unknown
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Invalid JSON' })
  }
}
