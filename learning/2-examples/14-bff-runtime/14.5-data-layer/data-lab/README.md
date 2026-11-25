# 数据层协作实验：GraphQL、缓存与SSE

本实验对应14.5.1–14.5.5。先学BFF鉴权与请求隔离，再在本目录执行：

~~~bash
pnpm install --frozen-lockfile
pnpm test
~~~

固定版本：Node26.0.0、pnpm11.4.0、GraphQL16.11.0、DataLoader2.2.3、Apollo Client4.0.9、RxJS7.8.2。安装锁定教学版本不表示它们是最新版本；新生产项目需做自己的版本和安全升级审查。

8项测试覆盖：真实GraphQL N+1与batch顺序/去重；并发租户请求隔离；预注册operation hash拒绝未知操作；真实Apollo规范化缓存extract/restore和清空；Redis会话/TTL/限流单进程模型；迁移DTO可空/投影边界；有上限full-jitter和重放游标；真实回环HTTP SSE头部/字节/取消清理。

lab.mjs是可读实现，test.mjs给定输入和失败断言。SSE测试临时绑定127.0.0.1随机端口，验证结束关闭；没有长驻服务器或对外请求。schema.prisma和migration-plan.md只作Prisma ORM7阅读材料，不是完整数据库项目。

## 明确未实现

没有远程Schema Stitching、APQ注册协议、Apollo HTTP/框架集成、urql运行、Redis进程、Prisma CLI/真实数据库、浏览器EventSource、WebSocket、云端和生产部署。Redis和迁移为显式本地模型/观察，不能声称集成成功。SSE身份固定A，不提供认证服务；生产必须先验证用户再选择事件流，游标不替代授权。

## 教学顺序

1. 先预测3次读取为何变成1次，查看keys顺序。
2. 比较两个请求同时使用id=1为何不能共用loader/cache。
3. 从DTO失败推导迁移发布顺序，不让类型非空断言掩盖null。
4. 读取真实SSE字节，区分TCP块与事件，取消连接后核对close清理。
5. 在隔离副本完成每点独立练习，再回到综合任务提出主BFF扩展。主BFF使用REST并不因此自动接入GraphQL/Redis/数据库。
