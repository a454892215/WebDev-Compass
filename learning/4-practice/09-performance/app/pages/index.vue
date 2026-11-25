<script setup lang="ts">
import { parseMode } from '~~/shared/catalog'
import type { Catalogue } from '~~/shared/catalog'
const route = useRoute()
const mode = computed(() => {
  try {
    return parseMode(route.query.mode)
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Invalid mode' })
  }
})
const requestFetch = useRequestFetch()
const { data, error, refresh, status } = await useAsyncData(
  () => `stage9:catalogue:${mode.value}`,
  () => requestFetch<Catalogue>('/api/catalog', { query: { mode: mode.value } }),
)
const OptionalPanel = defineLazyHydrationComponent(
  'interaction',
  () => import('../components/OptionalPanel.vue'),
)
const hydrated = ref(false)
const action = ref(0)
async function measureAction() {
  performance.clearMarks('stage9:action-start')
  performance.clearMeasures('stage9:action')
  performance.mark('stage9:action-start')
  action.value++
  await nextTick()
  performance.measure('stage9:action', 'stage9:action-start')
  performance.clearMarks('stage9:action-start')
}
useSeoMeta({
  title: 'Nuxt首屏性能实验',
  description: '比较合成数据瀑布、SSR payload与按需水合，明确测量边界',
})
</script>
<template>
  <AppFrame
    ><h1>Nuxt首屏性能实验</h1>
    <p>
      当前模式：<strong id="mode">{{ mode }}</strong
      >。先预测任务依赖，再观察实际值。
    </p>
    <nav aria-label="读取模式">
      <NuxtLink :to="{ path: '/', query: { mode: 'parallel' } }">并行读取</NuxtLink
      ><NuxtLink :to="{ path: '/', query: { mode: 'serial' } }">串行读取</NuxtLink>
    </nav>
    <p v-if="status === 'pending'" role="status">读取中…</p>
    <section v-if="error" role="alert">
      <p>读取失败</p>
      <button type="button" @click="refresh()">重试</button>
    </section>
    <template v-else-if="data"
      ><p>{{ data.summary }}</p>
      <p>
        服务端本次合成读取：<span id="server-duration">{{
          data.durationMs.toFixed(2)
        }}</span>
        ms。不是TTFB或FCP。
      </p>
      <ul>
        <li v-for="course in data.courses" :key="course.slug">{{ course.title }}</li>
      </ul></template
    ><button type="button" @click="measureAction">主交互 {{ action }}</button>
    <p>主交互计时覆盖JS到Vue nextTick，不等于浏览器呈现或INP。</p>
    <p id="hydrate-status">可选面板{{ hydrated ? '已水合' : '等待交互' }}</p>
    <OptionalPanel hydrate-on-interaction="click" @hydrated="hydrated = true"
  /></AppFrame>
</template>
