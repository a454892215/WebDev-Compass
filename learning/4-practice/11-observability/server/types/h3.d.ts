declare module 'h3' {
  interface H3EventContext {
    observation: {
      traceId: string
      spanId: string
      traceparent: string
      started: number
      recorded?: boolean
    }
  }
}
export {}
