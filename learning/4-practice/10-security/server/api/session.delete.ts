import { cookieName, writeSession } from '../utils/guards'
import { store } from '../utils/store'
export default defineEventHandler((event) => {
  const id = writeSession(event)
  store.revoke(id)
  deleteCookie(event, cookieName, { path: '/' })
  return { active: false }
})
