export function formatPrice(cents) {
  if (!Number.isSafeInteger(cents) || cents < 0) throw new Error('invalid-cents')
  return '¥' + (cents / 100).toFixed(2)
}
