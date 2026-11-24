import { addTask, toggleTask } from './domain'
import type { Task } from './domain'
import './style.css'
const form = document.querySelector('#task-form'),
  input = document.querySelector('#title'),
  list = document.querySelector('#tasks'),
  status = document.querySelector('#status')
if (
  !(form instanceof HTMLFormElement) ||
  !(input instanceof HTMLInputElement) ||
  !(list instanceof HTMLUListElement) ||
  !(status instanceof HTMLParagraphElement)
)
  throw new Error('演示结构缺失')
let tasks: Task[] = []
let nextId = 1
function render() {
  const nodes = tasks.map((task) => {
    const li = document.createElement('li'),
      button = document.createElement('button')
    button.type = 'button'
    button.dataset.id = String(task.id)
    button.setAttribute('aria-pressed', String(task.done))
    button.textContent = `${task.done ? '撤销' : '完成'}：${task.title}`
    li.append(button)
    return li
  })
  if (list instanceof HTMLUListElement) list.replaceChildren(...nodes)
}
form.addEventListener('submit', (event) => {
  event.preventDefault()
  try {
    tasks = addTask(tasks, { id: nextId, title: input.value, done: false })
    nextId++
    input.value = ''
    render()
    status.textContent = `已添加 ${tasks.length} 项`
  } catch (error) {
    status.textContent = error instanceof Error ? error.message : '添加失败'
  }
})
list.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return
  const button = event.target.closest('button[data-id]')
  if (!(button instanceof HTMLButtonElement) || !list.contains(button)) return
  tasks = toggleTask(tasks, Number(button.dataset.id))
  render()
  status.textContent = '条目状态已更新'
})
