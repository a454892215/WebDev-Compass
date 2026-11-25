<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { LOCALES } from '../../shared/utils/catalog'
const { t } = useI18n()
const { locale, dir } = useCatalogLocale()
const route = useRoute()
const suffix = computed(() =>
  typeof route.params.slug === 'string'
    ? `/courses/${encodeURIComponent(route.params.slug)}`
    : '',
)
const labels = { 'zh-CN': '中文', en: 'English', ar: 'العربية' }
useHead(() => ({ htmlAttrs: { lang: locale.value, dir: dir.value } }))
</script>
<template>
  <div class="shell">
    <a class="skip" href="#content">{{ t('skip') }}</a>
    <header>
      <p class="brand">{{ t('brand') }}</p>
      <nav :aria-label="t('language')">
        <NuxtLink
          v-for="code in LOCALES"
          :key="code"
          :to="`/${code}${suffix}`"
          :lang="code"
          :aria-current="code === locale ? 'page' : undefined"
          >{{ labels[code] }}</NuxtLink
        >
      </nav>
    </header>
    <main><slot /></main>
    <footer>
      <ContactDialog />
      <p>{{ t('footer') }}</p>
    </footer>
  </div>
</template>
