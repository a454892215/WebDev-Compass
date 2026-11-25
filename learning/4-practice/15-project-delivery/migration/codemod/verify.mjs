import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, copyFile, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { join } from 'node:path'
import { migrate } from './transform.mjs'
const root = fileURLToPath(new URL('../../', import.meta.url))
await mkdir(join(root, 'dist'), { recursive: true })
const temp = await mkdtemp(join(root, 'dist', 'codemod-'))
try {
  for (const file of ['legacy-money.mjs', 'money.mjs'])
    await copyFile(new URL(file, import.meta.url), join(temp, file))
  for (const declaration of [
    "import { formatPrice } from './legacy-money.mjs'",
    "import { formatPrice as show } from './legacy-money.mjs'",
  ]) {
    const local = declaration.includes(' as ') ? 'show' : 'formatPrice'
    const source =
      declaration +
      ";\nconst note = 'formatPrice text must stay';\nexport const render = cents => " +
      local +
      '(cents);\nexport { note };\n'
    const transformed = migrate(source)
    assert.ok(transformed.includes('formatMoney as ' + local))
    assert.ok(transformed.includes('formatPrice text must stay'))
    assert.equal(migrate(transformed), transformed)
    const stem = local === 'show' ? 'alias' : 'direct'
    await writeFile(join(temp, stem + '-old.mjs'), source)
    await writeFile(join(temp, stem + '-new.mjs'), transformed)
    const old = await import(pathToFileURL(join(temp, stem + '-old.mjs')).href)
    const fresh = await import(pathToFileURL(join(temp, stem + '-new.mjs')).href)
    for (const n of [0, 1, 99, 100, 12900, 999999])
      assert.equal(fresh.render(n), old.render(n))
    for (const bad of [-1, 1.5, NaN, '12900']) {
      assert.throws(() => old.render(bad), /invalid-cents/)
      assert.throws(() => fresh.render(bad), /invalid-cents/)
    }
  }
  assert.equal(
    migrate('const formatPrice = 1; // no matching import'),
    'const formatPrice = 1; // no matching import',
  )
  assert.throws(
    () => migrate("import { formatPrice, other } from './legacy-money.mjs'"),
    /mixed-import/,
  )
  assert.throws(
    () => migrate("import defaultMoney, { formatPrice } from './legacy-money.mjs'"),
    /default-import/,
  )
  console.log(
    'codemod passed: direct+alias bindings, 12 valid equivalences, 8 invalid equivalences, idempotence, unrelated text and 2 review refusals',
  )
} finally {
  await rm(temp, { recursive: true, force: true })
}
