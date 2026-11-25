import withNuxt from './.nuxt/eslint.config.mjs'
export default withNuxt({
  rules: {
    'vue/html-self-closing': [
      'error',
      { html: { void: 'always', normal: 'always', component: 'always' } },
    ],
  },
  ignores: ['artifacts/**', 'test-results/**', 'playwright-report/**', '.pnpm-store/**'],
})
