import { decodeTasks } from './domain'
import type { Task } from './domain'
export interface JsonResponse {
  ok: boolean
  status: number
  json(): Promise<unknown>
}
export type FetchJson = (url: string) => Promise<JsonResponse>
export async function loadTasks(fetcher: FetchJson): Promise<Task[]> {
  const response = await fetcher('/demo/tasks')
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  const payload: unknown = await response.json()
  return decodeTasks(payload)
}
