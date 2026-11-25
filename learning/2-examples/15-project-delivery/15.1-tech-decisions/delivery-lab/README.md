# 决策与交付依赖实验

Node22+（本轮26.0.0），零外部依赖。从本目录运行node --test test.mjs。fixture.json是公开合成输入；model.mjs实现依赖路径区间、同一范围成本相加与独立旧消费者解码，test.mjs包含六项正反例。

- 计划contract→adapter/ui并行→regression→rehearsal，区间[5,10]，不是相加得到[6,12]，也不是团队工期保证。假设无限资源并行，未考虑人员、日历、排队和真实概率；低/高界不是P50/P90。
- 同一假设范围reuse成本7、custom14，但exit从1改10后reuse16，揭示取舍对退出成本敏感；不是当前任何供应商报价或唯一正确选型。硬约束、许可/数据政策仍先审核。
- 真实纯函数旧消费者接受可选currency但拒绝title改name或数字id，适配器恢复旧DTO；额外字段不会被展示。没有OpenAPI通用验证器、HTTP mock服务或真实后端联调，不能据此宣布主项目契约已迁移。

决策/协作卡片在decisions.md、handoff.md、pair-session.md、onboarding.md。它们是需结合实际工程填写的合成示例/观察，不是真实会议记录或新成员试学。主Nuxt旧目录迁移另由阶段实践提供；两者证据归属分开。
