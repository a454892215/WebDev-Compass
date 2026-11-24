import { describe, expect, it } from 'vitest'
import { addTask, decodeTasks, toggleTask } from '../src/domain'
const task = { id: 1, title: '学习测试', done: false }
describe('领域规则', () => {
  it('解码有效数据并隔离输入对象', () => {
    const decoded = decodeTasks([task])
    expect(decoded).toEqual([task])
    expect(decoded[0]).not.toBe(task)
  })
  it.each([
    null,
    {},
    [{ id: '1', title: 'x', done: false }],
    [{ ...task, title: '' }],
    [{ ...task, title: 'x'.repeat(121) }],
    [{ ...task, done: 'false' }],
  ])('拒绝不符合协议的数据 %j', (value) => {
    expect(() => decodeTasks(value)).toThrow()
  })
  it('添加去空白且不改变旧列表', () => {
    const old = [task],
      next = addTask(old, { id: 2, title: '  变体  ', done: false })
    expect(next[1]?.title).toBe('变体')
    expect(old).toEqual([task])
  })
  it('拒绝重复编号与非法标题', () => {
    expect(() => addTask([task], task)).toThrow('编号重复')
    expect(() => addTask([], { ...task, title: '  ' })).toThrow('协议')
  })
  it('切换状态不原地改输入，错误id可诊断', () => {
    expect(toggleTask([task], 1)[0]?.done).toBe(true)
    expect(task.done).toBe(false)
    expect(() => toggleTask([task], 99)).toThrow('找不到')
  })
})
