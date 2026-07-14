# 阶段 6–7：应用层

> 性能、安全与可访问性 · 部署运维与 SSR 入门  
> [← 02-engineering](./02-engineering-stages-3-5.md) · [← 返回总览](../KNOWLEDGE_MAP.md) · [下一部分 →](./04-architecture-stages-8-11.md)

---

## 阶段 6：性能、安全与可访问性



### 6.1 性能优化



#### 6.1.1 加载性能

- [ ] [6.1.1.1 性能指标：**Core Web Vitals**（LCP、INP、CLS）](./notes/06-performance-security/6.1-performance/6.1.1.1.core-web-vitals.md)
- [ ] [6.1.1.2 网络优化：减少请求、压缩（Gzip/Brotli）、HTTP/2 多路复用](./notes/06-performance-security/6.1-performance/6.1.1.2.gzip-brotli-http.md)
- [ ] [6.1.1.3 资源优化：图片格式（WebP/AVIF）、懒加载、响应式图片](./notes/06-performance-security/6.1-performance/6.1.1.3.webp-avif.md)
- [ ] [6.1.1.4 关键 CSS 内联、非关键 CSS 异步](./notes/06-performance-security/6.1-performance/6.1.1.4.css-css.md)
- [ ] [6.1.1.5 JS 优化：代码分割、动态 import、Tree Shaking、减少 bundle 体积](./notes/06-performance-security/6.1-performance/6.1.1.5.js-import-tree-shaking-bundle.md)
- [ ] [6.1.1.6 第三方脚本延迟加载](./notes/06-performance-security/6.1-performance/6.1.1.6.item-6-1-1-6.md)
- [ ] [6.1.1.7 预连接、预加载、预获取策略](./notes/06-performance-security/6.1-performance/6.1.1.7.item-6-1-1-7.md)
- [ ] [6.1.1.8 CDN 加速静态资源](./notes/06-performance-security/6.1-performance/6.1.1.8.cdn.md)



#### 6.1.2 运行时性能

- [ ] [6.1.2.1 避免不必要的重排重绘](./notes/06-performance-security/6.1-performance/6.1.2.1.item-6-1-2-1.md)
- [ ] [6.1.2.2 虚拟列表（长列表优化）](./notes/06-performance-security/6.1-performance/6.1.2.2.item-6-1-2-2.md)
- [ ] [6.1.2.3 防抖节流在滚动、搜索中的应用](./notes/06-performance-security/6.1-performance/6.1.2.3.item-6-1-2-3.md)
- [ ] [6.1.2.4 Web Worker 处理密集计算](./notes/06-performance-security/6.1-performance/6.1.2.4.web-worker.md)
- [ ] [6.1.2.5 React/Vue 性能优化实践：memo、key、合理拆分组件、避免内联对象](./notes/06-performance-security/6.1-performance/6.1.2.5.react-vue-memo-key.md)
- [ ] [6.1.2.6 使用 Performance API 与 Lighthouse 分析](./notes/06-performance-security/6.1-performance/6.1.2.6.performance-api-lighthouse.md)



#### 6.1.3 缓存策略

- [ ] [6.1.3.1 浏览器缓存层级](./notes/06-performance-security/6.1-performance/6.1.3.1.item-6-1-3-1.md)
- [ ] [6.1.3.2 Service Worker 缓存策略（Cache First、Network First 等）](./notes/06-performance-security/6.1-performance/6.1.3.2.service-worker-cache-first-network.md)
- [ ] [6.1.3.3 应用层缓存：React Query 缓存、HTTP 缓存头设置](./notes/06-performance-security/6.1-performance/6.1.3.3.react-query-http.md)



### 6.2 Web 安全

- [ ] [6.2.1 **XSS（跨站脚本）**：存储型、反射型、DOM 型；防御（转义、CSP、](./notes/06-performance-security/6.2-web-security/6.2.1.xss.md)`HttpOnly` [Cookie）](./notes/06-performance-security/6.2-web-security/6.2.1.xss.md)
- [ ] [6.2.2 **CSRF（跨站请求伪造）**：Token 验证、SameSite Cookie](./notes/06-performance-security/6.2-web-security/6.2.2.csrf.md)
- [ ] [6.2.3 **点击劫持**：](./notes/06-performance-security/6.2-web-security/6.2.3.item-6-2-3.md)`X-Frame-Options`[、](./notes/06-performance-security/6.2-web-security/6.2.3.item-6-2-3.md)`frame-ancestors`
- [ ] [6.2.4 敏感信息泄露：不在前端存密钥、Source Map 生产环境处理](./notes/06-performance-security/6.2-web-security/6.2.4.source-map.md)
- [ ] [6.2.5 依赖安全：](./notes/06-performance-security/6.2-web-security/6.2.5.npm-audit.md)`npm audit`[、供应链安全基本意识](./notes/06-performance-security/6.2-web-security/6.2.5.npm-audit.md)
- [ ] [6.2.6 CORS 配置错误导致的安全问题](./notes/06-performance-security/6.2-web-security/6.2.6.cors.md)
- [ ] [6.2.7 📱 移动端对照：Web XSS ≈ 恶意脚本注入；RN 中较少但 WebView 场景需注意](./notes/06-performance-security/6.2-web-security/6.2.7.web-xss-rn-webview.md)



### 6.3 可访问性（a11y）

- [ ] [6.3.1 WCAG 基本等级（A / AA）概念](./notes/06-performance-security/6.3-a11y/6.3.1.wcag-a-aa.md)
- [ ] [6.3.2 语义化 HTML 与屏幕阅读器](./notes/06-performance-security/6.3-a11y/6.3.2.html.md)
- [ ] [6.3.3](./notes/06-performance-security/6.3-a11y/6.3.3.alt.md) `alt` [文本、](./notes/06-performance-security/6.3-a11y/6.3.3.alt.md)`aria-label`[、](./notes/06-performance-security/6.3-a11y/6.3.3.alt.md)`aria-hidden`[、](./notes/06-performance-security/6.3-a11y/6.3.3.alt.md)`role` [属性](./notes/06-performance-security/6.3-a11y/6.3.3.alt.md)
- [ ] [6.3.4 键盘导航：](./notes/06-performance-security/6.3-a11y/6.3.4.tabindex.md)`tabindex`[、焦点管理、跳过链接](./notes/06-performance-security/6.3-a11y/6.3.4.tabindex.md)
- [ ] [6.3.5 颜色对比度与不只依赖颜色传达信息](./notes/06-performance-security/6.3-a11y/6.3.5.item-6-3-5.md)
- [ ] [6.3.6 表单：](./notes/06-performance-security/6.3-a11y/6.3.6.label.md)`label` [关联、错误提示与](./notes/06-performance-security/6.3-a11y/6.3.6.label.md) `aria-describedby`
- [ ] [6.3.7 使用 axe DevTools / Lighthouse a11y 检测](./notes/06-performance-security/6.3-a11y/6.3.7.axe-devtools-lighthouse-a11y.md)



### 6.4 国际化（i18n）

- [ ] [6.4.1 多语言文案管理方案](./notes/06-performance-security/6.4-i18n/6.4.1.item-6-4-1.md)
- [ ] [6.4.2 **i18next** / **vue-i18n** 基本使用](./notes/06-performance-security/6.4-i18n/6.4.2.i18next.md)
- [ ] [6.4.3 日期、数字、货币格式化（](./notes/06-performance-security/6.4-i18n/6.4.3.intl.md)`Intl` [API）](./notes/06-performance-security/6.4-i18n/6.4.3.intl.md)
- [ ] [6.4.4 RTL（从右到左）布局基本概念](./notes/06-performance-security/6.4-i18n/6.4.4.rtl.md)



### 6.5 SEO（搜索引擎优化）

- [ ] [6.5.1 爬虫工作原理与 SPA 的 SEO 挑战](./notes/06-performance-security/6.5-seo/6.5.1.spa-seo.md)
- [ ] [6.5.2 语义化 HTML、合理标题层级](./notes/06-performance-security/6.5-seo/6.5.2.html.md)
- [ ] [6.5.3 Meta 标签：title、description、canonical](./notes/06-performance-security/6.5-seo/6.5.3.meta-title-description-canonical.md)
- [ ] [6.5.4 Open Graph 与 Twitter Card（社交分享）](./notes/06-performance-security/6.5-seo/6.5.4.open-graph-twitter-card.md)
- [ ] [6.5.5](./notes/06-performance-security/6.5-seo/6.5.5.sitemap.xml.md) `sitemap.xml`[、](./notes/06-performance-security/6.5-seo/6.5.5.sitemap.xml.md)`robots.txt`
- [ ] [6.5.6 结构化数据（Schema.org / JSON-LD）](./notes/06-performance-security/6.5-seo/6.5.6.schema.org-json-ld.md)
- [ ] [6.5.7 SSR/SSG 对 SEO 的价值（与 Next.js/Nuxt 关联）](./notes/06-performance-security/6.5-seo/6.5.7.ssr-ssg-seo-next.js-nuxt.md)

---



## 阶段 7：部署运维与进阶方向



### 7.1 构建与部署

- [ ] [7.1.1 生产构建产物分析：](./notes/07-deployment/7.1-build-deploy/7.1.1.dist.md)`dist` [目录、资源哈希](./notes/07-deployment/7.1-build-deploy/7.1.1.dist.md)
- [ ] [7.1.2 静态资源托管：**Vercel**、**Netlify**、**GitHub Pages**、**Cloudflare Pages](./notes/07-deployment/7.1-build-deploy/7.1.2.vercel.md)**
- [ ] [7.1.3 **Nginx** 基础：静态文件服务、](./notes/07-deployment/7.1-build-deploy/7.1.3.nginx.md)`try_files`[、反向代理、gzip](./notes/07-deployment/7.1-build-deploy/7.1.3.nginx.md)
- [ ] [7.1.4 环境变量在构建与运行时的注入](./notes/07-deployment/7.1-build-deploy/7.1.4.item-7-1-4.md)
- [ ] [7.1.5 SPA 部署：History 模式下的 fallback 配置](./notes/07-deployment/7.1-build-deploy/7.1.5.spa-history-fallback.md)
- [ ] [7.1.6 Docker 容器化前端应用（了解 Dockerfile 多阶段构建）](./notes/07-deployment/7.1-build-deploy/7.1.6.docker-dockerfile.md)
- [ ] [7.1.7 CI/CD 基础：**GitHub Actions** 自动构建与部署](./notes/07-deployment/7.1-build-deploy/7.1.7.github-actions.md)



### 7.2 服务端渲染与全栈框架

- [ ] [7.2.1 CSR vs SSR vs SSG vs ISR 概念与选型](./notes/07-deployment/7.2-ssr/7.2.1.csr-vs-ssr-vs-ssg.md)
- [ ] [7.2.2 **Next.js**：页面路由/App Router、SSR/SSG、](./notes/07-deployment/7.2-ssr/7.2.2.next.js.md)`getServerSideProps` [或 Server Components 概念](./notes/07-deployment/7.2-ssr/7.2.2.next.js.md)
- [ ] [7.2.3 **Nuxt**：服务端渲染与静态生成](./notes/07-deployment/7.2-ssr/7.2.3.nuxt.md)
- [ ] [7.2.4 水合（Hydration）概念](./notes/07-deployment/7.2-ssr/7.2.4.hydration.md)
- [ ] [7.2.5 同构应用注意事项（浏览器 API 兼容）](./notes/07-deployment/7.2-ssr/7.2.5.api.md)



### 7.3 进阶主题（持续学习）

- [ ] [7.3.1 **微前端** 架构概念（Module Federation 等）](./notes/07-deployment/7.3-advanced-preview/7.3.1.item-7-3-1.md)
- [ ] [7.3.2 **Web Components**：Custom Elements、Shadow DOM](./notes/07-deployment/7.3-advanced-preview/7.3.2.web-components.md)
- [ ] [7.3.3 **GraphQL** 客户端（Apollo Client、urql）](./notes/07-deployment/7.3-advanced-preview/7.3.3.graphql.md)
- [ ] [7.3.4 **WebAssembly (WASM)** 应用场景](./notes/07-deployment/7.3-advanced-preview/7.3.4.webassembly-wasm.md)
- [ ] [7.3.5 **Electron** / **Tauri** 桌面应用](./notes/07-deployment/7.3-advanced-preview/7.3.5.electron.md)
- [ ] [7.3.6 **React Native Web** / **Expo Web** — 跨端代码复用](./notes/07-deployment/7.3-advanced-preview/7.3.6.react-native-web.md)
- [ ] [7.3.7 可视化：**D3.js**、**ECharts**、**Chart.js](./notes/07-deployment/7.3-advanced-preview/7.3.7.d3.js.md)**
- [ ] [7.3.8 富文本编辑器：ProseMirror、Slate、TipTap](./notes/07-deployment/7.3-advanced-preview/7.3.8.prosemirror-slate-tiptap.md)
- [ ] [7.3.9 低代码/无代码平台原理了解](./notes/07-deployment/7.3-advanced-preview/7.3.9.item-7-3-9.md)



### 7.4 软技能与工程实践

- [ ] [7.4.1 阅读官方文档与 RFC 的能力](./notes/07-deployment/7.4-soft-skills/7.4.1.rfc.md)
- [ ] [7.4.2 需求分析与技术方案简述](./notes/07-deployment/7.4-soft-skills/7.4.2.item-7-4-2.md)
- [ ] [7.4.3 Code Review 要点：可读性、边界情况、性能、安全](./notes/07-deployment/7.4-soft-skills/7.4.3.code-review.md)
- [ ] [7.4.4 技术债务识别与渐进式重构](./notes/07-deployment/7.4-soft-skills/7.4.4.item-7-4-4.md)
- [ ] [7.4.5 与后端、设计、产品的协作流程](./notes/07-deployment/7.4-soft-skills/7.4.5.item-7-4-5.md)
- [ ] [7.4.6 撰写 README、CHANGELOG、API 对接文档](./notes/07-deployment/7.4-soft-skills/7.4.6.readme-changelog-api.md)

---

---
