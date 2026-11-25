# 阶段14.4 Edge 分组逐点审查

审查日期：2026-11-25。范围：14.4.1—14.4.5；四部分逐点映射与综合任务正文由stage-14-edge-points.json提供，主代理统一集成tasks.md及阶段契约。以下是资料审查和本地运行证据，不是学习者试学或生产验收。

## 规划与顺序

保留五个既有编号和链接，无新增重复点。先运行时/API/数据位置，后适配器，再可信中间件、存储一致性与共享缓存。关联14.1/14.2和阶段6缓存前置。对当前资料明显变化作实质修订：Vercel推荐Node、Next16.3约束、Cloudflare兼容日期行为、Edge Config更名Global Config；不照抄历史模板。

## 逐点结论

| 点 | 理论与边界 | 示例/练习/综合任务核对 |
| --- | --- | --- |
| 14.4.1 | Edge部署位置不等同特定API运行时；端到端与冷启动、CPU/墙钟、数据位置分开；Node兼容按平台/日期 | Node实际Request/Response契约通过；选型与错误持久化假设练习有判据；迁移主Node/Nitro为新增，不假称已部署 |
| 14.4.2 | Vercel当前产品/Next版本边界和Workers入口分清；Nuxt按Nitro适配 | GET200/POST405/未知404真实断言；平台预览/绑定/回滚观察卡未执行清楚；错误Nuxt配置有具体定位 |
| 14.4.3 | 身份和Geo可信链、服务端owner授权、分桶非鉴权、缓存变体风险均说明 | 伪造Header401、固定fixture并发隔离、稳定散列实测；信任客户端身份故障注入会失败；新增owner检查与实验响应任务分清 |
| 14.4.4 | KV最终一致及负缓存；D1参数绑定/batch事务和Sessions读顺序；Global Config配置用途分开 | 两位置旧读模型真实运行且明确不是KV SDK；D1片段注明未执行；KV非原子限流排错要求列丢更新时序并实施变体；综合要求多实例迁移新增 |
| 14.4.5 | HTTP/CDN/Worker Cache API和应用Map分层；Cache API不自动支持SWR；凭据/键/过期/失败边界 | 10s/30s时间边界、刷新、失效、并发合并、有限条目、语言和凭据绕过实测；绕过和无限旧值故障回归有效；真实CDN后续验证明确 |

## R01—R09

- R01：五点均有理论、操作卡、独立练习和逐点综合任务素材，不用空文件或复制任务。
- R02：顺序与前置明确；未将Cloudflare/Next作为Nuxt主线通关前提。
- R03：查阅MWG performance与security正文；平台机制依据Cloudflare Workers/KV/D1、Vercel当前官方和Nuxt部署正文核实。官方链接在各篇。
- R04：Node26无依赖10项通过；不启动网络或真实云服务。Request对象不是HTTP网络实测。官方平台观察卡清楚标未执行。
- R05：五篇有动手任务、至少2条标准、具体故障和参考；生产选型允许观察记录，缓存/身份变体用实际代码排错。
- R06：已读主nuxt.config.ts、server/api/dashboard.get.ts和server/utils/state.ts：当前node-server、私有no-store、单实例教学会话/限流；综合任务正确要求新增迁移/公开缓存，没有声称已接KV/CDN。
- R07：fixture Cookie解析非生产；地域来自注入回调；同名客户Header无效。Node模型与云平台能力不混用。没有浏览器UI，不增加无意义真机流程。
- R08：真实运行和三类故障注入见stage-14-edge-runtime.json，副本在临时目录，主实验未破坏。必达缺陷已关闭：明确Cache API不支持SWR指令；补D1未执行观察片段；缓存pending生产限额不足明确列边界。
- R09：本分组索引已同步，主阶段统计/契约/总验收由主代理最终核验；本记录不自行更改学习勾选。

## 限制

未使用Wrangler/workerd，无真实Workers/Vercel发布、冷启动/CPU计费、跨区域Geo、KV/D1/Global Config、真实CDN或账号系统。固定身份表和最终一致Map用于教学机制，不是生产替代品。缓存条目数有界，但pending总量需真实生产额外并发/超时保护。官方部署能力有时间性，发布前需按目标版本再次核对。
