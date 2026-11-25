import { requireWrite, clearSessionCookie } from '../utils/auth'
import { sessions } from '../utils/session-store'
export default defineEventHandler((event) => {
  const s = requireWrite(event)
  sessions.revoke(s.id)
  clearSessionCookie(event)
  return { user: null, csrfToken: null }
})
