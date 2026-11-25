import cluster from 'node:cluster'
if (cluster.isPrimary) {
  const workers = [cluster.fork(), cluster.fork()]
  let rows = [], exits = 0
  const timer = setTimeout(() => {
    for (const worker of workers) worker.kill('SIGKILL')
    process.exitCode = 1
  }, 4000)
  for (const worker of workers) {
    worker.on('message', row => {
      if (row.kind === 'ready') worker.send({ kind: 'increment' })
      if (row.kind === 'count') {
        rows.push(row)
        if (rows.length === 2) for (const item of workers) item.send({ kind: 'shutdown' })
      }
    })
    worker.on('exit', (code, signal) => {
      if (code !== 0 || signal) process.exitCode = 1
      if (++exits === 2) {
        clearTimeout(timer)
        console.log(JSON.stringify({ rows, exits, graceful: !process.exitCode }))
      }
    })
  }
} else {
  let count = 0
  process.send({ kind: 'ready' })
  process.on('message', message => {
    if (message.kind === 'increment') process.send({ kind: 'count', count: ++count, pid: process.pid })
    if (message.kind === 'shutdown') {
      // There are no sockets/jobs in this IPC lab. A server must first stop admission and drain work.
      process.disconnect()
    }
  })
}
