# 10.2 输入、执行、请求和跨窗口边界

前置阶段5/6，建议XSS/CSP→CSRF/嵌入→redirect/原型→完整性/消息。先问题与机制，再真实lab、独立变体和综合任务；单项成功不等于整站安全。

- [XSS、mXSS与DOM Clobbering：先确定输出上下文](./10.2.1.xss.md)
- [Nonce CSP、strict-dynamic与Report-Only：不盲授信](./10.2.2.csp.md)
- [Signed Double-Submit、Origin与SameSite：绑定当前会话](./10.2.3.csrf.md)
- [点击劫持：明确被嵌入方向与祖先限制](./10.2.4.clickjacking.md)
- [Open Redirect：从固定目标到明确allowlist](./10.2.5.open-redirect.md)
- [原型污染：拒绝危险结构并消除隐式继承](./10.2.6.prototype-pollution.md)
- [SRI与跨源CORS：验证固定字节而非信任域名](./10.2.7.sri-subresource-integrity.md)
- [postMessage：origin、source、版本与schema共同校验](./10.2.8.postmessage.md)
