# 阶段 8–11：架构层

> 架构设计 · 深度性能 · 安全合规 · 可观测性与运维  
> [← 03-application](./03-application-stages-6-7.md) · [← 返回总览](../KNOWLEDGE_MAP.md) · [下一部分 →](./05-platform-stages-12-14.md)

---

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
- [ ] [9.1.5 **自定义性能标记**：](./notes/09-performance/9.1-performance-metrics/9.1.5.item-9-1-5.md)`performance.mark` [/](./notes/09-performance/9.1-performance-metrics/9.1.5.item-9-1-5.md) `measure`[、React Profiler](./notes/09-performance/9.1-performance-metrics/9.1.5.item-9-1-5.md)
- [ ] [9.1.6 **性能回归** 检测：CI 中 Lighthouse CI、bundle 体积门禁](./notes/09-performance/9.1-performance-metrics/9.1.6.item-9-1-6.md)
- [ ] [9.1.7 📱 移动端对照：Web RUM ≈ Firebase Performance / 自建 APM 客户端上报](./notes/09-performance/9.1-performance-metrics/9.1.7.web-rum-firebase-performance-apm.md)



### 9.2 性能预算与治理

- [ ] [9.2.1 **Performance Budget** 定义：JS/CSS 体积、请求数、LCP/INP 阈值](./notes/09-performance/9.2-performance-budget/9.2.1.performance-budget.md)
- [ ] [9.2.2 **Bundle 分析**：rollup-plugin-visualizer、webpack-bundle-analyzer、](./notes/09-performance/9.2-performance-budget/9.2.2.bundle.md)`source-map-explorer`
- [ ] [9.2.3 **CI 门禁**：bundlesize、size-limit、PR 评论机器人](./notes/09-performance/9.2-performance-budget/9.2.3.ci.md)
- [ ] [9.2.4 **第三方脚本审计** 流程：分类、延迟加载、移除冗余](./notes/09-performance/9.2-performance-budget/9.2.4.item-9-2-4.md)
- [ ] [9.2.5 **Partytown** 将第三方脚本移至 Web Worker 的思路](./notes/09-performance/9.2-performance-budget/9.2.5.partytown.md)



### 9.3 加载性能进阶

- [ ] [9.3.1 **Critical CSS** 提取与内联策略](./notes/09-performance/9.3-loading-advanced/9.3.1.critical-css.md)
- [ ] [9.3.2 **字体优化**：](./notes/09-performance/9.3-loading-advanced/9.3.2.item-9-3-2.md)`font-display`[、subset、preload、FOIT/FOUT 治理](./notes/09-performance/9.3-loading-advanced/9.3.2.item-9-3-2.md)
- [ ] [9.3.3 **图片管线**：CDN 变换、blur placeholder、LQIP、AVIF/WebP 回退链](./notes/09-performance/9.3-loading-advanced/9.3.3.item-9-3-3.md)
- [ ] [9.3.4 **Speculation Rules API**、](./notes/09-performance/9.3-loading-advanced/9.3.4.speculation-rules-api.md)`<link rel="prefetch/prerender">` [产品化](./notes/09-performance/9.3-loading-advanced/9.3.4.speculation-rules-api.md)
- [ ] [9.3.5 **HTTP/3**、Early Hints (103)、103 vs Server Push 历史](./notes/09-performance/9.3-loading-advanced/9.3.5.http.md)
- [ ] [9.3.6 **Edge 缓存** 与 **CDN 缓存键** 设计（Query String、Cookie Vary）](./notes/09-performance/9.3-loading-advanced/9.3.6.edge.md)



### 9.4 运行时性能进阶

- [ ] [9.4.1 **Long Task** 分析与拆分：](./notes/09-performance/9.4-runtime-advanced/9.4.1.long-task.md)`scheduler.postTask`[、React Concurrent Features](./notes/09-performance/9.4-runtime-advanced/9.4.1.long-task.md)
- [ ] [9.4.2 **INP 优化**：输入延迟、事件处理器优化、debounce 策略升级](./notes/09-performance/9.4-runtime-advanced/9.4.2.inp.md)
- [ ] [9.4.3 **内存 profiling**：Heap Snapshot、Detached DOM、SPA 路由切换泄漏](./notes/09-performance/9.4-runtime-advanced/9.4.3.profiling.md)
- [ ] [9.4.4 **WeakRef / FinalizationRegistry** 在缓存场景的应用](./notes/09-performance/9.4-runtime-advanced/9.4.4.weakref-finalizationregistry.md)
- [ ] [9.4.5 **虚拟列表进阶**：可变高度、滚动回收池、](./notes/09-performance/9.4-runtime-advanced/9.4.5.item-9-4-5.md)`content-visibility`
- [ ] [9.4.6 **Web Worker** 生产级：任务队列、 transferable objects、Worker 池](./notes/09-performance/9.4-runtime-advanced/9.4.6.web-worker.md)
- [ ] [9.4.7 **requestIdleCallback** 与低优先级任务调度](./notes/09-performance/9.4-runtime-advanced/9.4.7.requestidlecallback.md)



### 9.5 SSR / 流式渲染性能

- [ ] [9.5.1 **Streaming HTML**：](./notes/09-performance/9.5-ssr-streaming/9.5.1.streaming-html.md)`renderToReadableStream`[、Suspense 边界](./notes/09-performance/9.5-ssr-streaming/9.5.1.streaming-html.md)
- [ ] [9.5.2 **选择性水合** 与组件优先级](./notes/09-performance/9.5-ssr-streaming/9.5.2.item-9-5-2.md)
- [ ] [9.5.3 **TTFB vs FCP** 在 SSR 场景的权衡](./notes/09-performance/9.5-ssr-streaming/9.5.3.ttfb-vs-fcp.md)
- [ ] [9.5.4 **数据预取与水合**：TanStack Query](./notes/09-performance/9.5-ssr-streaming/9.5.4.item-9-5-4.md) `dehydrate/hydrate`
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

- [ ] [10.2.1 **XSS** 进阶：mXSS、DOM Clobbering、模板注入、](./notes/10-security/10.2-vulnerabilities/10.2.1.xss.md)`DOMPurify` [配置](./notes/10-security/10.2-vulnerabilities/10.2.1.xss.md)
- [ ] [10.2.2 **CSP** 生产级：](./notes/10-security/10.2-vulnerabilities/10.2.2.csp.md)`nonce`[、](./notes/10-security/10.2-vulnerabilities/10.2.2.csp.md)`strict-dynamic`[、](./notes/10-security/10.2-vulnerabilities/10.2.2.csp.md)`report-to`[、](./notes/10-security/10.2-vulnerabilities/10.2.2.csp.md)`Content-Security-Policy-Report-Only`
- [ ] [10.2.3 **CSRF** 进阶：Double Submit Cookie、SameSite 策略选型](./notes/10-security/10.2-vulnerabilities/10.2.3.csrf.md)
- [ ] [10.2.4 **Clickjacking**：](./notes/10-security/10.2-vulnerabilities/10.2.4.clickjacking.md)`X-Frame-Options`[、](./notes/10-security/10.2-vulnerabilities/10.2.4.clickjacking.md)`frame-ancestors`[、UI Redressing](./notes/10-security/10.2-vulnerabilities/10.2.4.clickjacking.md)
- [ ] [10.2.5 **Open Redirect** 检测与 allowlist](./notes/10-security/10.2-vulnerabilities/10.2.5.open-redirect.md)
- [ ] [10.2.6 **Prototype Pollution** 与供应链中的传递](./notes/10-security/10.2-vulnerabilities/10.2.6.prototype-pollution.md)
- [ ] [10.2.7 **SRI（Subresource Integrity）** 与 CDN 资源完整性](./notes/10-security/10.2-vulnerabilities/10.2.7.sri-subresource-integrity.md)
- [ ] [10.2.8 **PostMessage** 跨窗口通信安全：](./notes/10-security/10.2-vulnerabilities/10.2.8.postmessage.md)`origin` [校验](./notes/10-security/10.2-vulnerabilities/10.2.8.postmessage.md)



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
- [ ] [10.4.3 **SBOM** 概念与](./notes/10-security/10.4-supply-chain/10.4.3.sbom.md) `npm audit`[、Socket、Snyk 等工具](./notes/10-security/10.4-supply-chain/10.4.3.sbom.md)
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
