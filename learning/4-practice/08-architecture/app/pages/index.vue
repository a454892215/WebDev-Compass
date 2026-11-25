<script setup lang="ts">
import { useWorkspace, useFavorites, catalogueView, CourseList } from '~/features/catalog'
const route = useRoute()
const router = useRouter()
const { data, error, status, refresh, scope, failOptional } = await useWorkspace()
const { ids, toggle } = useFavorites()
const query = computed(() => (typeof route.query.q === 'string' ? route.query.q : ''))
const draft = ref(query.value)
watch(query, (q) => (draft.value = q))
const view = computed(() => (data.value ? catalogueView(data.value, query.value) : null))
const count = computed(
  () =>
    Object.entries(ids.value).filter(([k, v]) => v && k.startsWith(`${scope.value}:`))
      .length,
)
async function search() {
  await router.push({
    path: '/',
    query: { ...route.query, q: draft.value.trim() || undefined },
  })
}
function scopeLink(value: string) {
  return { path: '/', query: { ...route.query, scope: value } }
}
useSeoMeta({
  title: '模块化学习工作台',
  description: '模块、数据归属与BFF降级的可验证边界',
})
</script>
<template>
  <AppFrame
    ><h1>模块化学习工作台</h1>
    <p>
      当前公开样例：<strong id="scope">{{ scope }}</strong
      >，收藏 <span id="favorite-count">{{ count }}</span> 项。
    </p>
    <nav aria-label="样例切换">
      <NuxtLink :to="scopeLink('alice')">Alice 样例</NuxtLink
      ><NuxtLink :to="scopeLink('bob')">Bob 样例</NuxtLink
      ><NuxtLink
        :to="{
          path: '/',
          query: { ...route.query, failOptional: failOptional ? undefined : '1' },
        }"
        >{{ failOptional ? '恢复可选进度' : '模拟进度不可用' }}</NuxtLink
      >
    </nav>
    <form @submit.prevent="search">
      <label for="query">课程搜索</label
      ><input id="query" v-model="draft" type="search" maxlength="100" /><button
        type="submit"
      >
        搜索
      </button>
    </form>
    <p v-if="status === 'pending'" role="status">读取课程中…</p>
    <section v-if="error" role="alert">
      <p>课程读取失败，请重试。</p>
      <button type="button" @click="refresh()">重试</button>
    </section>
    <template v-else-if="view"
      ><p v-if="view.warning" role="status">{{ view.warning }}</p>
      <p id="completed">
        完成进度：{{ view.completed === null ? '暂不可用' : view.completed }}
      </p>
      <CourseList
        :items="view.items"
        :scope="scope"
        :favorites="ids"
        @toggle="(slug) => toggle(scope, slug)" /></template
  ></AppFrame>
</template>
