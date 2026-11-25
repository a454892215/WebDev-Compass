<script setup lang="ts">
import { UiButton, UiField } from '@compass/stage12-ui'
import { appearance, validateTitle } from '../../shared/profile'
useSeoMeta({ title: 'Vue组件验收工作台', robots: 'noindex' })
const route = useRoute()
const display = computed(() => appearance(route.query.locale, route.query.theme))
useHead(() => ({
  htmlAttrs: {
    lang: display.value.locale === 'ar' ? 'ar' : 'zh-CN',
    dir: display.value.dir,
    'data-theme': display.value.theme,
  },
}))
const requestFetch = useRequestFetch()
const { data: profile } = await useAsyncData('stage12:profile', () =>
  requestFetch('/api/profile'),
)
const title = ref(profile.value?.title || ''),
  error = ref(''),
  saved = ref(''),
  status = ref('尚未保存')
const dialog = ref<HTMLDialogElement>()
const titleLabel = computed(() =>
  display.value.locale === 'ar'
    ? 'عنوان المسودة'
    : display.value.locale === 'pseudo'
      ? '［稿件标题——伪本地化加长文本用于布局检验］'
      : '稿件标题',
)
async function save() {
  error.value = validateTitle(title.value)
  if (error.value) {
    status.value = '请修正标题'
    await nextTick()
    document.getElementById('draft-title')?.focus()
    return
  }
  saved.value = title.value.trim()
  status.value = '已在本页内存保存'
}
</script>
<template>
  <section>
    <h1>Vue组件验收工作台</h1>
    <p id="profile">当前：{{ profile?.name }}</p>
    <p>组件从库的dist导出消费；标签、状态、键盘与SSR分别验证。</p>
    <nav aria-label="显示选项">
      <NuxtLink to="/">中文 / 日间</NuxtLink> ·
      <NuxtLink to="/?locale=ar&theme=night">العربية / ليلي</NuxtLink> ·
      <NuxtLink to="/?locale=pseudo">伪本地化长文本</NuxtLink>
    </nav>
    <form novalidate @submit.prevent="save">
      <UiField
        id="draft-title"
        v-model="title"
        :label="titleLabel"
        hint="仅填写合成文本，最多60字符"
        :error="error"
        maxlength="80"
        name="title"
        autocomplete="off"
      />
      <div class="actions">
        <UiButton type="submit">保存草稿</UiButton
        ><UiButton disabled>禁用状态示例</UiButton
        ><UiButton variant="secondary" @click="dialog?.showModal()"
          >打开使用说明</UiButton
        >
      </div>
    </form>
    <p id="form-status" role="status">{{ status }}</p>
    <p v-if="saved" id="saved-title">{{ saved }}</p>
    <dialog ref="dialog" aria-labelledby="dialog-title">
      <h2 id="dialog-title">组件使用说明</h2>
      <p>原生dialog提供模态行为；Escape关闭并返回触发点，不另外编写焦点陷阱。</p>
      <form method="dialog"><UiButton type="submit" autofocus>关闭说明</UiButton></form>
    </dialog>
  </section>
</template>
