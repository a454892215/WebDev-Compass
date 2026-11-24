import { resources } from '#shared/utils/resources'
export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const resource = resources.find((item) => item.id === id)
  if (!resource)
    throw createError({ statusCode: 404, statusMessage: 'Resource not found' })
  return { ...resource }
})
