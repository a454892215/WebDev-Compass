<script setup lang="ts">
const route = useRoute()
const { data, error } = await useFetch(
  () => `/api/resources/${encodeURIComponent(String(route.params.id))}`,
)
if (error.value || !data.value)
  throw createError({
    statusCode: error.value?.statusCode ?? 404,
    statusMessage: 'Resource unavailable',
    message: '资料不存在或读取失败',
    fatal: true,
  })
const resource = computed(() => data.value)
const { ids, toggle } = useReadingList()
const { $formatCategory } = useNuxtApp()
useHead({ title: () => `${resource.value?.title ?? '资料'} | 学习资料库` })
useSeoMeta({ description: () => resource.value?.summary ?? '学习资料详情' })
</script>
<template>
  <section v-if="resource">
    <h1>{{ resource.title }}</h1>
    <p>{{ resource.summary }}</p>
    <p>类别：{{ $formatCategory(resource.category) }}</p>
    <button
      type="button"
      :aria-pressed="ids.includes(resource.id)"
      @click="toggle(resource.id)"
    >
      {{ ids.includes(resource.id) ? '移出书单' : '加入书单' }}：{{ resource.title }}
    </button>
    <p>
      <NuxtLink to="/resources/nuxt">切换到Nuxt资料</NuxtLink> ·
      <NuxtLink to="/">返回列表</NuxtLink>
    </p>
  </section>
</template>
