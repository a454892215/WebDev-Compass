<script setup lang="ts">
const count = ref(0)
onMounted(() => {
  performance.clearMarks('stage9:optional-mounted')
  performance.mark('stage9:optional-mounted')
})
onBeforeUnmount(() => performance.clearMarks('stage9:optional-mounted'))
</script>
<template>
  <section aria-labelledby="optional-title">
    <h2 id="optional-title">按需交互面板</h2>
    <p>这段内容已经在SSR HTML中，组件交互按需水合。</p>
    <button type="button" @click="count++">可选计数 {{ count }}</button>
  </section>
</template>
