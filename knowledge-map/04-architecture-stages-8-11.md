<a id="阶段-811架构层"></a>

# 阶段 8–11：架构取舍、性能优化、安全与监控

> Vue/Nuxt 模块划分 · 性能测量 · 安全防护 · 错误与发布\
> [← 03-application](./03-application-stages-6-7.md) · [← 返回总览](../KNOWLEDGE_MAP.md) · [下一部分 →](./05-platform-stages-12-14.md)

---

<a id="阶段-8前端架构与系统设计"></a>

## 阶段 8：Vue/Nuxt 模块划分、状态与渲染选型

> 阶段 8–11 用于在首个产品交付之后深化架构与生产治理，不是第一次写页面的前置门槛。按实际风险选择专题：微前端、复杂插件系统、CRDT/CQRS 和 Edge 渲染只在业务需要时学习。通用原理以 Vue/Nuxt 为主例，React/Next.js 作为对照选修。先修关系与验收方式见[学习主线](../docs/LEARNING_PATH.md)。



<a id="81-架构思维与文档"></a>

### 8.1 需求约束、RFC/ADR 与模块边界文档

- [ ] [8.1.1 **技术 RFC / ADR** 撰写：背景、目标、备选方案、权衡矩阵、决策与后果](../learning/1-notes/08-architecture/8.1-architecture-docs/8.1.1.rfc-adr.md)
- [ ] [8.1.2 **非功能需求（NFR）** 分析：性能、可用性、安全、可维护性、可扩展性](../learning/1-notes/08-architecture/8.1-architecture-docs/8.1.2.nfr.md)
- [ ] [8.1.3 **架构图** 绘制：C4 模型（Context / Container / Component）基础](../learning/1-notes/08-architecture/8.1-architecture-docs/8.1.3.item-8-1-3.md)
- [ ] [8.1.4 **边界划分**：按业务域（Domain）vs 按技术层（Layer）的利弊](../learning/1-notes/08-architecture/8.1-architecture-docs/8.1.4.item-8-1-4.md)
- [ ] [8.1.5 **依赖规则**：单向依赖、禁止循环依赖、eslint-plugin-boundaries 等 enforcement](../learning/1-notes/08-architecture/8.1-architecture-docs/8.1.5.item-8-1-5.md)
- [ ] [8.1.6 📱 移动端对照：Android 模块化 / Flutter Feature Module ≈ 前端 Feature-Sliced 划分](../learning/1-notes/08-architecture/8.1-architecture-docs/8.1.6.android-flutter-feature-module-feature-sliced.md)



<a id="82-应用架构模式"></a>

### 8.2 Vue/Nuxt 业务分层与依赖划分

- [ ] [8.2.1 **Feature-Sliced Design (FSD)**：一种可选业务域划分方式；与 Vue/Nuxt 约定目录协调，避免机械套层](../learning/1-notes/08-architecture/8.2-app-architecture/8.2.1.feature-sliced-design-fsd.md)
- [ ] [8.2.2 **分层架构**：Presentation → Application → Domain → Infrastructure](../learning/1-notes/08-architecture/8.2-app-architecture/8.2.2.item-8-2-2.md)
- [ ] [8.2.3 **Container / Presentation** 组件分离在大型项目中的演进](../learning/1-notes/08-architecture/8.2-app-architecture/8.2.3.container-presentation.md)
- [ ] [8.2.4 **模块化路由**：按路由拆包 vs 按功能域拆包的权衡](../learning/1-notes/08-architecture/8.2-app-architecture/8.2.4.item-8-2-4.md)
- [ ] [8.2.5 **配置驱动 UI**：JSON Schema 表单、低代码渲染引擎思路](../learning/1-notes/08-architecture/8.2-app-architecture/8.2.5.ui.md)
- [ ] [8.2.6 **插件化架构**：扩展点、注册表、Sandbox 隔离](../learning/1-notes/08-architecture/8.2-app-architecture/8.2.6.item-8-2-6.md)



<a id="83-渲染架构选型"></a>

### 8.3 CSR/SSR/SSG 渲染模式取舍

- [ ] [8.3.1 **CSR / SSR / SSG / ISR / Streaming SSR** 深度对比：TTFB、FCP、SEO、成本、复杂度](../learning/1-notes/08-architecture/8.3-rendering/8.3.1.csr-ssr-ssg-isr-streaming.md)
- [ ] [8.3.2 **React Server Components (RSC)** 与 Server Actions 概念与边界——React/Next.js 分支选修](../learning/1-notes/08-architecture/8.3-rendering/8.3.2.react-server-components-rsc.md)
- [ ] [8.3.3 **Partial Hydration / Selective Hydration** 与 Islands 架构（Astro 思路）](../learning/1-notes/08-architecture/8.3-rendering/8.3.3.partial-hydration-selective-hydration.md)
- [ ] [8.3.4 **水合（Hydration）** 不匹配：成因、检测、修复策略](../learning/1-notes/08-architecture/8.3-rendering/8.3.4.hydration.md)
- [ ] [8.3.5 **同构代码** 规范：浏览器 API 守卫、每请求状态与凭据隔离、序列化和公开 payload 边界](../learning/1-notes/08-architecture/8.3-rendering/8.3.5.item-8-3-5.md)
- [ ] [8.3.6 **Edge SSR** vs **Origin SSR**：延迟、缓存、数据一致性](../learning/1-notes/08-architecture/8.3-rendering/8.3.6.edge-ssr.md)
- [ ] [8.3.7 输出 **渲染架构决策树**，能向团队解释选型理由](../learning/1-notes/08-architecture/8.3-rendering/8.3.7.item-8-3-7.md)



<a id="84-微前端与大型应用"></a>

### 8.4 微前端与 Module Federation（按需）

- [ ] [8.4.1 **微前端** 动机：独立部署、团队自治、技术栈共存](../learning/1-notes/08-architecture/8.4-micro-frontends/8.4.1.item-8-4-1.md)
- [ ] [8.4.2 **集成方式**：构建时（Module Federation）vs 运行时（single-spa、iframe、Web Components）](../learning/1-notes/08-architecture/8.4-micro-frontends/8.4.2.item-8-4-2.md)
- [ ] [8.4.3 **Module Federation** 深入：shared 依赖、singleton、版本对齐、远程入口](../learning/1-notes/08-architecture/8.4-micro-frontends/8.4.3.module-federation.md)
- [ ] [8.4.4 **样式隔离**：Shadow DOM、CSS Modules、CSS-in-JS 冲突、全局污染](../learning/1-notes/08-architecture/8.4-micro-frontends/8.4.4.item-8-4-4.md)
- [ ] [8.4.5 **路由协调**：基座路由、子应用激活、404 与 deep link](../learning/1-notes/08-architecture/8.4-micro-frontends/8.4.5.item-8-4-5.md)
- [ ] [8.4.6 **跨应用通信**：CustomEvent、Broadcast Channel、全局 Store 反模式](../learning/1-notes/08-architecture/8.4-micro-frontends/8.4.6.item-8-4-6.md)
- [ ] [8.4.7 **微前端** 的反模式与何时 **不应** 采用微前端](../learning/1-notes/08-architecture/8.4-micro-frontends/8.4.7.item-8-4-7.md)



<a id="85-bff-与-api-层架构"></a>

### 8.5 BFF 接口聚合与前后端职责划分

- [ ] [8.5.1 **BFF（Backend for Frontend）** 模式：聚合、裁剪、鉴权下沉](../learning/1-notes/08-architecture/8.5-bff/8.5.1.bff-backend-for-frontend.md)
- [ ] [8.5.2 BFF vs 直连后端 API：何时引入 BFF](../learning/1-notes/08-architecture/8.5-bff/8.5.2.bff-vs-api-bff.md)
- [ ] [8.5.3 **GraphQL BFF** vs **REST BFF** 场景对比](../learning/1-notes/08-architecture/8.5-bff/8.5.3.graphql-bff.md)
- [ ] [8.5.4 **API 版本化** 与前端兼容策略：并行版本、Deprecation Header](../learning/1-notes/08-architecture/8.5-bff/8.5.4.api.md)
- [ ] [8.5.5 **DTO 映射**：驼峰/下划线、日期时区、空值语义统一](../learning/1-notes/08-architecture/8.5-bff/8.5.5.dto.md)
- [ ] [8.5.6 📱 移动端对照：BFF ≈ 移动端专用 Gateway / API Adapter 层](../learning/1-notes/08-architecture/8.5-bff/8.5.6.bff-gateway-api-adapter.md)



<a id="86-状态与数据架构"></a>

### 8.6 页面、URL、服务端与持久化状态归属

- [ ] [8.6.1 **客户端状态 vs 服务端状态** 边界：Vue/Nuxt 的局部状态、Pinia、useState 与 useAsyncData；Query 库按需对照](../learning/1-notes/08-architecture/8.6-state-data/8.6.1.vs.md)
- [ ] [8.6.2 **数据 Key 与缓存层级**：查询身份、用户/租户维度、退出失效与个性化数据隔离；禁止无边界全局共享](../learning/1-notes/08-architecture/8.6-state-data/8.6.2.query-key.md)
- [ ] [8.6.3 **Optimistic Update** 冲突检测与回滚策略](../learning/1-notes/08-architecture/8.6-state-data/8.6.3.optimistic-update.md)
- [ ] [8.6.4 **Stale-While-Revalidate** 在产品中的用户体验权衡](../learning/1-notes/08-architecture/8.6-state-data/8.6.4.stale-while-revalidate.md)
- [ ] [8.6.5 **Offline-first** 架构：IndexedDB、Background Sync、冲突解决思路](../learning/1-notes/08-architecture/8.6-state-data/8.6.5.offline-first.md)
- [ ] [8.6.6 **Local-first** 与 CRDT（Yjs、Automerge）基本概念 — 协作场景选学](../learning/1-notes/08-architecture/8.6-state-data/8.6.6.local-first.md)
- [ ] [8.6.7 **Event Sourcing / CQRS** 的边界与代价——复杂业务选修，不作为普通状态管理默认方案](../learning/1-notes/08-architecture/8.6-state-data/8.6.7.event-sourcing-cqrs.md)



<a id="87-能力锚点阶段-8"></a>

### 8.7 阶段验收：Vue/Nuxt 模块划分、状态与渲染选型

- 能对中等复杂度产品输出 **架构 RFC**，含至少 2 种备选方案与明确决策
- 能解释团队项目为何采用当前渲染模式，并列出已知 trade-off

---



<a id="阶段-9深度性能工程"></a>

## 阶段 9：Web Vitals 测量、加载与交互性能优化



<a id="91-性能度量体系"></a>

### 9.1 Web Vitals、RUM 与性能分析工具

- [ ] [9.1.1 **Lab vs RUM**：Lighthouse / WebPageTest vs 真实用户数据](../learning/1-notes/09-performance/9.1-performance-metrics/9.1.1.lab-vs-rum.md)
- [ ] [9.1.2 **Core Web Vitals** 深度：LCP 元素归因、INP 交互归因、CLS 布局偏移源](../learning/1-notes/09-performance/9.1-performance-metrics/9.1.2.core-web-vitals.md)
- [ ] [9.1.3 **web-vitals** 库采集与上报架构](../learning/1-notes/09-performance/9.1-performance-metrics/9.1.3.web-vitals.md)
- [ ] [9.1.4 **Performance API**：Navigation Timing、Resource Timing、Long Task API](../learning/1-notes/09-performance/9.1-performance-metrics/9.1.4.performance-api.md)
- [ ] [9.1.5 **自定义性能标记**：`performance.mark` / `measure`、Vue DevTools；React Profiler 为对照选修](../learning/1-notes/09-performance/9.1-performance-metrics/9.1.5.item-9-1-5.md)
- [ ] [9.1.6 **性能回归** 检测：CI 中 Lighthouse CI、bundle 体积门禁](../learning/1-notes/09-performance/9.1-performance-metrics/9.1.6.item-9-1-6.md)
- [ ] [9.1.7 📱 移动端对照：Web RUM ≈ Firebase Performance / 自建 APM 客户端上报](../learning/1-notes/09-performance/9.1-performance-metrics/9.1.7.web-rum-firebase-performance-apm.md)



<a id="92-性能预算与治理"></a>

### 9.2 性能阈值、构建体积与回归检查

- [ ] [9.2.1 **Performance Budget** 定义：JS/CSS 体积、请求数、LCP/INP 阈值](../learning/1-notes/09-performance/9.2-performance-budget/9.2.1.performance-budget.md)
- [ ] [9.2.2 **Bundle 分析**：rollup-plugin-visualizer、webpack-bundle-analyzer、`source-map-explorer`](../learning/1-notes/09-performance/9.2-performance-budget/9.2.2.bundle.md)
- [ ] [9.2.3 **CI 门禁**：bundlesize、size-limit、PR 评论机器人](../learning/1-notes/09-performance/9.2-performance-budget/9.2.3.ci.md)
- [ ] [9.2.4 **第三方脚本审计** 流程：分类、延迟加载、移除冗余](../learning/1-notes/09-performance/9.2-performance-budget/9.2.4.item-9-2-4.md)
- [ ] [9.2.5 **Partytown** 等第三方脚本 Worker 方案——按场景选修，验证兼容、收益与维护成本](../learning/1-notes/09-performance/9.2-performance-budget/9.2.5.partytown.md)



<a id="93-加载性能进阶"></a>

### 9.3 图片、字体、脚本与缓存加载优化

- [ ] [9.3.1 **Critical CSS** 提取与内联策略](../learning/1-notes/09-performance/9.3-loading-advanced/9.3.1.critical-css.md)
- [ ] [9.3.2 **字体优化**：`font-display`、subset、preload、FOIT/FOUT 治理](../learning/1-notes/09-performance/9.3-loading-advanced/9.3.2.item-9-3-2.md)
- [ ] [9.3.3 **图片管线**：CDN 变换、blur placeholder、LQIP、AVIF/WebP 回退链](../learning/1-notes/09-performance/9.3-loading-advanced/9.3.3.item-9-3-3.md)
- [ ] [9.3.4 **预取/预渲染策略**：Speculation Rules 等按支持矩阵选修，评估流量、隐私与降级](../learning/1-notes/09-performance/9.3-loading-advanced/9.3.4.speculation-rules-api.md)
- [ ] [9.3.5 **HTTP/3**、Early Hints (103)、103 vs Server Push 历史](../learning/1-notes/09-performance/9.3-loading-advanced/9.3.5.http.md)
- [ ] [9.3.6 **Edge/CDN 缓存键**：Query、Cookie、身份与失效边界；验证个性化响应不会跨用户命中](../learning/1-notes/09-performance/9.3-loading-advanced/9.3.6.edge.md)



<a id="94-运行时性能进阶"></a>

### 9.4 长任务、内存泄漏与交互优化

- [ ] [9.4.1 **Long Task** 分析与拆分：任务分片、Vue 更新批处理；scheduler.postTask 能力检测，React 并发特性为选修](../learning/1-notes/09-performance/9.4-runtime-advanced/9.4.1.long-task.md)
- [ ] [9.4.2 **INP 优化**：输入延迟、事件处理器优化、debounce 策略升级](../learning/1-notes/09-performance/9.4-runtime-advanced/9.4.2.inp.md)
- [ ] [9.4.3 **内存 profiling**：Heap Snapshot、Detached DOM、SPA 路由切换泄漏](../learning/1-notes/09-performance/9.4-runtime-advanced/9.4.3.profiling.md)
- [ ] [9.4.4 **WeakRef / FinalizationRegistry**——高级选修；GC 时机不可依赖，优先显式释放与有界缓存](../learning/1-notes/09-performance/9.4-runtime-advanced/9.4.4.weakref-finalizationregistry.md)
- [ ] [9.4.5 **虚拟列表进阶**：可变高度、滚动回收池、`content-visibility`](../learning/1-notes/09-performance/9.4-runtime-advanced/9.4.5.item-9-4-5.md)
- [ ] [9.4.6 **Web Worker** 生产级：任务队列、 transferable objects、Worker 池](../learning/1-notes/09-performance/9.4-runtime-advanced/9.4.6.web-worker.md)
- [ ] [9.4.7 **requestIdleCallback** 与低优先级任务调度](../learning/1-notes/09-performance/9.4-runtime-advanced/9.4.7.requestidlecallback.md)



<a id="95-ssr--流式渲染性能"></a>

### 9.5 Nuxt SSR 首屏、数据瀑布与流式响应

- [ ] [9.5.1 **Streaming HTML**：流式响应、边界与运行环境；以 Nuxt 支持情况验证，React renderToReadableStream 为对照](../learning/1-notes/09-performance/9.5-ssr-streaming/9.5.1.streaming-html.md)
- [ ] [9.5.2 **水合成本与组件优先级**：Vue/Nuxt 延迟水合按版本能力验证；React 选择性水合为对照](../learning/1-notes/09-performance/9.5-ssr-streaming/9.5.2.item-9-5-2.md)
- [ ] [9.5.3 **TTFB vs FCP** 在 SSR 场景的权衡](../learning/1-notes/09-performance/9.5-ssr-streaming/9.5.3.ttfb-vs-fcp.md)
- [ ] [9.5.4 **数据预取与水合**：Nuxt payload/useAsyncData、避免重复请求；Query dehydrate/hydrate 为可选适配](../learning/1-notes/09-performance/9.5-ssr-streaming/9.5.4.item-9-5-4.md)
- [ ] [9.5.5 **Edge 渲染** 的数据访问限制与缓存策略](../learning/1-notes/09-performance/9.5-ssr-streaming/9.5.5.edge.md)



<a id="96-能力锚点阶段-9"></a>

### 9.6 阶段验收：Web Vitals 测量、加载与交互性能优化

- 能为项目建立 **性能预算** 并接入 CI
- 能用 DevTools Memory / Performance 定位一个可复现的性能或内存问题，保留测量与改进证据

---



<a id="阶段-10安全工程与合规"></a>

## 阶段 10：XSS/CSRF 防护、认证安全与隐私



<a id="101-前端安全基线"></a>

### 10.1 威胁建模、安全响应头与输入边界

- [ ] [10.1.1 制定团队 **前端安全 Checklist**（发布前 / Code Review）](../learning/1-notes/10-security/10.1-security-baseline/10.1.1.checklist.md)
- [ ] [10.1.2 **OWASP Top 10** 与 Web 前端相关项系统性梳理](../learning/1-notes/10-security/10.1-security-baseline/10.1.2.owasp-top.md)
- [ ] [10.1.3 **威胁建模** 基础：STRIDE、数据流图、信任边界](../learning/1-notes/10-security/10.1-security-baseline/10.1.3.item-10-1-3.md)
- [ ] [10.1.4 **Security Review** 在 PR 流程中的嵌入](../learning/1-notes/10-security/10.1-security-baseline/10.1.4.security-review.md)



<a id="102-漏洞深度与防御"></a>

### 10.2 XSS/CSRF、原型污染与页面嵌入防护

- [ ] [10.2.1 **XSS** 进阶：mXSS、DOM Clobbering、模板注入、`DOMPurify` 配置](../learning/1-notes/10-security/10.2-vulnerabilities/10.2.1.xss.md)
- [ ] [10.2.2 **CSP** 生产级：`nonce`、`strict-dynamic`、`report-to`、`Content-Security-Policy-Report-Only`](../learning/1-notes/10-security/10.2-vulnerabilities/10.2.2.csp.md)
- [ ] [10.2.3 **CSRF** 进阶：Double Submit Cookie、SameSite 策略选型](../learning/1-notes/10-security/10.2-vulnerabilities/10.2.3.csrf.md)
- [ ] [10.2.4 **Clickjacking**：`X-Frame-Options`、`frame-ancestors`、UI Redressing](../learning/1-notes/10-security/10.2-vulnerabilities/10.2.4.clickjacking.md)
- [ ] [10.2.5 **Open Redirect** 检测与 allowlist](../learning/1-notes/10-security/10.2-vulnerabilities/10.2.5.open-redirect.md)
- [ ] [10.2.6 **Prototype Pollution** 与供应链中的传递](../learning/1-notes/10-security/10.2-vulnerabilities/10.2.6.prototype-pollution.md)
- [ ] [10.2.7 **SRI（Subresource Integrity）** 与 CDN 资源完整性](../learning/1-notes/10-security/10.2-vulnerabilities/10.2.7.sri-subresource-integrity.md)
- [ ] [10.2.8 **PostMessage** 跨窗口通信安全：`origin` 校验](../learning/1-notes/10-security/10.2-vulnerabilities/10.2.8.postmessage.md)



<a id="103-认证与授权进阶"></a>

### 10.3 OAuth/OIDC、会话刷新与权限校验

- [ ] [10.3.1 **OAuth 2.0 / OIDC** 深入：Authorization Code + **PKCE** 流程](../learning/1-notes/10-security/10.3-auth-advanced/10.3.1.oauth-oidc.md)
- [ ] [10.3.2 **Refresh Token** 轮换、Reuse Detection](../learning/1-notes/10-security/10.3-auth-advanced/10.3.2.refresh-token.md)
- [ ] [10.3.3 **Token 存储** 权衡：HttpOnly Cookie + BFF、内存与浏览器存储；原生安全存储仅作边界对照](../learning/1-notes/10-security/10.3-auth-advanced/10.3.3.token.md)
- [ ] [10.3.4 **WebAuthn / Passkey** 基本概念](../learning/1-notes/10-security/10.3-auth-advanced/10.3.4.webauthn-passkey.md)
- [ ] [10.3.5 **RBAC / ABAC** 在前端的表达能力与 **权限数据** 来源](../learning/1-notes/10-security/10.3-auth-advanced/10.3.5.rbac-abac.md)
- [ ] [10.3.6 **JWT** 陷阱：算法混淆、payload 信任、过期与吊销](../learning/1-notes/10-security/10.3-auth-advanced/10.3.6.jwt.md)
- [ ] [10.3.7 📱 移动端对照：Web Cookie 会话与原生 Keychain/Keystore 的威胁边界；HttpOnly 不消除 CSRF，安全存储不等于整个应用安全](../learning/1-notes/10-security/10.3-auth-advanced/10.3.7.web-httponly-cookie-session-rn.md)



<a id="104-供应链与-secrets"></a>

### 10.4 依赖供应链、凭据与源码暴露控制

- [ ] [10.4.1 **npm 供应链安全**：lockfile 完整性、最小权限 Token、私有 registry](../learning/1-notes/10-security/10.4-supply-chain/10.4.1.npm.md)
- [ ] [10.4.2 **Dependabot / Renovate** 策略与 emergency patch 流程](../learning/1-notes/10-security/10.4-supply-chain/10.4.2.dependabot-renovate.md)
- [ ] [10.4.3 **SBOM** 概念与 `npm audit`、Socket、Snyk 等工具](../learning/1-notes/10-security/10.4-supply-chain/10.4.3.sbom.md)
- [ ] [10.4.4 **Secrets 绝不进前端**：环境变量分层、构建时注入 vs 运行时注入](../learning/1-notes/10-security/10.4-supply-chain/10.4.4.secrets.md)
- [ ] [10.4.5 **Source Map** 生产策略：调试收益、源码暴露与访问控制；按项目选择公开、受限或仅上传监控平台](../learning/1-notes/10-security/10.4-supply-chain/10.4.5.source-map.md)



<a id="105-隐私与合规"></a>

### 10.5 个人数据、采集授权与隐私要求

- [ ] [10.5.1 **隐私工程**：数据最小化、保留和删除流程；适用法规及 consent 要求与法务/安全团队确认](../learning/1-notes/10-security/10.5-privacy-compliance/10.5.1.gdpr.md)
- [ ] [10.5.2 **Cookie Consent** 与 CMP（Consent Management Platform）集成——按适用业务与合规方案选择](../learning/1-notes/10-security/10.5-privacy-compliance/10.5.2.cookie-consent.md)
- [ ] [10.5.3 **PII 脱敏** 展示：日志、Session Replay、错误上报](../learning/1-notes/10-security/10.5-privacy-compliance/10.5.3.pii.md)
- [ ] [10.5.4 **CSP / COOP / COEP / CORP** 按威胁与能力需求配置，验证跨域资源兼容与隔离代价](../learning/1-notes/10-security/10.5-privacy-compliance/10.5.4.csp-coop-coep-corp.md)
- [ ] [10.5.5 **SOC2 / PCI** 对前端工程的常见要求（了解）](../learning/1-notes/10-security/10.5-privacy-compliance/10.5.5.soc2-pci.md)



<a id="106-能力锚点阶段-10"></a>

### 10.6 阶段验收：XSS/CSRF 防护、认证安全与隐私

- 能按应用威胁与认证模型输出 **CSP 与 Cookie 策略**，说明适用条件与验证方式
- 能完成一次前端 **威胁建模** 或安全 Review；团队主持职责按岗位要求深化

---



<a id="阶段-11可观测性与生产运维"></a>

## 阶段 11：错误监控、日志指标与灰度发布



<a id="111-错误监控"></a>

### 11.1 Sentry 错误采集、Source Map 与告警

- [ ] [11.1.1 **Sentry / Bugsnag** 集成：Source Map 上传、Release 追踪、环境标签](../learning/1-notes/11-observability/11.1-error-monitoring/11.1.1.sentry-bugsnag.md)
- [ ] [11.1.2 **错误分级**：P0–P3、用户影响面、自动指派](../learning/1-notes/11-observability/11.1-error-monitoring/11.1.2.item-11-1-2.md)
- [ ] [11.1.3 **Error Boundary** 策略：页面级 / 模块级 / 全局兜底](../learning/1-notes/11-observability/11.1-error-monitoring/11.1.3.error-boundary.md)
- [ ] [11.1.4 **错误采样** 与配额控制](../learning/1-notes/11-observability/11.1-error-monitoring/11.1.4.item-11-1-4.md)
- [ ] [11.1.5 **breadcrumbs** 与用户操作路径还原](../learning/1-notes/11-observability/11.1-error-monitoring/11.1.5.breadcrumbs.md)



<a id="112-日志与指标"></a>

### 11.2 结构化日志、用户旅程与 Web 指标

- [ ] [11.2.1 **结构化日志** 规范：level、traceId、userId（脱敏）](../learning/1-notes/11-observability/11.2-logging-metrics/11.2.1.item-11-2-1.md)
- [ ] [11.2.2 **Distributed Tracing** 基础：OpenTelemetry、W3C traceparent](../learning/1-notes/11-observability/11.2-logging-metrics/11.2.2.distributed-tracing.md)
- [ ] [11.2.3 **前端 Metrics**：自定义计数、histogram、Web Vitals 看板](../learning/1-notes/11-observability/11.2-logging-metrics/11.2.3.metrics.md)
- [ ] [11.2.4 **Session Replay**（LogRocket、FullStory）与隐私边界](../learning/1-notes/11-observability/11.2-logging-metrics/11.2.4.session-replay.md)
- [ ] [11.2.5 **Real User Monitoring (RUM)** 看板设计与告警阈值](../learning/1-notes/11-observability/11.2-logging-metrics/11.2.5.real-user-monitoring-rum.md)



<a id="113-发布与变更管理"></a>

### 11.3 Feature Flag、灰度、发布与回滚

- [ ] [11.3.1 **Feature Flag**：LaunchDarkly、Unleash、自研开关；Kill Switch](../learning/1-notes/11-observability/11.3-release-management/11.3.1.feature-flag.md)
- [ ] [11.3.2 **灰度发布 / Canary**：按用户百分比、地域、白名单](../learning/1-notes/11-observability/11.3-release-management/11.3.2.canary.md)
- [ ] [11.3.3 **A/B 实验** 前端集成：分流、指标归因、实验污染防护](../learning/1-notes/11-observability/11.3-release-management/11.3.3.a-b.md)
- [ ] [11.3.4 **Preview Deployment**：每个 PR 独立预览环境](../learning/1-notes/11-observability/11.3-release-management/11.3.4.preview-deployment.md)
- [ ] [11.3.5 **回滚策略**：静态资源 hash 回滚、SSR 版本回退、数据库迁移协同](../learning/1-notes/11-observability/11.3-release-management/11.3.5.item-11-3-5.md)
- [ ] [11.3.6 **Incident Response**：On-call、Runbook、Postmortem 模板](../learning/1-notes/11-observability/11.3-release-management/11.3.6.incident-response.md)



<a id="114-基础设施协作"></a>

### 11.4 CDN、反向代理、容器与部署协作

- [ ] [11.4.1 **CDN** 配置协作：缓存规则、Purge、Geo 路由](../learning/1-notes/11-observability/11.4-infra/11.4.1.cdn.md)
- [ ] [11.4.2 **Nginx 进阶**：负载均衡、限流、反向代理缓存、WAF 对接](../learning/1-notes/11-observability/11.4-infra/11.4.2.nginx.md)
- [ ] [11.4.3 **Docker** 多阶段构建 SSR 应用；健康检查](../learning/1-notes/11-observability/11.4-infra/11.4.3.docker.md)
- [ ] [11.4.4 **Kubernetes** 基础：Deployment、HPA、Ingress——采用该基础设施时选修](../learning/1-notes/11-observability/11.4-infra/11.4.4.kubernetes.md)
- [ ] [11.4.5 **GitHub Actions** 进阶：矩阵构建、缓存、环境 secrets、部署审批](../learning/1-notes/11-observability/11.4-infra/11.4.5.github-actions.md)



<a id="115-能力锚点阶段-11"></a>

### 11.5 阶段验收：错误监控、日志指标与灰度发布

- 能为所负责产品建立 **错误监控 + Web Vitals** 闭环，选择适合的采集工具并验证隐私和告警
- 能设计并文档化 **灰度 + 回滚** 流程

---
