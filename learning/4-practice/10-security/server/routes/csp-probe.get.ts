import { randomBytes } from 'node:crypto'
export default defineEventHandler((event) => {
  const nonce = randomBytes(16).toString('base64')
  setResponseHeader(event, 'content-type', 'text/html; charset=utf-8')
  setResponseHeader(
    event,
    'content-security-policy',
    `default-src 'none';script-src 'nonce-${nonce}' 'strict-dynamic';base-uri 'none';object-src 'none';frame-ancestors 'none';report-uri /api/csp-report`,
  )
  setResponseHeader(event, 'x-content-type-options', 'nosniff')
  // Every byte is a developer-owned fixed probe. Never interpolate user HTML here.
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CSP解析器探针</title></head><body><h1>CSP解析器探针</h1><script nonce="${nonce}">window.__trustedProbe=1</script><script>window.__parserExecuted=1</script><p>固定未授权脚本应被策略阻挡；这里不是Nuxt组件页。</p><a href="/">返回</a></body></html>`
})
