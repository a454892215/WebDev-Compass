import { describe, it, expect } from 'vitest'
import { courses, findCourse } from '../../shared/catalog'
describe('public catalogue', () => {
  it('contains stable unique routes', () => {
    expect(new Set(courses.map((x) => x.slug)).size).toBe(courses.length)
    expect(findCourse('vue')?.title).toContain('Vue 3')
  })
  it('does not turn missing into first course', () => {
    expect(findCourse('absent')).toBeUndefined()
  })
})
