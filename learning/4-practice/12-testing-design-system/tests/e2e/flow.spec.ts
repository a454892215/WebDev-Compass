import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
test('dist components, SSR payload reuse, form contract and native dialog keyboard', async ({
  page,
  context,
  request,
}) => {
  await context.addCookies([
    {
      name: 'stage12_fixture',
      value: 'a',
      url: 'http://127.0.0.1:4541',
      httpOnly: true,
      sameSite: 'Lax',
    },
  ])
  const before = await (await request.get('/api/reads')).json()
  const errors: string[] = [],
    hydration: string[] = [],
    profileRequests: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (/hydration.*(mismatch|error)/i.test(m.text())) hydration.push(m.text())
  })
  page.on('request', (req) => {
    if (new URL(req.url()).pathname === '/api/profile') profileRequests.push(req.url())
  })
  await page.goto('/')
  await expect(page.locator('#profile')).toHaveText('当前：合成用户A')
  await expect(page.getByLabel('稿件标题', { exact: true })).toHaveValue('A的草稿')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: '跳到正文' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#content')).toBeFocused()
  await page.getByLabel('稿件标题', { exact: true }).fill(' ')
  await page.getByRole('button', { name: '保存草稿', exact: true }).click()
  await expect(page.getByLabel('稿件标题', { exact: true })).toBeFocused()
  await expect(page.locator('#draft-title-error')).toHaveText('请输入标题')
  await expect(page.locator('#draft-title')).toHaveAttribute('aria-invalid', 'true')
  const after = await (await request.get('/api/reads')).json()
  expect(after.a - before.a).toBe(1)
  expect(profileRequests).toEqual([])
  expect(await page.evaluate(() => document.cookie)).not.toContain('stage12_fixture')
  const literal = '<img src=x onerror=window.__xss=1>'
  await page.getByLabel('稿件标题', { exact: true }).fill(literal)
  await page.getByRole('button', { name: '保存草稿', exact: true }).click()
  await expect(page.locator('#saved-title')).toHaveText(literal)
  expect(await page.locator('#saved-title img').count()).toBe(0)
  expect(await page.evaluate(() => Object.hasOwn(window, '__xss'))).toBe(false)
  await expect(page.getByRole('button', { name: '禁用状态示例' })).toBeDisabled()
  const open = page.getByRole('button', { name: '打开使用说明' })
  await open.click()
  await expect(page.getByRole('dialog', { name: '组件使用说明' })).toBeVisible()
  await expect(page.getByRole('button', { name: '关闭说明' })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(open).toBeFocused()
  await open.click()
  await page.getByRole('button', { name: '关闭说明' }).click()
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(open).toBeFocused()
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
  ).toEqual([])
  await page.getByRole('link', { name: '能力与限制' }).click()
  await expect(page).toHaveTitle('能力与限制')
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBe(true)
  expect(errors).toEqual([])
  expect(hydration).toEqual([])
})
test('night RTL and pseudo text keep native semantics and bounded layout', async ({
  page,
}) => {
  await page.goto('/?locale=ar&theme=night')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'night')
  await expect(page.getByLabel('عنوان المسودة', { exact: true })).toBeVisible()
  const background = await page
    .locator('body')
    .evaluate((el) => getComputedStyle(el).backgroundColor)
  expect(background).toBe('rgb(23, 33, 43)')
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
  ).toEqual([])
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBe(true)
  await page.getByRole('link', { name: '伪本地化长文本' }).click()
  await expect(
    page.getByLabel('［稿件标题——伪本地化加长文本用于布局检验］', { exact: true }),
  ).toBeVisible()
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBe(true)
})
