export function useReadingList() {
  const ids = useState<string[]>('reading-list', () => [])
  function toggle(id: string) {
    ids.value = ids.value.includes(id)
      ? ids.value.filter((value) => value !== id)
      : [...ids.value, id]
  }
  return { ids: readonly(ids), toggle }
}
