# 阶段5：HTTP API、登录会话与服务端授权

前置：阶段4Vue/Nuxt应用、阶段3类型与工程工具。目标：按明确契约读取/解码/上传数据，处理取消与失败，解释并实现本地Cookie会话、CSRF、资源授权和SSR身份边界。

推荐顺序：5.1.1–5.1.2请求基础 → 5.4.1/5.4.2/5.4.4数据 → 5.1上传/版本/mock/环境/幂等 → 5.2.1/5.2.3/5.2.7/5.2.9会话主线 → 按需其余认证、5.3跨源和5.5实时。无需先接入第三方登录或所有RPC协议。

31项独立变体、具体故障、至少两项验收及参考；先在副本实现，再对照。

| 章节 | 知识点 |
| --- | --- |
| [5.1 Fetch/Nuxt请求、上传、错误与安全重试](./5.1-http-client/README.md) | 7 |
| [5.2 Cookie会话、JWT、授权与SSR恢复](./5.2-auth/README.md) | 9 |
| [5.3 同源/CORS、代理与安全传输](./5.3-cors/README.md) | 5 |
| [5.4 JSON、分页、上传与协议契约](./5.4-data-protocols/README.md) | 6 |
| [5.5 WebSocket、Socket.IO、SSE与生命周期](./5.5-realtime/README.md) | 4 |

开始前核对规划，新增安全重试/幂等与SSR会话/私有缓存两点，共31。[规划依据](../../../docs/audits/STAGE_5_PLAN_REVIEW.md)记录缺口与范围；编号保留，数量不是官方规定。

[Nuxt综合工程](../../4-practice/05-fullstack-auth/README.md) · [31项综合任务](../../4-practice/05-fullstack-auth/tasks.md) · [阶段5验收](../../../docs/audits/STAGE_5_ACCEPTANCE.md)

本地HTTP演示cookie不带Secure，公开账号/内存store不是生产身份系统。真实HTTPS/OAuth/持久化/多实例安全需目标部署另验；后续阶段6与10深化安全，阶段7部署。独立web-common与宿主项目不在本轮修改。
