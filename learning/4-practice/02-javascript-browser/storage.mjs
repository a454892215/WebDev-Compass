// Only this teaching database/key is used. Resolve writes on transaction commit.
const DATABASE = 'webdev-stage2-reading-v1'
export const THEME_KEY = 'webdev-stage2-theme-v1'
function abortError() { return new DOMException('操作已取消', 'AbortError') }
function openDatabase() {
  return new Promise((resolve, reject) => {
    if (!globalThis.indexedDB) { reject(new Error('此环境没有 IndexedDB')); return }
    let settled = false
    const request = indexedDB.open(DATABASE, 1)
    request.onupgradeneeded = () => request.result.createObjectStore('drafts', { keyPath: 'id' })
    request.onblocked = () => { settled = true; reject(new Error('数据库升级被其他页面阻塞，请关闭本例旧页面再试')) }
    request.onerror = () => { settled = true; reject(request.error || new Error('数据库打开失败')) }
    request.onsuccess = () => {
      const db = request.result
      db.onversionchange = () => db.close()
      if (settled) { db.close(); return }
      settled = true; resolve(db)
    }
  })
}
async function transaction(mode, action, signal) {
  if (signal?.aborted) throw abortError()
  const db = await openDatabase()
  if (signal?.aborted) { db.close(); throw abortError() }
  try {
    return await new Promise((resolve, reject) => {
      const tx = db.transaction('drafts', mode)
      let result
      const abort = () => { try { tx.abort() } catch { /* Already committed. */ } }
      const cleanup = () => signal?.removeEventListener('abort', abort)
      tx.oncomplete = () => { cleanup(); resolve(result) }
      tx.onabort = () => { cleanup(); reject(tx.error || abortError()) }
      tx.onerror = () => { /* Request errors normally abort the transaction. */ }
      signal?.addEventListener('abort', abort, { once: true })
      try {
        const request = action(tx.objectStore('drafts'))
        request.onsuccess = () => { result = request.result }
      } catch (error) { cleanup(); abort(); reject(error) }
    })
  } finally { db.close() }
}
export function saveDraft(text, signal) {
  return transaction('readwrite', store => store.put({ id: 'main', text, updatedAt: Date.now() }), signal)
}
export async function readDraft(signal) {
  const value = await transaction('readonly', store => store.get('main'), signal)
  if (value !== undefined && (!value || typeof value.text !== 'string' || value.text.length > 2000)) throw new Error('草稿结构不正确，请删除本例草稿后重试')
  return value?.text ?? ''
}
export function removeDraft(signal) { return transaction('readwrite', store => store.delete('main'), signal) }
