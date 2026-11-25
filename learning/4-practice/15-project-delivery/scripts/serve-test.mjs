import { mkdirSync, writeFileSync, appendFileSync } from 'node:fs'
mkdirSync('test-results', { recursive: true })
writeFileSync('test-results/server-errors.log', '')
process.on('uncaughtExceptionMonitor', (e) =>
  appendFileSync('test-results/server-errors.log', String(e.stack ?? e) + '\n'),
)
await import('../.output/server/index.mjs')
