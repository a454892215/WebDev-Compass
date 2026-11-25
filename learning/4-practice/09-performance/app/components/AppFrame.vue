<template>
  <div class="shell">
    <a class="skip" href="#content">跳到正文</a>
    <header>
      <NuxtLink to="/">性能实践</NuxtLink>
      <nav aria-label="主导航">
        <NuxtLink to="/guide">测量边界</NuxtLink
        ><a href="/stream-demo">HTTP流式响应演示</a>
      </nav>
    </header>
    <main id="content" tabindex="-1"><slot /></main>
    <footer>本地实验不代表真实用户p75或生产性能保证。</footer>
  </div>
</template>
