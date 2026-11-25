# 10.3 认证、刷新与服务端授权

先OAuth/OIDC事务与用途，再轮换/存储，WebAuthn按需观察，最后服务端权限/JWT验证与移动经验迁移。先修阶段5会话与6安全，不把全部身份技术都作为默认必装。

- [OAuth/OIDC授权码与PKCE：分清授权、身份和客户端边界](./10.3.1.oauth-oidc-demo.md)
- [Refresh轮换与复用检测：原子消费、族撤销和并发策略](./10.3.2.refresh-token-demo.md)
- [令牌存储与BFF Cookie：读取、请求和生命周期是不同风险](./10.3.3.token-demo.md)
- [WebAuthn与Passkey：浏览器仪式和服务端验签职责](./10.3.4.webauthn-passkey-demo.md)
- [RBAC、ABAC与对象授权：服务端每请求默认拒绝](./10.3.5.rbac-abac-demo.md)
- [JWT验证：签名、算法、声明、用途和撤销上下文](./10.3.6.jwt-demo.md)
- [Web Cookie与原生安全存储：迁移威胁模型，不照搬API](./10.3.7.web-httponly-cookie-session-rn-demo.md)
