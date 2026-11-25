import { createI18n } from 'vue-i18n'
import { localeFromPath, messages } from '../../shared/utils/catalog'
import type { Locale } from '../../shared/utils/catalog'
export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false,
    locale: localeFromPath(useRequestURL().pathname),
    fallbackLocale: 'en',
    messages,
  })
  nuxtApp.vueApp.use(i18n)
  return {
    provide: {
      setCatalogLocale: (value: Locale) => {
        i18n.global.locale.value = value
      },
    },
  }
})
