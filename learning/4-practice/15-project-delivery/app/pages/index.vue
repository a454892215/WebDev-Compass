<script setup lang="ts">
useHead({ title: '旧目录到Vue的迁移实验' })
</script>
<template>
  <main id="main-content" tabindex="-1">
    <h1 tabindex="-1">旧目录到 Vue 3 / Nuxt 的渐进迁移</h1>
    <p>
      同一个只读商品切片，两套独立数据形状，通过固定入口分流、对照和回退。所有数据均为公开合成fixture。
    </p>
    <ul>
      <li><a href="/entry?bucket=99">旧版分组：完整 MPA</a></li>
      <li><a href="/entry?bucket=0">新版分组：Nuxt 目录</a></li>
      <li><a href="/entry?bucket=0&amp;rollback=1">回退演示：转回旧版</a></li>
    </ul>
    <p>
      bucket/rollback只是本次请求的公开实验输入，不是生产权限或全局发布控制面。生产稳定分组和开关持久化需单独接入。
    </p>
    <p><NuxtLink to="/comparison">查看只读双源比较与 CSS 共存</NuxtLink></p>
    <p><NuxtLink to="/catalog?broken=1">观察新接口失败与人工回退</NuxtLink></p>
  </main>
</template>
