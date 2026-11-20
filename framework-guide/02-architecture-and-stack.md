# 架构、技术选型与目录

返回[模块入口](./README.md)。以下目录和包名是待实施设计，实际仓库创建时记录确定版本与 ADR。

## 技术基线

| 职责 | 首版选择 | 选择依据与边界 |
| --- | --- | --- |
| 应用框架 | Nuxt 4 + Vue 3 + TypeScript strict | 固定同一兼容版本组合，保留 Nuxt 原生目录与工具 |
| 运行与包管理 | Nuxt 支持的 Node LTS + pnpm | 固定具体版本，提交 packageManager、版本文件与 lockfile |
| 内部多包管理 | pnpm workspace | 管理基座包、Layer 与验证应用，首版直接使用递归脚本 |
| HTTP | Nuxt $fetch/ofetch + useFetch/useAsyncData | 保持 SSR 与客户端数据生命周期一致，接口通过宿主解码 |
| 状态 | Vue 局部响应式状态、Nuxt useState | 复杂跨页面状态按需启用 Pinia，状态逐应用/请求归属 |
| 桌面 UI | Nuxt UI + 宿主业务组件 | 主题和组件依赖由桌面应用管理 |
| 手机 UI | Vant + 宿主业务组件 | 手机触控、表单、弹层与导航独立实现 |
| 样式 | CSS variables、Grid/Flex、容器/媒体查询 | 桌面按 Nuxt UI 配置 Tailwind，移动组件按 Vant 主题接入 |
| 类型与规范 | nuxt typecheck、tsc、ESLint flat config、Prettier | 编译、类型、规范和格式分别检查 |
| 行为验证 | Vitest、Vue Test Utils、Nuxt Test Utils | 纯函数、状态、注入和 SSR 隔离分层验证 |
| 浏览器验证 | Playwright | 后台固定数据测试，桌面/手机模拟与真实设备结果分别记录 |
| 版本与发布 | package exports、peerDependencies、Changesets | 管理公共 API、宿主兼容与变更记录 |

暂不增加全局 DI 容器，Nuxt plugin/provide 与显式参数承担装配。需要依赖图缓存或大量跨包任务时，再评估 Turborepo。国际化、PWA、离线数据库、支付和埋点作为扩展能力，由具体宿主需求决定接入。

Node 与 pnpm 的具体版本、Vue 的解析版本在首个实施阶段核对后锁定。官方工具的 @latest 只用于发现候选骨架，团队生成器和正式 CI 使用已验证版本与锁文件。 [Nuxt 安装](https://nuxt.com/docs/4.x/getting-started/installation) · [pnpm workspace](https://pnpm.io/workspaces)

## 依赖方向

~~~text
宿主页面 / features → 宿主 API 与领域逻辑 → @web-base/core
宿主 Nuxt plugin → 公共 composable/provide 契约 → @web-base/core
宿主 nuxt.config → @web-base/nuxt
宿主检查配置 → @web-base/eslint-config
宿主工具命令 → @web-base/tooling → @web-base/workflow-kit
~~~

core 持有无框架契约与纯能力，nuxt Layer 管理框架生命周期，tooling 管理开发期工具。eslint-config 内包含共享规则和自定义规则入口。发布前检查包图，任何基座包都不得依赖宿主、模板或验证应用。

@web-base/nuxt 的默认入口作为 Layer 配置供 extends 使用。宿主运行期调用 Layer 提供的 composables/provide 契约。确需显式导入运行期帮助函数时，另设 runtime 子路径及类型导出，并验证客户端与服务端解析，避免将 nuxt.config 当成运行期模块。

模板是应用文件的生成来源，运行期应用通过版本包获得公共能力。工具实现与规则正文由基座维护唯一源，宿主以依赖解析和薄入口调用。

## 基座仓库目录

~~~text
web-common/
├── AGENTS.md
├── README.md
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── .changeset/
├── packages/
│   ├── core/                 # @web-base/core
│   │   ├── src/
│   │   │   ├── http/         # 客户端契约、错误、请求身份
│   │   │   ├── storage/      # 存储接口与值编解码
│   │   │   ├── logging/      # 脱敏日志契约
│   │   │   └── utils/        # 与框架无关的纯函数
│   │   ├── tests/
│   │   └── package.json
│   ├── eslint-config/        # flat config、自定义规则、正反样例
│   ├── tooling/              # CLI、依赖/结构检查、模板与同步工具
│   └── workflow-kit/         # ai_rules、ai_workflow、索引和 schema
├── layers/
│   └── nuxt-base/            # @web-base/nuxt
│       ├── nuxt.config.ts
│       ├── app/
│       │   ├── composables/  # 与 Nuxt 生命周期衔接的能力
│       │   ├── plugins/      # 无宿主副作用的默认装配
│       │   └── assets/css/   # 可覆盖的基础 token
│       ├── shared/          # 浏览器与服务端都可使用的纯定义
│       ├── tests/
│       └── package.json
├── templates/
│   ├── desktop/             # 桌面项目初始文件
│   ├── mobile/              # 手机项目初始文件
│   └── responsive/          # 两端流程相近时使用
├── playgrounds/
│   ├── desktop/             # 基座开发期验证宿主
│   └── mobile/
├── scripts/                 # 基座自身构建与发布的薄入口
├── docs/                    # 基座 API、升级、发布和维护说明
└── .github/workflows/       # CI 执行共享命令
~~~

workspace 仅登记 packages/*、layers/* 和 playgrounds/*，模板文件作为资源发布，由生成器实例化后在独立临时目录安装验证。template 与 playground 的公共基础配置来自同一个生成来源，防止两套起步结构漂移。

业务认证服务、真实 API 路径、业务 DTO 和品牌资源由宿主拥有。基座内用测试 fixture 演示协议适配。首次明确需求只需 core、Layer、质量工具与模板，目录随实际模块落地创建。

## 独立宿主目录

~~~text
product-web/
├── AGENTS.md                 # 公共规则加载入口与本项目差异
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── web-base.config.json      # 基座包、规则版本和应用根绑定
├── apps/
│   ├── desktop/
│   │   ├── app/
│   │   │   ├── pages/        # Nuxt 文件路由入口，保持薄
│   │   │   ├── features/     # 按业务组织组件、页面模型和测试
│   │   │   ├── components/   # 跨业务展示组件
│   │   │   ├── composables/  # 应用级 composables
│   │   │   ├── layouts/
│   │   │   ├── middleware/   # 导航层访问控制
│   │   │   ├── plugins/      # 宿主显式组合根
│   │   │   ├── api/          # API 函数与协议 DTO 适配
│   │   │   ├── stores/       # 启用 Pinia 时创建
│   │   │   └── assets/
│   │   ├── shared/           # 当前应用双端安全的纯类型
│   │   ├── server/           # SSR/BFF profile 按需创建
│   │   ├── public/
│   │   ├── nuxt.config.ts
│   │   └── package.json
│   └── mobile/               # 相同框架目录，独立页面与 UI
├── packages/
│   └── product-domain/       # 两端共同业务模型、规则与契约
├── tests/                    # 跨应用验收和集成场景
├── docs/
│   ├── architecture/
│   ├── tasks/
│   └── releases/
└── .githooks/                # 只调用已安装工具的薄入口
~~~

单应用宿主由模板只生成 apps/web，apps/desktop 与 apps/mobile 属于双应用 profile。两个应用可以独立构建、部署和升级，根锁文件管理当前产品的依赖解析。业务包由产品仓库拥有，跨产品确认稳定后才考虑提升至通用基座。

app/features 采用显式导入。Nuxt 自动发现的 pages、plugins、middleware 保持在标准目录，公共 Layer 的自动导入能力采用明确前缀，例如 useBaseApi，避免宿主同名覆盖。server 与 shared 使用 Nuxt 标准约定，Node 专属代码保持服务端边界。 [Nuxt 目录](https://nuxt.com/docs/4.x/directory-structure) · [Layer 编写](https://nuxt.com/docs/4.x/guide/going-further/layers)

启动装配按“校验宿主配置 → 创建当前上下文的 adapter → 注入客户端与反馈契约 → 页面使用”组织。Nuxt plugin 的名称与依赖顺序在实现中显式声明，异步必需初始化等待完成后再提供能力。默认 Layer 和宿主装配的职责在接口中约定，避免重复注册、重复监听或启动竞态。

## 渲染与部署 profile

| Profile | 适用场景 | 运行交付 | 验收重点 |
| --- | --- | --- | --- |
| spa-static | 已有独立后端的登录型产品 | ssr:false，生成静态产物 | 深链接回退、公开配置、浏览器请求 |
| ssr-node | 需要动态首屏和搜索收录的页面 | 构建 Nuxt 服务，Node 环境运行 | 请求隔离、hydration、缓存与凭据 |
| prerender | 可在构建时枚举的公开页面 | 生成预渲染静态产物 | 路由清单、内容更新方式和 404 |

首版基座至少验证 spa-static 与 ssr-node。prerender 在存在公开内容需求时验收，未执行的 profile 明确标注。Serverless/Edge 需要单独验证运行限制和依赖兼容。静态产物中的服务端接口不会作为运行服务存在，SSR profile 也不自动获得业务后端。

宿主声明浏览器支持矩阵，包括手机 Safari/Android Chrome、桌面浏览器和 WebView 条件。新 CSS/API 根据该矩阵选择兼容方案。构建 target 只能处理其覆盖的语法，不能替代浏览器能力检测与运行验证。 [Nuxt 渲染](https://nuxt.com/docs/4.x/guide/concepts/rendering) · [部署](https://nuxt.com/docs/4.x/getting-started/deployment)
