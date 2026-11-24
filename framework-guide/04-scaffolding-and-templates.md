# 官方脚手架、应用模板与宿主接入

返回[模块入口](./README.md)。本文件保留初始规划的官方入口、生成流程和拟建命令契约；已经实施的部分见交接记录，不能把下方全部 CLI 目标当作可运行命令。

> 实施状态更新：独立基座和两端骨架已建立。本文中的完整契约与拟建命令包含未实现目标；实际能力、历史验证和差异见[交接记录](./07-implementation-status.md)，不要仅据本文勾选验收。

## 已有成熟工具怎样使用

| 工具 | 提供的骨架能力 | 在本方案中的位置 |
| --- | --- | --- |
| Nuxt create-nuxt | 初始化应用，选择模板、模块与包管理器 | 官方应用骨架的首选入口 |
| nuxt/starter | 应用、Layer、模块等起步结构 | 以实施时存在且验证过的模板为准 |
| Nuxt UI 官方模板 | Starter、Landing、SaaS、Docs、Chat 等 | 桌面和响应式模板的界面起点 |
| Vant 与其 Nuxt 模块 | 手机 Web 组件和 Nuxt 接入 | 手机应用的 UI 依赖 |
| pnpm workspace | 多包组织、依赖链接、锁文件 | 基座内部和双应用宿主的包管理 |
| Nuxt module-builder | Nuxt 模块打包 | 需要注册模块或构建期集成时采用 |
| Changesets | 多包版本与变更记录 | 基座发布阶段接入 |

以上工具已有公开官方文档或上游仓库。这里按职责与匹配程度选择，流行程度不等同于本团队适用性。Nuxt 官方 starter 生成通用骨架，宿主边界、HTTP 契约与团队工作流由本方案补齐。 [create-nuxt](https://nuxt.com/docs/4.x/api/commands/init) · [starters](https://github.com/nuxt/starter) · [UI 模板](https://ui.nuxt.com/templates) · [Vant 模块](https://github.com/vant-ui/vant-nuxt) · [module-builder](https://github.com/nuxt/module-builder) · [Changesets](https://github.com/changesets/changesets)

## 首次生成的步骤

1. 在未来 web-common 仓库核对 Node、pnpm、Nuxt 4 与 Vue 3 的兼容版本，记录选择理由与锁文件。
2. 使用官方工具生成最小验证应用，选择 pnpm，确认 Nuxt 标准目录和启动命令。
3. 从官方 Layer 起步结构或最小 nuxt.config.ts 建立共享层，建立纯 TypeScript core 包。
4. 在验证应用中安装公共包并使用 extends 接入 Layer，先验证公开 API 与每请求装配。
5. 接入桌面或手机 UI，完成示例页面和检查命令，再将确认的结构固化为团队模板。
6. 在仓库外打包安装并创建干净宿主，验证公共包、规则与模板资源完整。

官方初始化命令示例，执行目录与目标名称由未来实施任务确认。

~~~bash
npm create nuxt@latest desktop-playground -- --packageManager=pnpm
~~~

运行后跟随脚手架提示。当前官方入口为 create-nuxt，旧的 nuxt init 已移除。实施时记录脚手架版本、模板 revision 和生成选项，稳定后团队生成过程使用锁定的来源。 [官方命令](https://nuxt.com/docs/4.x/api/commands/init)

### 宿主 Layer 接入示意

~~~typescript
// 宿主 nuxt.config.ts
export default defineNuxtConfig({
  extends: ['@web-base/nuxt'],
  runtimeConfig: {
    public: {
      apiBase: '/api',
    },
  },
})
~~~

这是待发布包的接入示意。实施时包元数据必须让 Nuxt 能解析 Layer 入口，并包含 nuxt.config、app、shared、必要资产和正确依赖。公共 Layer 应显式处理内部路径，避免将宿主别名误解析为基座路径。 [Layer 编写](https://nuxt.com/docs/4.x/guide/going-further/layers)

## 模板契约

| 项目模板 | 生成内容 | 端侧验收 |
| --- | --- | --- |
| desktop | Nuxt UI、桌面布局、导航、登录/列表/详情示例、反馈适配 | 键盘、焦点、窄窗口、桌面浏览器 |
| mobile | Vant、手机布局、底部导航、登录/列表/详情示例、反馈适配 | 触控、软键盘遮挡、横屏、安全区、动态视口 |
| responsive | 单应用布局、同一业务的宽窄视口表现 | 中间宽度、缩放、导航折叠、内容可达 |

模板统一接入基座版本、代码检查、任务工作流、测试启动和 profile 配置。UI、品牌 token 与路由分别归应用所有。表单和错误示例使用 fixture，明确与真实认证服务的连接位置。

首版交付 desktop 与 mobile，responsive 在阶段 W5 增加。模板应能生成一个应用，或双应用产品 workspace。两个宿主需要相互独立仓库时，分别运行单应用生成模式并依赖相同版本基座。

每个模板都声明支持的 profile，运行时 SSR profile 应在打包后的宿主验证 Vant/Nuxt UI 接入和 hydration。手机页面同时保留浏览器缩放、语义标签与键盘可达性。宽窄适配使用真实布局规则，避免整页按固定设计宽度缩小。 [布局指南](https://developer.chrome.com/docs/modern-web-guidance/guides/css/css-layout) · [HTML 指南](https://developer.chrome.com/docs/modern-web-guidance/guides/html/html)

### 模板构建与部署命令契约

| Profile | 模板构建脚本实际调用 | 交付与启动 |
| --- | --- | --- |
| spa-static | ssr:false，nuxt generate | 部署 .output/public，静态服务配置深链接回退 |
| prerender | SSR 开启，nuxt generate，配置需预渲染路由 | 部署 .output/public，明确未生成路由的行为 |
| ssr-node | nuxt build，Node preset | 部署 .output，生产环境运行 node .output/server/index.mjs |

模板的 build 脚本按选定 profile 映射上述命令。静态部署如果使用 /api，部署侧需要配置反向代理或可用的同源 API 服务；跨域 API 则明确 baseURL、CORS 与认证配置。静态托管本身不执行 Nuxt server/api。 [部署文档](https://nuxt.com/docs/4.x/getting-started/deployment) · [generate](https://nuxt.com/docs/4.x/api/commands/generate)

## 团队 CLI 的拟建命令

未来 @web-base/tooling 发布 web-base 可执行入口。以下名称是实现目标，当前尚不可运行。

~~~text
web-base create <target> --template desktop|mobile|responsive --profile spa-static|ssr-node|prerender
web-base create <target> --template desktop,mobile --workspace --profile desktop=ssr-node,mobile=spa-static
web-base doctor --project-dir <hostRoot>
web-base rules sync --project-dir <hostRoot> --check
web-base rules sync --project-dir <hostRoot> --apply
web-base check --project-dir <hostRoot> --scope staged|all
web-base workflow validate --project-dir <hostRoot>
web-base workflow closeout --project-dir <hostRoot>
~~~

版本化依赖安装后通过 pnpm exec web-base 调用。CLI 从自身安装位置解析公共资源，通过 project-dir 和绑定文件定位宿主。路径包含空格、包作用域、自定义应用名和不同工作目录都需要正反样例。

单应用必须明确 profile，双应用必须提供每个应用的 profile 映射。交互模式可以询问并写入确定值，无交互模式缺失时返回诊断。生成结果记录每个应用的渲染与部署设置，避免依赖框架默认值猜测产品需求。

### 生成和同步的行为要求

- 在写入前显示目标、计划文件与来源版本，提供 dry-run。执行默认只创建空目标，存在文件时给出冲突清单并保留原文件。
- 临时目录完成渲染与基础验证后提交生成结果，失败时报告已保存文件、临时目录和恢复步骤。生成器不得依赖模板中任意 shell 片段执行初始化。
- 重复 sync 结果幂等。只更新带来源标记且哈希匹配的受管段，宿主人工内容保持独立区段。受管段被修改时返回冲突，不静默覆盖。
- 资源解析、模板文件缺失、schema 不兼容和路径逃逸均以明确诊断失败，退出码供 CI 使用。
- create、sync 和 doctor 的行为单独测试。普通 sync 不改变依赖版本，升级由明确的升级任务完成。

## 本地联调与正式依赖

基座 workspace 内部使用 workspace 协议，开发期验证应用可以直接引用源码。跨仓库联调优先把已构建包打成 tarball 后安装，或者在受控的本地 workspace 中链接。正式宿主使用已发布版本与锁文件，CI 从干净环境安装。

任意相邻目录路径不作为正式依赖。包发布前检查 files/exports/types、peerDependencies、工作流与模板资源、许可证和 sourcemap 内容。Layer 包包含运行所需源码，纯 TS 包包含声明与构建产物，tooling 包包含可执行 JS 和资源。

宿主通过包公共入口引用能力，避免深路径访问。Vue/Nuxt 等宿主提供的框架依赖声明为适当 peer，核对安装树中是否出现意外重复实例。规则包和 CLI 需要可在生产裁剪开发依赖前执行，正式运行应用不依赖开发工具。

## 升级与退出

1. 基座记录变更、兼容矩阵和必要迁移步骤，输出版本包。
2. 在独立验证宿主升级，运行受影响模块检查和已声明的 profile 验收。
3. 更新业务宿主 lockfile，再同步同版本规则及工作流资源。
4. 检查模板生成文件与人工文件的差异，必要迁移以独立步骤呈现。
5. 出现回归时恢复宿主依赖与锁文件，按先前部署产物回退，单独处理已发生的外部数据变化。

本方案建议首版各公共包采用协调版本发布，减少“运行包已升级而规则包仍旧”的歧义。模板复制出的业务页面不会自动获得上游修改，后续升级主要通过公共包、Layer 和明确迁移传递。 [pnpm workspace 协议](https://pnpm.io/workspaces) · [Layers](https://nuxt.com/docs/4.x/getting-started/layers)
