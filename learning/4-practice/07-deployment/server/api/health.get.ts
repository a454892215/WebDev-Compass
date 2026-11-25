export default defineEventHandler((event) => {
  setResponseHeader(event, 'cache-control', 'no-store')
  const config = useRuntimeConfig(event)
  return { status: 'ok', release: config.public.releaseId }
})
