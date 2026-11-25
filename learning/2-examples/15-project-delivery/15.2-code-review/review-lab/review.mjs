// Synthetic review fixture. The bad version is never connected to a real UI/API.
export const badTotal = (line) => Math.round(Number(line.quantity) * Number(line.unitCents))
export function decodeLine(line) {
  if (!line || typeof line !== 'object' || Array.isArray(line)) throw new Error('INVALID_LINE')
  const { quantity, unitCents, title } = line
  if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 99) throw new Error('INVALID_QUANTITY')
  if (!Number.isSafeInteger(unitCents) || unitCents < 0 || unitCents > 1000000) throw new Error('INVALID_PRICE')
  if (typeof title !== 'string' || title.length > 100) throw new Error('INVALID_TITLE')
  return { quantity, unitCents, title }
}
export function lineTotal(line) {
  const value = decodeLine(line)
  return { title: value.title, totalCents: value.quantity * value.unitCents }
}
// A valid-domain legacy implementation and its extraction have the same observable DTO.
// Invalid-input hardening belongs to a separate behavior change, not this refactoring proof.
export function legacyView(line) {
  return { title: line.title, totalCents: line.quantity * line.unitCents }
}
export const extractedView = (line) => ({ title: line.title, totalCents: multiplyCents(line.quantity, line.unitCents) })
const multiplyCents = (quantity, unitCents) => quantity * unitCents
// Only a checklist predicate. A true value is NOT human approval or an automatic merge.
export function evidenceComplete(record) {
  return record.tests === 'passed' && record.findings.every(f => f.severity === 'nit' || f.resolved === true)
}
export function validateSlices(slices, expectedIds) {
  const seen = new Set()
  for (const slice of slices) {
    if (!slice.purpose || !slice.check || slice.depends.some(id => !seen.has(id)) || seen.has(slice.id)) return false
    seen.add(slice.id)
  }
  return expectedIds.length === seen.size && expectedIds.every(id => seen.has(id))
}
// Synthetic history candidates, not a quality score or personnel metric.
export function rankCandidates(rows) {
  return rows.filter(r => !r.generated).map(r => ({ ...r, candidateWeight: r.touches * r.manualComplexity }))
    .sort((a,b) => b.candidateWeight - a.candidateWeight)
}
