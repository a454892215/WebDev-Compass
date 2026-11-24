<script setup lang="ts">
import { nextTick, ref, useTemplateRef } from "vue";
const shown = ref(false);
const field = useTemplateRef<HTMLInputElement>("field");
async function showAndFocus() {
  shown.value = true;
  await nextTick();
  field.value?.focus();
}
</script>
<template>
  <button type="button" @click="showAndFocus">显示并聚焦输入</button>
  <label v-if="shown">聚焦目标<input ref="field" name="focus-target" /></label>
</template>
