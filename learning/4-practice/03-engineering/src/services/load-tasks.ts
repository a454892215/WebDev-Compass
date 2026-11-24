import { decodeTasks } from '@domain/model'
export async function loadTasks(
  url: string,
  fetcher: typeof fetch = fetch,
  signal?: AbortSignal,
) {
  const response = await fetcher(url, signal ? { signal } : {})
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  let value: unknown
  try {
    value = await response.json()
  } catch {
    throw new Error('响应不是有效 JSON')
  }
  return decodeTasks(value)
}
