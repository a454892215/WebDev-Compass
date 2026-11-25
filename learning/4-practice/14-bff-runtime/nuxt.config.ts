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
      headers: { 'cache-control': 'private, no-store' },
    },
  },
  nitro: { preset: 'node-server' },
  typescript: { strict: true },
  runtimeConfig: {
    upstreamOrigin: 'http://127.0.0.1:4567',
    appOrigin: 'http://127.0.0.1:4561',
  },
  eslint: { config: { stylistic: false } },
})
