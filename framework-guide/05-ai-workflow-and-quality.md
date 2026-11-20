# AI 工作流、规则与质量门禁

返回[模块入口](./README.md)。本文件定义未来基座中需要实现的工作流与检查能力。当前文档中的命令、诊断 ID 和 schema 均为规划契约，实施后通过测试和运行证据确认覆盖范围。

## 唯一规则源与宿主入口

基座的 workflow-kit 保存详细规则、工作流入口、机器索引和任务 schema。宿主 AGENTS.md 保留项目事实、规则解析入口、按任务加载矩阵和差异，受管摘要记录来源包版本与内容摘要。Codex 每次执行先读取宿主入口，再读取适用公共规则。

工作流详情默认通过已安装包读取，宿主只同步必要的薄索引。编辑器专用格式通过 adapter 生成，Codex 的入口明确使用 AGENTS.md。工具 CLI、Git hook 与 CI 调用同一检查实现。

拟建 workflow-kit 结构如下。

~~~text
workflow-kit/
├── ai_rules/
│   ├── index.json
│   ├── common/
│   ├── nuxt/
│   └── ui/
├── ai_workflow/
│   ├── index.json
│   ├── foundation-setup/ENTRY.md
│   ├── host-onboarding/ENTRY.md
│   ├── feature-delivery/ENTRY.md
│   └── foundation-upgrade/ENTRY.md
├── schemas/
│   ├── task.schema.json
│   └── binding.schema.json
└── host-entry.template.md
~~~

规则至少记录 ID、目的、适用文件、来源、级别、检测器、正反样例、人工验收部分和修复建议。宿主例外需说明范围和依据，必要时记录复查条件。引用缺失或版本不兼容应清晰报错，并允许继续完成不依赖该项的工作。

## 工作流入口标准

每个 ENTRY.md 使用六个固定栏目。

1. 任务概述，说明目标与交付物。
2. 前置条件，列出输入、工具和适用 profile。
3. 允许修改范围，给出仓库、目录和产物根。
4. 任务边界，说明本轮任务职责和外部依赖。
5. 执行流程，按依赖推进、记录结果与恢复入口。
6. 验收与交付，列出检查命令、证据和收尾动作。

公共规则定义宿主不得反向依赖、SSR 隔离和代码边界等技术要求。用户当前授权、仓库规则与工具权限在实际执行中核对，参考 Flutter 项目的历史审批与设备授权不继承到 Web 项目。

## 可续跑任务清单

宿主将任务清单和可长期保留的证据摘要放在 docs/tasks/<task-id>/，临时视频、完整浏览器缓存和敏感原始日志按产物策略排除。任务记录至少包含下列字段。

~~~json
{
  "schemaVersion": 1,
  "taskId": "host-onboarding-example",
  "inputs": {
    "foundationVersion": "<resolved-version>",
    "rulesDigest": "<sha256>",
    "sourceRevision": "<git-sha-or-worktree-digest>"
  },
  "items": [
    {
      "id": "HOST-HTTP-01",
      "status": "pending",
      "dependsOn": [],
      "acceptance": "超时、取消与业务失败具有不同结果",
      "evidence": [],
      "blocker": null
    }
  ]
}
~~~

schema 校验 required 字段、唯一 ID、合法状态、证据路径和依赖环。状态包括 pending、in-progress、awaiting-review、passed、not-applicable、blocked、failed。not-applicable 必须有理由，passed 必须有对应验收证据。

干净源码树可使用 Git SHA 作为 sourceRevision，脏工作区使用相关源码、依赖锁文件、配置和规则的内容摘要。摘要排除任务清单、证据、日志、时间和 mtime，证据另行绑定内容哈希，防止写结果就触发自身失效。摘要范围由任务依赖声明并在配置变化时重新计算。

结果记录命令、工作目录、时间、输入/产物摘要、退出码与验证层级。代码或输入变化后，把受影响项及其下游重置为待验证状态。多个写入者采用单写者协调或版本号冲突检测，以临时文件加原子替换更新清单。

收尾工具采用下列结果语义。

| 结果 | 意义 | 执行方后续动作 |
| --- | --- | --- |
| continue | 仍有可独立推进的条目 | 继续执行 |
| ready-to-archive | 验收项已核对，等待归档 | 写归档与恢复摘要后再核验 |
| blocked | 剩余项均缺少外部条件或授权 | 报告已做、未做和恢复条件 |
| complete | 全部适用验收与归档完成 | 可以交付 |
| error | schema、证据或工具异常 | 诊断并修复，保留原清单 |

无 required 失败项、适用项证据有效、阻塞逐项明确后才进入相应收尾状态。实施阶段执行本工作流时，最终回复前运行 closeout 并遵从结论。文档规划的完成与基座实施的完成分别记录。

## Dart 检查器对应的机械检查

| 规则 ID | 拟检查内容 | 工具与覆盖边界 |
| --- | --- | --- |
| BASE-DEP-001 | 基座不得导入宿主、模板、playground | 包图与路径解析，覆盖别名、相对路径、再导出 |
| BASE-API-002 | 宿主只使用已声明公共入口 | package exports、解析后的 import 检查 |
| BASE-UI-003 | 展示组件保持业务服务边界，页面按 Nuxt 生命周期取数 | Vue/TS AST；识别显式和自动导入，页面 useFetch/useAsyncData 允许，命令式请求通常归宿主 API |
| BASE-SSR-004 | 通用模块顶层不得保存用户相关可变状态 | AST 检查顶层响应式状态/副作用，跨用户语义由并发 SSR 测试补充 |
| BASE-ENV-005 | 服务端秘密不进入客户端模块 | 包边界、配置来源审查和产物抽查；字段是否敏感仍需人工判定 |
| BASE-ASYNC-006 | 异步结果与生命周期正确衔接 | typed lint 检查未处理 Promise，取消与会话归属由行为测试验证 |
| BASE-WORKFLOW-007 | 规则、索引和工作流引用一致 | JSON schema、链接、版本摘要检查 |
| BASE-STYLE-008 | token 与样式边界符合模板约定 | 对指定 CSS 和 Vue style 运行 AST 检查，允许品牌资源与明确例外 |

基于路径的普通静态 import 可以先由 no-restricted-imports 和 TypeScript 对应规则处理。别名逃逸、barrel 再导出、动态 import 和 CommonJS 边界需要解析依赖图或补充规则。无法解析的动态路径要报告限制，不能记为全部覆盖。 [ESLint import 规则](https://eslint.org/docs/latest/rules/no-restricted-imports) · [typed lint](https://typescript-eslint.io/getting-started/typed-linting/)

自定义 Vue 规则同时检查 script 与模板表达式，考虑 Nuxt 自动导入和模板事件处理。每条规则提供合法、非法、别名、生成文件、配置例外等 fixture。架构职责依据实际文件分类定义，避免仅凭变量名或正则认定逻辑正确。

Nuxt pages 本身可以直接使用 useFetch/useAsyncData 获取页面数据。仅当逻辑需要复用或组合时再抽 composable。首次数据生命周期与点击事件中的 $fetch 命令分别处理，检查器不得以统一禁止页面取数的方式强迫增加包装层。

## 标准检查入口

未来根 package scripts 提供统一命令。实现阶段在各包和宿主中兑现下列契约。

| 命令 | 执行内容 |
| --- | --- |
| pnpm format:check | 只读格式检查 |
| pnpm lint | ESLint 基础、Vue、typed lint 与架构规则 |
| pnpm typecheck | Nuxt 应用运行 nuxt typecheck，纯 TS 包运行 tsc |
| pnpm check:structure | 依赖图、exports、目录、资源与绑定检查 |
| pnpm test:unit | Vitest 与必要的 Vue/Nuxt 测试 |
| pnpm check:workflow | schema、索引、证据和可续跑状态检查 |
| pnpm check | 汇总格式、lint、类型、结构、单元与工作流检查 |
| pnpm test:e2e | 对明确变更范围运行浏览器流程 |
| pnpm build | 按依赖顺序构建包与本次目标应用 |

Nuxt 默认开发或构建成功不等同于类型检查通过，nuxt typecheck 应单独纳入门禁。保留 Nuxt 生成的 TypeScript 工程结构，纯包使用独立配置。ESLint 使用 Nuxt flat config 集成，Prettier 承担格式化并关闭相冲突规则。 [Nuxt 类型检查](https://nuxt.com/docs/4.x/api/commands/typecheck) · [Nuxt ESLint](https://nuxt.com/modules/eslint) · [TypeScript strict](https://www.typescriptlang.org/tsconfig/strict.html)

## Git、CI 与最小充分验证

提交 hook 检查真实 index 内容。存在部分暂存时，构建出暂存文件快照或直接对暂存源运行支持的检查，不能把工作区通过当成暂存内容通过。首版 hook 以快速结构与 AST 检查为主，完整类型、测试与构建由 CI 在提交快照执行。依赖、配置或公共导出变化时扩大相关检查范围。

hook 安装到当前宿主明确配置的 hooksPath，保留已有 hook 的组合行为。受管摘要、签名和规则正文来自同一包版本。工具异常以非零退出，防止静默跳过检查。CI 与本地均使用同一实现，权限例外和既有 hook 的修改按当次任务授权处理。

普通业务变化先运行受影响的轻量检查。共享 HTTP、SSR 状态、打包导出和模板改动需要对应专项回归。规则实现使用正反 fixture，模板发布使用干净生成验收，避免每个任务反复全量构建。

Playwright 默认后台运行。报告明确标识桌面视口、手机模拟、浏览器内核及真实设备证据。软键盘、WebView bridge、支付回调等真实环境相关问题再补专项真机验证，取得本轮必要证据后结束。 [Nuxt 测试](https://nuxt.com/docs/4.x/getting-started/testing) · [Playwright 模拟](https://playwright.dev/docs/emulation)

## AI 协作与规则维护

任务开始核对宿主绑定、已解析基座版本、源码状态和适用指南。Web 相关任务先检索 Modern Web Guidance，读取相关正文，记录采用的指南 ID/链接与兼容性判断。普通业务任务在宿主执行，公共能力变更在基座任务中实施并产生版本，再回到宿主升级验证。

AI 规则写明输入、输出和验收，具体流程按风险和依赖选择。脚本负责可机器判定部分，人工/模型审查负责语义、视觉与业务正确性。新检查规则先用 fixture 和现有宿主评估误报，再记录级别变化与迁移方式。
