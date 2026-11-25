<script setup lang="ts">
useSeoMeta({ title: '测量边界' })
</script>
<template>
  <AppFrame
    ><h1>测量边界</h1>
    <p>
      服务端duration只覆盖合成源调用；TTFB还包含连接、网络、代理和SSR等；FCP描述浏览器第一次内容绘制，三者不能互换。
    </p>
    <p>
      同一源码先去除不必要串行，再验证payload无初始重复请求与延迟水合可操作性。只记录本地实验，不承诺生产p75、每次并行都更快或一定减少JS下载。
    </p>
    <NuxtLink to="/">返回实验</NuxtLink></AppFrame
  >
</template>
