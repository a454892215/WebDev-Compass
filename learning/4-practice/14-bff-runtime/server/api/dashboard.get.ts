import { resolveSession, consume } from '../utils/state'
import { upstream, profileDTO, itemsDTO, UpstreamError } from '../utils/aggregate'
import { fail } from '../utils/failure'
import { modes, dashboardSchema, matches, type Mode } from '../../shared/contracts'
export default defineEventHandler(async (event) => {
  const sid = getCookie(event, 'demo_session')
  const session = resolveSession(sid)
  if (!session || !sid) return fail(event, 401, 'SESSION', '请先选择本地演示身份')
  if (!consume(sid)) {
    setResponseHeader(event, 'retry-after', 60)
    return fail(event, 429, 'RATE_LIMIT', '请求过多，请稍后重试')
  }
  const raw = getQuery(event).mode ?? 'ok'
  if (typeof raw !== 'string' || !modes.includes(raw as Mode))
    return fail(event, 400, 'QUERY', '未知实验情景')
  event.context.fixtureUser = session.user // scoped to this request, never a shared currentUser
  const abort = new AbortController()
  const onClose = () => {
    if (!event.node.res.writableEnded) abort.abort()
  }
  event.node.res.on('close', onClose)
  try {
    const origin = useRuntimeConfig(event).upstreamOrigin
    // Start both before awaiting. Profile is required; items can degrade explicitly.
    const [profile, items] = await Promise.allSettled([
      upstream(origin, 'profile', session.user, raw, abort.signal).then(profileDTO),
      upstream(origin, 'items', session.user, raw, abort.signal).then(itemsDTO),
    ])
    if (profile.status === 'rejected') {
      const timeout =
        profile.reason instanceof UpstreamError && profile.reason.kind === 'TIMEOUT'
      return fail(
        event,
        timeout ? 504 : 502,
        timeout ? 'UPSTREAM_TIMEOUT' : 'UPSTREAM',
        '用户服务暂不可用',
      )
    }
    const dto = {
      user: profile.value,
      items: items.status === 'fulfilled' ? items.value : [],
      warnings: items.status === 'fulfilled' ? [] : ['推荐内容暂不可用'],
      traceId: String(event.context.traceId),
    }
    if (!matches(dto, dashboardSchema))
      return fail(event, 500, 'CONTRACT', '响应契约校验失败')
    return dto
  } finally {
    event.node.res.off('close', onClose)
  }
})
