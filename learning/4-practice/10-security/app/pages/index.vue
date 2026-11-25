<script setup lang="ts">
interface Workspace {
  active: boolean
  csrf: string | null
  notes: { id: string; text: string }[]
}
const requestFetch = useRequestFetch()
const { data, error, refresh } = await useAsyncData('stage10:workspace', () =>
  requestFetch<Workspace>('/api/workspace'),
)
const draft = ref(''),
  message = ref(''),
  busy = ref(false)
async function action(task: () => Promise<void>) {
  if (busy.value) return
  busy.value = true
  message.value = ''
  try {
    await task()
    await refresh()
  } catch {
    message.value = '操作失败，请核对会话或重新尝试。'
  } finally {
    busy.value = false
  }
}
async function start() {
  await action(async () => {
    await $fetch('/api/session', { method: 'POST' })
    draft.value = ''
  })
}
async function save() {
  await action(async () => {
    await $fetch('/api/notes', {
      method: 'POST',
      headers: { 'x-csrf-token': data.value?.csrf || '' },
      body: { text: draft.value },
    })
    draft.value = ''
    message.value = '笔记已保存到本地教学内存。'
  })
}
async function logout() {
  await action(async () => {
    await $fetch('/api/session', {
      method: 'DELETE',
      headers: { 'x-csrf-token': data.value?.csrf || '' },
    })
    draft.value = ''
    clearNuxtData('stage10:workspace')
  })
}
async function remove(id: string) {
  await action(async () => {
    await $fetch(`/api/notes/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: { 'x-csrf-token': data.value?.csrf || '' },
    })
  })
}
useSeoMeta({ title: '安全笔记实验', robots: 'noindex,nofollow' })
</script>
<template>
  <AppFrame
    ><h1>安全笔记实验</h1>
    <p>创建匿名随机会话后，只能访问该会话的笔记。这不是生产登录；请只输入合成内容。</p>
    <p v-if="error" role="alert">页面读取失败。</p>
    <button v-if="!data?.active" type="button" :disabled="busy" @click="start">
      创建匿名会话</button
    ><template v-else
      ><p id="active">匿名会话已建立</p>
      <button type="button" :disabled="busy" @click="logout">退出并删除本会话笔记</button>
      <form @submit.prevent="save">
        <label for="note">合成笔记内容</label>
        <p id="note-hint">最多500字符，作为纯文本展示；不要输入真实个人信息。</p>
        <textarea
          id="note"
          v-model="draft"
          required
          maxlength="500"
          aria-describedby="note-hint"
        /><button type="submit" :disabled="busy">保存笔记</button>
      </form>
      <ul>
        <li v-for="note in data.notes" :key="note.id">
          <p class="note-text">{{ note.text }}</p>
          <button type="button" :disabled="busy" @click="remove(note.id)">
            删除笔记
          </button>
        </li>
      </ul>
      <p v-if="!data.notes.length">当前没有笔记。</p></template
    >
    <p role="status">{{ message }}</p></AppFrame
  >
</template>
