# 14.5 GraphQL、Redis 与数据层协作（按需）

前置：14.2的接口身份/权限/错误边界，以及阶段4的Nuxt请求隔离。推荐按14.5.1→14.5.2→14.5.3→14.5.4→14.5.5阅读；不把选修数据库/GraphQL栈作为所有Web项目的前置。

目标：能定位关联查询N+1、划清缓存生命周期、解释共享会话与限流失效、阅读迁移影响，并为实时连接设计恢复与资源释放。

本组真实实验与明确模型分开：GraphQL/Apollo为实际库，SSE为实际回环HTTP；Redis与迁移是模型/阅读任务，未部署服务。

- [14.5.1 GraphQL：Schema、N+1、DataLoader 与持久化操作](./14.5.1.graphql.md)
- [14.5.2 Apollo / urql：规范化缓存、SSR 隔离与登出清理](./14.5.2.apollo-client-urql.md)
- [14.5.3 Redis 的协作边界：会话、TTL、原子限流与故障策略](./14.5.3.redis.md)
- [14.5.4 Prisma schema 与迁移：读懂约束，保护 API 兼容性](./14.5.4.item-14-5-4.md)
- [14.5.5 WebSocket / SSE：心跳、重连、游标与连接资源](./14.5.5.websocket-sse.md)

[阶段综合任务](../../../4-practice/14-bff-runtime/tasks.md)
