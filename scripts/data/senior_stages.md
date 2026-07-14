## 阶段 8：前端架构与系统设计

### 8.1 架构思维与文档

- [ ] [8.1.1 **技术 RFC / ADR** 撰写：背景、目标、备选方案、权衡矩阵、决策与后果](./notes/08-architecture/8.1-architecture-docs/8.1.1.rfc-adr.md)
- [ ] [8.1.2 **非功能需求（NFR）** 分析：性能、可用性、安全、可维护性、可扩展性](./notes/08-architecture/8.1-architecture-docs/8.1.2.nfr.md)
- [ ] [8.1.3 **架构图** 绘制：C4 模型（Context / Container / Component）基础](./notes/08-architecture/8.1-architecture-docs/8.1.3.item-8-1-3.md)
- [ ] [8.1.4 **边界划分**：按业务域（Domain）vs 按技术层（Layer）的利弊](./notes/08-architecture/8.1-architecture-docs/8.1.4.item-8-1-4.md)
- [ ] [8.1.5 **依赖规则**：单向依赖、禁止循环依赖、eslint-plugin-boundaries 等 enforcement](./notes/08-architecture/8.1-architecture-docs/8.1.5.item-8-1-5.md)
- [ ] [8.1.6 📱 移动端对照：Android 模块化 / Flutter Feature Module ≈ 前端 Feature-Sliced 划分](./notes/08-architecture/8.1-architecture-docs/8.1.6.android-flutter-feature-module-feature-sliced.md)

### 8.2 应用架构模式

- [ ] [8.2.1 **Feature-Sliced Design (FSD)**：app / pages / widgets / features / entities / shared](./notes/08-architecture/8.2-app-architecture/8.2.1.feature-sliced-design-fsd.md)
- [ ] [8.2.2 **分层架构**：Presentation → Application → Domain → Infrastructure](./notes/08-architecture/8.2-app-architecture/8.2.2.item-8-2-2.md)
- [ ] [8.2.3 **Container / Presentation** 组件分离在大型项目中的演进](./notes/08-architecture/8.2-app-architecture/8.2.3.container-presentation.md)
- [ ] [8.2.4 **模块化路由**：按路由拆包 vs 按功能域拆包的权衡](./notes/08-architecture/8.2-app-architecture/8.2.4.item-8-2-4.md)
- [ ] [8.2.5 **配置驱动 UI**：JSON Schema 表单、低代码渲染引擎思路](./notes/08-architecture/8.2-app-architecture/8.2.5.ui.md)
- [ ] [8.2.6 **插件化架构**：扩展点、注册表、Sandbox 隔离](./notes/08-architecture/8.2-app-architecture/8.2.6.item-8-2-6.md)

### 8.3 渲染架构选型

- [ ] [8.3.1 **CSR / SSR / SSG / ISR / Streaming SSR** 深度对比：TTFB、FCP、SEO、成本、复杂度](./notes/08-architecture/8.3-rendering/8.3.1.csr-ssr-ssg-isr-streaming.md)
- [ ] [8.3.2 **React Server Components (RSC)** 与 Server Actions 概念与边界](./notes/08-architecture/8.3-rendering/8.3.2.react-server-components-rsc.md)
- [ ] [8.3.3 **Partial Hydration / Selective Hydration** 与 Islands 架构（Astro 思路）](./notes/08-architecture/8.3-rendering/8.3.3.partial-hydration-selective-hydration.md)
- [ ] [8.3.4 **水合（Hydration）** 不匹配：成因、检测、修复策略](./notes/08-architecture/8.3-rendering/8.3.4.hydration.md)
- [ ] [8.3.5 **同构代码** 规范：浏览器 API 守卫、环境分支、动态 import](./notes/08-architecture/8.3-rendering/8.3.5.item-8-3-5.md)
- [ ] [8.3.6 **Edge SSR** vs **Origin SSR**：延迟、缓存、数据一致性](./notes/08-architecture/8.3-rendering/8.3.6.edge-ssr.md)
- [ ] [8.3.7 输出 **渲染架构决策树**，能向团队解释选型理由](./notes/08-architecture/8.3-rendering/8.3.7.item-8-3-7.md)

### 8.4 微前端与大型应用

- [ ] [8.4.1 **微前端** 动机：独立部署、团队自治、技术栈共存](./notes/08-architecture/8.4-micro-frontends/8.4.1.item-8-4-1.md)
- [ ] [8.4.2 **集成方式**：构建时（Module Federation）vs 运行时（single-spa、iframe、Web Components）](./notes/08-architecture/8.4-micro-frontends/8.4.2.item-8-4-2.md)
- [ ] [8.4.3 **Module Federation** 深入：shared 依赖、singleton、版本对齐、远程入口](./notes/08-architecture/8.4-micro-frontends/8.4.3.module-federation.md)
- [ ] [8.4.4 **样式隔离**：Shadow DOM、CSS Modules、CSS-in-JS 冲突、全局污染](./notes/08-architecture/8.4-micro-frontends/8.4.4.item-8-4-4.md)
- [ ] [8.4.5 **路由协调**：基座路由、子应用激活、404 与 deep link](./notes/08-architecture/8.4-micro-frontends/8.4.5.item-8-4-5.md)
- [ ] [8.4.6 **跨应用通信**：CustomEvent、Broadcast Channel、全局 Store 反模式](./notes/08-architecture/8.4-micro-frontends/8.4.6.item-8-4-6.md)
- [ ] [8.4.7 **微前端** 的反模式与何时 **不应** 采用微前端](./notes/08-architecture/8.4-micro-frontends/8.4.7.item-8-4-7.md)

### 8.5 BFF 与 API 层架构

- [ ] [8.5.1 **BFF（Backend for Frontend）** 模式：聚合、裁剪、鉴权下沉](./notes/08-architecture/8.5-bff/8.5.1.bff-backend-for-frontend.md)
- [ ] [8.5.2 BFF vs 直连后端 API：何时引入 BFF](./notes/08-architecture/8.5-bff/8.5.2.bff-vs-api-bff.md)
- [ ] [8.5.3 **GraphQL BFF** vs **REST BFF** 场景对比](./notes/08-architecture/8.5-bff/8.5.3.graphql-bff.md)
- [ ] [8.5.4 **API 版本化** 与前端兼容策略：并行版本、Deprecation Header](./notes/08-architecture/8.5-bff/8.5.4.api.md)
- [ ] [8.5.5 **DTO 映射**：驼峰/下划线、日期时区、空值语义统一](./notes/08-architecture/8.5-bff/8.5.5.dto.md)
- [ ] [8.5.6 📱 移动端对照：BFF ≈ 移动端专用 Gateway / API Adapter 层](./notes/08-architecture/8.5-bff/8.5.6.bff-gateway-api-adapter.md)

### 8.6 状态与数据架构

- [ ] [8.6.1 **客户端状态 vs 服务端状态** 边界：何时用 Zustand vs TanStack Query](./notes/08-architecture/8.6-state-data/8.6.1.vs.md)
- [ ] [8.6.2 **Query Key 规范** 与缓存层级设计（全局命名空间）](./notes/08-architecture/8.6-state-data/8.6.2.query-key.md)
- [ ] [8.6.3 **Optimistic Update** 冲突检测与回滚策略](./notes/08-architecture/8.6-state-data/8.6.3.optimistic-update.md)
- [ ] [8.6.4 **Stale-While-Revalidate** 在产品中的用户体验权衡](./notes/08-architecture/8.6-state-data/8.6.4.stale-while-revalidate.md)
- [ ] [8.6.5 **Offline-first** 架构：IndexedDB、Background Sync、冲突解决思路](./notes/08-architecture/8.6-state-data/8.6.5.offline-first.md)
- [ ] [8.6.6 **Local-first** 与 CRDT（Yjs、Automerge）基本概念 — 协作场景选学](./notes/08-architecture/8.6-state-data/8.6.6.local-first.md)
- [ ] [8.6.7 **Event Sourcing / CQRS** 在前端的了解（复杂 B 端）](./notes/08-architecture/8.6-state-data/8.6.7.event-sourcing-cqrs.md)

### 8.7 能力锚点（阶段 8）

- 能对中等复杂度产品输出 **架构 RFC**，含至少 2 种备选方案与明确决策
- 能解释团队项目为何采用当前渲染模式，并列出已知 trade-off

---

## 阶段 9：深度性能工程

### 9.1 性能度量体系

- [ ] [9.1.1 **Lab vs RUM**：Lighthouse / WebPageTest vs 真实用户数据](./notes/09-performance/9.1-performance-metrics/9.1.1.lab-vs-rum.md)
- [ ] [9.1.2 **Core Web Vitals** 深度：LCP 元素归因、INP 交互归因、CLS 布局偏移源](./notes/09-performance/9.1-performance-metrics/9.1.2.core-web-vitals.md)
- [ ] [9.1.3 **web-vitals** 库采集与上报架构](./notes/09-performance/9.1-performance-metrics/9.1.3.web-vitals.md)
- [ ] [9.1.4 **Performance API**：Navigation Timing、Resource Timing、Long Task API](./notes/09-performance/9.1-performance-metrics/9.1.4.performance-api.md)
- [ ] [9.1.5 **自定义性能标记**：`performance.mark` / `measure`、React Profiler](./notes/09-performance/9.1-performance-metrics/9.1.5.item-9-1-5.md)
- [ ] [9.1.6 **性能回归** 检测：CI 中 Lighthouse CI、bundle 体积门禁](./notes/09-performance/9.1-performance-metrics/9.1.6.item-9-1-6.md)
- [ ] [9.1.7 📱 移动端对照：Web RUM ≈ Firebase Performance / 自建 APM 客户端上报](./notes/09-performance/9.1-performance-metrics/9.1.7.web-rum-firebase-performance-apm.md)

### 9.2 性能预算与治理

- [ ] [9.2.1 **Performance Budget** 定义：JS/CSS 体积、请求数、LCP/INP 阈值](./notes/09-performance/9.2-performance-budget/9.2.1.performance-budget.md)
- [ ] [9.2.2 **Bundle 分析**：rollup-plugin-visualizer、webpack-bundle-analyzer、`source-map-explorer`](./notes/09-performance/9.2-performance-budget/9.2.2.bundle.md)
- [ ] [9.2.3 **CI 门禁**：bundlesize、size-limit、PR 评论机器人](./notes/09-performance/9.2-performance-budget/9.2.3.ci.md)
- [ ] [9.2.4 **第三方脚本审计** 流程：分类、延迟加载、移除冗余](./notes/09-performance/9.2-performance-budget/9.2.4.item-9-2-4.md)
- [ ] [9.2.5 **Partytown** 将第三方脚本移至 Web Worker 的思路](./notes/09-performance/9.2-performance-budget/9.2.5.partytown.md)

### 9.3 加载性能进阶

- [ ] [9.3.1 **Critical CSS** 提取与内联策略](./notes/09-performance/9.3-loading-advanced/9.3.1.critical-css.md)
- [ ] [9.3.2 **字体优化**：`font-display`、subset、preload、FOIT/FOUT 治理](./notes/09-performance/9.3-loading-advanced/9.3.2.item-9-3-2.md)
- [ ] [9.3.3 **图片管线**：CDN 变换、blur placeholder、LQIP、AVIF/WebP 回退链](./notes/09-performance/9.3-loading-advanced/9.3.3.item-9-3-3.md)
- [ ] [9.3.4 **Speculation Rules API**、`<link rel="prefetch/prerender">` 产品化](./notes/09-performance/9.3-loading-advanced/9.3.4.speculation-rules-api.md)
- [ ] [9.3.5 **HTTP/3**、Early Hints (103)、103 vs Server Push 历史](./notes/09-performance/9.3-loading-advanced/9.3.5.http.md)
- [ ] [9.3.6 **Edge 缓存** 与 **CDN 缓存键** 设计（Query String、Cookie Vary）](./notes/09-performance/9.3-loading-advanced/9.3.6.edge.md)

### 9.4 运行时性能进阶

- [ ] [9.4.1 **Long Task** 分析与拆分：`scheduler.postTask`、React Concurrent Features](./notes/09-performance/9.4-runtime-advanced/9.4.1.long-task.md)
- [ ] [9.4.2 **INP 优化**：输入延迟、事件处理器优化、debounce 策略升级](./notes/09-performance/9.4-runtime-advanced/9.4.2.inp.md)
- [ ] [9.4.3 **内存 profiling**：Heap Snapshot、Detached DOM、SPA 路由切换泄漏](./notes/09-performance/9.4-runtime-advanced/9.4.3.profiling.md)
- [ ] [9.4.4 **WeakRef / FinalizationRegistry** 在缓存场景的应用](./notes/09-performance/9.4-runtime-advanced/9.4.4.weakref-finalizationregistry.md)
- [ ] [9.4.5 **虚拟列表进阶**：可变高度、滚动回收池、`content-visibility`](./notes/09-performance/9.4-runtime-advanced/9.4.5.item-9-4-5.md)
- [ ] [9.4.6 **Web Worker** 生产级：任务队列、 transferable objects、Worker 池](./notes/09-performance/9.4-runtime-advanced/9.4.6.web-worker.md)
- [ ] [9.4.7 **requestIdleCallback** 与低优先级任务调度](./notes/09-performance/9.4-runtime-advanced/9.4.7.requestidlecallback.md)

### 9.5 SSR / 流式渲染性能

- [ ] [9.5.1 **Streaming HTML**：`renderToReadableStream`、Suspense 边界](./notes/09-performance/9.5-ssr-streaming/9.5.1.streaming-html.md)
- [ ] [9.5.2 **选择性水合** 与组件优先级](./notes/09-performance/9.5-ssr-streaming/9.5.2.item-9-5-2.md)
- [ ] [9.5.3 **TTFB vs FCP** 在 SSR 场景的权衡](./notes/09-performance/9.5-ssr-streaming/9.5.3.ttfb-vs-fcp.md)
- [ ] [9.5.4 **数据预取与水合**：TanStack Query `dehydrate/hydrate`](./notes/09-performance/9.5-ssr-streaming/9.5.4.item-9-5-4.md)
- [ ] [9.5.5 **Edge 渲染** 的数据访问限制与缓存策略](./notes/09-performance/9.5-ssr-streaming/9.5.5.edge.md)

### 9.6 能力锚点（阶段 9）

- 能为项目建立 **性能预算** 并接入 CI
- 能用 DevTools Memory / Performance 定位一次生产级性能或内存问题

---

## 阶段 10：安全工程与合规

### 10.1 前端安全基线

- [ ] [10.1.1 制定团队 **前端安全 Checklist**（发布前 / Code Review）](./notes/10-security/10.1-security-baseline/10.1.1.checklist.md)
- [ ] [10.1.2 **OWASP Top 10** 与 Web 前端相关项系统性梳理](./notes/10-security/10.1-security-baseline/10.1.2.owasp-top.md)
- [ ] [10.1.3 **威胁建模** 基础：STRIDE、数据流图、信任边界](./notes/10-security/10.1-security-baseline/10.1.3.item-10-1-3.md)
- [ ] [10.1.4 **Security Review** 在 PR 流程中的嵌入](./notes/10-security/10.1-security-baseline/10.1.4.security-review.md)

### 10.2 漏洞深度与防御

- [ ] [10.2.1 **XSS** 进阶：mXSS、DOM Clobbering、模板注入、`DOMPurify` 配置](./notes/10-security/10.2-vulnerabilities/10.2.1.xss.md)
- [ ] [10.2.2 **CSP** 生产级：`nonce`、`strict-dynamic`、`report-to`、`Content-Security-Policy-Report-Only`](./notes/10-security/10.2-vulnerabilities/10.2.2.csp.md)
- [ ] [10.2.3 **CSRF** 进阶：Double Submit Cookie、SameSite 策略选型](./notes/10-security/10.2-vulnerabilities/10.2.3.csrf.md)
- [ ] [10.2.4 **Clickjacking**：`X-Frame-Options`、`frame-ancestors`、UI Redressing](./notes/10-security/10.2-vulnerabilities/10.2.4.clickjacking.md)
- [ ] [10.2.5 **Open Redirect** 检测与 allowlist](./notes/10-security/10.2-vulnerabilities/10.2.5.open-redirect.md)
- [ ] [10.2.6 **Prototype Pollution** 与供应链中的传递](./notes/10-security/10.2-vulnerabilities/10.2.6.prototype-pollution.md)
- [ ] [10.2.7 **SRI（Subresource Integrity）** 与 CDN 资源完整性](./notes/10-security/10.2-vulnerabilities/10.2.7.sri-subresource-integrity.md)
- [ ] [10.2.8 **PostMessage** 跨窗口通信安全：`origin` 校验](./notes/10-security/10.2-vulnerabilities/10.2.8.postmessage.md)

### 10.3 认证与授权进阶

- [ ] [10.3.1 **OAuth 2.0 / OIDC** 深入：Authorization Code + **PKCE** 流程](./notes/10-security/10.3-auth-advanced/10.3.1.oauth-oidc.md)
- [ ] [10.3.2 **Refresh Token** 轮换、Reuse Detection](./notes/10-security/10.3-auth-advanced/10.3.2.refresh-token.md)
- [ ] [10.3.3 **Token 存储** 权衡：HttpOnly Cookie + BFF vs Memory-only vs Secure Storage](./notes/10-security/10.3-auth-advanced/10.3.3.token.md)
- [ ] [10.3.4 **WebAuthn / Passkey** 基本概念](./notes/10-security/10.3-auth-advanced/10.3.4.webauthn-passkey.md)
- [ ] [10.3.5 **RBAC / ABAC** 在前端的表达能力与 **权限数据** 来源](./notes/10-security/10.3-auth-advanced/10.3.5.rbac-abac.md)
- [ ] [10.3.6 **JWT** 陷阱：算法混淆、payload 信任、过期与吊销](./notes/10-security/10.3-auth-advanced/10.3.6.jwt.md)
- [ ] [10.3.7 📱 移动端对照：Web HttpOnly Cookie 会话 ≈ 服务端 Session；RN Keychain ≈ 无 XSS 的本地 Token 存储](./notes/10-security/10.3-auth-advanced/10.3.7.web-httponly-cookie-session-rn.md)

### 10.4 供应链与 Secrets

- [ ] [10.4.1 **npm 供应链安全**：lockfile 完整性、最小权限 Token、私有 registry](./notes/10-security/10.4-supply-chain/10.4.1.npm.md)
- [ ] [10.4.2 **Dependabot / Renovate** 策略与 emergency patch 流程](./notes/10-security/10.4-supply-chain/10.4.2.dependabot-renovate.md)
- [ ] [10.4.3 **SBOM** 概念与 `npm audit`、Socket、Snyk 等工具](./notes/10-security/10.4-supply-chain/10.4.3.sbom.md)
- [ ] [10.4.4 **Secrets 绝不进前端**：环境变量分层、构建时注入 vs 运行时注入](./notes/10-security/10.4-supply-chain/10.4.4.secrets.md)
- [ ] [10.4.5 **Source Map** 生产策略：仅上传监控平台、禁止公开访问](./notes/10-security/10.4-supply-chain/10.4.5.source-map.md)

### 10.5 隐私与合规

- [ ] [10.5.1 **GDPR / 个人信息保护** 对前端的要求：最小采集、 consent、删除权](./notes/10-security/10.5-privacy-compliance/10.5.1.gdpr.md)
- [ ] [10.5.2 **Cookie Consent** 与 CMP（Cookie Management Platform）集成](./notes/10-security/10.5-privacy-compliance/10.5.2.cookie-consent.md)
- [ ] [10.5.3 **PII 脱敏** 展示：日志、Session Replay、错误上报](./notes/10-security/10.5-privacy-compliance/10.5.3.pii.md)
- [ ] [10.5.4 **CSP / COOP / COEP / CORP** 安全头全套与跨域隔离](./notes/10-security/10.5-privacy-compliance/10.5.4.csp-coop-coep-corp.md)
- [ ] [10.5.5 **SOC2 / PCI** 对前端工程的常见要求（了解）](./notes/10-security/10.5-privacy-compliance/10.5.5.soc2-pci.md)

### 10.6 能力锚点（阶段 10）

- 能为团队输出 **CSP 与 Cookie 策略** 文档
- 能主持一次前端 **威胁建模** 或安全 Review

---

## 阶段 11：可观测性与生产运维

### 11.1 错误监控

- [ ] [11.1.1 **Sentry / Bugsnag** 集成：Source Map 上传、Release 追踪、环境标签](./notes/11-observability/11.1-error-monitoring/11.1.1.sentry-bugsnag.md)
- [ ] [11.1.2 **错误分级**：P0–P3、用户影响面、自动指派](./notes/11-observability/11.1-error-monitoring/11.1.2.item-11-1-2.md)
- [ ] [11.1.3 **Error Boundary** 策略：页面级 / 模块级 / 全局兜底](./notes/11-observability/11.1-error-monitoring/11.1.3.error-boundary.md)
- [ ] [11.1.4 **错误采样** 与配额控制](./notes/11-observability/11.1-error-monitoring/11.1.4.item-11-1-4.md)
- [ ] [11.1.5 **breadcrumbs** 与用户操作路径还原](./notes/11-observability/11.1-error-monitoring/11.1.5.breadcrumbs.md)

### 11.2 日志与指标

- [ ] [11.2.1 **结构化日志** 规范：level、traceId、userId（脱敏）](./notes/11-observability/11.2-logging-metrics/11.2.1.item-11-2-1.md)
- [ ] [11.2.2 **Distributed Tracing** 基础：OpenTelemetry、W3C traceparent](./notes/11-observability/11.2-logging-metrics/11.2.2.distributed-tracing.md)
- [ ] [11.2.3 **前端 Metrics**：自定义计数、histogram、Web Vitals 看板](./notes/11-observability/11.2-logging-metrics/11.2.3.metrics.md)
- [ ] [11.2.4 **Session Replay**（LogRocket、FullStory）与隐私边界](./notes/11-observability/11.2-logging-metrics/11.2.4.session-replay.md)
- [ ] [11.2.5 **Real User Monitoring (RUM)** 看板设计与告警阈值](./notes/11-observability/11.2-logging-metrics/11.2.5.real-user-monitoring-rum.md)

### 11.3 发布与变更管理

- [ ] [11.3.1 **Feature Flag**：LaunchDarkly、Unleash、自研开关；Kill Switch](./notes/11-observability/11.3-release-management/11.3.1.feature-flag.md)
- [ ] [11.3.2 **灰度发布 / Canary**：按用户百分比、地域、白名单](./notes/11-observability/11.3-release-management/11.3.2.canary.md)
- [ ] [11.3.3 **A/B 实验** 前端集成：分流、指标归因、实验污染防护](./notes/11-observability/11.3-release-management/11.3.3.a-b.md)
- [ ] [11.3.4 **Preview Deployment**：每个 PR 独立预览环境](./notes/11-observability/11.3-release-management/11.3.4.preview-deployment.md)
- [ ] [11.3.5 **回滚策略**：静态资源 hash 回滚、SSR 版本回退、数据库迁移协同](./notes/11-observability/11.3-release-management/11.3.5.item-11-3-5.md)
- [ ] [11.3.6 **Incident Response**：On-call、Runbook、Postmortem 模板](./notes/11-observability/11.3-release-management/11.3.6.incident-response.md)

### 11.4 基础设施协作

- [ ] [11.4.1 **CDN** 配置协作：缓存规则、Purge、Geo 路由](./notes/11-observability/11.4-infra/11.4.1.cdn.md)
- [ ] [11.4.2 **Nginx 进阶**：负载均衡、限流、反向代理缓存、WAF 对接](./notes/11-observability/11.4-infra/11.4.2.nginx.md)
- [ ] [11.4.3 **Docker** 多阶段构建 SSR 应用；健康检查](./notes/11-observability/11.4-infra/11.4.3.docker.md)
- [ ] [11.4.4 **Kubernetes** 基础：Deployment、HPA、Ingress — SSR 场景了解](./notes/11-observability/11.4-infra/11.4.4.kubernetes.md)
- [ ] [11.4.5 **GitHub Actions** 进阶：矩阵构建、缓存、环境 secrets、部署审批](./notes/11-observability/11.4-infra/11.4.5.github-actions.md)

### 11.5 能力锚点（阶段 11）

- 能主导搭建 **Sentry + Web Vitals** 监控闭环
- 能设计并文档化 **灰度 + 回滚** 流程

---

## 阶段 12：测试策略与设计系统

### 12.1 测试策略体系

- [ ] [12.1.1 编写团队 **测试策略文档**：测什么、不测什么、覆盖率预期](./notes/12-testing-design-system/12.1-testing-strategy/12.1.1.item-12-1-1.md)
- [ ] [12.1.2 **测试金字塔** 在 Web 团队的落地比例](./notes/12-testing-design-system/12.1-testing-strategy/12.1.2.item-12-1-2.md)
- [ ] [12.1.3 **Contract Testing**：Pact 等前后端契约测试](./notes/12-testing-design-system/12.1-testing-strategy/12.1.3.contract-testing.md)
- [ ] [12.1.4 **Visual Regression**：Chromatic、Percy、Lost Pixel](./notes/12-testing-design-system/12.1-testing-strategy/12.1.4.visual-regression.md)
- [ ] [12.1.5 **Mutation Testing** 概念（Stryker）— 了解](./notes/12-testing-design-system/12.1-testing-strategy/12.1.5.mutation-testing.md)
- [ ] [12.1.6 **E2E 规模化**：Playwright 并行、Sharding、Test Container](./notes/12-testing-design-system/12.1-testing-strategy/12.1.6.e2e.md)
- [ ] [12.1.7 **Flaky Test** 治理：重试策略、quarantine、根因分析](./notes/12-testing-design-system/12.1-testing-strategy/12.1.7.flaky-test.md)
- [ ] [12.1.8 **SSR / Hydration** 专项测试：双端 HTML 一致性](./notes/12-testing-design-system/12.1-testing-strategy/12.1.8.ssr-hydration.md)

### 12.2 专项测试

- [ ] [12.2.1 **a11y 测试流程**：axe 自动化 + 键盘走查 + 屏幕阅读器验收](./notes/12-testing-design-system/12.2-specialized-testing/12.2.1.a11y.md)
- [ ] [12.2.2 **性能回归测试**：Lighthouse CI、bundle diff](./notes/12-testing-design-system/12.2-specialized-testing/12.2.2.item-12-2-2.md)
- [ ] [12.2.3 **国际化测试**：伪本地化（pseudo-localization）、RTL 快照](./notes/12-testing-design-system/12.2-specialized-testing/12.2.3.item-12-2-3.md)
- [ ] [12.2.4 **跨浏览器测试**：BrowserStack、Playwright 多 browser project](./notes/12-testing-design-system/12.2-specialized-testing/12.2.4.item-12-2-4.md)

### 12.3 设计系统架构

- [ ] [12.3.1 **Design Token** 体系：Color、Spacing、Typography、Radius、Shadow](./notes/12-testing-design-system/12.3-design-system/12.3.1.design-token.md)
- [ ] [12.3.2 **Style Dictionary / Tokens Studio** 工作流：Figma → Code](./notes/12-testing-design-system/12.3-design-system/12.3.2.style-dictionary-tokens-studio.md)
- [ ] [12.3.3 **Storybook** 作为组件文档、交互验收与视觉回归基线](./notes/12-testing-design-system/12.3-design-system/12.3.3.storybook.md)
- [ ] [12.3.4 **组件 API 设计原则**：组合 vs 配置、Compound Components、slot](./notes/12-testing-design-system/12.3-design-system/12.3.4.api.md)
- [ ] [12.3.5 **组件版本化**：SemVer、Breaking Change、Codemod 迁移](./notes/12-testing-design-system/12.3-design-system/12.3.5.item-12-3-5.md)
- [ ] [12.3.6 **主题架构**：CSS 变量、class 策略、多品牌 / 白标](./notes/12-testing-design-system/12.3-design-system/12.3.6.item-12-3-6.md)
- [ ] [12.3.7 **跨框架设计系统**：Web Components 封装 — 选学](./notes/12-testing-design-system/12.3-design-system/12.3.7.item-12-3-7.md)

### 12.4 组件库工程

- [ ] [12.4.1 **Tree-shaking** 友好的导出结构](./notes/12-testing-design-system/12.4-component-library/12.4.1.tree-shaking.md)
- [ ] [12.4.2 **Peer Dependencies** 管理（React 单例）](./notes/12-testing-design-system/12.4-component-library/12.4.2.peer-dependencies.md)
- [ ] [12.4.3 **按需加载** 与 `sideEffects` 声明](./notes/12-testing-design-system/12.4-component-library/12.4.3.item-12-4-3.md)
- [ ] [12.4.4 **Changelog** 自动化（Changesets）](./notes/12-testing-design-system/12.4-component-library/12.4.4.changelog.md)
- [ ] [12.4.5 组件 **无障碍** 验收标准内建到 CI](./notes/12-testing-design-system/12.4-component-library/12.4.5.item-12-4-5.md)

### 12.5 能力锚点（阶段 12）

- 能定义并推行团队 **测试策略 + Storybook 规范**
- 能设计一套 **Design Token** 从 Figma 到代码的流水线

---

## 阶段 13：平台化工程

### 13.1 Monorepo 深入

- [ ] [13.1.1 **Turborepo / Nx** 选型与 task pipeline](./notes/13-platform/13.1-monorepo/13.1.1.turborepo-nx.md)
- [ ] [13.1.2 **依赖图** 分析与 affected 构建](./notes/13-platform/13.1-monorepo/13.1.2.item-13-1-2.md)
- [ ] [13.1.3 **Remote Cache** 配置与 CI 加速](./notes/13-platform/13.1-monorepo/13.1.3.remote-cache.md)
- [ ] [13.1.4 **Workspace 协议**：`workspace:*`、内部包版本](./notes/13-platform/13.1-monorepo/13.1.4.workspace.md)
- [ ] [13.1.5 **边界 enforcement**：模块不可跨层 import](./notes/13-platform/13.1-monorepo/13.1.5.enforcement.md)
- [ ] [13.1.6 📱 移动端对照：Monorepo ≈ Android Gradle 多 Module / Melos（Flutter）](./notes/13-platform/13.1-monorepo/13.1.6.monorepo-android-gradle-module-melos.md)

### 13.2 发布与依赖治理

- [ ] [13.2.1 **Changesets** 或 **semantic-release** 自动化版本](./notes/13-platform/13.2-release-deps/13.2.1.changesets.md)
- [ ] [13.2.2 **内部 npm 包** 发布：Verdaccio / Artifactory / GitHub Packages](./notes/13-platform/13.2-release-deps/13.2.2.npm.md)
- [ ] [13.2.3 **Renovate / Dependabot** 策略：分组、自动合并条件、major 升级 playbook](./notes/13-platform/13.2-release-deps/13.2.3.renovate-dependabot.md)
- [ ] [13.2.4 **Lockfile** 政策与 `npm ci` 在 CI 中的强制](./notes/13-platform/13.2-release-deps/13.2.4.lockfile.md)
- [ ] [13.2.5 **Catalog / Override** 统一传递依赖版本（pnpm catalog）](./notes/13-platform/13.2-release-deps/13.2.5.catalog-override.md)

### 13.3 构建系统进阶

- [ ] [13.3.1 **Module Federation** 生产踩坑与调试](./notes/13-platform/13.3-build-advanced/13.3.1.module-federation.md)
- [ ] [13.3.2 **Custom Webpack / Vite Plugin** 开发基础](./notes/13-platform/13.3-build-advanced/13.3.2.custom-webpack-vite-plugin.md)
- [ ] [13.3.3 **esbuild / SWC** 在工具链中的位置](./notes/13-platform/13.3-build-advanced/13.3.3.esbuild-swc.md)
- [ ] [13.3.4 **Persistent Cache** 与 build 性能 profiling](./notes/13-platform/13.3-build-advanced/13.3.4.persistent-cache.md)
- [ ] [13.3.5 **Library Mode** 打包：ESM / CJS / DTS 输出策略](./notes/13-platform/13.3-build-advanced/13.3.5.library-mode.md)

### 13.4 浏览器兼容与渐进增强

- [ ] [13.4.1 **Browserslist** 策略与 `@vitejs/plugin-legacy`](./notes/13-platform/13.4-browser-compat/13.4.1.browserslist.md)
- [ ] [13.4.2 **Polyfill** 按需：`core-js`、Polyfill.io 争议与替代](./notes/13-platform/13.4-browser-compat/13.4.2.polyfill.md)
- [ ] [13.4.3 **Progressive Enhancement** vs **Graceful Degradation**](./notes/13-platform/13.4-browser-compat/13.4.3.progressive-enhancement.md)
- [ ] [13.4.4 **Support Matrix** 文档与 QA 对齐流程](./notes/13-platform/13.4-browser-compat/13.4.4.support-matrix.md)
- [ ] [13.4.5 **Feature Detection** vs User Agent Sniffing](./notes/13-platform/13.4-browser-compat/13.4.5.feature-detection.md)
- [ ] [13.4.6 **CSS `@supports`** 与 JS capability check](./notes/13-platform/13.4-browser-compat/13.4.6.supports.md)
- [ ] [13.4.7 **Print CSS** 与导出/打印场景 — B 端选学](./notes/13-platform/13.4-browser-compat/13.4.7.print-css.md)

### 13.5 开发者体验（DX）

- [ ] [13.5.1 **eslint-config** 组织级共享与版本发布](./notes/13-platform/13.5-dx/13.5.1.eslint-config.md)
- [ ] [13.5.2 **自定义 ESLint 规则** 强制执行架构约束](./notes/13-platform/13.5-dx/13.5.2.eslint.md)
- [ ] [13.5.3 **Codemod**（jscodeshift）大规模迁移](./notes/13-platform/13.5-dx/13.5.3.codemod.md)
- [ ] [13.5.4 **CLI 脚手架** 内部项目初始化模板](./notes/13-platform/13.5-dx/13.5.4.cli.md)
- [ ] [13.5.5 **VS Code 工作区** 推荐扩展与 Snippets 统一](./notes/13-platform/13.5-dx/13.5.5.vs-code.md)

### 13.6 能力锚点（阶段 13）

- 能维护一个 **Monorepo** 含 apps + packages + 统一 CI
- 能输出 **Support Matrix + Polyfill** 策略文档

---

## 阶段 14：BFF / Node / Edge 运行时

> 高级前端常需主导或深度协作 SSR 运行时与 BFF，本节不要求全栈专家级，但需能 **独立设计与实现中间层**。

### 14.1 Node.js 运行时

- [ ] [14.1.1 **Node Event Loop** 与浏览器差异：phases、microtask、`process.nextTick`](./notes/14-bff-runtime/14.1-node-runtime/14.1.1.node-event-loop.md)
- [ ] [14.1.2 **Stream** 与背压（Backpressure）](./notes/14-bff-runtime/14.1-node-runtime/14.1.2.stream.md)
- [ ] [14.1.3 **Worker Threads** 与 CPU 密集任务](./notes/14-bff-runtime/14.1-node-runtime/14.1.3.worker-threads.md)
- [ ] [14.1.4 **环境变量** 与配置管理：`dotenv`、12-factor](./notes/14-bff-runtime/14.1-node-runtime/14.1.4.item-14-1-4.md)
- [ ] [14.1.5 **进程管理**：PM2、cluster mode 基本概念](./notes/14-bff-runtime/14.1-node-runtime/14.1.5.item-14-1-5.md)

### 14.2 BFF 实现

- [ ] [14.2.1 **Fastify / Hono / Express** 选型与中间件模式](./notes/14-bff-runtime/14.2-bff-impl/14.2.1.fastify-hono-express.md)
- [ ] [14.2.2 **请求聚合**：并行 vs 串行、超时与 Partial Failure](./notes/14-bff-runtime/14.2-bff-impl/14.2.2.item-14-2-2.md)
- [ ] [14.2.3 **鉴权中间件**：Session 校验、JWT 验证、权限注入](./notes/14-bff-runtime/14.2-bff-impl/14.2.3.item-14-2-3.md)
- [ ] [14.2.4 **Rate Limiting** 与 CORS 在 BFF 层统一](./notes/14-bff-runtime/14.2-bff-impl/14.2.4.rate-limiting.md)
- [ ] [14.2.5 **错误映射**：后端错误 → 前端友好结构](./notes/14-bff-runtime/14.2-bff-impl/14.2.5.item-14-2-5.md)
- [ ] [14.2.6 **OpenAPI** 生成与契约同步](./notes/14-bff-runtime/14.2-bff-impl/14.2.6.openapi.md)

### 14.3 SSR 框架运行时

- [ ] [14.3.1 **Next.js App Router** 深入：Server Components、Route Handlers、Middleware](./notes/14-bff-runtime/14.3-ssr-runtime/14.3.1.next.js-app-router.md)
- [ ] [14.3.2 **Nuxt Nitro** 服务器引擎概念](./notes/14-bff-runtime/14.3-ssr-runtime/14.3.2.nuxt-nitro.md)
- [ ] [14.3.3 **数据获取** 在 SSR 中的 waterfall 优化](./notes/14-bff-runtime/14.3-ssr-runtime/14.3.3.item-14-3-3.md)
- [ ] [14.3.4 **Cookie / Header** 在 Server Component 中的访问](./notes/14-bff-runtime/14.3-ssr-runtime/14.3.4.cookie-header.md)
- [ ] [14.3.5 **Streaming** 与 Error Handling 边界](./notes/14-bff-runtime/14.3-ssr-runtime/14.3.5.streaming.md)

### 14.4 Edge Runtime

- [ ] [14.4.1 **Edge vs Node** 限制：无 Node API、冷启动、CPU/内存配额](./notes/14-bff-runtime/14.4-edge-runtime/14.4.1.edge-vs-node.md)
- [ ] [14.4.2 **Vercel Edge Functions / Cloudflare Workers** 使用场景](./notes/14-bff-runtime/14.4-edge-runtime/14.4.2.vercel-edge-functions-cloudflare-workers.md)
- [ ] [14.4.3 **Edge Middleware**：鉴权、Geo 路由、A/B 分流](./notes/14-bff-runtime/14.4-edge-runtime/14.4.3.edge-middleware.md)
- [ ] [14.4.4 **KV / D1 / Edge Config** 等 Edge 存储](./notes/14-bff-runtime/14.4-edge-runtime/14.4.4.kv-d1-edge-config.md)
- [ ] [14.4.5 **Edge 缓存** 与 **Stale-While-Revalidate** 在 CDN 层](./notes/14-bff-runtime/14.4-edge-runtime/14.4.5.edge.md)

### 14.5 数据层协作

- [ ] [14.5.1 **GraphQL** 深入：Schema Stitching、N+1、DataLoader、Persisted Queries](./notes/14-bff-runtime/14.5-data-layer/14.5.1.graphql.md)
- [ ] [14.5.2 **Apollo Client / urql** 缓存策略与 SSR](./notes/14-bff-runtime/14.5-data-layer/14.5.2.apollo-client-urql.md)
- [ ] [14.5.3 **Redis** 在 Session / Rate Limit 中的角色 — 了解](./notes/14-bff-runtime/14.5-data-layer/14.5.3.redis.md)
- [ ] [14.5.4 **数据库基础**：能阅读 Prisma schema、理解 migration 对前端的影响](./notes/14-bff-runtime/14.5-data-layer/14.5.4.item-14-5-4.md)
- [ ] [14.5.5 **WebSocket / SSE** 生产级：心跳、重连指数退避、连接池](./notes/14-bff-runtime/14.5-data-layer/14.5.5.websocket-sse.md)

### 14.6 文件与上传

- [ ] [14.6.1 **分片上传**、断点续传、并发控制](./notes/14-bff-runtime/14.6-file-upload/14.6.1.item-14-6-1.md)
- [ ] [14.6.2 **预签名 URL** 直传 OSS / S3](./notes/14-bff-runtime/14.6-file-upload/14.6.2.url.md)
- [ ] [14.6.3 **上传安全**：MIME 校验、大小限制、病毒扫描对接](./notes/14-bff-runtime/14.6-file-upload/14.6.3.item-14-6-3.md)

### 14.7 能力锚点（阶段 14）

- 能独立实现一个 **BFF 层** 完成鉴权 + 接口聚合
- 能解释 **Edge vs Origin** 渲染对数据一致性的影响

---

## 阶段 15：项目整合、治理与工程管理

### 15.1 技术决策与协作

- [ ] [15.1.1 **技术选型** 流程：PoC、Spike、评审会、决策记录](./notes/15-project-delivery/15.1-tech-decisions/15.1.1.item-15-1-1.md)
- [ ] [15.1.2 **Build vs Buy**：自研组件库 vs 采购 SaaS / 开源方案](./notes/15-project-delivery/15.1-tech-decisions/15.1.2.build-vs-buy.md)
- [ ] [15.1.3 **跨团队 API 契约** 协作：Mock First、OpenAPI、联调节奏](./notes/15-project-delivery/15.1-tech-decisions/15.1.3.api.md)
- [ ] [15.1.4 与 **设计 / 产品 / 后端 / QA / SRE** 的协作界面定义](./notes/15-project-delivery/15.1-tech-decisions/15.1.4.qa-sre.md)
- [ ] [15.1.5 **Estimation**：Story 拆分、风险缓冲、Unknown Unknowns](./notes/15-project-delivery/15.1-tech-decisions/15.1.5.estimation.md)

### 15.2 Code Review 与质量文化

- [ ] [15.2.1 **Review 清单**：正确性、边界、性能、安全、a11y、可测试性](./notes/15-project-delivery/15.2-code-review/15.2.1.review.md)
- [ ] [15.2.2 **Review 规模** 控制与 LGTM 文化](./notes/15-project-delivery/15.2-code-review/15.2.2.review.md)
- [ ] [15.2.3 **技术债务** 识别、量化（Hotspot）与偿还计划](./notes/15-project-delivery/15.2-code-review/15.2.3.item-15-2-3.md)
- [ ] [15.2.4 **Boy Scout Rule** 与渐进式重构](./notes/15-project-delivery/15.2-code-review/15.2.4.boy-scout-rule.md)

### 15.3 工程管理与团队协作

- [ ] [15.3.1 **任务拆分与协作分工**：Story 分解、联调节奏、模块 Owner](./notes/15-project-delivery/15.3-team-collaboration/15.3.1.task-collaboration.md)
- [ ] [15.3.2 **Pair Programming / Mob** 在前端场景的运用](./notes/15-project-delivery/15.3-team-collaboration/15.3.2.pair-programming-mob.md)
- [ ] [15.3.3 **知识分享** 机制：Tech Talk、内部 Wiki、Onboarding 文档](./notes/15-project-delivery/15.3-team-collaboration/15.3.3.item-15-3-3.md)
- [ ] [15.3.4 **前端能力评估维度**：用于排期、Review 与模块分工（工程视角，非招聘）](./notes/15-project-delivery/15.3-team-collaboration/15.3.4.skill-assessment.md)
- [ ] [15.3.5 **Onboarding Checklist** for 新成员](./notes/15-project-delivery/15.3-team-collaboration/15.3.5.onboarding-checklist.md)

### 15.4 遗留系统与迁移

- [ ] [15.4.1 **Strangler Fig** 渐进式替换模式](./notes/15-project-delivery/15.4-legacy-migration/15.4.1.strangler-fig.md)
- [ ] [15.4.2 **jQuery / 老 MPA → React/Vue** 迁移策略](./notes/15-project-delivery/15.4-legacy-migration/15.4.2.jquery-mpa-react-vue.md)
- [ ] [15.4.3 **双跑（Parallel Run）** 与 Feature Flag 切流](./notes/15-project-delivery/15.4-legacy-migration/15.4.3.parallel-run.md)
- [ ] [15.4.4 **CSS 遗留债务** 治理：全局命名空间、!important、层叠上下文](./notes/15-project-delivery/15.4-legacy-migration/15.4.4.css.md)
- [ ] [15.4.5 **Big Bang vs Incremental** 迁移风险评估](./notes/15-project-delivery/15.4-legacy-migration/15.4.5.big-bang-vs-incremental.md)
- [ ] [15.4.6 **Codemod + 自动化测试** 保障迁移安全](./notes/15-project-delivery/15.4-legacy-migration/15.4.6.codemod.md)

### 15.5 国际化与无障碍（生产级）

- [ ] [15.5.1 **i18n 架构**：namespace 懒加载、ICU MessageFormat、复数与性别](./notes/15-project-delivery/15.5-i18n-a11y-prod/15.5.1.i18n.md)
- [ ] [15.5.2 **RTL** 生产级：逻辑属性、镜像图标、BiDi 混排](./notes/15-project-delivery/15.5-i18n-a11y-prod/15.5.2.rtl.md)
- [ ] [15.5.3 **时区**：`Intl.DateTimeFormat`、dayjs timezone、服务端 UTC 约定](./notes/15-project-delivery/15.5-i18n-a11y-prod/15.5.3.item-15-5-3.md)
- [ ] [15.5.4 **WCAG 2.2 AA** 达标流程与 VPAT 报告基础](./notes/15-project-delivery/15.5-i18n-a11y-prod/15.5.4.wcag-aa.md)
- [ ] [15.5.5 **SPA 路由切换** 焦点管理：`focus-trap`、skip link、live region](./notes/15-project-delivery/15.5-i18n-a11y-prod/15.5.5.spa.md)
- [ ] [15.5.6 复杂组件 a11y：**Combobox、DatePicker、Modal** WAI-ARIA 模式](./notes/15-project-delivery/15.5-i18n-a11y-prod/15.5.6.combobox-datepicker-modal.md)

### 15.6 Web 平台进阶（按业务选学）

- [ ] [15.6.1 **View Transitions API** 与 SPA 路由动画](./notes/15-project-delivery/15.6-web-platform-advanced/15.6.1.view-transitions-api.md)
- [ ] [15.6.2 **Navigation API**](./notes/15-project-delivery/15.6-web-platform-advanced/15.6.2.navigation-api.md)
- [ ] [15.6.3 **OPFS（Origin Private File System）**](./notes/15-project-delivery/15.6-web-platform-advanced/15.6.3.opfs-origin-private-file-system.md)
- [ ] [15.6.4 **WebRTC** 基础（音视频场景）](./notes/15-project-delivery/15.6-web-platform-advanced/15.6.4.webrtc.md)
- [ ] [15.6.5 **WebAuthn / Payment Request API**](./notes/15-project-delivery/15.6-web-platform-advanced/15.6.5.webauthn-payment-request-api.md)
- [ ] [15.6.6 **Import Maps** 与原生 ESM CDN](./notes/15-project-delivery/15.6-web-platform-advanced/15.6.6.import-maps.md)
- [ ] [15.6.7 **WebAssembly** 线程、SIMD、与 JS 边界](./notes/15-project-delivery/15.6-web-platform-advanced/15.6.7.webassembly.md)
- [ ] [15.6.8 **WebGL / Three.js** 3D 场景 — 可视化选学](./notes/15-project-delivery/15.6-web-platform-advanced/15.6.8.webgl-three.js.md)

### 15.7 能力锚点（阶段 15）

- 能主导一次 **遗留模块迁移** 从方案到上线
- 能输出 **迁移与整合方案文档**，协调跨团队评审与落地

---
