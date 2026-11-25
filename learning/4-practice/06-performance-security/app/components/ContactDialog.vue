<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { isEmail } from '../../shared/utils/catalog'
const { t } = useI18n()
const dialog = ref<HTMLDialogElement | null>(null),
  trigger = ref<HTMLButtonElement | null>(null),
  input = ref<HTMLInputElement | null>(null)
const email = ref(''),
  attempted = ref(false),
  sent = ref(false)
const invalid = computed(() => attempted.value && !isEmail(email.value))
async function validate() {
  attempted.value = true
  sent.value = false
  if (invalid.value) {
    await nextTick()
    input.value?.focus()
  } else sent.value = true
}
function open() {
  attempted.value = false
  sent.value = false
  dialog.value?.showModal()
}
function restore() {
  if (trigger.value?.isConnected) trigger.value.focus()
}
onBeforeUnmount(() => dialog.value?.close())
</script>
<template>
  <button ref="trigger" type="button" @click="open">{{ t('contact') }}</button>
  <dialog ref="dialog" aria-labelledby="contact-title" @close="restore">
    <h2 id="contact-title">{{ t('contactTitle') }}</h2>
    <form novalidate aria-labelledby="contact-title" @submit.prevent="validate">
      <label for="email">{{ t('email') }}</label>
      <p id="email-hint">{{ t('emailHint') }}</p>
      <input
        id="email"
        ref="input"
        v-model="email"
        name="email"
        type="email"
        autocomplete="email"
        maxlength="200"
        required
        autofocus
        :aria-invalid="invalid ? 'true' : undefined"
        :aria-describedby="invalid ? 'email-hint email-error' : 'email-hint'"
      />

      <p v-if="invalid" id="email-error" role="alert">{{ t('emailError') }}</p>
      <button type="submit">{{ t('send') }}</button><button
        type="button"
        @click="dialog?.close()"
      >
        {{ t('close') }}
      </button>
      <p v-if="sent" role="status">{{ t('success') }}</p>
    </form>
  </dialog>
</template>
