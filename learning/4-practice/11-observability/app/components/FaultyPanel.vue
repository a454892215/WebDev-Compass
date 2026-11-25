<script setup lang="ts">
const props = defineProps<{ broken: boolean }>()
const label = computed(() => {
  if (props.broken) throw new Error('Synthetic module failure')
  return '模块运行正常'
})
</script>
<template>
  <p>{{ label }}</p>
</template>
