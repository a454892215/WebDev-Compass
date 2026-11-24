import { computed, useAsyncData, useRoute } from "#imports";
import { $fetch } from "ofetch";

// 编译契约；只应从Nuxt setup/composable上下文调用，当前检查不执行此函数。
export function useAbortableResource() {
  const route = useRoute();
  const key = computed(() => `resource:${String(route.params.id)}`);
  return useAsyncData(
    key,
    (_app, { signal }) => {
      const abortSignal: AbortSignal | undefined = signal;
      return $fetch(
        `/api/resources/${encodeURIComponent(String(route.params.id))}`,
        {
          signal: abortSignal,
        },
      );
    },
    { dedupe: "cancel" },
  );
}
