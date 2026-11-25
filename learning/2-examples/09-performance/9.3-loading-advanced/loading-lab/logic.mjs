export function publicKey(url, headers = {}) {
  if (
    Object.keys(headers).some((key) =>
      ["cookie", "authorization"].includes(key.toLowerCase()),
    )
  )
    return null;
  if (url.pathname !== "/public-data") return null;
  const allowed = new Set(["q", "lang"]);
  if ([...url.searchParams.keys()].some((key) => !allowed.has(key)))
    return null;
  const q = url.searchParams.get("q") || "";
  const lang = url.searchParams.get("lang") || "zh-CN";
  if (q.length > 40 || !["zh-CN", "en"].includes(lang)) return null;
  return JSON.stringify(["public-data:v1", q, lang]);
}
export function speculationPlan(supported, { saveData = false } = {}) {
  return supported && !saveData
    ? {
        prefetch: [
          { source: "list", urls: ["/next.html"], eagerness: "conservative" },
        ],
      }
    : null;
}
