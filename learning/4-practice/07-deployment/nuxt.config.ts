const profile = process.env.STAGE7_PROFILE || 'ssr'
if (!['ssr', 'ssg', 'csr'].includes(profile)) throw new Error('Unknown STAGE7_PROFILE')
const hasServer = profile === 'ssr'
export default defineNuxtConfig({
  compatibilityDate: '2026-11-25',
  telemetry: false,
  devtools: { enabled: false },
  modules: ['@nuxt/eslint'],
  css: ['~/assets/main.css'],
  ssr: profile !== 'csr',
  app: { head: { htmlAttrs: { lang: 'zh-CN' } } },
  runtimeConfig: {
    privateCanary: '',
    public: {
      renderProfile: profile,
      hasServer,
      releaseId: 'local-a',
      siteLabel: 'Web 发布实验',
    },
  },
  routeRules: {
    '/account': {
      cache: false,
      prerender: false,
      headers: { 'cache-control': 'private, no-store' },
    },
    '/api/private': {
      cache: false,
      prerender: false,
      headers: { 'cache-control': 'private, no-store' },
    },
    '/api/health': { cache: false, headers: { 'cache-control': 'no-store' } },
    '/api/catalog': { swr: 30 },
  },
  nitro: {
    preset: hasServer ? 'node-server' : 'static',
    compressPublicAssets: true,
    prerender: {
      crawlLinks: false,
      routes: hasServer
        ? []
        : profile === 'ssg'
          ? ['/', '/courses/vue', '/courses/nuxt', '/status']
          : ['/'],
      ignore: ['/account', '/api/private'],
    },
  },
  typescript: { strict: true },
  eslint: { config: { stylistic: false } },
})
