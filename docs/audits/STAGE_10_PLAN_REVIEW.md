# 阶段10规划复核

2026-11-25，29点保持编号/路径：基线4、漏洞8、认证7、供应链5、隐私5。前置5/6/7/8，先资产/身份模型，再输出/授权、发布和隐私，不因header或工具多代表完整安全。

缺口补入原点：10.1对象授权/限额/错误日志；10.2可信nonce、report-only/enforce、signed double-submit绑定session；10.3对象/tenant、JWT上下文/撤销、refresh复用并发；10.4审计日期/范围/秘密与publicmap；10.5 consent条件、撤回/最小数据/跨源代价。无需新增重复章。

OWASP当前入口为Top10:2025，旧2021编号不硬套。Top10不是完整测试规范或认证。法规/PCI/SOC以官方来源理解工程职责，不写法律/审计已经达标。

先读[MWG Security](https://developer.chrome.com/docs/modern-web-guidance/guides/security/security)及[Privacy](https://developer.chrome.com/docs/modern-web-guidance/guides/privacy/privacy)，再OWASP/IETF/OIDC/WebAuthn/Nuxt Security/pnpm及标准制定方。不可达页如实记录，不记为读取成功。

主Nuxt4.7/Vue3.5.46/TS6.0.3，新增nuxt-security2.7.0经官方registry核版Node>=24，本轮Node26满足。用库nonce/TT并真实验证，不手写JWT密码学。实际库会regex给渲染body补nonce，与MWG避免盲授权警告相关：主例只纯文本，不把CSP当未信任SSR HTML兜底；富HTML需求应重新设计可信标签nonce/净化。

主例匿名随机session+同步CSRF+owner笔记，不是真账号/IdP；显式后端Map不等于SSR共享currentUser。HTTP Secure=false、固定Origin、无多机持久化为教学限制；style unsafe-inline、未开启HSTS/COEP/rateLimiter等逐项说明。过期访问失效与惰性物理清理分开。

独立lab涵盖净化/SRI/签名CSRF、JWT/refresh/权限、供应链/consent/隔离。受控OAuth模型、Passkey官方观察、商业CMP/SCA/SOC/PCI未执行分开标注，不接真实凭据或用户认证器。

按R01–R09逐点审四部分；loopback合成数据，状态/来源/实测/学习掌握分开；无公网攻击、真实用户数据、安全认证或法律结论。
