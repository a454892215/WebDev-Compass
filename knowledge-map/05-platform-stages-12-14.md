<a id="阶段-1214平台层"></a>

# 阶段 12–14：自动化测试、组件库、多包发布与 BFF

> 测试与 Storybook · pnpm 多包发布 · Node/Nitro 与 BFF\
> [← 04-architecture](./04-architecture-stages-8-11.md) · [← 返回总览](../KNOWLEDGE_MAP.md) · [下一部分 →](./06-delivery-stages-15-appendix.md)

---

<a id="阶段-12测试策略与设计系统"></a>

## 阶段 12：自动化测试、Storybook 与 Vue 组件库

> 阶段 12–14 是质量深化、团队平台和服务端协作分支，不要求每个项目依次建设一整套平台。先完成阶段 3 的基础测试和阶段 6–7 的产品验收；组件库、Monorepo、GraphQL、BFF 与 Edge 按复用规模、职责和业务需要选择。详见[学习主线](../docs/LEARNING_PATH.md)。



<a id="121-测试策略体系"></a>

### 12.1 测试范围、契约、视觉与 SSR 隔离回归

- [ ] [12.1.1 编写团队 **测试策略文档**：测什么、不测什么、覆盖率预期](../notes/12-testing-design-system/12.1-testing-strategy/12.1.1.item-12-1-1.md)
- [ ] [12.1.2 **测试组合与风险覆盖**：按组件、契约和关键旅程选层级，不把固定比例或覆盖率当唯一目标](../notes/12-testing-design-system/12.1-testing-strategy/12.1.2.item-12-1-2.md)
- [ ] [12.1.3 **Contract Testing**：Pact 等前后端契约测试](../notes/12-testing-design-system/12.1-testing-strategy/12.1.3.contract-testing.md)
- [ ] [12.1.4 **Visual Regression**：Chromatic、Percy、Lost Pixel](../notes/12-testing-design-system/12.1-testing-strategy/12.1.4.visual-regression.md)
- [ ] [12.1.5 **Mutation Testing** 概念（Stryker）— 了解](../notes/12-testing-design-system/12.1-testing-strategy/12.1.5.mutation-testing.md)
- [ ] [12.1.6 **E2E 规模化**：Playwright 并行、Sharding、Test Container](../notes/12-testing-design-system/12.1-testing-strategy/12.1.6.e2e.md)
- [ ] [12.1.7 **Flaky Test** 治理：重试策略、quarantine、根因分析](../notes/12-testing-design-system/12.1-testing-strategy/12.1.7.flaky-test.md)
- [ ] [12.1.8 **SSR / Hydration** 专项测试：有效内容衔接、重复请求、双用户并发状态/凭据隔离与个性化缓存泄漏](../notes/12-testing-design-system/12.1-testing-strategy/12.1.8.ssr-hydration.md)



<a id="122-专项测试"></a>

### 12.2 无障碍、性能、国际化与跨浏览器测试

- [ ] [12.2.1 **a11y 测试流程**：axe 自动化 + 键盘走查 + 屏幕阅读器验收](../notes/12-testing-design-system/12.2-specialized-testing/12.2.1.a11y.md)
- [ ] [12.2.2 **性能回归测试**：Lighthouse CI、bundle diff](../notes/12-testing-design-system/12.2-specialized-testing/12.2.2.item-12-2-2.md)
- [ ] [12.2.3 **国际化测试**：伪本地化（pseudo-localization）、RTL 快照](../notes/12-testing-design-system/12.2-specialized-testing/12.2.3.item-12-2-3.md)
- [ ] [12.2.4 **跨浏览器测试**：BrowserStack、Playwright 多 browser project](../notes/12-testing-design-system/12.2-specialized-testing/12.2.4.item-12-2-4.md)



<a id="123-设计系统架构"></a>

### 12.3 Design Tokens、Storybook 与组件规范

- [ ] [12.3.1 **Design Token** 体系：Color、Spacing、Typography、Radius、Shadow](../notes/12-testing-design-system/12.3-design-system/12.3.1.design-token.md)
- [ ] [12.3.2 **Style Dictionary / Tokens Studio** 工作流：Figma → Code](../notes/12-testing-design-system/12.3-design-system/12.3.2.style-dictionary-tokens-studio.md)
- [ ] [12.3.3 **Storybook** 作为组件文档、交互验收与视觉回归基线](../notes/12-testing-design-system/12.3-design-system/12.3.3.storybook.md)
- [ ] [12.3.4 **组件 API 设计原则**：组合 vs 配置、Compound Components、slot](../notes/12-testing-design-system/12.3-design-system/12.3.4.api.md)
- [ ] [12.3.5 **组件版本化**：SemVer、Breaking Change、Codemod 迁移](../notes/12-testing-design-system/12.3-design-system/12.3.5.item-12-3-5.md)
- [ ] [12.3.6 **主题架构**：CSS 变量、class 策略、多品牌 / 白标](../notes/12-testing-design-system/12.3-design-system/12.3.6.item-12-3-6.md)
- [ ] [12.3.7 **跨框架设计系统**：Web Components 封装 — 选学](../notes/12-testing-design-system/12.3-design-system/12.3.7.item-12-3-7.md)



<a id="124-组件库工程"></a>

### 12.4 Vue 组件库打包、依赖与版本发布

- [ ] [12.4.1 **Tree-shaking** 友好的导出结构](../notes/12-testing-design-system/12.4-component-library/12.4.1.tree-shaking.md)
- [ ] [12.4.2 **Peer Dependencies** 管理：Vue/Nuxt 兼容范围、避免多份框架运行时；React 单例为对照](../notes/12-testing-design-system/12.4-component-library/12.4.2.peer-dependencies.md)
- [ ] [12.4.3 **按需加载** 与 `sideEffects` 声明](../notes/12-testing-design-system/12.4-component-library/12.4.3.item-12-4-3.md)
- [ ] [12.4.4 **Changelog** 自动化（Changesets）](../notes/12-testing-design-system/12.4-component-library/12.4.4.changelog.md)
- [ ] [12.4.5 组件 **无障碍** 验收标准内建到 CI](../notes/12-testing-design-system/12.4-component-library/12.4.5.item-12-4-5.md)



<a id="125-能力锚点阶段-12"></a>

### 12.5 阶段验收：自动化测试、Storybook 与 Vue 组件库

- 能为负责的应用选择 **测试策略与组件文档**，以关键故障和使用场景验证效果
- 存在跨页面/团队复用需求时，能设计并验证 **Design Token** 从设计到代码的同步机制

---



<a id="阶段-13平台化工程"></a>

## 阶段 13：pnpm 多包管理、版本发布与 CI 流水线



<a id="131-monorepo-深入"></a>

### 13.1 pnpm workspace 与多应用/多包组织

- [ ] [13.1.1 **Turborepo / Nx** 选型与 task pipeline](../notes/13-platform/13.1-monorepo/13.1.1.turborepo-nx.md)
- [ ] [13.1.2 **依赖图** 分析与 affected 构建](../notes/13-platform/13.1-monorepo/13.1.2.item-13-1-2.md)
- [ ] [13.1.3 **Remote Cache** 配置与 CI 加速](../notes/13-platform/13.1-monorepo/13.1.3.remote-cache.md)
- [ ] [13.1.4 **Workspace 协议**：`workspace:`*、内部包版本](../notes/13-platform/13.1-monorepo/13.1.4.workspace.md)
- [ ] [13.1.5 **边界 enforcement**：模块不可跨层 import](../notes/13-platform/13.1-monorepo/13.1.5.enforcement.md)
- [ ] [13.1.6 📱 移动端对照：Monorepo ≈ Android Gradle 多 Module / Melos（Flutter）](../notes/13-platform/13.1-monorepo/13.1.6.monorepo-android-gradle-module-melos.md)



<a id="132-发布与依赖治理"></a>

### 13.2 Changesets、依赖升级与版本兼容

- [ ] [13.2.1 **Changesets** 或 **semantic-release** 自动化版本](../notes/13-platform/13.2-release-deps/13.2.1.changesets.md)
- [ ] [13.2.2 **内部 npm 包** 发布：Verdaccio / Artifactory / GitHub Packages](../notes/13-platform/13.2-release-deps/13.2.2.npm.md)
- [ ] [13.2.3 **Renovate / Dependabot** 策略：分组、自动合并条件、major 升级 playbook](../notes/13-platform/13.2-release-deps/13.2.3.renovate-dependabot.md)
- [ ] [13.2.4 **Lockfile** 政策与冻结安装：按 npm/pnpm/yarn 使用对应 CI 命令和锁定版本](../notes/13-platform/13.2-release-deps/13.2.4.lockfile.md)
- [ ] [13.2.5 **Catalog / Override** 统一传递依赖版本（pnpm catalog）](../notes/13-platform/13.2-release-deps/13.2.5.catalog-override.md)



<a id="133-构建系统进阶"></a>

### 13.3 构建缓存、任务编排与包体分析

- [ ] [13.3.1 **Module Federation** 生产踩坑与调试](../notes/13-platform/13.3-build-advanced/13.3.1.module-federation.md)
- [ ] [13.3.2 **Custom Webpack / Vite Plugin** 开发基础](../notes/13-platform/13.3-build-advanced/13.3.2.custom-webpack-vite-plugin.md)
- [ ] [13.3.3 **esbuild / SWC** 在工具链中的位置](../notes/13-platform/13.3-build-advanced/13.3.3.esbuild-swc.md)
- [ ] [13.3.4 **Persistent Cache** 与 build 性能 profiling](../notes/13-platform/13.3-build-advanced/13.3.4.persistent-cache.md)
- [ ] [13.3.5 **Library Mode** 打包：ESM / CJS / DTS 输出策略](../notes/13-platform/13.3-build-advanced/13.3.5.library-mode.md)



<a id="134-浏览器兼容与渐进增强"></a>

### 13.4 浏览器支持矩阵、Polyfill 与降级

- [ ] [13.4.1 **Browserslist** 策略与 `@vitejs/plugin-legacy`](../notes/13-platform/13.4-browser-compat/13.4.1.browserslist.md)
- [ ] [13.4.2 **Polyfill** 按需：原生支持、转译边界、可信来源与供应链风险，避免未经审计的远程注入](../notes/13-platform/13.4-browser-compat/13.4.2.polyfill.md)
- [ ] [13.4.3 **Progressive Enhancement** vs **Graceful Degradation**](../notes/13-platform/13.4-browser-compat/13.4.3.progressive-enhancement.md)
- [ ] [13.4.4 **Support Matrix** 文档与 QA 对齐流程](../notes/13-platform/13.4-browser-compat/13.4.4.support-matrix.md)
- [ ] [13.4.5 **Feature Detection** vs User Agent Sniffing](../notes/13-platform/13.4-browser-compat/13.4.5.feature-detection.md)
- [ ] [13.4.6 **CSS** `@supports` 与 JS capability check](../notes/13-platform/13.4-browser-compat/13.4.6.supports.md)
- [ ] [13.4.7 **Print CSS** 与导出/打印场景 — B 端选学](../notes/13-platform/13.4-browser-compat/13.4.7.print-css.md)



<a id="135-开发者体验dx"></a>

### 13.5 CLI、编辑器与本地开发流程

- [ ] [13.5.1 **eslint-config** 组织级共享与版本发布](../notes/13-platform/13.5-dx/13.5.1.eslint-config.md)
- [ ] [13.5.2 **自定义 ESLint 规则** 强制执行架构约束](../notes/13-platform/13.5-dx/13.5.2.eslint.md)
- [ ] [13.5.3 **Codemod**（jscodeshift）大规模迁移](../notes/13-platform/13.5-dx/13.5.3.codemod.md)
- [ ] [13.5.4 **CLI 脚手架** 内部项目初始化模板](../notes/13-platform/13.5-dx/13.5.4.cli.md)
- [ ] [13.5.5 **VS Code 工作区** 推荐扩展与 Snippets 统一](../notes/13-platform/13.5-dx/13.5.5.vs-code.md)



<a id="136-能力锚点阶段-13"></a>

### 13.6 阶段验收：pnpm 多包管理、版本发布与 CI 流水线

- 有多包需求时能维护 **Monorepo** 与统一检查；否则能解释独立仓库和版本包复用的取舍
- 能输出 **Support Matrix 与能力回退策略**，说明哪些能力原生使用、需降级或不支持，不默认增加 polyfill

---



<a id="阶段-14bff--node--edge-运行时"></a>

## 阶段 14：Node.js、Nuxt Nitro 与 BFF 接口开发

> 使用 SSR、承担 BFF 或服务端协作职责时学习本分支。SPA/静态托管项目不必先实现中间层；选择 Nuxt 时先掌握 Nitro 的请求、状态、配置与部署边界，再按需深入其他服务框架。



<a id="141-nodejs-运行时"></a>

### 14.1 Node.js 事件循环、Stream 与进程

- [ ] [14.1.1 **Node Event Loop** 与浏览器差异：phases、microtask、`process.nextTick`](../notes/14-bff-runtime/14.1-node-runtime/14.1.1.node-event-loop.md)
- [ ] [14.1.2 **Stream** 与背压（Backpressure）](../notes/14-bff-runtime/14.1-node-runtime/14.1.2.stream.md)
- [ ] [14.1.3 **Worker Threads** 与 CPU 密集任务](../notes/14-bff-runtime/14.1-node-runtime/14.1.3.worker-threads.md)
- [ ] [14.1.4 **环境变量** 与配置管理：`dotenv`、12-factor](../notes/14-bff-runtime/14.1-node-runtime/14.1.4.item-14-1-4.md)
- [ ] [14.1.5 **进程管理**：PM2、cluster mode 基本概念](../notes/14-bff-runtime/14.1-node-runtime/14.1.5.item-14-1-5.md)



<a id="142-bff-实现"></a>

### 14.2 独立 BFF 的接口聚合、鉴权与限流

- [ ] [14.2.1 **服务端路由与中间件**：Nuxt/Nitro 为主例；Fastify/Hono/Express 按独立 BFF 需求选修](../notes/14-bff-runtime/14.2-bff-impl/14.2.1.fastify-hono-express.md)
- [ ] [14.2.2 **请求聚合**：并行 vs 串行、超时与 Partial Failure](../notes/14-bff-runtime/14.2-bff-impl/14.2.2.item-14-2-2.md)
- [ ] [14.2.3 **鉴权中间件**：Session 校验、JWT 验证、权限注入](../notes/14-bff-runtime/14.2-bff-impl/14.2.3.item-14-2-3.md)
- [ ] [14.2.4 **Rate Limiting** 与 CORS 在 BFF 层统一](../notes/14-bff-runtime/14.2-bff-impl/14.2.4.rate-limiting.md)
- [ ] [14.2.5 **错误映射**：后端错误 → 前端友好结构](../notes/14-bff-runtime/14.2-bff-impl/14.2.5.item-14-2-5.md)
- [ ] [14.2.6 **OpenAPI** 生成与契约同步](../notes/14-bff-runtime/14.2-bff-impl/14.2.6.openapi.md)



<a id="143-ssr-框架运行时"></a>

### 14.3 Nuxt Nitro 的 SSR、请求隔离与错误处理

- [ ] [14.3.1 **Next.js App Router** 深入——React/Next.js 分支选修，覆盖 Server Components 与服务端路由边界](../notes/14-bff-runtime/14.3-ssr-runtime/14.3.1.next.js-app-router.md)
- [ ] [14.3.2 **Nuxt Nitro** 运行时：请求生命周期、每请求上下文、配置与服务器路由；避免跨用户共享状态](../notes/14-bff-runtime/14.3-ssr-runtime/14.3.2.nuxt-nitro.md)
- [ ] [14.3.3 **数据获取** 在 SSR 中的 waterfall 优化](../notes/14-bff-runtime/14.3-ssr-runtime/14.3.3.item-14-3-3.md)
- [ ] [14.3.4 **Cookie / Header** 的受信来源与传播：Nuxt 请求上下文、外部 API 转发白名单；Server Component 为对照](../notes/14-bff-runtime/14.3-ssr-runtime/14.3.4.cookie-header.md)
- [ ] [14.3.5 **Streaming 与错误处理**：框架能力、头部发送时机、取消、部分响应与客户端恢复](../notes/14-bff-runtime/14.3-ssr-runtime/14.3.5.streaming.md)



<a id="144-edge-runtime"></a>

### 14.4 Edge 部署、API 限制与缓存（选修）

- [ ] [14.4.1 **Edge vs Node**：平台与兼容模式决定 Node API 支持范围；核对冷启动、CPU/内存配额和持久化限制](../notes/14-bff-runtime/14.4-edge-runtime/14.4.1.edge-vs-node.md)
- [ ] [14.4.2 **Vercel Edge Functions / Cloudflare Workers** 使用场景](../notes/14-bff-runtime/14.4-edge-runtime/14.4.2.vercel-edge-functions-cloudflare-workers.md)
- [ ] [14.4.3 **Edge Middleware**：鉴权、Geo 路由、A/B 分流](../notes/14-bff-runtime/14.4-edge-runtime/14.4.3.edge-middleware.md)
- [ ] [14.4.4 **KV / D1 / Edge Config** 等 Edge 存储](../notes/14-bff-runtime/14.4-edge-runtime/14.4.4.kv-d1-edge-config.md)
- [ ] [14.4.5 **Edge 缓存** 与 **Stale-While-Revalidate** 在 CDN 层](../notes/14-bff-runtime/14.4-edge-runtime/14.4.5.edge.md)



<a id="145-数据层协作"></a>

### 14.5 GraphQL、Redis 与数据层协作（按需）

- [ ] [14.5.1 **GraphQL** 深入：Schema Stitching、N+1、DataLoader、Persisted Queries](../notes/14-bff-runtime/14.5-data-layer/14.5.1.graphql.md)
- [ ] [14.5.2 **Apollo Client / urql** 缓存策略与 SSR](../notes/14-bff-runtime/14.5-data-layer/14.5.2.apollo-client-urql.md)
- [ ] [14.5.3 **Redis** 在 Session / Rate Limit 中的角色 — 了解](../notes/14-bff-runtime/14.5-data-layer/14.5.3.redis.md)
- [ ] [14.5.4 **数据库基础**：能阅读 Prisma schema、理解 migration 对前端的影响](../notes/14-bff-runtime/14.5-data-layer/14.5.4.item-14-5-4.md)
- [ ] [14.5.5 **WebSocket / SSE** 生产级：心跳、重连指数退避、连接池](../notes/14-bff-runtime/14.5-data-layer/14.5.5.websocket-sse.md)



<a id="146-文件与上传"></a>

### 14.6 分片上传、预签名 URL 与文件校验

- [ ] [14.6.1 **分片上传**、断点续传、并发控制](../notes/14-bff-runtime/14.6-file-upload/14.6.1.item-14-6-1.md)
- [ ] [14.6.2 **预签名 URL** 直传 OSS / S3](../notes/14-bff-runtime/14.6-file-upload/14.6.2.url.md)
- [ ] [14.6.3 **上传安全**：MIME 校验、大小限制、病毒扫描对接](../notes/14-bff-runtime/14.6-file-upload/14.6.3.item-14-6-3.md)



<a id="147-能力锚点阶段-14"></a>

### 14.7 阶段验收：Node.js、Nuxt Nitro 与 BFF 接口开发

- 承担 BFF 职责时，能实现 **鉴权 + 接口聚合** 并验证超时、错误和多用户隔离；不需要时能说明直连方案
- 能解释 **Edge vs Origin** 渲染对数据一致性的影响

---
