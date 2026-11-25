# 阶段11：Nuxt可观测与发布控制工作台

前置阶段5/7/9/10。目标：区分错误范围，验证最小采集、关联请求、稳定分组、故障恢复及平台交接；不是生产监控后端或云发布系统。

## 运行

本轮Node26.0.0/pnpm11.4.0；Nuxt4.7.0、Vue3.5.46、TS6.0.3、Playwright1.65.1固定基线。项目根目录执行：

```bash
pnpm install --frozen-lockfile
pnpm dev
# http://127.0.0.1:4531/
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test
pnpm build
pnpm test:e2e
```

test:e2e前须build，自动启动生产Node/后台Chrome，结束关闭。默认macOS Chrome，可用CHROME_PATH指定。只有本地合成数据，不接生产endpoint、账号或记录真实用户。

## 从代码读到行为

1. server/middleware/trace.ts给每请求独立上下文。仅解析W3C version00的严格合法非零traceparent，非法重建；同trace新server span，本例不保留来访采样强制本地00。不处理完整tracestate/baggage，不把trace当身份。SSR首页显式把本次server traceparent传给内部workspace，保证关联；这不是完整OTel自动插桩。
2. server/plugins/observability.ts记录明确字段：level/traceId/spanId/有限route/status/durationMs/release，不收body/Cookie/query/原始URL。Nitro error hook补错误路径，recorded防重复；成功在afterResponse记录。durationMs从请求开始到对应记录点，错误在捕获时终止，不能当客户端网络耗时或统一RUM分位指标。
3. /api/diagnostics返回最近50项/5分钟访问时清理的内存日志与固定事件，公开供本地查验。trace仍可关联行为，限期不等于匿名；生产必须移除或增加独立认证/授权、存储/保留/流量治理。没有真实userId，默认不上报是浏览器教学事件开关，服务端运行日志仍独立存在。
4. 浏览器事件默认关闭，只在当前页主动勾选后用需要204响应的即时POST发固定code。关闭阻止未来新增调用，不撤回已发送/在途数据；不是完整CMP。接收端允许version1、1–8条事件、三个code，未知字段拒绝；实际JSON字节2048限额，单事件不带stack/URL/input。它是最小诊断协议，不是Sentry envelope或完整session末尾交付；fetchLater/回退按MWG读取后作为延迟遥测的另一个主题，未实装。
5. NuxtErrorBoundary包住点击后故障的组件。先修broken再clearBoundaryError；全局showError→error.vue→clearError另一路，API503由catch显式处理。未开启experimental.ssrErrorBoundary，不声称默认捕获SSR局部错误；不展示原始错误堆栈。
6. stage11_fixture是可预测/可改的合成分组Cookie，HttpOnly/Lax/本地Secure=false，不是用户身份或权限。服务端SHA-256对固定subject/group稳定分桶，guest/非法比例关。主与独立Unleash概念实验不是平台算法兼容实现；Cookie不按端口隔离。
7. 实际v-if控制#new-panel非关键提示，SSR数据接管/刷新保持一致，其余错误教学功能独立。NUXT_KILL_NEW_PANEL=true配置后重启可关闭面板；运行时不是热更新control plane，没有远程TTL/审计平台，不能声称一键全局即时止损。测试在独立4539进程验证kill覆盖与SSR无节点。
8. 首页有固定标签、状态提示、跳转正文、全局/局部恢复和宽窄布局。所有fixture相关HTML/API私有no-store；这是本例策略，不把全站no-store当通用性能建议。公共hash资源/CDN按11.4另订契约。

## 四部分与实验

[理论](../../1-notes/11-observability/README.md) → [示例](../../2-examples/11-observability/README.md) → [独立练习](../../3-exercises/11-observability/README.md) → [21项任务](./tasks.md)。

- error-lab（4532）：真实Sentry Browser SDK、自定义内存transport、同次Vite hidden map本地还原。没有SaaS/map上传/告警/SSR SDK。
- telemetry-lab（4533）：真实OTel trace/metric SDK与并发上下文，RUM/SLO合成演算；Replay只官方观察，未录制用户。
- release-lab（4534）：稳定分桶、曝光/转化前提、临时manifest/hash保留回退；不是真数据库/SSR进程/云发布回退。
- infra-lab（4535/4537/4538）：真实Nginx缓存/轮询/限流；Docker/K8s/Actions模板有占位，未运行。

运行结果、事实边界和交接见[运行说明](./docs/OPERATIONS.md)、[阶段验收](../../../docs/audits/STAGE_11_ACCEPTANCE.md)。未测生产RUM、平台通知、远程CI、CDN/Purge/Geo/WAF、容器/集群、真机/多浏览器/屏幕阅读器/真实学习者试学。没有恢复Colima或创建云资源。
