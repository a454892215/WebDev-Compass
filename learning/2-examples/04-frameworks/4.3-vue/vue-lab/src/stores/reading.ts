import { defineStore } from "pinia";
export interface Item {
  id: string;
  title: string;
  done: boolean;
}
export const useReadingStore = defineStore("reading", {
  state: () => ({
    items: [
      { id: "1", title: "模板与组件", done: false },
      { id: "2", title: "路由与状态", done: false },
    ] as Item[],
  }),
  getters: {
    doneCount: (state) => state.items.filter((item) => item.done).length,
  },
  actions: {
    toggle(id: string) {
      const item = this.items.find((candidate) => candidate.id === id);
      if (item) item.done = !item.done;
    },
    rename(id: string, title: string) {
      const item = this.items.find((candidate) => candidate.id === id);
      if (item && title.trim()) item.title = title.trim();
    },
  },
});
