import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
test('profile delivery: raw HTML, hydration, keyboard, navigation, refresh, metadata and missing route', async ({
  page,
  request,
}, info) => {
  const profile = info.project.name.split('-')[0]
  const raw = await request.get('/courses/vue')
  expect(raw.status()).toBe(200)
  expect((await raw.text()).includes('Vue 3 组件交付')).toBe(profile !== 'csr')
  const errors: string[] = []
  const hydration: string[] = []
  const api: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (/hydration.*(mismatch|error)/i.test(m.text())) hydration.push(m.text())
  })
  page.on('request', (r) => {
    if (new URL(r.url()).pathname.startsWith('/api/')) api.push(r.url())
  })
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Web 发布课程')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: '跳到正文' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#content')).toBeFocused()
  await page.getByRole('button', { name: '交互计数 0' }).click()
  await expect(page.getByRole('button', { name: '交互计数 1' })).toBeVisible()
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
  ).toEqual([])
  await page.getByRole('link', { name: 'Vue 3 组件交付' }).click()
  await expect(page).toHaveTitle('Vue 3 组件交付')
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Vue 3 组件交付')
  await page.getByRole('link', { name: '版本与部署说明' }).click()
  await expect(page.locator('#release')).toHaveText(
    profile === 'ssr' ? 'browser-runtime' : 'local-a',
  )
  expect(api).toEqual([])
  expect(errors).toEqual([])
  expect(hydration).toEqual([])
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBe(true)
  const missing = await page.goto('/courses/absent')
  expect(missing?.status()).toBe(profile === 'csr' ? 200 : 404)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('404')
  if (profile !== 'ssr') {
    expect((await request.get('/api/private')).status()).toBe(404)
    await page.goto('/account')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('404')
  }
})
