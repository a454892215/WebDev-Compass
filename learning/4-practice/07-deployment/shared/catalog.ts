export const courses = [
  { slug: 'vue', title: 'Vue 3 组件交付', summary: '从组件行为到可验证产物。' },
  {
    slug: 'nuxt',
    title: 'Nuxt 渲染与部署',
    summary: '让构建产物、托管与请求边界保持一致。',
  },
] as const
export function findCourse(slug: string) {
  return courses.find((course) => course.slug === slug)
}
