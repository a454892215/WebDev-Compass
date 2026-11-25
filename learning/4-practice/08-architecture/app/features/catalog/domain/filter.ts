import type { Course } from '~~/shared/contracts/workspace'
export function filterCourses(courses: readonly Course[], query: string): Course[] {
  const q = query.trim().toLocaleLowerCase('en')
  return courses.filter((c) => c.title.toLocaleLowerCase('en').includes(q))
}
