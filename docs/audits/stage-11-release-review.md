# 阶段11.3发布管理逐点审查

2026-11-25；6点理论、例卡、练习、综合任务数据逐点阅读，对照实际core/server/app/rollback/tests/verify源码。不把独立lab的能力写成主Nuxt已集成，也不把观察模板写成远程运行。

## 逐点结论

- 11.3.1：开关、部署和授权分开；kill优先、服务端规则、配置无效/未载入回保守值。实际lab没有远程刷新/TTL，文档不声称测过断网SDK缓存。平台仅官方能力说明，无SDK平台接入。
- 11.3.2：确定性SHA256教学桶0–9999，与Unleash MurmurHash算法明确不兼容；0/100/单调性、区域/白名单/kill逐一验证。3个fixture不用于声称真实群体比例或生产canary代表性；分release指标/小样本限制与停止条件具体。
- 11.3.3：分配≠曝光≠业务转化；官方SDK impression语义不等于人可见。真实浏览器显示卡片+IntersectionObserver 50%近似可见，再写本地事件；错误variant/前置曝光/重复请求由服务端检查。明确可伪造、未测遮挡/注意力、无统计显著性或真实订单归因。合成主体公开且固定，不能当身份安全边界。
- 11.3.4：官方契约观察，代码片段显式不完整不可直接执行；真实PR环境、URL、环境secret/审批/清理未创建。涵盖不可信fork与pull_request_target危险跨越、生产数据隔离、noindex非鉴权、提交追溯和关闭清理，不诱导交付生产密钥。
- 11.3.5：真实本地temp目录、内容hash、manifest同目录rename、stable→candidate→stable、两个版本资源保留/旧脚本可读、finally清理。与真实SSR切换/CDN purge/数据库回退分开；扩展—兼容—收缩不是自动down迁移，不保证跨卷/分布式原子切换。
- 11.3.6：Runbook含触发/owner/止损/失败分支/业务复验；Postmortem含事实/推断/未知和可验收行动项。相对T0–T5只是桌面角色练习，未冒充真实事故或通知发送。脚本只实测kill/文件回退，不冒充生产恢复。

## R01–R09

6编号保持地图路径；四部分建议映射齐。推荐顺序开关→灰度→实验，预览/回退/响应形成闭环；每点独立变体、至少2验收和具体可复现故障/参考。理论机制/最小代码/场景误区/移动端差异/一手来源完整。综合任务按lab/新增副本/官方观察划界，主集成由主作者后续核对。源码和文档一致，未用Math.random稳定群组/分配当曝光等失真捷径。真实运行与未测范围已留JSON，未修改学习者勾选。

## 运行、发现与修正

Node26.0.0/pnpm11.4.0，Playwright1.65.1；冻结离线安装通过；4项Node、HTTP负例、390/1440后台Chrome、单独rollback通过。格式化后再次完成同组验证。浏览器无pageerror/横溢出/外部请求；服务/Chrome于finally关闭，4534无监听，临时产物finally删除。产物和依赖已忽略，不提交私钥/凭据。

初次离线安装缺少本地store tarball、普通沙箱DNS失败，停止重试后按既有授权在权限环境下载固定依赖，冻结安装成功；普通沙箱监听EPERM，改按授权执行loopback+后台Chrome。没有绕过权限拒绝或改浏览器安全设置。一次命令使用错误workdir导致材料写入路径不存在，已改回仓库根；未生成多余嵌套项目。

HTTP仅固定Origin/allowlist字段/有界读取，非生产身份/限流/完整慢流防护；视口交叉并不证明用户注意力。以上没有未关闭的本组必达缺陷。

## 参考核对

先匹配MWG security/privacy正文，采用遥测最小化/不收PII与密钥、客户端配置非授权边界；再读取Unleash stickiness/activation/impression、SRE canary/incident/postmortem、GitHub environments与Nuxt deployment官方资料。旧GitHub preview和特定LaunchDarkly链接不可达，改用可读官方来源，不记为读取成功。实际采用链接各正文列出，平台套餐/版本行为需宿主接入时再核实。

## 主Nuxt额外独立只读复核（初查）

按主作者要求，额外读取learning/4-practice/11-observability/nuxt.config.ts、server/utils/{flags,trace,body,observability}.ts、中间件/plugin、全部API、app页面/组件/error.vue、unit与e2e spec。未修改主代码、未重复执行主测试；以下是源码审查，不冒充运行结果。

已确认：subjectFrom只接受fixture-a/b其余guest；flag按固定group+subject的SHA256稳定桶、kill最高优先、0/100与非法百分比默认检查。规则只在服务端，SSR通过useRequestFetch获取DTO/客户端payload接管；未出现全局currentUser。运行配置无public密钥；fixture Cookie只是可篡改合成分组不是身份。中间件把trace上下文存event.context，每请求新span，原始query/body/cookie不进入固定routeLabel日志。遥测仅3个code、每批1–8项、禁止额外字段、有界体积与50条/5分钟惰性保留。diagnostics是未鉴权的进程级教学统计，真实部署不能照搬。

已向主作者报告需处理/界定的两点：

1. 初查index.vue仅展示flag.enabled，FaultyPanel与故障按钮未受开关控制。若声称“kill实际止损新面板”，证据不成立；应实际gate另一个可选功能并验证，或明确仅展示求值，实际止损是新增扩展。独立错误边界教学路径可以保留，但不能混称受kill保护。
2. SSR首页内部useRequestFetch未显式带入外层中间件新生成的traceparent，无入站上下文时外层HTML与workspace可能分别生成traceId。现有API请求关联/并发隔离机制成立，但不称完整SSR父子链、OTel分布式trace或主动采样。需实现明确传播或在文档标范围。

主作者将整合以上结果；整阶段验收应核对最终处置，不把本段初查当上述问题已关闭。

## 主Nuxt额外复核：源码修正核对

收到主作者修正后再次只读核对index.vue、HTTP spec、Nitro observability plugin与H3上下文类型：

- #new-panel现在由v-if="workspace?.flag.enabled"实际控制非关键新增内容；原错误边界教学路径独立保留。HTTP spec核对SSR中该节点是否出现与服务端结果一致，并启动kill=true独立进程断言API关闭及SSR不出现节点。初查“只展示开关”问题在源码层已关闭；不扩大成实时远程kill或API授权功能。
- SSR现在从外层useRequestEvent().context.observation.traceparent显式传给内部workspace fetch；内部中间件沿用traceId并新建span。HTTP spec断言外层响应traceparent的ID出现在SSR payload中。初查传播缺口在源码层已关闭；本实现仍不创建OTel span/exporter、记录完整parent关系或继承采样位，不能称完整分布式追踪。
- 主作者发现并修正错误路径日志遗漏：Nitro error hook按有效statusCode/默认500记录，afterResponse记正常路径，ctx.recorded防重复；字段仍固定，不写原始错误/堆栈/查询/凭据。HTTP spec明确检查demo-failure的error/503记录。此项源码设计吻合；最终运行结果由主作者另行复验。

本次只读复核未运行主测试、不替代主作者正在执行的实际结果。最终整阶段验收仍应引用主运行记录确认新增断言通过；本组无新增源码阻断发现。
