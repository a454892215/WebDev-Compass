import { cookieName } from '../utils/guards'
import { store } from '../utils/store'
export default defineEventHandler((event) => {
  const id = getCookie(event, cookieName)
  const session = store.get(id)
  return session && id
    ? { active: true, csrf: session.csrf, notes: store.list(id) }
    : { active: false, csrf: null, notes: [] }
})
