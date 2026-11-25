import { readBoundedJson } from '../utils/body'
import { requireWrite, setSessionCookie } from '../utils/auth'
import { sessions, DEMO_USERS } from '../utils/session-store'
export default defineEventHandler(async (event) => {
  const old = requireWrite(event)
  const body: unknown = await readBoundedJson(event)
  const selected =
    typeof body === 'object' && body !== null && 'demoUser' in body
      ? body.demoUser
      : undefined
  const user = DEMO_USERS.find((u) => u.id === selected)
  if (!user) throw createError({ statusCode: 400, statusMessage: 'Unknown demo user' })
  const next = sessions.create({ ...user })
  sessions.revoke(old.id)
  setSessionCookie(event, next.id)
  return sessions.view(next)
})
