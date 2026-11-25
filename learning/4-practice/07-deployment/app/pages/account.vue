<script setup lang="ts">
const config = useRuntimeConfig()
if (!config.public.hasServer)
  throw createError({ statusCode: 404, statusMessage: 'SSR only' })
const requestFetch = useRequestFetch()
const { data, error } = await useAsyncData('private-account', () =>
  requestFetch<{ name: string; notice: string }>('/api/private'),
)
useSeoMeta({ title: '合成身份演示', robots: 'noindex, nofollow' })
</script>
<template>
  <SiteFrame
    ><h1>合成身份演示</h1>
    <p>
      stage7-demo Cookie仅选择公开的alice/bob
      fixture，不是登录、凭据或安全认证，不能用于真实用户。
    </p>
    <p v-if="error" role="status">未选择演示身份（401），不会显示其他人的资料。</p>
    <section v-else-if="data">
      <h2>{{ data.name }}</h2>
      <p>{{ data.notice }}</p>
    </section></SiteFrame
  >
</template>
