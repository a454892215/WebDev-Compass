const heading = document.querySelector('#route-heading')
const status = document.querySelector('#status')
const output = document.querySelector('#output')
const mode = new URL(location.href).searchParams
const forcedFallback = mode.has('fallback')
export const state = { transition: 'none', navigation: 'document', renders: 0 }
function render(path) {
  heading.textContent = path === '/nav/two' ? '视图二' : '视图一'
  document.title = heading.textContent + ' · 浏览器实验'
  state.renders++
}
export async function transitionView(update, force = forcedFallback) {
  if (
    force ||
    !document.startViewTransition ||
    matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    state.transition = 'fallback'
    update()
    heading.focus()
    return
  }
  state.transition = 'native'
  const transition = document.startViewTransition(update)
  // Animation failures need not undo already valid content changes.
  try {
    await transition.finished
  } catch {
    state.transition = 'skipped'
  }
  heading.focus()
}
render(location.pathname)
if (!forcedFallback && 'navigation' in window) {
  state.navigation = 'native'
  navigation.addEventListener('navigate', (event) => {
    const destination = new URL(event.destination.url)
    if (
      !event.canIntercept ||
      event.hashChange ||
      event.downloadRequest !== null ||
      event.formData ||
      destination.origin !== location.origin ||
      !['/', '/nav/one', '/nav/two'].includes(destination.pathname)
    )
      return
    event.intercept({
      focusReset: 'manual',
      handler: async () => {
        render(destination.pathname)
        heading.focus()
      },
    })
  })
}
// No catch-all click trap. Unsupported Navigation uses ordinary same-origin document links.
document.querySelector('#transition').addEventListener('click', async () => {
  await transitionView(() => {
    heading.textContent = heading.textContent === '局部详情' ? '视图一' : '局部详情'
  })
  status.textContent = '视图已更新，焦点已落到标题'
})
export async function opfsRoundTrip(force = false) {
  if (force || !navigator.storage?.getDirectory)
    return {
      supported: false,
      fallback: '使用可导出的内存草稿；本实验不悄悄更换持久化保证',
    }
  const root = await navigator.storage.getDirectory()
  const name = 'compass-fixture-' + crypto.randomUUID() + '.txt'
  let created = false
  try {
    const file = await root.getFileHandle(name, { create: true })
    created = true
    const writer = await file.createWritable()
    try {
      await writer.write('synthetic-local-draft')
    } finally {
      await writer.close()
    }
    const text = await (await file.getFile()).text()
    return { supported: true, text, uniqueFile: true }
  } finally {
    if (created) await root.removeEntry(name)
  }
}
export async function rtcRoundTrip(force = false) {
  if (force || !window.RTCPeerConnection)
    return { supported: false, fallback: '保留普通HTTP通知入口，不假造实时成功' }
  const a = new RTCPeerConnection({ iceServers: [] }),
    b = new RTCPeerConnection({ iceServers: [] })
  const pendingA = [],
    pendingB = []
  const errors = []
  a.onicecandidate = ({ candidate }) => {
    if (candidate) {
      if (b.remoteDescription)
        b.addIceCandidate(candidate).catch((e) => errors.push(e.name))
      else pendingB.push(candidate)
    }
  }
  b.onicecandidate = ({ candidate }) => {
    if (candidate) {
      if (a.remoteDescription)
        a.addIceCandidate(candidate).catch((e) => errors.push(e.name))
      else pendingA.push(candidate)
    }
  }
  const outgoing = a.createDataChannel('fixture', { ordered: true })
  let incoming
  let timeout
  try {
    const message = new Promise((resolve, reject) => {
      timeout = setTimeout(() => reject(new Error('RTC_TIMEOUT')), 5000)
      b.ondatachannel = (event) => {
        incoming = event.channel
        incoming.onmessage = (msg) => resolve(msg.data)
      }
      outgoing.onopen = () => outgoing.send('synthetic-ping')
    })
    await a.setLocalDescription(await a.createOffer())
    await b.setRemoteDescription(a.localDescription)
    await Promise.all(pendingB.splice(0).map((c) => b.addIceCandidate(c)))
    await b.setLocalDescription(await b.createAnswer())
    await a.setRemoteDescription(b.localDescription)
    await Promise.all(pendingA.splice(0).map((c) => a.addIceCandidate(c)))
    const text = await message
    if (errors.length) throw new Error('ICE_ERROR')
    return { supported: true, text, connection: a.connectionState }
  } finally {
    clearTimeout(timeout)
    outgoing.close()
    incoming?.close()
    a.close()
    b.close()
    state.rtcClosed = a.connectionState === 'closed' && b.connectionState === 'closed'
  }
}
for (const [id, run] of [
  ['opfs', opfsRoundTrip],
  ['rtc', rtcRoundTrip],
])
  document.querySelector('#' + id).addEventListener('click', async () => {
    status.textContent = '正在运行本地实验'
    try {
      const result = await run()
      output.textContent = JSON.stringify(result, null, 2)
      status.textContent = '实验结束'
    } catch (error) {
      status.textContent = '实验失败：' + error.name
      output.textContent = '检查能力、权限、配额或网络，保留回退，不伪造成功。'
    }
  })
window.lab = { state, transitionView, opfsRoundTrip, rtcRoundTrip }
