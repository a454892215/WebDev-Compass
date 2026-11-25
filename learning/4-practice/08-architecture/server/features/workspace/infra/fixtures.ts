import type { WorkspacePorts } from '../domain/ports'
export function fixturePorts(failOptional: boolean): WorkspacePorts {
  return {
    async readCourses(scope) {
      return [
        {
          course_id: 'vue',
          course_title: `Vue 3 模块边界 · ${scope}`,
          duration_minutes: 45,
          internal_note: 'STAGE8_INTERNAL_ONLY',
        },
        {
          course_id: 'nuxt',
          course_title: `Nuxt 数据与渲染 · ${scope}`,
          duration_minutes: 60,
          internal_note: 'STAGE8_INTERNAL_ONLY',
        },
      ]
    },
    async readProgress(scope) {
      if (failOptional) throw new Error('Synthetic progress unavailable')
      return scope === 'alice' ? 1 : 2
    },
  }
}
