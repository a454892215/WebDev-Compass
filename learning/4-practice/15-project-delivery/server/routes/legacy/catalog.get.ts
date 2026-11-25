import { oldCatalog } from '../../utils/catalog'
import { escapeHTML } from '../../../shared/catalog'
export default defineEventHandler((event) => {
  const raw = getQuery(event).q ?? ''
  if (typeof raw !== 'string' || raw.length > 40)
    throw createError({ statusCode: 400, statusMessage: 'Invalid query' })
  const rows = oldCatalog().filter((row) =>
    row.product_name.toLowerCase().includes(raw.toLowerCase()),
  )
  setHeader(event, 'content-type', 'text/html; charset=utf-8')
  // Deliberately separate legacy MPA document: it does not load or share Vue DOM ownership.
  return (
    '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>旧版商品目录</title><link rel="stylesheet" href="/legacy/catalog.css"></head><body><a class="skip" href="#main">跳至内容</a><main id="main"><h1>旧版商品目录</h1><p>本地合成旧MPA，完整页面导航；输入内容仅按文本展示。</p><form method="get"><label for="q">搜索商品</label><input id="q" name="q" maxlength="40" value="' +
    escapeHTML(raw) +
    '"><button>搜索</button></form><p>结果 ' +
    rows.length +
    ' 项</p><ul>' +
    rows
      .map(
        (row) =>
          '<li>' +
          escapeHTML(row.product_name) +
          ' — ¥' +
          escapeHTML(row.price) +
          '</li>',
      )
      .join('') +
    '</ul><p><a href="/catalog?' +
    escapeHTML(new URLSearchParams({ q: raw }).toString()) +
    '">切换新版并保留搜索</a></p><a href="/">返回迁移实验入口</a></main></body></html>'
  )
})
