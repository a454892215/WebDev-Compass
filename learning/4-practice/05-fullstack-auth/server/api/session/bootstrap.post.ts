import { checkOrigin, currentSession, setSessionCookie } from '../../utils/auth'
import { sessions } from '../../utils/session-store'
export default defineEventHandler((event) => {
  checkOrigin(event)
  if (getHeader(event, 'content-type')?.split(';')[0] !== 'application/json')
    throw createError({ statusCode: 415, statusMessage: 'JSON required' })
  const existing = currentSession(event)
  if (existing) return sessions.view(existing)
  const session = sessions.create(null)
  setSessionCookie(event, session.id)
  return sessions.view(session)
})
