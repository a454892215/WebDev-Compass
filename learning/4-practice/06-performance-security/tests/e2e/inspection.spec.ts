import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
test('parallel public SSR locale isolation, metadata, robots, sitemap and real404', async ({
  request,
  page,
}) => {
  const expected = [
    ['en', 'Web learning catalogue', 'ltr'],
    ['ar', 'دليل تعلم الويب', 'rtl'],
    ['zh-CN', 'Web 学习目录', 'ltr'],
  ] as const
  const responses = await Promise.all(
    expected.map(([locale]) => request.get(`/${locale}`)),
  )
  for (let i = 0; i < responses.length; i++) {
    const [locale, title, dir] = expected[i]!
    const response = responses[i]!
    expect(response.status()).toBe(200)
    const body = await response.text()
    expect(body).toContain(`<title>${title}</title>`)
    expect(body).toContain(`lang="${locale}"`)
    expect(body).toContain(`dir="${dir}"`)
    expect(body).toContain(`href="https://compass.example/${locale}"`)
    expect(body).toContain('application/ld+json')
    expect(body).toContain('og-cover.png')
  }
  await page.goto('/en/courses/nuxt')
  const json = JSON.parse(
    await page.locator('script[type="application/ld+json"]').innerText(),
  )
  expect(json['@type']).toBe('Course')
  expect(json.name).toBe('Nuxt rendering and data')
  expect(json.url).toBe('https://compass.example/en/courses/nuxt')
  await expect(page.locator('link[rel=alternate]')).toHaveCount(4)
  const robots = await request.get('/robots.txt')
  expect(robots.status()).toBe(200)
  expect((await robots.text()).split('\n')).toContain('Disallow: /api/')
  expect(await robots.text()).not.toContain('Disallow: /preview')
  const sitemap = await request.get('/sitemap.xml')
  expect(sitemap.status()).toBe(200)
  const xml = await sitemap.text()
  expect((xml.match(/<loc>/g) || []).length).toBe(12)
  expect(xml).not.toContain('/preview')
  expect(xml).not.toContain('?q=')
  for (const path of ['/xx', '/en/courses/absent']) {
    const response = await request.get(path)
    expect(response.status()).toBe(404)
  }
  const image = await request.get('/images/og-cover.png')
  expect(image.status()).toBe(200)
  const bytes = await image.body()
  expect(bytes.readUInt32BE(16)).toBe(1200)
  expect(bytes.readUInt32BE(20)).toBe(630)
  expect(responses[0]!.headers()['content-security-policy']).toContain(
    "frame-ancestors 'none'",
  )
  const attack = '</script><img src=x onerror="window.__stage6XSS=1">'
  await page.goto(`/en?q=${encodeURIComponent(attack)}`)
  await expect(page.locator('meta[name=robots]')).toHaveAttribute(
    'content',
    'noindex,follow',
  )
  expect(await page.evaluate(() => Object.hasOwn(window, '__stage6XSS'))).toBe(false)
  await expect(page.locator('img[src=x]')).toHaveCount(0)
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
    'href',
    'https://compass.example/en',
  )
  await page.goto('/preview')
  await expect(page.locator('meta[name=robots]')).toHaveAttribute(
    'content',
    'noindex,follow',
  )
})
test('320px reflow, CSS200 percent text, dark/RTL and reduced motion', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 900 })
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' })
  await page.goto('/ar')
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' })
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
  ).toBe(false)
  expect(
    await page
      .locator('.card')
      .first()
      .evaluate((element) => getComputedStyle(element).transitionDuration),
  ).toBe('0s')
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
  ).toEqual([])
})
