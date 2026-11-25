# 阶段11编写与质量验收

日期2026-11-25，总则版本1。21点：错误5、日志指标5、发布6、基础设施5，原有编号不变。主作者负责Nuxt/基础设施/整合；三位分工负责错误、指标、发布，实际4代理。各点四部分交叉审查，另对主Nuxt与基础设施作独立只读复核；源码审阅不冒充额外测试或人类试学。

## 范围与递进

先理解错误范围/上下文和恢复，再日志→trace→指标→RUM/SLO；Replay按目的选读，发布/止损贯穿，基础设施按实际平台选择。重点前置阶段5/7/9/10，不把所有深化主题变成严格线性必修。

开始核对[规划](./STAGE_11_PLAN_REVIEW.md)，将SLO/无数据、采集前减量/配额、SSR关联、开关真实控制与失效、曝光归因、回退兼容、探针与CI权限放入现有21点，无明显目标缺项需要新ID。Nuxt主项目给完整小闭环，真实SDK在独立lab，平台集成/基础设施以明确观察或模板交付。

| 规则 | 本轮结论 |
| --- | --- |
| R01 | 21稳定编号全部有四部分，manifest逐项映射；不以通用重复任务充数。 |
| R02 | 前置、目标、组内顺序清楚；事件/影响→恢复，日志→trace→指标，稳定分组→曝光→回退，公共缓存→代理→平台协作。 |
| R03 | 一手资料/版本核对；Nuxt实验SSR边界、OTel3迁移、错误采样与Tracing/Replay、trace身份、合成RUM/SLO边界分别说明。 |
| R04 | Sentry/OTel真实SDK、实际构建/HTTP/Chrome、发布文件回退/Nginx运行有证据；map上传、SaaS与容器/集群未运行明确。 |
| R05 | 每点独立变体、至少两条验收、具体故障与参考；配置推演标明类型，不伪造平台故障实测。 |
| R06 | 21项任务对应现有Nuxt/独立lab/模板/新增扩展，成功标准具体；不假设主已集成所有平台。 |
| R07 | 理论/代码/任务事实对齐，fixture不是身份，kill有真实v-if且需重启，隐私开关与服务端运行日志职责不同。 |
| R08 | 下列发现已关闭，必要构建与行为回归通过；静态、只读、实测和未测范围分别记录。 |
| R09 | 正文475/590（80.5%），待115，索引与下一阶段12同步；地图学习者勾选未变。 |

## 逐点证据

- [11.1五点](./stage-11-errors-points.json)、[审查](./stage-11-errors-review.md)。
- [11.2五点](./stage-11-metrics-points.json)、[审查及基础设施复审](./stage-11-metrics-review.md)。
- [11.3六点](./stage-11-release-points.json)、[审查及主项目复审](./stage-11-release-review.md)。
- [11.4五点](./stage-11-infra-points.json)、[审查](./stage-11-infra-review.md)。

各点记录实质机制、例子、练习故障、综合任务和来源，不只统一状态。5+5+6+5覆盖21。练习标题与既有检查契约统一为动手任务/验收标准/排错任务/参考要点，未放宽检查器。

## 发现与关闭

1. **错误范围与UI挂载**：初版复用app.vue没有AppFrame，跳转正文不存在；挂载实际框架。测试status与NuxtRouteAnnouncer冲突，限定本功能状态节点。API503显式catch、CSR局部boundary恢复与全局error.vue分别验证，两视口通过。
2. **错误日志路径**：只用afterResponse没有取得预期503日志，读取实际Nitro/H3生命周期源码后增加error hook记录合法状态与recorded防重复。HTTP已实测同次503/error/固定route日志。错误duration结束于捕获，成功结束于响应hook，明确不作为统一RUM latency或INP。
3. **开关真实控制**：独立复审发现初版只有决策文案，增加v-if控制非关键#new-panel，SSR呈现与workspace结果一致。独立4539进程kill配置优先且SSR无节点；需配置/重启，非实时热开关或权限体系。
4. **SSR trace传播**：初版外层生成的header未显式用于内部fetch，已用当前请求ctx传给内部workspace。HTTP确认外层traceID进入SSR payload；内部生成新span。仅version00严格子集，不说完整OTel分布式自动插桩；真实OTel父子/并发导出在独立lab。
5. **Sentry敏感字段**：分组实审发现frame对象spread可能泄漏vars，改明确字段并补canary，最终3Node/Vite构建/两视口复验。默认集成关闭与本地transport不证明生产默认SDK全安全。
6. **OTel版本与资源**：旧trace-node/base版本弃用，读当前官方3.0迁移及源码，改sdk-trace3.1.1并实际验证。不把旧API注册示例迁移为未经验证新API。lab导航补真实HTTP200，资源检查通过。
7. **Nginx与部署Origin**：版本输出原先未复用NGINX_BIN，自定义binary所有路径统一并检查状态；去homebrew PATH的正常实验通过。K8s模板补NUXT_SITE_ORIGIN及入口匹配要求，避免仅改端口后写请求403。独立复审确认关闭。
8. **练习可复现性**：两个临时隔离副本实际删除cache bypass/改return200，明确得到HIT代替BYPASS与全200限流AssertionError；恢复后的正常实验通过。一次编辑引入的语法错误未当故障证据，最终专门检查AssertionError内容。
9. **安装与环境**：新project本地store空，普通网络沙箱DNS失败重试已停止，复用既有stage9缓存后冻结离线安装成功。Docker daemon socket缺失，保持模板观察，没有恢复Colima或创建云资源。

10. **已有SSR能力陈述**：只读复审发现11.1.2/11.1.3任务误写已有SSR渲染失败路由，已统一为实际服务端API503与客户端全局错误；SSR页面抛错仅官方观察/新增练习，操作卡准备也改为真实主Nuxt端口。仅修文档，不冒称额外浏览器重跑。

## 实际验证

| 范围 | 本轮真实证据 |
| --- | --- |
| 主Nuxt | 冻结离线安装、类型、ESLint、格式、4单元、生产SSR构建、5 Playwright；1440/390恢复/最小上报/axe/键盘/SSR，HTTP并发trace/503日志/400/403/实际chunked3000B413/kill进程 |
| error-lab | 冻结安装、3Node、Vite真实hiddenmap、390/1440 Chrome；SDK信封、release/环境、配额/采样、脱敏、crumb顺序与同次压缩栈本地还原 |
| telemetry-lab | 冻结安装、5Node、真实OTel3 trace/metric与内存导出、并发关联、HTTP及390/1440 Chrome；SLO/histogram仅合成演算 |
| release-lab | 冻结安装、4Node、真实临时产物manifest/hash保留回退、HTTP正反例与390/1440 Chrome；预览/incident为官方观察/桌面推演 |
| infra-lab | Nginx1.31.8语法与实际HTTP：MISS/HIT、Cookie/Auth BYPASS不污染、revision MISS、两个上游、200/429；两个故障副本与自定义binary复验 |

运行JSON：[主项目](./stage-11-practice-runtime.json)、[错误](./stage-11-errors-runtime.json)、[指标](./stage-11-metrics-runtime.json)、[发布](./stage-11-release-runtime.json)、[基础设施](./stage-11-infra-runtime.json)。未改代码的组证据按本轮原日期复用，不把主作者整合格式/标题改动说成重新执行全部lab。

全库知识链接/四部分检查、187页690个HTML本地引用零错、42检查器回归、阶段0–11记录门禁通过。门禁只验证记录覆盖与指纹新鲜度；资料正确性依赖上述逐点审查与实际行为证据，不自动认证学习者能力。

## 未测与结论

主是公开本地diagnostics、可改fixture、HTTP Secure=false和单进程有界内存；不是真实身份、生产collector/权限/容量。客户端关闭不撤回已发/在途数据；Origin不是防curl认证；5分钟是访问时惰性清理，不是准点后台删除。trace仍可关联行为。

未执行远程Sentry接收/map上传/Debug ID链路/告警/自动指派、生产RUM或SLO真实告警/Replay、Collector/OTLP、云Preview/生产SSR或数据库回退、CDN/Purge/Geo/WAF、Docker/K8s/远程Actions。相应条目提供官方观察、配置审查和待验证前提，不称“部署成功”。未做真机、多浏览器、屏幕阅读器或真实学习者试学。

声明范围内R01–R09达标；继续阶段12。资料齐全、质量审查通过、个人掌握与生产交付能力仍分别判断。
