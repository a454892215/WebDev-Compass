<script setup lang="ts">
useSeoMeta({ title: '能力与限制', robots: 'noindex' })
</script>
<template>
  <section>
    <h1>能力与限制</h1>
    <p>
      本地工作台只有固定匿名fixture、稳定开关、最小错误代码和关联日志；不是生产Sentry、RUM、身份系统或监控后端。
    </p>
    <p>
      局部边界仅演示客户端渲染错误；未开启实验性SSR边界。API失败显式处理，全局错误另用error.vue。
    </p>
    <p>
      主动开启仅控制本页教学事件；服务端运行日志独立记录，不含请求体、Cookie、query或完整URL。不录制会话、不创建用户指纹；短期trace标识仍需按隐私目的管理。
    </p>
    <p>
      诊断入口仅用于本地实验，生产必须移除或另行认证授权。HTTP Cookie
      Secure=false、内存数据不持久化。
    </p>
  </section>
</template>
