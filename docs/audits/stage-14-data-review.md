# 第14阶段14.5数据层协作逐点审查

日期：2026-11-25。范围：14.5.1–14.5.5；依据AUTHORING R01–R09。逐点理论、示例、练习已交叉阅读；综合任务的integrationCase交给主代理写入共享tasks后再做全阶段门禁，不由本组冒称阶段整体已验收。

## 规划核对与顺序

保留5个稳定编号，无新增重复知识点。14.5.1补充DataLoader顺序/缺失值、请求生命周期与APQ和白名单区别；14.5.2补充实体身份与请求隔离分别解决的问题、登出晚到响应风险；14.5.3补充Redis原子TTL与多副本故障策略；14.5.4补充版本核对、可空回填及expand/contract；14.5.5补充游标授权、至少一次去重、原生EventSource重连和应用退避的责任边界。这些是真实遗漏的细化，未扩大主线必修工具。

| 点 | 机制与四部分审查 | 本轮证据 | 明确限制 |
| --- | --- | --- | --- |
|14.5.1|schema/独立resolver→N+1→批量顺序和请求隔离→预注册操作；练习变为4篇/缺失作者，排错直接返回逆序rows|真实graphql-js两路径同结果，3次→1次；并发A/B隔离；未知hash拒绝|无数据库、远程stitching或APQ握手|
|14.5.2|规范化实体身份与每请求cache分开；extract/restore不等于安全HTML；练习包含登出晚到竞态|真实Apollo InMemoryCache A/B快照、恢复和清空|无urql/框架插件或浏览器登录流|
|14.5.3|共享Redis角色→TTL/撤销→原子窗口→故障策略；明确模型单进程|固定时钟过期/撤销/限流及tenant key|无Redis服务器/脚本/多副本实测|
|14.5.4|schema约束→DTO投影→回填→兼容切换；Prisma7 fixture不混用Prisma8命令|null拒绝、回填后DTO正确且排除passwordHash|只阅读schema，不执行Prisma/SQL|
|14.5.5|SSE/WebSocket区别→心跳→退避/游标→资源清理；练习要求快照reset和最后订阅关闭|实际HTTP SSE Last-Event-ID=1、只A id3、心跳、cancel后close；退避确定性测试|无浏览器EventSource、WebSocket、CDN/真实网络|

## 来源与修正

已读MWG Web Security正文（cookie/信任边界），没有找到GraphQL/Redis专门指南，因此具体服务端机制使用官方一手资料。核对GraphQL DataLoader每请求与输入顺序、Apollo cache/SSR/logout、Redis INCR竞争窗口、Prisma7升级与当前迁移文档、MDN SSE格式和关闭。urql网站正文无可读内容，改读官方GitHub仓库SSR及Document Caching正文，未伪称运行urql。

审查时修正两个潜在误解：Prisma当前官网包含8的新迁移命令，教材改成明确7的schema阅读且不执行CLI；urql缓存不是默认Apollo式规范化，SSR exchange另有生命周期。所有主工程关联任务均写成可选扩展/评审，不声称主BFF已具备GraphQL、Redis、数据库或生产消息总线。

## 本轮验证

在data-lab冻结依赖安装后执行pnpm test，Node26.0.0/pnpm11.4.0，8/8通过。第八项仅127.0.0.1随机临时端口，连接和server均关闭。没有真实凭据、公开网络接口、云资源、数据库或容器。静态检查与共享tasks链接由主代理集成复验。

本组没有已知阻断缺陷；完整阶段R08/R09及29点映射仍需主代理结合全阶段证据判断。未做真实学习者试学，不能把AI审查当掌握证明。
