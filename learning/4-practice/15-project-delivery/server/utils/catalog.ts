import { normalizeLegacy, parseProducts, compareCatalog } from '../../shared/catalog'
// Two independent read-only fixtures. No production API, database, payment or writes.
export function oldCatalog() {
  return [
    {
      product_code: 'p1',
      product_name: '旅行背包',
      price: '129.00',
      internal_cost: '50.00',
    },
    {
      product_code: 'p2',
      product_name: '桌面台灯',
      price: '89.50',
      internal_cost: '30.00',
    },
    {
      product_code: 'p3',
      product_name: '安全文本 <script>fixture</script>',
      price: '0.00',
      internal_cost: '0.00',
    },
  ]
}
export function newCatalog(mismatch = false) {
  return parseProducts([
    { id: 'p1', title: '旅行背包', cents: mismatch ? 12901 : 12900 },
    { id: 'p2', title: '桌面台灯', cents: 8950 },
    { id: 'p3', title: '安全文本 <script>fixture</script>', cents: 0 },
  ])
}
export function shadowCompare(mismatch = false) {
  return compareCatalog(normalizeLegacy(oldCatalog()), newCatalog(mismatch))
}
