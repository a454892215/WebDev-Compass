export interface Task {
  id: number
  title: string
  done: boolean
}
export function decodeTasks(value: unknown): Task[] {
  if (!Array.isArray(value)) throw new Error('列表必须是数组')
  return value.map((item: unknown) => {
    if (
      !item ||
      typeof item !== 'object' ||
      !('id' in item) ||
      !('title' in item) ||
      !('done' in item) ||
      typeof item.id !== 'number' ||
      !Number.isInteger(item.id) ||
      item.id <= 0 ||
      typeof item.title !== 'string' ||
      !item.title.trim() ||
      item.title.length > 120 ||
      typeof item.done !== 'boolean'
    )
      throw new Error('条目协议无效')
    return { id: item.id, title: item.title, done: item.done }
  })
}
export function addTask(tasks: readonly Task[], task: Task): Task[] {
  const [checked] = decodeTasks([task])
  if (!checked) throw new Error('缺少条目')
  if (tasks.some((item) => item.id === checked.id)) throw new Error('编号重复')
  return [...tasks, { ...checked, title: checked.title.trim() }]
}
export function toggleTask(tasks: readonly Task[], id: number): Task[] {
  if (!tasks.some((task) => task.id === id)) throw new Error('找不到条目')
  return tasks.map((task) =>
    task.id === id ? { ...task, done: !task.done } : task,
  )
}
