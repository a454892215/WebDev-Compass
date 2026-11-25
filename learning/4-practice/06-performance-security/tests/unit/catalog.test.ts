import { describe, it, expect } from 'vitest'
import { createI18n } from 'vue-i18n'
import {
  catalog,
  messages,
  asLocale,
  localeFromPath,
  direction,
  dateLabel,
  money,
  isEmail,
} from '../../shared/utils/catalog'
import { jsonLd, siteOrigin, alternates, xmlEscape } from '../../shared/utils/seo'
describe('locale and public catalogue', () => {
  it('strict locale and direction, detached translated DTO', () => {
    expect(asLocale('en')).toBe('en')
    expect(asLocale('EN')).toBeUndefined()
    expect(localeFromPath('/ar/courses/vue')).toBe('ar')
    expect(direction('ar')).toBe('rtl')
    const en = catalog('en')
    expect(en).toHaveLength(3)
    en[0]!.title = 'changed'
    expect(catalog('en')[0]!.title).toBe('Vue reactivity and components')
    expect(catalog('zh-CN', 'not found')).toEqual([])
  })
  it('formats with explicit UTC calendar/currency', () => {
    expect(dateLabel('2026-11-25T00:00:00Z', 'en')).toContain('2026')
    expect(money(12, 'en')).toContain('12.00')
    expect(dateLabel('2026-11-25T00:00:00Z', 'ar')).not.toBe(
      dateLabel('2026-11-25T00:00:00Z', 'en'),
    )
  })
  it('independent composers, parameters and English plurals', () => {
    const a = createI18n({ legacy: false, locale: 'en', messages }),
      b = createI18n({ legacy: false, locale: 'ar', messages })
    expect(a.global.t('count', { count: 1 }, 1)).toBe('One course')
    expect(a.global.t('count', { count: 3 }, 3)).toBe('3 courses')
    a.global.locale.value = 'zh-CN'
    expect(b.global.locale.value).toBe('ar')
  })
  it.each(['', 'invalid', 'a b@example.org', 'alice@example', 'a@b.c '.repeat(2)])(
    'rejects invalid local email %s',
    (value) => expect(isEmail(value)).toBe(false),
  )
  it('accepts a simple valid email without claiming full RFC validation', () =>
    expect(isEmail('alice@example.org')).toBe(true))
})
describe('search metadata safety', () => {
  it('JSONLD preserves data without closing the script element', () => {
    const value = {
      name: '</script><script>alert(1)</script>',
      description:
        'line' +
        String.fromCodePoint(0x2028) +
        'separator' +
        String.fromCodePoint(0x2029),
    }
    const serialized = jsonLd(value)
    expect(serialized).not.toContain('</script>')
    expect(JSON.parse(serialized)).toEqual(value)
  })
  it('requires clean configured HTTP origin, not arbitrary schemes or credentials', () => {
    expect(siteOrigin('https://compass.example/')).toBe('https://compass.example')
    for (const value of [
      'javascript:alert(1)',
      'https://user:pass@example.org',
      'https://example.org/path',
    ])
      expect(() => siteOrigin(value)).toThrow()
  })
  it('three alternates and default, safe sitemap XML', () => {
    const links = alternates('https://compass.example', '/courses/vue')
    expect(links).toHaveLength(4)
    expect(links[0]!.href).toBe('https://compass.example/zh-CN/courses/vue')
    expect(xmlEscape('a&<"')).toBe('a&amp;&lt;&quot;')
  })
})
