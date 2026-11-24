import { readdirSync, readFileSync } from 'node:fs'
const assets = new URL('./dist/assets/', import.meta.url)
const files = readdirSync(assets)
const css = files.filter((name) => name.endsWith('.css')).map((name) => readFileSync(new URL(name, assets), 'utf8')).join('\n')
if (!css.includes('[data-v-')) throw new Error('Missing real SFC scoped CSS attribute')
for (const page of ['Playground-', 'Detail-', 'NotFound-']) {
  if (!files.some((name) => name.startsWith(page) && name.endsWith('.js'))) throw new Error(`Missing dynamic route chunk ${page}`)
}
console.log('Build output: scoped CSS and three dynamic route chunks verified')
