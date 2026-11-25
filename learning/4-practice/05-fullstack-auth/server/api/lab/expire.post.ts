import { requireWrite, requireUser } from '../../utils/auth'
import { sessions } from '../../utils/session-store'
export default defineEventHandler((event) => {
  requireWrite(event)
  const { session } = requireUser(event)
  sessions.expire(session.id)
  return { expired: true }
})
