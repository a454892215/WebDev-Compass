import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
test('Nuxt and Vite consume the same built core; SSR and native navigation work', async ({
  page,
}) => {
  const errors: string[] = [],
    hydration: string[] = [],
    requests: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (/hydration.*(mismatch|error)/i.test(m.text())) hydration.push(m.text())
  })
  page.on('request', (req) => {
    if (new URL(req.url()).pathname === '/api/catalog') requests.push(req.url())
  })
  await page.goto('/')
  await expect(page.locator('#count')).toHaveText('计划共3项')
  await expect(page.locator('#mode')).toHaveText('原生滚动增强可用')
  expect(requests).toEqual([])
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: '跳到正文' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#content')).toBeFocused()
  await page.getByRole('link', { name: '查看支持范围' }).click()
  await expect(page).toHaveURL(/#support$/)
  await expect(page.locator('#support')).toBeFocused()
  const details = page.locator('details')
  await page.getByText('平台与工具边界', { exact: true }).click()
  await expect(details).not.toHaveAttribute('open', '')
  await page.getByText('平台与工具边界', { exact: true }).click()
  await expect(details).toHaveAttribute('open', '')
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
  ).toEqual([])
  await page.getByRole('link', { name: '能力与限制' }).click()
  await expect(page).toHaveTitle('能力与限制')
  await page.goto('http://127.0.0.1:4555/')
  await expect(page.getByRole('heading', { name: '共享核心包预览' })).toBeVisible()
  await expect(page.locator('#count')).toHaveText('计划共3项')
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBe(true)
  expect(errors).toEqual([])
  expect(hydration).toEqual([])
})
test('injected absent capability and JavaScript-disabled baseline remain usable', async ({
  page,
  browser,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      configurable: true,
      value: undefined,
    }),
  )
  await page.goto('/')
  await expect(page.locator('#mode')).toHaveText('基础锚点模式可用')
  await page.getByRole('link', { name: '查看支持范围' }).click()
  await expect(page).toHaveURL(/#support$/)
  await expect(page.locator('#support')).toBeFocused()
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: page.viewportSize()!,
  })
  try {
    const baseline = await context.newPage()
    await baseline.goto('http://127.0.0.1:4551/')
    await expect(baseline.locator('#count')).toHaveText('计划共3项')
    await expect(baseline.locator('li')).toHaveCount(3)
    await baseline.getByText('平台与工具边界', { exact: true }).click()
    await expect(baseline.locator('details')).not.toHaveAttribute('open', '')
    await baseline.getByText('平台与工具边界', { exact: true }).click()
    await expect(baseline.locator('details')).toHaveAttribute('open', '')
    await baseline.getByRole('link', { name: '查看支持范围' }).click()
    await expect(baseline).toHaveURL(/#support$/)
    expect(
      await baseline.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    ).toBe(true)
  } finally {
    await context.close()
  }
})
