<template>
  <div class="shell">
    <a class="skip" href="#content">跳到正文</a>
    <header>
      <NuxtLink to="/">Vue组件验收工作台</NuxtLink>
      <nav aria-label="主导航"><NuxtLink to="/boundaries">能力与限制</NuxtLink></nav>
    </header>
    <main id="content" tabindex="-1"><slot /></main>
    <footer>仅合成fixture；草稿只在当前页面内存，不是身份或持久保存服务。</footer>
  </div>
</template>
