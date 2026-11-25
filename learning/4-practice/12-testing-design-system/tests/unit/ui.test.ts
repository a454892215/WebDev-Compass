import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { UiButton, UiField } from '@compass/stage12-ui'
import { validateTitle, appearance } from '../../shared/profile'
describe('public package behavior', () => {
  it('preserves native type, slot, attrs and disabled activation', async () => {
    const click = vi.fn()
    const wrapper = mount(UiButton, {
      props: { disabled: true },
      attrs: { 'aria-label': '合成操作', onClick: click },
      slots: { default: '提交' },
    })
    expect(wrapper.get('button').attributes('type')).toBe('button')
    expect(wrapper.get('button').attributes('aria-label')).toBe('合成操作')
    await wrapper.get('button').trigger('click')
    expect(click).not.toHaveBeenCalled()
    await wrapper.setProps({ disabled: false, type: 'submit', variant: 'secondary' })
    await wrapper.get('button').trigger('click')
    expect(click).toHaveBeenCalledTimes(1)
    expect(wrapper.get('button').classes()).toContain('c-button--secondary')
    wrapper.unmount()
  })
  it('binds label/hint/error to the actual input and emits v-model values', async () => {
    const wrapper = mount(UiField, {
      props: {
        id: 'fixture-title',
        label: '标题',
        modelValue: '',
        hint: '合成提示',
        error: '必须填写',
      },
      attrs: { maxlength: 60, name: 'title' },
    })
    expect(wrapper.get('label').attributes('for')).toBe('fixture-title')
    expect(wrapper.get('input').attributes('aria-describedby')).toBe(
      'fixture-title-hint fixture-title-error',
    )
    expect(wrapper.get('input').attributes('aria-invalid')).toBe('true')
    expect(wrapper.get('input').attributes('name')).toBe('title')
    await wrapper.get('input').setValue('新的标题')
    expect(wrapper.emitted('update:modelValue')).toEqual([['新的标题']])
    await wrapper.setProps({ error: '' })
    expect(wrapper.get('input').attributes('aria-invalid')).toBeUndefined()
    expect(wrapper.get('input').attributes('aria-describedby')).toBe('fixture-title-hint')
    wrapper.unmount()
  })
  it('renders literal untrusted strings as text on the server', async () => {
    const html = await renderToString(
      createSSRApp({
        render: () => h(UiButton, null, () => '<img src=x onerror=alert(1)>'),
      }),
    )
    expect(html).toContain('&lt;img')
    expect(html).not.toContain('<img')
  })
  it('checks independent title boundaries and display allowlists', () => {
    expect(validateTitle(' \t ')).toBe('请输入标题')
    expect(validateTitle('a'.repeat(60))).toBe('')
    expect(validateTitle('a'.repeat(61))).toBe('标题最多60字符')
    expect(appearance('ar', 'night')).toEqual({
      locale: 'ar',
      dir: 'rtl',
      theme: 'night',
    })
    expect(appearance('invalid', 'invalid')).toEqual({
      locale: 'zh',
      dir: 'ltr',
      theme: 'day',
    })
  })
})
