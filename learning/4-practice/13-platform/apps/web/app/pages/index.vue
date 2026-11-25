<script setup lang="ts">
import { formatCount } from '@compass/platform-core'
useSeoMeta({ title: '多包协作工作台', robots: 'noindex' })
const requestFetch = useRequestFetch()
const { data: catalog } = await useAsyncData('stage13:catalog', () =>
  requestFetch('/api/catalog'),
)
const enhanced = ref(false)
onMounted(() => {
  enhanced.value = typeof Element.prototype.scrollIntoView === 'function'
})
function jump() {
  const target = document.getElementById('support')
  if (!target || typeof target.scrollIntoView !== 'function') return
  target.scrollIntoView({ behavior: 'auto' })
  target.focus()
}
</script>
<template>
  <section>
    <h1>多包协作工作台</h1>
    <p id="count">{{ formatCount(catalog?.items.length || 0) }}</p>
    <ul>
      <li v-for="item in catalog?.items" :key="item.id">{{ item.label }}</li>
    </ul>
    <a href="#support" @click="jump">查看支持范围</a>
    <p id="mode">{{ enhanced ? '原生滚动增强可用' : '基础锚点模式可用' }}</p>
    <h2 id="support" tabindex="-1">支持范围</h2>
    <details open>
      <summary>平台与工具边界</summary>
      <p>
        Nuxt主应用与Vite预览通过公开包入口消费同一core产物；基础内容和details不依赖客户端JavaScript。
      </p>
    </details>
  </section>
</template>
