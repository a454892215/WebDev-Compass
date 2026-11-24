import './styles.css'
import { createTask, filterTasks, toggleTask } from '@domain/model'
import type { Filter, ReadingTask } from '@domain/model'
import { loadTasks } from './services/load-tasks'
function element<T extends HTMLElement>(
  selector: string,
  Constructor: { new (): T },
): T {
  const value = document.querySelector(selector)
  if (!(value instanceof Constructor))
    throw new Error(`缺少预期元素：${selector}`)
  return value
}
const list = element('#list', HTMLUListElement)
const titleInput = element('#title', HTMLInputElement)
const addForm = element('#add-form', HTMLFormElement)
const queryInput = element('#query', HTMLInputElement)
const filterInput = element('#filter', HTMLSelectElement)
const sourceInput = element('#source', HTMLSelectElement)
const status = element('#status', HTMLParagraphElement)
const statisticsButton = element('#statistics', HTMLButtonElement)
let tasks: ReadingTask[] = []
let phase:
  { kind: 'loading' | 'success' } | { kind: 'error'; message: string } = {
  kind: 'loading',
}
let revision = 0
let controller: AbortController | undefined
function filter(): Filter {
  return filterInput.value === 'open' || filterInput.value === 'done'
    ? filterInput.value
    : 'all'
}
function render() {
  element('#statistics-result', HTMLParagraphElement).textContent =
    '列表或筛选已更新，可点击按钮重新计算全部任务。'
  const visible = filterTasks(tasks, filter(), queryInput.value)
  const fragment = document.createDocumentFragment()
  for (const task of visible) {
    const li = document.createElement('li'),
      heading = document.createElement('h3'),
      button = document.createElement('button')
    heading.textContent = task.title
    button.type = 'button'
    button.dataset.id = task.id
    button.setAttribute('aria-pressed', String(task.done))
    button.textContent = `${task.done ? '标记待完成' : '完成'}：${task.title}`
    li.append(heading, button)
    fragment.append(li)
  }
  list.replaceChildren(fragment)
  element('#count', HTMLParagraphElement).textContent = visible.length
    ? `显示 ${visible.length} / ${tasks.length} 项任务。`
    : '没有匹配的任务，可调整筛选。'
  for (const control of Array.from(addForm.elements))
    if (
      control instanceof HTMLInputElement ||
      control instanceof HTMLButtonElement
    )
      control.disabled = phase.kind !== 'success'
  document.body.dataset.state = phase.kind
}
async function reload() {
  const own = ++revision
  controller?.abort()
  controller = new AbortController()
  tasks = []
  phase = { kind: 'loading' }
  status.textContent = '正在读取本地数据。'
  render()
  const source = ['tasks', 'invalid', 'broken', 'missing'].includes(
    sourceInput.value,
  )
    ? sourceInput.value
    : 'tasks'
  try {
    const data = await loadTasks(
      new URL(`./fixtures/${source}.json`, location.href).href,
      fetch,
      controller.signal,
    )
    if (own !== revision) return
    tasks = data
    phase = { kind: 'success' }
    status.textContent = `已校验并读取 ${tasks.length} 项任务。`
  } catch (error: unknown) {
    if (own !== revision) return
    phase = {
      kind: 'error',
      message: error instanceof Error ? error.message : '未知错误',
    }
    status.textContent = `读取失败：${phase.message}。可选择正常场景重试。`
  }
  if (own === revision) render()
}
addForm.addEventListener('submit', (event) => {
  event.preventDefault()
  if (phase.kind !== 'success') return
  try {
    const task = createTask(titleInput.value, crypto.randomUUID())
    tasks = [...tasks, task]
    titleInput.value = ''
    status.textContent = '已新增本页内存任务。'
    render()
    titleInput.focus()
  } catch (error: unknown) {
    titleInput.setCustomValidity(
      error instanceof Error ? error.message : '标题无效',
    )
    titleInput.reportValidity()
  }
})
titleInput.addEventListener('input', () => titleInput.setCustomValidity(''))
list.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return
  const button = event.target.closest('button[data-id]')
  if (
    !(button instanceof HTMLButtonElement) ||
    !list.contains(button) ||
    !button.dataset.id
  )
    return
  tasks = toggleTask(tasks, button.dataset.id)
  render()
})
queryInput.addEventListener('input', render)
filterInput.addEventListener('change', render)
element('#reload', HTMLButtonElement).addEventListener('click', () => {
  void reload()
})
statisticsButton.addEventListener('click', () => {
  void (async () => {
    statisticsButton.disabled = true
    try {
      const { summarize } = await import('./domain/statistics')
      const result = summarize(tasks)
      element('#statistics-result', HTMLParagraphElement).textContent =
        `全部 ${result.total} 项；已完成 ${result.done} 项；待完成 ${result.remaining} 项。`
    } catch {
      element('#statistics-result', HTMLParagraphElement).textContent =
        '统计模块加载失败，列表仍可用，可再次点击。'
    } finally {
      statisticsButton.disabled = false
    }
  })()
})
element('#app-title', HTMLHeadingElement).textContent =
  import.meta.env.VITE_APP_TITLE || '阅读任务板'
window.addEventListener('pagehide', () => controller?.abort())
window.addEventListener('pageshow', (event) => {
  if (event.persisted) void reload()
})
void reload()
