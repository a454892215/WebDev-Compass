import { validateTitle } from '#shared/utils/resources'
export default defineEventHandler(async (event) => {
  const body: unknown = await readBody(event)
  try {
    if (typeof body !== 'object' || body === null || !('title' in body))
      throw new Error('缺少标题')
    return { title: validateTitle(body.title), saved: false as const }
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Invalid title' })
  }
})
