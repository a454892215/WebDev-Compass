import { Worker } from 'node:worker_threads'
export function sumInWorker(n, { mode = 'sum', timeoutMs = 2000 } = {}) {
  if (!Number.isSafeInteger(n) || n < 0 || n > 10_000_000) return Promise.reject(new Error('invalid-n'))
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./worker.mjs', import.meta.url), { workerData: { n, mode } })
    let settled = false
    const finish = (error, value) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      // A real pool reuses workers; this deliberately bounded one-shot demo terminates all paths.
      worker.terminate().then(() => error ? reject(error) : resolve(value), reject)
    }
    const timer = setTimeout(() => finish(new Error('worker-timeout')), timeoutMs)
    worker.once('message', value => finish(null, value))
    worker.once('error', error => finish(error))
    worker.once('exit', code => { if (!settled) finish(new Error('worker-exited-' + code)) })
  })
}
