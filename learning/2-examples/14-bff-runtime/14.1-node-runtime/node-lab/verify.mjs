import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { copy, brokenPipeline } from './stream.mjs'
import { sumInWorker } from './cpu.mjs'
import { readConfig, publicConfig } from './config.mjs'
const cwd = fileURLToPath(new URL('.', import.meta.url))
const run = (file, flags = [], env = process.env) => JSON.parse(execFileSync(process.execPath, [...flags, file], { cwd, env, encoding: 'utf8', timeout: 6000 }))
const cjs = run('loop.cjs'), esm = run('loop.mjs')
assert.deepEqual(cjs.slice(0, 4), ['sync', 'nextTick', 'promise', 'queueMicrotask'])
assert.ok(cjs.indexOf('immediate-in-io') < cjs.indexOf('timeout-in-io'))
assert.deepEqual(esm, ['sync', 'promise', 'queueMicrotask', 'nextTick'])
const good = await copy(true), bad = await copy(false), failed = await brokenPipeline()
assert.equal(good.bytes, 32768); assert.equal(bad.bytes, good.bytes)
assert.ok(good.waits > 0); assert.ok(good.peak <= 2048); assert.ok(bad.peak > good.peak)
assert.deepEqual(failed, { message: 'fixture-write-failed', sourceDestroyed: true, sinkDestroyed: true })
const sum = await sumInWorker(100000)
assert.equal(sum, 5000050000)
await assert.rejects(sumInWorker(-1), /invalid-n/)
await assert.rejects(sumInWorker(1, { mode: 'crash' }), /fixture-worker-crash/)
await assert.rejects(sumInWorker(1, { mode: 'hang', timeoutMs: 100 }), /worker-timeout/)
assert.equal(readConfig({ LAB_TOKEN: 'public-fixture', LAB_DEBUG: 'false' }).debug, false)
for (const port of ['12x', '0', '65536']) assert.throws(() => readConfig({ LAB_PORT: port, LAB_TOKEN: 'fixture' }), /invalid-LAB_PORT/)
assert.throws(() => readConfig({}), /missing-LAB_TOKEN/)
assert.throws(() => readConfig({ LAB_TOKEN: 'fixture', LAB_DEBUG: 'yes' }), /invalid-LAB_DEBUG/)
assert.ok(!('token' in publicConfig(readConfig({ LAB_TOKEN: 'fixture' }))))
mkdirSync(new URL('./dist/', import.meta.url), { recursive: true })
const dotenv = new URL('./dist/config-fixture.env', import.meta.url)
writeFileSync(dotenv, 'LAB_PORT=4562\nLAB_DEBUG=false\nLAB_TOKEN=public-fixture-not-a-secret\n')
const env = { ...process.env }
for (const key of ['LAB_PORT', 'LAB_DEBUG', 'LAB_TOKEN']) delete env[key]
const loaded = run('config-cli.mjs', ['--env-file=dist/config-fixture.env'], env)
const overridden = run('config-cli.mjs', ['--env-file=dist/config-fixture.env'], { ...env, LAB_PORT: '4569' })
rmSync(dotenv)
assert.deepEqual(loaded, { port: 4562, debug: false }); assert.equal(overridden.port, 4569)
const processes = run('processes.mjs')
assert.equal(new Set(processes.rows.map(row => row.pid)).size, 2)
assert.deepEqual(processes.rows.map(row => row.count), [1, 1]); assert.equal(processes.exits, 2); assert.equal(processes.graceful, true)
const report = { checkedAt: new Date().toISOString(), node: process.version, eventLoop: { cjs, esm }, stream: { good, bad, failed }, worker: { sum, invalid: 'rejected', crash: 'rejected', timeout: 'terminated' }, config: { loaded, overridden, invalid: 'rejected', publicProjection: 'token omitted' }, processes, limitations: ['No PM2 installation, HTTP load balancing or production reload was performed.', 'Synthetic chunks and one-shot workers; no throughput or memory benchmark.', 'Node 26.0.0 local runtime; official current docs may show newer 26.x.'] }
writeFileSync(new URL('./dist/runtime.json', import.meta.url), JSON.stringify(report, null, 2) + '\n')
console.log(JSON.stringify(report, null, 2))
