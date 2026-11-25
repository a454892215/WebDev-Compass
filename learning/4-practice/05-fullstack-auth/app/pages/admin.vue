<script setup lang="ts">
definePageMeta({ middleware: 'admin' })
const { data, error } = await useFetch('/api/admin', { key: 'stage5-admin' })
useHead({ title: '管理员演示 | 接口与会话实验' })
</script>
<template>
  <main class="shell">
    <h1>管理员演示</h1>
    <p v-if="error" role="alert">服务端拒绝访问。</p>
    <p v-else>{{ data?.message }}</p>
    <NuxtLink to="/">返回笔记</NuxtLink>
  </main>
</template>
