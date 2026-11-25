# 阶段11规划复核

2026-11-25，21点保留：错误监控5、日志指标5、发布6、基础设施5。读取地图/学习路径与总则，范围能覆盖阶段目标；不因工具品牌或模板数量重复加ID。

真实缺口补入原点：错误分级的影响分母/owner与通知失败；采样/配额/敏感字段；请求级SSR trace与有限基数；RUM样本/缺失、SLO预算/双窗及无数据；开关实际控制与失效/kill优先；曝光和A/B污染；产物兼容回退；基础设施探针/可信代理/PR权限。前置以5/7/9/10为重点，阶段8–15不是所有条目严格线性必修。

已检索并读MWG [full-session-analytics](https://developer.chrome.com/docs/modern-web-guidance/guides/performance/full-session-analytics)、[privacy](https://developer.chrome.com/docs/modern-web-guidance/guides/privacy/privacy)、[security](https://developer.chrome.com/docs/modern-web-guidance/guides/security/security)。采用采集前减量、功能检测、隐私边界；主即时POST要求204响应，不冒充延迟全session采集。一次错误推测的debounce路径不可达，未计作成功来源。

再读Nuxt当前错误/部署、W3C Trace Context、Sentry/OTel SDK及源码、Prometheus/SRE、Unleash、Nginx、Docker/K8s/GitHub/Cloudflare官方。Nuxt4.7存在实验SSR局部边界，默认未启用；用clearBoundaryError而非混全局clearError。OTel SDK3发生合并/弃用，独立lab按本轮官方版本与API实装，主不误称完整OTel SDK。

主项目沿既有Nuxt4.7/Vue3.5.46/TS6.0.3，新增能力用原生/框架模块，不把全部厂商SDK塞进同一入门工程。真实Sentry、OTel与发布算法隔离实验，容器/集群/CI/Replay/SaaS为明确模板或官方观察；不接真实凭据或重装Colima。

R01–R09逐点审四部分，分批保留运行/只读复审/未测边界；完整资料不是生产平台认证或学习者已掌握。
