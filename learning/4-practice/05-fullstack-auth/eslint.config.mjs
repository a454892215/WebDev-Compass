import withNuxt from './.nuxt/eslint.config.mjs'
export default withNuxt({
  ignores: ['artifacts/**', 'test-results/**', 'playwright-report/**', '.pnpm-store/**'],
  rules: {
    'vue/html-self-closing': [
      'error',
      { html: { void: 'always', normal: 'always', component: 'always' } },
    ],
  },
})
