# 阶段6：Nuxt 多语言课程目录质量实践

前置：阶段0–3浏览器、异步、TypeScript与测试；阶段4 Vue 3/Nuxt；阶段5的请求与会话安全。目标是能测量、解释、修复性能/安全/无障碍/国际化/SEO问题，并提供适合结论的证据。

这是公开教学目录，不是业务基座。已有三语列表/详情/搜索、SSR payload、按需统计、Worker、原生dialog、语言元信息及站点地图；没有登录、真实表单提交、持久化或第三方分析。43点的具体任务见[tasks.md](./tasks.md)，部分在独立lab验证，部分要求在副本新增，不虚构主项目已具备全部优化。

## 运行与验证

Node要求见package.json；本轮Node26.0.0、pnpm11.4.0。Nuxt4.7.0、Vue3.5.46、TypeScript6.0.3沿用阶段4已验证基线，vue-i18n11.4.23。锁文件固定依赖；不是每次自动升级最新版。

```bash
pnpm install --frozen-lockfile
pnpm dev
# 打开 http://127.0.0.1:4500/en 或 /zh-CN、/ar
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test
pnpm build
pnpm test:e2e
```

test:e2e在后台Chrome启动已构建的本地服务器，结束即关闭；默认读取macOS Chrome，其他环境可设置CHROME_PATH。需要可启动浏览器及绑定loopback，不需要外部业务服务。pnpm采用verifyDepsBeforeRun:error：依赖验证失败先显式安装，避免运行脚本时隐式联网重试；保留发布冷却期和包构建限制。

## 分步阅读

1. shared/utils/catalog.ts定义三语公开DTO与明确UTC日期/美元货币；app/plugins/i18n.ts为每次Nuxt应用创建独立实例。服务端不能用模块全局可变语言保存用户偏好。middleware根据URL设置语言，客户端接管使用相同规则，不从navigator猜测初始SSR语言。
2. pages/[locale]/index.vue先SSR读取，再交互搜索；按需import统计模块，并记录一次交互的PerformanceMeasure。Worker独立执行合成统计，离开时terminate，旧结果通过版本保护。小数据本身不需要Worker，示例用于解释边界，不声称降低了生产INP。
3. layouts与ContactDialog使用地标、skip link、label/提示/错误、原生dialog及关闭后焦点恢复。表单仅本地校验并显示“未发送”结果；没有假提交后端。CSS采用逻辑属性、RTL、暗色、reduced-motion、可换行与足够控件尺寸。200%根字体测试仅为文字放大代理，不是浏览器实际zoom。
4. shared/utils/seo.ts建立canonical、hreflang与安全JSON-LD序列化。列表/详情在SSR中有真实内容；不存在详情返回404。搜索结果与preview是公开noindex页面，不把robots排除当隐私控制。robots允许抓取preview以读取noindex；sitemap列出三语共12个公开规范URL。
5. public图片有真实固有尺寸；主图非lazy。分享图是1200×630 PNG，由scripts/create-share-image.mjs从项目SVG后台渲染，可重新生成。PNG可被HTTP取到并不等于真实社交平台已抓取。

默认https://compass.example为保留示例域名。真实部署应设置NUXT_PUBLIC_SITE_URL为自己的纯HTTP(S)源，重新检查canonical、sitemap和OG图片；本轮未部署该域名。公网TLS、CDN、HTTP/2、真实抓取与收录未测。

## 四部分及独立实验

- [理论](../../1-notes/06-performance-security/README.md) → [示例](../../2-examples/06-performance-security/README.md) → [独立练习](../../3-exercises/06-performance-security/README.md) → [43项综合任务](./tasks.md)。
- 性能lab：真实压缩/缓存、图片候选、long task、虚拟列表、构建分包、窄范围SW离线。主目录不默认注册SW，避免污染其他练习。
- 安全lab：隔离的XSS净化、CSP、CSRF/CORS反例与依赖检查。主工程只设置frame-ancestors/base-uri/object-src等部分CSP；没有实现完整script-src策略，也不替代阶段5会话/授权。
- 无障碍lab：键盘、表单、对比度及可检测的坏例。自动规则不能覆盖全部WCAG或真实辅助技术体验。

本轮真实证据与未测范围见[阶段验收](../../../docs/audits/STAGE_6_ACCEPTANCE.md)。Lighthouse只跑一次lab审计，TBT不是INP；field CWV要求真实用户分布。无真实移动设备、跨浏览器、读屏器、学习者试学或生产压测，不把模拟结果表述为这些测试通过。
