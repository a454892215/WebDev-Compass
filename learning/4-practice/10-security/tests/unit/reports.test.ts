import { it, expect } from 'vitest'
import { createReportSink } from '../../server/utils/reports'
it('keeps only bounded directive counters, never submitted URLs or samples', () => {
  const sink = createReportSink()
  for (let i = 0; i < 101; i++)
    expect(
      sink.record({
        'csp-report': {
          'effective-directive': 'script-src-elem',
          'document-uri': 'https://example.invalid/?token=synthetic',
          'script-sample': 'synthetic-secret',
        },
      }),
    ).toBe(true)
  expect(sink.summary()).toEqual({ 'script-src-elem': 100 })
  expect(JSON.stringify(sink.summary())).not.toContain('synthetic')
  expect(sink.record({ 'csp-report': { 'effective-directive': 'unknown' } })).toBe(false)
})
