import { test, expect } from '@playwright/test'
test('add, complete, filter, safe text and lazy statistics', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page.locator('body')).toHaveAttribute('data-state', 'success')
  await expect(page.locator('#list > li')).toHaveCount(3)
  await page.getByLabel('任务标题').fill('阅读 <b>安全文本</b>')
  await page.getByRole('button', { name: '添加任务', exact: true }).click()
  await expect(page.locator('#list > li')).toHaveCount(4)
  await expect(page.locator('#list b')).toHaveCount(0)
  await page
    .getByRole('button', { name: '完成：阅读 <b>安全文本</b>', exact: true })
    .click()
  await page.getByLabel('完成状态', { exact: true }).selectOption('done')
  await expect(page.locator('#list > li')).toHaveCount(2)
  await page.getByLabel('搜索标题').fill('安全文本')
  await expect(page.locator('#list > li')).toHaveCount(1)
  await page.getByRole('button', { name: '计算全部任务统计' }).click()
  await expect(page.locator('#statistics-result')).toContainText(
    '全部 4 项；已完成 2 项',
  )
  await page.getByLabel('任务标题').fill('新增后重新统计')
  await page.getByRole('button', { name: '添加任务', exact: true }).click()
  await expect(page.locator('#statistics-result')).toContainText('重新计算')
  await page.getByRole('button', { name: '计算全部任务统计' }).click()
  await expect(page.locator('#statistics-result')).toContainText(
    '全部 5 项；已完成 2 项',
  )
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth + 1,
    ),
  ).toBe(false)
  expect(errors).toEqual([])
})
test('HTTP, parsing and schema failures recover after a real reload', async ({
  page,
}) => {
  await page.goto('/')
  await expect(page.locator('body')).toHaveAttribute('data-state', 'success')
  for (const [source, message] of [
    ['missing', 'HTTP 404'],
    ['broken', '有效 JSON'],
    ['invalid', '列表'],
  ] as const) {
    await page.getByLabel('数据场景').selectOption(source)
    await page.getByRole('button', { name: '重新加载' }).click()
    await expect(page.locator('#status')).toContainText(message)
    await expect(
      page.getByRole('button', { name: '添加任务', exact: true }),
    ).toBeDisabled()
  }
  await page.getByLabel('数据场景').selectOption('tasks')
  await page.getByRole('button', { name: '重新加载' }).click()
  await expect(page.locator('#list > li')).toHaveCount(3)
  await expect(
    page.getByRole('button', { name: '添加任务', exact: true }),
  ).toBeEnabled()
})
