import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { readFile, readdir } from 'node:fs/promises'
import { staticServer } from './static-server.mjs'
const origin = 'http://127.0.0.1:4507'
async function walk(path) {
  const entries = await readdir(path, { withFileTypes: true })
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory() ? walk(`${path}/${e.name}`) : [`${path}/${e.name}`],
      ),
    )
  ).flat()
}
async function ready(child) {
  for (let i = 0; i < 60; i++) {
    if (child.exitCode !== null) throw new Error('SSR exited')
    try {
      if ((await fetch(origin + '/api/health')).ok) return
    } catch {
      /* wait for the local server to become ready */
    }
    await new Promise((r) => setTimeout(r, 100))
  }
  throw new Error('SSR readiness timeout')
}
const child = spawn(process.execPath, ['artifacts/ssr/server/index.mjs'], {
  env: {
    ...process.env,
    NODE_ENV: 'production',
    HOST: '127.0.0.1',
    PORT: '4507',
    NUXT_PUBLIC_RELEASE_ID: 'runtime-b',
    NUXT_PUBLIC_SITE_LABEL: 'Runtime label',
    NUXT_PRIVATE_CANARY: 'stage7-server-only-canary',
  },
  stdio: ['ignore', 'pipe', 'pipe'],
})
let log = ''
child.stdout.on('data', (b) => (log += b))
child.stderr.on('data', (b) => (log += b))
try {
  await ready(child)
  const health = await fetch(origin + '/api/health')
  assert.match(health.headers.get('cache-control'), /no-store/)
  assert.equal((await health.json()).release, 'runtime-b')
  const page = await fetch(origin + '/')
  const html = await page.text()
  assert.equal(page.status, 200)
  assert.match(html, /Web 发布课程/)
  assert.match(html, /Runtime label/)
  assert.ok(!html.includes('stage7-server-only-canary'))
  const responses = await Promise.all(
    ['alice', 'bob', '', 'invalid'].map(async (id) => {
      const response = await fetch(origin + '/account', {
        headers: id ? { cookie: `stage7-demo=${id}` } : {},
      })
      const text = await response.text()
      assert.equal(response.status, 200)
      assert.match(response.headers.get('cache-control'), /private.*no-store/)
      if (id === 'alice' || id === 'bob') {
        assert.ok(text.includes(id === 'alice' ? 'Alice fixture' : 'Bob fixture'))
        assert.ok(!text.includes(id === 'alice' ? 'Bob fixture' : 'Alice fixture'))
      } else {
        assert.ok(!text.includes('Alice fixture') && !text.includes('Bob fixture'))
        assert.ok(text.includes('401'))
      }
      return id
    }),
  )
  assert.equal(responses.length, 4)
  assert.equal((await fetch(origin + '/api/private')).status, 401)
  assert.equal((await fetch(origin + '/courses/absent')).status, 404)
  assert.equal((await fetch(origin + '/_nuxt/missing.js')).status, 404)
  console.log(
    'SSR: runtime override, health, four parallel identity responses, anonymous401, missing404 and public canary exclusion passed',
  )
} finally {
  child.kill('SIGTERM')
  await once(child, 'exit')
}
for (const profile of ['ssg', 'csr']) {
  const files = await walk(`artifacts/${profile}/public`)
  assert.ok(!files.some((p) => p.includes('/account/') || p.includes('/api/private')))
  for (const file of files) {
    if (/\.(html|json|js)$/.test(file))
      assert.ok(!(await readFile(file, 'utf8')).includes('stage7-server-only-canary'))
  }
  const server = staticServer(`artifacts/${profile}/public`, profile)
  server.listen(4507, '127.0.0.1')
  await once(server, 'listening')
  try {
    const response = await fetch(origin + '/courses/vue')
    assert.equal(response.status, 200)
    const html = await response.text()
    assert.equal(html.includes('Vue 3 组件交付'), profile === 'ssg')
    assert.equal((await fetch(origin + '/api/private')).status, 404)
    assert.equal((await fetch(origin + '/_nuxt/absent.js')).status, 404)
    assert.equal((await fetch(origin + '/unknown')).status, profile === 'csr' ? 200 : 404)
    assert.ok(
      !(await fetch(origin + '/status')).headers
        .get('cache-control')
        ?.includes('immutable'),
    )
    console.log(
      `${profile}: deep-link HTTP, API/asset404, correct document fallback and build-time public configuration passed`,
    )
  } finally {
    server.closeAllConnections()
    await new Promise((r) => server.close(r))
  }
}
