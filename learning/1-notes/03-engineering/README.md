# 阶段3：TypeScript、pnpm、Vite、代码检查与测试

前置：完成阶段1原生Web基础与阶段2的模块、异步、HTTP和数据边界。目标：能独立安装、组织、检查、测试和构建一个小型Web工程，并定位每层工具的失败。

推荐学习顺序：3.1 → 3.3.1–3.3.10 → 3.2 → 3.4 → 3.5。3.2使用基础TS但不要求Vue；3.3.11和3.5.3是Vue最小契约预览，完整Vue/Nuxt在阶段4。编号保留地图顺序。

理论按问题、机制、例子、场景与边界展开；工具不是魔法，类型也不替代运行校验。

| 章节 | 知识点 |
| --- | --- |
| [3.1 包管理、版本与工作区](./3.1-package-management/README.md) | 6 |
| [3.2 Vite构建、热更新与产物](./3.2-build-tools/README.md) | 7 |
| [3.3 TypeScript类型、模块与配置](./3.3-typescript/README.md) | 12 |
| [3.4 ESLint、Prettier与Git检查](./3.4-code-quality/README.md) | 6 |
| [3.5 Vitest、Vue Test Utils与Playwright](./3.5-testing-basics/README.md) | 5 |

共36项；示例共享package-lab、vite-lab、TS类型实验、quality-lab，综合工程为[阅读任务板](../../4-practice/03-engineering/README.md)。不要为每个知识点新建重复工程。

实际环境Node26.0.0、pnpm11.4.0；固定版本与锁文件以各工程为准。TypeScript选6.0.3匹配当前ESLint适配器支持范围。pnpm11专有设置使用pnpm-workspace.yaml，不能沿用旧.npmrc教程。

[四部分入口](../../README.md) · [阶段3验收](../../../docs/audits/STAGE_3_ACCEPTANCE.md) · [后续Vue 3 / Nuxt路线](../../../knowledge-map/02-engineering-stages-3-5.md)
