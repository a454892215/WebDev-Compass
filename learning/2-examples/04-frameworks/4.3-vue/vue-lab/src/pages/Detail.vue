<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useReadingStore } from "../stores/reading";
const route = useRoute();
const store = useReadingStore();
const item = computed(() =>
  store.items.find((candidate) => candidate.id === route.params.id),
);
</script>
<template>
  <h2>动态详情 {{ route.params.id }}</h2>
  <p v-if="item" data-testid="detail">
    {{ item.title }}：{{ item.done ? "已完成" : "待完成" }}
  </p>
  <p v-else>没有此条目</p>
  <p>同一组件响应params变化；没有只在onMounted读取一次。</p>
</template>
