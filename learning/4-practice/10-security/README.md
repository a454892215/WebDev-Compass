# 阶段10：Nuxt匿名会话与安全笔记实践

前置阶段0–9，重点5会话/授权、6浏览器安全、7部署、8数据边界。目标是能建模威胁、验证拒绝路径、说明措施与残余风险；这是教学实验，不是生产登录或合规认证。

## 运行与验证

在本目录执行；本轮Node26.0.0/pnpm11.4.0，固定Nuxt4.7.0、Vue3.5.46、TS6.0.3，新增官方registry核对的nuxt-security2.7.0（要求Node>=24）。

```bash
pnpm install --frozen-lockfile
pnpm dev
# http://127.0.0.1:4521/
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm test:e2e
pnpm format:check
```

test:e2e前须先执行build；测试自动启动生产Node及后台Chrome后关闭；默认macOS Chrome，其他环境用CHROME_PATH。主4521、漏洞4522/4525、认证4523、供应链隐私4524/4526，全部loopback。不要输入真实用户资料/密码/卡号，不接用户认证器或真实IdP。依赖/缓存/产物/test-results不提交。

## 逐层阅读实际能力

1. store.ts创建随机32字节匿名session/CSRF。显式后端Map最多64会话/每会话20条，TTL15分钟；不是SSR模块全局currentUser。没有账户、密码或真实身份，持Cookie只是拥有这个教学会话。
2. session.post先精确检查固定Origin，新会话撤旧；Cookie HttpOnly/Lax/Path=/，本地HTTP Secure=false。生产需要HTTPS、Secure/适当前缀与身份/持久会话/代理信任等另行设计，不能原样上线本配置。
3. workspace按当前Cookie读私有DTO，SSR payload合法包含本会话笔记与CSRF，绝不返回Cookie原值。所有路径private/no-store/cache:false。Cookie不按端口隔离，本地另一个端口不是生产安全边界。
4. notes写操作有Origin/FetchMetadata、会话CSRF和运行时JSON/text允许列表；owner由server当前session决定。匿名读401、另一会话已知ID读删404、伪造owner字段400，不以随机ID或隐藏按钮当授权。
5. module声明长度8192限制仅检查Content-Length；自定义smallJson检查实际字节4096，缓冲有界、2秒读截止、超过16KiB停止读取并关闭。真实6000字节声明与显式Transfer-Encoding:chunked均413。超时destroy可能连接断开，不能承诺客户端一定收到408；本轮未做完整慢流/DoS认证。
6. Vue插值只展示文本，不用v-html。nuxt-security接入每响应nonce/strict-dynamic/Trusted Types，实际SSR/导航可用。但其2.7.0源码会regex给渲染body等统一补nonce，未信任SSR HTML若已注入可能被一并授权，不能把它当富HTML注入的兜底。未来富HTML须重新设计可信标签nonce/严格净化与边界，不照抄默认模块。
7. /csp-probe是独立固定HTML探针，只有这一条关闭模块自动处理，自己给明确开发者control脚本加随机nonce；另一个parser插入无nonce脚本应被阻挡。没有用户HTML插值。主UI仍保持模块CSP/TT，不为了测试关闭策略。
8. CSP报告采用本地兼容report-uri，smallJson限额后仅保留允许directive计数/每项100，丢弃URI/sample。报告可伪造，没有时间TTL或生产report-to/可靠投递。TT sink拒绝报告与parser脚本报告按effective-directive区分。
9. logout同时撤销session/删除笔记/清Cookie与客户端数据。过期立即拒绝访问，物理数据在后续store.start/get惰性清理；不是准点后台删除作业。进程重启全部丢失，无生产持久化/备份删除证明。

style-src允许unsafe-inline；本地关闭HSTS/COEP，保留COOP/CORP同源、frame拒绝和nosniff。rateLimiter、CORS中间件、XSSvalidator关闭：Origin/CSRF/字段允许列表是本例独立控制，不宣称启用了模块全部功能。关闭XSS字符串过滤是为了允许原样文本，不是允许HTML执行。

## 四部分与独立实验

[理论](../../1-notes/10-security/README.md) → [代码与观察](../../2-examples/10-security/README.md) → [独立练习](../../3-exercises/10-security/README.md) → [29项任务](./tasks.md)。

- vulnerability-lab：固定净化/再解析、模板级nonce、signed double-submit、frame/SRI/redirect/prototype/message正反例；未知mXSS和全部浏览器不由一个fixture证明。
- auth-lab：jose实际签验拒绝、refresh轮换/族撤销、owner/tenant/role、HttpOnly与注销。OAuth为受控模型，Passkey官方观察，无真实IdP/认证器。
- privacy-lab：真实env/hiddenmap、同意/拒绝/本地撤回、最小日志和跨源隔离。audit只查此lab依赖树；SBOM、商业CMP/SCA、SOC2/PCI与法律个案未执行。

[威胁模型](./docs/THREAT_MODEL.md)和[安全Review](./docs/SECURITY_REVIEW.md)对应真实源码/路径；已有、要求扩展、观察与未测分别写明。[阶段验收](../../../docs/audits/STAGE_10_ACCEPTANCE.md)给本轮证据。无公网攻击、真实个人数据、生产身份/安全认证、真实设备/多浏览器/读屏或学习者试学。
