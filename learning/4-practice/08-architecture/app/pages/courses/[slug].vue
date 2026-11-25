<script setup lang="ts">
import { useWorkspace } from '~/features/catalog'
const route = useRoute()
const { data, error, scope } = await useWorkspace()
const course = computed(() =>
  data.value?.courses.find((x) => x.slug === route.params.slug),
)
if (error.value)
  throw createError({ statusCode: 502, statusMessage: 'Workspace unavailable' })
if (!course.value)
  throw createError({ statusCode: 404, statusMessage: 'Course not found' })
watch(course, (value) => {
  if (!value)
    showError(createError({ statusCode: 404, statusMessage: 'Course not found' }))
})
useSeoMeta({ title: () => course.value?.title || '课程不存在' })
</script>
<template>
  <AppFrame
    ><template v-if="course"
      ><h1>{{ course.title }}</h1>
      <p>{{ course.minutes }} 分钟；样例 {{ scope }}</p>
      <NuxtLink :to="{ path: '/', query: { scope } }">返回目录</NuxtLink></template
    ></AppFrame
  >
</template>
