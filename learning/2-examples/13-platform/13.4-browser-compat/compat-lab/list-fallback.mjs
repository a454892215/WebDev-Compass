// Narrow, audited UI fallback; not a full Intl.ListFormat polyfill.
export function formatList(items) {
  if (!Array.isArray(items) || items.some((item) => typeof item !== "string"))
    throw new TypeError("String list required");
  return items.join("、");
}
