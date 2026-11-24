<script setup lang="ts">
const route = useRoute()
const q = computed(() => (typeof route.query.q === 'string' ? route.query.q : ''))
const draftQuery = ref(q.value)
watch(q, (value) => {
  draftQuery.value = value
})
const query = computed(() => ({
  q: q.value,
  fail: route.query.fail === '1' ? '1' : undefined,
}))
const { data, status, error, refresh } = await useFetch('/api/resources', { query })
const { ids, toggle } = useReadingList()
const reversed = ref(false)
const shown = computed(() =>
  reversed.value ? [...(data.value ?? [])].reverse() : (data.value ?? []),
)
async function submitSearch() {
  await navigateTo({
    path: '/',
    query: draftQuery.value.trim() ? { q: draftQuery.value.trim() } : {},
  })
}
async function recover() {
  if (route.query.fail) await navigateTo('/')
  else await refresh()
}
useHead({
  title: () => (q.value ? `搜索 ${q.value} | 学习资料库` : '资料列表 | 学习资料库'),
})
useSeoMeta({ description: '用真实Vue和Nuxt学习路由、状态、SSR和错误恢复。' })
</script>
<template>
  <section>
    <h1>学习资料库</h1>
    <p>
      已选书单
      <output data-testid="selected-count">{{ ids.length }}</output>
      项；刷新重建本次应用状态。
    </p>
    <search>
      <form action="/" method="get" aria-label="搜索资料" @submit.prevent="submitSearch">
        <label for="q">搜索资料标题</label
        ><input
          id="q"
          v-model="draftQuery"
          name="q"
          type="search"
          maxlength="60"
        /><button type="submit">搜索</button>
      </form>
    </search>
    <p v-if="status === 'pending'" role="status">正在加载资料…</p>
    <div v-else-if="error" role="alert">
      <p>资料读取失败，可恢复正常场景。</p>
      <button type="button" @click="recover">恢复正常并重试</button>
    </div>
    <template v-else
      ><p v-if="shown.length === 0" role="status">没有匹配的资料。</p>
      <button type="button" @click="reversed = !reversed">反转列表顺序</button>
      <ul class="cards">
        <li v-for="resource in shown" :key="resource.id">
          <ResourceCard
            :resource="resource"
            :selected="ids.includes(resource.id)"
            @toggle="toggle"
            ><template #title
              ><NuxtLink :to="`/resources/${resource.id}`">{{
                resource.title
              }}</NuxtLink></template
            >
            <p class="tag">{{ resource.category }}</p></ResourceCard
          >
        </li>
      </ul>
    </template>
    <p>
      <NuxtLink to="/?fail=1">触发教学请求失败</NuxtLink> ·
      <NuxtLink to="/resources/unknown">查看资源404</NuxtLink>
    </p>
  </section>
</template>
