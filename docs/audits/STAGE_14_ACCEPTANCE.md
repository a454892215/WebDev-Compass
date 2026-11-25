# 阶段14质量验收记录

日期：2026-11-25。范围：Node.js、Nuxt Nitro 与 BFF接口开发，29点。结论：按AUTHORING R01–R09，在本地实测及明确观察/模型范围内达标；不表示生产后端系统已交付或学习者已掌握。

## 逐点与跨组复核

主代理读取29点四部分契约与教材，交叉核对共享任务、实际主项目和分组实现；各分组逐点证据如下，不只检查文件存在。更完整的环境/命令与未测边界见对应runtime JSON。

| 分组 | 点数 | 逐点结论与实际证据 |
| --- | --- | --- |
| 14.1 | 5 | [逐点](./stage-14-node-points.json) · [审查](./stage-14-node-review.md) · [运行](./stage-14-node-runtime.json)：调度、背压、Worker四路径、配置、cluster |
| 14.2 | 6 | [逐点](./stage-14-bff-points.json) · [审查](./stage-14-bff-review.md) · [主运行](./stage-14-practice-runtime.json)：真实Nuxt聚合/会话/限流/错误/契约 |
| 14.3 | 5 | [逐点](./stage-14-ssr-points.json) · [审查](./stage-14-ssr-review.md) · [运行](./stage-14-ssr-runtime.json)：6测含真实HTTP流式/取消；Next观察 |
| 14.4 | 5 | [逐点](./stage-14-edge-points.json) · [审查](./stage-14-edge-review.md) · [运行](./stage-14-edge-runtime.json)：10测+3故障注入，Node Web API/缓存模型非云部署 |
| 14.5 | 5 | [逐点](./stage-14-data-points.json) · [审查](./stage-14-data-review.md) · [运行](./stage-14-data-runtime.json)：8测，真实GraphQL/Apollo/SSE，Redis/迁移模型 |
| 14.6 | 3 | [逐点](./stage-14-upload-points.json) · [审查](./stage-14-upload-review.md) · [运行](./stage-14-upload-runtime.json)：11测分片/归属/完整性/能力/隔离 |

[规划核对](./STAGE_14_PLAN_REVIEW.md)保留编号，补足内部边界，无明显结构遗漏。[29项综合任务](../../learning/4-practice/14-bff-runtime/tasks.md)中的云迁移、上传接口、退出/通知/SDK等为学习者新增，不是主BFF已有。无多个同类工程充数，独立lab按机制拆分。

## R01–R09

| 规则 | 结论及依据 |
| --- | --- |
| R01 | 通过：29稳定编号与四部分契约齐全：5+6+5+5+5+3，练习/综合任务逐点可核。 |
| R02 | 通过：Node→Nuxt BFF→SSR主线，Next/Edge/数据按需，前置与新增扩展清晰。 |
| R03 | 通过：核MWG及一手资料、实际Nuxt/H3版本；缓存/身份/配置/迁移/签名边界区分。 |
| R04 | 通过：主Nuxt真实构建/HTTP/SSR与两视口流程；五组独立实验实际运行，官方观察不冒称实装。 |
| R05 | 通过：29练习均有具体变体、至少两验收、故障输入/定位/恢复与参考；修正Node断言实际文件名。 |
| R06 | 通过：29任务锚点对应真实主源码、独立lab或明确学习者新增，未把云/GraphQL/上传称主已有。 |
| R07 | 通过：传头每跳、必需/可选、HTTP数据流/组件流、原子存储/Map模型、粗类型/解析扫描一致。 |
| R08 | 通过：安装/类型/输入生命周期/用户名类型等已关闭复验，最终后台日志为空，结构/资源/回归通过。 |
| R09 | 通过：正文556/590、四部分556/556、下一阶段15与限制同步，学习者勾选未变。 |

## 发现、修正与复验

1. esbuild未明确生命周期策略，pnpm拒绝构建脚本；显式false并按冻结锁文件安装，Nuxt prepare/typecheck/build成功。
2. Retry-After应按锁定H3类型给数字，实际typecheck通过。
3. 超限body提前退出async iterator会销毁请求并触发Nitro连接finish异常；改最多保留256字节、排空后413。保留异常监控，不删除失败门禁，最终4E2E通过且后台异常为空。此例仍非生产抗慢速/无限输入服务。
4. 用户白名单先String转换可接受数组，改为严格string；数组负例400。下拉文案标“下次选择”避免fresh SSR用户与待选值混淆。
5. 主复核改Node练习断言位置为verify.mjs对loop.mjs输出，而非不存在的loop.mjs内断言；Prisma代码块改DSL并明确阅读上下文。
6. 综合任务明确继承独立练习的变体输入，版本端点任务明确返回公开版本号和traceId，使任务与验收一致。
7. 上传签名非规范hex与并发失败在途竞态已由分组修复/测试；Edge缓存/身份/无限旧读故障注入均有效，详见分组证据。

## 本轮最小充分验证

主Nuxt冻结安装、类型/lint/格式、3单元、真实生产构建与4E2E通过。独立实验5组结果见上表，未改逻辑的分组证据复用本次代理实际运行，不冒称全部由主重复执行。全库556/556四部分、191HTML/699本地资源零错，42检查器回归通过；知识链接与阶段0–14机器验收记录最终门禁另按交付清单执行。记录指纹用于防止源变更后继续冒用旧审查，不能独立证明技术正确。

## 适用边界

- 本地公开合成身份选择不是生产认证；内存会话/限流不跨实例。
- 会话读取最多保留256字节但排空完整输入，生产慢速/超大入口防护另需限制；上游JSON仅小fixture，未测生产大响应上限。
- 主API关闭监听不构成SSR父请求全链路取消证明；独立Node lab实测HTTP取消。
- 未运行Next/PM2/urql、云Edge/KV/D1/CDN、Redis/Prisma数据库、S3/OSS SDK或真实扫描。
- 上传HMAC是局部能力模型非云签名，PNG签名字节fixture非有效图片，扫描只是受信结果状态模型。
- 无生产/CDN/高并发/长时、多引擎、真机、读屏或真实学习者试学；手机为Chrome视口模拟。

[任务清单](../STAGE_14_DELIVERY.md) · [阶段入口](../../learning/1-notes/14-bff-runtime/README.md)。下一阶段15：旧项目迁移、代码评审与团队交付。
