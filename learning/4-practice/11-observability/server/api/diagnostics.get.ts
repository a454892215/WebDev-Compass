import { observability } from '../utils/observability'
export default defineEventHandler(() => observability.snapshot())
