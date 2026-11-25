# 阶段10逐知识点综合任务

先读[安全笔记说明](./README.md)和威胁模型，核对已有能力，再做隔离副本变体。29项分别对应主Nuxt、独立漏洞/认证/隐私lab或明确官方观察，不把新增任务当已实现。只用合成数据，保留真实状态、拒绝原因与修复证据。

<a id="p-10-1-1"></a>

## 10.1.1 安全Checklist：按威胁、身份和发布面检查

为“新增上传附件”需求扩展清单，列对象所有权、大小/类型、存储/访问、日志和撤销；不要直接开启文件写入。

验收：

- [ ] 至少五条有明确触发、失败结果和验证方式，不只写“防XSS”。
- [ ] 标明当前已实现/新增/不适用，未测生产TLS、权限基础设施或审计不能写通过。

[理论](../../1-notes/10-security/10.1-security-baseline/10.1.1.checklist.md) · [示例](../../2-examples/10-security/10.1-security-baseline/10.1.1.checklist-demo.md) · [独立练习](../../3-exercises/10-security/10.1-security-baseline/10.1.1.checklist.md)

<a id="p-10-1-2"></a>

## 10.1.2 OWASP Top10:2025：风险分类与项目控制映射

给一个虚构电商前端画Top10→前端/后端/平台责任映射，优先选三个最相关风险制定可验证任务。

验收：

- [ ] 明确版本和风险/控制/证据/残余风险，不把类别名当可执行测试。
- [ ] 说明客户端隐藏按钮不构成授权，依赖audit零公告也不保证未知供应链安全。

[理论](../../1-notes/10-security/10.1-security-baseline/10.1.2.owasp-top.md) · [示例](../../2-examples/10-security/10.1-security-baseline/10.1.2.owasp-top-demo.md) · [独立练习](../../3-exercises/10-security/10.1-security-baseline/10.1.2.owasp-top.md)

<a id="p-10-1-3"></a>

## 10.1.3 STRIDE与数据流：从资产和信任边界找攻击路径

增加一个跨源嵌入统计服务的假设，画新增流向、数据字段与权限边界，列至少两个滥用途径和可撤回策略。

验收：

- [ ] 图标注真实运行单元/协议/可信级别，未实现的外部服务显式标设想。
- [ ] 至少一条威胁贯穿输入→处理→输出→验证；不把ID随机化当授权、不把origin当真实用户身份。

[理论](../../1-notes/10-security/10.1-security-baseline/10.1.3.item-10-1-3.md) · [示例](../../2-examples/10-security/10.1-security-baseline/10.1.3.item-10-1-3-demo.md) · [独立练习](../../3-exercises/10-security/10.1-security-baseline/10.1.3.item-10-1-3.md)

<a id="p-10-1-4"></a>

## 10.1.4 安全Review：用真实反例关闭发现并留残余风险

在隔离副本移除notes读/删的owner条件，保留随机ID；用另一session已知ID复现，再恢复规则和回归。

验收：

- [ ] 至少一项明确失败证据和修复后通过，使用同一合成输入，不在真实用户数据上造漏洞。
- [ ] 记录未测范围/残余风险与负责人，不把“不适用”当工具执行成功；源码仅审阅与真实运行分开。

[理论](../../1-notes/10-security/10.1-security-baseline/10.1.4.security-review.md) · [示例](../../2-examples/10-security/10.1-security-baseline/10.1.4.security-review-demo.md) · [独立练习](../../3-exercises/10-security/10.1-security-baseline/10.1.4.security-review.md)

<a id="p-10-2-1"></a>

## 10.2.1 XSS、mXSS与DOM Clobbering：先确定输出上下文

本点以vulnerability-lab为实验入口，任务在其隔离副本完成。

在副本为编辑需求增加一个允许标签，分别写文本/HTML/URL策略；加入净化后再拼原始字符串的故障，再恢复最终输入只净化一次。

验收：

- [ ] 给定payload及再解析无执行属性/意外节点，富文本保留需求明确；不是只断言字符串不含script。
- [ ] 说明白名单与真实上下文，未知mXSS/不同浏览器不能由一个fixture证明全部防住。

[理论](../../1-notes/10-security/10.2-vulnerabilities/10.2.1.xss.md) · [示例](../../2-examples/10-security/10.2-vulnerabilities/10.2.1.xss-demo.md) · [独立练习](../../3-exercises/10-security/10.2-vulnerabilities/10.2.1.xss.md)

<a id="p-10-2-2"></a>

## 10.2.2 Nonce CSP、strict-dynamic与Report-Only：不盲授信

本点以vulnerability-lab为实验入口，任务在其隔离副本完成。另审主Nuxt模块nonce后处理残余：当前只用安全文本，富HTML需另设计可信标签授权，不能宣称该模块满足模板级nonce要求。

将固定nonce作为错误副本，对比每响应随机值；再只启Report-Only，记录同一受控inline是否被阻止。

验收：

- [ ] 相同请求连续响应nonce不同，只有明确可信脚本拿到nonce；不在后处理里给全部标签补。
- [ ] 报告模式/强制模式行为分开，报告字段最小化/限额；生产report-to/Reporting-Endpoints未部署不记成功。

[理论](../../1-notes/10-security/10.2-vulnerabilities/10.2.2.csp.md) · [示例](../../2-examples/10-security/10.2-vulnerabilities/10.2.2.csp-demo.md) · [独立练习](../../3-exercises/10-security/10.2-vulnerabilities/10.2.2.csp.md)

<a id="p-10-2-3"></a>

## 10.2.3 Signed Double-Submit、Origin与SameSite：绑定当前会话

本点以vulnerability-lab为实验入口，任务在其隔离副本完成。

先在副本使用仅比较cookie/header的错误版本，用新会话重放旧token，再恢复会话绑定HMAC+Origin；只用合成匿名会话。

验收：

- [ ] 不同sid的token重放失败，缺/错header、cookie和Origin不能改变状态。
- [ ] GET不执行业务变更，方法/JSON/schema/体积明确；HttpOnly和SameSite不被说成完整CSRF防线。

[理论](../../1-notes/10-security/10.2-vulnerabilities/10.2.3.csrf.md) · [示例](../../2-examples/10-security/10.2-vulnerabilities/10.2.3.csrf-demo.md) · [独立练习](../../3-exercises/10-security/10.2-vulnerabilities/10.2.3.csrf.md)

<a id="p-10-2-4"></a>

## 10.2.4 点击劫持：明确被嵌入方向与祖先限制

本点以vulnerability-lab为实验入口，任务在其隔离副本完成。

产品要允许一个伙伴嵌入，写精确祖先策略并评估XFO冲突；在隔离副本比较允许/拒绝父源。

验收：

- [ ] 真实目标iframe拒绝且允许control正常；记录浏览器控制台/Frame状态，不只看HTTP200。
- [ ] 说明frame-ancestors与frame-src方向和meta限制，合法嵌入不会被矛盾头误伤。

[理论](../../1-notes/10-security/10.2-vulnerabilities/10.2.4.clickjacking.md) · [示例](../../2-examples/10-security/10.2-vulnerabilities/10.2.4.clickjacking-demo.md) · [独立练习](../../3-exercises/10-security/10.2-vulnerabilities/10.2.4.clickjacking.md)

<a id="p-10-2-5"></a>

## 10.2.5 Open Redirect：从固定目标到明确allowlist

本点以vulnerability-lab为实验入口，任务在其隔离副本完成。

需求允许两个带固定query的内部目的地，用不可控target ID映射完整路径；新增旧路径变更和回退，不开放任意URL。

验收：

- [ ] 绝对/protocol-relative/编码/额外query被拒绝，已允许目标语义明确。
- [ ] 重定向状态/Location可观察，返回目标仍检查身份/授权，不能用跳转当访问控制。

[理论](../../1-notes/10-security/10.2-vulnerabilities/10.2.5.open-redirect.md) · [示例](../../2-examples/10-security/10.2-vulnerabilities/10.2.5.open-redirect-demo.md) · [独立练习](../../3-exercises/10-security/10.2-vulnerabilities/10.2.5.open-redirect.md)

<a id="p-10-2-6"></a>

## 10.2.6 原型污染：拒绝危险结构并消除隐式继承

本点以vulnerability-lab为实验入口，任务在其隔离副本完成。

在隔离副本增加嵌套偏好，先设计每层白名单和深度/键数限制，再写constructor.prototype/__proto__与未知键负例。

验收：

- [ ] 拒绝危险/未知结构并保持全局原型未改，返回值不偷偷继承权限字段。
- [ ] 说明parse/merge/lookup的不同阶段，嵌套层也验证；不靠hasOwnProperty可能被覆盖的方法。

[理论](../../1-notes/10-security/10.2-vulnerabilities/10.2.6.prototype-pollution.md) · [示例](../../2-examples/10-security/10.2-vulnerabilities/10.2.6.prototype-pollution-demo.md) · [独立练习](../../3-exercises/10-security/10.2-vulnerabilities/10.2.6.prototype-pollution.md)

<a id="p-10-2-7"></a>

## 10.2.7 SRI与跨源CORS：验证固定字节而非信任域名

本点以vulnerability-lab为实验入口，任务在其隔离副本完成。

固定一个本地版本资源并生成sha384；改一个字节且保持旧hash复现拒绝，再按审核更新资源/hash而非删除integrity。

验收：

- [ ] 好字节执行、坏字节拒绝、缺CORS失败，三者环境与预期分开。
- [ ] 哈希来源可信且版本/更新流程可追溯，CSP/HTTPS不能被误当相同功能。

[理论](../../1-notes/10-security/10.2-vulnerabilities/10.2.7.sri-subresource-integrity.md) · [示例](../../2-examples/10-security/10.2-vulnerabilities/10.2.7.sri-subresource-integrity-demo.md) · [独立练习](../../3-exercises/10-security/10.2-vulnerabilities/10.2.7.sri-subresource-integrity.md)

<a id="p-10-2-8"></a>

## 10.2.8 postMessage：origin、source、版本与schema共同校验

本点以vulnerability-lab为实验入口，任务在其隔离副本完成。

新增一个已声明message类型与可选字段，拒绝未知属性/超限值/错版本；在卸载时移除监听，说明消息重放/顺序如何处理。

验收：

- [ ] 错origin/source/version/schema拒绝，合法消息仍可工作；sender不使用*发送敏感内容。
- [ ] 保持数据验证和权限检查，不将跨窗口通信/Shadow DOM称为认证或安全沙箱。

[理论](../../1-notes/10-security/10.2-vulnerabilities/10.2.8.postmessage.md) · [示例](../../2-examples/10-security/10.2-vulnerabilities/10.2.8.postmessage-demo.md) · [独立练习](../../3-exercises/10-security/10.2-vulnerabilities/10.2.8.postmessage.md)

<a id="p-10-3-1"></a>

## 10.3.1 OAuth/OIDC授权码与PKCE：分清授权、身份和客户端边界

本点以auth-lab或该点明确的官方观察为入口；主Nuxt没有OAuth/JWT/Passkey集成。

在隔离副本将注册redirect_uri改成另一地址，并把回调state与兑换verifier分别改错。画出客户端回调与授权服务器兑换各自校验位置，不把一个complete函数当真实系统只有一个角色。

验收：

- [ ] 四类错误均拒绝且不产生可信身份，正确code仅消费一次；保留原始断言/结果。
- [ ] 说明OAuth与OIDC、access/ID Token区别，以及真实provider尚缺的nonce/签名/元数据与凭据保护验证。

[理论](../../1-notes/10-security/10.3-auth-advanced/10.3.1.oauth-oidc.md) · [示例](../../2-examples/10-security/10.3-auth-advanced/10.3.1.oauth-oidc-demo.md) · [独立练习](../../3-exercises/10-security/10.3-auth-advanced/10.3.1.oauth-oidc.md)

<a id="p-10-3-2"></a>

## 10.3.2 Refresh轮换与复用检测：原子消费、族撤销和并发策略

本点以auth-lab或该点明确的官方观察为入口；主Nuxt没有OAuth/JWT/Passkey集成。

改变为两个独立调用方同时刷新，同一family分别观察第一结果返回与后续可用性；再设计一个有明确operation id和期限的幂等恢复协议，说明牺牲了什么检测信号。

验收：

- [ ] 旧token不能再次产生有效后代，复用后已有后代受族撤销限制；过期不能刷新。
- [ ] 记录并发、响应丢失/重试和新登录三条路径，明确store事务与客户端single-flight各自责任。

[理论](../../1-notes/10-security/10.3-auth-advanced/10.3.2.refresh-token.md) · [示例](../../2-examples/10-security/10.3-auth-advanced/10.3.2.refresh-token-demo.md) · [独立练习](../../3-exercises/10-security/10.3-auth-advanced/10.3.2.refresh-token.md)

<a id="p-10-3-3"></a>

## 10.3.3 令牌存储与BFF Cookie：读取、请求和生命周期是不同风险

本点以auth-lab或该点明确的官方观察为入口；主Nuxt没有OAuth/JWT/Passkey集成。

在副本给页面增加一个本地无害脚本，比较HttpOnly Cookie不可读但同源fetch仍可调用API；只使用公开fixture，不复制真实凭据。再列退出后的服务端撤销、UI清理、跨标签通知与缓存失效。

验收：

- [ ] 不会向页面或日志输出会话ID，document.cookie不可读与请求仍带Cookie分别有证据。
- [ ] 旧会话撤销后请求失败，公开/私有缓存策略分开；说明本地Secure=false与生产HTTPS差异。

[理论](../../1-notes/10-security/10.3-auth-advanced/10.3.3.token.md) · [示例](../../2-examples/10-security/10.3-auth-advanced/10.3.3.token-demo.md) · [独立练习](../../3-exercises/10-security/10.3-auth-advanced/10.3.3.token.md)

<a id="p-10-3-4"></a>

## 10.3.4 WebAuthn与Passkey：浏览器仪式和服务端验签职责

本点以auth-lab或该点明确的官方观察为入口；主Nuxt没有OAuth/JWT/Passkey集成。

为同一用户两个tab并行认证设计各自challenge事务，列出错challenge、重放、错误origin、RP ID和缺少所要求UV的失败表。可在独立测试项目选虚拟认证器，不能标成本轮已经跑过。

验收：

- [ ] 注册与认证消息、服务端存储/验证位置准确；challenge不是固定字符串或无限期可重用。
- [ ] 明确未做真实/虚拟认证器执行，账户恢复与同步计数器策略不被一个成功弹窗替代。

[理论](../../1-notes/10-security/10.3-auth-advanced/10.3.4.webauthn-passkey.md) · [示例](../../2-examples/10-security/10.3-auth-advanced/10.3.4.webauthn-passkey-demo.md) · [独立练习](../../3-exercises/10-security/10.3-auth-advanced/10.3.4.webauthn-passkey.md)

<a id="p-10-3-5"></a>

## 10.3.5 RBAC、ABAC与对象授权：服务端每请求默认拒绝

本点以auth-lab或该点明确的官方观察为入口；主Nuxt没有OAuth/JWT/Passkey集成。

在隔离副本新增“审核员可读同tenant对象但不可删除”政策，先写owner/tenant/role/action矩阵再实现；不要通过客户端传role升级。

验收：

- [ ] 直接HTTP调用他人对象、另一tenant和未授权动作仍拒绝，不依赖UI是否显示。
- [ ] 新增允许规则最小化且坏/缺主体默认拒绝；403响应不泄漏对象正文或内部堆栈。

[理论](../../1-notes/10-security/10.3-auth-advanced/10.3.5.rbac-abac.md) · [示例](../../2-examples/10-security/10.3-auth-advanced/10.3.5.rbac-abac-demo.md) · [独立练习](../../3-exercises/10-security/10.3-auth-advanced/10.3.5.rbac-abac.md)

<a id="p-10-3-6"></a>

## 10.3.6 JWT验证：签名、算法、声明、用途和撤销上下文

本点以auth-lab或该点明确的官方观察为入口；主Nuxt没有OAuth/JWT/Passkey集成。

分别改audience、过期时间、签名和roles类型，写清每个失败来自库的协议验证还是应用政策；给key轮换设计双key接受窗口与unknown-kid失败行为。

验收：

- [ ] 至少算法/签名/issuer/audience/exp负例真实拒绝，不能只靠decode后的字段做assert。
- [ ] 角色/tenant/用途与撤销边界明确；未授权对象仍拒绝，未测JWKS/KMS不声称已经集成。

[理论](../../1-notes/10-security/10.3-auth-advanced/10.3.6.jwt.md) · [示例](../../2-examples/10-security/10.3-auth-advanced/10.3.6.jwt-demo.md) · [独立练习](../../3-exercises/10-security/10.3-auth-advanced/10.3.6.jwt.md)

<a id="p-10-3-7"></a>

## 10.3.7 Web Cookie与原生安全存储：迁移威胁模型，不照搬API

本点以auth-lab或该点明确的官方观察为入口；主Nuxt没有OAuth/JWT/Passkey集成。

把一份移动端“refresh保存在安全存储、全局登录单例、退出清本地”的方案迁移到Nuxt，逐项改写浏览器存储/SSR隔离/CSRF/后台撤销与多标签状态。

验收：

- [ ] 按读取、自动请求、每请求隔离、持久化和服务端授权列具体差异，不能只替换库名。
- [ ] 复用真实Web证据与明确未测原生范围；主Nuxt匿名教学会话不被写成真实用户身份系统。

[理论](../../1-notes/10-security/10.3-auth-advanced/10.3.7.web-httponly-cookie-session-rn.md) · [示例](../../2-examples/10-security/10.3-auth-advanced/10.3.7.web-httponly-cookie-session-rn-demo.md) · [独立练习](../../3-exercises/10-security/10.3-auth-advanced/10.3.7.web-httponly-cookie-session-rn.md)

<a id="p-10-4-1"></a>

## 10.4.1 npm供应链：锁定依赖、安装脚本与最小权限

本点以privacy-lab、模板或该点官方观察为入口；未部署的商业平台/标准审计不记实测。

副本改package版本而不改锁文件，运行frozen install观察失败；再按审核流程更新而不盲删lock。

验收：

- [ ] 清楚列出直接/传递变化与来源；冻结检查发现不一致而非静默升级。
- [ ] 安装脚本/registry/Token权限单独判断，不把integrity或私库当全部安全证明。

[理论](../../1-notes/10-security/10.4-supply-chain/10.4.1.npm.md) · [示例](../../2-examples/10-security/10.4-supply-chain/10.4.1.npm-demo.md) · [独立练习](../../3-exercises/10-security/10.4-supply-chain/10.4.1.npm.md)

<a id="p-10-4-2"></a>

## 10.4.2 自动升级与紧急补丁：以证据决定合并和回退

本点以privacy-lab、模板或该点官方观察为入口；未部署的商业平台/标准审计不记实测。

将一条dev工具公告与可触达运行依赖公告分开，写修复/临时缓解/升级回退决策，明确未运行的生产影响。

验收：

- [ ] 说明公告适用范围、依赖路径、可触达性与修复版本，不只按数字严重度。
- [ ] 最小测试和构建证据可复现；机器人/远端PR未运行时不记已验证。

[理论](../../1-notes/10-security/10.4-supply-chain/10.4.2.dependabot-renovate.md) · [示例](../../2-examples/10-security/10.4-supply-chain/10.4.2.dependabot-renovate-demo.md) · [独立练习](../../3-exercises/10-security/10.4-supply-chain/10.4.2.dependabot-renovate.md)

<a id="p-10-4-3"></a>

## 10.4.3 SBOM与漏洞审计：库存、公告和实际风险分开

本点以privacy-lab、模板或该点官方观察为入口；未部署的商业平台/标准审计不记实测。

从锁文件挑一个传递包，设计SBOM最小记录与可追踪关系；若实际使用npm sbom先确认支持的lock格式，不把pnpm lock当npm package-lock直接喂工具。

验收：

- [ ] 库存/漏洞/可利用风险三个结论分开，注明日期/工具/依赖范围。
- [ ] 失败退出/无报告明确未完成，不用空对象冒充0 advisories。

[理论](../../1-notes/10-security/10.4-supply-chain/10.4.3.sbom.md) · [示例](../../2-examples/10-security/10.4-supply-chain/10.4.3.sbom-demo.md) · [独立练习](../../3-exercises/10-security/10.4-supply-chain/10.4.3.sbom.md)

<a id="p-10-4-4"></a>

## 10.4.4 环境变量与公开产物：秘密只留服务端

本点以privacy-lab、模板或该点官方观察为入口；未部署的商业平台/标准审计不记实测。

副本把合成canary改VITE_前缀并在app引用，观察产物可读；恢复服务端边界，保留已知标记负例，禁止用真实Token实验。

验收：

- [ ] HTML/JS/map等实际公开产物逐项核对，公开标记可读，私有标记不出现。
- [ ] 说明扫描仅覆盖已知marker，不把“搜不到这个串”当没有任何秘密。

[理论](../../1-notes/10-security/10.4-supply-chain/10.4.4.secrets.md) · [示例](../../2-examples/10-security/10.4-supply-chain/10.4.4.secrets-demo.md) · [独立练习](../../3-exercises/10-security/10.4-supply-chain/10.4.4.secrets.md)

<a id="p-10-4-5"></a>

## 10.4.5 Source Map发布策略：隐藏注释不等于访问控制

本点以privacy-lab、模板或该点官方观察为入口；未部署的商业平台/标准审计不记实测。

副本从公开目录排除map或放受控上传流程；验证错误平台调试与公开HTTP状态，而非只看构建选项。

验收：

- [ ] 实际公开map能否访问/包含源与策略一致，不能仅比较注释存在。
- [ ] 若选择受限上传，权限/删除/版本关联说明清楚，未接平台不写已上传。

[理论](../../1-notes/10-security/10.4-supply-chain/10.4.5.source-map.md) · [示例](../../2-examples/10-security/10.4-supply-chain/10.4.5.source-map-demo.md) · [独立练习](../../3-exercises/10-security/10.4-supply-chain/10.4.5.source-map.md)

<a id="p-10-5-1"></a>

## 10.5.1 隐私工程：目的、最小化、保留与删除

本点以privacy-lab、模板或该点官方观察为入口；未部署的商业平台/标准审计不记实测。

为“课程学习统计”写目的/最小字段/接收方/保留/删除表，比较完全不收集与聚合统计，注明需要业务/法律确认处。

验收：

- [ ] 字段有明确目的，不为未来可能有用就收完整URL/账号/内容。
- [ ] 工程删除与备份/法定保留/用户请求流程分开，不能承诺所有数据立即无条件删除。

[理论](../../1-notes/10-security/10.5-privacy-compliance/10.5.1.gdpr.md) · [示例](../../2-examples/10-security/10.5-privacy-compliance/10.5.1.gdpr-demo.md) · [独立练习](../../3-exercises/10-security/10.5-privacy-compliance/10.5.1.gdpr.md)

<a id="p-10-5-2"></a>

## 10.5.2 Consent与CMP：请求必须受选择约束

本点以privacy-lab、模板或该点官方观察为入口；未部署的商业平台/标准审计不记实测。

在副本让optional import慢到可观察，先允许立即撤回，验证迟到模块不会启动；增加另一个目的时分别选择，不盲复制全选按钮。

验收：

- [ ] 默认/拒绝无可选请求，允许才有；撤回后停止新处理并清理自有可选存储。
- [ ] 状态、文案、键盘/窄屏可操作，不把下载缓存仍存在误报为无法撤回或已删除第三方全部数据。

[理论](../../1-notes/10-security/10.5-privacy-compliance/10.5.2.cookie-consent.md) · [示例](../../2-examples/10-security/10.5-privacy-compliance/10.5.2.cookie-consent-demo.md) · [独立练习](../../3-exercises/10-security/10.5-privacy-compliance/10.5.2.cookie-consent.md)

<a id="p-10-5-3"></a>

## 10.5.3 日志、Replay与错误上报：先不收，再谈脱敏

本点以privacy-lab、模板或该点官方观察为入口；未部署的商业平台/标准审计不记实测。

提供含邮箱路径、Authorization、password和任意错误message的合成输入，先列允许字段再输出；检查存储记录而非只看UI。

验收：

- [ ] 实际记录不含原始敏感marker，未知字段被拒绝/丢弃且行为可解释。
- [ ] 标明仍可能存在于代理/CDN、浏览器调试或第三方的层，不把某一函数当全链PII证明。

[理论](../../1-notes/10-security/10.5-privacy-compliance/10.5.3.pii.md) · [示例](../../2-examples/10-security/10.5-privacy-compliance/10.5.3.pii-demo.md) · [独立练习](../../3-exercises/10-security/10.5-privacy-compliance/10.5.3.pii.md)

<a id="p-10-5-4"></a>

## 10.5.4 CSP、COOP、COEP、CORP：按需要建立隔离

本点以privacy-lab、模板或该点官方观察为入口；未部署的商业平台/标准审计不记实测。

副本移除某一头并比较资源/窗口关系，写需要SharedArrayBuffer能力时为何可能需要隔离；不为了头越多越好破坏产品。

验收：

- [ ] 记录实际头、资源允许/阻挡和能力检测，不只看配置文件。
- [ ] 区分CORP资源方授权与CORS脚本可读性，说明popup/嵌入限制和回退。

[理论](../../1-notes/10-security/10.5-privacy-compliance/10.5.4.csp-coop-coep-corp.md) · [示例](../../2-examples/10-security/10.5-privacy-compliance/10.5.4.csp-coop-coep-corp-demo.md) · [独立练习](../../3-exercises/10-security/10.5-privacy-compliance/10.5.4.csp-coop-coep-corp.md)

<a id="p-10-5-5"></a>

## 10.5.5 SOC2与PCI：工程控制证据不是自动认证

本点以privacy-lab、模板或该点官方观察为入口；未部署的商业平台/标准审计不记实测。

将“第三方托管支付”与“自有页面处理敏感输入”两方案列数据流和责任边界，标记需法务/安全/合格评估确认的问题。

验收：

- [ ] 清楚区分技术控制/证据与审计或合规结论，来源和适用版本可追溯。
- [ ] 不收真实PAN/CVV或用真实商户测试；脚本授权/完整性/变更检测等事项按适用要求评估。

[理论](../../1-notes/10-security/10.5-privacy-compliance/10.5.5.soc2-pci.md) · [示例](../../2-examples/10-security/10.5-privacy-compliance/10.5.5.soc2-pci-demo.md) · [独立练习](../../3-exercises/10-security/10.5-privacy-compliance/10.5.5.soc2-pci.md)
