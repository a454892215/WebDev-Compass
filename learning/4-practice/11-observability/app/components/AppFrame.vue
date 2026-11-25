<template>
  <div class="shell">
    <a class="skip" href="#content">跳到正文</a>
    <header>
      <NuxtLink to="/">可观测工作台</NuxtLink>
      <nav aria-label="主导航"><NuxtLink to="/boundaries">能力与限制</NuxtLink></nav>
    </header>
    <main id="content" tabindex="-1"><slot /></main>
    <footer>
      仅本地合成数据；诊断最多50项/5分钟访问时清理。身份与权限不由fixture或开关决定。
    </footer>
  </div>
</template>
