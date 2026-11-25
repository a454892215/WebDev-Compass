import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
test('URL/filter, feature event, scoped shared state, optional failure and recovery', async ({
  page,
}) => {
  const errors: string[] = []
  const hydration: string[] = []
  const requests: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (/hydration.*(mismatch|error)/i.test(m.text())) hydration.push(m.text())
  })
  page.on('request', (r) => {
    if (new URL(r.url()).pathname === '/api/workspace') requests.push(r.url())
  })
  await page.goto('/?scope=alice')
  await expect(page.locator('#scope')).toHaveText('alice')
  expect(requests).toEqual([])
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: '跳到正文' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#content')).toBeFocused()
  const favorite = page.getByRole('button', { name: '收藏 Vue 3 模块边界 · alice' })
  await favorite.click()
  await expect(favorite).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('#favorite-count')).toHaveText('1')
  await page.getByLabel('课程搜索').fill('Vue')
  await expect(page.getByRole('link', { name: 'Nuxt 数据与渲染 · alice' })).toBeVisible()
  await page.getByRole('button', { name: '搜索', exact: true }).click()
  await expect(page).toHaveURL(/q=Vue/)
  await expect(page.getByRole('link', { name: 'Nuxt 数据与渲染 · alice' })).toHaveCount(0)
  await page.getByRole('link', { name: 'Bob 样例' }).click()
  await expect(page.locator('#scope')).toHaveText('bob')
  await expect(page.locator('#favorite-count')).toHaveText('0')
  await expect(page.getByRole('link', { name: 'Vue 3 模块边界 · bob' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Vue 3 模块边界 · alice' })).toHaveCount(0)
  await page.getByRole('link', { name: '模拟进度不可用' }).click()
  await expect(page.locator('#completed')).toContainText('暂不可用')
  await expect(
    page.getByRole('status').filter({ hasText: '可选进度暂不可用' }),
  ).toBeVisible()
  await expect(page.getByRole('link', { name: 'Vue 3 模块边界 · bob' })).toBeVisible()
  await page.getByRole('link', { name: '恢复可选进度' }).click()
  await expect(page.locator('#completed')).toContainText('2')
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
  ).toEqual([])
  await page.getByRole('link', { name: 'Vue 3 模块边界 · bob' }).click()
  await expect(page).toHaveTitle('Vue 3 模块边界 · bob')
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Vue 3 模块边界 · bob')
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBe(true)
  expect(errors).toEqual([])
  expect(hydration).toEqual([])
})
test('URL survives refresh, history restores filter, client-only favorites reset on refresh', async ({
  page,
}) => {
  await page.goto('/?scope=alice')
  await page.getByLabel('课程搜索').fill('Nuxt')
  await page.getByRole('button', { name: '搜索', exact: true }).click()
  await expect(page).toHaveURL(/q=Nuxt/)
  await page.reload()
  await expect(page.getByLabel('课程搜索')).toHaveValue('Nuxt')
  await expect(page.getByRole('link', { name: 'Vue 3 模块边界 · alice' })).toHaveCount(0)
  await page.getByLabel('课程搜索').fill('no-match')
  await page.getByRole('button', { name: '搜索', exact: true }).click()
  await expect(page).toHaveURL(/q=no-match/)
  await expect(page.getByText('没有匹配课程，请修改搜索。')).toBeVisible()
  await page.goBack()
  await expect(page.getByLabel('课程搜索')).toHaveValue('Nuxt')
  await expect(page.getByRole('link', { name: 'Nuxt 数据与渲染 · alice' })).toBeVisible()
  await page.getByRole('button', { name: '收藏 Nuxt 数据与渲染 · alice' }).click()
  await expect(page.locator('#favorite-count')).toHaveText('1')
  await page.reload()
  await expect(page.locator('#favorite-count')).toHaveText('0')
})
