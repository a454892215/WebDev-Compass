export const LOCALES = ['zh-CN', 'en', 'ar'] as const
export type Locale = (typeof LOCALES)[number]
export function asLocale(value: unknown): Locale | undefined {
  return typeof value === 'string' && LOCALES.includes(value as Locale)
    ? (value as Locale)
    : undefined
}
export function localeFromPath(path: string): Locale {
  return asLocale(path.split('/')[1]) ?? 'zh-CN'
}
export function direction(locale: Locale) {
  return locale === 'ar' ? ('rtl' as const) : ('ltr' as const)
}
export const messages = {
  'zh-CN': {
    brand: 'Web 学习目录',
    home: '课程目录',
    language: '语言',
    heading: '把 Web 原理变成可验证的实践',
    intro: '本地公开教学内容，比较资源加载、语义、国际化与搜索元信息。',
    searchLabel: '搜索课程',
    search: '搜索',
    empty: '没有匹配的课程。',
    count: '共 {count} 门课程',
    details: '查看课程',
    minutes: '分钟',
    contact: '联系示例',
    contactTitle: '表单与焦点实验',
    email: '电子邮箱',
    emailHint: '仅本页校验，不发送或保存。',
    emailError: '请输入有效的电子邮箱。',
    send: '校验邮箱',
    close: '关闭',
    success: '校验通过，没有发送任何数据。',
    skip: '跳到主要内容',
    summary: '按需计算摘要',
    summaryReady: '已计算 {count} 项，合计 {minutes} 分钟',
    worker: '在 Worker 中统计',
    workerReady: 'Worker 已统计 {count} 项',
    pending: '正在加载…',
    failed: '读取失败，可以重试。',
    retry: '重试',
    footer: '公开本地实验，不代表生产性能、无障碍符合或搜索排名。',
    back: '返回目录',
  },
  en: {
    brand: 'Web learning catalogue',
    home: 'Courses',
    language: 'Language',
    heading: 'Turn Web concepts into verifiable practice',
    intro:
      'Public local teaching content for loading, semantics, internationalization and search metadata.',
    searchLabel: 'Search courses',
    search: 'Search',
    empty: 'No matching courses.',
    count: 'No courses | One course | {count} courses',
    details: 'View course',
    minutes: 'minutes',
    contact: 'Contact example',
    contactTitle: 'Form and focus experiment',
    email: 'Email address',
    emailHint: 'Validated only on this page; never sent or saved.',
    emailError: 'Enter a valid email address.',
    send: 'Validate email',
    close: 'Close',
    success: 'Validation passed. No data was sent.',
    skip: 'Skip to main content',
    summary: 'Calculate summary on demand',
    summaryReady: 'Calculated {count} courses and {minutes} minutes',
    worker: 'Count in a Worker',
    workerReady: 'Worker counted {count} courses',
    pending: 'Loading…',
    failed: 'Loading failed. You can retry.',
    retry: 'Retry',
    footer:
      'Public local experiment; no production performance, accessibility conformance or ranking guarantee.',
    back: 'Back to courses',
  },
  ar: {
    brand: 'دليل تعلم الويب',
    home: 'الدورات',
    language: 'اللغة',
    heading: 'تعلم مفاهيم الويب من خلال تجارب قابلة للتحقق',
    intro: 'محتوى تعليمي محلي حول الأداء وإمكانية الوصول واللغات وبيانات البحث.',
    searchLabel: 'البحث عن دورة',
    search: 'بحث',
    empty: 'لا توجد دورات مطابقة.',
    count: 'عدد الدورات: {count}',
    details: 'عرض الدورة',
    minutes: 'دقيقة',
    contact: 'مثال للتواصل',
    contactTitle: 'تجربة النموذج والتركيز',
    email: 'البريد الإلكتروني',
    emailHint: 'فحص محلي فقط، لا يتم إرسال البيانات أو حفظها.',
    emailError: 'أدخل عنوان بريد إلكتروني صالحًا.',
    send: 'فحص البريد',
    close: 'إغلاق',
    success: 'نجح الفحص. لم يتم إرسال أي بيانات.',
    skip: 'انتقل إلى المحتوى',
    summary: 'حساب الملخص عند الطلب',
    summaryReady: 'عدد الدورات: {count}، مجموع الدقائق: {minutes}',
    worker: 'إحصاء باستخدام عامل',
    workerReady: 'عدد الدورات المحسوبة: {count}',
    pending: 'جار التحميل…',
    failed: 'تعذر التحميل. حاول مجددًا.',
    retry: 'إعادة المحاولة',
    footer: 'تجربة محلية عامة، وليست ضمانًا للأداء أو التوافق أو ترتيب البحث.',
    back: 'العودة إلى الدورات',
  },
}
interface CourseSource {
  slug: string
  minutes: number
  usd: number
  date: string
  text: Record<Locale, { title: string; summary: string }>
}
const courses: readonly CourseSource[] = [
  {
    slug: 'vue',
    minutes: 45,
    usd: 12,
    date: '2026-11-25T00:00:00Z',
    text: {
      'zh-CN': {
        title: 'Vue 响应式与组件',
        summary: '用状态、事件和插槽建立清晰的界面契约。',
      },
      en: {
        title: 'Vue reactivity and components',
        summary: 'Build clear interface contracts with state, events and slots.',
      },
      ar: {
        title: 'التفاعلية والمكونات في Vue',
        summary: 'واجهات واضحة باستخدام الحالة والأحداث والمكونات.',
      },
    },
  },
  {
    slug: 'nuxt',
    minutes: 60,
    usd: 18,
    date: '2026-11-25T00:00:00Z',
    text: {
      'zh-CN': {
        title: 'Nuxt 渲染与数据',
        summary: '核对 SSR、payload 与客户端导航，避免重复请求。',
      },
      en: {
        title: 'Nuxt rendering and data',
        summary: 'Verify SSR, payload and client navigation without duplicate requests.',
      },
      ar: {
        title: 'العرض والبيانات في Nuxt',
        summary: 'تعرف على العرض في الخادم والبيانات والتنقل في المتصفح.',
      },
    },
  },
  {
    slug: 'quality',
    minutes: 30,
    usd: 0,
    date: '2026-11-25T00:00:00Z',
    text: {
      'zh-CN': {
        title: 'Web 质量与验证',
        summary: '用实际测量、键盘操作和响应检查改进页面。',
      },
      en: {
        title: 'Web quality and verification',
        summary:
          'Improve pages with actual measurements, keyboard checks and response inspection.',
      },
      ar: {
        title: 'جودة الويب والتحقق',
        summary: 'تحسين الصفحات بالقياس والتحقق من لوحة المفاتيح والاستجابات.',
      },
    },
  },
]
export interface Course {
  slug: string
  title: string
  summary: string
  minutes: number
  usd: number
  date: string
}
export function catalog(locale: Locale, q = ''): Course[] {
  const needle = q.trim().toLocaleLowerCase(locale)
  return courses
    .map((c) => ({
      slug: c.slug,
      ...c.text[locale],
      minutes: c.minutes,
      usd: c.usd,
      date: c.date,
    }))
    .filter((c) => `${c.title} ${c.summary}`.toLocaleLowerCase(locale).includes(needle))
}
export function findCourse(locale: Locale, slug: string) {
  return catalog(locale).find((c) => c.slug === slug)
}
export function money(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' }).format(
    value,
  )
}
export function dateLabel(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeZone: 'UTC',
    calendar: 'gregory',
  }).format(new Date(value))
}
export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 200
}
