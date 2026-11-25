import { mkdirSync, writeFileSync, appendFileSync } from 'node:fs'
import { startUpstream } from './upstream.mjs'
mkdirSync('test-results', { recursive: true })
writeFileSync('test-results/server-errors.log', '')
process.on('uncaughtExceptionMonitor', (e) =>
  appendFileSync('test-results/server-errors.log', String(e.stack ?? e) + '\n'),
)
const upstream = startUpstream()
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => upstream.close())
await import('../.output/server/index.mjs')
