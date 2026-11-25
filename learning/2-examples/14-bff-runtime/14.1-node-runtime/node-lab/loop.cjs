const { readFile } = require('node:fs')
const order = ['sync']
process.nextTick(() => order.push('nextTick'))
Promise.resolve().then(() => order.push('promise'))
queueMicrotask(() => order.push('queueMicrotask'))
readFile(__filename, () => {
  order.push('io')
  setTimeout(() => { order.push('timeout-in-io'); console.log(JSON.stringify(order)) }, 0)
  setImmediate(() => order.push('immediate-in-io'))
})
