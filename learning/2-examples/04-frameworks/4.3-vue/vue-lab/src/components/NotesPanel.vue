<script setup lang="ts">
import { ref } from "vue";
defineOptions({ name: "NotesPanel" });
const text = ref("");
</script>
<template>
  <label>缓存笔记<textarea v-model="text" /></label>
</template>
