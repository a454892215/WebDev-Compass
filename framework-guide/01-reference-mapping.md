# 参考项目与工程机制采纳

返回[模块入口](./README.md)。本轮只读检查 NBWallet 与 flutter-common，重点采纳工程组织、目录职责、依赖边界、规范治理、AI 工作流和检查门禁。Web 底层能力按 Nuxt/Vue 生态独立选择。以下区分已观察到的工程事实和本方案提出的设计。取证日期为 2026-11-20。

## 宿主、基座与组合根

| 已核验事实 | 证据 | Web 对应设计 |
| --- | --- | --- |
| 宿主依赖独立公共包，并支持本地路径接入 | [NBWallet/pubspec.yaml](</Volumes/Lenovo PS10/projects/NBWallet/pubspec.yaml>) | 基座独立仓库，内部 workspace 联调，外部宿主使用版本包 |
| 基座要求稳定通用能力归公共实现，协议、品牌、业务归宿主 | [flutter-common/AGENTS.md](</Volumes/Lenovo PS10/projects/flutter-common/AGENTS.md>) | 纯公共包不引用宿主，业务接口、主题选择、路由由宿主配置 |
| 应用入口显式初始化并装配公共模块 | [NBWallet/main.dart](</Volumes/Lenovo PS10/projects/NBWallet/lib/main.dart>) · [公共装配入口](</Volumes/Lenovo PS10/projects/flutter-common/lib/flutter_common_host.dart>) | 宿主 Nuxt plugin 装配请求客户端、认证适配和反馈接口 |
| HTTP 的业务协议和会话行为由宿主适配 | [HTTP 配置契约](</Volumes/Lenovo PS10/projects/flutter-common/lib/http/business/http_host_config.dart>) · [宿主实现](</Volumes/Lenovo PS10/projects/NBWallet/lib/common_config/app_http_config.dart>) | 传输与协议解码分离，基础层暴露契约 |
| 公共模块有有限公开入口 | [模块规则](</Volumes/Lenovo PS10/projects/flutter-common/lib/modules/AGENTS.md>) | package exports、明确的层入口、内部路径约束 |

组合根可借鉴的重点是显式装配依赖与执行顺序。宿主通过适配器表达差异，基座通过契约调用。Web 运行期生命周期按 Nuxt 官方机制设计，具体要求见[公共模块契约](./03-common-modules.md)。

## AI 工作流与规则

| 已核验机制 | 证据 | Web 对应设计 |
| --- | --- | --- |
| 公共规则由基座维护，宿主入口按任务加载 | [规则索引](</Volumes/Lenovo PS10/projects/flutter-common/ai_rules/README.md>) · [宿主 AGENTS.md](</Volumes/Lenovo PS10/projects/NBWallet/AGENTS.md>) | 发布工作流规则包，宿主保留绑定、加载矩阵和项目事实 |
| 规则和检查实现有对应关系 | [规则与检查说明](</Volumes/Lenovo PS10/projects/flutter-common/ai_rules/README.md>) · [检查器入口](</Volumes/Lenovo PS10/projects/flutter-common/tools/project_rule_checker/README.md>) | rule ID、作用范围、检查实现和人工部分形成登记表 |
| 工作流入口使用固定六栏 | [工作流标准](</Volumes/Lenovo PS10/projects/flutter-common/ai_workflow/ai_workflow_standard/README.md>) | 概述、前置条件、允许修改范围、边界、流程、验收与交付 |
| 任务清单支持稳定 ID、状态、证据与恢复 | [任务清单标准](</Volumes/Lenovo PS10/projects/flutter-common/ai_workflow/ai_workflow_standard/task_checklist_standard/README.md>) | 记录输入摘要、规则版本、产物、阻塞和结果失效条件 |
| 提交门禁检查暂存快照 | [宿主 hook](</Volumes/Lenovo PS10/projects/NBWallet/.githooks/pre-commit>) · [公共提交入口](</Volumes/Lenovo PS10/projects/flutter-common/ai_rules/hooks/before-git-commit.sh>) | 检查暂存内容，CI 再对提交运行完整检查 |
| 宿主 hook 解析公共工具来源 | [薄 hook 实现](</Volumes/Lenovo PS10/projects/NBWallet/.cursor/hooks/_shared.py>) · [公共工具入口](</Volumes/Lenovo PS10/projects/flutter-common/bin/tools.dart>) | 使用已安装包解析，显式传入 hostRoot |

工作流收尾还有独立调度结果，见[调度入口](</Volumes/Lenovo PS10/projects/flutter-common/ai_workflow/ai_workflow_standard/project_workflow_dispatch_ai_workflow/ENTRY.md>)。Web 规划继承可续跑和完整核验的语义，具体字段与命令在[质量文档](./05-ai-workflow-and-quality.md)定义。

## 检查治理机制的 Web 实现

NBWallet 的 analysis_options.yaml 主要继承基础 lint 并排除生成目录，项目级架构约束另由公共 AST 工具实现。因此 Web 侧需要 TypeScript、ESLint 和结构检查共同承担职责。 [宿主分析配置](</Volumes/Lenovo PS10/projects/NBWallet/analysis_options.yaml>) · [公共规则清单](</Volumes/Lenovo PS10/projects/flutter-common/tools/project_rule_checker/RULES.md>)

| Flutter/Dart 能力 | Web 对应 |
| --- | --- |
| flutter analyze、语言类型检查 | nuxt typecheck、纯包 tsc、TypeScript strict |
| Dart AST 架构检查 | Vue/TypeScript AST、ESLint 规则、解析后的包依赖图 |
| 格式化 | Prettier，ESLint 关闭冲突的格式规则 |
| 页面状态约束 | Vue composable 与 Pinia 生命周期、异步状态验证 |
| Widget 与集成测试 | Vue Test Utils、Nuxt Test Utils、Vitest、Playwright |
| 安装、同步、检查工具 | 版本化 Node CLI，编辑器与 CI 调用同一入口 |

## 采纳范围与独立选型

基座与宿主的职责分离、标准目录、公共入口、版本绑定、规则唯一源和任务验收机制纳入 Web 工程方案。参考源码中的业务协议只用于理解宿主适配边界，Web API 的具体字段由未来宿主定义。

Web 的路由、状态、HTTP、认证、CSS、SSR、构建与部署分别采用 Nuxt/Vue 和浏览器的标准机制。技术方案依据官方支持、维护状态、生态适用范围与回归结果评估。SSR 请求隔离等要求属于 Web 自身规范，详见[技术选型](./02-architecture-and-stack.md)和[公共模块](./03-common-modules.md)。

参考项目中的兼容政策、审批约定、业务域名及历史设备授权分别属于对应项目。Web 规则根据实际职责重新定义。参考 README、规则和存量实现之间存在历史差异时，提炼其治理目的并记录新的 Web 检查契约。

## 官方分层资料的使用情况

已读取 flutter-apply-architecture-best-practices 技能，采用 UI、数据、可选领域层以及依赖注入的职责原则。Google Developer Knowledge 查询失败并返回 HTTP 403，改读官方网页。Flutter 官方也说明架构建议需要结合应用调整，故本方案只迁移适用原则。 [Flutter 架构建议](https://docs.flutter.dev/app-architecture/recommendations) · [Flutter 架构指南](https://docs.flutter.dev/app-architecture/guide)

SSR 隔离依据 Nuxt 状态管理文档，样式和语义依据 Modern Web Guidance。 [Nuxt 状态管理](https://nuxt.com/docs/4.x/getting-started/state-management) · [CSS 架构](https://developer.chrome.com/docs/modern-web-guidance/guides/css/css) · [HTML](https://developer.chrome.com/docs/modern-web-guidance/guides/html/html)
