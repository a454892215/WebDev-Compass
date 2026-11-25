# 阶段13：pnpm与Turbo多应用协作工作台

前置阶段3/7/12。目标：从明确依赖的共享产物到两个宿主构建，验证图、缓存、边界与浏览器基线。本例是教材workspace，不修改或合并web-common、web-pc-workframe、web-h5-workframe等独立仓库。

## 目录和真实依赖

```text
apps/web/       Nuxt主应用（4551）
apps/preview/   Vite+Vue预览（4555）
packages/core/  无框架业务函数，tsc输出ESM与DTS
scripts/        AST边界、图与本地缓存验证
tests/          3单元、两视口与HTTP专项
```

web、preview及根测试工具显式依赖core workspace:*；core不能回读apps或偷用未声明运行时依赖。目录、包、任务、产物与部署单元分别判断，同仓不等于同次部署。pnpm负责解析，Turbo负责任务图/缓存；Nx仅官方观察。

固定本轮Node26.0.0/pnpm11.4.0、Turbo2.11.13、Nuxt4.7.0、Vue3.5.46、TS6.0.3、Vite8.3.8、Vitest5.1.1、Playwright1.65.1。Vue/TS用本workspace catalog集中；这是已实测11.4语法，不套最新pnpm文档所有v12行为。

## 运行与验收

在本目录执行，先生成core再启动宿主：

```bash
pnpm install --frozen-lockfile
pnpm build:core
pnpm dev
# http://127.0.0.1:4551/
pnpm build
pnpm --filter @compass/platform-preview preview
# http://127.0.0.1:4555/
```

```bash
pnpm check:boundaries
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test
pnpm verify:graph
pnpm build
pnpm test:e2e
# 本机CI组合入口：
pnpm run check:ci
```

build用真实Turbo图，两个应用build依赖^build先生成core产物。只启用local:rw，关闭Turbo遥测；没有远程cache账户、login/link/token。类型检查不等于Vite转换，实际运行与dry计划分开。test:e2e前须build，启动两个生产/预览服务，后台Chrome结束后全部关闭；默认macOS Chrome，可用CHROME_PATH指定已安装浏览器。

## 图、缓存与边界证据

verify:graph实际读取Turbo dry JSON并核依赖；pnpm反向依赖selector包含core、两应用及根测试工具。它不是SCM --affected实现；真正CI需基线SHA/历史/全局配置影响与全量回退，当前未运行远程CI。

同一脚本在临时本地cache命名空间验证cold miss、warm hit、删除dist后恢复index.js逐字一致、环境COMPASS_LABEL变更miss并核元数据、源码输入变化miss。COMPASS_LABEL仅合成build-info，不是用户数据或私钥。缓存键、输出和产物信任是不同问题；同机样本不保证跨平台复用/普适加速。

缓存源变化实验会短暂追加自有注释，最后恢复并生成local产物。**只在隔离、无并发编辑副本运行**；脚本对已知原文/probe做比对，未知内容保留并报错，不是文件锁或完全并发安全。每条Turbo命令20秒截止，清理cache独立finally执行；不把无条件覆盖当恢复策略。

check:boundaries是只针对core/src TS的最小AST gate：静态import/export/字面量dynamic import/require，拒绝相对逃逸、未声明bare依赖及计算模块名，注释不误报。它不完整解析所有SFC、alias、符号链接或构成安全沙箱。13.5另有真实ESLint/RuleTester，不把自有gate冒称该插件。

Turbo默认会在各包生成.turbo日志，.cache为本地cache；二者忽略提交并从教材/指纹检查排除。源码、配置/锁与文档仍检查，不能用排除掩盖真实学习点。

## 两宿主与兼容基线

主Nuxt和Vite预览从core公开dist导入，显示相同合成计划；没有MF或HTTP加载远程模块。Nuxt有实际SSR内容/useAsyncData payload接管、API运行时限额1–10及400、原生details和锚点。客户端只在函数存在时调用scrollIntoView/焦点；能力缺失注入及禁JS仍有SSR内容/details/锚点。

@supports为标题提供可选排版，print CSS隐藏导航；主未声称完整浏览器矩阵或本身已验证物理打印。真实print媒体/PDF有限证据在兼容lab。只本轮后台Chrome的1440/390模拟视口，不是真机、Safari/Firefox或旧引擎。所有数据是合成，只读API，无身份/持久化系统。

## 四部分与独立实验

[理论](../../1-notes/13-platform/README.md) → [示例](../../2-examples/13-platform/README.md) → [独立练习](../../3-exercises/13-platform/README.md) → [28项任务](./tasks.md)。

- release-lab：真实Changesets依赖联动、pack协议改写、冻结锁拒绝、catalog/override解析。registry/Bot/semantic-release为官方观察，无publish/tag/push。
- build-lab：真实Vite插件/manifest、转换vs类型、显式缓存正反、双格式/声明消费者；主core仅ESM。MF/esbuild/SWC未运行。
- compat-lab：真实无JS/能力缺失/本地按需fallback/@supports/UA伪装/print媒体和有限PDF。不是完整polyfill或真实旧浏览器。
- dx-lab：真实ESLint共享配置/RuleTester、jscodeshift AST、隔离安全generator/pack消费者；VSCode仅静态审查，主未直接集成所有lab工具。

[平台边界](./docs/PLATFORM.md) · [阶段验收](../../../docs/audits/STAGE_13_ACCEPTANCE.md)。所有外部账户/remoteCache/registry/远程CI、真实设计生产部署、真机/多引擎/读屏和学习者试学未执行，不恢复Colima或操作前台。
