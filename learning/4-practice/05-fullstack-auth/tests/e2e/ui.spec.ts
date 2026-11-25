import { test, expect } from '@playwright/test'
import { readFile } from 'node:fs/promises'
async function login(page: import('@playwright/test').Page, user = 'alice') {
  await page.goto('/')
  await page.getByLabel('演示账号', { exact: true }).selectOption(user)
  await expect(
    page.getByRole('button', { name: '登录演示账号', exact: true }),
  ).toBeEnabled()
  await page.getByRole('button', { name: '登录演示账号', exact: true }).click()
  await expect(page.getByTestId('identity')).toContainText(user)
  await expect(page.getByTestId('total')).toBeVisible()
}
test('login, cookie boundaries, creation, malformed DTO, upload, download and logout', async ({
  page,
  context,
}) => {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  const hydration: string[] = []
  page.on('console', (m) => {
    if (/hydration/i.test(m.text())) hydration.push(m.text())
  })
  await login(page)
  const cookie = (await context.cookies()).find((c) => c.name === 'compass_stage5_sid')
  expect(cookie).toBeTruthy()
  expect(cookie!.httpOnly).toBe(true)
  expect(cookie!.sameSite).toBe('Lax')
  expect(cookie!.secure).toBe(false)
  expect(await page.evaluate(() => document.cookie)).not.toContain('compass_stage5_sid')
  expect(await page.locator('main').innerText()).not.toContain('Bob 私人笔记')
  const title = `教学新增 ${Date.now()}`
  await page.getByLabel('新笔记标题', { exact: true }).fill(title)
  await page.getByRole('button', { name: '创建笔记', exact: true }).click()
  await expect(page.getByRole('status', { name: '操作结果' })).toContainText(
    `已创建：${title}`,
  )
  await page.getByLabel('搜索标题', { exact: true }).fill(title)
  await page.getByRole('button', { name: '搜索', exact: true }).click()
  await expect(page.locator('li h3')).toHaveText([title])
  await page.reload()
  await expect(page.getByTestId('identity')).toContainText('alice')
  await expect(page.locator('li h3')).toHaveText([title])
  await page.getByRole('link', { name: '读取错误结构演示' }).click()
  await expect(page.getByRole('alert')).toContainText('读取失败')
  await page.getByRole('link', { name: '恢复正常数据' }).click()
  await expect(page.getByTestId('total')).toBeVisible()
  await page.getByLabel('文本文件（最多4KiB）').setInputFiles({
    name: 'note.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('hello'),
  })
  await page.getByRole('button', { name: '校验文件', exact: true }).click()
  await expect(page.getByRole('status', { name: '操作结果' })).toContainText(
    'note.txt，5 字节；没有保存',
  )
  const downloadEvent = page.waitForEvent('download')
  await page.getByRole('button', { name: '下载当前页 JSON' }).click()
  const download = await downloadEvent
  expect(download.suggestedFilename()).toBe('notes-alice.json')
  const file = await download.path()
  const content = JSON.parse(await readFile(file!, 'utf8'))
  expect(content.items.every((n: { ownerId: string }) => n.ownerId === 'alice')).toBe(
    true,
  )
  await page.getByRole('button', { name: '退出并撤销会话' }).click()
  await expect(page.getByTestId('identity')).toHaveText('未登录')
  await expect(page.getByRole('heading', { name: '私人笔记' })).toHaveCount(0)
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
  ).toBe(false)
  expect(errors).toEqual([])
  expect(hydration).toEqual([])
})
test('server session expiry clears private UI and allows another account', async ({
  page,
}) => {
  await login(page)
  await page.getByRole('button', { name: '模拟会话过期' }).click()
  await expect(page.getByTestId('identity')).toHaveText('未登录')
  await expect(page.getByRole('status', { name: '操作结果' })).toContainText('会话已失效')
  await page.getByLabel('演示账号', { exact: true }).selectOption('bob')
  await expect(
    page.getByRole('button', { name: '登录演示账号', exact: true }),
  ).toBeEnabled()
  await page.getByRole('button', { name: '登录演示账号', exact: true }).click()
  await expect(page.getByTestId('identity')).toContainText('bob')
  await expect(page.locator('li h3')).toHaveText('Bob 私人笔记')
  expect(await page.locator('main').innerText()).not.toContain('Alice 私人笔记')
})
