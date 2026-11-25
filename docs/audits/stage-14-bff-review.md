# 14.2 BFF逐点与主项目审查

2026-11-25，主代理逐点核对六篇理论/操作卡/练习、六综合锚点与实际Nuxt源码，并读跨组Node/SSR/数据/上传边界。独立运行与选修观察按来源分别记录。

- 14.2.1：get文件方法、middleware/event.context、Node preset范围与现有源码一致；新增version为学习者变体，不声称已实现独立框架。
- 14.2.2：实际先启动两fetch再allSettled，profile必需/items降级，250ms信号覆盖正文；没有自动重试/任意URL代理。主API close取消不是SSR父请求全链路取消证据。
- 14.2.3：SID随机、期限/容量和请求身份分离；公开身份选择不是生产认证。精确Origin/JSON/类型校验；数组伪装user负例已加入HTTP检查。Map不能兑现多实例共享会话。
- 14.2.4：实际按SID20/60s，429+保守Retry-After、另SID不受影响；无CORS允许头，同源写入口有来源验证，不把CORS称鉴权。新SID可绕过示例限流，正文明确生产入口/主体配额缺项。
- 14.2.5：状态/固定错误DTO/trace、必需错误与可选warning一致；前端statusCode只是Nuxt包装层，本UI未声称已解包业务code。宽窄视口重试、失败恢复/无页面异常实际验证。
- 14.2.6：实际OpenAPI3.1.1仅dashboard，Schema限定子集并共享运行校验；HTTP取真正spec校验真实响应，单元验证数字id/额外secret负例。无SDK生成器，不称全量自动生成。

发现与关闭：安装esbuild生命周期策略未明确导致pnpm报错，已在workspace显式false并冻结锁文件安装成功；Retry-After类型改为数字通过实际类型检查；body超限提前退出async iterator导致Nitro finish访问空socket异常，改完整排空且最多保留256字节后返回413，复验无后台异常；user类型须string后才能做允许列表；下拉标“下次选择”避免与SSR现有身份混淆。输入读取仍非生产慢速请求防护，README/正文记录入口限额与读取时限要求。

跨部分复核补充：version新增任务同时返回公开版本号和当前traceId，避免“仅版本号”与头/DTO追踪标准冲突；综合任务明确包含独立练习变体输入。

最终证据见[主运行记录](./stage-14-practice-runtime.json)和[阶段验收](./STAGE_14_ACCEPTANCE.md)。观察/模板、学习者新增与主项目已有分别标明，不以测试数量作为能力等级或生产上线承诺。
