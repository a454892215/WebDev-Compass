export interface Resource {
  id: string
  title: string
  category: 'vue' | 'nuxt'
  summary: string
}
export const resources: readonly Resource[] = Object.freeze([
  {
    id: 'vue',
    title: 'Vue 响应式入门',
    category: 'vue',
    summary: '从 ref 和 computed 到可复用组件。',
  },
  {
    id: 'components',
    title: 'Vue 组件契约',
    category: 'vue',
    summary: '理解 Props、事件与插槽的职责。',
  },
  {
    id: 'nuxt',
    title: 'Nuxt SSR 与数据',
    category: 'nuxt',
    summary: '理解服务端 HTML、payload 和客户端接管。',
  },
])
export function searchResources(query: string): Resource[] {
  const term = query.trim().toLowerCase()
  return resources
    .filter((r) => `${r.title} ${r.summary}`.toLowerCase().includes(term))
    .map((r) => ({ ...r }))
}
export function validateTitle(value: unknown): string {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > 60)
    throw new Error('标题须为1–60个字符')
  return value.trim()
}
