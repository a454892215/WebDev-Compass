# OAuth/OIDC与SSO官方协议观察清单

对应5.2.5/5.2.6。类型：官方资料阅读与具体协议设计观察；本轮未连接微信、GitHub、Google或企业IdP，未验证真实回调/单点退出。无需真实账户、client secret或把生产token贴入工具。

## 1. 先选一份可信提供方文档

- [Google OIDC](https://developers.google.com/identity/openid-connect/openid-connect)：找issuer/discovery、授权/令牌端点、ID Token验证、已登记回调。
- [GitHub OAuth App授权](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)：识别OAuth授权与用户API。不要因为有登录按钮就假定该流程等同OIDC。
- [OAuth安全BCP RFC9700](https://www.rfc-editor.org/rfc/rfc9700.html)：核对Code+PKCE、客户端类别、重定向/事务与码注入保护。
- [OIDC Core](https://openid.net/specs/openid-connect-core-1_0.html)：核对issuer、audience、nonce适用规则与身份claims。

## 2. 沿一条授权码流程填写记录

| 环节 | 具体要找的值 | 拒绝条件 |
| --- | --- | --- |
| 本应用创建事务 | 一次性事务与用户代理绑定、PKCE S256；SDK要求的state/nonce | 常量、事务过期或与当前会话不符 |
| authorize重定向 | 注册client_id、redirect_uri、scope和response_type=code | 未登记回调、过宽权限、把secret放URL |
| callback | code或error、对应事务与发行者 | 无事务/重放/错误issuer/开放returnTo |
| token兑换 | code_verifier、适合客户端类别的认证方式 | 码/验证器不匹配；浏览器假装能保存secret |
| 本应用登录 | 已验证ID Token或提供方身份API结果；建立本应用session | 把任意access token解码结果直接当身份 |

记录每一值从哪来、保存在何处、由谁验证，不必复制真实值。state、nonce、PKCE的CSRF组合须满足BCP和SDK条件，不能凭一句“有PKCE”就删除库要求的保护。

## 3. 用无凭据本地URL样本找开放重定向

预测这些returnTo是否可接受，再写明自己的站内路由allowlist规则：

```text
/notes
https://attacker.example.test/
//attacker.example.test/
/notes?next=https://attacker.example.test/
```

预期：前两种外部形式不能直接成为本站登录后的任意跳转。允许站内路径仍要按业务路由和参数判断，不能简单用includes('example.test')；最后一个样本需要确认该参数是否会被下游再次当跳转目标。这里只做设计审查，不声称已经运行OAuth callback服务器。

## 4. SSO三会话矩阵

画App A、App B、IdP三份独立会话，填写以下事件对每份会话的实际影响：A本地退出、IdP退出、管理员撤销、B重新打开。没有提供方配置时填“待核对”，不能默认其他会话都失效。

对两个未来Web宿主，记录同源/跨源、共同IdP、各自回调、Cookie范围与用户标识。OIDC身份按可信issuer+subject识别，跨发行者相同email不自动合并。按[RP-Initiated Logout](https://openid.net/specs/openid-connect-rpinitiated-1_0.html)和实际提供方能力讨论退出；本轮没有验证完整单点退出。

## 完成判据

- [ ] 能指出OAuth授权、OIDC身份层和本应用会话各自职责。
- [ ] 每个回调/事务校验有具体来源和拒绝条件，没有浏览器client secret。
- [ ] A/B/IdP退出矩阵准确区分已有事实与待验证项。

后续真实集成必须回到目标项目，用提供方正式配置和测试账户验证；本知识库的本地fixture登录不能作为真实第三方登录证据。
