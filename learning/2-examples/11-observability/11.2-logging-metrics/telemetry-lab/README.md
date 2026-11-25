# 11.2 本地结构化日志与OpenTelemetry实验

这是手工埋点/合成数据的机制实验，无Collector、OTLP网络、真实RUM、Session Replay SDK或第三方账号。前端可选耗时默认关闭；必要的本地/work请求仍产生最小服务端日志。不要输入真实个人信息。

## 运行

Node26.0.0/pnpm11.4.0；SDK3.1.1要求Node>=22.15。本轮API1.10.0 + core/sdk-trace/sdk-metrics/context-async-hooks3.1.1，均固定锁文件。当前官方SDK3已合并trace-node/base到sdk-trace；不是用旧NodeTracerProvider/register示例硬套新包。

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm verify
pnpm dev
# http://127.0.0.1:4533/
```

verify使用后台Chrome，默认macOS路径，可设CHROME_PATH；结束关闭server/browser。无需启动4536服务，该端口仅用于伪造不同Origin的拒绝测试。停止dev用Ctrl-C，会清空内存。

## 按机制观察

- core.safeLog：允许level/route/outcome/合法traceId；额外query/token不输出。可选HMAC合成身份演示是假名而非匿名，主界面不收userId。
- otel.work：真实W3C提取、AsyncLocalStorage上下文、服务器/子span、内存导出。两并发输入不串trace，全零traceId被忽略。SDK采样固定AlwaysOn只限有界教学，不能按此设置生产配额。
- otel.recordDuration：真实Counter/Histogram，固定低基数标签和ms。core教学le桶为累积；SDK内部显式bucket分段不同，不能原样当Prometheus桶。
- 浏览器输入合成秘密，点执行：只有最小工作请求，未发可选duration。开启后再点执行，POST/telemetry 204；关闭后停止后续耗时。已有服务端数据不会因此删除。
- /stats只供本地教学查看当前内存，生产不得无鉴权公开。work最多32次，日志和事件各保留最近20条；到限429后重启。没有按时TTL或生产保留期保证。
- /telemetry只接固定kind/value和实际1000字节上限、Origin核对；不是完整DoS或公网collector认证。超时/超大慢流并未做容量认证。

Node用4个已知时长演算p75和累积桶，用0/低样本与双窗演算SLO。verify有390/1440两视口、未知PII400、跨源403、1600B413及真实并发HTTP关联；artifacts只保存合成结果不提交。

“开启耗时演示”不授权Replay。replayDecision只证明自有默认拒绝规则，供应商排除/掩码/网络/删除按官方观察另验。点击后即时fetch需要响应确认，未实现会话末尾fetchLater；后者先读MWG full-session-analytics并按兼容/配额/取消设计。

[本组入口](../README.md) · [阶段9真实Vitals示例](../../../09-performance/9.1-performance-metrics/metrics-lab/README.md)
