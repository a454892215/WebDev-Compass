export function readConfig(env) {
  const rawPort = env.LAB_PORT ?? '4562'
  if (!/^[0-9]+$/.test(rawPort)) throw new Error('invalid-LAB_PORT')
  const port = Number(rawPort)
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('invalid-LAB_PORT')
  const rawDebug = env.LAB_DEBUG ?? 'false'
  if (!['true', 'false'].includes(rawDebug)) throw new Error('invalid-LAB_DEBUG')
  if (!env.LAB_TOKEN) throw new Error('missing-LAB_TOKEN')
  return Object.freeze({ port, debug: rawDebug === 'true', token: env.LAB_TOKEN })
}
export function publicConfig(config) { return { port: config.port, debug: config.debug } }
