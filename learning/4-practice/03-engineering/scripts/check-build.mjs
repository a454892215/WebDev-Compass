import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
const root = resolve(import.meta.dirname, '..')
const files = await readdir(resolve(root, 'dist/assets'))
const scripts = files.filter((name) => name.endsWith('.js'))
assert.ok(
  scripts.length >= 2,
  'A genuine dynamic import should produce another JS asset',
)
const output = (
  await Promise.all(
    scripts.map((file) => readFile(resolve(root, 'dist/assets', file), 'utf8')),
  )
).join('\n')
assert.ok(
  !output.includes('UNUSED_DEBUG_SENTINEL_STAGE3'),
  'Unused side-effect-free export should be removed',
)
assert.ok(
  files.some((name) => name.endsWith('.js.map')),
  'Hidden source maps should be emitted separately',
)
assert.ok(
  !output.includes('sourceMappingURL='),
  'Hidden maps should not be advertised in the bundle',
)
const manifest = JSON.parse(
  await readFile(resolve(root, 'dist/.vite/manifest.json'), 'utf8'),
)
assert.ok(
  Object.values(manifest).some((item) => item.isDynamicEntry),
  'Manifest should identify dynamic entry',
)
console.log(
  'Build artifacts: dynamic entry, unused export removal and hidden source maps verified',
)
