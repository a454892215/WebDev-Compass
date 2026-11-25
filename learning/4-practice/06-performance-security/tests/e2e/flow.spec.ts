import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
test('SSR hydration, lazy summary, Worker and locale navigation', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  const hydration: string[] = []
  page.on('console', (message) => {
    if (/hydration/i.test(message.text())) hydration.push(message.text())
  })
  const api: string[] = []
  page.on('request', (request) => {
    if (request.url().includes('/api/courses')) api.push(request.url())
  })
  await page.goto('/en')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
  await expect(page.locator('.cards > li')).toHaveCount(3)
  expect(api).toEqual([])
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
  ).toEqual([])
  const hero = page.locator('img.hero')
  await expect(hero).toHaveAttribute('width', '960')
  await expect(hero).toHaveAttribute('height', '360')
  await expect(hero).toHaveAttribute('fetchpriority', 'high')
  await page.getByRole('button', { name: 'Calculate summary on demand' }).click()
  await expect(page.getByTestId('summary')).toContainText('3 courses and 135 minutes')
  await expect
    .poll(() =>
      page.evaluate(
        () => performance.getEntriesByName('catalog-summary', 'measure').length,
      ),
    )
    .toBe(1)
  await page.getByRole('button', { name: 'Count in a Worker' }).click()
  await expect(page.getByTestId('worker')).toHaveText('Worker counted 3 courses')
  await page
    .getByRole('link', { name: 'Vue reactivity and components', exact: true })
    .click()
  await expect(page.locator('h1')).toHaveText('Vue reactivity and components')
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
    'href',
    'https://compass.example/en/courses/vue',
  )
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://compass.example/images/og-cover.png',
  )
  await page.getByRole('link', { name: 'العربية', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  await expect(page.locator('h1')).toHaveText('التفاعلية والمكونات في Vue')
  await expect(page.locator('meta[name=description]')).toHaveAttribute(
    'content',
    'واجهات واضحة باستخدام الحالة والأحداث والمكونات.',
  )
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
  ).toEqual([])
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
  ).toBe(false)
  expect(errors).toEqual([])
  expect(hydration).toEqual([])
})
test('keyboard skip link, native dialog, validation and restored focus', async ({
  page,
}) => {
  let posts = 0
  page.on('request', (request) => {
    if (request.method() === 'POST') posts++
  })
  await page.goto('/en')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#content')).toBeFocused()
  const trigger = page.getByRole('button', { name: 'Contact example', exact: true })
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: 'Form and focus experiment' })
  const email = dialog.getByLabel('Email address', { exact: true })
  await expect(email).toBeFocused()
  await email.fill('not-email')
  await dialog.getByRole('button', { name: 'Validate email' }).click()
  await expect(email).toHaveAttribute('aria-invalid', 'true')
  await expect(email).toHaveAccessibleDescription(
    'Validated only on this page; never sent or saved. Enter a valid email address.',
  )
  await expect(email).toBeFocused()
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
  ).toEqual([])
  await email.fill('alice@example.org')
  await dialog.getByRole('button', { name: 'Validate email' }).click()
  await expect(dialog.getByRole('status')).toContainText('No data was sent')
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
  expect(posts).toBe(0)
  for (const button of await page.getByRole('button').all()) {
    const box = await button.boundingBox()
    expect(box!.height).toBeGreaterThanOrEqual(43.9)
  }
})
