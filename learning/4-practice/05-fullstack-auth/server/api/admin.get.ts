import { requireUser } from '../utils/auth'
export default defineEventHandler((event) => {
  const { user } = requireUser(event)
  if (user.role !== 'admin')
    throw createError({ statusCode: 403, statusMessage: 'Administrator required' })
  return { message: 'Server authorized admin response', actor: user.id }
})
