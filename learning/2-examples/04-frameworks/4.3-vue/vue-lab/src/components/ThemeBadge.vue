<script setup lang="ts">
import { inject } from "vue";
import { themeKey } from "../context";
const theme = inject(themeKey);
if (!theme) throw new Error("ThemeBadge需要主题提供者");
</script>
<template>
  <button type="button" @click="theme.toggle()">
    注入主题：{{ theme.value.value }}
  </button>
</template>
