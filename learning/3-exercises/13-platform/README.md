# 阶段13：pnpm多包管理、版本发布与CI流水线 — 独立练习与验收

前置3工具/TS、7部署、12包契约；按复用规模和职责学习，不为单应用机械加平台。目标是能解释多包边界，验证编排/缓存/版本与回退，并让浏览器基线可用。

先13.1取舍/图/协议，再13.2锁→版本/依赖与发布边界；13.3按构建问题深化，13.4兼容贯穿，13.5工具把规范变可失败检查。28点保留，无真实registry/remoteCI认证。

- [pnpm/Turbo包与任务图](./13.1-monorepo/README.md)
- [版本、依赖升级与锁](./13.2-release-deps/README.md)
- [插件、缓存与双格式包](./13.3-build-advanced/README.md)
- [支持矩阵与渐进增强](./13.4-browser-compat/README.md)
- [ESLint、AST迁移与生成器](./13.5-dx/README.md)

[四部分目录](../../README.md) · [主多应用workspace](../../4-practice/13-platform/README.md) · [28项综合任务](../../4-practice/13-platform/tasks.md)

实际执行、官方观察、配置推演与新增扩展分开，AI审阅不冒充真实学习者试学；移动端类比不替代Web验证。
