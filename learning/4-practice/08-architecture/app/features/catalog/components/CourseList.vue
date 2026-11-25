<script setup lang="ts">
import type { Course, Scope } from '~~/shared/contracts/workspace'
defineProps<{ items: Course[]; scope: Scope; favorites: Record<string, boolean> }>()
defineEmits<{ toggle: [slug: string] }>()
</script>
<template>
  <ul v-if="items.length">
    <li v-for="course in items" :key="course.slug">
      <NuxtLink :to="{ path: `/courses/${course.slug}`, query: { scope } }">{{
        course.title
      }}</NuxtLink>
      <p>{{ course.minutes }} 分钟</p>
      <button
        type="button"
        :aria-pressed="Boolean(favorites[`${scope}:${course.slug}`])"
        @click="$emit('toggle', course.slug)"
      >
        收藏 {{ course.title }}
      </button>
    </li>
  </ul>
  <p v-else role="status">没有匹配课程，请修改搜索。</p>
</template>
