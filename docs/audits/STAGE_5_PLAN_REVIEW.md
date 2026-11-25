# 阶段5规划复核

日期2026-11-25。先读取学习路径、地图、四部分结构与R01–R09，再检索并读取Modern Web Guidance Security/Forms、Nuxt数据获取/请求上下文、OWASP会话/CSRF及HTTP相关官方正文。原29点的大类涵盖请求、认证、同源、协议和实时通信；以下两项值得独立学习，不把目录数量当作官方标准。

| 问题 | 调整 | 依据与边界 |
| --- | --- | --- |
| 重试被夹在一般加载/失败状态里，易误用自动重试写入 | 新增5.1.7：安全重试、Retry-After、预算/取消与幂等键 | HTTP安全/幂等语义与实际取消不保证远端撤销；故障输入需具体区分GET与写入 |
| 阶段4说明SSR状态，但没有认证后的Cookie转发和私有缓存闭环 | 新增5.2.9：Nuxt SSR会话恢复、相对路径请求转发、用户隔离和no-store | [Nuxt useRequestFetch](https://nuxt.com/docs/4.x/api/composables/use-request-fetch)只自动转发以/开头的相对路径；内部Set-Cookie不能假定自动送到页面浏览器 |
| 容易遗漏但已有编号可容纳的细节 | 分页稳定tie-break、unknown解码、限额/不可信上传元数据、owner授权、CSRF、登录轮换/撤销、会话代次、OAuth/OIDC、CORS写与读、WS/SSE清理 | 不重复新增大类；深入安全仍在阶段6/10，真实部署留阶段7 |
| 移动经验容易按≈类比 | 修改5.5.4为WebSocket/SSE与移动长连接/系统推送的机制和生命周期差异 | 页生命周期/重连不等价系统后台推送；浏览器存储非Keychain/Keystore |

阶段5调整为31点：请求7、认证9、CORS5、数据6、实时4；总图587。原编号/路径/勾选保留。推荐顺序：5.1读取/生命周期 → 5.4数据契约 → 5.1上传/幂等 → 5.2会话/授权/SSR → 按需5.3跨源及5.5实时；OAuth/SSO/GraphQL/grpc-web等选修不阻塞本地Cookie会话主线。

综合项目选择Nuxt4+同源本地Nitro接口，公开fixture账号仅用于观察协议，不实现真实密码认证。服务端会话、CSRF、资源owner/admin检查是真实本地逻辑；但内存store、公开账号、localhost HTTP/Secure=false、演示过期接口都明确为教学限制，不能称生产认证模板。JWT用成熟jose真实签验与负例，OAuth/SSO按官方观察不伪造接入；CORS/WS/SSE在独立真实双端口实验，主项目不虚构实时功能。

先读来源：[MWG Security](https://developer.chrome.com/docs/modern-web-guidance/guides/security/security)、[Forms](https://developer.chrome.com/docs/modern-web-guidance/guides/forms/forms)、[OWASP Session](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)、[CSRF](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)、[Nuxt数据](https://nuxt.com/docs/4.x/getting-started/data-fetching)、[useRequestFetch](https://nuxt.com/docs/4.x/api/composables/use-request-fetch)、[Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control)。框架与安全推荐仍需按威胁/部署约束选择，不能机械套所有响应头或跨站策略。
