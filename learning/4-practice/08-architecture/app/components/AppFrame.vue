<template>
  <div class="shell">
    <a class="skip" href="#content">跳到正文</a>
    <header>
      <NuxtLink to="/">架构实践</NuxtLink>
      <nav aria-label="主导航"><NuxtLink to="/decisions">架构选择</NuxtLink></nav>
    </header>
    <main id="content" tabindex="-1"><slot /></main>
    <footer>所有scope都是公开合成样例，不是登录或权限凭据。</footer>
  </div>
</template>
