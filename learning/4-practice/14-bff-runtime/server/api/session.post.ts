import { issueSession } from '../utils/state'
import { fail } from '../utils/failure'
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  if (getHeader(event, 'origin') !== config.appOrigin)
    return fail(event, 403, 'ORIGIN', '请从本地同源页面操作')
  if (getHeader(event, 'content-type')?.split(';')[0]?.trim() !== 'application/json')
    return fail(event, 415, 'TYPE', '需要 JSON 请求')
  // Read bounded bytes ourselves on this Node preset. H3 v2 docs differ from installed v1.
  let text = ''
  let size = 0
  for await (const chunk of event.node.req) {
    size += Buffer.byteLength(chunk)
    // Drain the small loopback fixture request without early iterator destruction.
    // Keep at most 256 bytes; production ingress must also enforce size/read-time limits.
    if (size <= 256) text += chunk.toString()
  }
  if (size > 256) return fail(event, 413, 'SIZE', '请求体过大')
  let body: unknown
  try {
    body = JSON.parse(text)
  } catch {
    return fail(event, 400, 'BODY', 'JSON 格式错误')
  }
  if (
    !body ||
    typeof body !== 'object' ||
    Array.isArray(body) ||
    Object.keys(body).length !== 1 ||
    !('user' in body) ||
    typeof body.user !== 'string' ||
    !['alice', 'bob'].includes(body.user)
  )
    return fail(event, 400, 'BODY', '只允许两个合成演示用户')
  const user = (body as { user: 'alice' | 'bob' }).user
  setCookie(event, 'demo_session', issueSession(user), {
    httpOnly: true,
    sameSite: 'lax',
    secure: config.appOrigin.startsWith('https:'),
    path: '/',
    maxAge: 600,
  })
  return { user, notice: '仅本地合成身份选择，不是生产登录' }
})
