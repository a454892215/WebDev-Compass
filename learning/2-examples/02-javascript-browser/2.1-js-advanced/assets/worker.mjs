self.onmessage = event => {
  const input = event.data;
  const total = input.reduce((sum, n) => sum + n, 0);
  input[0] = 99;
  self.postMessage({ total, workerHasDOM: typeof document !== 'undefined', workerFirst: input[0] });
};
