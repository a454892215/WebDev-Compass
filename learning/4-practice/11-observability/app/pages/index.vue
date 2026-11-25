<script setup lang="ts">
useSeoMeta({ title: '可观测工作台', robots: 'noindex' })
const requestFetch = useRequestFetch()
const inheritedTrace = import.meta.server
  ? useRequestEvent()?.context.observation?.traceparent
  : undefined
const { data: workspace, refresh } = await useAsyncData('stage11:workspace', () =>
  requestFetch('/api/workspace', {
    headers: inheritedTrace ? { traceparent: String(inheritedTrace) } : undefined,
  }),
)
const enabled = ref(false),
  broken = ref(false),
  status = ref('未开启教学事件'),
  busy = ref(false)
async function emit(code: 'manual_demo' | 'module_failure' | 'api_failure') {
  if (!enabled.value) return
  try {
    await $fetch('/api/telemetry', {
      method: 'POST',
      body: { version: 1, events: [{ code }] },
    })
    status.value = '事件已提交'
  } catch {
    status.value = '事件提交失败，不递归上报'
  }
}
async function change(subject: string) {
  if (busy.value) return
  busy.value = true
  try {
    await $fetch('/api/fixture', { method: 'POST', body: { subject } })
    await refresh()
    status.value = '合成分组已切换'
  } catch {
    status.value = '切换失败'
  } finally {
    busy.value = false
  }
}
async function apiFailure() {
  try {
    await $fetch('/api/demo-failure', { retry: 0 })
  } catch {
    status.value = '已处理 API 503'
    await emit('api_failure')
  }
}
function recover(clear: () => void) {
  broken.value = false
  clear()
}
</script>
<template>
  <section>
    <h1>可观测工作台</h1>
    <p>先预测错误范围、采集内容和恢复结果，再操作。仅用合成数据。</p>
    <h2>SSR与稳定分组</h2>
    <p id="subject">当前分组：{{ workspace?.subject }}</p>
    <p id="flag">
      新面板：{{ workspace?.flag.enabled ? '开启' : '关闭' }}（{{
        workspace?.flag.reason
      }}）
    </p>
    <p>发布：{{ workspace?.release }}</p>
    <p class="trace">本次服务请求 traceId：{{ workspace?.traceId }}</p>
    <div class="actions">
      <button :disabled="busy" @click="change('fixture-a')">选择合成 A</button
      ><button :disabled="busy" @click="change('fixture-b')">选择合成 B</button
      ><button :disabled="busy" @click="change('guest')">恢复访客</button>
    </div>
    <section
      v-if="workspace?.flag.enabled"
      id="new-panel"
      aria-labelledby="new-panel-title"
    >
      <h2 id="new-panel-title">灰度新增提示面板</h2>
      <p>这段非关键内容仅在服务端开关允许时渲染；关闭后保留其余课程功能。</p>
    </section>
    <h2>最小事件演示</h2>
    <p id="help">
      默认不发浏览器教学事件；仅发送固定错误代码，无输入、URL、用户ID或原始堆栈。
    </p>
    <label
      ><input
        v-model="enabled"
        type="checkbox"
        aria-describedby="help"
      />开启本页教学事件</label
    >
    <p id="event-status" role="status">{{ status }}</p>
    <div class="actions">
      <button @click="emit('manual_demo')">发送合成事件</button
      ><button @click="apiFailure">触发并处理 API 503</button>
    </div>
    <h2>局部错误边界</h2>
    <NuxtErrorBoundary @error="emit('module_failure')"
      ><FaultyPanel :broken="broken" /><template #error="{ clearBoundaryError }"
        ><p role="alert">局部模块不可用，页面其他区域仍可操作。</p>
        <button @click="recover(clearBoundaryError)">修复并重试模块</button></template
      ></NuxtErrorBoundary
    >
    <div class="actions">
      <button @click="broken = true">触发模块渲染故障</button
      ><button
        @click="showError({ statusCode: 500, statusMessage: 'Synthetic global failure' })"
      >
        触发全局错误
      </button>
    </div>
  </section>
</template>
