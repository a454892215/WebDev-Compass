import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
const files = await readdir(new URL('./dist/assets/', import.meta.url))
assert(
  files.some((f) => /^LazyNote-.*\.js$/.test(f)),
  'lazy module chunk missing',
)
const css = files.filter((f) => f.endsWith('.css'))
assert(css.length > 0, 'CSS artifact missing')
const content = (
  await Promise.all(
    css.map((f) =>
      readFile(new URL('./dist/assets/' + f, import.meta.url), 'utf8'),
    ),
  )
).join('\n')
assert(/\._card_[\w-]+/.test(content), 'CSS Modules transformed class missing')
console.log(
  JSON.stringify(
    { checks: 2, lazyModule: true, cssModules: true, files },
    null,
    2,
  ),
)
