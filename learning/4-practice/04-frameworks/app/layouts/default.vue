<script setup lang="ts">
const config = useRuntimeConfig()
</script>
<template>
  <div class="shell">
    <a class="skip" href="#content">跳到主要内容</a>
    <header>
      <p class="brand">{{ config.public.courseLabel }}</p>
      <nav aria-label="主要导航">
        <NuxtLink to="/">资料列表</NuxtLink><NuxtLink to="/about">关于课程</NuxtLink
        ><NuxtLink to="/client-demo">CSR 对照</NuxtLink>
      </nav>
    </header>
    <main id="content" tabindex="-1"><slot /></main>
    <footer>
      <LearningBadge />
      <p>本地教学数据，不保存到业务后端。</p>
    </footer>
  </div>
</template>
