// Worker has no document/DOM. Messages use structured clone; no secrets.
self.addEventListener('message', ({ data }) => {
  if (!data || !Number.isInteger(data.revision) || !Array.isArray(data.titles) || !data.titles.every(x => typeof x === 'string')) return
  self.postMessage({ revision: data.revision, count: data.titles.length, characters: data.titles.reduce((n, title) => n + [...title].length, 0) })
})
