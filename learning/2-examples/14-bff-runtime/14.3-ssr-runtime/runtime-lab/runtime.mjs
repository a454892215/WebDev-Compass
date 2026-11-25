import { createServer } from 'node:http'
import { setTimeout as delay } from 'node:timers/promises'

// Per-call context; this is a Node teaching model, not a Nitro implementation.
export async function requestView(identity, gate = () => Promise.resolve()) {
  const context = { identity }
  await gate()
  return { displayName: context.identity }
}

export function upstreamHeaders(requestHeaders, serviceToken) {
  // Never spread cookies/authorization/forwarded headers from an incoming user.
  const result = { authorization: `Bearer ${serviceToken}` }
  const language = requestHeaders['accept-language']
  if (language && /^[a-zA-Z0-9,;=. *-]{1,100}$/.test(language)) {
    result['accept-language'] = language
  }
  return result
}

export async function aggregate(loadProfile, loadCatalog) {
  // Both independent operations start before either is awaited.
  const [profile, catalog] = await Promise.all([loadProfile(), loadCatalog()])
  return { profile, catalog }
}

export function streamServer() {
  const stats = { closedEarly: 0, active: 0, sent: 0 }
  const server = createServer(async (request, response) => {
    const path = new URL(request.url, 'http://127.0.0.1').pathname
    if (path === '/before-error') {
      response.writeHead(503, { 'content-type': 'application/json', 'cache-control': 'no-store' })
      response.end(JSON.stringify({ code: 'TEMPORARY', retryable: true }))
      return
    }
    if (!['/stream', '/partial', '/cancel'].includes(path)) {
      response.writeHead(404).end()
      return
    }
    const controller = new AbortController()
    stats.active++
    const close = () => {
      if (!response.writableFinished) stats.closedEarly++
      controller.abort()
    }
    response.once('close', close)
    response.writeHead(200, { 'content-type': 'application/x-ndjson', 'cache-control': 'no-store' })
    response.flushHeaders()
    try {
      response.write(JSON.stringify({ type: 'start', cursor: 0 }) + '\n')
      stats.sent++
      await delay(path === '/cancel' ? 2000 : 100, undefined, { signal: controller.signal })
      if (path === '/partial') {
        // Status is already committed. Report a protocol error; do not try writeHead(500).
        response.end(JSON.stringify({ type: 'error', code: 'TEMPORARY', retryable: true }) + '\n')
      } else {
        response.end(JSON.stringify({ type: 'done', cursor: 1 }) + '\n')
        stats.sent++
      }
    } catch (error) {
      if (!controller.signal.aborted) response.destroy(error)
    } finally {
      response.off('close', close)
      stats.active--
    }
  })
  return { server, stats }
}
