self.onmessage = ({ data }) => {
  const view = new Int32Array(data.memory.buffer)
  Atomics.add(view, 0, 1)
  self.postMessage(Atomics.load(view, 0))
  self.close()
}
