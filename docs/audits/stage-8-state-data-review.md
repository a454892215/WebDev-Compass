# 阶段8.6状态与数据逐点审查

2026-11-25，开始09:23:23 UTC。范围7点，不新增目录编号；按AUTHORING版本1 R01–R09。先归属与key，再并发/过期/离线，CRDT/CQRS明确复杂协作选修。

## 逐点核对

| 点 | 机制、四部分与实际证据 |
| --- | --- |
| 8.6.1 | local/URL/Nuxt共享/服务端读取/持久化事实来源分开；useState序列化公开边界与SSR每应用生命周期；main源码是URL scope/q、ref草稿、scope:slug收藏和useAsyncData，不虚构Pinia或真实登录。 |
| 8.6.2 | scope/query决定key，层级失效/epoch与授权不同；Node真实key差异和旧scope拒绝。main远程key含scope+degraded；q只是本地过滤，不强制加入远程key。 |
| 8.6.3 | 模型区分确认值/临时值、操作id/epoch/revision；4项Node中控制旧失败、新成功/当前失败/换scope/低revision；HTTP /api/value真实expectedRevision过期409且当前值不变。模型不是任意业务并发协议。 |
| 8.6.4 | 受控staleResult和DOM真实保留旧数据、失败标识、成功替换；不是生产HTTP/ServiceWorker SWR，也不把空结果冒充失败恢复。 |
| 8.6.5 | 真实IndexedDB事务complete/按scope草稿与队列、刷新恢复、Chrome真offline阻断HTTP、ack后删除、同id幂等/异payload409；无SW离线导航/BackgroundSync，内存服务去重不具跨进程持久保证。 |
| 8.6.6 | Yjs/Automerge官方观察，收敛与业务正确/权限不同；未安装库，普通对象合并不称CRDT；变体明确两种方案与冲突语义。 |
| 8.6.7 | CQRS不必分库、事件溯源不等于action日志；真实有限project纯函数和未知事件拒绝，不冒充持久eventstore、投影可靠发布或exactly-once。 |

每点有独立变体、至少两具体验收、具体故障与修复判据、综合任务建议。四部分路径在points，综合案例由主代理集成。不是重复七份通用任务；主项目未实现的持久化/写协议在state-lab，或明确副本扩展。

## 主Nuxt源码交叉阅读

已读useWorkspace/useFavorites/index/nuxt.config/shared contracts：useRequestFetch+useAsyncData解码，远程key为workspace:v1:scope:degraded/normal；q是页面过滤。收藏useState对象只含合成scope:slug布尔，按scope显示，未冒称退出清除真实用户隐私；全部公开fixture不是认证。主请求no-store/cache:false/prerender:false不替代真实授权。主代理构建/SSR/浏览器证据将在整阶段验收统一核对，本组不冒称独立运行另一套Nuxt。

## 实际运行

固定Node26.0.0/pnpm11.4.0、Playwright1.65.1、Chrome后台。初次离线安装缺tarball即停止，显式联网冻结锁文件安装成功，不改全局配置。4项Node领域测试通过；390/1440两浏览器组通过，最后补队列恢复网络后刷新仍有记录并再显式重试，仅重跑受影响browser。

真实浏览器组包括草稿save/load/reload、Alice/Bob作用域隔离、断网入队与重试失败保留、同页重复入队去重、恢复+reload队列仍在、匹配ack后删除、重复HTTP只应用一次、异payload409、expectedRevision409/当前值不变、stale失败/成功、无pageerror和横向溢出。IndexedDB专有数据库关闭删除，Chrome/4515服务finally关闭，无监听。Prettier只改变可读格式，Node语法检查通过，未用格式变化冒称又跑完整行为。

## R01–R09与边界

R01七点完整；R02上述顺序与前置；R03先MWG性能/安全正文，再Nuxt/Vue/MDN/Yjs/Automerge/Microsoft官方；R04实际机制、控制模型和观察型分开；R05变体/故障具体；R06主项目、lab和副本扩展对应；R07scope非认证、key非Token、缓存层不同；R08必要实验通过；R09版本/清理/限制记录真实，最终索引/契约由主代理整合。

未做真实登录、生产用户、跨设备/多标签同步、持久服务端幂等、完整离线PWA、Background Sync、真正CRDT库、生产事件存储/消息代理、真机/多浏览器/读屏/学习者试学。库官方观察和纯函数不能记为这些部署运行。MWG no-store/bfcache旧绝对表述沿用阶段6更具体Chrome说明，不因性能移除敏感响应保护。
