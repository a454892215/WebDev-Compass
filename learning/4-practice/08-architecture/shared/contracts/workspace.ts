export type Scope = 'alice' | 'bob'
export interface Course {
  slug: string
  title: string
  minutes: number
}
export interface Workspace {
  version: 1
  scope: Scope
  courses: Course[]
  completed: number | null
  warnings: string[]
}
export function parseScope(value: unknown): Scope {
  if (value === 'alice' || value === 'bob') return value
  throw new TypeError('Unsupported scope')
}
export function decodeWorkspace(value: unknown): Workspace {
  if (!value || typeof value !== 'object') throw new TypeError('Invalid workspace')
  const v = value as Record<string, unknown>
  const scope = parseScope(v.scope)
  if (
    v.version !== 1 ||
    !Array.isArray(v.courses) ||
    v.courses.length > 100 ||
    !Array.isArray(v.warnings) ||
    v.warnings.some((x) => typeof x !== 'string') ||
    !(v.completed === null || (Number.isInteger(v.completed) && Number(v.completed) >= 0))
  )
    throw new TypeError('Invalid workspace')
  const courses = v.courses.map((row: unknown) => {
    if (!row || typeof row !== 'object') throw new TypeError('Invalid course')
    const c = row as Record<string, unknown>
    if (
      typeof c.slug !== 'string' ||
      !['vue', 'nuxt'].includes(c.slug) ||
      typeof c.title !== 'string' ||
      c.title.length > 100 ||
      !Number.isInteger(c.minutes) ||
      Number(c.minutes) <= 0
    )
      throw new TypeError('Invalid course')
    return { slug: c.slug, title: c.title, minutes: Number(c.minutes) }
  })
  return {
    version: 1,
    scope,
    courses,
    completed: v.completed as number | null,
    warnings: [...v.warnings] as string[],
  }
}
