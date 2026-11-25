export type EventCode = 'module_failure' | 'manual_demo' | 'api_failure'
const codes = new Set<EventCode>(['module_failure', 'manual_demo', 'api_failure'])
export function validBatch(
  value: unknown,
): value is { version: 1; events: { code: EventCode }[] } {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const v = value as Record<string, unknown>
  return (
    Object.keys(v).length === 2 &&
    v.version === 1 &&
    Array.isArray(v.events) &&
    v.events.length > 0 &&
    v.events.length <= 8 &&
    v.events.every(
      (e: unknown) =>
        !!e &&
        typeof e === 'object' &&
        !Array.isArray(e) &&
        Object.keys(e).length === 1 &&
        codes.has((e as { code: EventCode }).code),
    )
  )
}
export type Log = {
  level: 'info' | 'error'
  traceId: string
  spanId: string
  route: string
  status: number
  durationMs: number
  release: string
}
export function createObservability(now = Date.now) {
  const events: { code: EventCode; at: number }[] = []
  const logs: (Log & { at: number })[] = []
  function prune() {
    const before = now() - 300000
    while (events.length && events[0]!.at <= before) events.shift()
    while (logs.length && logs[0]!.at <= before) logs.shift()
  }
  return {
    add(batch: { code: EventCode }[]) {
      prune()
      for (const item of batch) events.push({ code: item.code, at: now() })
      if (events.length > 50) events.splice(0, events.length - 50)
    },
    log(entry: Log) {
      prune()
      logs.push({ ...entry, at: now() })
      if (logs.length > 50) logs.shift()
    },
    snapshot() {
      prune()
      return {
        events: events.map(({ code }) => ({ code })),
        logs: logs.map(({ at: _at, ...entry }) => entry),
        retention: 'last50/5min-lazy',
      }
    },
  }
}
export const observability = createObservability()
