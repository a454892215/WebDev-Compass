export default defineNuxtConfig({
  compatibilityDate: '2026-11-25',
  telemetry: false,
  devtools: { enabled: false },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/main.css'],
  app: { head: { htmlAttrs: { lang: 'zh-CN' } } },
  routeRules: {
    '/**': {
      cache: false,
      prerender: false,
      headers: { 'x-content-type-options': 'nosniff', 'referrer-policy': 'no-referrer' },
    },
    '/api/**': { headers: { 'cache-control': 'no-store' } },
  },
  nitro: { preset: 'node-server' },
  typescript: { strict: true },
  eslint: { config: { stylistic: false } },
})
