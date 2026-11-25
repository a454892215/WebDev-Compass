import type { FixtureUser } from './state'
export class UpstreamError extends Error {
  constructor(public kind: 'TIMEOUT' | 'UPSTREAM' | 'SCHEMA') {
    super(kind)
  }
}
export async function upstream(
  origin: string,
  path: 'profile' | 'items',
  user: FixtureUser,
  mode: string,
  parent: AbortSignal,
): Promise<unknown> {
  // Fixed origin and enum path. Never proxy a user-provided URL or forward browser credentials.
  const base = new URL(origin)
  if (base.origin !== 'http://127.0.0.1:4567') throw new UpstreamError('UPSTREAM')
  const url = new URL('/' + path, base)
  url.searchParams.set('mode', mode)
  const deadline = AbortSignal.timeout(250)
  const signal = AbortSignal.any([parent, deadline])
  try {
    const res = await fetch(url, {
      signal,
      redirect: 'error',
      headers: { authorization: 'Bearer fixture-' + user, accept: 'application/json' },
    })
    if (!res.ok) throw new UpstreamError('UPSTREAM')
    // Deadline covers body consumption, not just response headers.
    return await res.json()
  } catch (error) {
    if (deadline.aborted && !parent.aborted) throw new UpstreamError('TIMEOUT')
    if (error instanceof UpstreamError) throw error
    throw new UpstreamError('UPSTREAM')
  }
}
export function profileDTO(value: unknown) {
  if (
    !value ||
    typeof value !== 'object' ||
    !('id' in value) ||
    typeof value.id !== 'string' ||
    !('name' in value) ||
    typeof value.name !== 'string'
  )
    throw new UpstreamError('SCHEMA')
  return { id: value.id, name: value.name }
}
export function itemsDTO(value: unknown) {
  if (!Array.isArray(value)) throw new UpstreamError('SCHEMA')
  return value.map((v) => {
    if (!v || typeof v.id !== 'string' || typeof v.title !== 'string')
      throw new UpstreamError('SCHEMA')
    return { id: v.id, title: v.title }
  })
}
