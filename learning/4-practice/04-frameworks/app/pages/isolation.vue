<script setup lang="ts">
const route = useRoute()
const seed = typeof route.query.seed === 'string' ? route.query.seed.slice(0, 40) : 'none'
const marker = useState('request-marker', () => seed)
useHead({ title: '请求隔离实验 | 学习资料库' })
</script>
<template>
  <section>
    <h1>请求隔离实验</h1>
    <p data-testid="request-marker">{{ marker }}</p>
    <p>
      seed是公开教学标签，不是用户身份或认证；新SSR请求应各自初始化，客户端导航同key仍复用本应用状态。
    </p>
  </section>
</template>
