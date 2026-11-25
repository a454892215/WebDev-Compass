import { mkdtemp, mkdir, writeFile, readFile, rm, realpath } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { tmpdir } from 'node:os'
import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import assert from 'node:assert/strict'
const root = resolve('.'),
  directory = await mkdtemp(join(tmpdir(), 'stage12-changesets-'))
const binary = join(root, 'node_modules/.bin/changeset')
function run(args) {
  const r = spawnSync(binary, args, { cwd: directory, encoding: 'utf8' })
  assert.equal(r.status, 0, r.stderr || r.stdout)
  return r.stdout
}
try {
  await mkdir(join(directory, 'packages/ui'), { recursive: true })
  await writeFile(
    join(directory, 'package.json'),
    JSON.stringify({
      name: 'private-release-fixture',
      private: true,
      packageManager: 'pnpm@11.4.0',
    }),
  )
  await writeFile(join(directory, 'pnpm-workspace.yaml'), 'packages:\n  - packages/*\n')
  await writeFile(
    join(directory, 'packages/ui/package.json'),
    JSON.stringify({ name: '@compass/changeset-fixture', version: '1.0.0' }),
  )
  const localRequire = createRequire(
    await realpath(join(root, 'node_modules/@changesets/cli/package.json')),
  )
  const { defaultWrittenConfig } = await import(
    pathToFileURL(localRequire.resolve('@changesets/config')).href
  )
  await mkdir(join(directory, '.changeset'), { recursive: true })
  await writeFile(
    join(directory, '.changeset/config.json'),
    JSON.stringify({
      ...defaultWrittenConfig,
      commit: false,
      changelog: '@changesets/cli/changelog',
      baseBranch: 'main',
    }),
  )
  await writeFile(
    join(directory, '.changeset/local-fixture.md'),
    '---\n"@compass/changeset-fixture": patch\n---\n\n修正按钮默认语义的教学发布记录。\n',
  )
  run(['version'])
  const pkg = JSON.parse(
    await readFile(join(directory, 'packages/ui/package.json'), 'utf8'),
  )
  const changelog = await readFile(join(directory, 'packages/ui/CHANGELOG.md'), 'utf8')
  assert.equal(pkg.version, '1.0.1')
  assert.ok(changelog.includes('1.0.1') && changelog.includes('修正按钮'))
  console.log(
    JSON.stringify(
      {
        realCLI: true,
        from: '1.0.0',
        to: pkg.version,
        changelogGenerated: true,
        published: false,
        scope: 'temporary fixture only',
      },
      null,
      2,
    ),
  )
} finally {
  await rm(directory, { recursive: true, force: true })
}
