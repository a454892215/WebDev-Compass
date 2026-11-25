<script setup lang="ts">
import type { NuxtError } from '#app'
defineProps<{ error: NuxtError }>()
</script>
<template>
  <main class="shell">
    <h1>访问失败</h1>
    <p>状态码 {{ error.statusCode }}</p>
    <button type="button" @click="clearError({ redirect: '/' })">返回实验</button>
  </main>
</template>
