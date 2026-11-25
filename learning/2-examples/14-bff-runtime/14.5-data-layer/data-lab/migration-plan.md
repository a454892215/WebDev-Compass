# Expand → backfill → contract（版本化观察任务）

本 fixture 使用 Prisma ORM 7 的 schema 语法阅读，不安装 Prisma、连接数据库或执行迁移。最新官方文档可能属于新主版本，其命令不可直接混用。

1. Expand：新增可空 displayName，保留 legacyName；旧客户端仍读原 DTO。
2. 新后端双写；分批回填并记录失败。toViewerDto 对 null 的失败测试故意说明不能提前切换严格契约。
3. 查询剩余 null 和旧客户端占比，切换 DTO 字段来源；先发布兼容前端，再考虑收紧约束。
4. Contract：确认旧版本不再依赖后删旧列。删列/回填不可假定自动无损回滚，需备份、恢复演练与发布窗口。

阅读 schema 时说明主键、可空、唯一约束与关系；生成客户端类型不会自动改变公开 HTTP DTO。绝不在生产运行开发重置命令。
