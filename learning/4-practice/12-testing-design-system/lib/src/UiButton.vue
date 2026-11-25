<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary'
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
  }>(),
  { variant: 'primary', disabled: false, type: 'button' },
)
</script>
<template>
  <button
    :type="type"
    :disabled="disabled"
    class="c-button"
    :class="'c-button--' + variant"
  >
    <slot />
  </button>
</template>
