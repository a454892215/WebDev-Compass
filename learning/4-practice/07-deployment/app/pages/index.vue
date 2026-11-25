<script setup lang="ts">
import { courses } from '~~/shared/catalog'
const { data } = await useAsyncData('public-courses', () => Promise.resolve(courses))
const config = useRuntimeConfig()
useSeoMeta({ title: 'Web 发布课程', description: '同一源码的SSR、SSG和CSR发布演练' })
const count = ref(0)
</script>
<template>
  <SiteFrame
    ><h1>Web 发布课程</h1>
    <p>{{ config.public.siteLabel }}</p>
    <ul>
      <li v-for="course in data" :key="course.slug">
        <NuxtLink :to="`/courses/${course.slug}`">{{ course.title }}</NuxtLink>
        <p>{{ course.summary }}</p>
      </li>
    </ul>
    <button type="button" @click="count++">交互计数 {{ count }}</button>
    <p role="status">当前构建 profile：{{ config.public.renderProfile }}</p></SiteFrame
  >
</template>
