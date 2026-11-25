<script setup lang="ts">
import type { NuxtError } from '#app'
defineProps<{ error: NuxtError }>()
</script>
<template>
  <main id="main-content" tabindex="-1">
    <h1 tabindex="-1">页面暂不可用</h1>
    <p>状态：{{ error.statusCode }}</p>
    <button @click="clearError({ redirect: '/' })">返回迁移入口</button>
  </main>
</template>
