# 阶段9编写与验收记录

2026-11-25，AUTHORING规则版本1。开始09:40:49 UTC；实际4代理：主SSR5点+Nuxt，测量预算12点、加载6点、运行时7点。30点资料在声明范围验收，不表示学习者掌握或生产性能认证。

## 规划、前置与递进

[规划复核](./STAGE_9_PLAN_REVIEW.md)保留30点，补入采样/隐私、软导航支持、空样本/预算负例、任务/队列/生命周期与计时边界，未新增重复编号。移动RUM标题改为指标/生命周期差异，保留旧路径和学习勾选。

阶段6建立基础，本阶段先9.1定义问题/测量，再9.2预算和回归，按瓶颈选加载、运行时或SSR。React、Partytown、Edge等不成为全部必装工具；可选工具观察与真实机制分开。

## 逐点审查与集成

- [测量与预算12点](./stage-9-metrics-budget-review.md)：web-vitals归因、隐私/采样/有界去重、真实条目和字节预算正反例；工具观察明确。
- [加载6点](./stage-9-loading-review.md)：关键CSS、授权字体/图片候选、推测回退、103和cache key/凭据旁路。
- [运行时7点](./stage-9-runtime-review.md)：长任务、事件、真实Heap保留/清理、变高窗口、Worker队列/转移/取消、idle回退。
- [SSR5点](./stage-9-ssr-review.md)：生产源码/stream、首击水合、时间范围、payload与数据调度；运行时组另独立核读主源码/教材/日志，无阻断发现。

points.json记录每点理论、实际示例、练习、任务和来源事实。主代理读取分组源码/卡片/练习并统一30任务、契约与入口；不能只以文档数量或分组返回认为通过。

| 规则 | 集成结论与证据 |
| --- | --- |
| R01 | 30唯一编号，7/5/6/7/5分组；四部分映射和实际入口/任务完整。 |
| R02 | 指标/采集→预算→针对瓶颈优化，示例/变体/任务对应；框架先修和选修边界明确。 |
| R03 | 先MWG，再web.dev/web-vitals/Nuxt/Vue/H3/MDN/Chrome/工具官方；raw条目/INP、lab/RUM、发送/组件流式、TTFB/FCP/函数耗时不混淆。 |
| R04 | 主Nuxt及三lab真实构建/HTTP/浏览器/CDP，官方观察/未运行工具明确；没有把空报告或0样本当通过。 |
| R05 | 30独立变体有两标准、具体故障/定位/参考；修正“延迟替代焦点样式”的故障前提，保留可复现步骤。 |
| R06 | 任务对应主Nuxt或独立lab/明确扩展；主工程没有虚构Worker、CDN、web-vitals或真实微服务。 |
| R07 | 指标起终点、阈值/预算范围、首击/事件回放、公开与凭据缓存、原始证据/版本一致。 |
| R08 | 类型/规范/单元/构建、字节预算、浏览器及实际heap证据通过；collector413、worker旧错误、字段验证等发现已修复复验。 |
| R09 | 正文425/590（72.0%）、阶段9为30/30，索引和下一阶段10同步，学习勾选未动。 |

## 本轮真实验证

主Nuxt固定4.7.0/Vue3.5.46/TS6.0.3，Node26/pnpm11.4。冻结安装、typecheck、ESLint、Prettier、4项unit、生产Node构建通过；unit受控gate验证两个独立源开始顺序和失败，不靠不稳定时长阈值。

预算复用metrics同一纯Node工具实际读取Nuxt全部JS/CSS，raw219567/gzip82463字节，在显式500000/200000教学政策内；这是全产物逐文件压缩和，不是首路由transfer/Brotli/CPU/CWV。main pnpm check在build后执行budget；CI示例YAML语法实际通过，但没有远程Actions执行。

主3项E2E：1440/390两流程（SSR课程及可选HTML、初始0API重复、局部mounted/@hydrated、首击0→1、主measure、模式导航/刷新、键盘skip、axe、无溢出/水合错误）；HTTP一组（每模式3真实API样本和ServerTiming、400/404、ReadableStream reader2块）。串行约62ms/并行31ms只来自两个合成30ms等待；导航raw responseStart/FCP另记录，不当生产p75或web-vitals校正TTFB。主renderer await renderToString与独立静态HTTP stream源码已交叉核对，不伪称默认Nuxt组件Streaming SSR。

metrics-lab：真实web-vitals6.2.3 attribution，4组Node，390/1440两浏览器组，LCP/INP/CLS都有本次回调；Navigation/Resource/Longtask/Measure原条目；发送前collector0、手动204/一快照、URL/DOM不上传、额外字段400/17000字节413、无外部请求。产物17207raw/6681gzip；超额、空目录、缺路径、非法限额真实子进程非零。collector有界读取/排空后413修复复验两视口。

loading-lab：4项Node和两浏览器组。Roboto官方Latin400 WOFF2 21884字节/OFL/source记录，真实FontFace加载与单次请求、swap；FCP早于延迟600ms非关键CSS、AVIF currentSrc/固有尺寸/LQIP。公开缓存key与最多32项、Cookie/Authorization即使空值也旁路、四并发不混用；Node真实HTTP1 103→200。最后凭据/103细化只重跑受影响4Node，页面机制复用本轮两视口，不冒称最后全量重跑。未声称浏览器实际prefetch/prerender或H3/CDN。

runtime-lab：最终3Node、390/1440两机制组和1440单独Heap组；90ms阻塞/分片/取消、原始EventTiming、变高前缀窗口/锚点/全量1000、有界1活动+2排队/transfer detached/拒绝/取消重启、idle回退和取消。CDP HeapProfiler三快照Stage9RetainedPanel对象0→20→0，真实Array element强引用入边，显式清引用/监听后诊断GC；不是靠数组长度冒充Heap证明。Worker补身份guard、Uint32对齐、postMessage throw结算后复验3+2，heap机制不变复用本轮已证结果。raw heap/trace在ignored artifacts，不提交大产物，也不依赖FinalizationRegistry时机。

详细版本/命令/原值见各runtime及[主运行](./stage-9-practice-runtime.json)。全库机械门禁425/425四部分、182HTML/681引用零错、42Python检查器回归、阶段0–9记录/指纹门禁。机器记录不独立判断教材语义或学习者能力，仍依赖上述逐点审查。

## 已修正与限制

已修collector超限读取响应、Worker旧错误不影响新实例/参数校验/throw收尾、加载cache空凭据/视口字段、CSS焦点反例前提；真实受影响验证有记录。没有为追分重复Lighthouse，也没有用只改指纹伪造验收。

本轮没有运行Lighthouse/LHCI/WebPageTest、图形bundle分析器、Vue/React Profiler UI、Partytown、真实Edge/CDN/H3/代理流式部署、生产RUM/p75/容量、真机/多浏览器/真实读屏或学习者试学。CDP heap是真实DevTools协议证据，不称已操作整个Memory UI。图像是合成fixture、字体子集由Google提供而非本轮生成，不夸大业务压缩收益。手动collector不等于可靠full-session fetchLater投递。

结论：30点四部分在声明范围按R01–R09达标；下一阶段10，正文完成与学习掌握分开。

提交后文本复核：Roboto许可证仅去除一处行尾空白，版权/许可条款及字体二进制未改；不影响任何运行行为，复用上述本轮证据，复核来源指纹与差异。
