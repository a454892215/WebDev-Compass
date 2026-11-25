import type { Scope, Course, Workspace } from '~~/shared/contracts/workspace'
import type { WorkspacePorts } from '../domain/ports'
export async function loadWorkspace(
  scope: Scope,
  ports: WorkspacePorts,
): Promise<Workspace> {
  const [raw, progress] = await Promise.allSettled([
    ports.readCourses(scope),
    ports.readProgress(scope),
  ])
  if (raw.status === 'rejected' || !Array.isArray(raw.value) || raw.value.length > 100)
    throw new TypeError('Required catalogue unavailable')
  const courses: Course[] = raw.value.map((x: unknown) => {
    if (!x || typeof x !== 'object') throw new TypeError('Invalid upstream course')
    const v = x as Record<string, unknown>
    if (
      typeof v.course_id !== 'string' ||
      !['vue', 'nuxt'].includes(v.course_id) ||
      typeof v.course_title !== 'string' ||
      v.course_title.length > 100 ||
      !Number.isInteger(v.duration_minutes) ||
      Number(v.duration_minutes) <= 0
    )
      throw new TypeError('Invalid upstream course')
    return {
      slug: v.course_id,
      title: v.course_title,
      minutes: Number(v.duration_minutes),
    }
  })
  const completed =
    progress.status === 'fulfilled' &&
    Number.isInteger(progress.value) &&
    Number(progress.value) >= 0
      ? Number(progress.value)
      : null
  return {
    version: 1,
    scope,
    courses,
    completed,
    warnings: completed === null ? ['可选进度暂不可用，课程仍可阅读。'] : [],
  }
}
