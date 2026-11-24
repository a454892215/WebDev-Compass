import type { ReadingTask } from './model'
export function summarize(tasks: readonly ReadingTask[]) {
  const done = tasks.filter((task) => task.done).length
  return { total: tasks.length, done, remaining: tasks.length - done }
}
// No side effects. This unreferenced export should disappear from the build.
export function unusedDebug() {
  return 'UNUSED_DEBUG_SENTINEL_STAGE3'
}
