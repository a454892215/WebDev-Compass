import { useState } from 'react'
import { BrowserRouter } from 'react-router'
import {
  Counter,
  FocusInput,
  Greeting,
  LazyExample,
  MemoFilter,
  Panel,
  TogglePair,
} from './Core'
import { RoutesDemo } from './RoutesDemo'
import { FormDemo } from './FormDemo'
import styles from './Card.module.css'
const tasks = ['Vue基础', 'Nuxt路由']
function CardView({
  title,
  onSelect,
}: {
  title: string
  onSelect: () => void
}) {
  return (
    <button type="button" onClick={onSelect}>
      {title}
    </button>
  )
}
export function CardContainer() {
  const [title, setTitle] = useState('尚未选择')
  return (
    <>
      <CardView title="选择阅读卡" onSelect={() => setTitle('已选择')} />
      <p>{title}</p>
    </>
  )
}
export default function App() {
  return (
    <>
      <header>
        <h1>React选修：机制实验</h1>
        <p>Vue + Nuxt主线之外的对照，不接生产服务。</p>
      </header>
      <main>
        <section className={styles.card}>
          <Greeting name="移动开发者" />
          <Counter />
          <FocusInput />
          <Panel title="组合插槽">
            <TogglePair />
          </Panel>
          <MemoFilter tasks={tasks} query="Vue" />
          <CardContainer />
          <LazyExample />
        </section>
        <section>
          <h2>React Hook Form 与 Zod</h2>
          <FormDemo />
        </section>
        <BrowserRouter>
          <RoutesDemo />
        </BrowserRouter>
      </main>
    </>
  )
}
