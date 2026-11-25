export {}
interface Input {
  id: number
  slugs: string[]
}
const scope = self as unknown as {
  onmessage: ((event: MessageEvent<Input>) => void) | null
  postMessage: (value: { id: number; count: number }) => void
}
scope.onmessage = (event) => {
  const { id, slugs } = event.data
  if (
    Number.isSafeInteger(id) &&
    Array.isArray(slugs) &&
    slugs.every((s) => typeof s === 'string')
  )
    scope.postMessage({ id, count: new Set(slugs).size })
}
