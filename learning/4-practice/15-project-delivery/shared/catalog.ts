export interface Product {
  id: string
  title: string
  cents: number
}
export function parseProducts(value: unknown): Product[] {
  if (!Array.isArray(value)) throw new Error('catalog-array')
  const ids = new Set<string>()
  return value.map((row) => {
    if (
      !row ||
      typeof row !== 'object' ||
      typeof row.id !== 'string' ||
      !/^p[1-9][0-9]*$/.test(row.id) ||
      typeof row.title !== 'string' ||
      row.title.length > 100 ||
      !Number.isSafeInteger(row.cents) ||
      row.cents < 0 ||
      ids.has(row.id)
    )
      throw new Error('catalog-shape')
    ids.add(row.id)
    return { id: row.id, title: row.title, cents: row.cents }
  })
}
export function normalizeLegacy(value: unknown): Product[] {
  if (!Array.isArray(value)) throw new Error('legacy-array')
  return parseProducts(
    value.map((row) => {
      if (
        !row ||
        typeof row !== 'object' ||
        typeof row.product_code !== 'string' ||
        typeof row.product_name !== 'string' ||
        typeof row.price !== 'string' ||
        !/^(0|[1-9][0-9]{0,7})\.[0-9]{2}$/.test(row.price)
      )
        throw new Error('legacy-shape')
      const [whole, fraction] = row.price.split('.')
      return {
        id: row.product_code,
        title: row.product_name,
        cents: Number(whole) * 100 + Number(fraction),
      }
    }),
  )
}
export function filterProducts(rows: Product[], q: string) {
  return rows.filter((row) =>
    row.title.toLocaleLowerCase('zh-CN').includes(q.toLocaleLowerCase('zh-CN')),
  )
}
export function compareCatalog(old: Product[], fresh: Product[]) {
  const before = new Map(old.map((x) => [x.id, x]))
  const after = new Map(fresh.map((x) => [x.id, x]))
  return [...new Set([...before.keys(), ...after.keys()])].sort().flatMap((id) => {
    const a = before.get(id),
      b = after.get(id)
    return !a || !b || a.title !== b.title || a.cents !== b.cents
      ? [{ id, reason: !a ? 'added' : !b ? 'missing' : 'changed' }]
      : []
  })
}
export function migrationTarget(bucket: number, percent: number, rollback: boolean) {
  if (
    !Number.isInteger(bucket) ||
    bucket < 0 ||
    bucket > 99 ||
    !Number.isInteger(percent) ||
    percent < 0 ||
    percent > 100
  )
    throw new Error('rollout-range')
  return !rollback && bucket < percent ? '/catalog' : '/legacy/catalog'
}
export function escapeHTML(value: string) {
  return value.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  )
}
