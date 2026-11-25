<script setup lang="ts">
import type { NuxtError } from '#app'
defineProps<{ error: NuxtError }>()
useSeoMeta({ title: '全局错误兜底', robots: 'noindex' })
</script>
<template>
  <main class="shell">
    <h1>全局错误兜底（{{ error.statusCode }}）</h1>
    <p>演示故障已停止；不展示原始错误和堆栈。</p>
    <button @click="clearError({ redirect: '/' })">清除全局错误并返回</button>
    <p><a href="/">重新加载首页</a></p>
  </main>
</template>
