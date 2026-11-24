export default defineNuxtRouteMiddleware((to) => {
  if (to.query.notice === '1') return navigateTo('/about?from=study')
})
