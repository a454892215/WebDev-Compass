const allowed = new Set([
  'script-src-elem',
  'script-src-attr',
  'script-src',
  'style-src-elem',
  'frame-ancestors',
  'require-trusted-types-for',
  'trusted-types',
])
export function createReportSink() {
  const counts = new Map<string, number>()
  return {
    record(value: unknown) {
      if (!value || typeof value !== 'object') return false
      const report = (value as Record<string, unknown>)['csp-report']
      if (!report || typeof report !== 'object') return false
      const directive = (report as Record<string, unknown>)['effective-directive']
      if (typeof directive !== 'string' || !allowed.has(directive)) return false
      counts.set(directive, Math.min((counts.get(directive) || 0) + 1, 100))
      return true
    },
    summary() {
      return Object.fromEntries(counts)
    },
  }
}
export const reportSink = createReportSink()
