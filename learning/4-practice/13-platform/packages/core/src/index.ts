export function parseLimit(value: unknown): number | null {
  if (value === undefined) return 3
  if (typeof value !== 'string' || !/^([1-9]|10)$/.test(value)) return null
  return Number(value)
}
export function makePlan(limit: number) {
  if (!Number.isInteger(limit) || limit < 1 || limit > 10)
    throw new RangeError('Limit must be 1..10')
  return Array.from({ length: limit }, (_, i) => ({
    id: 'task-' + (i + 1),
    label: '合成任务 ' + (i + 1),
  }))
}
export function formatCount(count: number) {
  return '计划共' + count + '项'
}
