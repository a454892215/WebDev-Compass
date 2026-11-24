<script setup lang="ts">
import type { Item } from "../stores/reading";
const props = defineProps<{ item: Item }>();
const emit = defineEmits<{ toggle: [id: string] }>();
const draft = defineModel<string>("draft", { required: true });
</script>
<template>
  <article>
    <h3>{{ props.item.title }}</h3>
    <p><slot name="meta" :id="props.item.id">没有补充信息</slot></p>
    <label :for="`draft-${props.item.id}`">草稿 {{ props.item.id }}</label>
    <input :id="`draft-${props.item.id}`" v-model="draft" />
    <button
      type="button"
      :aria-pressed="props.item.done"
      @click="emit('toggle', props.item.id)"
    >
      切换完成 {{ props.item.id }}
    </button>
  </article>
</template>

<style scoped>
article {
  border-inline-start-width: 0.3rem;
}
</style>
