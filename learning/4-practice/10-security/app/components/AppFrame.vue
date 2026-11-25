<template>
  <div class="shell">
    <a class="skip" href="#content">跳到正文</a>
    <header>
      <NuxtLink to="/">安全笔记实验</NuxtLink>
      <nav aria-label="主导航"><NuxtLink to="/boundaries">能力与限制</NuxtLink></nav>
    </header>
    <main id="content" tabindex="-1"><slot /></main>
    <footer>
      仅本地匿名合成会话，无真实身份/密码；笔记内存保存，退出时删除；过期数据在后续存储访问时清理。
    </footer>
  </div>
</template>
