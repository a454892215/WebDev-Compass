import { defineNuxtModule } from '@nuxt/kit'
export default defineNuxtModule({
  meta: { name: 'compass-learning-module' },
  setup(_options, nuxt) {
    ;(nuxt.options.app.head.meta ??= []).push({
      name: 'compass-module',
      content: 'build-time-only',
    })
  },
})
