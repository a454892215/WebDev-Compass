import { test, expect } from '@playwright/test'
test('identity, partial failure, recovery and layout', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('alert')).toContainText('401')
  await page.getByRole('button', { name: '选择身份并加载' }).click()
  await expect(page.getByRole('heading', { name: 'Alice 合成用户' })).toBeVisible()
  await page.getByLabel('上游情景').selectOption('optional-fail')
  await page.getByRole('button', { name: '重新获取' }).click()
  await expect(page.getByText('推荐内容暂不可用')).toBeVisible()
  await expect(page.getByText('当前没有推荐内容')).toBeVisible()
  await page.getByLabel('上游情景').selectOption('timeout')
  await page.getByRole('button', { name: '重新获取' }).click()
  await expect(page.getByRole('alert')).toContainText('504')
  await page.getByLabel('上游情景').selectOption('ok')
  await page.getByLabel('演示用户').selectOption('bob')
  await page.getByRole('button', { name: '选择身份并加载' }).click()
  await expect(page.getByRole('heading', { name: 'Bob 合成用户' })).toBeVisible()
  await expect(page.getByText('bob 的推荐')).toBeVisible()
  await page.getByRole('button', { name: '重新获取' }).focus()
  await expect(page.getByRole('button', { name: '重新获取' })).toBeFocused()
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBe(true)
  expect(errors).toEqual([])
})
