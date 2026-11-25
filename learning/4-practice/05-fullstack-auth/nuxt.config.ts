export default defineNuxtConfig({
  compatibilityDate: '2026-11-25',
  devtools: { enabled: false },
  telemetry: false,
  vue: { compilerOptions: { isCustomElement: (tag) => tag === 'search' } },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/main.css'],
  runtimeConfig: { allowedOrigin: 'http://127.0.0.1:4400' },
  app: { head: { htmlAttrs: { lang: 'zh-CN' } } },
  typescript: { strict: true },
  eslint: { config: { stylistic: false } },
})
