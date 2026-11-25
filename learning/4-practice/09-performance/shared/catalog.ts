export type Mode = 'serial' | 'parallel'
export function parseMode(value: unknown): Mode {
  if (value === undefined || value === 'parallel') return 'parallel'
  if (value === 'serial') return 'serial'
  throw new TypeError('Invalid mode')
}
export interface Catalogue {
  mode: Mode
  courses: { slug: string; title: string }[]
  summary: string
  durationMs: number
}
