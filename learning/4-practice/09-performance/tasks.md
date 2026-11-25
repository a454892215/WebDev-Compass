# 阶段9逐点综合任务

先读[主项目说明](./README.md)，再在副本完成变体。30项分别对应主Nuxt、metrics/loading/runtime实验或明确官方观察；每次先预测，再记录环境与原值，解释原因和限制，不靠分数或安装数量代替掌握。

<a id="p-9-1-1"></a>

## 9.1.1 实验数据与RUM：先定义访问人群再比较

给冷加载、回访缓存、长停留多次操作设计三种采样情景，说明和现有lab哪些不同。

验收：

- [ ] 注明来源/日期/工具/设备/网络/样本数与缓存；没有样本时不填0或通过。
- [ ] 对用户/设备/页面路径分组，说明合成分位数不能证明真实用户达标。

[理论](../../1-notes/09-performance/9.1-performance-metrics/9.1.1.lab-vs-rum.md) · [示例](../../2-examples/09-performance/9.1-performance-metrics/9.1.1.lab-vs-rum-demo.md) · [独立练习](../../3-exercises/09-performance/9.1-performance-metrics/9.1.1.lab-vs-rum.md)

<a id="p-9-1-2"></a>

## 9.1.2 LCP/INP/CLS归因：从指标到具体阶段

把单个长handler分块后对照输入/处理/呈现三段，另给一张首屏图片的LCP资源链假设，说明如何证伪。

验收：

- [ ] 原始交互/设备环境与归因分项保留，不把90ms阻塞时长直接叫INP。
- [ ] 解释CLS近期输入排除与窗口口径；不把所有layout-shift.entry.value直接相加成正式CLS。

[理论](../../1-notes/09-performance/9.1-performance-metrics/9.1.2.core-web-vitals.md) · [示例](../../2-examples/09-performance/9.1-performance-metrics/9.1.2.core-web-vitals-demo.md) · [独立练习](../../3-exercises/09-performance/9.1-performance-metrics/9.1.2.core-web-vitals.md)

<a id="p-9-1-3"></a>

## 9.1.3 web-vitals采集：生命周期、采样、去重与隐私

在副本加入安全枚举的device cohort和固定访问采样决定，测试相同id更新/达到上限/不采样/未知字段。

验收：

- [ ] 重复变化不重复加value，样本缺失与零值分开，参数与DOM不得成为上报字段。
- [ ] 说明fetchLater支持/配额/取消/回退与投递局限；手动ACK不冒称后台full-session成功。

[理论](../../1-notes/09-performance/9.1-performance-metrics/9.1.3.web-vitals.md) · [示例](../../2-examples/09-performance/9.1-performance-metrics/9.1.3.web-vitals-demo.md) · [独立练习](../../3-exercises/09-performance/9.1-performance-metrics/9.1.3.web-vitals.md)

<a id="p-9-1-4"></a>

## 9.1.4 Performance API：时间原点、缓冲区与跨源限制

在副本分别记录冷资源和再次加载的条目，说明哪些是观测、哪些缓存推断；模拟不支持longtask的分支。

验收：

- [ ] supportedEntryTypes与条目存在性明确，unsupported不假装计时0。
- [ ] 不将startTime当UNIX时间，Observer与记录有上限/销毁，跨源字段限制有说明。

[理论](../../1-notes/09-performance/9.1-performance-metrics/9.1.4.performance-api.md) · [示例](../../2-examples/09-performance/9.1-performance-metrics/9.1.4.performance-api-demo.md) · [独立练习](../../3-exercises/09-performance/9.1-performance-metrics/9.1.4.performance-api.md)

<a id="p-9-1-5"></a>

## 9.1.5 业务mark/measure：区分DOM更新与实际呈现

给成功/失败/取消建立相同边界的业务计时，防止重复点击引用旧起点，并解释该指标和INP分别回答什么。

验收：

- [ ] 命名、时间边界、结果状态明确，同次开始/结束配对且数量有界。
- [ ] 说明nextTick/rAF与真正paint区别，不用渲染前mark宣称用户已看到内容。

[理论](../../1-notes/09-performance/9.1-performance-metrics/9.1.5.item-9-1-5.md) · [示例](../../2-examples/09-performance/9.1-performance-metrics/9.1.5.item-9-1-5-demo.md) · [独立练习](../../3-exercises/09-performance/9.1-performance-metrics/9.1.5.item-9-1-5.md)

<a id="p-9-1-6"></a>

## 9.1.6 性能回归：确定性产物门禁与有波动的实验指标

在隔离副本把字节阈值降至1并让quality命令停止；再给Lighthouse噪声指标写复核策略，不自动无限重跑追分。

验收：

- [ ] 强制失败能阻止后续推广，构建/阈值/命令与报告可追溯。
- [ ] 无报告/工具失败不能算通过，预算与真实场数据结论分开。

[理论](../../1-notes/09-performance/9.1-performance-metrics/9.1.6.item-9-1-6.md) · [示例](../../2-examples/09-performance/9.1-performance-metrics/9.1.6.item-9-1-6-demo.md) · [独立练习](../../3-exercises/09-performance/9.1-performance-metrics/9.1.6.item-9-1-6.md)

<a id="p-9-1-7"></a>

## 9.1.7 移动APM与Web RUM：目标相似，生命周期不同

将移动APM方案“启动到退出单次trace+完整页面URL”改成Web访问/路由与指标模型，删掉私有query字段并定义缺样本处理。

验收：

- [ ] 至少区分文档访问、软导航、metric id和业务trace四个维度。
- [ ] 说明后台销毁/投递无保证、浏览器数据与原生SDK不同，不能承诺100%无损。

[理论](../../1-notes/09-performance/9.1-performance-metrics/9.1.7.web-rum-firebase-performance-apm.md) · [示例](../../2-examples/09-performance/9.1-performance-metrics/9.1.7.web-rum-firebase-performance-apm-demo.md) · [独立练习](../../3-exercises/09-performance/9.1-performance-metrics/9.1.7.web-rum-firebase-performance-apm.md)

<a id="p-9-2-1"></a>

## 9.2.1 性能预算：明确范围、单位和业务取舍

为首屏低端手机约束选字节和一次业务交互两个独立预算，给一项例外、期限与验证方式。

验收：

- [ ] 范围/单位/阈值来源/执行环境可复核，不拿all-assets冒充首路由成本。
- [ ] 功能/可访问性/安全不因压缩指标退化；没有场样本不能报p75达标。

[理论](../../1-notes/09-performance/9.2-performance-budget/9.2.1.performance-budget.md) · [示例](../../2-examples/09-performance/9.2-performance-budget/9.2.1.performance-budget-demo.md) · [独立练习](../../3-exercises/09-performance/9.2-performance-budget/9.2.1.performance-budget.md)

<a id="p-9-2-2"></a>

## 9.2.2 产物分析：先量文件，再追模块与入口

在副本新增一个合理按需模块，比较入口闭包与all-assets库存，查明是否只移动成本而未减少首次实际下载。

验收：

- [ ] 分清入口/懒块/所有产物，模块贡献判断有真实工具或源码依据，不只猜库名。
- [ ] map/分析报告可能含源路径，不盲目公开；插件兼容具体版本可核对。

[理论](../../1-notes/09-performance/9.2-performance-budget/9.2.2.bundle.md) · [示例](../../2-examples/09-performance/9.2-performance-budget/9.2.2.bundle-demo.md) · [独立练习](../../3-exercises/09-performance/9.2-performance-budget/9.2.2.bundle.md)

<a id="p-9-2-3"></a>

## 9.2.3 预算门禁与CI：让真实失败阻断推广

给本地quality链加入build && budget，用1字节阈值验证后续命令不执行；再写可信分支/最小权限的发布前条件。

验收：

- [ ] 无产物与非零工具错误必失败，不用continue-on-error或||true偷偷绕过。
- [ ] 报告带版本/范围/单位；自动评论不能泄露私有源码、真实用户URL或凭据。

[理论](../../1-notes/09-performance/9.2-performance-budget/9.2.3.ci.md) · [示例](../../2-examples/09-performance/9.2-performance-budget/9.2.3.ci-demo.md) · [独立练习](../../3-exercises/09-performance/9.2-performance-budget/9.2.3.ci.md)

<a id="p-9-2-4"></a>

## 9.2.4 第三方脚本审计：功能必要性、加载时机和数据边界

在副本加一个明确的本地第三方替身，比较默认加载和用户动作加载，设计失败回退与移除；不要向真实外网发送用户样本。

验收：

- [ ] 脚本清单能对应真实请求/构建依赖与负责人，计算耗时和流量有明确环境。
- [ ] 禁用脚本后关键业务可恢复，敏感URL/输入不送第三方，时机与同意分开。

[理论](../../1-notes/09-performance/9.2-performance-budget/9.2.4.item-9-2-4.md) · [示例](../../2-examples/09-performance/9.2-performance-budget/9.2.4.item-9-2-4-demo.md) · [独立练习](../../3-exercises/09-performance/9.2-performance-budget/9.2.4.item-9-2-4.md)

<a id="p-9-2-5"></a>

## 9.2.5 Partytown取舍：Worker不是免费兼容层

对分析计数SDK与含输入表单的聊天UI两类需求作选择，给出需要实测的事件/网络/权限与退出条件；可选择暂不采用。

验收：

- [ ] 选择理由针对脚本行为与支持范围，不把主线程减少等同总耗时必减。
- [ ] 明确未安装/未测，若后续集成需回归CSP、用户动作顺序、失败回退和数据边界。

[理论](../../1-notes/09-performance/9.2-performance-budget/9.2.5.partytown.md) · [示例](../../2-examples/09-performance/9.2-performance-budget/9.2.5.partytown-demo.md) · [独立练习](../../3-exercises/09-performance/9.2-performance-budget/9.2.5.partytown.md)

<a id="p-9-3-1"></a>

## 9.3.1 Critical CSS：按首屏提取与非关键样式边界

在副本增加窄屏菜单与错误提示状态，列出必需样式；只延后确实不影响首屏/键盘的装饰，并比较HTML增量与资源发现顺序。

验收：

- [ ] 记录冷缓存FCP/CSS时间和环境，不把同机一次时长写成生产p75。
- [ ] 关闭JS后正文/链接/焦点仍可见；不同视口/状态没有未样式化的必要控件。

[理论](../../1-notes/09-performance/9.3-loading-advanced/9.3.1.critical-css.md) · [示例](../../2-examples/09-performance/9.3-loading-advanced/9.3.1.critical-css-demo.md) · [独立练习](../../3-exercises/09-performance/9.3-loading-advanced/9.3.1.critical-css.md)

<a id="p-9-3-2"></a>

## 9.3.2 字体加载：子集、swap与匹配的preload

将标题改为另一语言或字重，先检查字形覆盖和实际需求，再决定是否加新子集/预加载；比较一个必需字重和全家族预加载的请求集合。

验收：

- [ ] 资源URL与as/type/CORS模式匹配，没有不必要的重复或不使用的preload。
- [ ] 回退文字可读，许可证和字形/字重范围明确，不声称Latin子集覆盖中文。

[理论](../../1-notes/09-performance/9.3-loading-advanced/9.3.2.item-9-3-2.md) · [示例](../../2-examples/09-performance/9.3-loading-advanced/9.3.2.item-9-3-2-demo.md) · [独立练习](../../3-exercises/09-performance/9.3-loading-advanced/9.3.2.item-9-3-2.md)

<a id="p-9-3-3"></a>

## 9.3.3 图片管线：真实候选、占位与CDN变换契约

给副本增加一个更宽容器与DPR2场景，按实际布局改sizes并补合适候选；若设计CDN变换，仅允许固定尺寸/格式集合，不接任意远程源URL。

验收：

- [ ] currentSrc属于真实存在且可解码候选，尺寸比例/占位稳定，alt对应实际内容。
- [ ] 首屏候选不lazy，不将测试几何图的字节优势直接套所有业务素材。

[理论](../../1-notes/09-performance/9.3-loading-advanced/9.3.3.item-9-3-3.md) · [示例](../../2-examples/09-performance/9.3-loading-advanced/9.3.3.item-9-3-3-demo.md) · [独立练习](../../3-exercises/09-performance/9.3-loading-advanced/9.3.3.item-9-3-3.md)

<a id="p-9-3-4"></a>

## 9.3.4 推测加载：预取、预渲染与无副作用边界

在副本把候选从全部链接改成有限公开内容白名单；为Save-Data/不支持与未命中设计正常导航，说明激活前哪些业务动作必须延后。

验收：

- [ ] 规则不含账号/支付/退出/带秘密查询URL，普通链接无建议时仍可用。
- [ ] 分别记录支持、建议发出、实际网络行为和激活，不能把第一项当最后一项。

[理论](../../1-notes/09-performance/9.3-loading-advanced/9.3.4.speculation-rules-api.md) · [示例](../../2-examples/09-performance/9.3-loading-advanced/9.3.4.speculation-rules-api-demo.md) · [独立练习](../../3-exercises/09-performance/9.3-loading-advanced/9.3.4.speculation-rules-api.md)

<a id="p-9-3-5"></a>

## 9.3.5 HTTP/3、103与历史Server Push：区分协议层证据

为实际托管写协议核对清单：浏览器nextHopProtocol/网络协商、代理是否转发103、提示与最终资源身份是否一致；在本lab用Node information事件区分103与最终状态。

验收：

- [ ] 记录真实协议来源；本地http1.1实验不写h3或线上性能收益。
- [ ] 103 Link正确但最终HTML仍可独立加载；协议提示不导致用户特定资源被跨用户预加载。

[理论](../../1-notes/09-performance/9.3-loading-advanced/9.3.5.http.md) · [示例](../../2-examples/09-performance/9.3-loading-advanced/9.3.5.http-demo.md) · [独立练习](../../3-exercises/09-performance/9.3-loading-advanced/9.3.5.http.md)

<a id="p-9-3-6"></a>

## 9.3.6 边缘缓存键：输出维度、凭据旁路与失效

在副本新增region输出维度，先故意漏key稳定复现错误命中，再补key/失效；设计凭据请求在边缘lookup前旁路，不以URL里加scope当授权。

验收：

- [ ] 不同输出维度不能命中同一公开值；相同语义参数重排可复用，容量有上限。
- [ ] 有凭据请求不读/写公开缓存，私有标记不能进入之后匿名结果；真实CDN配置另验。

[理论](../../1-notes/09-performance/9.3-loading-advanced/9.3.6.edge.md) · [示例](../../2-examples/09-performance/9.3-loading-advanced/9.3.6.edge-demo.md) · [独立练习](../../3-exercises/09-performance/9.3-loading-advanced/9.3.6.edge.md)

<a id="p-9-4-1"></a>

## 9.4.1 长任务与分片：让出主线程、取消和框架更新

在主Nuxt副本新增本地合成批处理，再用时间预算/能力检测改为分片，添加离开或替换输入时取消。

验收：

- [ ] 分片前后结果相同，主线程让出可观察；不将总耗时降低作为唯一成功条件。
- [ ] 取消后旧任务不再回写，fallback可运行，nextTick和绘制/任务调度分开解释。

[理论](../../1-notes/09-performance/9.4-runtime-advanced/9.4.1.long-task.md) · [示例](../../2-examples/09-performance/9.4-runtime-advanced/9.4.1.long-task-demo.md) · [独立练习](../../3-exercises/09-performance/9.4-runtime-advanced/9.4.1.long-task.md)

<a id="p-9-4-2"></a>

## 9.4.2 INP排查：输入延迟、处理和呈现不能混成一项

在副本为搜索新增即时反馈，再把耗时处理拆开；记录EventTiming条目与处理/呈现差异，不对业务写操作随意debounce。

验收：

- [ ] 说明输入等待、handler与呈现三个部分，保留支持情况/阈值/操作环境。
- [ ] 用户可看到处理状态且取消可用；没有条目应写不可观测，不能伪造零INP。

[理论](../../1-notes/09-performance/9.4-runtime-advanced/9.4.2.inp.md) · [示例](../../2-examples/09-performance/9.4-runtime-advanced/9.4.2.inp-demo.md) · [独立练习](../../3-exercises/09-performance/9.4-runtime-advanced/9.4.2.inp.md)

<a id="p-9-4-3"></a>

## 9.4.3 内存定位：用实际Heap快照追踪强引用与Detached DOM

在独立副本构造路由挂载/卸载20次的合成面板，对比少清一种资源与完整dispose；保存三快照或同等真实引用证据。

验收：

- [ ] 能指认一条真实保留路径，不以总heap数字或数组长度单独当释放证明。
- [ ] 清理后强引用和监听释放、重复进出有界；明确诊断GC不证明正常GC何时运行。

[理论](../../1-notes/09-performance/9.4-runtime-advanced/9.4.3.profiling.md) · [示例](../../2-examples/09-performance/9.4-runtime-advanced/9.4.3.profiling-demo.md) · [独立练习](../../3-exercises/09-performance/9.4-runtime-advanced/9.4.3.profiling.md)

<a id="p-9-4-4"></a>

## 9.4.4 WeakRef与FinalizationRegistry：不依赖GC时机

设计一个最多100项的可重建缓存，明确淘汰与dispose；若选择WeakRef，说明缺失时重建和未执行finalizer的影响。

验收：

- [ ] 缓存即使没有GC也受容量限制，关键资源由显式生命周期释放。
- [ ] 不使用sleep后断言deref必为空，heldValue不包含target或其强引用闭包。

[理论](../../1-notes/09-performance/9.4-runtime-advanced/9.4.4.weakref-finalizationregistry.md) · [示例](../../2-examples/09-performance/9.4-runtime-advanced/9.4.4.weakref-finalizationregistry-demo.md) · [独立练习](../../3-exercises/09-performance/9.4-runtime-advanced/9.4.4.weakref-finalizationregistry.md)

<a id="p-9-4-5"></a>

## 9.4.5 可变高虚拟列表：前缀定位、锚点与可访问回退

副本新增一行可展开说明，增加高度后保持当前可见锚点；给搜索/打印或键盘逐项操作选择全量/不同分页方案。

验收：

- [ ] 前缀与真实高度一致，窗口数量有界，插入或上方高度变化不丢锚点。
- [ ] 有可操作的全量/分页回退与信息说明；不循环回收正在持焦点的控件。

[理论](../../1-notes/09-performance/9.4-runtime-advanced/9.4.5.item-9-4-5.md) · [示例](../../2-examples/09-performance/9.4-runtime-advanced/9.4.5.item-9-4-5-demo.md) · [独立练习](../../3-exercises/09-performance/9.4-runtime-advanced/9.4.5.item-9-4-5.md)

<a id="p-9-4-6"></a>

## 9.4.6 Worker任务池：有界队列、转移所有权和取消

在副本把一个可重放纯计算接入有界池，设计取消/输入替换和失败UI，测不同输入量的克隆/转移成本。

验收：

- [ ] 队列满和Worker失败不留悬挂Promise，取消后旧结果不能覆盖新任务。
- [ ] 记录buffer转移前后所有权，离开时terminate，下一次启动可恢复。

[理论](../../1-notes/09-performance/9.4-runtime-advanced/9.4.6.web-worker.md) · [示例](../../2-examples/09-performance/9.4-runtime-advanced/9.4.6.web-worker-demo.md) · [独立练习](../../3-exercises/09-performance/9.4-runtime-advanced/9.4.6.web-worker.md)

<a id="p-9-4-7"></a>

## 9.4.7 空闲任务：deadline、timeout与可取消回退

在副本新增可推迟的索引预热，每批固定上限，支持用户触发时优先/取消，提供无requestIdleCallback回退。

验收：

- [ ] timeout回调仍有界，关键交互不依赖其准时执行。
- [ ] 取消与dispose有效，回退明确普通timer，不用假的50ms预算冒充idle。

[理论](../../1-notes/09-performance/9.4-runtime-advanced/9.4.7.requestidlecallback.md) · [示例](../../2-examples/09-performance/9.4-runtime-advanced/9.4.7.requestidlecallback-demo.md) · [独立练习](../../3-exercises/09-performance/9.4-runtime-advanced/9.4.7.requestidlecallback.md)

<a id="p-9-5-1"></a>

## 9.5.1 HTTP流式HTML与Nuxt渲染：先核对真实发送边界

在副本加入一个会缓冲整个响应再发送的代理，与直接端点比较第一段可见时机；故障和修复只在本地。

验收：

- [ ] 明确区分组件生成、服务器发送、代理转发和浏览器呈现；保存真实chunk/时间环境。
- [ ] 鉴权/状态/必要头在发送前完成；首块后不能假定还能改HTTP状态，晚失败有可理解策略。

[理论](../../1-notes/09-performance/9.5-ssr-streaming/9.5.1.streaming-html.md) · [示例](../../2-examples/09-performance/9.5-ssr-streaming/9.5.1.streaming-html-demo.md) · [独立练习](../../3-exercises/09-performance/9.5-ssr-streaming/9.5.1.streaming-html.md)

<a id="p-9-5-2"></a>

## 9.5.2 Vue/Nuxt按需水合：优先级、首个交互与清理

在副本改成visible并把面板置于可滚动的远处；再比较interaction，记录何时接管而非猜“加载更少”。

验收：

- [ ] SSR正文未消失，未接管前状态明确；第一次键盘/点击按产品策略正常，实际重复事件不加两次。
- [ ] 记录组件是否已挂载和资源/交互证据，不把mounted mark当完整CPU成本或正式INP。

[理论](../../1-notes/09-performance/9.5-ssr-streaming/9.5.2.item-9-5-2.md) · [示例](../../2-examples/09-performance/9.5-ssr-streaming/9.5.2.item-9-5-2-demo.md) · [独立练习](../../3-exercises/09-performance/9.5-ssr-streaming/9.5.2.item-9-5-2.md)

<a id="p-9-5-3"></a>

## 9.5.3 TTFB、FCP与服务端耗时：区分时间范围再比较

把数据任务人为加依赖（summary必须用course结果），说明为何不能盲并行；为原独立任务保留barrier测试与实际样本。

验收：

- [ ] 给每数值写起终点、单位、样本/冷热状态和环境；缺少FCP条目不能当0成功。
- [ ] 比较等价功能，保留分布/原值；不将一台机器的一次速度或三个样本中位数称线上p75/SLA。

[理论](../../1-notes/09-performance/9.5-ssr-streaming/9.5.3.ttfb-vs-fcp.md) · [示例](../../2-examples/09-performance/9.5-ssr-streaming/9.5.3.ttfb-vs-fcp-demo.md) · [独立练习](../../3-exercises/09-performance/9.5-ssr-streaming/9.5.3.ttfb-vs-fcp.md)

<a id="p-9-5-4"></a>

## 9.5.4 Nuxt数据与水合：消除瀑布、稳定key和初始重复请求

仅在SSR副本将useAsyncData改为setup裸await requestFetch，比较初始浏览器请求；再故意删除mode key维度，观察是否复用错误结果或违反同key选项一致性。

验收：

- [ ] 初始payload与可见数据一致，无额外不必要浏览器API；导航与refresh的合理读取单独记录。
- [ ] scope/身份若扩展必须进缓存key并处理失效，不用Node全局Map掩盖重复或跨请求混用。

[理论](../../1-notes/09-performance/9.5-ssr-streaming/9.5.4.item-9-5-4.md) · [示例](../../2-examples/09-performance/9.5-ssr-streaming/9.5.4.item-9-5-4-demo.md) · [独立练习](../../3-exercises/09-performance/9.5-ssr-streaming/9.5.4.item-9-5-4.md)

<a id="p-9-5-5"></a>

## 9.5.5 Edge渲染：数据距离、运行兼容与缓存一致性

假设数据库仅单区而用户跨三地区，比较Origin SSR+CDN静态资源与Edge SSR两候选；列可测条件和回退。

验收：

- [ ] 两候选按同一请求/数据约束比较，包含最坏跨区路径与写一致性，未测数值不编造。
- [ ] 公开/个性化缓存边界与失效责任明确，Node/Edge包能力按真实provider版本核对。

[理论](../../1-notes/09-performance/9.5-ssr-streaming/9.5.5.edge.md) · [示例](../../2-examples/09-performance/9.5-ssr-streaming/9.5.5.edge-demo.md) · [独立练习](../../3-exercises/09-performance/9.5-ssr-streaming/9.5.5.edge.md)
