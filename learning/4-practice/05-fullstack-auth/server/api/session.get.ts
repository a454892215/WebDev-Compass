import { currentSession } from '../utils/auth'
import { sessions } from '../utils/session-store'
export default defineEventHandler((event) => sessions.view(currentSession(event)))
