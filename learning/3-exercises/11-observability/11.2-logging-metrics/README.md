# 11.2 结构化日志、用户旅程与Web指标：独立练习

前置阶段5/9/10；目标是解释日志/trace/metric职责、限制采集、验证请求关联并设计可操作告警。

推荐：11.2.1日志字段→11.2.2上下文→11.2.3计数和分布→11.2.5样本/SLO，再按需读11.2.4 Replay评估。Replay不是默认必装项。

- [11.2.1 结构化日志：用允许列表和关联ID诊断，减少身份暴露](./11.2.1.item-11-2-1.md)
- [11.2.2 W3C traceparent与OpenTelemetry：传播上下文，而非共享当前请求](./11.2.2.distributed-tracing.md)
- [11.2.3 Counter、Histogram与Web Vitals：单位、分母和标签基数](./11.2.3.metrics.md)
- [11.2.4 Session Replay：先定义不采集什么，再验证SDK边界](./11.2.4.session-replay.md)
- [11.2.5 RUM与SLO告警：正确样本、分母、窗口和错误预算](./11.2.5.real-user-monitoring-rum.md)

四部分配对同一机制，综合任务区分主Nuxt最小实现、独立真实OTel lab、官方观察和新增扩展。[主实践](../../../4-practice/11-observability/README.md)。
