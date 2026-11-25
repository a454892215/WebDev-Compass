import { mkdirSync, writeFileSync, appendFileSync } from 'node:fs'
mkdirSync('test-results', { recursive: true })
writeFileSync('test-results/server-errors.log', '')
process.on('uncaughtExceptionMonitor', (error) =>
  appendFileSync('test-results/server-errors.log', `${error.stack ?? error.message}\n`),
)
await import('../artifacts/ssr/server/index.mjs')
