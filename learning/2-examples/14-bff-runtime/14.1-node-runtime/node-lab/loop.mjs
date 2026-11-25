const order = ['sync']
process.nextTick(() => order.push('nextTick'))
Promise.resolve().then(() => order.push('promise'))
queueMicrotask(() => order.push('queueMicrotask'))
setImmediate(() => console.log(JSON.stringify(order)))
