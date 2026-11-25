export const fixtures = {
  a: { name: '合成用户A', title: 'A的草稿' },
  b: { name: '合成用户B', title: 'B的草稿' },
  guest: { name: '访客', title: '' },
} as const
export type Fixture = keyof typeof fixtures
export function currentFixture(value?: string): Fixture {
  return value === 'a' || value === 'b' ? value : 'guest'
}
export const reads: Record<Fixture, number> = { a: 0, b: 0, guest: 0 }
