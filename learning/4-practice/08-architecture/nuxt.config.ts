export default defineNuxtConfig({
  compatibilityDate: '2026-11-25',
  telemetry: false,
  devtools: { enabled: false },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/main.css'],
  app: { head: { htmlAttrs: { lang: 'zh-CN' } } },
  runtimeConfig: { privateCanary: '', public: { siteLabel: '模块化学习工作台' } },
  routeRules: {
    '/**': {
      cache: false,
      prerender: false,
      headers: { 'cache-control': 'private, no-store' },
    },
  },
  nitro: { preset: 'node-server' },
  typescript: { strict: true },
  eslint: { config: { stylistic: false } },
})
