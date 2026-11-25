# 阶段11逐知识点综合任务

先读[工作台说明](./README.md)，再核对[运行边界](./docs/OPERATIONS.md)。21点分别对应主Nuxt、独立SDK/发布/Nginx实验、明确模板或官方观察。已有与新增扩展分开，不把本地合成数据称生产监控。仅使用loopback和合成资料。

<a id="p-11-1-1"></a>

## 11.1.1 Sentry/BugSnag集成：事件、Release与Source Map必须匹配

Sentry SDK实际实验在error-lab，SaaS/map上传/通知未运行；Nuxt局部/全局兜底在主项目。

为主Nuxt综合项目设计一次版本化Sentry接入变更：分别标注客户端、Nitro服务端及CI上传职责。先在独立error-lab证明同次产物还原，真实平台接入作为需要专用项目凭据的后续扩展。

验收：

- [ ] 架构图标出浏览器/SSR/CI三个上下文和秘密边界，不把browser lab当主Nuxt已接入Sentry。
- [ ] 发布清单含map配对、测试事件、回滚旧map保留与环境过滤；未上传/未远端告警明确记录。

[理论](../../1-notes/11-observability/11.1-error-monitoring/11.1.1.sentry-bugsnag.md) · [示例](../../2-examples/11-observability/11.1-error-monitoring/11.1.1.sentry-bugsnag-demo.md) · [独立练习](../../3-exercises/11-observability/11.1-error-monitoring/11.1.1.sentry-bugsnag.md)

<a id="p-11-1-2"></a>

## 11.1.2 错误分级与告警路由：以用户影响决定响应

Sentry SDK实际实验在error-lab，SaaS/map上传/通知未运行；Nuxt局部/全局兜底在主项目。

为Nuxt综合项目的局部卡片失败、服务端API503及灰度关键流程失败分别写分级/owner路由卡，并与Runbook关联；实际聊天告警仅保留配置草案。

验收：

- [ ] 三种场景给出不同影响、恢复策略和首个排查动作，局部错误不自动等于全站P0。
- [ ] owner未知/未确认有兜底升级，证据区分本地故障、平台规则草案和实际通知未执行。

[理论](../../1-notes/11-observability/11.1-error-monitoring/11.1.2.item-11-1-2.md) · [示例](../../2-examples/11-observability/11.1-error-monitoring/11.1.2.item-11-1-2-demo.md) · [独立练习](../../3-exercises/11-observability/11.1-error-monitoring/11.1.2.item-11-1-2.md)

<a id="p-11-1-3"></a>

## 11.1.3 Vue/Nuxt错误边界：模块恢复、全局错误与服务端失败分开

Sentry SDK实际实验在error-lab，SaaS/map上传/通知未运行；Nuxt局部/全局兜底在主项目。

对主Nuxt已有局部卡片/客户端全局错误/服务端API503路径写故障矩阵，在隔离副本增加一个useAsyncData失败，明确由error分支处理而非局部边界自动捕获。

验收：

- [ ] 矩阵逐项写触发上下文、捕获范围、HTTP状态、恢复动作及实际测试来源。
- [ ] 新增异步失败保留重试/加载状态并无无限循环；不启用SSR实验项来满足错误的默认前提。

[理论](../../1-notes/11-observability/11.1-error-monitoring/11.1.3.error-boundary.md) · [示例](../../2-examples/11-observability/11.1-error-monitoring/11.1.3.error-boundary-demo.md) · [独立练习](../../3-exercises/11-observability/11.1-error-monitoring/11.1.3.error-boundary.md)

<a id="p-11-1-4"></a>

## 11.1.4 错误采样与配额：先过滤和脱敏，再控制成本

Sentry SDK实际实验在error-lab，SaaS/map上传/通知未运行；Nuxt局部/全局兜底在主项目。

在error-lab变体中设计按固定错误代码的过滤和本地预算，给主Nuxt遥测collector另写接收端限额验证，不假称主项目已接入Sentry平台配额。

验收：

- [ ] 同一测试明确标注错误率、trace率和Replay率独立，0事件不写成无故障。
- [ ] 当前内存transport与真实网络接收端策略分开，保留故障可见性及必要字段且不发送敏感文本。

[理论](../../1-notes/11-observability/11.1-error-monitoring/11.1.4.item-11-1-4.md) · [示例](../../2-examples/11-observability/11.1-error-monitoring/11.1.4.item-11-1-4-demo.md) · [独立练习](../../3-exercises/11-observability/11.1-error-monitoring/11.1.4.item-11-1-4.md)

<a id="p-11-1-5"></a>

## 11.1.5 Breadcrumbs：用有限语义事件还原操作顺序

Sentry SDK实际实验在error-lab，SaaS/map上传/通知未运行；Nuxt局部/全局兜底在主项目。

为主Nuxt局部故障→重试→恢复设计一个有界语义操作列表，并在独立Sentry lab验证allowlist与清理。若后续接入SSR SDK，先增加两个并发请求不同scope不串动作的测试。

验收：

- [ ] 操作列表不含文本输入、query、Cookie/token，顺序与实际UI动作对应且有明确上限。
- [ ] 主项目本地遥测与Sentry breadcrumbs分开描述；未实现的SSR SDK隔离测试写成后续扩展。

[理论](../../1-notes/11-observability/11.1-error-monitoring/11.1.5.breadcrumbs.md) · [示例](../../2-examples/11-observability/11.1-error-monitoring/11.1.5.breadcrumbs-demo.md) · [独立练习](../../3-exercises/11-observability/11.1-error-monitoring/11.1.5.breadcrumbs.md)

<a id="p-11-2-1"></a>

## 11.2.1 结构化日志：用允许列表和关联ID诊断，减少身份暴露

OTel真实SDK在telemetry-lab，主项目只有最小W3C关联与固定代码；Replay未加载，RUM/SLO用合成演算。

为主Nuxt的模拟5xx制定一条服务端日志schema，并沿返回traceId找到同次请求；若扩展身份字段，先论证必要性，不把客户端userId当可信身份。

验收：

- [ ] 核对实际代码只记录固定route/code/release/traceId等已声明字段，不假称整套OTel日志流水线。
- [ ] 用合成敏感输入验证收集前减量，记录访问控制/保留期是现有实现还是待建设。

[理论](../../1-notes/11-observability/11.2-logging-metrics/11.2.1.item-11-2-1.md) · [示例](../../2-examples/11-observability/11.2-logging-metrics/11.2.1.item-11-2-1-demo.md) · [独立练习](../../3-exercises/11-observability/11.2-logging-metrics/11.2.1.item-11-2-1.md)

<a id="p-11-2-2"></a>

## 11.2.2 W3C traceparent与OpenTelemetry：传播上下文，而非共享当前请求

OTel真实SDK在telemetry-lab，主项目只有最小W3C关联与固定代码；Replay未加载，RUM/SLO用合成演算。

对照主Nuxt返回的请求traceId与独立lab真实OTel父子span，标注主项目只有最小请求关联，提出下一步跨服务接入边界。

验收：

- [ ] 不把主项目的关联header/日志称为完整OTel分布式追踪；能指出真实SDK所在独立lab。
- [ ] 至少展示合法远端父、无效输入重建和并发隔离证据，新增下游传播明确标为扩展。

[理论](../../1-notes/11-observability/11.2-logging-metrics/11.2.2.distributed-tracing.md) · [示例](../../2-examples/11-observability/11.2-logging-metrics/11.2.2.distributed-tracing-demo.md) · [独立练习](../../3-exercises/11-observability/11.2-logging-metrics/11.2.2.distributed-tracing.md)

<a id="p-11-2-3"></a>

## 11.2.3 Counter、Histogram与Web Vitals：单位、分母和标签基数

OTel真实SDK在telemetry-lab，主项目只有最小W3C关联与固定代码；Replay未加载，RUM/SLO用合成演算。

为主项目监控面板补一个指标字典，明确事件总数、错误率分母和耗时单位，借独立lab演算直方图，不假称主项目已采集完整Vitals。

验收：

- [ ] 指标表含名称/单位/采样/标签/分母/保留期，模拟样本与真实用户指标分开。
- [ ] 提交两组已知样本的桶/count/sum/p75验证，不平均各页p75；注明阶段9真实Vitals入口。

[理论](../../1-notes/11-observability/11.2-logging-metrics/11.2.3.metrics.md) · [示例](../../2-examples/11-observability/11.2-logging-metrics/11.2.3.metrics-demo.md) · [独立练习](../../3-exercises/11-observability/11.2-logging-metrics/11.2.3.metrics.md)

<a id="p-11-2-4"></a>

## 11.2.4 Session Replay：先定义不采集什么，再验证SDK边界

OTel真实SDK在telemetry-lab，主项目只有最小W3C关联与固定代码；Replay未加载，RUM/SLO用合成演算。

为主Nuxt写一份“本阶段不启用Replay”的决策记录，并定义未来接入前的合成诱饵验收，不把现有耗时开关扩成录屏同意。

验收：

- [ ] 决策包含排除页/字段/第三方与保留边界，当前状态准确为未接入、无真实录制。
- [ ] 通过本地门控正反例，同时明确Replay SDK初始化/关闭/脱敏/删除均待授权供应商环境验证。

[理论](../../1-notes/11-observability/11.2-logging-metrics/11.2.4.session-replay.md) · [示例](../../2-examples/11-observability/11.2-logging-metrics/11.2.4.session-replay-demo.md) · [独立练习](../../3-exercises/11-observability/11.2-logging-metrics/11.2.4.session-replay.md)

<a id="p-11-2-5"></a>

## 11.2.5 RUM与SLO告警：正确样本、分母、窗口和错误预算

OTel真实SDK在telemetry-lab，主项目只有最小W3C关联与固定代码；Replay未加载，RUM/SLO用合成演算。

把主项目固定教学错误码和发布版本映射为一份告警/Runbook草案，用lab输入验证双窗及无数据状态，不将本地面板叫生产RUM。

验收：

- [ ] 有样本量、release/环境、用户影响、阈值依据、负责人和恢复动作；数据缺失另有状态。
- [ ] 保留合成演算证据及真实线上采集/阈值校准待办，未发真实通知、未承诺线上SLO。

[理论](../../1-notes/11-observability/11.2-logging-metrics/11.2.5.real-user-monitoring-rum.md) · [示例](../../2-examples/11-observability/11.2-logging-metrics/11.2.5.real-user-monitoring-rum-demo.md) · [独立练习](../../3-exercises/11-observability/11.2-logging-metrics/11.2.5.real-user-monitoring-rum.md)

<a id="p-11-3-1"></a>

## 11.3.1 Feature Flag与Kill Switch：配置开关、失效默认值与服务端边界

主项目实际v-if可选面板/稳定分组，kill需配置后重启；A/B/产物manifest回退在release-lab，云预览/生产恢复未执行。

在综合项目副本为新可选模块写开关决策表，核对SSR与payload接管结果；远程平台连接作为新增扩展，先列缓存/陈旧/降级契约，不直接把本lab当生产SDK。

验收：

- [ ] kill=true即使白名单且100%也关闭；恢复kill后按规则返回。
- [ ] 配置缺失/非法保持安全默认，记录原因但不记录subject原值或平台密钥。

[理论](../../1-notes/11-observability/11.3-release-management/11.3.1.feature-flag.md) · [示例](../../2-examples/11-observability/11.3-release-management/11.3.1.feature-flag-demo.md) · [独立练习](../../3-exercises/11-observability/11.3-release-management/11.3.1.feature-flag.md)

<a id="p-11-3-2"></a>

## 11.3.2 Canary灰度：稳定群组、分版本指标与停止条件

主项目实际v-if可选面板/稳定分组，kill需配置后重启；A/B/产物manifest回退在release-lab，云预览/生产恢复未执行。

在主Nuxt副本记录服务端flag结果和页面接管状态，检查刷新/并发fixture隔离；补一份按版本分组的放量决策记录，不把本地合成结果叫生产canary。

验收：

- [ ] group不变时增大比例不移除旧成员；改变group明确视为重新分配。
- [ ] 监控比较按release拆分，零/少样本显示不足，不当作绿色放行。

[理论](../../1-notes/11-observability/11.3-release-management/11.3.2.canary.md) · [示例](../../2-examples/11-observability/11.3-release-management/11.3.2.canary-demo.md) · [独立练习](../../3-exercises/11-observability/11.3-release-management/11.3.2.canary.md)

<a id="p-11-3-3"></a>

## 11.3.3 A/B实验：分配、可见曝光、转化与污染控制

主项目实际v-if可选面板/稳定分组，kill需配置后重启；A/B/产物manifest回退在release-lab，云预览/生产恢复未执行。

以独立lab为现有实现，给综合项目副本新增一项曝光/转化契约和本地实验；先声明统计单位与隐私选择，再实现，不声称主项目已经有完整实验平台。

验收：

- [ ] 只读分配不增加曝光；满足新定义才发送，重复请求不增加unique计数。
- [ ] 无匹配曝光、错误variant和额外PII字段拒绝；不依据小fixture报告统计显著性。

[理论](../../1-notes/11-observability/11.3-release-management/11.3.3.a-b.md) · [示例](../../2-examples/11-observability/11.3-release-management/11.3.3.a-b-demo.md) · [独立练习](../../3-exercises/11-observability/11.3-release-management/11.3.3.a-b.md)

<a id="p-11-3-4"></a>

## 11.3.4 PR预览环境：环境隔离、秘密边界与销毁

主项目实际v-if可选面板/稳定分组，kill需配置后重启；A/B/产物manifest回退在release-lab，云预览/生产恢复未执行。

给综合项目增加预览环境接入清单，区分已在本地构建的产物与尚未创建的远程资源；先完成只读权限/合成数据设计，再到真实宿主项目授权配置。

验收：

- [ ] 预览与生产身份/秘密/数据库隔离；未审核PR代码无法获取部署生产权限。
- [ ] 能追溯commit及运行模式，列出鉴权、关闭清理、失败恢复和真实待验证项。

[理论](../../1-notes/11-observability/11.3-release-management/11.3.4.preview-deployment.md) · [示例](../../2-examples/11-observability/11.3-release-management/11.3.4.preview-deployment-demo.md) · [独立练习](../../3-exercises/11-observability/11.3-release-management/11.3.4.preview-deployment.md)

<a id="p-11-3-5"></a>

## 11.3.5 回滚：不可变产物、旧资源保留与数据库兼容

主项目实际v-if可选面板/稳定分组，kill需配置后重启；A/B/产物manifest回退在release-lab，云预览/生产恢复未执行。

为综合项目产物制定版本/配置/健康/业务检查和回退表；运行本lab文件演练，再标明真实SSR切换与数据库协作仍是宿主环境待验证项。

验收：

- [ ] 回退后manifest引用的旧hash真实存在，仍打开的新版本所需资源也保留。
- [ ] 明确应用/配置/数据库三层恢复条件；有破坏性迁移时不能宣布无条件回滚。

[理论](../../1-notes/11-observability/11.3-release-management/11.3.5.item-11-3-5.md) · [示例](../../2-examples/11-observability/11.3-release-management/11.3.5.item-11-3-5-demo.md) · [独立练习](../../3-exercises/11-observability/11.3-release-management/11.3.5.item-11-3-5.md)

<a id="p-11-3-6"></a>

## 11.3.6 事件响应：先恢复、再定位，形成可执行Runbook与复盘

主项目实际v-if可选面板/稳定分组，kill需配置后重启；A/B/产物manifest回退在release-lab，云预览/生产恢复未执行。

在综合项目副本执行一次模块失败→局部兜底→开关止损的桌面推演，附自己的实际输出和复盘；真实On-call平台通知与生产回滚单列为未执行。

验收：

- [ ] 每次动作有触发、owner、预期、失败分支和复验；恢复以真实业务/版本指标而非告警静默判定。
- [ ] 复盘区分事实/推断/未确认，有不含敏感数据的证据以及可验收改进项。

[理论](../../1-notes/11-observability/11.3-release-management/11.3.6.incident-response.md) · [示例](../../2-examples/11-observability/11.3-release-management/11.3.6.incident-response-demo.md) · [独立练习](../../3-exercises/11-observability/11.3-release-management/11.3.6.incident-response.md)

<a id="p-11-4-1"></a>

## 11.4.1 CDN缓存契约：公共资源、失效与地域路由协作

Nginx为本地真实运行；Docker/K8s/Actions为明确占位的审查模板，未执行远程或容器部署。

为工作台发布写一份CDN交接表，说明fixture个性化SSR为何不共享缓存，并以lab中凭据BYPASS与r2 MISS作为局部证据；真实Geo/Purge仍待平台验证。

验收：

- [ ] 凭据请求返回private内容且BYPASS，不能把已缓存公共响应当该请求的个性化结果。
- [ ] 区分本地revision MISS与真实CDN purge；列旧hash保留窗口和一次回读验证。

[理论](../../1-notes/11-observability/11.4-infra/11.4.1.cdn.md) · [示例](../../2-examples/11-observability/11.4-infra/11.4.1.cdn-demo.md) · [独立练习](../../3-exercises/11-observability/11.4-infra/11.4.1.cdn.md)

<a id="p-11-4-2"></a>

## 11.4.2 Nginx上游、限流、缓存与WAF边界

Nginx为本地真实运行；Docker/K8s/Actions为明确占位的审查模板，未执行远程或容器部署。

为工作台标出公共资源、个性化API、遥测收集器三类代理路径，列超时/重试/限额/缓存要求；以独立lab真实轮询与429记录补充交接证据。

验收：

- [ ] 保留nginx -t及HTTP证据，解释为什么仅return 200可能绕开预期代理阶段限流。
- [ ] 至少观察两个上游与429，能解释按IP限流对NAT共享用户的代价及替代key需求。

[理论](../../1-notes/11-observability/11.4-infra/11.4.2.nginx.md) · [示例](../../2-examples/11-observability/11.4-infra/11.4.2.nginx-demo.md) · [独立练习](../../3-exercises/11-observability/11.4-infra/11.4.2.nginx.md)

<a id="p-11-4-3"></a>

## 11.4.3 Nuxt SSR多阶段容器：产物、用户与健康检查

Nginx为本地真实运行；Docker/K8s/Actions为明确占位的审查模板，未执行远程或容器部署。

为工作台补一份容器交接清单：基础镜像digest、非root、只读/可写目录、Origin、健康检查与回退镜像；使用模板并逐项标注已审/待平台运行。

验收：

- [ ] 能逐行解释builder/runtime边界及为什么只复制.output；标明镜像digest、架构和运行配置仍需选择。
- [ ] 不给静态审查写“镜像运行通过”；若运行，保留image ID、健康状态与清理命令结果。

[理论](../../1-notes/11-observability/11.4-infra/11.4.3.docker.md) · [示例](../../2-examples/11-observability/11.4-infra/11.4.3.docker-demo.md) · [独立练习](../../3-exercises/11-observability/11.4-infra/11.4.3.docker.md)

<a id="p-11-4-4"></a>

## 11.4.4 Kubernetes选修：Deployment、探针、HPA与Ingress

Nginx为本地真实运行；Docker/K8s/Actions为明确占位的审查模板，未执行远程或容器部署。

给工作台写“何时不需要K8s”的取舍及采用时的最小变更清单，尤其多实例内存数据、探针、Ingress/TLS与回退责任。

验收：

- [ ] 正确说明三种探针失败的不同后果，以及readiness失败不等于容器一定重启。
- [ ] 列出HPA指标/request、Service selector和IngressClass前提；无集群时明确全部运行证据缺失。

[理论](../../1-notes/11-observability/11.4-infra/11.4.4.kubernetes.md) · [示例](../../2-examples/11-observability/11.4-infra/11.4.4.kubernetes-demo.md) · [独立练习](../../3-exercises/11-observability/11.4-infra/11.4.4.kubernetes.md)

<a id="p-11-4-5"></a>

## 11.4.5 GitHub Actions矩阵、缓存与受保护部署

Nginx为本地真实运行；Docker/K8s/Actions为明确占位的审查模板，未执行远程或容器部署。

为工作台写质量→不可变产物→受保护发布→健康与回退的流水线说明，复用本地check结果，并把远程矩阵/审批/OIDC列待平台验收。

验收：

- [ ] 逐项区分矩阵质量/依赖缓存/发布产物/环境审批，并指出该deploy骨架当前不会部署。
- [ ] 明确SHA与平台设置/云授信还缺什么；不向workflow注入真实secret进行教学。

[理论](../../1-notes/11-observability/11.4-infra/11.4.5.github-actions.md) · [示例](../../2-examples/11-observability/11.4-infra/11.4.5.github-actions-demo.md) · [独立练习](../../3-exercises/11-observability/11.4-infra/11.4.5.github-actions.md)
