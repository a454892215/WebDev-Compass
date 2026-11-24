export interface ReadingTask {
  id: string
  title: string
  done: boolean
}
export type Filter = 'all' | 'open' | 'done'
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
export function decodeTasks(value: unknown): ReadingTask[] {
  if (!Array.isArray(value)) throw new Error('数据结构应为列表')
  const ids = new Set<string>()
  return value.map((item: unknown) => {
    if (
      !isRecord(item) ||
      typeof item.id !== 'string' ||
      !item.id.trim() ||
      item.id.length > 80 ||
      typeof item.title !== 'string' ||
      !item.title.trim() ||
      item.title.length > 80 ||
      typeof item.done !== 'boolean'
    )
      throw new Error('任务字段不符合约定')
    if (ids.has(item.id)) throw new Error('任务 id 重复')
    ids.add(item.id)
    return { id: item.id, title: item.title, done: item.done }
  })
}
export function createTask(title: string, id: string): ReadingTask {
  const normalized = title.trim()
  if (!normalized || normalized.length > 80)
    throw new Error('请输入 1–80 个字符的任务标题')
  return { id, title: normalized, done: false }
}
export function toggleTask(
  tasks: readonly ReadingTask[],
  id: string,
): ReadingTask[] {
  return tasks.map((task) =>
    task.id === id ? { ...task, done: !task.done } : task,
  )
}
export function filterTasks(
  tasks: readonly ReadingTask[],
  filter: Filter,
  query: string,
): ReadingTask[] {
  const term = query.trim().toLocaleLowerCase()
  return tasks.filter(
    (task) =>
      (filter === 'all' || task.done === (filter === 'done')) &&
      task.title.toLocaleLowerCase().includes(term),
  )
}
