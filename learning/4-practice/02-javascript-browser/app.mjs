import { THEME_KEY, saveDraft, readDraft, removeDraft } from './storage.mjs'
const $ = selector => document.querySelector(selector)
const form = $('#filters'), q = $('#q'), mode = $('#mode'), list = $('#list'), results = $('#results')
let active
let mounts = 0
const validModes = new Set(['ok', 'slow', 'error', 'invalid', 'shape'])
export function debounce(fn, wait) {
  let timer
  const run = (...args) => { clearTimeout(timer); timer = setTimeout(() => { timer = undefined; fn(...args) }, wait) }
  run.cancel = () => { clearTimeout(timer); timer = undefined }
  return run
}
function readURL() {
  const params = new URL(location.href).searchParams
  q.value = (params.get('q') || '').slice(0, 80)
  mode.value = validModes.has(params.get('mode')) ? params.get('mode') : 'ok'
}
function writeURL(replace = false) {
  const url = new URL(location.href)
  url.searchParams.set('q', q.value); url.searchParams.set('mode', mode.value)
  const state = { q: q.value, mode: mode.value }
  if (replace) history.replaceState(state, '', url)
  else if (url.href !== location.href) history.pushState(state, '', url)
}
function storageError(error) { $('#storage-status').textContent = `主题存储不可用，仍使用页面内状态：${error.name || 'Error'}。` }
function setTheme(dark, persist) {
  document.documentElement.classList.toggle('dark', dark)
  $('#theme').setAttribute('aria-pressed', String(dark))
  if (persist) {
    try { localStorage.setItem(THEME_KEY, JSON.stringify({ theme: dark ? 'dark' : 'light' })); $('#storage-status').textContent = '已保存本例主题；浏览器仍可能清理本地数据。' }
    catch (error) { storageError(error) }
  }
}
function restoreTheme() {
  try {
    const raw = localStorage.getItem(THEME_KEY)
    if (raw === null) { setTheme(false, false); return }
    const value = JSON.parse(raw)
    if (!value || !['light', 'dark'].includes(value.theme)) throw new Error('Invalid theme')
    setTheme(value.theme === 'dark', false)
  } catch (error) { setTheme(false, false); storageError(error) }
}
function current(life, revision = life.revision) { return active === life && !life.events.signal.aborted && life.revision === revision }
function decode(payload) {
  if (!Array.isArray(payload) || !payload.every(x => x && typeof x.id === 'string' && typeof x.title === 'string' && typeof x.summary === 'string')) throw new Error('响应数据结构不正确')
  return payload
}
function render(items) {
  const fragment = document.createDocumentFragment()
  for (const item of items) {
    const li = document.createElement('li'), heading = document.createElement('h3'), text = document.createElement('p')
    heading.textContent = item.title; text.textContent = item.summary; li.dataset.itemId = item.id
    li.append(heading, text); fragment.append(li)
  }
  list.replaceChildren(fragment)
}
async function load(life, updateHistory = true) {
  if (!current(life)) return
  const revision = ++life.revision
  life.request?.abort()
  const controller = new AbortController(); life.request = controller
  if (updateHistory) writeURL()
  results.dataset.state = 'loading'; results.setAttribute('aria-busy', 'true'); $('#cancel').disabled = false
  $('#request-status').textContent = '正在查询；可取消。'
  const params = new URLSearchParams({ q: q.value, mode: mode.value })
  try {
    const response = await fetch(`/stage2-api/items?${params}`, { signal: controller.signal })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    let payload
    try { payload = await response.json() } catch { throw new Error('响应不是有效 JSON') }
    const data = decode(payload)
    if (!current(life, revision)) return
    // This is plain fixture data. structuredClone is not a universal copier.
    life.items = typeof structuredClone === 'function' ? structuredClone(data) : data.map(item => ({ ...item }))
    render(life.items)
    results.dataset.state = 'success'
    $('#request-status').textContent = data.length ? `找到 ${data.length} 条阅读项。` : '没有匹配项，请修改关键词。'
    if (life.worker) life.worker.postMessage({ revision, titles: data.map(x => x.title) })
    else $('#worker-info').textContent = `Worker 不可用；本页列表仍可读，共 ${data.length} 项。`
  } catch (error) {
    if (!current(life, revision)) return
    life.items = []; render([])
    results.dataset.state = controller.signal.aborted ? 'cancelled' : 'error'
    $('#request-status').textContent = controller.signal.aborted ? '查询已取消；可再次提交。' : `${error.message}；请切回正常场景再查询。`
    $('#worker-info').textContent = '当前查询无可统计结果。'
  } finally {
    if (current(life, revision)) { results.setAttribute('aria-busy', 'false'); $('#cancel').disabled = true }
  }
}
function bind(life, target, type, fn) { target.addEventListener(type, fn, { signal: life.events.signal }) }
function draftOperation(life, operation) {
  return async () => {
    if (!current(life) || life.draftBusy) return
    life.draftBusy = true
    for (const id of ['save', 'restore', 'clear']) $('#' + id).disabled = true
    $('#draft-status').textContent = '等待本地事务提交。'
    try {
      if (operation === 'save') await saveDraft($('#draft').value.slice(0, 2000), life.events.signal)
      else if (operation === 'restore') {
        const value = await readDraft(life.events.signal)
        if (current(life)) $('#draft').value = value
      } else await removeDraft(life.events.signal)
      if (current(life)) $('#draft-status').textContent = operation === 'save' ? '草稿事务已提交。' : operation === 'restore' ? '已读取本例草稿；没有记录时显示空白。' : '本例草稿已删除，其他数据未清理。'
    } catch (error) { if (current(life)) $('#draft-status').textContent = `草稿操作失败：${error.message}。当前输入仍保留。` }
    finally {
      life.draftBusy = false
      if (current(life)) for (const id of ['save', 'restore', 'clear']) $('#' + id).disabled = false
    }
  }
}
function setControls(enabled) {
  for (const el of form.elements) el.disabled = !enabled
  for (const id of ['theme', 'draft', 'save', 'restore', 'clear']) $('#' + id).disabled = !enabled
  $('#cancel').disabled = true; $('#mount').disabled = enabled; $('#dispose').disabled = !enabled
}
function mount() {
  if (active) return
  const life = { events: new AbortController(), revision: 0, items: [], request: null, mutationCount: 0 }
  active = life; mounts += 1; setControls(true); restoreTheme(); readURL(); writeURL(true)
  $('#lifecycle').textContent = `已装配 ${mounts} 次；监听器与资源只属于当前视图。`
  const delayed = debounce(() => void load(life), 280); life.delayed = delayed
  bind(life, q, 'input', () => delayed())
  bind(life, form, 'submit', event => { event.preventDefault(); delayed.cancel(); void load(life) })
  bind(life, $('#cancel'), 'click', () => life.request?.abort())
  bind(life, window, 'popstate', () => { delayed.cancel(); readURL(); void load(life, false) })
  bind(life, $('#theme'), 'click', () => setTheme(!document.documentElement.classList.contains('dark'), true))
  for (const action of ['save', 'restore', 'clear']) bind(life, $('#' + action), 'click', draftOperation(life, action))
  if ('ResizeObserver' in window) {
    life.resize = new ResizeObserver(entries => {
      if (current(life)) $('#size-info').textContent = `队列容器宽度约 ${Math.round(entries[0].contentRect.width)} CSS px（仅读取，不修改被观察尺寸）。`
    }); life.resize.observe($('.queue-panel'))
  } else $('#size-info').textContent = 'ResizeObserver 不可用；CSS 布局仍可用。'
  if ('IntersectionObserver' in window) {
    life.intersection = new IntersectionObserver(entries => {
      if (current(life)) $('#intersection-info').textContent = entries[0].isIntersecting ? '队列末尾进入视口。' : '队列末尾在视口外。'
    }); life.intersection.observe($('#sentinel'))
  } else $('#intersection-info').textContent = 'IntersectionObserver 不可用；完整列表仍可读。'
  if ('MutationObserver' in window) {
    life.mutation = new MutationObserver(records => {
      if (!current(life)) return
      life.mutationCount += records.length
      $('#mutation-info').textContent = `列表变更记录：${life.mutationCount}（记录数不等于用户动作次数）。`
    }); life.mutation.observe(list, { childList: true })
  }
  if ('Worker' in window) {
    try {
      life.worker = new Worker(new URL('./stats-worker.mjs', import.meta.url), { type: 'module' })
      bind(life, life.worker, 'message', ({ data }) => {
        if (data && Number.isInteger(data.revision) && current(life, data.revision) && Number.isInteger(data.count) && Number.isInteger(data.characters)) $('#worker-info').textContent = `Worker：${data.count} 项标题，${data.characters} 个 Unicode 码点。`
      })
      bind(life, life.worker, 'error', event => { event.preventDefault(); if (current(life)) $('#worker-info').textContent = 'Worker 启动/运行失败，列表仍可用。' })
    } catch { $('#worker-info').textContent = 'Worker 创建失败，列表仍可用。' }
  }
  void load(life, false)
}
function dispose() {
  const life = active
  if (!life) return
  active = undefined; life.delayed.cancel(); life.request?.abort(); life.events.abort()
  life.resize?.disconnect(); life.intersection?.disconnect(); life.mutation?.disconnect(); life.worker?.terminate()
  setControls(false); results.dataset.state = 'disposed'; results.setAttribute('aria-busy', 'false')
  $('#lifecycle').textContent = '已卸载：定时器、监听器、请求、Observer 与 Worker 已清理；不等于强制执行 GC。'
  $('#request-status').textContent = '视图已卸载，可重新装配。'
}
$('#mount').addEventListener('click', mount)
$('#dispose').addEventListener('click', dispose)
window.addEventListener('pagehide', dispose)
window.addEventListener('pageshow', event => { if (event.persisted) mount() })
mount()
