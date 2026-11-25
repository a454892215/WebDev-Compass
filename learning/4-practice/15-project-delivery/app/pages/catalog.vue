<script setup lang="ts">
import type { Product } from '../../shared/catalog'
const route = useRoute()
const router = useRouter()
const search = ref(typeof route.query.q === 'string' ? route.query.q : '')
watch(
  () => route.query.q,
  (value) => {
    search.value = typeof value === 'string' ? value : ''
  },
)
const query = computed(() => ({
  q: typeof route.query.q === 'string' ? route.query.q : '',
  broken: route.query.broken === '1' ? '1' : '0',
}))
const { data, error, status, refresh } = await useFetch<{
  items: Product[]
  source: string
}>('/api/catalog', { query })
const legacyHref = computed(
  () => '/legacy/catalog?' + new URLSearchParams({ q: query.value.q }).toString(),
)
useHead({ title: '新版商品目录' })
async function submit() {
  await router.push({ path: '/catalog', query: { q: search.value } })
}
</script>
<template>
  <main id="main-content" tabindex="-1">
    <h1 tabindex="-1">新版商品目录</h1>
    <form @submit.prevent="submit">
      <label for="search">搜索商品</label
      ><input id="search" v-model="search" maxlength="40" /><button>搜索</button>
    </form>
    <p role="status">
      {{ status === 'pending' ? '正在读取' : `结果 ${data?.items.length ?? 0} 项` }}
    </p>
    <section aria-label="商品结果" :aria-busy="status === 'pending'">
      <template v-if="error"
        ><p role="alert">新版目录读取失败：{{ error.statusCode }}。可重试或回旧版。</p>
        <button @click="refresh()">重试请求</button></template
      >
      <ul v-else-if="data?.items.length">
        <li v-for="product in data.items" :key="product.id" class="product-card">
          <NuxtLink :to="'/product/' + product.id">{{ product.title }}</NuxtLink><span>{{
            new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(
              product.cents / 100,
            )
          }}</span>
        </li>
      </ul>
      <p v-else>没有匹配商品，请更换搜索词。</p>
    </section>
    <a :href="legacyHref">回到旧版并保留搜索</a>
  </main>
</template>
