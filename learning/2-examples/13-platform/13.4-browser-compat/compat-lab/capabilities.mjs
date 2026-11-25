export function selectCapabilities({ listFormat } = {}) {
  return { listFormat: typeof listFormat === "function" };
}
export async function createFormatter(
  capability,
  loadFallback = () => import("./list-fallback.mjs"),
) {
  if (capability.listFormat)
    return {
      mode: "native",
      format: (items) =>
        new Intl.ListFormat("zh-CN", {
          style: "long",
          type: "conjunction",
        }).format(items),
    };
  const { formatList } = await loadFallback();
  return { mode: "local-fallback", format: formatList };
}
