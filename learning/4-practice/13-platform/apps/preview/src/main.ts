import { createApp, h } from 'vue'
import { makePlan, formatCount } from '@compass/platform-core'
import './style.css'
const plan = makePlan(3)
createApp({
  render: () =>
    h('main', [
      h('h1', '共享核心包预览'),
      h('p', { id: 'count' }, formatCount(plan.length)),
      h(
        'ul',
        plan.map((item) => h('li', { key: item.id }, item.label)),
      ),
      h('p', 'Vite应用通过同一core公开产物消费，不从主应用源码深层导入。'),
    ]),
}).mount('#app')
