<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { money, dateLabel } from '../../../shared/utils/catalog'
import { siteOrigin, alternates, jsonLd } from '../../../shared/utils/seo'
const { t } = useI18n()
const { locale } = useCatalogLocale()
const route = useRoute()
const q = computed(() => (typeof route.query.q === 'string' ? route.query.q : ''))
const draft = ref(q.value)
watch(q, (value) => {
  draft.value = value
})
const {
  data: courses,
  status,
  error,
  refresh,
} = await useFetch('/api/courses', {
  query: computed(() => ({ locale: locale.value, q: q.value })),
  default: () => [],
})
const origin = siteOrigin(useRuntimeConfig().public.siteUrl)
const result = ref(''),
  workerResult = ref('')
let worker: Worker | undefined
let revision = 0
async function submitSearch() {
  await navigateTo({
    path: `/${locale.value}`,
    query: draft.value.trim() ? { q: draft.value.trim() } : {},
  })
}
async function stats() {
  const own = revision
  performance.clearMarks('catalog-summary-start')
  performance.clearMarks('catalog-summary-end')
  performance.clearMeasures('catalog-summary')
  performance.mark('catalog-summary-start')
  try {
    const { summarize } = await import('../../utils/stats')
    const value = summarize(courses.value)
    if (own !== revision) return
    result.value = t('summaryReady', value)
    await nextTick()
    performance.mark('catalog-summary-end')
    performance.measure('catalog-summary', 'catalog-summary-start', 'catalog-summary-end')
  } catch {
    result.value = t('failed')
  }
}
function countWorker() {
  const id = ++revision
  worker ??= new Worker(new URL('../../workers/catalog.worker.ts', import.meta.url), {
    type: 'module',
  })
  worker.onmessage = (event: MessageEvent<{ id: number; count: number }>) => {
    if (event.data.id === revision)
      workerResult.value = t('workerReady', { count: event.data.count })
  }
  worker.onerror = () => {
    workerResult.value = t('failed')
  }
  worker.postMessage({ id, slugs: courses.value.map((c) => c.slug) })
}
watch([courses, locale], () => {
  result.value = ''
  workerResult.value = ''
  revision++
})
onBeforeUnmount(() => {
  revision++
  worker?.terminate()
})
useHead(() => ({
  title: t('brand'),
  link: [{ rel: 'canonical', href: `${origin}/${locale.value}` }, ...alternates(origin)],
  meta: [{ name: 'robots', content: q.value ? 'noindex,follow' : 'index,follow' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: jsonLd({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: courses.value.map((c, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${origin}/${locale.value}/courses/${c.slug}`,
          name: c.title,
        })),
      }),
    },
  ],
}))
useSeoMeta({
  description: () => t('intro'),
  ogTitle: () => t('brand'),
  ogDescription: () => t('intro'),
  ogType: 'website',
  ogUrl: () => `${origin}/${locale.value}`,
  ogImage: () => `${origin}/images/og-cover.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageType: 'image/png',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('brand'),
})
</script>
<template>
  <section>
    <h1 id="content" tabindex="-1">{{ t('heading') }}</h1>
    <p>{{ t('intro') }}</p>
    <img
      class="hero"
      src="/images/course-hero.svg"
      :alt="
        locale === 'zh-CN'
          ? '课程、实践和验证三层卡片示意'
          : locale === 'ar'
            ? 'رسم يوضح التعلم والممارسة والتحقق'
            : 'Diagram of learning, practice and verification cards'
      "
      width="960"
      height="360"
      fetchpriority="high"
      decoding="async"
    />
    <search>
      <form
        :action="`/${locale}`"
        method="get"
        :aria-label="t('searchLabel')"
        @submit.prevent="submitSearch"
      >
        <label for="q">{{ t('searchLabel') }}</label><input
          id="q"
          v-model="draft"
          name="q"
          type="search"
          maxlength="80"
        /><button type="submit">
          {{ t('search') }}
        </button>
      </form>
    </search>
    <p v-if="status === 'pending'" role="status">{{ t('pending') }}</p>
    <div v-else-if="error" role="alert">
      {{ t('failed') }}<button type="button" @click="refresh()">{{ t('retry') }}</button>
    </div>
    <template v-else
      ><p data-testid="course-count">
        {{ t('count', { count: courses.length }, courses.length) }}
      </p>
      <p v-if="!courses.length" role="status">{{ t('empty') }}</p>
      <ul class="cards">
        <li v-for="course in courses" :key="course.slug">
          <article class="card">
            <h2>
              <NuxtLink :to="`/${locale}/courses/${course.slug}`">{{
                course.title
              }}</NuxtLink>
            </h2>
            <p>{{ course.summary }}</p>
            <p>
              {{ course.minutes }} {{ t('minutes') }} · {{ money(course.usd, locale) }}
            </p>
            <time :datetime="course.date">{{ dateLabel(course.date, locale) }}</time>
          </article>
        </li>
      </ul></template
    >
    <div class="tools">
      <button type="button" @click="stats">{{ t('summary') }}</button>
      <p role="status" data-testid="summary">{{ result }}</p>
      <button type="button" @click="countWorker">{{ t('worker') }}</button>
      <p role="status" data-testid="worker">{{ workerResult }}</p>
    </div>
  </section>
</template>
