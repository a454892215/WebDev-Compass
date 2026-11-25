export type Mode = 'ok' | 'optional-fail' | 'timeout' | 'invalid' | 'denied'
export const modes: Mode[] = ['ok', 'optional-fail', 'timeout', 'invalid', 'denied']
export interface Dashboard {
  user: { id: string; name: string }
  items: { id: string; title: string }[]
  warnings: string[]
  traceId: string
}
// A small explicitly supported JSON Schema subset, shared by OpenAPI and runtime checks.
export interface Schema {
  type: 'object' | 'array' | 'string'
  properties?: Record<string, Schema>
  required?: string[]
  additionalProperties?: boolean
  items?: Schema
}
export const dashboardSchema: Schema = {
  type: 'object',
  additionalProperties: false,
  required: ['user', 'items', 'warnings', 'traceId'],
  properties: {
    user: {
      type: 'object',
      additionalProperties: false,
      required: ['id', 'name'],
      properties: { id: { type: 'string' }, name: { type: 'string' } },
    },
    items: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'title'],
        properties: { id: { type: 'string' }, title: { type: 'string' } },
      },
    },
    warnings: { type: 'array', items: { type: 'string' } },
    traceId: { type: 'string' },
  },
}
export function matches(value: unknown, schema: Schema): boolean {
  if (schema.type === 'string') return typeof value === 'string'
  if (schema.type === 'array')
    return (
      Array.isArray(value) &&
      !!schema.items &&
      value.every((v) => matches(v, schema.items!))
    )
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const obj = value as Record<string, unknown>
  const props = schema.properties ?? {}
  return (
    (schema.required ?? []).every((key) => Object.hasOwn(obj, key)) &&
    Object.entries(obj).every(([key, val]) =>
      props[key] ? matches(val, props[key]) : schema.additionalProperties !== false,
    )
  )
}
