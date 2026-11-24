<script setup lang="ts">
import type { NuxtError } from '#app'
defineProps<{ error: NuxtError }>()
const recover = () => clearError({ redirect: '/' })
useHead({ title: '访问失败 | 学习资料库' })
</script>
<template>
  <main class="shell">
    <h1>访问失败</h1>
    <p>状态码：{{ error.statusCode }}</p>
    <p>可返回资料列表继续学习。</p>
    <button type="button" @click="recover">返回资料列表</button>
  </main>
</template>
