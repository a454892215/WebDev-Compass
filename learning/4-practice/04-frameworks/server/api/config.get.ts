export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  return {
    publicLabel: config.public.courseLabel,
    privateConfigured:
      typeof config.privateDemoLabel === 'string' && config.privateDemoLabel.length > 0,
  }
})
