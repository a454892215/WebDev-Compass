export default defineNuxtConfig({
  compatibilityDate: '2026-11-25',
  devtools: { enabled: false },
  telemetry: false,
  vue: { compilerOptions: { isCustomElement: (tag) => tag === 'search' } },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/main.css'],
  app: { head: { htmlAttrs: { lang: 'zh-CN', dir: 'ltr' } } },
  runtimeConfig: { public: { siteUrl: 'https://compass.example' } },
  routeRules: {
    '/': { redirect: '/zh-CN' },
    '/api/**': { headers: { 'cache-control': 'public, max-age=30' } },
  },
  nitro: { compressPublicAssets: true },
  typescript: { strict: true },
  eslint: { config: { stylistic: false } },
})
