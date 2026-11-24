import { test, expect } from '@playwright/test'
test('SSR, hydration, key, props, query and navigation', async ({ page, request }) => {
  const raw = await request.get('/')
  const html = await raw.text()
  expect(raw.status()).toBe(200)
  expect(html).toContain('Vue 响应式入门')
  expect(html).toContain('Runtime public course')
  expect(html).toContain('用真实Vue和Nuxt学习路由、状态、SSR和错误恢复。')
  expect(html).not.toContain('server-private-regression-marker')
  expect(html).toContain('compass-module')
  expect(html).toContain('Compass Teaching Layer')
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  const hydration: string[] = []
  page.on('console', (m) => {
    if (/hydration/i.test(m.text())) hydration.push(m.text())
  })
  const api: string[] = []
  page.on('request', (r) => {
    if (r.url().includes('/api/resources')) api.push(r.url())
  })
  await page.goto('/')
  await expect(page.locator('h1')).toHaveText('学习资料库')
  await expect(page.locator('.card')).toHaveCount(3)
  await page.getByLabel('本卡临时笔记：Vue 响应式入门').fill('owned by vue')
  await page.getByRole('button', { name: '反转列表顺序' }).click()
  await expect(page.getByLabel('本卡临时笔记：Vue 响应式入门')).toHaveValue(
    'owned by vue',
  )
  expect(api).toEqual([])
  await page
    .getByRole('button', { name: '加入书单：Vue 响应式入门', exact: true })
    .click()
  await expect(page.getByTestId('selected-count')).toHaveText('1')
  await page.getByRole('link', { name: 'Vue 响应式入门', exact: true }).click()
  await expect(page.locator('h1')).toHaveText('Vue 响应式入门')
  await expect(
    page.getByRole('button', { name: '移出书单：Vue 响应式入门' }),
  ).toHaveAttribute('aria-pressed', 'true')
  await expect(page).toHaveTitle('Vue 响应式入门 | 学习资料库')
  await expect(page.locator('meta[name=description]')).toHaveAttribute(
    'content',
    '从 ref 和 computed 到可复用组件。',
  )
  await page.getByRole('link', { name: '切换到Nuxt资料' }).click()
  await expect(page.locator('h1')).toHaveText('Nuxt SSR 与数据')
  await expect(page).toHaveTitle('Nuxt SSR 与数据 | 学习资料库')
  await expect(page.locator('meta[name=description]')).toHaveAttribute(
    'content',
    '理解服务端 HTML、payload 和客户端接管。',
  )
  await page.getByRole('link', { name: '返回列表' }).click()
  await page.getByLabel('搜索资料标题').fill('Nuxt')
  await page.getByRole('button', { name: '搜索', exact: true }).click()
  await expect(page).toHaveURL(/q=Nuxt/)
  await expect(page.locator('.card')).toHaveCount(1)
  await page.reload()
  await expect(page.locator('.card')).toHaveCount(1)
  await expect(page.getByTestId('selected-count')).toHaveText('0')
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
  ).toBe(false)
  expect(errors).toEqual([])
  expect(hydration).toEqual([])
})
test('error recovery, direct 404, form and CSR contrast', async ({ page, request }) => {
  const redirect = await request.get('/about?notice=1', { maxRedirects: 0 })
  expect(redirect.status()).toBe(302)
  expect(redirect.headers().location).toBe('/about?from=study')
  const fail = await request.get('/resources/unknown')
  expect(fail.status()).toBe(404)
  expect((await request.get('/api/resources?q=a&q=b')).status()).toBe(400)
  expect((await request.post('/api/validate', { data: { title: 42 } })).status()).toBe(
    400,
  )
  expect(
    await (await request.post('/api/validate', { data: { title: ' Vue ' } })).json(),
  ).toEqual({ title: 'Vue', saved: false })
  await page.goto('/?fail=1')
  await expect(page.getByRole('alert')).toContainText('资料读取失败')
  await page.getByRole('button', { name: '恢复正常并重试' }).click()
  await expect(page.locator('.card')).toHaveCount(3)
  await page.getByRole('link', { name: '关于课程', exact: true }).click()
  await page.getByLabel('建议标题').fill('Vue 学习')
  await page.getByRole('button', { name: '验证标题' }).click()
  await expect(page.getByRole('status', { name: '标题校验结果' })).toContainText(
    '校验通过：Vue 学习',
  )
  const csr = await request.get('/client-demo')
  expect(await csr.text()).not.toContain('仅客户端渲染对照')
  await page.goto('/client-demo')
  await expect(page.locator('h1')).toHaveText('仅客户端渲染对照')
  await page.goto('/resources/unknown')
  await expect(page.locator('h1')).toHaveText('访问失败')
  await page.getByRole('button', { name: '返回资料列表' }).click()
  await expect(page.locator('.card')).toHaveCount(3)
  const responses = await Promise.all(
    ['alpha', 'beta', 'gamma', 'delta'].map((seed) =>
      request.get(`/isolation?seed=${seed}`),
    ),
  )
  for (let i = 0; i < responses.length; i++) {
    const body = await responses[i]!.text()
    expect(body).toContain(
      `data-testid="request-marker">${['alpha', 'beta', 'gamma', 'delta'][i]}</p>`,
    )
  }
  const conf = await (await request.get('/api/config')).json()
  expect(conf.privateConfigured).toBe(true)
  expect(conf.publicLabel).toBe('Runtime public course')
  expect(conf).not.toHaveProperty('privateDemoLabel')
})
