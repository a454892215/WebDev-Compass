import { randomBytes } from 'node:crypto'
export function traceContext(header?: string) {
  const match = /^00-([0-9a-f]{32})-([0-9a-f]{16})-([0-9a-f]{2})$/.exec(header || '')
  const valid = match && match[1] !== '0'.repeat(32) && match[2] !== '0'.repeat(16)
  const traceId = valid ? match[1]! : randomBytes(16).toString('hex')
  const spanId = randomBytes(8).toString('hex')
  return { traceId, spanId, traceparent: '00-' + traceId + '-' + spanId + '-00' }
}
export const routeNames = [
  '/',
  '/boundaries',
  '/api/workspace',
  '/api/fixture',
  '/api/telemetry',
  '/api/demo-failure',
  '/api/health',
  '/api/diagnostics',
] as const
export function routeLabel(path: string) {
  return (routeNames as readonly string[]).includes(path) ? path : 'other'
}
