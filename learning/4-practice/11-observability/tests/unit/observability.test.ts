import { describe, it, expect } from 'vitest'
import { createObservability, validBatch } from '../../server/utils/observability'
import { traceContext, routeLabel } from '../../server/utils/trace'
import { subjectFrom, flagDecision } from '../../server/utils/flags'
describe('telemetry trust and bounded retention', () => {
  it('allows fixed codes only, forbids raw PII and oversized event arrays', () => {
    expect(validBatch({ version: 1, events: [{ code: 'module_failure' }] })).toBe(true)
    for (const data of [
      {
        version: 1,
        events: [{ code: 'module_failure', email: 'fixture@example.invalid' }],
      },
      { version: 1, events: [] },
      { version: 1, events: Array.from({ length: 9 }, () => ({ code: 'manual_demo' })) },
      { version: 1, events: [{ code: 'raw_stack' }] },
      { version: 1, events: [{ code: 'manual_demo' }], userId: 'fixture' },
    ])
      expect(validBatch(data)).toBe(false)
  })
  it('caps stored events and physically prunes only on access', () => {
    let time = 0
    const sink = createObservability(() => time)
    sink.add(Array.from({ length: 70 }, () => ({ code: 'manual_demo' as const })))
    expect(sink.snapshot().events).toHaveLength(50)
    time = 300000
    expect(sink.snapshot().events).toHaveLength(0)
  })
  it('uses validated nonzero context and new span; unknown URLs collapse cardinality', () => {
    const context = traceContext('00-' + '1'.repeat(32) + '-' + '2'.repeat(16) + '-01')
    expect(context.traceId).toBe('1'.repeat(32))
    expect(context.spanId).not.toBe('2'.repeat(16))
    expect(context.traceparent.endsWith('-00')).toBe(true)
    expect(
      traceContext('00-' + '0'.repeat(32) + '-' + '2'.repeat(16) + '-01').traceId,
    ).not.toBe('0'.repeat(32))
    expect(routeLabel('/private/person-fixture')).toBe('other')
  })
  it('keeps assignment stable, kill takes priority, malformed percentage fails closed', () => {
    const a = flagDecision('fixture-a', false),
      b = flagDecision('fixture-a', false)
    expect(a).toEqual(b)
    expect(flagDecision('fixture-a', true, 100).enabled).toBe(false)
    expect(flagDecision('fixture-a', false, 100).enabled).toBe(true)
    expect(flagDecision('fixture-a', false, 0).enabled).toBe(false)
    expect(flagDecision('fixture-a', false, NaN).enabled).toBe(false)
    expect(flagDecision(subjectFrom('admin'), false, 100).enabled).toBe(false)
  })
})
