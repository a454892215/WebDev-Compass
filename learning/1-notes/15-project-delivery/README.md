# 阶段15：旧项目迁移、代码评审与团队交付 — 理论知识／原理笔记

前置：Vue3/Nuxt、API契约、安全/无障碍、测试、部署与适用的运行时边界。读者已有移动开发经验，组织协作知识可迁移，但DOM/SSR/历史导航、旧标签页和多版本服务的保证需单独核对。

目标：完成一个可解释、可回退的迁移切片，保留决策、评审、回归和交付包；能识别本地实验、组织待执行动作及生产限制。

推荐顺序：15.1确定问题/契约→15.2代码评审→15.3任务/交接→15.4迁移实验；15.5从设计与实现贯穿，在迁移前定义适用范围，交付时专项复核；15.6按业务选修，不是Nuxt主线前置。

- [技术选型、RFC与API契约](./15.1-tech-decisions/README.md)
- [代码评审、热点与渐进重构](./15.2-code-review/README.md)
- [拆分依赖、结对与知识交接](./15.3-team-collaboration/README.md)
- [旧项目切片迁移、切流和回退](./15.4-legacy-migration/README.md)
- [ICU、RTL、时区与无障碍交付](./15.5-i18n-a11y-prod/README.md)
- [转场、导航、存储、认证与可视化（选修）](./15.6-web-platform-advanced/README.md)

四部分：[理论](../../1-notes/15-project-delivery/README.md) · [示例](../../2-examples/15-project-delivery/README.md) · [练习](../../3-exercises/15-project-delivery/README.md) · [Nuxt迁移与34项任务](../../4-practice/15-project-delivery/README.md)。

全图正文建设完成仍不代表学习者掌握；按自己产品继续独立交付、故障复现和目标环境验收。

[学习入口](../../README.md)
