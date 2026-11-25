# 阶段11：错误监控、日志指标与灰度发布 — 代码与实践示例

前置5会话/HTTP、7部署、9性能测量、10隐私与安全。目标是发现错误、减量采集、关联诊断并安全停止/恢复变更。21点不等于生产平台或值班能力认证。

先11.1错误上下文与恢复，再11.2日志→trace→指标→SLO，Replay按需；11.3发布/止损贯穿，11.4按实际基础设施选读。

- [Sentry错误、采样与恢复](./11.1-error-monitoring/README.md)
- [日志、OpenTelemetry与RUM/SLO](./11.2-logging-metrics/README.md)
- [开关、灰度、回滚与事故协作](./11.3-release-management/README.md)
- [Nginx、容器与CI平台交接](./11.4-infra/README.md)

[四部分目录](../../README.md) · [Nuxt工作台](../../4-practice/11-observability/README.md) · [21项综合任务](../../4-practice/11-observability/tasks.md)

先预测再运行，记录状态/失败/修复。官方观察和模板未运行部分明确，AI审阅不冒充真实学习者试学。
