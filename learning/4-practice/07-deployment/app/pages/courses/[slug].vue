<script setup lang="ts">
import { findCourse } from '~~/shared/catalog'
const route = useRoute()
const course = computed(() => findCourse(String(route.params.slug)))
if (!course.value)
  throw createError({ statusCode: 404, statusMessage: 'Course not found' })
watch(course, (value) => {
  if (!value)
    showError(createError({ statusCode: 404, statusMessage: 'Course not found' }))
})
useSeoMeta({
  title: () => course.value?.title || '课程不存在',
  description: () => course.value?.summary || '找不到课程',
})
</script>
<template>
  <SiteFrame
    ><template v-if="course"
      ><h1>{{ course.title }}</h1>
      <p>{{ course.summary }}</p>
      <NuxtLink to="/">返回课程</NuxtLink></template
    ></SiteFrame
  >
</template>
