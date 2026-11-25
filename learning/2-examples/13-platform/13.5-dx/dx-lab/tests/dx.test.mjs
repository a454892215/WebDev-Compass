import test from 'node:test'
import assert from 'node:assert/strict'
import { RuleTester, ESLint } from 'eslint'
import jscodeshift from 'jscodeshift'
import {
  mkdtemp,
  readFile,
  writeFile,
  rm,
  mkdir,
  symlink
} from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { tmpdir } from 'node:os'
import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import rule from '../config/rules/no-app-import.mjs'
import config from '../config/index.mjs'
import { generate } from '../generate.mjs'
const require = createRequire(import.meta.url),
  transform = require('../transforms/rename-title.cjs')
const j = jscodeshift.withParser('tsx')
const apply = (source) =>
  transform({ source, path: 'fixture.tsx' }, { jscodeshift: j })
test('RuleTester static import/reexport/dynamic literal; sibling names allowed', () => {
  new RuleTester({
    languageOptions: { ecmaVersion: 2022, sourceType: 'module' }
  }).run('no-app-import', rule, {
    valid: [
      "import x from '@demo/core'",
      "import x from '@demo/application'",
      "const message = '@demo/app'"
    ],
    invalid: [
      {
        code: "import x from '@demo/app';",
        errors: [{ messageId: 'forbidden' }]
      },
      {
        code: "export {x} from '../../apps/site';",
        errors: [{ messageId: 'forbidden' }]
      },
      {
        code: "export * from '@demo/app/private';",
        errors: [{ messageId: 'forbidden' }]
      },
      {
        code: "const x = import('@demo/app');",
        errors: [{ messageId: 'forbidden' }]
      }
    ]
  })
})
test('shared flat config loads in real ESLint and remains scoped', async () => {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: config
  })
  const checked = await eslint.calculateConfigForFile(
    resolve('domain/feature.js')
  )
  assert.equal(checked.rules['compass/no-app-import'][0], 2)
  const good = await eslint.lintText("import x from '@demo/core';", {
    filePath: 'domain/feature.js'
  })
  assert.equal(good[0].errorCount, 0)
  const bad = await eslint.lintText("import x from '@demo/app';", {
    filePath: 'domain/feature.js'
  })
  assert.equal(bad[0].errorCount, 1)
  assert.equal(bad[0].messages[0].ruleId, 'compass/no-app-import')
  const outside = await eslint.lintText("import x from '@demo/app';", {
    filePath: 'app/feature.js'
  })
  assert.ok(
    !outside[0].messages.some((m) => m.ruleId === 'compass/no-app-import')
  )
})
test('real AST import migration preserves alias/shadow/property/other module; idempotent', () => {
  const input =
    "import {oldTitle, oldTitle as alias} from '@demo/core';\nimport {oldTitle as other} from '@demo/other';\nfunction nested(oldTitle){return oldTitle('local');}\nconst obj={oldTitle:'literal'};\noldTitle('a');alias('b');other('c');"
  const result = apply(input)
  assert.match(result, /newTitle as oldTitle/)
  assert.match(result, /newTitle as alias/)
  assert.match(result, /@demo\/other/)
  assert.match(result, /function nested\(oldTitle\)/)
  assert.match(result, /return oldTitle\('local'\)/)
  assert.match(result, /oldTitle: ?'literal'/)
  assert.equal(apply(result), result)
  assert.equal(
    apply("import type {oldTitle} from '@demo/core';"),
    "import type {oldTitle} from '@demo/core';"
  )
  assert.throws(() => apply('export const broken = ;'))
})
test('real jscodeshift CLI writes only fixture, invalid parser fails explicitly', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'stage13-codemod-'))
  try {
    const path = join(dir, 'fixture.ts')
    await writeFile(path, "import {oldTitle} from '@demo/core'; oldTitle('a');")
    const args = [
      '-t',
      resolve('transforms/rename-title.cjs'),
      '--run-in-band',
      '--parser=tsx',
      '--fail-on-error',
      path
    ]
    const first = spawnSync(resolve('node_modules/.bin/jscodeshift'), args, {
      encoding: 'utf8'
    })
    assert.equal(first.status, 0, first.stderr + first.stdout)
    const output = await readFile(path, 'utf8')
    assert.match(output, /newTitle as oldTitle/)
    const second = spawnSync(resolve('node_modules/.bin/jscodeshift'), args, {
      encoding: 'utf8'
    })
    assert.equal(second.status, 0)
    assert.equal(await readFile(path, 'utf8'), output)
    await writeFile(path, 'export const broken = ;')
    const negative = spawnSync(resolve('node_modules/.bin/jscodeshift'), args, {
      encoding: 'utf8'
    })
    assert.notEqual(negative.status, 0)
    assert.match(negative.stdout + negative.stderr, /ERR|error/i)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})
test('generator temp scaffold, no overwrite/traversal/symlink target or implicit install', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'stage13-generator-'))
  try {
    const target = await generate(dir, 'fixture-one')
    const pkg = JSON.parse(await readFile(join(target, 'package.json'), 'utf8'))
    assert.equal(pkg.name, 'fixture-one')
    assert.equal(pkg.private, true)
    assert.equal(pkg.scripts, undefined)
    await writeFile(join(target, 'sentinel'), 'keep')
    await assert.rejects(() => generate(dir, 'fixture-one'), {
      code: 'EEXIST'
    })
    assert.equal(await readFile(join(target, 'sentinel'), 'utf8'), 'keep')
    for (const name of [
      '..',
      '../escape',
      '/tmp/escape',
      'a/b',
      'a\\b',
      'UPPER',
      'a name'
    ])
      await assert.rejects(() => generate(dir, name), /Invalid project name/)
    await mkdir(join(dir, 'outside'))
    await symlink(join(dir, 'outside'), join(dir, 'linked'), 'dir')
    await assert.rejects(() => generate(dir, 'linked'), { code: 'EEXIST' })
    const cli = spawnSync(
      process.execPath,
      [resolve('generate.mjs'), dir, 'fixture-cli'],
      { encoding: 'utf8' }
    )
    assert.equal(cli.status, 0, cli.stderr)
    assert.equal(
      JSON.parse(await readFile(join(dir, 'fixture-cli/package.json'), 'utf8'))
        .name,
      'fixture-cli'
    )
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})
test('VSCode workspace/snippets static schema expectations only', async () => {
  const workspace = JSON.parse(
    await readFile('templates/compass.code-workspace', 'utf8')
  )
  const snippets = JSON.parse(
    await readFile('templates/course.code-snippets', 'utf8')
  )
  assert.equal(workspace.folders.length, 2)
  assert.equal(
    resolve('templates', workspace.folders[0].path),
    resolve('../../../..', '4-practice/13-platform')
  )
  assert.ok(workspace.extensions.recommendations.includes('Vue.volar'))
  assert.match(snippets['Native button'].body[0], /type="button"/)
  assert.ok(snippets['Native button'].body[0].includes('$' + '{1:操作}'))
})
test('shared config packs its rule and is consumed from actual tarball', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'stage13-eslint-pack-'))
  try {
    const pack = spawnSync('pnpm', ['pack', '--pack-destination', dir], {
      cwd: resolve('config'),
      encoding: 'utf8'
    })
    assert.equal(pack.status, 0, pack.stderr + pack.stdout)
    const { readdir } = await import('node:fs/promises')
    const archive = (await readdir(dir)).find((x) => x.endsWith('.tgz'))
    assert.ok(archive)
    const unpack = spawnSync('tar', ['-xzf', join(dir, archive), '-C', dir], {
      encoding: 'utf8'
    })
    assert.equal(unpack.status, 0, unpack.stderr)
    const { pathToFileURL } = await import('node:url')
    const shared = (
      await import(pathToFileURL(join(dir, 'package/index.mjs')).href)
    ).default
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: shared
    })
    const result = await eslint.lintText("import x from '@demo/app';", {
      filePath: 'domain/fixture.js'
    })
    assert.equal(result[0].errorCount, 1)
    assert.equal(result[0].messages[0].ruleId, 'compass/no-app-import')
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
})
