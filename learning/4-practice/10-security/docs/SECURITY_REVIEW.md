# 安全Review与发布检查

2026-11-25；范围见[威胁模型](./THREAT_MODEL.md)。主代理执行，认证组追加源码/文档审阅；不是外部渗透测试、真实团队主持或合规认证。

| 检查              | 实现/实际证据                                                                       | 限制                                               |
| ----------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------- |
| owner不来自客户端 | notes仅text允许列表，store核session/owner；跨会话读删404且原对象不变                | 无真实账户                                         |
| 会话/撤销         | crypto随机、15分钟有效、64会话/每会话20条；轮换/过期/注销测试                       | 后端Map非当前SSR用户单例，非多机持久化             |
| 写操作CSRF        | 固定siteOrigin，session同步token，timingSafeEqual；缺错/跨会话拒绝                  | HttpOnly/Lax不替代它                               |
| 安全文本          | 不用v-html展示用户内容；浏览器恶意img/script仍为文本                                | 富HTML需重新评审                                   |
| CSP/TT兼容        | nuxt-security2.7、每响应nonce、strict-dynamic、TT；UI/导航/SSR可用                  | style unsafe-inline残余                            |
| parser拒绝        | 独立固定csp-probe，手动nonce只给开发者控制脚本；control执行/无nonce不执行/report204 | 此路由不走模块nonce后处理                          |
| nonce集成残余     | 库40-cspSsrNonce会regex处理body                                                     | 不当未信任SSR HTML兜底                             |
| 报告最小化        | 仅允许directive计数，忽略URI/sample；unit/204                                       | report-uri本地兼容，非生产HTTPS report-to          |
| 请求有界          | 实际4096字节/2s读截止，超过16KiB停止读取并关闭                                      | 已测声明/真chunked6000B413；非所有慢流/DoS场景通过 |
| SSR/缓存          | 当前Cookie读取，private/no-store/cache:false                                        | 双会话并发无交叉，不暴露Cookie                     |
| 供应链            | 固定模块/锁文件、冻结安装、构建                                                     | 不以独立lab audit0称主全树安全                     |
| 保留              | logout删除，过期访问时惰性清理                                                      | 无生产删除/备份作业                                |

OWASP Top10:2025映射：访问控制→owner/默认拒绝；配置/注入→文本、CSP/TT及后处理残余；供应链→固定依赖；密码学/认证→随机session与身份模型边界；完整性→输入输出契约；日志→最小报告；异常处理→失败拒绝。未存在的数据库/密码/IdP不冒称已测试。

发现与关闭：初始DevTools测试先创建可透传TrustedScript policy再动态插入，已有执行权限的信任链不能当parser注入；换独立固定parser探针，而不是关TT或加unsafe-inline。库nonce后处理风险保留，当前只纯文本。请求测试显式Transfer-Encoding:chunked+write，避免end(data)自动Content-Length假覆盖。TTL文案改为实际惰性清理。

真实产品还需身份/持久会话、HTTPS/Cookie/代理信任、速率与告警、秘密管理、依赖SCA及删除/保留；未实现不写已验证。
