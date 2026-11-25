import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
test('anonymous session, HttpOnly, safe text, SSR reload, CSP-compatible navigation and logout', async ({
  page,
  context,
}) => {
  const errors: string[] = []
  const hydration: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (/hydration.*(mismatch|error)/i.test(m.text())) hydration.push(m.text())
  })
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: '跳到正文' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#content')).toBeFocused()
  await page.getByRole('button', { name: '创建匿名会话' }).click()
  await expect(page.locator('#active')).toBeVisible()
  const cookie = (await context.cookies()).find((x) => x.name === 'stage10_session')
  expect(cookie?.httpOnly).toBe(true)
  expect(cookie?.sameSite).toBe('Lax')
  expect(await page.evaluate(() => document.cookie)).not.toContain('stage10_session')
  const literal =
    '<img src=x onerror="window.__noteXSS=1"><script>window.__noteXSS=2</script>'
  await page.getByLabel('合成笔记内容').fill(literal)
  await page.getByRole('button', { name: '保存笔记', exact: true }).click()
  await expect(page.locator('.note-text')).toHaveText(literal)
  expect(await page.locator('.note-text img, .note-text script').count()).toBe(0)
  expect(await page.evaluate(() => Object.hasOwn(window, '__noteXSS'))).toBe(false)
  await page.reload()
  await expect(page.locator('.note-text')).toHaveText(literal)
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations,
  ).toEqual([])
  await page.getByRole('link', { name: '能力与限制' }).click()
  await expect(page).toHaveTitle('能力与限制')
  await page.getByRole('link', { name: '安全笔记实验', exact: true }).click()
  await expect(page.locator('.note-text')).toHaveText(literal)
  await page.getByRole('button', { name: '退出并删除本会话笔记' }).click()
  await expect(page.getByRole('button', { name: '创建匿名会话' })).toBeVisible()
  expect((await context.cookies()).some((x) => x.name === 'stage10_session')).toBe(false)
  await page.reload()
  await expect(page.locator('.note-text')).toHaveCount(0)
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBe(true)
  expect(errors).toEqual([])
  expect(hydration).toEqual([])
})
test('per-response nonce, Trusted Types sink rejection and nonce-less script blocked with report', async ({
  page,
  request,
}) => {
  const first = await request.get('/'),
    second = await request.get('/')
  const policy = first.headers()['content-security-policy']!
  const nonce = policy.match(/'nonce-([^']+)'/)?.[1]
  expect(nonce).toBeTruthy()
  expect(second.headers()['content-security-policy']).not.toContain(`'nonce-${nonce}'`)
  expect(policy).toContain("'strict-dynamic'")
  expect(policy).toContain("require-trusted-types-for 'script'")
  expect(policy).not.toContain("'unsafe-eval'")
  expect(first.headers()['x-frame-options']).toBe('DENY')
  await page.goto('/')
  expect(
    await page.evaluate(() => {
      try {
        document.createElement('div').innerHTML = '<b>blocked sink</b>'
        return false
      } catch {
        return true
      }
    }),
  ).toBe(true)
  const report = page.waitForResponse((r) => {
    if (
      new URL(r.url()).pathname !== '/api/csp-report' ||
      r.request().method() !== 'POST'
    )
      return false
    try {
      return (
        r.request().postDataJSON()?.['csp-report']?.['effective-directive'] ===
        'script-src-elem'
      )
    } catch {
      return false
    }
  })
  await page.goto('/csp-probe')
  expect((await report).status()).toBe(204)
  expect(await page.evaluate(() => Object.hasOwn(window, '__parserExecuted'))).toBe(false)
  expect(
    await page.evaluate(
      () => (window as unknown as { __trustedProbe: number }).__trustedProbe,
    ),
  ).toBe(1)
})
