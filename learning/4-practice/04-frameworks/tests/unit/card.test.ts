import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ResourceCard from '../../app/components/ResourceCard.vue'
const resource = { id: 'vue', title: 'Vue', category: 'vue' as const, summary: 'public' }
describe('ResourceCard public contract', () => {
  it('emits without mutating props and updates from parent', async () => {
    const wrapper = mount(ResourceCard, { props: { resource, selected: false } })
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('toggle')).toEqual([['vue']])
    expect(wrapper.props('selected')).toBe(false)
    await wrapper.setProps({ selected: true })
    expect(wrapper.get('button').attributes('aria-pressed')).toBe('true')
    wrapper.unmount()
  })
  it('renders named/default slots and escapes text', () => {
    const wrapper = mount(ResourceCard, {
      props: { resource: { ...resource, title: '<b>safe</b>' }, selected: false },
      slots: { default: 'slot body' },
    })
    expect(wrapper.find('h2 b').exists()).toBe(false)
    expect(wrapper.text()).toContain('slot body')
    wrapper.unmount()
  })
})
