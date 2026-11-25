<script setup lang="ts">
import type { NuxtError } from '#app'
defineProps<{ error: NuxtError }>()
useHead({ title: 'Not found | WebDev Compass' })
useSeoMeta({ robots: 'noindex,follow' })
</script>
<template>
  <main class="shell">
    <h1>页面不可用 / Page unavailable</h1>
    <p>HTTP {{ error.statusCode }}</p>
    <button type="button" @click="clearError({ redirect: '/zh-CN' })">
      返回目录 / Return
    </button>
  </main>
</template>
