import { asLocale, direction } from '../../shared/utils/catalog'
export function useCatalogLocale() {
  const route = useRoute()
  const locale = computed(() => asLocale(route.params.locale) ?? 'zh-CN')
  return { locale, dir: computed(() => direction(locale.value)) }
}
