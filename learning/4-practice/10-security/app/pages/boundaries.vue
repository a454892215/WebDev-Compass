<script setup lang="ts">
useSeoMeta({ title: '能力与限制', robots: 'noindex' })
</script>
<template>
  <AppFrame
    ><h1>能力与限制</h1>
    <p>
      nonce CSP由nuxt-security接入；纯文本输出与服务端授权仍是独立要求，CSP不会代替它们。
    </p>
    <p>
      Cookie是HttpOnly，但同源恶意脚本仍可能发请求，所以仍需防XSS与会话CSRF。匿名Cookie不验证真实人的身份。
    </p>
    <p>
      本地HTTP Cookie
      Secure=false；真正生产应HTTPS、Secure与合适前缀/会话基础设施。本例没有真实OAuth、JWT、Passkey、持久化和生产安全认证。
    </p></AppFrame
  >
</template>
