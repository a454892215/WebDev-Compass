# 阶段14综合实践任务

先运行[主项目](./README.md)，再按正文选做独立实验。主Nuxt是本地合成会话与只读聚合，不含GraphQL、Redis、云Edge或上传服务。以下明确标为新增的功能由学习者在隔离副本实现；操作卡中的现有lab可先作为机制证据。每项任务同时完成对应独立练习的变体与下列集成目标；验收标准包含该变体的具体输入。完成任务不自动勾地图。

<a id="p-14-1-1"></a>

## 14.1.1 Node.js事件循环：I/O阶段、nextTick与ESM差异

检查主Nuxt BFF实际路由中有没有同步CPU循环或递归nextTick；把本lab两种模块日志与请求路径分开记录。新增扩展：在隔离副本加入有界CPU工作并观察并发请求受影响，再提出worker或分块方案；主项目未默认包含这项负载实验。

- [ ] 给出实际路由文件和CPU/I/O分类，不能仅凭async关键字判定不会阻塞。
- [ ] 附CJS/ESM本地输出与适用边界，额外请求压测只有真实执行后才标实测。

[理论](../../../learning/1-notes/14-bff-runtime/14.1-node-runtime/14.1.1.node-event-loop.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.1-node-runtime/14.1.1.node-event-loop-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.1-node-runtime/14.1.1.node-event-loop.md)

<a id="p-14-1-2"></a>

## 14.1.2 Node Stream背压：write返回值、drain与pipeline清理

给主BFF或上传扩展写出“来源→大小限制→可选变换→目标”的流链，并运行本lab的成功/故障对照。需要在主路由新增流式代理时先确认实际H3适配器、响应头和客户端取消清理；现有JSON聚合不自动变成流式传输。

- [ ] 给出真实队列峰值对比和pipeline拒绝证据，不把它称为HTTP性能测试。
- [ ] 扩展设计包含总量上限、并发、超时和取消，说明头部提交后失败的恢复方式。

[理论](../../../learning/1-notes/14-bff-runtime/14.1-node-runtime/14.1.2.stream.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.1-node-runtime/14.1.2.stream-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.1-node-runtime/14.1.2.stream.md)

<a id="p-14-1-3"></a>

## 14.1.3 Worker Threads：CPU卸载、输入上限与生命周期

为主BFF选择一个真实需要CPU处理的新增场景，先说明为什么异步I/O不足；复用本lab的正确/非法/异常/超时测试设计，再规划有界线程池。主聚合接口默认只是I/O，不为完成课程强行放入worker。

- [ ] 场景明确区分CPU与I/O，给出输入/队列上限和过载响应。
- [ ] 附四条真实worker用例证据，并明确尚未在主BFF实现生产线程池。

[理论](../../../learning/1-notes/14-bff-runtime/14.1-node-runtime/14.1.3.worker-threads.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.1-node-runtime/14.1.3.worker-threads-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.1-node-runtime/14.1.3.worker-threads.md)

<a id="p-14-1-4"></a>

## 14.1.4 环境变量与配置：字符串校验、加载优先级和公开边界

核主Nuxt的runtimeConfig与实际server消费位置，列出私有/公开字段以及构建期/运行期。用本lab演示严格校验与覆盖；新增扩展是在主应用启动路径加入缺配置失败门禁，先查看已有实现再决定是否需要。

- [ ] 配置表对应实际文件和调用，不把服务端token放public或SSR payload。
- [ ] 保留至少一个无效配置与一个覆盖验证证据，日志不包含私密值。

[理论](../../../learning/1-notes/14-bff-runtime/14.1-node-runtime/14.1.4.item-14-1-4.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.1-node-runtime/14.1.4.item-14-1-4-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.1-node-runtime/14.1.4.item-14-1-4.md)

<a id="p-14-1-5"></a>

## 14.1.5 进程管理与cluster：状态边界、优雅退出和PM2取舍

为主Nuxt BFF写单实例教学状态到多实例部署的差异清单：会话/限流/连接归属、外部存储、健康检查和排空。运行cluster局部计数实验支持状态结论；新增生产部署方案应根据目标平台选择PM2或平台监管，不能默认二者叠加。

- [ ] 清单指出实际应用中的进程内状态，并说明重启/副本切换的影响和替代存储。
- [ ] 保留真实双pid和正常退出证据，PM2/HTTP排空/滚动发布未运行范围写清楚。

[理论](../../../learning/1-notes/14-bff-runtime/14.1-node-runtime/14.1.5.item-14-1-5.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.1-node-runtime/14.1.5.item-14-1-5-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.1-node-runtime/14.1.5.item-14-1-5.md)

<a id="p-14-2-1"></a>

## 14.2.1 Nuxt Nitro 路由与中间件边界

在隔离副本新增 GET /api/version，仅返回公开版本号与当前请求追踪编号，并说明为什么不额外启动 Express。

- [ ] GET /api/version 返回最小公开字段，不暴露 env。
- [ ] 两次请求有不同追踪编号，单次头部与DTO一致。

[理论](../../../learning/1-notes/14-bff-runtime/14.2-bff-impl/14.2.1.fastify-hono-express.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.2-bff-impl/14.2.1.fastify-hono-express-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.2-bff-impl/14.2.1.fastify-hono-express.md)

<a id="p-14-2-2"></a>

## 14.2.2 并行聚合、完整请求期限与部分失败

把第三个独立通知服务加入聚合，定义它的可选降级和总期限；不得把服务URL暴露为输入。

- [ ] 三个独立任务先启动再await，明确必需与可选字段。
- [ ] 超时可恢复，降级有warnings，失败不返回上游私有正文。

[理论](../../../learning/1-notes/14-bff-runtime/14.2-bff-impl/14.2.2.item-14-2-2.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.2-bff-impl/14.2.2.item-14-2-2-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.2-bff-impl/14.2.2.item-14-2-2.md)

<a id="p-14-2-3"></a>

## 14.2.3 会话校验、JWT验证与请求级身份

在隔离副本给合成会话增加退出接口和服务端撤销，写接口遵守同源校验。

- [ ] 退出后旧SID实际401，另一个用户会话仍有效。
- [ ] 说明本地身份选择非生产登录、JWT解析非校验及Map跨实例限制。

[理论](../../../learning/1-notes/14-bff-runtime/14.2-bff-impl/14.2.3.item-14-2-3.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.2-bff-impl/14.2.3.item-14-2-3-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.2-bff-impl/14.2.3.item-14-2-3.md)

<a id="p-14-2-4"></a>

## 14.2.4 按身份限流、CORS与CSRF的不同职责

把额度改为5次/10秒，使用可注入时间的函数编写窗口切换测试，给出共享Redis实现所需的原子操作方案。

- [ ] 明确429、等待建议、窗口边界及不同主体隔离。
- [ ] CORS不代替认证/CSRF，不用任意反射Origin+credentials。

[理论](../../../learning/1-notes/14-bff-runtime/14.2-bff-impl/14.2.4.rate-limiting.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.2-bff-impl/14.2.4.rate-limiting-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.2-bff-impl/14.2.4.rate-limiting.md)

<a id="p-14-2-5"></a>

## 14.2.5 稳定错误DTO、HTTP状态与前端恢复

实现一个仅对网络或503启用的可取消手动重试按钮；401转身份选择、429显示等待，不自动无限重试。

- [ ] 不将所有错误变200，traceId能与当前请求头关联。
- [ ] 键盘可重试、错误有文本，可选降级不掩盖必需数据失败。

[理论](../../../learning/1-notes/14-bff-runtime/14.2-bff-impl/14.2.5.item-14-2-5.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.2-bff-impl/14.2.5.item-14-2-5-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.2-bff-impl/14.2.5.item-14-2-5.md)

<a id="p-14-2-6"></a>

## 14.2.6 OpenAPI与实际响应共用Schema

给DTO添加可选公开版本字段，在schema、实现、测试中同步；另写新增必需字段对旧消费者的兼容评审。

- [ ] 证明正常和漂移负例都经过实际运行校验，保留额外字段拒绝。
- [ ] 说明文档范围/Schema子集/未运行SDK生成器，不能以类型检查替代网络数据验证。

[理论](../../../learning/1-notes/14-bff-runtime/14.2-bff-impl/14.2.6.openapi.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.2-bff-impl/14.2.6.openapi-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.2-bff-impl/14.2.6.openapi.md)

<a id="p-14-3-1"></a>

## 14.3.1 Next.js App Router：Server Components 与路由边界（选修）

画出可见输出与服务端代码边界，把误放入 Client props 的 fixtureServiceToken 移出 DTO；只使用公开占位字符串。

- [ ] 边界图同时包含页面、交互组件、HTTP Route Handler；标出每处谁负责鉴权。
- [ ] 列出至少两个浏览器可见输出（HTML/RSC props等），并解释服务端运行不能阻止主动返回的泄漏。

[理论](../../../learning/1-notes/14-bff-runtime/14.3-ssr-runtime/14.3.1.next.js-app-router.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.3-ssr-runtime/14.3.1.next.js-app-router-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.3-ssr-runtime/14.3.1.next.js-app-router.md)

<a id="p-14-3-2"></a>

## 14.3.2 Nuxt Nitro：请求生命周期、配置和用户隔离

将 requestView 的局部 context 故意改为模块级 currentIdentity，并保持 A/B 闸门顺序，观察身份串线后恢复；再审查主 Nuxt 的事件上下文和配置输出。

- [ ] 故障变体确实让 A 错读 B；恢复局部 context 后同一断言通过。
- [ ] 记录主项目双用户响应各自的展示字段，并确认 HTML/payload 不包含会话凭据；不只检查浏览器按钮。

[理论](../../../learning/1-notes/14-bff-runtime/14.3-ssr-runtime/14.3.2.nuxt-nitro.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.3-ssr-runtime/14.3.2.nuxt-nitro-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.3-ssr-runtime/14.3.2.nuxt-nitro.md)

<a id="p-14-3-3"></a>

## 14.3.3 SSR 数据获取：识别 waterfall 与安全并行

把 aggregate 改为先 await profile 再启动 catalog，用闸门断言发现串行；恢复独立分支并行，再为必选身份和可选推荐模块画不同失败策略。

- [ ] 放行 gate 前两个独立 loader 已启动，返回 DTO 与输入一致。
- [ ] 依赖身份的请求仍在身份校验后执行；明确可选分支失败的 UI 和错误类型。

[理论](../../../learning/1-notes/14-bff-runtime/14.3-ssr-runtime/14.3.3.item-14-3-3.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.3-ssr-runtime/14.3.3.item-14-3-3-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.3-ssr-runtime/14.3.3.item-14-3-3.md)

<a id="p-14-3-4"></a>

## 14.3.4 SSR Cookie/Header：入站身份与上游转发白名单

为上游转发列一个显式表：输入头、是否允许、由谁重建、测试证据；加入伪造cookie、authorization、Host和换行字符，保证结果只含白名单。

- [ ] 入站用户 cookie/authorization/代理声明不会原样出现在外部上游头；服务凭据来自服务器受信参数。
- [ ] 解释相对本地 API 与任意绝对外部 URL的区别，并给出 Session 丢失时的排查步骤。

[理论](../../../learning/1-notes/14-bff-runtime/14.3-ssr-runtime/14.3.4.cookie-header.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.3-ssr-runtime/14.3.4.cookie-header-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.3-ssr-runtime/14.3.4.cookie-header.md)

<a id="p-14-3-5"></a>

## 14.3.5 HTTP Streaming：首块、已发送头、取消与恢复

在现有Node实验新增一个故意把JSON行拆为两次write的路径，编写有半行缓冲的增量消费者；新增“未收到done就断线”的状态，不把200直接当成功。

- [ ] 拆行/合并chunk都能还原消息，partial错误不会显示成功；收到done才确认完成。
- [ ] 取消后服务器活动请求归零；解释503与200+协议error的不同恢复入口。

[理论](../../../learning/1-notes/14-bff-runtime/14.3-ssr-runtime/14.3.5.streaming.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.3-ssr-runtime/14.3.5.streaming-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.3-ssr-runtime/14.3.5.streaming.md)

<a id="p-14-4-1"></a>

## 14.4.1 Edge 与 Node：按平台、数据位置和 API 选运行时

为主 Nuxt BFF 编写一份可复核的运行时决定记录。现有项目仍是 Node/Nitro；迁移适配器和真实平台基准属于新增扩展。

- [ ] 每个候选都标来源、核对日期和至少一个会改变决定的限制。
- [ ] 明确不把本地 Node 测试或隔离实例内存当生产持久化/跨区域证据。

[理论](../../../learning/1-notes/14-bff-runtime/14.4-edge-runtime/14.4.1.edge-vs-node.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.4-edge-runtime/14.4.1.edge-vs-node-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.4-edge-runtime/14.4.1.edge-vs-node.md)

<a id="p-14-4-2"></a>

## 14.4.2 Vercel Functions 与 Cloudflare Workers：入口、适配与部署核对

给主项目补一份独立Edge部署提案，明确当前Node产物不变；如未来实施，验证目标平台产物与撤销，不把纯策略lab当Worker宿主。

- [ ] 区分Nuxt/Nitro部署与Next运行时配置，未复制runtime=edge到Nuxt。
- [ ] 预览验证列200/404/405、私有响应隔离、平台日志和回滚；没有账号时保持待验。

[理论](../../../learning/1-notes/14-bff-runtime/14.4-edge-runtime/14.4.2.vercel-edge-functions-cloudflare-workers.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.4-edge-runtime/14.4.2.vercel-edge-functions-cloudflare-workers-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.4-edge-runtime/14.4.2.vercel-edge-functions-cloudflare-workers.md)

<a id="p-14-4-3"></a>

## 14.4.3 Edge 中间件：可信身份、Geo 路由与稳定 A/B 分组

审查主BFF身份来源及源站授权，再新增可撤销的实验分组任务。现有Edge实验只验证本地注入，真实Geo和平台中间件属于后续部署验证。

- [ ] 未登录401、已登录访问别人的资源403或统一404，服务端检查owner而非按钮或实验桶。
- [ ] 私有/实验响应不能污染公开目录缓存，记录缓存绕过或有界键策略。

[理论](../../../learning/1-notes/14-bff-runtime/14.4-edge-runtime/14.4.3.edge-middleware.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.4-edge-runtime/14.4.3.edge-middleware-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.4-edge-runtime/14.4.3.edge-middleware.md)

<a id="p-14-4-4"></a>

## 14.4.4 Workers KV、D1 与 Global Config：一致性决定用途

对主BFF单进程教学会话/限流提出多实例迁移方案，标明权威校验、一致性、过期和失败策略；KV/D1/Global Config接入均为新增，不声称主已连接。

- [ ] 至少指出KV普通读改写不满足库存原子性和立即撤销，给出服务端权威校验或强协调替代。
- [ ] D1事务范围、读副本会话书签与登录session分清；Global Config不被当任意业务写库。

[理论](../../../learning/1-notes/14-bff-runtime/14.4-edge-runtime/14.4.4.kv-d1-edge-config.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.4-edge-runtime/14.4.4.kv-d1-edge-config-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.4-edge-runtime/14.4.4.kv-d1-edge-config.md)

<a id="p-14-4-5"></a>

## 14.4.5 CDN 缓存与 SWR：公开内容、键和过期边界

为主BFF公开目录设计缓存接入任务，保持用户聚合响应私有；先用独立lab证明键与窗口，再新增真实CDN部署验证，不将Node Map当已接入的CDN。

- [ ] 币种不同响应不串值，非法维度拒绝，已完成缓存数有上限并解释pending仍需生产限流。
- [ ] fresh/stale/expired与上游失败均有可控时钟断言；Cookie/Authorization不产生共享命中。

[理论](../../../learning/1-notes/14-bff-runtime/14.4-edge-runtime/14.4.5.edge.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.4-edge-runtime/14.4.5.edge-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.4-edge-runtime/14.4.5.edge.md)

<a id="p-14-5-1"></a>

## 14.5.1 GraphQL：Schema、N+1、DataLoader 与持久化操作

在主BFF旁提出可选GraphQL网关扩展，复用其已验证身份边界，先在data-lab完成关联查询批处理与预注册操作；主项目现有接口不声称已改为GraphQL。

- [ ] 四篇文章原始路径4次读取；批量路径仅1次且重复2去重，missing作者为null而不串位。
- [ ] A/B相同id返回各自数据；未知persisted hash拒绝，不能退回执行调用者提供的任意全文。

[理论](../../../learning/1-notes/14-bff-runtime/14.5-data-layer/14.5.1.graphql.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.5-data-layer/14.5.1.graphql-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.5-data-layer/14.5.1.graphql.md)

<a id="p-14-5-2"></a>

## 14.5.2 Apollo / urql：规范化缓存、SSR 隔离与登出清理

审查主Nuxt请求边界，给可选GraphQL客户端写每请求创建与安全hydrate/登出清理方案；用真实Apollo缓存测试证明生命周期，不给主项目宣称已经安装GraphQL适配。

- [ ] 同id不同tenant的实体key不同，两个SSR请求快照不混入对方name或凭据。
- [ ] 明确区分network-only/no-cache与clearStore/resetStore；登出变体不让旧响应覆盖新身份状态。

[理论](../../../learning/1-notes/14-bff-runtime/14.5-data-layer/14.5.2.apollo-client-urql.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.5-data-layer/14.5.2.apollo-client-urql-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.5-data-layer/14.5.2.apollo-client-urql.md)

<a id="p-14-5-3"></a>

## 14.5.3 Redis 的协作边界：会话、TTL、原子限流与故障策略

对主BFF教学内存会话与限流标记单进程限制，写可选Redis替换接口、故障策略和跨副本集成测试清单；不把尚未接入的Redis描述为主工程功能。

- [ ] 会话撤销立即不可用，闲置续期不突破绝对寿命；TTL边界不依赖真实等待。
- [ ] 限流key隔离tenant/主体，解释Redis不可用时不同接口降级策略；不把Map测试称Redis集成通过。

[理论](../../../learning/1-notes/14-bff-runtime/14.5-data-layer/14.5.3.redis.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.5-data-layer/14.5.3.redis-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.5-data-layer/14.5.3.redis.md)

<a id="p-14-5-4"></a>

## 14.5.4 Prisma schema 与迁移：读懂约束，保护 API 兼容性

对主BFF公开DTO建立版本化迁移评审，引用data-lab可空字段与投影测试，产出数据库→BFF→旧/新前端发布矩阵；主工程fixture不声称已接Prisma。

- [ ] 能说明主键、唯一、可空的不同约束及前端错误体验；字段类型不直接等同公开API。
- [ ] 计划先查数据再加约束并保留旧版本兼容窗口，指出删列回滚需数据恢复而非仅git revert。

[理论](../../../learning/1-notes/14-bff-runtime/14.5-data-layer/14.5.4.item-14-5-4.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.5-data-layer/14.5.4.item-14-5-4-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.5-data-layer/14.5.4.item-14-5-4.md)

<a id="p-14-5-5"></a>

## 14.5.5 WebSocket / SSE：心跳、重连、游标与连接资源

为主BFF的可选实时通知提出SSE扩展计划，先运行本lab真实回环协议测试，再新增身份校验、快照恢复及有界慢消费者；主项目不声称已经具备生产消息总线。

- [ ] 同租户重放且不越权，重复id去重；过旧cursor有可解释的快照恢复路径而不是静默漏消息。
- [ ] 重试有抖动/上限且鉴权失败可终止，关闭最后订阅后清理timer/连接；不混淆EventSource自动retry与自定义算法。

[理论](../../../learning/1-notes/14-bff-runtime/14.5-data-layer/14.5.5.websocket-sse.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.5-data-layer/14.5.5.websocket-sse-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.5-data-layer/14.5.5.websocket-sse.md)

<a id="p-14-6-1"></a>

## 14.6.1 分片上传：断点续传、并发与最终完整性

以现有upload-lab为上传子实验，为主Nuxt BFF新增上传任务路由设计或隔离副本实现：服务端会话→owner→init/list/put/complete/abort，不把主项目尚无的上传API说成现有功能。扩展37字节/6字节片/并发3与断网恢复证据。

- [ ] 首轮峰值不超过3，恢复不重传服务端已确认的第1片，最终字节与原文件完全一致。
- [ ] 缺任意片或整体摘要不符不能complete；bob无法查询或取消alice的uploadId。

[理论](../../../learning/1-notes/14-bff-runtime/14.6-file-upload/14.6.1.item-14-6-1.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.6-file-upload/14.6.1.item-14-6-1-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.6-file-upload/14.6.1.item-14-6-1.md)

<a id="p-14-6-2"></a>

## 14.6.2 预签名URL：S3/OSS直传与最小授权

在主BFF的新增上传设计中列清init/sign/confirm权限与数据直传路径。以LocalGrants的purpose变体补验证；另提交云端接入检查单，明确真实S3/OSS/CORS仍待受控环境验证，不假称主项目已接云存储。

- [ ] purpose被签名并在verify检查；把upload能力用于download时测试失败。
- [ ] 表中明确URL非一次性、bucket CORS不等于授权、PUT发送Blob原始字节；完成必须经BFF校验。

[理论](../../../learning/1-notes/14-bff-runtime/14.6-file-upload/14.6.2.url.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.6-file-upload/14.6.2.url-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.6-file-upload/14.6.2.url.md)

<a id="p-14-6-3"></a>

## 14.6.3 上传安全：类型、大小、隔离与扫描完成态

为主BFF拟新增上传模块的状态/授权表，沿用upload-lab隔离策略；增加受信扫描回调摘要验证的隔离副本实现和失败测试。明确现有主项目未实现上传/杀毒；列上线前解析、隔离域、大小流控与真实扫描验收。

- [ ] timeout或摘要不符不能把quarantine迁成ready；clean只对对应不可变对象生效。
- [ ] 错误MIME、错误magic、超限和越权分别被拒绝；扫描前后读取策略有明确测试。

[理论](../../../learning/1-notes/14-bff-runtime/14.6-file-upload/14.6.3.item-14-6-3.md) · [示例](../../../learning/2-examples/14-bff-runtime/14.6-file-upload/14.6.3.item-14-6-3-demo.md) · [练习](../../../learning/3-exercises/14-bff-runtime/14.6-file-upload/14.6.3.item-14-6-3.md)
