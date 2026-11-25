<script setup lang="ts">
import { modes, type Dashboard, type Mode } from '../shared/contracts'
const selected = ref<'alice' | 'bob'>('alice')
const mode = ref<Mode>('ok')
const busy = ref(false)
const requestFetch = useRequestFetch()
const { data, error, status, refresh } = await useAsyncData('fixture-dashboard', () =>
  requestFetch<Dashboard>('/api/dashboard', { query: { mode: mode.value } }),
)
const actionError = ref('')
async function choose() {
  busy.value = true
  actionError.value = ''
  try {
    await $fetch('/api/session', { method: 'POST', body: { user: selected.value } })
    await refresh()
  } catch {
    actionError.value = '身份选择失败，请检查本地同源服务'
  } finally {
    busy.value = false
  }
}
</script>
<template>
  <main>
    <h1>Nuxt BFF：合成用户聚合实验</h1>
    <p>只有两个公开演示身份；本地内存会话不用于生产认证。</p>
    <form @submit.prevent="choose">
      <label for="user">下次选择的演示用户</label
      ><select id="user" v-model="selected">
        <option value="alice">Alice</option>
        <option value="bob">Bob</option>
      </select>
      <button :disabled="busy">选择身份并加载</button>
    </form>
    <label for="mode">上游情景</label
    ><select id="mode" v-model="mode">
      <option v-for="item in modes" :key="item" :value="item">{{ item }}</option>
    </select>
    <button :disabled="status === 'pending'" @click="refresh()">重新获取</button>
    <p role="status">{{ status === 'pending' ? '正在获取数据' : '请求已结束' }}</p>
    <p v-if="actionError" role="alert">{{ actionError }}</p>
    <section :aria-busy="status === 'pending'" aria-label="聚合结果">
      <p v-if="error" role="alert">
        请求失败：{{ error.statusCode }}。请先选择身份，或更换情景后重试。
      </p>
      <template v-else-if="data">
        <h2>{{ data.user.name }}</h2>
        <p>用户编号：{{ data.user.id }}</p>
        <p v-for="warning in data.warnings" :key="warning" role="status">{{ warning }}</p>
        <ul v-if="data.items.length">
          <li v-for="item in data.items" :key="item.id">{{ item.title }}</li>
        </ul>
        <p v-else>当前没有推荐内容</p>
        <p class="trace">追踪编号：{{ data.traceId }}</p>
      </template>
    </section>
    <a href="/api/openapi">查看聚合接口的 OpenAPI 文档</a>
  </main>
</template>
