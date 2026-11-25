// Framework-neutral teaching policy, executed by Node's Web APIs, not workerd.
export async function chooseVariant(subject) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(subject))
  return new Uint8Array(digest)[0] % 2 ? 'B' : 'A'
}

export function createHandler({ resolveSession, catalog, trustedCountry = () => 'ZZ' }) {
  return async function handle(request) {
    const url = new URL(request.url)
    if (request.method !== 'GET') return new Response('Method not allowed', { status: 405 })
    if (url.pathname === '/private') {
      // resolveSession must verify opaque server-issued session, never accept x-user-id.
      const user = await resolveSession(request)
      if (!user) return new Response('Sign in', { status: 401, headers: { 'Cache-Control': 'no-store' } })
      return Response.json({ name: user.name }, { headers: { 'Cache-Control': 'private, no-store' } })
    }
    if (url.pathname !== '/catalog') return new Response('Not found', { status: 404 })
    if ([...url.searchParams.keys()].some(key => key !== 'lang')) return new Response('Bad query', { status: 400 })
    const lang = url.searchParams.get('lang') ?? 'zh'
    if (!['zh', 'en'].includes(lang)) return new Response('Bad language', { status: 400 })
    // Credential-bearing requests bypass shared cache even if this resource is public.
    const personalized = request.headers.has('cookie') || request.headers.has('authorization')
    const body = await catalog(lang, !personalized)
    return Response.json(body, { headers: {
      'Cache-Control': personalized ? 'private, no-store' : 'public, max-age=0, s-maxage=10, stale-while-revalidate=20',
      // Country is supplied by a platform adapter, not taken from client x-country.
      'X-Demo-Region': trustedCountry(request) === 'CN' ? 'asia' : 'default',
    } })
  }
}

export function createPublicCache({ now, load, freshMs = 10_000, staleMs = 20_000, maxEntries = 8 }) {
  const entries = new Map()
  const pending = new Map()
  async function refresh(key) {
    if (pending.has(key)) return pending.get(key)
    const job = (async () => {
      const value = await load(key)
      if (!entries.has(key) && entries.size >= maxEntries) entries.delete(entries.keys().next().value)
      entries.set(key, { value, at: now() })
      return value
    })()
    pending.set(key, job)
    try { return await job } finally { pending.delete(key) }
  }
  return {
    async get(key, allowShared = true) {
      if (!allowShared) return load(key)
      const entry = entries.get(key)
      if (!entry || now() - entry.at >= freshMs + staleMs) return refresh(key)
      if (now() - entry.at >= freshMs) void refresh(key).catch(() => {})
      return entry.value
    },
    settle: () => Promise.allSettled([...pending.values()]),
    size: () => entries.size,
  }
}

// Deliberate two-location stale-read model. It is NOT an implementation of Workers KV.
export function createEventualStore() {
  const primary = new Map()
  const replicas = new Map()
  return {
    write: (key, value) => primary.set(key, value),
    read(region, key) {
      if (!replicas.has(region)) replicas.set(region, new Map(primary))
      return replicas.get(region).get(key)
    },
    refresh: region => replicas.set(region, new Map(primary)),
  }
}
