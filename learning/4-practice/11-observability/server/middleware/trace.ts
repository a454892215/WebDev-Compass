import { traceContext } from '../utils/trace'
export default defineEventHandler((event) => {
  const context = traceContext(getHeader(event, 'traceparent'))
  event.context.observation = { ...context, started: performance.now() }
  setResponseHeader(event, 'traceparent', context.traceparent)
})
