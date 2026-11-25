import { decodeWorkspace, parseScope } from '~~/shared/contracts/workspace'
export async function useWorkspace() {
  const route = useRoute()
  const scope = computed(() => {
    try {
      return parseScope(route.query.scope || 'alice')
    } catch {
      throw createError({ statusCode: 400, statusMessage: 'Invalid scope' })
    }
  })
  const failOptional = computed(() => route.query.failOptional === '1')
  const key = computed(
    () => `workspace:v1:${scope.value}:${failOptional.value ? 'degraded' : 'normal'}`,
  )
  const requestFetch = useRequestFetch()
  const result = await useAsyncData(key, async () =>
    decodeWorkspace(
      await requestFetch('/api/workspace', {
        query: { scope: scope.value, failOptional: failOptional.value ? '1' : '0' },
      }),
    ),
  )
  return { ...result, scope, failOptional }
}
