export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  let previousPath = router.currentRoute.value.path
  nuxtApp.hook('page:finish', async () => {
    const path = router.currentRoute.value.path
    if (path === previousPath) return // initial hydration / query-only update must not steal focus
    previousPath = path
    await nextTick()
    document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true })
  })
})
