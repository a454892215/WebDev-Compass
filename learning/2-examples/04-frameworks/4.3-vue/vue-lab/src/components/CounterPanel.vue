<script setup lang="ts">
import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from "vue";
defineOptions({ name: "CounterPanel" });
const count = ref(0);
const emit = defineEmits<{ lifecycle: [name: string] }>();
onMounted(() => emit("lifecycle", "mounted"));
onActivated(() => emit("lifecycle", "activated"));
onDeactivated(() => emit("lifecycle", "deactivated"));
onUnmounted(() => emit("lifecycle", "unmounted"));
</script>
<template>
  <button type="button" @click="count++">缓存计数 {{ count }}</button>
</template>
