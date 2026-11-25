<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { money, dateLabel } from '../../../../shared/utils/catalog'
import { siteOrigin, alternates, jsonLd } from '../../../../shared/utils/seo'
const { t } = useI18n()
const { locale } = useCatalogLocale()
const route = useRoute()
const { data: course, error } = await useFetch(
  () => `/api/courses/${encodeURIComponent(String(route.params.slug))}`,
  { query: computed(() => ({ locale: locale.value })) },
)
if (error.value || !course.value)
  throw createError({
    statusCode: error.value?.statusCode ?? 404,
    statusMessage: 'Course unavailable',
    fatal: true,
  })
const origin = siteOrigin(useRuntimeConfig().public.siteUrl)
const path = computed(
  () => `/${locale.value}/courses/${encodeURIComponent(String(route.params.slug))}`,
)
useHead(() => ({
  title: `${course.value?.title ?? t('brand')} | ${t('brand')}`,
  link: [
    { rel: 'canonical', href: origin + path.value },
    ...alternates(origin, `/courses/${encodeURIComponent(String(route.params.slug))}`),
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: jsonLd({
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: course.value?.title,
        description: course.value?.summary,
        inLanguage: locale.value,
        url: origin + path.value,
        provider: { '@type': 'Organization', name: 'WebDev Compass' },
      }),
    },
  ],
}))
useSeoMeta({
  description: () => course.value?.summary ?? '',
  ogTitle: () => course.value?.title ?? '',
  ogDescription: () => course.value?.summary ?? '',
  ogUrl: () => origin + path.value,
  ogType: 'website',
  ogImage: () => `${origin}/images/og-cover.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/png',
  twitterCard: 'summary_large_image',
  twitterTitle: () => course.value?.title ?? '',
})
</script>
<template>
  <section v-if="course">
    <h1 id="content" tabindex="-1">{{ course.title }}</h1>
    <p>{{ course.summary }}</p>
    <p>{{ course.minutes }} {{ t('minutes') }} · {{ money(course.usd, locale) }}</p>
    <time :datetime="course.date">{{ dateLabel(course.date, locale) }}</time>
    <p>
      <NuxtLink :to="`/${locale}`">{{ t('back') }}</NuxtLink>
    </p>
  </section>
</template>
