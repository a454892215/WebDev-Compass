# Nuxt 通用基座与宿主搭建指南

本模块定义基于 Nuxt 4、Vue 3、TypeScript 的工程方案。规划形成于 2026-11-20；三个独立工程的初始骨架已交付，当前事实与验证边界见[三仓库实施交接状态](./07-implementation-status.md)（更新于 2026-11-24）。规划正文仍保留完整目标，未实现能力不视为通过。

## 仓库与对话边界

| 位置 | 职责 | 交付方式 |
| --- | --- | --- |
| WebDev Compass，本仓库 | 记录架构决策、搭建流程、规则迁移和验收标准 | 维护本模块的 Markdown 文档 |
| web-common，独立仓库 | 维护共享包、Nuxt 基础层、规则、检查器和应用模板 | 在其独立 Codex 对话中实施、验证、提交和发布 |
| 桌面/手机宿主，独立仓库 | 引用基座，管理业务配置、接口、页面和发布 | 在宿主 Codex 对话中开发，按版本升级基座 |

三个工程已使用 web-common、web-pc-workframe、web-h5-workframe 名称，包作用域为 @web-base。开发期使用本地 link，正式版本分发和业务浏览器矩阵仍须单独确定。两个 Flutter 项目仅作为工程规范的只读参考。

## 阅读与执行顺序

1. [参考项目与工程机制采纳](./01-reference-mapping.md)说明参考项目的规范、结构和工作流证据，以及本方案采纳的范围。
2. [架构、技术选型与目录](./02-architecture-and-stack.md)定义依赖方向、模块职责、基座和宿主布局。
3. [公共模块契约](./03-common-modules.md)定义 HTTP、认证、状态、配置和扩展点。
4. [脚手架、模板与接入](./04-scaffolding-and-templates.md)说明官方工具如何生成骨架，以及基座升级怎样传递给宿主。
5. [AI 工作流与质量门禁](./05-ai-workflow-and-quality.md)定义规则唯一源、任务证据、检查器和收尾核验。
6. [分阶段实施与验收清单](./06-implementation-and-acceptance.md)作为后续独立项目的实施任务依据。

## 方案决策

- 采用 Nuxt 官方 create-nuxt 和官方 starter 生成初始工程。共享能力通过包和 Nuxt Layer 交付，模板提供应用初始结构。
- 基座采用 pnpm workspace 管理内部包和验证应用。业务宿主独立成仓库，通过版本化依赖接入。宿主可按产品需要包含一个响应式应用，或桌面与手机两个应用。
- 桌面和手机共用 Vue/Nuxt 技术体系，UI 分别实现。桌面默认 Nuxt UI，手机默认 Vant，组件库属于应用依赖。
- 页面数据获取接入 Nuxt useFetch/useAsyncData。规划中的 $fetch/ofetch 为候选；已交付基座采用注入 fetcher 的纯 TS 契约与标准 Fetch/Nitro 适配，见交接记录。
- 共享核心与 Nuxt 适配分层。工具和基础契约保持纯 TypeScript，Nuxt 注入、请求上下文和 SSR 状态由适配层承担。
- 规则默认通过 ESLint、TypeScript、测试与 CI 执行。AI 文档写明机械检查的覆盖边界，门禁结果作为可复核证据。

以上属于本方案的工程选型。官方脚手架负责生成 Nuxt 结构，团队的业务边界、依赖约束和工作流仍需按本文实施。脚手架的“成熟”与本团队基座的“验收通过”分别记录。

Flutter 参考范围为项目组织、目录职责、依赖边界、规范治理、AI 工作流和检查门禁。Web 技术方案独立依据 Nuxt/Vue 官方工具、生态维护状态、兼容性和验证结果选择。当前已有明确的 Nuxt + Vue 3 + TypeScript 约束，其余工具也按这些标准核对，采用已验证稳定版本。

## 首版完成的定义

完整复用目标包括生成桌面和手机宿主，并完成共享模块测试、SSR 请求隔离、静态部署验证、打包后跨仓库安装、规则同步与失败样例检测。还需在第二个干净宿主上验证升级与回退，确认复用链路可持续。

规划中的示例使用通用目录和假数据。业务认证、API 协议、品牌、正式域名和发布凭据由宿主接入阶段确定。各阶段缺少条件时按条目记录阻塞与恢复条件，继续完成无依赖的事项。

## 与现有学习路线衔接

本模块是跨阶段工程实践专题。相关原理可沿 [知识地图](../KNOWLEDGE_MAP.md)学习工程化、框架、认证、SSR、架构和交付。专题文件不占用已有知识点编号，知识地图的完成状态由学习者自行维护。

## 官方依据

Nuxt 提供官方初始化工具和 starter 集合，Layers 支持从本地、包和 Git 复用配置与代码。该能力决定本方案采用“官方骨架、共享依赖、宿主模板”的交付形式。 [create-nuxt](https://nuxt.com/docs/4.x/api/commands/init) · [官方 starters](https://github.com/nuxt/starter) · [Layers](https://nuxt.com/docs/4.x/getting-started/layers)

本轮已读取 Modern Web Guidance 的 css、css-layout、html 指南，影响样式作用域、布局与语义要求。Flutter 官方技能 flutter-apply-architecture-best-practices 用于核对分层职责。google-developer-knowledge 查询返回 HTTP 403，Flutter 官方资料改从网页读取。 [CSS 架构](https://developer.chrome.com/docs/modern-web-guidance/guides/css/css) · [布局](https://developer.chrome.com/docs/modern-web-guidance/guides/css/css-layout) · [HTML](https://developer.chrome.com/docs/modern-web-guidance/guides/html/html) · [Flutter 架构建议](https://docs.flutter.dev/app-architecture/recommendations)
