import { flagDecision, subjectFrom } from '../utils/flags'
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const subject = subjectFrom(getCookie(event, 'stage11_fixture'))
  return {
    subject,
    release: String(config.release),
    flag: flagDecision(
      subject,
      config.killNewPanel === true || String(config.killNewPanel) === 'true',
    ),
    traceId: String(event.context.observation.traceId),
  }
})
