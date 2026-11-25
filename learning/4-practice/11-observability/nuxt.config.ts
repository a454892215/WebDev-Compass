export default defineNuxtConfig({
  compatibilityDate: '2026-11-25',
  telemetry: false,
  devtools: { enabled: false },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/main.css'],
  app: { head: { htmlAttrs: { lang: 'zh-CN' } } },
  runtimeConfig: {
    siteOrigin: 'http://127.0.0.1:4531',
    killNewPanel: false,
    release: 'stage11-r1',
  },
  routeRules: {
    '/**': {
      cache: false,
      prerender: false,
      headers: {
        'cache-control': 'private, no-store',
        'x-content-type-options': 'nosniff',
        'referrer-policy': 'no-referrer',
      },
    },
  },
  nitro: { preset: 'node-server' },
  typescript: { strict: true },
  eslint: { config: { stylistic: false } },
})
