<script setup lang="ts">
import type { Product } from '../../../shared/catalog'
definePageMeta({ key: (route) => route.fullPath })
const route = useRoute()
const { data, error } = await useFetch<{ items: Product[] }>('/api/catalog', {
  query: { broken: route.query.broken === '1' ? '1' : '0' },
})
if (error.value)
  throw createError({
    statusCode: error.value.statusCode ?? 502,
    statusMessage: 'Catalog unavailable',
  })
const product = computed(() => data.value?.items.find((x) => x.id === route.params.id))
if (!product.value)
  throw createError({ statusCode: 404, statusMessage: 'Product not found' })
useHead({ title: () => product.value?.title ?? '商品详情' })
</script>
<template>
  <main id="main-content" tabindex="-1">
    <h1 tabindex="-1">{{ product?.title }}</h1>
    <p>商品编号：{{ product?.id }}</p>
    <p>只读迁移切片，不提供下单或支付。</p>
    <NuxtLink to="/catalog">返回目录</NuxtLink>
  </main>
</template>
