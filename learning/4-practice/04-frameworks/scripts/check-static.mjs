import { readFile, readdir, stat } from 'node:fs/promises'
import { strict as assert } from 'node:assert'
import { join } from 'node:path'
const root = '.output/public'
const checks = []
for (const [path, content] of [
  ['index.html', 'Vue 响应式入门'],
  ['about/index.html', '关于课程'],
  ['resources/vue/index.html', 'Vue 响应式入门'],
  ['resources/nuxt/index.html', 'Nuxt SSR 与数据'],
]) {
  const html = await readFile(join(root, path), 'utf8')
  assert.ok(html.includes(content), `${path} lacks prerendered content`)
  assert.ok(html.includes('<title>'), `${path} lacks a page title`)
  checks.push({ path, content: true, title: true })
}
async function scan(folder) {
  for (const entry of await readdir(folder)) {
    const path = join(folder, entry)
    if ((await stat(path)).isDirectory()) await scan(path)
    else if (/\.(js|mjs|html|json)$/.test(path)) {
      const text = await readFile(path, 'utf8')
      assert.ok(!text.includes('server-only-demo'), `private marker in ${path}`)
      assert.ok(
        !text.includes('server-private-regression-marker'),
        `runtime private marker in ${path}`,
      )
    }
  }
}
await scan(root)
console.log(
  JSON.stringify(
    {
      mode: 'SSG artifact inspection, not dynamic API deployment',
      checks,
      privateMarkersAbsent: true,
    },
    null,
    2,
  ),
)
