import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
test('default privacy, real local boundary recovery, explicit telemetry and SSR assignment', async ({
  page,
  context,
}) => {
  const pageErrors: string[] = [],
    hydration: string[] = [],
    bodies: string[] = []
  page.on('pageerror', (e) => pageErrors.push(e.message))
  page.on('console', (m) => {
    if (/hydration.*(mismatch|error)/i.test(m.text())) hydration.push(m.text())
  })
  page.on('request', (req) => {
    if (req.url().endsWith('/api/telemetry')) bodies.push(req.postData() || '')
  })
  await page.goto('/')
  await expect(
    page.getByRole('heading', { name: '可观测工作台', exact: true }),
  ).toBeVisible()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: '跳到正文' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#content')).toBeFocused()
  await page.getByRole('button', { name: '发送合成事件' }).click()
  expect(bodies).toEqual([])
  await page.getByRole('button', { name: '选择合成 A' }).click()
  await expect(page.locator('#subject')).toHaveText('当前分组：fixture-a')
  const decision = await page.locator('#flag').textContent()
  expect(
    (await context.cookies()).find((x) => x.name === 'stage11_fixture')?.httpOnly,
  ).toBe(true)
  await page.reload()
  await expect(page.locator('#flag')).toHaveText(decision!)
  expect(bodies).toEqual([])
  await page.getByLabel('开启本页教学事件').check()
  const accepted = page.waitForResponse(
    (r) => r.url().endsWith('/api/telemetry') && r.status() === 204,
  )
  await page.getByRole('button', { name: '发送合成事件' }).click()
  await accepted
  const captured = page.waitForResponse(
    (r) => r.url().endsWith('/api/telemetry') && r.status() === 204,
  )
  await page.getByRole('button', { name: '触发模块渲染故障' }).click()
  await expect(page.getByRole('alert')).toContainText('局部模块不可用')
  await captured
  await expect(page.getByRole('button', { name: '选择合成 A' })).toBeVisible()
  await page.getByRole('button', { name: '修复并重试模块' }).click()
  await expect(page.getByText('模块运行正常', { exact: true })).toBeVisible()
  await page.getByLabel('开启本页教学事件').uncheck()
  const count = bodies.length
  await page.getByRole('button', { name: '发送合成事件' }).click()
  expect(bodies).toHaveLength(count)
  expect(bodies.map((x) => JSON.parse(x).events[0].code)).toEqual([
    'manual_demo',
    'module_failure',
  ])
  expect(bodies.join()).not.toMatch(/trace|cookie|stack|userId|url|email/i)
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
  ).toEqual([])
  await page.getByRole('link', { name: '能力与限制' }).click()
  await expect(page).toHaveTitle('能力与限制')
  await page.getByRole('link', { name: '可观测工作台', exact: true }).click()
  await expect(page.locator('#subject')).toHaveText('当前分组：fixture-a')
  await page.getByRole('button', { name: '恢复访客' }).click()
  await expect(page.locator('#subject')).toHaveText('当前分组：guest')
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBe(true)
  expect(pageErrors).toEqual([])
  expect(hydration).toEqual([])
})
test('handled API failure and global fallback remain distinct', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: '触发并处理 API 503' }).click()
  await expect(page.locator('#event-status')).toHaveText('已处理 API 503')
  await expect(page.getByText('模块运行正常', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: '触发全局错误' }).click()
  await expect(page.getByRole('heading', { name: '全局错误兜底（500）' })).toBeVisible()
  await page.getByRole('button', { name: '清除全局错误并返回' }).click()
  await expect(
    page.getByRole('heading', { name: '可观测工作台', exact: true }),
  ).toBeVisible()
})
