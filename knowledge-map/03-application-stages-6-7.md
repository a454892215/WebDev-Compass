<a id="阶段-67应用层"></a>

# 阶段 6–7：页面质量检查与 Nuxt 部署

> 性能、安全、无障碍与 SEO · Nuxt 构建、部署与回滚\
> [← 02-engineering](./02-engineering-stages-3-5.md) · [← 返回总览](../KNOWLEDGE_MAP.md) · [下一部分 →](./04-architecture-stages-8-11.md)

---

<a id="阶段-6性能安全与可访问性"></a>

## 阶段 6：页面性能、Web 安全、无障碍与 SEO

> 前置：已有可运行并接入明确数据契约的应用。这里深化基础阶段已接触的语义、键盘、安全和兼容要求，不是首次引入这些要求。产出：性能测量与安全/可访问性改进记录。验收：能复现问题、说明取舍、比较改进前后证据；自动化检测不等于完整安全或无障碍验收。见[学习路径](../docs/LEARNING_PATH.md)。



<a id="61-性能优化"></a>

### 6.1 LCP/INP/CLS、资源加载与交互性能



#### 6.1.1 加载性能

- [ ] [6.1.1.1 性能指标：**Core Web Vitals**（LCP、INP、CLS）](../notes/06-performance-security/6.1-performance/6.1.1.1.core-web-vitals.md)
- [ ] [6.1.1.2 网络优化：减少请求、压缩（Gzip/Brotli）、HTTP/2 多路复用](../notes/06-performance-security/6.1-performance/6.1.1.2.gzip-brotli-http.md)
- [ ] [6.1.1.3 资源优化：图片格式（WebP/AVIF）、懒加载、响应式图片](../notes/06-performance-security/6.1-performance/6.1.1.3.webp-avif.md)
- [ ] [6.1.1.4 关键 CSS 内联、非关键 CSS 异步](../notes/06-performance-security/6.1-performance/6.1.1.4.css-css.md)
- [ ] [6.1.1.5 JS 优化：代码分割、动态 import、Tree Shaking、减少 bundle 体积](../notes/06-performance-security/6.1-performance/6.1.1.5.js-import-tree-shaking-bundle.md)
- [ ] [6.1.1.6 第三方脚本延迟加载](../notes/06-performance-security/6.1-performance/6.1.1.6.item-6-1-1-6.md)
- [ ] [6.1.1.7 预连接、预加载、预获取策略](../notes/06-performance-security/6.1-performance/6.1.1.7.item-6-1-1-7.md)
- [ ] [6.1.1.8 CDN 加速静态资源](../notes/06-performance-security/6.1-performance/6.1.1.8.cdn.md)



#### 6.1.2 运行时性能

- [ ] [6.1.2.1 避免不必要的重排重绘](../notes/06-performance-security/6.1-performance/6.1.2.1.item-6-1-2-1.md)
- [ ] [6.1.2.2 虚拟列表（长列表优化）](../notes/06-performance-security/6.1-performance/6.1.2.2.item-6-1-2-2.md)
- [ ] [6.1.2.3 防抖节流在滚动、搜索中的应用](../notes/06-performance-security/6.1-performance/6.1.2.3.item-6-1-2-3.md)
- [ ] [6.1.2.4 Web Worker 处理密集计算](../notes/06-performance-security/6.1-performance/6.1.2.4.web-worker.md)
- [ ] [6.1.2.5 框架性能实践：先测量，再按 Vue 响应式或 React 渲染机制优化组件与依赖，不机械共套 memo/内联对象规则](../notes/06-performance-security/6.1-performance/6.1.2.5.react-vue-memo-key.md)
- [ ] [6.1.2.6 使用 Performance API 与 Lighthouse 分析](../notes/06-performance-security/6.1-performance/6.1.2.6.performance-api-lighthouse.md)



#### 6.1.3 缓存策略

- [ ] [6.1.3.1 浏览器缓存层级](../notes/06-performance-security/6.1-performance/6.1.3.1.item-6-1-3-1.md)
- [ ] [6.1.3.2 Service Worker 缓存策略（Cache First、Network First 等）](../notes/06-performance-security/6.1-performance/6.1.3.2.service-worker-cache-first-network.md)
- [ ] [6.1.3.3 应用层与 HTTP 缓存：Nuxt 数据 key/失效、HTTP 缓存头；React Query 随 React 分支选学](../notes/06-performance-security/6.1-performance/6.1.3.3.react-query-http.md)



<a id="62-web-安全"></a>

### 6.2 XSS、CSRF、依赖和敏感数据防护

- [ ] [6.2.1 **XSS（跨站脚本）**：存储型、反射型、DOM 型；安全输出、净化与 CSP；HttpOnly 限制会话读取，不阻止脚本执行](../notes/06-performance-security/6.2-web-security/6.2.1.xss.md)
- [ ] [6.2.2 **CSRF（跨站请求伪造）**：Token 验证、SameSite Cookie](../notes/06-performance-security/6.2-web-security/6.2.2.csrf.md)
- [ ] [6.2.3 **点击劫持**：`X-Frame-Options`、`frame-ancestors`](../notes/06-performance-security/6.2-web-security/6.2.3.item-6-2-3.md)
- [ ] [6.2.4 敏感信息泄露：不在前端存密钥、Source Map 生产环境处理](../notes/06-performance-security/6.2-web-security/6.2.4.source-map.md)
- [ ] [6.2.5 依赖安全：`npm audit`、供应链安全基本意识](../notes/06-performance-security/6.2-web-security/6.2.5.npm-audit.md)
- [ ] [6.2.6 CORS 配置错误导致的安全问题](../notes/06-performance-security/6.2-web-security/6.2.6.cors.md)
- [ ] [6.2.7 📱 移动端对照：Web XSS ≈ 恶意脚本注入；RN 中较少但 WebView 场景需注意](../notes/06-performance-security/6.2-web-security/6.2.7.web-xss-rn-webview.md)



<a id="63-可访问性a11y"></a>

### 6.3 键盘、焦点、ARIA 与无障碍验收

- [ ] [6.3.1 WCAG 基本等级（A / AA）概念](../notes/06-performance-security/6.3-a11y/6.3.1.wcag-a-aa.md)
- [ ] [6.3.2 语义化 HTML 与屏幕阅读器](../notes/06-performance-security/6.3-a11y/6.3.2.html.md)
- [ ] [6.3.3 `alt` 文本、`aria-label`、`aria-hidden`、`role` 属性](../notes/06-performance-security/6.3-a11y/6.3.3.alt.md)
- [ ] [6.3.4 键盘导航：`tabindex`、焦点管理、跳过链接](../notes/06-performance-security/6.3-a11y/6.3.4.tabindex.md)
- [ ] [6.3.5 颜色对比度与不只依赖颜色传达信息](../notes/06-performance-security/6.3-a11y/6.3.5.item-6-3-5.md)
- [ ] [6.3.6 表单：`label` 关联、错误提示与 `aria-describedby`](../notes/06-performance-security/6.3-a11y/6.3.6.label.md)
- [ ] [6.3.7 使用 axe DevTools / Lighthouse a11y 检测](../notes/06-performance-security/6.3-a11y/6.3.7.axe-devtools-lighthouse-a11y.md)



<a id="64-国际化i18n"></a>

### 6.4 vue-i18n/Nuxt 多语言、日期与数字格式

- [ ] [6.4.1 多语言文案管理方案](../notes/06-performance-security/6.4-i18n/6.4.1.item-6-4-1.md)
- [ ] [6.4.2 **vue-i18n** 与 Nuxt 国际化接入基础；i18next 随 React 分支选学](../notes/06-performance-security/6.4-i18n/6.4.2.i18next.md)
- [ ] [6.4.3 日期、数字、货币格式化（`Intl` API）](../notes/06-performance-security/6.4-i18n/6.4.3.intl.md)
- [ ] [6.4.4 RTL（从右到左）布局基本概念](../notes/06-performance-security/6.4-i18n/6.4.4.rtl.md)



<a id="65-seo搜索引擎优化"></a>

### 6.5 页面元信息、结构化数据与搜索抓取

- [ ] [6.5.1 爬虫工作原理与 SPA 的 SEO 挑战](../notes/06-performance-security/6.5-seo/6.5.1.spa-seo.md)
- [ ] [6.5.2 语义化 HTML、合理标题层级](../notes/06-performance-security/6.5-seo/6.5.2.html.md)
- [ ] [6.5.3 Meta 标签：title、description、canonical](../notes/06-performance-security/6.5-seo/6.5.3.meta-title-description-canonical.md)
- [ ] [6.5.4 Open Graph 与 Twitter Card（社交分享）](../notes/06-performance-security/6.5-seo/6.5.4.open-graph-twitter-card.md)
- [ ] [6.5.5 `sitemap.xml`、`robots.txt`](../notes/06-performance-security/6.5-seo/6.5.5.sitemap.xml.md)
- [ ] [6.5.6 结构化数据（Schema.org / JSON-LD）](../notes/06-performance-security/6.5-seo/6.5.6.schema.org-json-ld.md)
- [ ] [6.5.7 SSR/SSG 对 SEO 的价值与 Nuxt 验证；Next.js 作为 React 选修对照](../notes/06-performance-security/6.5-seo/6.5.7.ssr-ssg-seo-next.js-nuxt.md)

---



<a id="阶段-7首次交付与渲染部署"></a>

## 阶段 7：Nuxt 渲染、构建部署与发布回滚

> 前置：框架、API 和基础质量检查已连通。产出：明确 CSR/静态或 SSR profile 的可部署应用、部署说明与恢复方案。验收：生产构建、深链刷新、配置公开边界、错误页及基本回滚可实际演示；SSR 另验证用户状态与缓存隔离。7.3 为业务选修，不阻塞首次交付。见[学习路径](../docs/LEARNING_PATH.md)。



<a id="71-构建与部署"></a>

### 7.1 静态/Node 构建、Nginx、CI 与部署

- [ ] [7.1.1 生产构建产物分析：Vite `dist`、Nuxt `.output`、资源哈希与部署 profile](../notes/07-deployment/7.1-build-deploy/7.1.1.dist.md)
- [ ] [7.1.2 静态资源托管：**Vercel**、**Netlify**、**GitHub Pages**、**Cloudflare Pages**](../notes/07-deployment/7.1-build-deploy/7.1.2.vercel.md)
- [ ] [7.1.3 **Nginx** 基础：静态文件服务、`try_files`、反向代理、gzip](../notes/07-deployment/7.1-build-deploy/7.1.3.nginx.md)
- [ ] [7.1.4 环境变量在构建与运行时的注入](../notes/07-deployment/7.1-build-deploy/7.1.4.item-7-1-4.md)
- [ ] [7.1.5 SPA 部署：History 模式下的 fallback 配置](../notes/07-deployment/7.1-build-deploy/7.1.5.spa-history-fallback.md)
- [ ] [7.1.6 Docker 容器化前端应用（了解 Dockerfile 多阶段构建）](../notes/07-deployment/7.1-build-deploy/7.1.6.docker-dockerfile.md)
- [ ] [7.1.7 CI/CD 基础：**GitHub Actions** 自动构建与部署](../notes/07-deployment/7.1-build-deploy/7.1.7.github-actions.md)



<a id="72-生产渲染缓存与部署"></a>

### 7.2 Nuxt CSR/SSR/SSG、缓存与部署验证

Nuxt 的目录、数据生命周期、状态与 hydration 基础先学 4.5。本节聚焦生产 profile、部署环境和缓存/身份边界，不要求重学一套 Nuxt；Next.js 是 React 选修路径。

- [ ] [7.2.1 CSR / SSR / SSG 与增量再生成：按内容时效、缓存失效和托管能力选择生产 profile](../notes/07-deployment/7.2-ssr/7.2.1.csr-vs-ssr-vs-ssg.md)
- [ ] [7.2.2 **Next.js（选修）**：区分路由体系与部署模型，验证服务端/客户端数据及缓存边界](../notes/07-deployment/7.2-ssr/7.2.2.next.js.md)
- [ ] [7.2.3 **Nuxt 生产部署**：静态托管与 Node SSR、routeRules/缓存及带身份请求；基础见 4.5](../notes/07-deployment/7.2-ssr/7.2.3.nuxt.md)
- [ ] [7.2.4 Hydration 生产排查：首屏一致性、payload 与重复请求回归，基础见 4.5.2–4.5.3](../notes/07-deployment/7.2-ssr/7.2.4.hydration.md)
- [ ] [7.2.5 同构部署验收：浏览器 API/依赖兼容、并发用户状态与认证缓存隔离、静态环境限制](../notes/07-deployment/7.2-ssr/7.2.5.api.md)



<a id="73-业务选修主题不阻塞首次交付"></a>

### 7.3 桌面壳、可视化与特定 Web 技术（选修）

- [ ] [7.3.1 **微前端** 架构概念（Module Federation 等）](../notes/07-deployment/7.3-advanced-preview/7.3.1.item-7-3-1.md)
- [ ] [7.3.2 **Web Components**：Custom Elements、Shadow DOM](../notes/07-deployment/7.3-advanced-preview/7.3.2.web-components.md)
- [ ] [7.3.3 **GraphQL** 客户端（Apollo Client、urql）](../notes/07-deployment/7.3-advanced-preview/7.3.3.graphql.md)
- [ ] [7.3.4 **WebAssembly (WASM)** 应用场景](../notes/07-deployment/7.3-advanced-preview/7.3.4.webassembly-wasm.md)
- [ ] [7.3.5 **Electron** / **Tauri** 桌面应用](../notes/07-deployment/7.3-advanced-preview/7.3.5.electron.md)
- [ ] [7.3.6 **React Native Web** / **Expo Web** — 跨端代码复用](../notes/07-deployment/7.3-advanced-preview/7.3.6.react-native-web.md)
- [ ] [7.3.7 可视化：**D3.js**、**ECharts**、**Chart.js**](../notes/07-deployment/7.3-advanced-preview/7.3.7.d3.js.md)
- [ ] [7.3.8 富文本编辑器：ProseMirror、Slate、TipTap](../notes/07-deployment/7.3-advanced-preview/7.3.8.prosemirror-slate-tiptap.md)
- [ ] [7.3.9 低代码/无代码平台原理了解](../notes/07-deployment/7.3-advanced-preview/7.3.9.item-7-3-9.md)



<a id="74-软技能与工程实践"></a>

### 7.4 需求拆分、代码评审与交付文档

- [ ] [7.4.1 阅读官方文档与 RFC 的能力](../notes/07-deployment/7.4-soft-skills/7.4.1.rfc.md)
- [ ] [7.4.2 需求分析与技术方案简述](../notes/07-deployment/7.4-soft-skills/7.4.2.item-7-4-2.md)
- [ ] [7.4.3 Code Review 要点：可读性、边界情况、性能、安全](../notes/07-deployment/7.4-soft-skills/7.4.3.code-review.md)
- [ ] [7.4.4 技术债务识别与渐进式重构](../notes/07-deployment/7.4-soft-skills/7.4.4.item-7-4-4.md)
- [ ] [7.4.5 与后端、设计、产品的协作流程](../notes/07-deployment/7.4-soft-skills/7.4.5.item-7-4-5.md)
- [ ] [7.4.6 撰写 README、CHANGELOG、API 对接文档](../notes/07-deployment/7.4-soft-skills/7.4.6.readme-changelog-api.md)

---

---
