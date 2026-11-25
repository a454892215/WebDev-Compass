import {
  mkdtemp,
  mkdir,
  writeFile,
  readFile,
  readdir,
  symlink,
  rm,
  realpath,
} from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { build } from 'vite'
import assert from 'node:assert/strict'
const root = resolve('.'),
  temporary = await mkdtemp(join(tmpdir(), 'stage12-package-'))
const run = (command, args, cwd = root) => {
  const result = spawnSync(command, args, { cwd, encoding: 'utf8' })
  assert.equal(result.status, 0, result.stderr || result.stdout || result.error?.message)
  return result.stdout
}
try {
  const lib = join(root, 'lib')
  assert.equal(
    await realpath(join(lib, 'node_modules/vue')),
    await realpath(join(root, 'node_modules/vue')),
    'local peer resolved a second Vue runtime',
  )
  run('pnpm', ['pack', '--pack-destination', temporary], lib)
  const archive = (await readdir(temporary)).find((x) => x.endsWith('.tgz'))
  assert.ok(archive)
  const entries = run('tar', ['-tzf', join(temporary, archive)])
    .trim()
    .split('\n')
  assert.ok(
    entries.includes('package/dist/index.js') &&
      entries.includes('package/dist/index.d.ts') &&
      entries.includes('package/dist/style.css'),
  )
  assert.ok(
    entries.every(
      (x) =>
        x === 'package/package.json' ||
        x.startsWith('package/dist/') ||
        x === 'package/README.md',
    ),
  )
  const consumer = join(temporary, 'consumer'),
    scope = join(consumer, 'node_modules/@compass')
  await mkdir(scope, { recursive: true })
  run('tar', ['-xzf', join(temporary, archive), '-C', scope])
  await (
    await import('node:fs/promises')
  ).rename(join(scope, 'package'), join(scope, 'stage12-ui'))
  await symlink(join(root, 'node_modules/vue'), join(consumer, 'node_modules/vue'), 'dir')
  await writeFile(
    join(consumer, 'package.json'),
    JSON.stringify({ private: true, type: 'module' }),
  )
  await writeFile(
    join(consumer, 'index.html'),
    '<html lang="zh-CN"><head><title>Package consumer</title></head><body><div id="app"></div><script type="module" src="/entry.js"></script></body></html>',
  )
  const entry =
    "import {createApp,h} from 'vue';import {UiButton} from '@compass/stage12-ui';import '@compass/stage12-ui/style.css';createApp({render:()=>h(UiButton,null,()=> 'packed consumer')}).mount('#app');"
  await writeFile(join(consumer, 'entry.js'), entry)
  await build({
    root: consumer,
    configFile: false,
    logLevel: 'silent',
    build: { outDir: 'dist' },
  })
  const assets = join(consumer, 'dist/assets'),
    names = await readdir(assets)
  const js = (
    await Promise.all(
      names
        .filter((n) => n.endsWith('.js'))
        .map((n) => readFile(join(assets, n), 'utf8')),
    )
  ).join('\n')
  assert.ok(
    !js.includes('STAGE12_UNUSED_WIDGET_MARKER'),
    'unused export remained in consumer',
  )
  const css = (
    await Promise.all(
      names
        .filter((n) => n.endsWith('.css'))
        .map((n) => readFile(join(assets, n), 'utf8')),
    )
  ).join('\n')
  assert.ok(css.includes('.c-button') && css.includes('--c-accent'))
  const libJs = await readFile(join(lib, 'dist/index.js'), 'utf8')
  assert.match(libJs, /from\s*["']vue["']/)
  assert.ok(libJs.length < 20000, 'framework runtime unexpectedly bundled')
  const ts = join(consumer, 'check.ts')
  await writeFile(
    ts,
    "import {UiButton} from '@compass/stage12-ui';type P=InstanceType<typeof UiButton>['$props'];const props:P={variant:'primary'};void props;",
  )
  const args = [
    '--noEmit',
    '--strict',
    '--skipLibCheck',
    '--moduleResolution',
    'bundler',
    '--module',
    'esnext',
    '--target',
    'es2022',
    ts,
  ]
  run(join(root, 'node_modules/.bin/vue-tsc'), args, consumer)
  await writeFile(
    ts,
    "import {UiButton} from '@compass/stage12-ui';type P=InstanceType<typeof UiButton>['$props'];const props:P={variant:'unknown'};void props;",
  )
  const negative = spawnSync(join(root, 'node_modules/.bin/vue-tsc'), args, {
    cwd: consumer,
    encoding: 'utf8',
  })
  assert.notEqual(negative.status, 0)
  assert.match(negative.stdout + negative.stderr, /unknown/)
  await writeFile(
    join(consumer, 'entry.js'),
    entry.replace("import '@compass/stage12-ui/style.css';", ''),
  )
  await build({
    root: consumer,
    configFile: false,
    logLevel: 'silent',
    build: { outDir: 'without-style' },
  })
  const missing = await readdir(join(consumer, 'without-style/assets'))
  assert.ok(
    !missing.some((x) => x.endsWith('.css')),
    'expected explicit stylesheet omission to remove library styles',
  )
  console.log(
    JSON.stringify(
      {
        packEntries: entries,
        isolatedTarballConsumer: true,
        vueExternal: true,
        localVueSingleton: true,
        consumerUnusedExportRemoved: true,
        stylePresent: true,
        missingStyleNegative: true,
        exportedTypesPositive: true,
        invalidVariantRejected: true,
      },
      null,
      2,
    ),
  )
} finally {
  await rm(temporary, { recursive: true, force: true })
}
