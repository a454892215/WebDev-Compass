export interface DemoUser {
  id: 'alice' | 'bob' | 'admin'
  role: 'reader' | 'admin'
}
export interface SessionView {
  user: DemoUser | null
  csrfToken: string | null
}
export interface Note {
  id: string
  ownerId: string
  title: string
  version: number
}
export interface NotePage {
  items: Note[]
  page: number
  pageSize: number
  total: number
}
export function validateTitle(value: unknown): string {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > 80)
    throw new Error('标题须为1–80个字符')
  return value.trim()
}
function record(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
export function decodePage(value: unknown): NotePage {
  if (
    !record(value) ||
    !Array.isArray(value.items) ||
    !Number.isInteger(value.page) ||
    Number(value.page) < 1 ||
    !Number.isInteger(value.pageSize) ||
    Number(value.pageSize) < 1 ||
    Number(value.pageSize) > 20 ||
    !Number.isInteger(value.total) ||
    Number(value.total) < 0
  )
    throw new Error('分页响应结构不合法')
  const ids = new Set<string>()
  const items = value.items.map((item: unknown) => {
    if (
      !record(item) ||
      typeof item.id !== 'string' ||
      !item.id ||
      ids.has(item.id) ||
      typeof item.ownerId !== 'string' ||
      !item.ownerId ||
      typeof item.title !== 'string' ||
      !item.title.trim() ||
      item.title.length > 80 ||
      !Number.isInteger(item.version) ||
      Number(item.version) < 1
    )
      throw new Error('笔记字段不合法')
    ids.add(item.id)
    return {
      id: item.id,
      ownerId: item.ownerId,
      title: item.title,
      version: Number(item.version),
    }
  })
  if (items.length > Number(value.pageSize) || items.length > Number(value.total))
    throw new Error('分页数量不一致')
  return {
    items,
    page: Number(value.page),
    pageSize: Number(value.pageSize),
    total: Number(value.total),
  }
}
export function canRead(user: DemoUser, note: Note): boolean {
  return user.role === 'admin' || user.id === note.ownerId
}
export function parsePositive(value: unknown, fallback: number, maximum: number): number {
  if (value === undefined) return fallback
  if (typeof value !== 'string' || !/^[1-9]\d*$/.test(value))
    throw new Error('分页参数必须为正整数')
  const parsed = Number(value)
  if (!Number.isSafeInteger(parsed) || parsed > maximum)
    throw new Error('分页参数超出范围')
  return parsed
}
