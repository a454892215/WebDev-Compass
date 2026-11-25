import { parentPort, workerData } from 'node:worker_threads'
if (workerData.mode === 'crash') throw new Error('fixture-worker-crash')
if (workerData.mode === 'hang') { setInterval(() => {}, 1000) }
else {
  let sum = 0
  for (let n = 1; n <= workerData.n; n++) sum += n
  parentPort.postMessage(sum)
}
