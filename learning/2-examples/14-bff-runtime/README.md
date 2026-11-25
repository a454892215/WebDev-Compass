# 阶段14：Node.js、Nuxt Nitro 与 BFF 接口开发 — 代码与实践示例

前置：阶段2异步、阶段3TypeScript、阶段4Nuxt、阶段5HTTP/认证、阶段7部署、阶段10安全、阶段11观测和阶段12测试。无需先完成React/Next选修。SPA/静态托管不必为学习目录新增BFF。

目标：能按真实需求选择BFF，解释Node调度/背压，在Nuxt中完成可信会话、并行聚合、错误映射并验证多用户隔离；能识别云平台和数据层的运行边界。

推荐顺序14.1→14.2→14.3；14.4/14.5按职责选修，14.6在有文件上传需求时实践。先读机制，再跑最小实验，独立变体最后接入综合项目。

- [Node事件循环、Stream与进程](./14.1-node-runtime/README.md)
- [Nuxt BFF路由、聚合、会话、限流与契约](./14.2-bff-impl/README.md)
- [SSR请求隔离、凭据传播与流式边界](./14.3-ssr-runtime/README.md)
- [Edge部署、存储一致性与缓存（选修）](./14.4-edge-runtime/README.md)
- [GraphQL、缓存、数据迁移与长连接（按需）](./14.5-data-layer/README.md)
- [分片上传、预签名与隔离校验](./14.6-file-upload/README.md)

四部分： [理论](../../1-notes/14-bff-runtime/README.md) · [代码示例](../../2-examples/14-bff-runtime/README.md) · [练习](../../3-exercises/14-bff-runtime/README.md) · [综合项目与任务](../../4-practice/14-bff-runtime/README.md)。

本轮内容完整与本地验证不代表生产部署、所有平台兼容或学习者已掌握。

[学习入口](../../README.md)
