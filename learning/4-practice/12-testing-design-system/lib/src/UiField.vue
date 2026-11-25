<script setup lang="ts">
import { computed } from 'vue'
defineOptions({ inheritAttrs: false })
const props = withDefaults(
  defineProps<{
    id: string
    label: string
    modelValue: string
    error?: string
    hint?: string
  }>(),
  { error: '', hint: '' },
)
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const described = computed(
  () =>
    [props.hint ? props.id + '-hint' : '', props.error ? props.id + '-error' : '']
      .filter(Boolean)
      .join(' ') || undefined,
)
</script>
<template>
  <div class="c-field">
    <label :for="id">{{ label }}</label>
    <p v-if="hint" :id="id + '-hint'">{{ hint }}</p>
    <input
      v-bind="$attrs"
      :id="id"
      :value="modelValue"
      :aria-invalid="error ? true : undefined"
      :aria-describedby="described"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p v-if="error" :id="id + '-error'" class="c-error" aria-live="polite">{{ error }}</p>
  </div>
</template>
