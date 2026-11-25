<script setup lang="ts">
const config = useRuntimeConfig()
useSeoMeta({ title: '版本与部署说明' })
</script>
<template>
  <SiteFrame
    ><h1>版本与部署说明</h1>
    <dl>
      <dt>发布标识</dt>
      <dd id="release">{{ config.public.releaseId }}</dd>
      <dt>渲染 profile</dt>
      <dd>{{ config.public.renderProfile }}</dd>
      <dt>服务端接口</dt>
      <dd>
        {{ config.public.hasServer ? '本次有 Node 服务' : '纯静态托管没有 Node 接口' }}
      </dd>
    </dl>
    <p>
      静态构建的公开配置在生成时固化；Node
      SSR运行时可以覆盖声明的NUXT_PUBLIC_*字段。这不是浏览器实时读取部署机器环境。
    </p></SiteFrame
  >
</template>
