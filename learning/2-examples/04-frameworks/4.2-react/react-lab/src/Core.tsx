import {
  Component,
  createContext,
  lazy,
  memo,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { createPortal } from 'react-dom'
export function Greeting({ name }: { name: string }) {
  return <p>你好，{name}</p>
}
export class LegacyGreeting extends Component<{ name: string }> {
  render() {
    return <Greeting name={this.props.name} />
  }
}
export function Panel({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section aria-label={title}>
      <h2>{title}</h2>
      {children}
    </section>
  )
}
export function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button
      type="button"
      onClick={() => {
        setCount((n) => n + 1)
        setCount((n) => n + 1)
      }}
    >
      计数 {count}
    </button>
  )
}
export function Subscription({
  topic,
  observe,
}: {
  topic: string
  observe: (value: string) => () => void
}) {
  useEffect(() => observe(topic), [topic, observe])
  return <p>订阅 {topic}</p>
}
export function FocusInput() {
  const ref = useRef<HTMLInputElement>(null)
  return (
    <>
      <label htmlFor="focus-input">标题</label>
      <input id="focus-input" ref={ref} />
      <button type="button" onClick={() => ref.current?.focus()}>
        聚焦标题
      </button>
    </>
  )
}
const ItemList = memo(function ItemList({
  items,
  onSelect,
}: {
  items: readonly string[]
  onSelect: (v: string) => void
}) {
  return (
    <ul>
      {items.map((v) => (
        <li key={v}>
          <button type="button" onClick={() => onSelect(v)}>
            {v}
          </button>
        </li>
      ))}
    </ul>
  )
})
export function MemoFilter({
  tasks,
  query,
}: {
  tasks: readonly string[]
  query: string
}) {
  const [selected, setSelected] = useState('无')
  const items = useMemo(
    () => tasks.filter((v) => v.includes(query)),
    [tasks, query],
  )
  const select = useCallback((v: string) => setSelected(v), [])
  return (
    <>
      <ItemList items={items} onSelect={select} />
      <p>选择 {selected}</p>
    </>
  )
}
const Locale = createContext('zh')
export function LocaleLabel() {
  return <p>语言 {useContext(Locale)}</p>
}
export function LocaleProvider({
  children,
  value,
}: {
  children: ReactNode
  value: string
}) {
  return <Locale.Provider value={value}>{children}</Locale.Provider>
}
export type Task = { id: string; title: string; done: boolean }
export type TaskAction =
  { type: 'add'; task: Task } | { type: 'toggle'; id: string }
export function taskReducer(
  state: readonly Task[],
  action: TaskAction,
): Task[] {
  return action.type === 'add'
    ? [...state, action.task]
    : state.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t))
}
export function ReducerCounter() {
  const [tasks, dispatch] = useReducer(taskReducer, [])
  return (
    <button
      type="button"
      onClick={() =>
        dispatch({
          type: 'add',
          task: { id: String(tasks.length), title: '阅读', done: false },
        })
      }
    >
      任务 {tasks.length}
    </button>
  )
}
export function useToggle(initial = false) {
  const [on, setOn] = useState(initial)
  return { on, toggle: () => setOn((v) => !v) }
}
export function TogglePair() {
  const a = useToggle(),
    b = useToggle()
  return (
    <>
      <button type="button" onClick={a.toggle}>
        A {String(a.on)}
      </button>
      <p>B {String(b.on)}</p>
    </>
  )
}
export class RenderBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(_error: Error, _info: ErrorInfo) {
    /* Demonstration: no external telemetry. */
  }
  render() {
    return this.state.failed ? (
      <p role="alert">组件渲染失败，可返回其他示例。</p>
    ) : (
      this.props.children
    )
  }
}
export function BrokenCard(): ReactNode {
  throw new Error('controlled rendering failure')
}
const LazyNote = lazy(() => import('./LazyNote'))
export function PortalNote({ target }: { target: Element }) {
  return (
    <>
      <p>原树内容</p>
      {createPortal(<p>传送的内容</p>, target)}
    </>
  )
}
export function LazyExample() {
  return (
    <Suspense fallback={<p>加载模块…</p>}>
      <LazyNote />
    </Suspense>
  )
}
