import { describe, expect, it } from 'vitest'
import { createTask, decodeTasks, filterTasks, toggleTask } from '@domain/model'
import { summarize } from '@domain/statistics'
const seed = [
  { id: 'a', title: 'Vue 类型', done: false },
  { id: 'b', title: '构建检查', done: true },
]
describe('unknown payload decoding', () => {
  it('accepts valid tasks but returns model copies', () => {
    const result = decodeTasks(seed)
    expect(result).toEqual(seed)
    expect(result[0]).not.toBe(seed[0])
  })
  it.each([
    null,
    {},
    [{ id: 'a', title: 't', done: 'false' }],
    [{ id: '', title: 't', done: false }],
  ])('rejects invalid shape %j', (value) => {
    expect(() => decodeTasks(value)).toThrow()
  })
  it('rejects duplicate ids', () => {
    expect(() => decodeTasks([...seed, seed[0]])).toThrow('重复')
  })
})
describe('task operations', () => {
  it('trims a valid title and starts as open', () => {
    expect(createTask('  新任务  ', 'id')).toEqual({
      id: 'id',
      title: '新任务',
      done: false,
    })
  })
  it.each(['  ', 'x'.repeat(81)])('rejects invalid input', (title) => {
    expect(() => createTask(title, 'id')).toThrow()
  })
  it('toggles without mutating original objects', () => {
    const updated = toggleTask(seed, 'a')
    expect(updated[0]?.done).toBe(true)
    expect(seed[0]?.done).toBe(false)
    expect(updated[1]).toBe(seed[1])
  })
  it('handles an unknown id without changing values', () => {
    expect(toggleTask(seed, 'missing')).toEqual(seed)
  })
  it('combines query and status without altering source', () => {
    expect(filterTasks(seed, 'open', ' VUE ')).toEqual([seed[0]])
    expect(filterTasks(seed, 'done', '')).toEqual([seed[1]])
    expect(seed).toHaveLength(2)
  })
  it('handles empty results and statistics', () => {
    expect(filterTasks(seed, 'all', 'missing')).toEqual([])
    expect(summarize([])).toEqual({ total: 0, done: 0, remaining: 0 })
    expect(summarize(seed)).toEqual({ total: 2, done: 1, remaining: 1 })
  })
})
