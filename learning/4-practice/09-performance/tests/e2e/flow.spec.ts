import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
test('SSR payload, interaction hydration/replay, navigation, marks and accessibility', async ({
  page,
  request,
}, info) => {
  const raw = await request.get('/?mode=parallel')
  expect(raw.status()).toBe(200)
  const html = await raw.text()
  expect(html).toContain('Vue组件性能')
  expect(html).toContain('按需交互面板')
  expect(html).toContain('可选计数 0')
  const errors: string[] = []
  const hydration: string[] = []
  const calls: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (/hydration.*(mismatch|error)/i.test(m.text())) hydration.push(m.text())
  })
  page.on('request', (r) => {
    if (new URL(r.url()).pathname === '/api/catalog') calls.push(r.url())
  })
  await page.goto('/?mode=parallel')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Nuxt首屏性能实验')
  expect(calls).toEqual([])
  await expect(page.locator('#hydrate-status')).toHaveText('可选面板等待交互')
  expect(
    await page.evaluate(
      () => performance.getEntriesByName('stage9:optional-mounted').length,
    ),
  ).toBe(0)
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: '跳到正文' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#content')).toBeFocused()
  await page.getByRole('button', { name: '主交互 0', exact: true }).click()
  await expect(page.getByRole('button', { name: '主交互 1', exact: true })).toBeVisible()
  expect(
    await page.evaluate(() => performance.getEntriesByName('stage9:action').length),
  ).toBe(1)
  await page.getByRole('button', { name: '可选计数 0', exact: true }).click()
  await expect(page.locator('#hydrate-status')).toHaveText('可选面板已水合')
  await expect(
    page.getByRole('button', { name: '可选计数 1', exact: true }),
  ).toBeVisible()
  expect(
    await page.evaluate(
      () => performance.getEntriesByName('stage9:optional-mounted').length,
    ),
  ).toBe(1)
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
  ).toEqual([])
  const diagnostic = await page.evaluate(() => {
    const nav = performance.getEntriesByType(
      'navigation',
    )[0] as PerformanceNavigationTiming
    const fcp = performance.getEntriesByName('first-contentful-paint')[0]
    return {
      navigationResponseStartMs: nav.responseStart,
      fcpMs: fcp?.startTime ?? null,
      diagnosticActionMs:
        performance.getEntriesByName('stage9:action')[0]?.duration ?? null,
    }
  })
  await info.attach('navigation-diagnostics.json', {
    body: JSON.stringify(diagnostic),
    contentType: 'application/json',
  })
  await page.getByRole('link', { name: '串行读取', exact: true }).click()
  await expect(page.locator('#mode')).toHaveText('serial')
  await expect(page).toHaveURL(/mode=serial/)
  await page.reload()
  await expect(page.locator('#mode')).toHaveText('serial')
  await expect(page.locator('#hydrate-status')).toHaveText('可选面板等待交互')
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBe(true)
  expect(errors).toEqual([])
  expect(hydration).toEqual([])
})
