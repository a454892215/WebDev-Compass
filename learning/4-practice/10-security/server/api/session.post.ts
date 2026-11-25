import { cookieName, sameOrigin } from '../utils/guards'
import { store } from '../utils/store'
export default defineEventHandler((event) => {
  sameOrigin(event)
  let session
  try {
    session = store.start(getCookie(event, cookieName))
  } catch {
    throw createError({ statusCode: 503, statusMessage: 'Demo capacity reached' })
  }
  setCookie(event, cookieName, session.id, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    path: '/',
    maxAge: 900,
  })
  return { active: true, csrf: session.csrf }
})
