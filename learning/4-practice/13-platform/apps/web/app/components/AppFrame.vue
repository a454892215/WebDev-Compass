<template>
  <div class="shell">
    <a class="skip" href="#content">跳到正文</a>
    <header>
      <NuxtLink to="/">多包协作工作台</NuxtLink>
      <nav aria-label="主导航"><NuxtLink to="/boundaries">能力与限制</NuxtLink></nav>
    </header>
    <main id="content" tabindex="-1"><slot /></main>
    <footer>仅本地合成计划，无真实身份、远程缓存或生产发布。</footer>
  </div>
</template>
