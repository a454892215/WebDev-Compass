import { test } from 'node:test'
import assert from 'node:assert/strict'
import { once } from 'node:events'
import { get } from 'node:http'
import { setTimeout as delay } from 'node:timers/promises'
import { requestView, upstreamHeaders, aggregate, streamServer } from './runtime.mjs'

test('request-local context remains isolated across interleaved awaits', async () => {
  let release
  const gate = new Promise(resolve => { release = resolve })
  const first = requestView('fixture-A', () => gate)
  const second = await requestView('fixture-B')
  release()
  assert.deepEqual(await first, { displayName: 'fixture-A' })
  assert.deepEqual(second, { displayName: 'fixture-B' })
})

test('outbound header allowlist drops user credentials and forwarding claims', () => {
  assert.deepEqual(upstreamHeaders({ cookie: 'sid=user', authorization: 'Bearer forged', 'x-forwarded-for': '1.2.3.4', 'accept-language': 'zh-CN,en;q=0.8' }, 'public-test-fixture'), { authorization: 'Bearer public-test-fixture', 'accept-language': 'zh-CN,en;q=0.8' })
  assert.deepEqual(upstreamHeaders({ 'accept-language': 'bad\r\nheader' }, 'public-test-fixture'), { authorization: 'Bearer public-test-fixture' })
})

test('independent loads start together, without relying on timing threshold', async () => {
  const started = []
  let release
  const gate = new Promise(resolve => { release = resolve })
  const work = aggregate(async () => { started.push('profile'); await gate; return 'A' }, async () => { started.push('catalog'); await gate; return [1] })
  assert.deepEqual(started, ['profile', 'catalog'])
  release()
  assert.deepEqual(await work, { profile: 'A', catalog: [1] })
})

async function withServer(run) {
  const lab = streamServer()
  lab.server.listen(0, '127.0.0.1')
  await once(lab.server, 'listening')
  try { await run(`http://127.0.0.1:${lab.server.address().port}`, lab.stats) }
  finally { lab.server.closeAllConnections(); await new Promise(resolve => lab.server.close(resolve)) }
}

test('real HTTP sends start before completion, then done', async () => {
  await withServer(async base => {
    const response = await fetch(base + '/stream')
    assert.equal(response.status, 200)
    assert.equal(response.headers.get('cache-control'), 'no-store')
    const reader = response.body.getReader()
    const first = new TextDecoder().decode((await reader.read()).value)
    assert.match(first, /"type":"start"/)
    assert.doesNotMatch(first, /"type":"done"/)
    let rest = ''
    while (true) { const part = await reader.read(); if (part.done) break; rest += new TextDecoder().decode(part.value) }
    assert.match(rest, /"type":"done"/)
  })
})

test('before-header error is 503; after-header error is protocol error inside 200', async () => {
  await withServer(async base => {
    const before = await fetch(base + '/before-error')
    assert.equal(before.status, 503)
    assert.equal((await before.json()).retryable, true)
    const partial = await fetch(base + '/partial')
    const text = await partial.text()
    assert.equal(partial.status, 200)
    const messages = text.trim().split('\n').map(line => JSON.parse(line))
    assert.deepEqual(messages.map(message => message.type), ['start', 'error'])
    assert.equal(messages.at(-1).retryable, true)
  })
})

test('client disconnect cancels server pending work and releases active request', async () => {
  await withServer(async (base, stats) => {
    await new Promise((resolve, reject) => {
      const request = get(base + '/cancel', response => {
        response.once('data', () => { response.destroy(); resolve() })
        response.on('error', () => {})
      })
      request.on('error', reject)
    })
    for (let attempt = 0; attempt < 50 && stats.active; attempt++) await delay(10)
    assert.equal(stats.closedEarly, 1)
    assert.equal(stats.active, 0)
    assert.equal(stats.sent, 1)
  })
})
