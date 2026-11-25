import { readFileSync, existsSync } from 'node:fs'
export default function teardown() {
  const path = 'test-results/server-errors.log'
  if (existsSync(path) && readFileSync(path, 'utf8').trim())
    throw new Error('Unexpected server exception; see test-results/server-errors.log')
}
