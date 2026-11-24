import { afterEach, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { TaskButton } from '../src/TaskButton'
enableAutoUnmount(afterEach)
it('组件展示props并发出领域id，不改父数据', async () => {
  const task = { id: 7, title: '组件练习', done: false }
  const wrapper = mount(TaskButton, { props: { task } })
  expect(wrapper.get('button').text()).toBe('完成：组件练习')
  await wrapper.get('button').trigger('click')
  expect(wrapper.emitted('toggle')).toEqual([[7]])
  expect(task.done).toBe(false)
  await wrapper.setProps({ task: { ...task, done: true } })
  expect(wrapper.get('button').attributes('aria-pressed')).toBe('true')
  expect(wrapper.get('button').text()).toBe('撤销：组件练习')
})
