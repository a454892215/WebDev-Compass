import type { SessionView } from '../../shared/utils/contracts'
export const anonymousSession = (): SessionView => ({ user: null, csrfToken: null })
export function useLabSession() {
  return useFetch('/api/session', { key: 'stage5-session', default: anonymousSession })
}
