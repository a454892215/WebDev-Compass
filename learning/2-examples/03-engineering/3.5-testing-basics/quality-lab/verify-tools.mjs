import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import {
  mkdtemp,
  mkdir,
  readFile,
  rm,
  symlink,
  writeFile,
} from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as prettier from 'prettier'

const lab = fileURLToPath(new URL('./', import.meta.url))
const root = fileURLToPath(new URL('../../../../../', import.meta.url))
const report = {
  date: new Date().toISOString(),
  checks: [],
  scope:
    'Actual local CLI negative cases, temporary Git hooks and npm pack dry run. No real publish or main-repository hook/config modifications.',
}
const node = process.execPath
const tool = (name) => resolve(lab, 'node_modules', name)
function run(program, args, cwd = lab, expected = 0) {
  const result = spawnSync(program, args, {
    cwd,
    encoding: 'utf8',
    timeout: 20000,
    env: { ...process.env, CI: 'true', NO_COLOR: '1', FORCE_COLOR: '0' },
  })
  if (result.error) throw result.error
  if (expected === 'nonzero')
    assert.notEqual(result.status, 0, result.stdout + result.stderr)
  else assert.equal(result.status, expected, result.stdout + result.stderr)
  return result.stdout + result.stderr
}
function passed(name, detail) {
  report.checks.push({ name, result: 'passed', detail })
}
const temp = await mkdtemp(join(tmpdir(), 'webdev-quality-'))
try {
  await mkdir(resolve(lab, '.cache'), { recursive: true })
  const badType = resolve(lab, '.cache/type-error.ts')
  await writeFile(badType, 'export const count: number = "wrong"\n')
  const typeOutput = run(
    node,
    [
      tool('typescript/bin/tsc'),
      '--ignoreConfig',
      '--noEmit',
      '--strict',
      '--skipLibCheck',
      '--target',
      'ES2022',
      '--module',
      'ESNext',
      '--moduleResolution',
      'Bundler',
      badType,
    ],
    lab,
    'nonzero',
  )
  assert.match(typeOutput, /2322/)
  passed(
    'typechecker rejects incompatible assignment',
    'TS2322, expected nonzero',
  )

  const badLint = resolve(lab, '.cache/lint-error.ts')
  await writeFile(badLint, 'debugger\n')
  const lintOutput = run(
    node,
    [tool('eslint/bin/eslint.js'), badLint],
    lab,
    'nonzero',
  )
  assert.match(lintOutput, /no-debugger/)
  passed('ESLint flat config catches debugger', 'Actual no-debugger error')
  const badFormat = resolve(lab, '.cache/format-error.ts')
  await writeFile(badFormat, 'const value={title:"demo"};\n')
  run(
    node,
    [
      tool('prettier/bin/prettier.cjs'),
      '--ignore-path',
      '/dev/null',
      '--check',
      badFormat,
    ],
    lab,
    'nonzero',
  )
  passed(
    'Prettier check rejects format without rewriting',
    await readFile(badFormat, 'utf8'),
  )

  const editor = join(temp, 'editor')
  await mkdir(editor)
  await writeFile(
    join(editor, '.editorconfig'),
    'root = true\n[*]\nindent_style = space\nindent_size = 4\nend_of_line = lf\ninsert_final_newline = true\n',
  )
  const sample = join(editor, 'sample.js')
  await writeFile(sample, 'function f(){return 1}')
  const config = await prettier.resolveConfig(sample, { editorconfig: true })
  assert.equal(config.tabWidth, 4)
  assert.match(
    await prettier.format('function f(){return 1}', {
      ...config,
      filepath: sample,
    }),
    /\n {4}return/,
  )
  passed(
    'EditorConfig is consumed by a supporting tool',
    'Prettier resolves tabWidth=4; does not prove editor plugin/UI',
  )

  const failingTest = resolve(lab, 'tests/expected-failure.test.ts')
  try {
    await writeFile(
      failingTest,
      "import {expect,it} from 'vitest'\nit('controlled failing assertion',()=>expect(2).toBe(3))\n",
    )
    const output = run(
      node,
      [tool('vitest/vitest.mjs'), 'run', 'tests/expected-failure.test.ts'],
      lab,
      'nonzero',
    )
    assert.match(output, /controlled failing assertion/)
    passed(
      'Vitest rejects a deliberately wrong result',
      'Failure proven; fixture removed after validation',
    )
  } finally {
    await rm(failingTest, { force: true })
  }

  const git = join(temp, 'hooks')
  await mkdir(git)
  run('git', ['init', '-q', '--initial-branch=main'], git)
  await symlink(resolve(lab, 'node_modules'), join(git, 'node_modules'), 'dir')
  await writeFile(
    join(git, 'package.json'),
    '{"name":"hook-fixture","version":"1.0.0","private":true,"type":"module"}\n',
  )
  await writeFile(join(git, '.gitignore'), 'node_modules/\n')
  await writeFile(
    join(git, 'eslint.config.mjs'),
    "export default [{files:['**/*.js'],rules:{'no-debugger':'error'}}]\n",
  )
  const quote = (value) => "'" + value.replaceAll("'", "'\\''") + "'"
  await writeFile(
    join(git, 'lint-staged.config.mjs'),
    `export default {'*.js': ${JSON.stringify('node ' + quote(tool('eslint/bin/eslint.js')))}}\n`,
  )
  await mkdir(join(git, '.husky'))
  await writeFile(
    join(git, '.husky/pre-commit'),
    'node ' +
      quote(tool('lint-staged/bin/lint-staged.js')) +
      ' --config lint-staged.config.mjs\n',
  )
  run(node, [tool('husky/bin.js')], git)
  assert.equal(
    run('git', ['config', '--local', 'core.hooksPath'], git).trim(),
    '.husky/_',
  )
  await writeFile(join(git, 'sample.js'), 'debugger\n')
  run(
    'git',
    [
      'add',
      'package.json',
      '.gitignore',
      'eslint.config.mjs',
      'lint-staged.config.mjs',
      '.husky/pre-commit',
      'sample.js',
    ],
    git,
  )
  const rejected = run(
    'git',
    [
      '-c',
      'user.name=WebDev Fixture',
      '-c',
      'user.email=fixture@example.invalid',
      'commit',
      '-m',
      'test: 应被检查阻止',
    ],
    git,
    'nonzero',
  )
  assert.match(rejected, /no-debugger/)
  await writeFile(join(git, 'sample.js'), 'export const ok = true\n')
  run('git', ['add', 'sample.js'], git)
  run(
    'git',
    [
      '-c',
      'user.name=WebDev Fixture',
      '-c',
      'user.email=fixture@example.invalid',
      'commit',
      '-m',
      'test: 修复暂存样本',
    ],
    git,
  )
  assert.equal(run('git', ['rev-list', '--count', 'HEAD'], git).trim(), '1')
  passed(
    'Husky plus lint-staged blocks bad staged content and accepts repair',
    'Only isolated temporary repo; main hooks unchanged',
  )
  await writeFile(join(git, '.gitignore'), 'node_modules\nsample.js\n')
  await writeFile(join(git, 'sample.js'), 'debugger\n')
  run('git', ['check-ignore', 'node_modules'], git)
  assert.equal(run('git', ['ls-files', 'sample.js'], git).trim(), 'sample.js')
  passed(
    'Git ignore does not untrack existing source',
    'Temporary repository status/ls-files inspected',
  )

  const isProjectHeader = (text) => /^[a-z]+(?:\([^)]+\))?!?: \S.+$/u.test(text)
  assert.equal(isProjectHeader('fix(parser)!: 修复解码契约'), true)
  assert.equal(isProjectHeader('docs: 补充说明'), true)
  assert.equal(isProjectHeader('随便提交'), false)
  passed(
    'Conventional Commit header examples',
    'Project educational header subset only, not a full specification parser',
  )

  const pack = join(temp, 'pack')
  await mkdir(pack)
  await writeFile(
    join(pack, 'package.json'),
    '{"name":"webdev-pack-fixture","version":"1.0.0"}\n',
  )
  await writeFile(join(pack, 'index.js'), 'export const value = 1\n')
  await writeFile(join(pack, 'notes.txt'), 'internal teaching notes\n')
  await writeFile(join(pack, 'dummy-secret.txt'), 'DEMO_ONLY_NOT_A_SECRET\n')
  await writeFile(join(pack, '.gitignore'), 'dummy-secret.txt\n')
  await writeFile(join(pack, '.npmignore'), 'notes.txt\n')
  function files() {
    return JSON.parse(
      run('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], pack),
    )[0].files.map((x) => x.path)
  }
  const before = files()
  assert.ok(before.includes('dummy-secret.txt'))
  assert.ok(!before.includes('notes.txt'))
  await writeFile(join(pack, '.npmignore'), 'notes.txt\ndummy-secret.txt\n')
  assert.ok(!files().includes('dummy-secret.txt'))
  passed(
    'npm pack dry run proves npmignore and gitignore differ',
    'Only harmless DEMO_ONLY fixture; no archive published',
  )
  report.result = 'passed'
  console.log(`Quality tool checks: ${report.checks.length} passed`)
} catch (error) {
  report.result = 'failed'
  report.error = error.message
  throw error
} finally {
  await rm(temp, { recursive: true, force: true })
  await writeFile(
    resolve(root, 'docs/audits/stage-3-quality-tools.json'),
    JSON.stringify(report, null, 2) + '\n',
  )
}
