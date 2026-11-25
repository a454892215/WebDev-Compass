import type { H3Event } from 'h3'
import { sessions } from './session-store'
export const COOKIE_NAME = 'compass_stage5_sid'
export function currentSession(event: H3Event) {
  return sessions.get(getCookie(event, COOKIE_NAME))
}
export function requireSession(event: H3Event) {
  const s = currentSession(event)
  if (!s)
    throw createError({ statusCode: 401, statusMessage: 'Session expired or missing' })
  return s
}
export function requireUser(event: H3Event) {
  const s = requireSession(event)
  if (!s.user) throw createError({ statusCode: 401, statusMessage: 'Sign in required' })
  return { session: s, user: s.user }
}
export function checkOrigin(event: H3Event) {
  const expected = useRuntimeConfig(event).allowedOrigin
  if (getHeader(event, 'origin') !== expected)
    throw createError({ statusCode: 403, statusMessage: 'Origin rejected' })
}
export function requireWrite(event: H3Event, json = true) {
  checkOrigin(event)
  const s = requireSession(event)
  if (getHeader(event, 'x-csrf-token') !== s.csrfToken)
    throw createError({ statusCode: 403, statusMessage: 'CSRF token rejected' })
  if (
    json &&
    getHeader(event, 'content-type')?.split(';')[0]?.trim().toLowerCase() !==
      'application/json'
  )
    throw createError({ statusCode: 415, statusMessage: 'JSON required' })
  return s
}
export function setSessionCookie(event: H3Event, id: string) {
  setCookie(event, COOKIE_NAME, id, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    path: '/',
    maxAge: 15 * 60,
  })
}
export function clearSessionCookie(event: H3Event) {
  deleteCookie(event, COOKIE_NAME, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    path: '/',
  })
}
