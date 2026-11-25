<script setup lang="ts">
import type { NuxtError } from '#app'
defineProps<{ error: NuxtError }>()
useSeoMeta({ title: '页面不可用', robots: 'noindex' })
</script>
<template>
  <main class="shell">
    <h1>页面不可用（{{ error.statusCode }}）</h1>
    <a href="/">返回首页</a>
  </main>
</template>
