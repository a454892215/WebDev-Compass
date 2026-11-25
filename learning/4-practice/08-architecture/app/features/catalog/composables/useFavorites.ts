export function useFavorites() {
  const ids = useState<Record<string, boolean>>('stage8:favorites', () => ({}))
  function toggle(scope: string, slug: string) {
    const key = `${scope}:${slug}`
    ids.value = { ...ids.value, [key]: !ids.value[key] }
  }
  return { ids, toggle }
}
