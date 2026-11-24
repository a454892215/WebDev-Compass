import { spawnSync } from 'node:child_process'
const result = spawnSync(
  process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm',
  ['exec', 'nuxt', 'generate'],
  { stdio: 'inherit', env: { ...process.env, COMPASS_PRERENDER: '1' } },
)
process.exit(result.status ?? 1)
