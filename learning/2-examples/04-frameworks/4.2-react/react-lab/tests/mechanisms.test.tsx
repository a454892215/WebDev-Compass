import { act, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import type { ReactNode } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router'
import {
  BrokenCard,
  Counter,
  FocusInput,
  Greeting,
  LazyExample,
  LegacyGreeting,
  LocaleLabel,
  LocaleProvider,
  MemoFilter,
  Panel,
  PortalNote,
  ReducerCounter,
  RenderBoundary,
  Subscription,
  taskReducer,
  TogglePair,
} from '../src/Core'
import { RoutesDemo } from '../src/RoutesDemo'
import {
  fetchTitle,
  makeQueryClient,
  optimisticAppend,
  makeReduxStore,
  makeSelectionStore,
} from '../src/stores'
import { TaskSchema } from '../src/schema'
import { FormDemo } from '../src/FormDemo'
import { CardContainer } from '../src/App'
const mounts: { root: Root; host: HTMLDivElement }[] = []
async function mount(node: ReactNode) {
  const host = document.createElement('div')
  document.body.append(host)
  const root = createRoot(host)
  mounts.push({ root, host })
  await act(async () => root.render(node))
  return {
    host,
    rerender: async (next: ReactNode) => {
      await act(async () => root.render(next))
    },
  }
}
async function click(host: HTMLElement, text: string) {
  const button = Array.from(host.querySelectorAll('button,a')).find(
    (el) => el.textContent === text,
  )
  if (!(button instanceof HTMLElement)) throw new Error('missing ' + text)
  await act(async () => button.click())
}
afterEach(async () => {
  for (const { root, host } of mounts.splice(0)) {
    await act(async () => root.unmount())
    host.remove()
  }
  vi.restoreAllMocks()
})
describe('React core contracts', () => {
  it('4.2.1.1 JSX escapes text rather than treating it as HTML', async () => {
    const { host } = await mount(<Greeting name="<b>输入</b>" />)
    expect(host.textContent).toContain('<b>输入</b>')
    expect(host.querySelector('b')).toBeNull()
  })
  it('4.2.1.2 function and supported legacy class receive the same props', async () => {
    const { host } = await mount(
      <>
        <Greeting name="甲" />
        <LegacyGreeting name="乙" />
      </>,
    )
    expect(host.querySelectorAll('p')).toHaveLength(2)
    expect(host.textContent).toContain('乙')
  })
  it('4.2.1.3 props and children compose without owning parent state', async () => {
    const { host } = await mount(
      <Panel title="任务">
        <p>正文</p>
      </Panel>,
    )
    expect(host.querySelector('section')?.getAttribute('aria-label')).toBe(
      '任务',
    )
    expect(host.textContent).toBe('任务正文')
  })
  it('4.2.1.4 updater functions compose two increments', async () => {
    const { host } = await mount(<Counter />)
    await click(host, '计数 0')
    expect(host.textContent).toBe('计数 2')
  })
  it('4.2.1.5 effect replaces and cleans a real subscription contract', async () => {
    const events: string[] = []
    const observe = (v: string) => {
      events.push('start:' + v)
      return () => {
        events.push('stop:' + v)
      }
    }
    const view = await mount(<Subscription topic="A" observe={observe} />)
    await view.rerender(<Subscription topic="B" observe={observe} />)
    expect(events).toEqual(['start:A', 'stop:A', 'start:B'])
  })
  it('4.2.1.6 ref performs focus on a real DOM input', async () => {
    const { host } = await mount(<FocusInput />)
    await click(host, '聚焦标题')
    expect(document.activeElement).toBe(host.querySelector('input'))
  })
  it('4.2.1.7 memoized calculation changes with complete dependencies', async () => {
    const tasks = ['Vue', 'Nuxt']
    const view = await mount(<MemoFilter tasks={tasks} query="Vue" />)
    expect(view.host.querySelectorAll('li')).toHaveLength(1)
    await view.rerender(<MemoFilter tasks={tasks} query="Nuxt" />)
    expect(view.host.querySelector('li')?.textContent).toBe('Nuxt')
    await click(view.host, 'Nuxt')
    expect(view.host.textContent).toContain('选择 Nuxt')
  })
  it('4.2.1.8 context resolves nearest provider', async () => {
    const { host } = await mount(
      <LocaleProvider value="en">
        <LocaleLabel />
      </LocaleProvider>,
    )
    expect(host.textContent).toBe('语言 en')
  })
  it('4.2.1.9 reducer replaces changed records and leaves original untouched', async () => {
    const before = [{ id: 'a', title: '阅读', done: false }]
    const after = taskReducer(before, { type: 'toggle', id: 'a' })
    expect(before[0]?.done).toBe(false)
    expect(after[0]?.done).toBe(true)
    const { host } = await mount(<ReducerCounter />)
    await click(host, '任务 0')
    expect(host.textContent).toBe('任务 1')
  })
  it('4.2.1.10 custom hook shares logic but keeps separate state', async () => {
    const { host } = await mount(<TogglePair />)
    await click(host, 'A false')
    expect(host.textContent).toBe('A trueB false')
  })
  it('4.2.1.11 boundary handles controlled render error', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const { host } = await mount(
      <RenderBoundary>
        <BrokenCard />
      </RenderBoundary>,
    )
    expect(host.querySelector('[role=alert]')?.textContent).toContain(
      '渲染失败',
    )
  })
  it('4.2.1.12 portal moves DOM while lazy module resolves through Suspense', async () => {
    const target = document.createElement('aside')
    document.body.append(target)
    const { host } = await mount(
      <>
        <PortalNote target={target} />
        <LazyExample />
      </>,
    )
    expect(target.textContent).toBe('传送的内容')
    expect(host.textContent).not.toContain('传送的内容')
    await act(async () => {
      await import('../src/LazyNote')
    })
    expect(host.textContent).toContain('懒模块已加载')
    target.remove()
  })
  it('4.2.1.13 root StrictMode probes setup/cleanup in development', async () => {
    const observe = vi.fn(() => vi.fn())
    const view = await mount(
      <StrictMode>
        <Subscription topic="探测" observe={observe} />
      </StrictMode>,
    )
    expect(observe).toHaveBeenCalledTimes(2)
    expect(observe.mock.results[0]?.value).toHaveBeenCalledTimes(1)
    expect(view.host.textContent).toContain('探测')
  })
})
describe('React Router8 declarative mode', () => {
  it('4.2.2.1 params/search/navigation come from URL', async () => {
    const { host } = await mount(
      <MemoryRouter initialEntries={['/tasks/7?q=Vue']}>
        <RoutesDemo />
      </MemoryRouter>,
    )
    expect(host.textContent).toContain('任务 7查询 Vue')
    await click(host, '更新查询')
    expect(host.textContent).toContain('查询 Nuxt')
    await click(host, '返回首页')
    expect(host.textContent).toContain('路由首页')
  })
  it('4.2.2.2 layout survives nested content changes', async () => {
    const { host } = await mount(
      <MemoryRouter>
        <RoutesDemo />
      </MemoryRouter>,
    )
    const nav = host.querySelector('nav')
    await click(host, '任务7')
    expect(host.querySelector('nav')).toBe(nav)
    expect(host.textContent).toContain('任务 7')
  })
  it('4.2.2.3 client guard redirects but is not server authorization', async () => {
    const { host } = await mount(
      <MemoryRouter initialEntries={['/private']}>
        <RoutesDemo />
      </MemoryRouter>,
    )
    expect(host.textContent).toContain('登录占位')
    expect(host.textContent).not.toContain('受限页面占位')
  })
  it('4.2.2.4 lazy route runs loaded component', async () => {
    const { host } = await mount(
      <MemoryRouter initialEntries={['/report']}>
        <RoutesDemo />
      </MemoryRouter>,
    )
    await act(async () => {
      await import('../src/LazyNote')
    })
    expect(host.textContent).toContain('懒模块已加载')
  })
})
describe('state/form ecosystem and composition', () => {
  it('4.2.3.1 local state remains local until a real sharing need exists', async () => {
    const { host } = await mount(<TogglePair />)
    await click(host, 'A false')
    expect(host.textContent).toContain('B false')
  })
  it('4.2.3.2 factory creates isolated Zustand stores', () => {
    const a = makeSelectionStore(),
      b = makeSelectionStore()
    let notifications = 0
    const off = a.subscribe(() => notifications++)
    a.getState().select('7')
    off()
    a.getState().select('8')
    expect(a.getState().selected).toBe('8')
    expect(b.getState().selected).toBeNull()
    expect(notifications).toBe(1)
  })
  it('4.2.3.3 RTK thunk dispatches pending/success/failure', async () => {
    const store = makeReduxStore()
    await store.dispatch(fetchTitle({ fail: false })).unwrap()
    expect(store.getState().title).toEqual({
      value: 'Vue入门',
      status: 'success',
    })
    await expect(
      store.dispatch(fetchTitle({ fail: true })).unwrap(),
    ).rejects.toMatchObject({ message: 'fixture failure' })
    expect(store.getState().title.status).toBe('error')
  })
  it('4.2.3.4 query keys deduplicate and invalidation/rollback are explicit', async () => {
    const q = makeQueryClient()
    let calls = 0
    const queryFn = async () => {
      calls++
      return ['Vue']
    }
    await q.fetchQuery({ queryKey: ['tasks', 'a'], queryFn })
    await q.fetchQuery({ queryKey: ['tasks', 'a'], queryFn })
    expect(calls).toBe(1)
    const old = q.getQueryData(['tasks', 'a'])
    q.setQueryData(['tasks', 'a'], ['optimistic'])
    q.setQueryData(['tasks', 'a'], old)
    expect(q.getQueryData(['tasks', 'a'])).toEqual(['Vue'])
    await q.invalidateQueries({ queryKey: ['tasks'] })
    expect(q.getQueryState(['tasks', 'a'])?.isInvalidated).toBe(true)
    await q.fetchQuery({ queryKey: ['tasks', 'a'], queryFn })
    expect(calls).toBe(2)
    q.clear()
  })
  it('4.2.3.4 failed optimistic write restores snapshot; retry is explicit', async () => {
    const q = makeQueryClient()
    q.setQueryData(['tasks', 'a'], ['Vue'])
    await expect(
      optimisticAppend(q, ['tasks', 'a'], 'temporary', async () => {
        expect(q.getQueryData(['tasks', 'a'])).toEqual(['Vue', 'temporary'])
        throw new Error('controlled write failure')
      }),
    ).rejects.toThrow('controlled write failure')
    expect(q.getQueryData(['tasks', 'a'])).toEqual(['Vue'])
    expect(q.getQueryState(['tasks', 'a'])?.isInvalidated).toBe(true)
    let attempts = 0
    const result = await q.fetchQuery({
      queryKey: ['retry-demo'],
      queryFn: async () => {
        if (++attempts < 2) throw new Error('temporary fixture error')
        return 'recovered'
      },
      retry: 1,
      retryDelay: 0,
    })
    expect(result).toBe('recovered')
    expect(attempts).toBe(2)
    q.clear()
  })
  it('4.2.3.5 RHF displays Zod validation and schema transforms valid input', async () => {
    const { host } = await mount(<FormDemo />)
    await click(host, '保存标题')
    expect(host.querySelector('[role=status]')?.textContent).toContain(
      '请输入标题',
    )
    expect(host.querySelector('input')?.getAttribute('aria-invalid')).toBe(
      'true',
    )
    expect(TaskSchema.parse({ title: '  Vue  ' })).toEqual({ title: 'Vue' })
    expect(TaskSchema.safeParse({ title: 12 }).success).toBe(false)
  })
  it('4.2.4.1 view callbacks leave data ownership in container', async () => {
    const { host } = await mount(<CardContainer />)
    expect(host.textContent).toContain('尚未选择')
    await click(host, '选择阅读卡')
    expect(host.textContent).toContain('已选择')
  })
})
