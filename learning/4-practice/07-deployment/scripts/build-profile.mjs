import { spawnSync } from 'node:child_process'
import { cpSync, rmSync, mkdirSync } from 'node:fs'
const profile = process.argv[2] || 'ssr'
if (!['ssr', 'ssg', 'csr'].includes(profile)) throw new Error('Unknown profile')
const result = spawnSync(
  'pnpm',
  ['exec', 'nuxt', profile === 'ssr' ? 'build' : 'generate'],
  { stdio: 'inherit', env: { ...process.env, STAGE7_PROFILE: profile } },
)
if (result.status !== 0) process.exit(result.status || 1)
mkdirSync('artifacts', { recursive: true })
rmSync(`artifacts/${profile}`, { recursive: true, force: true })
cpSync('.output', `artifacts/${profile}`, { recursive: true })
