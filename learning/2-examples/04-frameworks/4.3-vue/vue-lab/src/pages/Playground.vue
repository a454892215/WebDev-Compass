<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import ReadingCard from "../components/ReadingCard.vue";
import ThemeBadge from "../components/ThemeBadge.vue";
import FocusInput from "../components/FocusInput.vue";
import CounterPanel from "../components/CounterPanel.vue";
import NotesPanel from "../components/NotesPanel.vue";
import { useReadingStore } from "../stores/reading";
import { demoSearch, useLatestSearch } from "../composables/useLatestSearch";
const store = useReadingStore();
const { items, doneCount } = storeToRefs(store);
const state = reactive({ query: "", showHelp: true });
const visible = computed(() =>
  items.value.filter((item) => item.title.includes(state.query)),
);
const drafts = reactive<Record<string, string>>({ "1": "", "2": "" });
const panel = ref<"counter" | "notes">("counter");
const lifecycle = ref<string[]>([]);
const remoteQuery = ref("");
const { results, status } = useLatestSearch(remoteQuery, demoSearch);
const route = useRoute();
</script>
<template>
  <h2>组件与状态实验</h2>
  <p v-if="route.query.denied" role="status">
    客户端守卫已重定向；不是服务端授权。
  </p>
  <ThemeBadge />
  <search>
    <label for="query">筛选标题</label
    ><input id="query" v-model="state.query" name="query" />
  </search>
  <button type="button" @click="state.showHelp = !state.showHelp">
    切换说明
  </button>
  <p v-show="state.showHelp" data-testid="help">
    v-show保留元素，v-if改变挂载。
  </p>
  <p data-testid="summary">已完成 {{ doneCount }}；显示 {{ visible.length }}</p>
  <p v-if="visible.length === 0">没有匹配项</p>
  <ReadingCard
    v-for="item in visible"
    :key="item.id"
    :item="item"
    :draft="drafts[item.id] ?? ''"
    @update:draft="drafts[item.id] = $event"
    @toggle="store.toggle"
  >
    <template #meta="{ id }"
      >作用域插槽 id={{ id }}；草稿：{{ drafts[id] }}</template
    >
  </ReadingCard>
  <section aria-labelledby="focus-heading">
    <h2 id="focus-heading">模板引用与更新时序</h2>
    <FocusInput />
  </section>
  <section aria-labelledby="cache-heading">
    <h2 id="cache-heading">KeepAlive与生命周期</h2>
    <button type="button" @click="panel = 'counter'">计数面板</button
    ><button type="button" @click="panel = 'notes'">笔记面板</button>
    <KeepAlive
      ><component
        :is="panel === 'counter' ? CounterPanel : NotesPanel"
        @lifecycle="lifecycle.push($event)"
    /></KeepAlive>
    <p data-testid="lifecycle">{{ lifecycle.join(", ") }}</p>
  </section>
  <section aria-labelledby="watch-heading">
    <h2 id="watch-heading">侦听与取消</h2>
    <label for="remote">模拟查询（error/empty/slow）</label
    ><input id="remote" v-model="remoteQuery" name="remote" />
    <p role="status" data-testid="search-status">
      {{ status }}：{{ results.join(", ") }}
    </p>
    <p>内存延迟fixture，不访问业务网络；切换页面会停止侦听并取消。</p>
  </section>
</template>
