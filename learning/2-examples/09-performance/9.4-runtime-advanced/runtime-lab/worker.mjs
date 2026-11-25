self.onmessage = (event) => {
  const { id, buffer } = event.data;
  const start = performance.now();
  while (performance.now() - start < 60) {}
  let sum = 0;
  for (const value of new Uint32Array(buffer)) sum += value;
  self.postMessage({ id, sum });
};
