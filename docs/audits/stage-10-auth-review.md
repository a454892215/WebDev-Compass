# 阶段10.3认证授权逐点审查

2026-11-25，开始10:01:34 UTC，按AUTHORING版本1 R01–R09。7点保持原路径；不接真实IdP或使用用户passkey。

## 七点机制、示例与变体

- 10.3.1：OAuth授权/OIDC身份/JWT格式分开。受控随机state/verifier/code、S256、固定redirect与一次性兑换真实执行；callback检查state与授权服务器验证code在教学模型同函数但角色分开说明。不是外部OAuth/OIDC服务，不虚称ID Token签名/nonce已实测。
- 10.3.2：refresh哈希索引、过期、单次原子消费、族撤销。两个并发Promise一个成功/一个复用拒绝后族撤销，赢家返回的新token也失效；严格策略、客户端single-flight、服务端事务/幂等宽限取舍明确。32族/16轮/1小时限制，非分布式持久store。
- 10.3.3：真实HttpOnly属性/JS不可读与fetch仍携Cookie、Origin拒绝、注销后旧Cookie401。localHTTP Secure=false、SameSite按站点/非源、XSS可代用户操作与CSRF职责分开，未测完整跨站/HTTPS矩阵。
- 10.3.4：WebAuthn Level3已为W3C Recommendation，注册/认证/challenge/origin/RP ID/flags/签名/恢复/同步计数器边界核对。仅官方流程观察，无真实或虚拟认证器执行，不把提示框当验签。
- 10.3.5：角色+owner+tenant+action每次默认拒绝，坏roles类型拒绝。Node矩阵和真实HTTPown200/其他owner403/其他tenant403/reader删除403，不以隐藏按钮代授权。Alice fixture公开可获取，非真实认证。
- 10.3.6：固定jose6.2.18，临时ES256签验，允许算法/issuer/audience/exp/typ/kid、claim类型/最大年龄和应用jti撤销实际验证；错误HS256/其他key/被改签名/claims均拒绝。无手写JWT crypto、任意jku访问、远程JWKS/KMS或生产撤销服务。
- 10.3.7：Web Cookie请求/SSR上下文与原生安全存储边界分开，不照搬全局currentUser或移动框架。原生未运行；lastUser反例明确要求隔离副本新增，非原主项目已有缺陷。

## 主Nuxt源码核对

实际读server/utils/store.ts、guards.ts、session POST/DELETE、note DELETE、workspace GET。store是有界后端会话Map，每请求从不可预测Cookie定位，非全局当前用户；writeSession精确Origin/FetchMetadata与session CSRF，owner仅来自会话，未授权对象404，注销撤销并删所属教学笔记，workspace匿名active:false。main没有OAuth/JWT/passkey，故任务明确lab/观察或副本扩展，不假设所有身份方案都已集成。主运行由主代理另记录，本组未重复主Nuxt。

向主代理提示smallJson超时req.destroy可能导致客户端连接断开而非可达408；这不属于本组修改文件，主作者应按真实证据说明。未将此未测路径写成本组HTTP成功或完整DoS防护。

## 实际运行与清理

Node26.0.0/pnpm11.4.0；jose6.2.18从官方npm registry实核，Playwright1.65.1。冻结离线安装通过。4项Node测试、真实HTTP/390与1440两组后台Chrome通过。HTTP额外验证跨Origin403、会话201、owner/tenant/role拒绝、logout204、旧Cookie401；浏览器验证document.cookie为空、cookie.httpOnly=true、读取前401/创建后200/撤销后401、无pageerror/横溢出。最后增加真实HTTP授权与会话过期清理后复验4+2，未用旧证据冒称新测。

代码经既有Prettier格式化、Node语法通过。server和Chrome在finally关闭，4523无监听，测试session内存清空；临时密钥/token未持久化到教材。无外部攻击目标、真实账号、授权提供商、passkey操作、原生设备、多浏览器或生产容量测试。

## R01–R09与来源

R01七编号/四部分建议齐；R02事务→刷新/存储→认证器/授权/JWT→平台对照；R03先MWGsecurity正文，再IETF9700/7636/8725、OIDC、WebAuthn3、OWASP与jose官方；R04真实库/HTTP/浏览器与观察明确；R05各练习不同变体、两标准、故障参考；R06主/独立/新增扩展核对；R07cookie/JWT/身份/授权/SSR术语一致；R08必要运行与发现修复；R09原值和未测范围单列，不自动勾学习进度。

正式manifest/父索引/主tasks由主代理整合；本组passed只表示上述资料类型/本地机制，不代替整阶段验收或学习者掌握。

资源检查发现HTML/app.mjs绝对路径被仓库根规则误解，改为独立lab相对路径并重跑真实HTTP/两视口通过；未放宽全局检查器。

最后类型自审补主体/tenant/jti非空约束，防缺失tenant两边undefined被误当相同；在现有Node组增加空/缺字段负例并复验4组通过。浏览器使用合法固定主体、行为未改，复用本轮相对路径修正后的两视口结果，不冒称再跑浏览器。

主代理共享运行追加核读：已读取/tmp/stage10-e2e.log、flow/http spec及结果，5项均通过，涵盖两视口会话/安全文本/SSR/注销、nonce/TT/parser探针与HTTP权限/CSRF/413/并发SSR/旧Cookie401。执行者主代理，本组仅核读，不重复运行。惰性TTL、无真实身份、未测超时连接路径与部分禁用模块策略应由主文档明确。
