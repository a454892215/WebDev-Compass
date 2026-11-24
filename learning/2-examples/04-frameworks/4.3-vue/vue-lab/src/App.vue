<script setup lang="ts">
import { provide, readonly, ref } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { themeKey } from "./context";
const theme = ref<"light" | "dark">("light");
provide(themeKey, {
  value: readonly(theme),
  toggle: () => {
    theme.value = theme.value === "light" ? "dark" : "light";
  },
});
</script>
<template>
  <div :data-theme="theme">
    <header>
      <h1>Vue机制实验室</h1>
      <nav aria-label="实验导航">
        <RouterLink to="/">组件实验</RouterLink>
        <RouterLink to="/items/1">详情1</RouterLink>
        <RouterLink to="/items/2">详情2</RouterLink>
        <RouterLink to="/restricted">受限演示</RouterLink>
      </nav>
    </header>
    <main><RouterView /></main>
    <footer>本地教学数据，无登录和真实业务后端。</footer>
  </div>
</template>
