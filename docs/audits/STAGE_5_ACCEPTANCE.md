# 阶段5：HTTP API、会话与授权编写验收

日期2026-11-25。依据[阶段编写与验收总则](../AUTHORING.md)版本1，范围为阶段5全部31点。结论：**在下述本地运行/观察范围内达到R01–R09标准**，不等于生产身份系统安全认证或学习者已掌握。

## 规划、顺序与四部分

开始前复核原29点，新增5.1.7安全重试/幂等、5.2.9 Nuxt SSR会话/私有缓存两项；其余细节补入已有编号，旧ID/路径/学习勾选保留。总图587点，不把教学粒度说成官方固定知识点数量。[规划依据与取舍](./STAGE_5_PLAN_REVIEW.md)单列。

| 章节 | 点数 | 核心交付 |
| --- | --- | --- |
| 5.1 请求 | 7 | Fetch/Nuxt、取消/超时/迟到、FormData/Blob、OpenAPI、mock、环境、安全重试 |
| 5.2 认证 | 9 | Cookie会话、JWT/Bearer、恢复/撤销、OAuth/SSO、owner/RBAC、存储与SSR |
| 5.3 跨源 | 5 | SOP/CORS、代理、JSONP历史、安全传输/响应头 |
| 5.4 数据 | 6 | unknown/DTO、稳定分页、上传契约、状态错误、GraphQL/grpc-web观察 |
| 5.5 实时 | 4 | WS、Socket.IO、SSE与移动连接生命周期差异 |

31份理论、31张真实代码/明确观察操作卡、31份独立练习、[31项综合任务](../../learning/4-practice/05-fullstack-auth/tasks.md)齐全。代码共享Nuxt私人笔记与独立HTTP/data、JWT、跨源/实时lab，不给每点重复造工程。前置为阶段4Vue/Nuxt，顺序为读取→数据契约→上传/幂等→Cookie会话/授权/SSR，再按协议需求选择其他认证/实时等。

## R01–R09

| 规则 | 本轮结论 |
| --- | --- |
| R01 范围完整 | 31唯一编号和四部分契约对应，综合任务稳定锚点及逐点审查完整，无空文件充数。 |
| R02 层层递进 | 先响应/状态/unknown，再会话与权限；Cookie主线不依赖先接OAuth或JWT；独立lab/本地fixture与后续生产部署分明。 |
| R03 内容准确 | 先查MWG Security/Forms再读Nuxt/MDN/OWASP/RFC；分清认证/授权、源/站点、CORS读/写、取消/回滚、JWT验签/解码、SSR转发/Set-Cookie回程。 |
| R04 示例有效 | 实际HTTP、密码学签验、Chrome跨源/实时与Node SSR，不把UI标签或假终端当机制；未接第三方平台/公网TLS明确观察类型。 |
| R05 练习具体 | 31点均有变体、至少两条标准、具体故障和参考；如错schema、慢旧结果、缺CSRF、同角色越权、预检拒绝、限额、重放冲突、连接未释放。 |
| R06 综合对应 | 对照已有Nuxt API/返回值：主上传200/saved:false与lab201/stored:false区分；已有PATCH/Blob下载不说尚未实现，删除/HTTP下载/进度/实时为独立实验或扩展。 |
| R07 前后一致 | Cookie/session/JWT/缓存与API状态一致，session查询匿名200 null与受保护401分清；统一Nuxt同key默认factory，教材与源码字段/限额/上下文核对。 |
| R08 问题关闭 | 请求读取器的socket异常、测试locator、会话代次/缓存发现已修正复验；最终13单元、6集成与零服务端意外异常，全库门禁通过。 |
| R09 状态清楚 | 索引和进度更新284/587（48.4%）、待编写303；学习勾选独立；本地HTTP/公开账号/内存store不冒称生产系统。 |

[交付契约](../stages/stage-5.json)逐项对应地图；逐点事实：[请求/数据13](./stage-5-requests-data-points.json)、[认证9](./stage-5-auth-points.json)、[跨源/实时9](./stage-5-cors-realtime-points.json)。分组正文：[请求/数据](./stage-5-requests-data-review.md)、[认证](./stage-5-auth-review.md)、[跨源/实时](./stage-5-cors-realtime-review.md)。主审核对共享Nuxt、关键正文及跨章节任务/协议后才整体验收。

## 真实验证与证据

Node26.0.0、pnpm11.4.0；主工程复用阶段4已验证的Nuxt4.7.0/Vue3.5.46/TS6.0.3固定基线，新工程冻结安装和类型/构建实际核验，不宣称全部是registry最新。专属依赖jose6.2.18、ws8.23.0、Socket.IO4.8.4由各组核registry并保留锁文件。见[版本记录](./stage-5-tool-versions.json)。

| 范围 | 结果 | 记录 |
| --- | --- | --- |
| HTTP/data lab | 9组真实HTTP/异步检查：状态/解析/schema、abort/timeout/迟到、分页、FormData/Blob、429/预算、POST限制、幂等冲突、baseURL/OpenAPI局部契约；390/1440两组Chrome上传进度与下载完成内容 | [请求运行](./stage-5-requests-data-runtime.json) |
| 认证lab | 16组jose RS256真实签验/claims/算法/过期负例、Bearer、owner与并发refresh/退出代次/实例隔离；密钥仅进程内生成 | [认证运行](./stage-5-auth-runtime.json) |
| 跨源/实时lab | 11组：错误Origin WS握手拒绝，以及两视口各5组CORS、JSONP、CSP、WS/SSE、Socket.IO；含预检/凭据、SSE重放去重、有限重连、stop/pagehide活动连接归零 | [网络运行](./stage-5-cors-realtime-runtime.json) |
| Nuxt主工程 | 冻结安装、四上下文类型、ESLint、Prettier、13单元、node-server生产构建通过 | [主工程运行](./stage-5-practice-runtime.json) |
| 最终集成 | 四项UI（两流程×两视口）+两项HTTP/SSR协议共6项全过；服务端异常监测日志0字节 | [同上](./stage-5-practice-runtime.json) |
| 全库门禁 | 284/284四部分，165个HTML/617引用零错误；39项检查器回归与阶段0–5验收门禁通过 | 现有脚本与机器记录可复跑 |

主工程实际断言：Cookie存在/HttpOnly/Lax/本地Secure=false且JS读不到SID；登录SID轮换、旧SID/撤销/过期失效；Origin/CSRF/内容类型拒绝；body/header伪造role不提权；非owner GET/PATCH404且Bob数据未变，普通成员admin403/真admin200；两用户与匿名并发SSR不串，private,no-store/Vary Cookie，payload无SID、匿名SSR不设Cookie；筛选/刷新/错误schema恢复；幂等201/200/409、ETag/428/412；JSON/上传总量和单文件限额、MIME/UTF8拒绝；实际Blob下载完成内容与所有者；退出后私有界面清理、无溢出/pageerror/hydration mismatch。

## 发现与关闭

1. **会话同key一致性**：index和admin守卫的default不一致，统一useLabSession/default factory，避免同key契约与缓存警告。
2. **迟到与退出缓存**：只比账号字符串不能区分退出后同账号重登；加入epoch/CSRF/主体比较并覆盖catch，清理notes/admin数据；source guard与独立deferred/singleflight实验的范围分清，不冒称已模拟所有Nuxt不遵守abort场景。
3. **测试自身断言**：首轮4过、2UI在异步列表多元素标量断言中断；改数组文本可重试断言，专项2过，没有用sleep掩盖问题。
4. **413背后的服务端异常**：日志复核发现默认for-await提前退出会销毁IncomingMessage socket，虽HTTP413成功但Nitro finish回调出现未捕获_isIdle异常。共用有界读取器用destroyOnReturn:false、停止缓冲并排空，增加uncaughtExceptionMonitor和teardown；最终完整6项复验通过且异常日志为空。未因测试退出0提前验收，也未修改vendor或掩盖异常。
5. **综合协议事实**：主上传16KiB总量/4KiB单文件/200 saved:false与独立lab4KiB总量/1KiB单文件/201 stored:false逐项说明；主下载是本地Blob，HTTP下载和XHR进度另验；没有虚构主工程已有删除、OAuth、JWT会话刷新或实时连接。

## 实际边界与后续

本地演示账号可直接选择admin、Cookie为HTTP/Secure=false、会话/幂等/笔记都在有界单进程内存、过期端点是教学控制。因此**不是生产认证模板，也没有验证真实密码/MFA/IdP或分布式持久化**。生产需HTTPS、合适Cookie策略、身份提供方、共享安全存储、限流/审计、代理限额/超时及部署检查，不能从本地演示推导已经完成。

Chrome是真实后台浏览器但手机是模拟视口；未测真机、多浏览器、屏幕阅读器、公网TLS/HSTS、生产部署/负载或真实学习者试学。OAuth/SSO/GraphQL/grpc-web为明确的官方观察/协议样本，未接真实服务。CORS策略不等于认证，SSE/WS也不是系统后台推送；幂等内存例不保证支付事务，取消不保证后端回滚。

依据：[MWG Security](https://developer.chrome.com/docs/modern-web-guidance/guides/security/security)、[Forms](https://developer.chrome.com/docs/modern-web-guidance/guides/forms/forms)、[OWASP Session](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)、[CSRF](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)、[Nuxt useRequestFetch](https://nuxt.com/docs/4.x/api/composables/use-request-fetch)、[HTTP幂等](https://www.rfc-editor.org/rfc/rfc9110.html#name-idempotent-methods)。精确框架/协议来源见各篇及分组记录，未把训练知识当本轮查阅。

下一阶段6：页面性能、Web安全、无障碍与SEO；独立web-common与两个宿主不在本轮修改。[质量机器记录](../stages/stage-5-acceptance.json)在源码变化后需先复核受影响内容/证据，再刷新指纹。
