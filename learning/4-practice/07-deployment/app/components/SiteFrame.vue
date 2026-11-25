<script setup lang="ts">
const config = useRuntimeConfig()
</script>
<template>
  <div class="shell">
    <a class="skip" href="#content">跳到正文</a>
    <header>
      <NuxtLink to="/">发布实验</NuxtLink>
      <nav aria-label="主导航">
        <NuxtLink to="/status">版本与部署说明</NuxtLink
        ><NuxtLink v-if="config.public.hasServer" to="/account">合成身份演示</NuxtLink>
      </nav>
    </header>
    <main id="content" tabindex="-1"><slot /></main>
    <footer>仅本地教学实验。发布前仍需按业务核对托管与数据安全。</footer>
  </div>
</template>
