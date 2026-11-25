# 阶段10.4/10.5供应链与隐私十点审查

2026-11-25，分组开始10:01:47 UTC。按AUTHORING1逐点核对10份理论、10操作卡、10练习与两组integration-cases；不替代主项目/全阶段验收，不新增编号。

## 逐点事实

10.4.1：锁文件/完整性/可信维护者/脚本权限区别；固定Vite8.3.8、Playwright1.65.1和pnpm11.4，真实冻结离线安装通过，无真实registry凭据。
10.4.2：Dependabot模板目录与npm生态用于pnpm，真实YAML语法通过；没有远端机器人或紧急force升级，公告路径/可触达性/兼容验证/回退为具体变体。
10.4.3：真实pnpm audit --json成功，50 total lock-tree依赖、devDependencies50、optional34（工具分类非简单相加）、当前已知公告各级0；仅此lab，不含主Nuxt/其他实验/永久安全。没有生成SBOM或使用商业SCA，库存/漏洞/实际风险分开。
10.4.4：build.mjs真实给Vite进程注入私有合成canary与VITE_PUBLIC_LABEL；客户端有PUBLIC_LABEL、JS/map均无已知私有标记，服务器独立读取且只回configured布尔。不是未知秘密完整证明，无真实Token。
10.4.5：Vite hidden map真实生成、JS无sourceMappingURL，map含源码注释且HTTP200可下载；配置不等于访问控制，发布白名单/受控上传为明确后续扩展。
10.5.1：数据目的/字段/接收方/保留与删除先行；EC官方多种合法基础，不宣称GDPR处处必须consent。lab只有合成数据，内存最多50条、关闭清空；生产备份/代理/供应商/权利请求另验。
10.5.2：默认/拒绝无可选chunk/event，允许才加载和POST204；撤回停止新处理、清自有localStorage，刷新未选；按钮明确只清本地，不假称删除已下载JS/第三方历史记录。epoch源码防迟到初始化，慢加载撤回为独立练习尚未执行，不把常规点击测试冒充该故障。
10.5.3：safeLog实际允许route模板/status/kind，未知敏感路径变other；query/header/email不进入记录，额外PII字段400、1600字节body413实测，读取有界保留/排空后响应。不是全链PII regex工具，没有真实Replay SDK。
10.5.4：真实COOP same-origin+COEP require-corp，Chrome loopback crossOriginIsolated=true；跨源CORP cross-origin图naturalWidth20、无CORP图naturalWidth0。未测OAuth/支付弹窗/多浏览器或主Nuxt隔离策略，CSP/COOP/COEP/CORP/CORS职责分清。
10.5.5：AICPA/PCI SSC官方原文观察，技术证据清单不等于SOC2/PCI鉴证结论，未使用真实卡号/商户/审计。当前页面未来征求意见不冒充已生效标准。

## 递进与R01–R09

先依赖信任→升级→库存/公告→公开配置/源码，再目的/选择/采集/隔离/组织标准。每点保留机制/最小上下文/移动对照、独立变体两标准、具体故障定位及参考；多点共享lab但任务不同。现有/扩展与正式合规结论分开，不需要真实支付/账号才能完成主要观察。

R01十编号完整；R02上述前置与顺序；R03先MWG security/privacy正文再npm/pnpm/Vite、EC、MDN/GitHub/PCI/AICPA；R04真实构建/3Node/两浏览器与官方观察明确；R05不同变体与可复现反例；R06主Nuxt不是CMP/SBOM/支付平台，独立lab与任务分清；R07变量/路径/日志/状态/标题一致；R08响应监听先注册再点击修正测试竞态，代码标记/资源路径/字节413及记录上限复验；R09日期、audit范围、未测与学习掌握单列。全阶段正式契约及索引由主代理集成。

## 真实运行与清理

3项Node（日志/事件schema/真实client与map产物）、390/1440两Chrome组最终通过。最初waitForResponse放在响应之后导致5秒超时，改为先注册Promise后点击，未加固定sleep；控制台CORP阻挡属预期，不把它当普通跨源资源成功。最终build/private-env、日志上限/明确本地撤回文案、额外413与相对资源修正均复验最新产物。现有Prettier格式化可读代码，不以格式变化声称功能收益。

真实audit及冻结安装成功；Dependabot YAML用Ruby Psych解析，不是GitHub执行。所有请求运行期仅127.0.0.1:4524/4526，无外部采集，Chrome与服务finally关闭，内存清空。构建/依赖/artifacts忽略不提交。HTML当时快照及正式全库门禁以主代理集成为准。

无生产身份/真实PII、第三方CMP/Replay/错误平台、SBOM生成/商业SCA、远端升级、SOC/PCI审计、法规个案判断、公网TLS/多浏览器/真机/读屏或真实学习者试学。

## 来源与访问问题

实际读MWG security/privacy正文；EC legal-grounds与个人权利/Cookies Policy；npm audit/SBOM文档、pnpm settings（当前站点含v12条目，本例按11.4配置/CLI验证）、Vite build/env、MDN COEP/CORP、GitHub Dependabot、AICPA SOC和PCI SSC标准入口。初始EC旧链接与Chrome isolation旧链接不可达，改用实际可读EC/MDN正文；Renovate merge-confidence页不可达，未写该产品独有能力已核实，采用GitHub官方更新配置和通用可审计流程。失败页不算阅读成功。
