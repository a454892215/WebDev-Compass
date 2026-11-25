<script setup lang="ts">
const mismatch = ref(false)
const { data, error, status } = await useFetch<{
  match: boolean
  differences: { id: string; reason: string }[]
}>('/api/shadow', { query: computed(() => ({ mismatch: mismatch.value ? '1' : '0' })) })
useHead({ title: '只读比较与CSS共存' })
</script>
<template>
  <main id="main-content" tabindex="-1">
    <h1 tabindex="-1">只读双源比较与 CSS 共存</h1>
    <label><input v-model="mismatch" type="checkbox" /> 注入新版价格差异</label>
    <p role="status">
      {{ status === 'pending' ? '正在比较' : data?.match ? '比较一致' : '存在差异' }}
    </p>
    <p v-if="error" role="alert">比较失败</p>
    <ul v-if="data?.differences.length">
      <li v-for="d in data.differences" :key="d.id">{{ d.id }}：{{ d.reason }}</li>
    </ul>
    <p>比较只读取两份合成fixture；未双写、未运行生产影子流量。</p>
    <div class="coexist">
      <section class="legacy-zone" aria-label="旧样式范围">
        <h2>旧样式范围</h2>
        <button class="legacy-button">旧样式按钮</button>
      </section>
      <section class="modern-zone" aria-label="新样式范围">
        <h2>新样式范围</h2>
        <button class="modern-button">新样式按钮</button>
      </section>
    </div>
    <NuxtLink to="/catalog">继续新版目录</NuxtLink>
  </main>
</template>
<style scoped>
.legacy-zone .legacy-button {
  background: #754400;
  color: #fff;
}
.modern-zone .modern-button {
  background: #005da8;
  color: #fff;
}
.coexist {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
  gap: 1rem;
}
</style>
