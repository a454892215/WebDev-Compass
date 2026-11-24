<script setup lang="ts">
definePageMeta({ middleware: 'study' })
const title = ref('')
const result = ref('')
const submitting = ref(false)
async function submit() {
  submitting.value = true
  try {
    const response = await $fetch('/api/validate', {
      method: 'POST',
      body: { title: title.value },
    })
    result.value = `校验通过：${response.title}（演示不保存）`
  } catch {
    result.value = '校验失败，请输入1–60个字符的标题。'
  } finally {
    submitting.value = false
  }
}
useHead({ title: '关于课程 | 学习资料库' })
</script>
<template>
  <section>
    <h1>关于课程</h1>
    <p>仅演示公开接口与输入校验，不提供登录或持久化。</p>
    <form
      action="/api/validate"
      method="post"
      aria-label="标题校验演示"
      @submit.prevent="submit"
    >
      <label for="title">建议标题</label
      ><input id="title" v-model="title" name="title" maxlength="60" required /><button
        type="submit"
        :disabled="submitting"
      >
        验证标题
      </button>
    </form>
    <p role="status" aria-label="标题校验结果">{{ result }}</p>
  </section>
</template>
