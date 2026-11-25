import { requireOrigin, smallBody } from '../utils/body'
export default defineEventHandler(async (event) => {
  requireOrigin(event)
  const data = await smallBody(event)
  if (
    !data ||
    typeof data !== 'object' ||
    Array.isArray(data) ||
    Object.keys(data).length !== 1 ||
    !['fixture-a', 'fixture-b', 'guest'].includes((data as { subject: string }).subject)
  )
    throw createError({ statusCode: 400, statusMessage: 'Fixture required' })
  const subject = (data as { subject: string }).subject
  if (subject === 'guest') deleteCookie(event, 'stage11_fixture', { path: '/' })
  else
    setCookie(event, 'stage11_fixture', subject, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
      maxAge: 900,
    })
  return { ok: true }
})
