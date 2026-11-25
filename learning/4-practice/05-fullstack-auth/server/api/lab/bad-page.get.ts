import { requireUser } from '../../utils/auth'
export default defineEventHandler((event) => {
  requireUser(event)
  return { items: [{ id: 1, title: null }], total: 1, page: 1, pageSize: 2 }
})
