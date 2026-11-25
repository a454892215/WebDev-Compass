export function validateTitle(value: string) {
  return value.trim().length === 0
    ? '请输入标题'
    : value.trim().length > 60
      ? '标题最多60字符'
      : ''
}
export function appearance(locale: unknown, theme: unknown) {
  return {
    locale: locale === 'ar' ? 'ar' : locale === 'pseudo' ? 'pseudo' : 'zh',
    theme: theme === 'night' ? 'night' : 'day',
    dir: locale === 'ar' ? 'rtl' : 'ltr',
  } as const
}
