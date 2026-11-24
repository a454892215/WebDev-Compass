<script setup lang="ts">
import { ref } from 'vue'
import type { Resource } from '../../shared/utils/resources'
defineProps<{ resource: Resource; selected: boolean }>()
const emit = defineEmits<{ toggle: [id: string] }>()
const draft = ref('')
</script>
<template>
  <article class="card" :data-resource="resource.id">
    <h2>
      <slot name="title">{{ resource.title }}</slot>
    </h2>
    <p>{{ resource.summary }}</p>
    <slot />
    <button type="button" :aria-pressed="selected" @click="emit('toggle', resource.id)">
      {{ selected ? '移出书单' : '加入书单' }}：{{ resource.title }}
    </button>
    <label :for="`note-${resource.id}`">本卡临时笔记：{{ resource.title }}</label>
    <input
      :id="`note-${resource.id}`"
      v-model="draft"
      maxlength="80"
      placeholder="不持久化，用于观察key"
    />
  </article>
</template>
