export default defineNuxtRouteMiddleware(async () => {
  const { data } = await useLabSession()
  if (data.value?.user?.role !== 'admin') return navigateTo('/?notice=admin-required')
})
