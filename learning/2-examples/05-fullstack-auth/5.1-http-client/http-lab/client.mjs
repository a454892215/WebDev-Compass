export class ApiError extends Error {
  constructor(kind, message, status) {
    super(message)
    this.name = 'ApiError'
    this.kind = kind
    this.status = status
  }
}
export function decodePage(value) {
  if (
    !value ||
    typeof value !== 'object' ||
    !Array.isArray(value.items) ||
    !Number.isInteger(value.total) ||
    value.total < 0
  )
    throw new ApiError('schema', 'Expected items and total')
  const ids = new Set()
  return {
    items: value.items.map((item) => {
      if (
        !item ||
        typeof item.id !== 'string' ||
        !item.id ||
        typeof item.title !== 'string' ||
        !item.title ||
        ids.has(item.id)
      )
        throw new ApiError('schema', 'Invalid or duplicate item')
      ids.add(item.id)
      return { id: item.id, title: item.title }
    }),
    total: value.total,
  }
}
export async function readJSON(url, { fetcher = fetch, signal } = {}) {
  const response = await fetcher(url, { signal })
  if (!response.ok) throw new ApiError('http', `HTTP ${response.status}`, response.status)
  if (response.status === 204) return null
  if (!(response.headers.get('content-type') || '').includes('application/json'))
    throw new ApiError('content-type', 'Expected application/json')
  try {
    return await response.json()
  } catch (error) {
    if (signal?.aborted) throw error
    throw new ApiError('parse', 'Invalid JSON')
  }
}
export function latestLoader(loader, notify) {
  let generation = 0,
    controller
  return {
    async load(query) {
      const own = ++generation
      controller?.abort()
      controller = new AbortController()
      if (!query.trim()) {
        notify({ kind: 'empty', items: [] })
        return
      }
      notify({ kind: 'loading' })
      try {
        const result = await loader(query, controller.signal)
        if (own === generation)
          notify({ kind: result.items.length ? 'success' : 'empty', ...result })
      } catch (error) {
        if (own === generation) notify({ kind: 'error', message: error.message })
      }
    },
    dispose() {
      generation++
      controller?.abort()
    },
  }
}
export function retryAfterMillis(value, now = Date.now(), maximum = 1000) {
  if (!value) return null
  const seconds = /^\d+$/.test(value) ? Number(value) * 1000 : Date.parse(value) - now
  if (!Number.isFinite(seconds)) return null
  // A server delay above the local budget is declined, never shortened.
  return seconds >= 0 && seconds <= maximum ? seconds : null
}
async function sleep(ms, signal) {
  signal?.throwIfAborted()
  await new Promise((resolve, reject) => {
    const finish = () => {
      signal?.removeEventListener('abort', abort)
      resolve()
    }
    const timer = setTimeout(finish, ms)
    const abort = () => {
      clearTimeout(timer)
      signal?.removeEventListener('abort', abort)
      reject(signal.reason)
    }
    signal?.addEventListener('abort', abort, { once: true })
  })
}
export async function safeRead(
  url,
  {
    method = 'GET',
    attempts = 3,
    signal,
    fetcher = fetch,
    wait = sleep,
    now = Date.now,
  } = {},
) {
  if (!['GET', 'HEAD'].includes(method))
    throw new ApiError('policy', 'Automatic retry is read-only in this lab')
  if (!Number.isInteger(attempts) || attempts < 1 || attempts > 3)
    throw new ApiError('policy', 'attempts must be 1..3')
  for (let i = 0; i < attempts; i++) {
    signal?.throwIfAborted()
    // Network failures are deliberately not retried here; caller decides the contract.
    const response = await fetcher(url, { method, signal })
    if (![429, 503].includes(response.status) || i + 1 === attempts) return response
    const header = response.headers.get('retry-after')
    const delay = header
      ? retryAfterMillis(header, now(), 1000)
      : Math.min(50 * 2 ** i, 1000)
    if (delay === null) return response
    await response.body?.cancel()
    await wait(delay, signal)
  }
}
export function apiURL(origin, path, allowedOrigins) {
  const base = new URL(origin)
  if (
    !allowedOrigins.includes(base.origin) ||
    !['https:', 'http:'].includes(base.protocol) ||
    base.username ||
    base.password
  )
    throw new ApiError('config', 'Origin not allowed')
  const url = new URL(path, base)
  if (url.origin !== base.origin) throw new ApiError('config', 'Path escaped API origin')
  return url
}
