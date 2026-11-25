<script setup lang="ts">
import type { NotePage } from '../../shared/utils/contracts'
import { decodePage, validateTitle } from '../../shared/utils/contracts'
const empty = (): NotePage => ({ items: [], page: 1, pageSize: 2, total: 0 })
let epoch = 0
const { data: session } = await useLabSession()
const route = useRoute()
const q = computed(() => (typeof route.query.q === 'string' ? route.query.q : ''))
const page = computed(() =>
  typeof route.query.page === 'string' ? route.query.page : '1',
)
const malformed = computed(() => route.query.invalid === '1')
const identity = computed(() => session.value.user?.id ?? 'anonymous')
const requestFetch = useRequestFetch()
const {
  data: notes,
  status,
  error,
  refresh,
  clear,
} = await useAsyncData(
  'stage5-notes',
  async (_app, { signal }) => {
    const account = identity.value
    const generation = epoch
    const token = session.value.csrfToken
    const valid = () =>
      generation === epoch &&
      token === session.value.csrfToken &&
      account === identity.value
    if (account === 'anonymous') return empty()
    try {
      const value = await requestFetch<unknown>(
        malformed.value ? '/api/lab/bad-page' : '/api/notes',
        { query: { q: q.value, page: page.value, pageSize: 2 }, signal, retry: 0 },
      )
      if (!valid()) return empty()
      return decodePage(value)
    } catch (error) {
      if (!valid()) return empty()
      throw error
    }
  },
  { watch: [identity, q, page, malformed], default: empty, deep: false },
)
const busy = ref(false)
const message = ref('')
const selectedUser = ref('alice')
const draftQuery = ref(q.value)
const newTitle = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
let submission: { title: string; key: string } | undefined
watch(q, (value) => {
  draftQuery.value = value
})
function forget() {
  clear()
  clearNuxtData(['stage5-notes', 'stage5-admin'])
  session.value = anonymousSession()
  submission = undefined
}
async function bootstrap() {
  const own = epoch
  try {
    const value = await $fetch('/api/session/bootstrap', {
      method: 'POST',
      body: {},
      retry: 0,
    })
    if (own === epoch) session.value = value
  } catch {
    if (own === epoch) message.value = '会话初始化失败，可重试初始化。'
  }
}
onMounted(() => {
  if (!session.value.csrfToken) void bootstrap()
})
onBeforeUnmount(() => {
  epoch++
  clear()
})
watch(error, (value) => {
  if (value?.statusCode === 401) {
    epoch++
    forget()
    message.value = '会话已失效，请重新选择演示账号。'
    void bootstrap()
  }
})
async function login() {
  if (!session.value.csrfToken) return
  const token = session.value.csrfToken
  const own = ++epoch
  busy.value = true
  clear()
  try {
    const value = await $fetch('/api/login', {
      method: 'POST',
      body: { demoUser: selectedUser.value },
      headers: { 'X-CSRF-Token': token },
      retry: 0,
    })
    if (own === epoch) {
      session.value = value
      message.value = '已登录演示账号，服务端已轮换会话。'
    }
  } catch {
    if (own === epoch) {
      forget()
      message.value = '登录失败，请重新初始化后重试。'
      await bootstrap()
    }
  } finally {
    if (own === epoch) busy.value = false
  }
}
async function logout() {
  const token = session.value.csrfToken ?? ''
  const own = ++epoch
  busy.value = true
  forget()
  try {
    await $fetch('/api/logout', {
      method: 'POST',
      body: {},
      headers: { 'X-CSRF-Token': token },
      retry: 0,
    })
    if (own === epoch) {
      message.value = '服务端已撤销会话并退出。'
      await bootstrap()
    }
  } catch {
    if (own === epoch)
      message.value = '退出请求未确认，服务端会话可能仍有效；请刷新检查或重试。'
  } finally {
    if (own === epoch) busy.value = false
  }
}
async function expire() {
  if (!session.value.csrfToken) return
  busy.value = true
  try {
    await $fetch('/api/lab/expire', {
      method: 'POST',
      body: {},
      headers: { 'X-CSRF-Token': session.value.csrfToken },
      retry: 0,
    })
    await refresh()
  } catch {
    message.value = '过期演示请求失败。'
  } finally {
    busy.value = false
  }
}
async function submitSearch() {
  await navigateTo({
    path: '/',
    query: draftQuery.value.trim() ? { q: draftQuery.value.trim() } : {},
  })
}
async function createNote() {
  const own = epoch
  busy.value = true
  try {
    const title = validateTitle(newTitle.value)
    if (!submission || submission.title !== title)
      submission = { title, key: crypto.randomUUID() }
    const result = await $fetch('/api/notes', {
      method: 'POST',
      headers: {
        'X-CSRF-Token': session.value.csrfToken ?? '',
        'Idempotency-Key': submission.key,
      },
      body: { title },
      retry: 0,
    })
    if (own === epoch) {
      message.value = `已创建：${result.title}`
      newTitle.value = ''
      submission = undefined
      await refresh()
    }
  } catch {
    if (own === epoch)
      message.value = '创建未确认；同一标题重试保留本次幂等键，勿盲目重复提交。'
  } finally {
    if (own === epoch) busy.value = false
  }
}
async function upload() {
  const file = fileInput.value?.files?.[0]
  if (!file) {
    message.value = '先选择一个文本文件。'
    return
  }
  const own = epoch
  busy.value = true
  try {
    const body = new FormData()
    body.set('file', file)
    const result = await $fetch('/api/uploads', {
      method: 'POST',
      body,
      headers: { 'X-CSRF-Token': session.value.csrfToken ?? '' },
      retry: 0,
    })
    if (own === epoch)
      message.value = `已校验文件 ${result.fileName}，${result.bytes} 字节；没有保存。`
  } catch {
    if (own === epoch) message.value = '文件被拒绝：检查会话、文本类型与4KiB限制。'
  } finally {
    if (own === epoch) busy.value = false
  }
}
function download() {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(notes.value)], { type: 'application/json' }),
  )
  const link = document.createElement('a')
  link.href = url
  link.download = `notes-${identity.value}.json`
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 0)
}
useHead({
  title: () =>
    session.value.user
      ? `${session.value.user.id} 的私人笔记 | 接口与会话实验`
      : '接口与会话实验',
})
</script>
<template>
  <div class="shell">
    <a class="skip" href="#content">跳到主要内容</a>
    <header>
      <p class="brand">Vue + Nuxt · API 与会话实验</p>
      <p>仅本地演示账号，勿输入真实密码；不作为生产认证模板直接部署。</p>
    </header>
    <main id="content" tabindex="-1">
      <h1>接口与会话实验</h1>
      <p role="status" aria-label="操作结果">{{ message }}</p>
      <section aria-labelledby="session-title">
        <h2 id="session-title">当前会话</h2>
        <p data-testid="identity">
          {{ session.user ? `${session.user.id} / ${session.user.role}` : '未登录' }}
        </p>
        <form
          v-if="!session.user"
          action="/api/login"
          method="post"
          aria-label="演示账号登录"
          @submit.prevent="login"
        >
          <label for="user">演示账号</label
          ><select id="user" v-model="selectedUser" name="demoUser">
            <option value="alice">alice（读者）</option>
            <option value="bob">bob（读者）</option>
            <option value="admin">admin（管理员）</option></select
          ><button type="submit" :disabled="busy || !session.csrfToken">
            登录演示账号</button
          ><button v-if="!session.csrfToken" type="button" @click="bootstrap">
            重试初始化
          </button>
        </form>
        <template v-else
          ><button type="button" :disabled="busy" @click="logout">退出并撤销会话</button
          ><button type="button" :disabled="busy" @click="expire">模拟会话过期</button
          ><NuxtLink v-if="session.user.role === 'admin'" to="/admin"
            >管理员页面</NuxtLink
          ></template
        >
      </section>
      <section v-if="session.user" aria-labelledby="notes-title">
        <h2 id="notes-title">私人笔记</h2>
        <search>
          <form
            action="/"
            method="get"
            aria-label="搜索笔记"
            @submit.prevent="submitSearch"
          >
            <label for="q">搜索标题</label
            ><input
              id="q"
              v-model="draftQuery"
              name="q"
              type="search"
              maxlength="80"
            /><button type="submit">搜索</button>
          </form>
        </search>
        <p v-if="status === 'pending'" role="status">正在读取…</p>
        <div v-else-if="error" role="alert">
          <p>读取失败：HTTP、解析或数据结构需要检查。</p>
          <NuxtLink to="/">恢复正常数据</NuxtLink
          ><button type="button" @click="refresh()">重新读取</button>
        </div>
        <template v-else
          ><p data-testid="total">共 {{ notes.total }} 项，第 {{ notes.page }} 页。</p>
          <p v-if="!notes.items.length">没有匹配的笔记。</p>
          <ul>
            <li v-for="note in notes.items" :key="note.id">
              <h3>{{ note.title }}</h3>
              <p>所有者 {{ note.ownerId }} · 版本 {{ note.version }}</p>
            </li>
          </ul>
          <nav aria-label="分页">
            <NuxtLink
              v-if="Number(page) > 1"
              :to="{ query: { q, page: Number(page) - 1 } }"
              >上一页</NuxtLink
            ><NuxtLink
              v-if="Number(page) * notes.pageSize < notes.total"
              :to="{ query: { q, page: Number(page) + 1 } }"
              >下一页</NuxtLink
            >
          </nav></template
        >
        <p><NuxtLink to="/?invalid=1">读取错误结构演示</NuxtLink></p>
        <form
          action="/api/notes"
          method="post"
          aria-label="新增笔记"
          @submit.prevent="createNote"
        >
          <label for="title">新笔记标题</label
          ><input
            id="title"
            v-model="newTitle"
            name="title"
            maxlength="80"
            required
          /><button type="submit" :disabled="busy">创建笔记</button>
        </form>
        <form
          action="/api/uploads"
          method="post"
          enctype="multipart/form-data"
          aria-label="文本上传演示"
          @submit.prevent="upload"
        >
          <label for="file">文本文件（最多4KiB）</label
          ><input
            id="file"
            ref="fileInput"
            name="file"
            type="file"
            accept=".txt,text/plain"
          /><button type="submit" :disabled="busy">校验文件</button>
        </form>
        <button type="button" @click="download">下载当前页 JSON</button>
      </section>
    </main>
    <footer><p>数据、会话和幂等记录只保存在本地进程内，重启即重置。</p></footer>
  </div>
</template>
