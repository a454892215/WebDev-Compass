<script setup lang="ts">
useSeoMeta({ title: '架构选择' })
</script>
<template>
  <AppFrame
    ><h1>架构选择</h1>
    <p>
      本例选择单体模块化Nuxt，公开样例使用SSR与请求范围数据；URL持有搜索与scope，本地草稿属于组件，收藏属于每个Nuxt应用的共享状态。
    </p>
    <p>
      应用服务依赖端口接口，服务端入口组装合成适配器。未采用微前端、CRDT或Edge；有真实独立交付/协作需要时才重新评估。
    </p>
    <p>
      具体方案、备选、约束与复验见项目docs目录。没有把本例目录结构当所有项目的强制规范。
    </p></AppFrame
  >
</template>
