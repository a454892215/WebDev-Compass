import { spawnSync } from 'node:child_process'
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import assert from 'node:assert/strict'
const root = resolve('.'),
  source = join(root, 'packages/core/src/index.ts'),
  dist = join(root, 'packages/core/dist')
await (await import('node:fs/promises')).mkdir(join(root, '.cache'), { recursive: true })
const cache = await mkdtemp(join(root, '.cache/verify-'))
const original = await readFile(source, 'utf8')
const probeSource = original + '\n// cache-input-probe\n'
let probeWritten = false
const environment = {
  ...process.env,
  TURBO_TELEMETRY_DISABLED: '1',
  TURBO_NO_UPDATE_NOTIFIER: '1',
}
function turbo(args, label = 'alpha') {
  const result = spawnSync(join(root, 'node_modules/.bin/turbo'), args, {
    cwd: root,
    env: { ...environment, COMPASS_LABEL: label },
    encoding: 'utf8',
    timeout: 20000,
  })
  assert.equal(result.status, 0, result.stderr || result.stdout || String(result.error))
  return result.stdout
}
const command = [
  'run',
  'build',
  '--filter=@compass/platform-core',
  '--cache=local:rw',
  '--cache-dir',
  cache,
  '--output-logs=none',
]
const cached = (output) => /\b1 cached,\s*1 total/.test(output)
try {
  const graph = JSON.parse(turbo(['run', 'build', '--dry=json', '--cache=local:rw']))
  const core = '@compass/platform-core#build'
  for (const app of ['web', 'preview']) {
    const task = graph.tasks.find(
      (t) => t.taskId === '@compass/platform-' + app + '#build',
    )
    assert.ok(
      task && task.dependencies.includes(core),
      app + ' must depend on core build',
    )
  }
  const first = turbo(command)
  assert.ok(!cached(first))
  const before = await readFile(join(dist, 'index.js'), 'utf8')
  const second = turbo(command)
  assert.ok(cached(second), 'warm task did not hit')
  await rm(dist, { recursive: true, force: true })
  const restore = turbo(command)
  assert.ok(cached(restore), 'missing dist should restore from cache')
  assert.equal(await readFile(join(dist, 'index.js'), 'utf8'), before)
  const envChange = turbo(command, 'beta')
  assert.ok(!cached(envChange))
  assert.equal(
    JSON.parse(await readFile(join(dist, 'build-info.json'), 'utf8')).label,
    'beta',
  )
  assert.equal(
    await readFile(source, 'utf8'),
    original,
    'Source changed before probe; preserving edits',
  )
  await writeFile(source, probeSource)
  probeWritten = true
  const inputChange = turbo(command, 'beta')
  assert.ok(!cached(inputChange))
  const selectors = spawnSync(
    'pnpm',
    ['--filter', '...@compass/platform-core', 'list', '--depth', '-1', '--json'],
    { cwd: root, encoding: 'utf8' },
  )
  assert.equal(selectors.status, 0, selectors.stderr)
  const names = JSON.parse(selectors.stdout).map((x) => x.name)
  for (const name of ['core', 'web', 'preview'])
    assert.ok(names.includes('@compass/platform-' + name))
  console.log(
    JSON.stringify(
      {
        tasks: graph.tasks.map((t) => ({ id: t.taskId, dependencies: t.dependencies })),
        dependencySelector: names,
        localCache: {
          coldMiss: true,
          warmHit: true,
          deletedOutputsRestored: true,
          environmentMiss: true,
          sourceInputMiss: true,
        },
        scope: 'real local Turbo; dependency selector not SCM --affected or remote cache',
      },
      null,
      2,
    ),
  )
} finally {
  try {
    const current = await readFile(source, 'utf8')
    if (current !== original && !(probeWritten && current === probeSource))
      throw new Error(
        'Source changed concurrently; preserving edits instead of restoring over them',
      )
    if (probeWritten && current === probeSource) await writeFile(source, original)
    turbo(command, 'local')
  } finally {
    await rm(cache, { recursive: true, force: true })
  }
}
