import type { Course } from '../../shared/utils/catalog'
export function summarize(courses: readonly Course[]) {
  return {
    count: courses.length,
    minutes: courses.reduce((sum, c) => sum + c.minutes, 0),
  }
}
