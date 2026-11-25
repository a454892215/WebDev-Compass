<script setup lang="ts">
useSeoMeta({ title: '能力与限制', robots: 'noindex' })
</script>
<template>
  <section>
    <h1>能力与限制</h1>
    <p>
      本例是小型Vue组件库与Nuxt真实产物消费，不是已发布npm包。只有合成A/B/访客fixture，Cookie不验证身份；profile按每个请求选择，reads仅公开教学计数，生产应移除。
    </p>
    <p>
      草稿与校验只在客户端页面内存，无后端写入、账号或真实用户数据。SSR输出有效初始内容后由payload接管，测试浏览器无重复profile请求并核服务器计数。
    </p>
    <p>
      本轮仅后台Chrome桌面/手机模拟视口；axe与键盘不是屏幕阅读器或所有浏览器验证。Storybook源码故事不替代包dist/类型/CSS消费验证。
    </p>
  </section>
</template>
