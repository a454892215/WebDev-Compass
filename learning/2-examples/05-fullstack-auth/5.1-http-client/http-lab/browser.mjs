import { readJSON, decodePage, latestLoader } from './client.mjs'
const list = document.querySelector('#items'),
  status = document.querySelector('#status')
const controller = latestLoader(
  async (q, signal) =>
    decodePage(await readJSON(`/api/v1/items?q=${encodeURIComponent(q)}`, { signal })),
  (state) => {
    status.textContent =
      state.kind === 'success'
        ? `共${state.total}项，本页${state.items.length}项`
        : state.kind === 'empty'
          ? '无匹配资料'
          : state.kind === 'loading'
            ? '加载中'
            : `读取失败：${state.message}`
    list.replaceChildren(
      ...(state.items || []).map((item) => {
        const li = document.createElement('li')
        li.textContent = item.title
        return li
      }),
    )
  },
)
document.querySelector('#search').addEventListener('submit', (event) => {
  event.preventDefault()
  void controller.load(document.querySelector('#q').value)
})
document.querySelector('#upload').addEventListener('submit', (event) => {
  event.preventDefault()
  const form = event.currentTarget,
    result = document.querySelector('#upload-result'),
    progress = document.querySelector('#progress'),
    button = form.querySelector('button')
  button.disabled = true
  result.textContent = '上传中'
  progress.value = 0
  const xhr = new XMLHttpRequest()
  xhr.open('POST', '/api/upload')
  xhr.responseType = 'json'
  xhr.timeout = 3000
  xhr.upload.addEventListener('progress', (e) => {
    if (e.lengthComputable) progress.value = (e.loaded / e.total) * 100
  })
  xhr.addEventListener('load', () => {
    result.textContent =
      xhr.status === 201
        ? `校验通过：${xhr.response.name}，${xhr.response.bytes}字节，未保存`
        : `上传失败：HTTP ${xhr.status}`
  })
  xhr.addEventListener('error', () => {
    result.textContent = '上传网络失败'
  })
  xhr.addEventListener('timeout', () => {
    result.textContent = '上传超时，不能据此认定服务器未处理'
  })
  xhr.addEventListener('loadend', () => {
    button.disabled = false
  })
  // The browser sets multipart Content-Type with the correct boundary.
  xhr.send(new FormData(form))
})
let objectURL
const revoke = () => {
  if (objectURL) {
    URL.revokeObjectURL(objectURL)
    objectURL = undefined
  }
}
document.querySelector('#download').addEventListener('click', () => {
  void (async () => {
    const response = await fetch('/api/download')
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const blob = await response.blob()
    revoke()
    objectURL = URL.createObjectURL(blob)
    const link = document.querySelector('#download-link')
    link.href = objectURL
    link.hidden = false
  })().catch(() => {
    status.textContent = '下载准备失败，可重试'
  })
})
addEventListener('pagehide', () => {
  controller.dispose()
  revoke()
})
