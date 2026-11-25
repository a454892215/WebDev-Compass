self.onmessage = (event) => {
  const n = event.data;
  let result = 0;
  for (let i = 0; i < n; i++) result += i;
  self.postMessage(result);
};
