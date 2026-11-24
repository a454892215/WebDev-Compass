export default defineNuxtConfig({
  compatibilityDate: '2026-11-24',
  devtools: { enabled: false },
  telemetry: false,
  vue: { compilerOptions: { isCustomElement: (tag) => tag === 'search' } },
  extends: ['./layers/learning'],
  modules: ['@nuxt/eslint', './modules/learning'],
  css: ['~/assets/main.css'],
  runtimeConfig: {
    privateDemoLabel: 'server-only-demo',
    public: { courseLabel: 'Vue 3 与 Nuxt 学习站' },
  },
  app: { head: { htmlAttrs: { lang: 'zh-CN' } } },
  routeRules: { '/client-demo': { ssr: false } },
  nitro: {
    prerender: {
      crawlLinks: false,
      routes:
        process.env.COMPASS_PRERENDER === '1'
          ? ['/', '/about', '/resources/vue', '/resources/nuxt']
          : [],
    },
  },
  typescript: { strict: true },
  eslint: { config: { stylistic: false } },
})
