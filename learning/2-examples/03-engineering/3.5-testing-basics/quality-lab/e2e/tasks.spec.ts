import { expect, test } from '@playwright/test'
test('用户添加、完成、撤销并保留文本安全', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await page.getByLabel('任务标题').fill('<b>独立任务</b>')
  await page.getByRole('button', { name: '添加任务', exact: true }).click()
  await expect(page.getByRole('status')).toHaveText('已添加 1 项')
  await expect(page.locator('#tasks b')).toHaveCount(0)
  await page
    .getByRole('button', { name: '完成：<b>独立任务</b>', exact: true })
    .click()
  await expect(
    page.getByRole('button', { name: '撤销：<b>独立任务</b>', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true')
  await page
    .getByRole('button', { name: '撤销：<b>独立任务</b>', exact: true })
    .click()
  await expect(
    page.getByRole('button', { name: '完成：<b>独立任务</b>', exact: true }),
  ).toHaveAttribute('aria-pressed', 'false')
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth + 1,
    ),
  ).toBe(false)
  expect(errors).toEqual([])
})
