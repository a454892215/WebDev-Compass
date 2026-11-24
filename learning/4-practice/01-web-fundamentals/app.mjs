const form = document.querySelector('#filters')
const status = document.querySelector('#status')
const cards = document.querySelector('#cards')
const result = document.querySelector('#results')
const cancel = document.querySelector('#cancel')
const favoriteIds = new Set()
let resources = []
let revision = 0
let currentController

function render() {
  const onlyFavorites = document.querySelector('#favorites').checked
  const visible = resources.filter((item) => !onlyFavorites || favoriteIds.has(item.id))
  const fragment = document.createDocumentFragment()
  for (const item of visible) {
    const li = document.createElement('li')
    const title = document.createElement('h3')
    title.textContent = item.title
    const description = document.createElement('p')
    description.textContent = item.description
    const button = document.createElement('button')
    button.type = 'button'
    button.dataset.resourceId = item.id
    button.setAttribute('aria-pressed', String(favoriteIds.has(item.id)))
    button.textContent = `${favoriteIds.has(item.id) ? '取消收藏' : '收藏'}：${item.title}`
    li.append(title, description, button)
    fragment.append(li)
  }
  cards.replaceChildren(fragment)
  status.textContent = visible.length ? `找到 ${visible.length} 项资源。` : '没有匹配的资源；可更换条件或关闭只看收藏。'
}

function decode(value) {
  if (!Array.isArray(value) || !value.every((item) => item && typeof item.id === 'string' && typeof item.title === 'string' && typeof item.description === 'string')) {
    throw new Error('响应数据结构不正确。')
  }
  return value
}

async function load() {
  const ownRevision = ++revision
  currentController?.abort()
  const controller = new AbortController()
  currentController = controller
  const params = new URLSearchParams(new FormData(form))
  result.setAttribute('aria-busy', 'true')
  result.dataset.state = 'loading'
  cancel.disabled = false
  cards.replaceChildren()
  status.textContent = '正在加载，请稍候；可以取消。'
  try {
    const response = await fetch(`/practice-api/resources?${params}`, { signal: controller.signal })
    if (!response.ok) throw new Error(`接口返回 HTTP ${response.status}。`)
    let payload
    try { payload = await response.json() } catch { throw new Error('响应不是有效的 JSON。') }
    const data = decode(payload)
    if (ownRevision !== revision) return
    resources = data
    result.dataset.state = 'success'
    render()
  } catch (error) {
    if (ownRevision !== revision) return
    resources = []
    result.dataset.state = controller.signal.aborted ? 'cancelled' : 'error'
    status.textContent = controller.signal.aborted ? '请求已取消；可以重新查询。' : `${error instanceof Error ? error.message : '请求失败。'} 请检查场景后重试。`
  } finally {
    if (ownRevision === revision) {
      result.setAttribute('aria-busy', 'false')
      cancel.disabled = true
    }
  }
}
form.addEventListener('submit', (event) => { event.preventDefault(); void load() })
cancel.addEventListener('click', () => currentController?.abort())
document.querySelector('#retry').addEventListener('click', () => void load())
document.querySelector('#favorites').addEventListener('change', () => { if (result.dataset.state === 'success') render() })
cards.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return
  const button = event.target.closest('button[data-resource-id]')
  if (!button) return
  const id = button.dataset.resourceId
  if (favoriteIds.has(id)) favoriteIds.delete(id)
  else favoriteIds.add(id)
  render()
})
document.querySelector('#theme').addEventListener('click', (event) => {
  const dark = document.documentElement.classList.toggle('dark')
  event.currentTarget.setAttribute('aria-pressed', String(dark))
})
window.addEventListener('pagehide', () => currentController?.abort())
void load()
