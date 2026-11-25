# 阶段5逐知识点综合任务

先按[综合项目说明](./README.md)跑通已有功能，再在副本完成变体。31项任务分别指向Nuxt主工程或独立HTTP、JWT、跨源/实时实验；不把任务要求新增的能力算成作者已经实现。OAuth/SSO/GraphQL/grpc-web按明确的官方观察类型处理。

保留改动、命令、实际返回/状态、原因和修复结果；不要求复杂打卡。

<a id="p-5-1-1"></a>

## 5.1.1 HTTP客户端选型：Fetch、Nuxt读取与统一错误边界

在Nuxt资料库副本定位列表读取、详情读取与提交入口，写清各层错误由谁处理；保留一个真实坏结构样本证明运行校验。

验收：

- [ ] 404、坏JSON、错字段分别触发不同类别，失败不冒充空列表成功。
- [ ] 204不被强行解析JSON；成功DTO进入UI前已解码。

[理论](../../1-notes/05-fullstack-auth/5.1-http-client/5.1.1.axios.md) · [示例](../../2-examples/05-fullstack-auth/5.1-http-client/5.1.1.axios-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.1-http-client/5.1.1.axios.md)

<a id="p-5-1-2"></a>

## 5.1.2 请求生命周期：取消、超时、迟到结果与状态恢复

在Nuxt副本挑选一个依赖输入的读取，先判断是否应使用useFetch的响应式URL，再为手工请求扩展慢旧/快新、清空与离开三种反例。

验收：

- [ ] 慢A晚返回不能覆盖快B；清空或dispose后无旧结果回写。
- [ ] 取消不显示成空列表成功，loading只由当前请求结束；定时器和监听器可清理。

[理论](../../1-notes/05-fullstack-auth/5.1-http-client/5.1.2.abortcontroller.md) · [示例](../../2-examples/05-fullstack-auth/5.1-http-client/5.1.2.abortcontroller-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.1-http-client/5.1.2.abortcontroller.md)

<a id="p-5-1-3"></a>

## 5.1.3 FormData上传、XHR进度与Blob下载生命周期

主工程已有上传校验和当前页DTO生成Blob下载。对照主工程与独立lab的不同协议；若在副本新增HTTP文件下载或XHR进度，分别验证传输进度、HTTP响应与业务结果，不冒称已有断点续传。

验收：

- [ ] FormData自动boundary；主工程合法上传200/saved:false，独立lab合法201/stored:false，各自超限413；100%进度不等于业务保存。
- [ ] 现有Blob下载名称/完成内容正确且释放对象URL；若新增HTTP下载，先检查失败状态并提供恢复，不把本地Blob当HTTP请求。

[理论](../../1-notes/05-fullstack-auth/5.1-http-client/5.1.3.formdata-blob.md) · [示例](../../2-examples/05-fullstack-auth/5.1-http-client/5.1.3.formdata-blob-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.1-http-client/5.1.3.formdata-blob.md)

<a id="p-5-1-4"></a>

## 5.1.4 阅读OpenAPI：方法、参数、响应与版本兼容

对照Nuxt API实际实现画一张方法/参数/响应/认证表，再为一个已有接口补本地OpenAPI片段和真实响应契约测试。

验收：

- [ ] 能指出方法、参数位置、必填、范围及成功/失败响应，文档与实际请求一致。
- [ ] 明确本例检查不是完整规范验证；客户端类型不当作网络数据必然可信。

[理论](../../1-notes/05-fullstack-auth/5.1-http-client/5.1.4.api-openapi-swagger.md) · [示例](../../2-examples/05-fullstack-auth/5.1-http-client/5.1.4.api-openapi-swagger-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.1-http-client/5.1.4.api-openapi-swagger.md)

<a id="p-5-1-5"></a>

## 5.1.5 Mock服务器与MSW：可控失败，不伪装真实后端

为资料库新增一个可控错误契约测试，明确是独立fixture还是真实Nitro路径；不要把mock账号/接口通过称为生产认证已验收。

验收：

- [ ] 同一测试可重复运行且结果确定，未知路由404，不访问真实生产服务。
- [ ] 测试后服务与拦截器清理；报告清楚区分本地HTTP、内存异步和真实后台。

[理论](../../1-notes/05-fullstack-auth/5.1-http-client/5.1.5.msw-mock-service-worker.md) · [示例](../../2-examples/05-fullstack-auth/5.1-http-client/5.1.5.msw-mock-service-worker-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.1-http-client/5.1.5.msw-mock-service-worker.md)

<a id="p-5-1-6"></a>

## 5.1.6 环境配置与baseURL：公开值、凭据目标和SSR边界

核对Nuxt宿主公开配置和服务端上游目标；在副本增加allowlist错误样本，证明不会向错误origin转发会话信息。

验收：

- [ ] 浏览器包/public配置无秘密，静态构建不假称可由服务器env实时改变。
- [ ] 意外绝对URL和非允许origin被拒绝；SSR不会把Cookie转发到任意配置目标。

[理论](../../1-notes/05-fullstack-auth/5.1-http-client/5.1.6.dev-staging-production-baseurl.md) · [示例](../../2-examples/05-fullstack-auth/5.1-http-client/5.1.6.dev-staging-production-baseurl-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.1-http-client/5.1.6.dev-staging-production-baseurl.md)

<a id="p-5-1-7"></a>

## 5.1.7 安全重试与幂等：限额、退避和重复写入边界

为资料库副本选择一种可安全重试的读取，写次数/时间预算与取消测试；提交路径单独设计重复提交和结果核实，不自动复用读取重试器。

验收：

- [ ] 429/503按契约重试且有上限，403/坏数据/用户取消不会无限重试。
- [ ] 写入不自动重放；若用幂等键，服务端能拒绝同key不同body并说明有效期/主体/事务限制。

[理论](../../1-notes/05-fullstack-auth/5.1-http-client/5.1.7.retry-idempotency.md) · [示例](../../2-examples/05-fullstack-auth/5.1-http-client/5.1.7.retry-idempotency-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.1-http-client/5.1.7.retry-idempotency.md)

<a id="p-5-2-1"></a>

## 5.2.1 Session与Cookie：轮换、过期和CSRF边界

已有Cookie教学会话，核对登录轮换、server expiry、退出撤销与CSRF；在副本补一项跨标签页失效反馈，不把真实密码验证算已实现。

验收：

- [ ] 旧会话在登录轮换或退出后不能再访问受保护API；过期由服务器判断。
- [ ] 缺失/错误CSRF或不允许Origin的写请求失败，合法写入仍可用；本地HTTP限制明确。

[理论](../../1-notes/05-fullstack-auth/5.2-auth/5.2.1.session-cookie.md) · [示例](../../2-examples/05-fullstack-auth/5.2-auth/5.2.1.session-cookie-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.2-auth/5.2.1.session-cookie.md)

<a id="p-5-2-2"></a>

## 5.2.2 JWT：签名、claims与access/refresh职责

主项目采用opaque Cookie session，JWT留独立实验。在副本撰写改用Bearer的协议差异清单，实际运行篡改/过期/错受众反例，不把主项目说成JWT认证。

验收：

- [ ] 篡改payload或错误key被真实密码学验证拒绝，decode成功不算授权成功。
- [ ] 正确签名但错误用途/受众/时间被拒绝；说明退出后的access撤销取决于服务器策略。

[理论](../../1-notes/05-fullstack-auth/5.2-auth/5.2.2.jwt-json-web-token.md) · [示例](../../2-examples/05-fullstack-auth/5.2-auth/5.2.2.jwt-json-web-token-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.2-auth/5.2.2.jwt-json-web-token.md)

<a id="p-5-2-3"></a>

## 5.2.3 登录恢复、刷新协调、失效与退出

已有Cookie恢复/失效/退出。副本补会话恢复错误反馈与退出后迟到保护；single-flight只在独立Bearer协调实验，不虚构主项目refresh endpoint。

验收：

- [ ] 按契约区分匿名/过期、受保护接口401与网络错误；session查询200 user:null不当作已登录。
- [ ] logout后慢结果不复活旧身份；刷新有上限，并发只在同一会话内合并。

[理论](../../1-notes/05-fullstack-auth/5.2-auth/5.2.3.token.md) · [示例](../../2-examples/05-fullstack-auth/5.2-auth/5.2.3.token-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.2-auth/5.2.3.token.md)

<a id="p-5-2-4"></a>

## 5.2.4 Authorization Bearer：传输、解析与凭证边界

主Cookie项目不需要Authorization token。独立lab解释Bearer解析/签验及401/403矩阵；若副本接真实Bearer后台，先明确HTTPS、受众与允许转发目标。

验收：

- [ ] 解析与验证分别有反例，坏token不能因格式正确通过。
- [ ] token不出现在URL/日志；能解释CORS预检与服务器授权分别负责什么。

[理论](../../1-notes/05-fullstack-auth/5.2-auth/5.2.4.authorization-bearer-token.md) · [示例](../../2-examples/05-fullstack-auth/5.2-auth/5.2.4.authorization-bearer-token-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.2-auth/5.2.4.authorization-bearer-token.md)

<a id="p-5-2-5"></a>

## 5.2.5 OAuth 2.0与OIDC：授权码、PKCE与第三方登录

主项目只有公开fixture登录选择，没有真实第三方认证。完成OAuth/OIDC协议与回调威胁清单；副本未来接提供方须另行配置与实测，不能把选择alice当OAuth登录。

验收：

- [ ] 能区分OAuth授权、OIDC认证与本应用会话，明确secret不进入浏览器包。
- [ ] 回调事务与redirect验证逐项列出；缺真实提供方条件明确标为未实测。

[理论](../../1-notes/05-fullstack-auth/5.2-auth/5.2.5.oauth.md) · [示例](../../2-examples/05-fullstack-auth/5.2-auth/5.2.5.oauth-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.2-auth/5.2.5.oauth.md)

<a id="p-5-2-6"></a>

## 5.2.6 SSO：身份提供方、各应用会话与退出范围

本地Cookie应用退出只针对该应用会话。完成桌面/手机未来SSO信任与退出矩阵，不宣称本次已接IdP或全局单点退出。

验收：

- [ ] A/B/IdP三份会话与访问范围分清，不把域名相似当共享身份。
- [ ] 明确本地/IdP/全应用退出的实际能力与未验证条件，能描述恢复失败回退。

[理论](../../1-notes/05-fullstack-auth/5.2-auth/5.2.6.sso.md) · [示例](../../2-examples/05-fullstack-auth/5.2-auth/5.2.6.sso-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.2-auth/5.2.6.sso.md)

<a id="p-5-2-7"></a>

## 5.2.7 权限反馈、RBAC与对象所有权

已有owner/admin教学策略及PATCH版本检查；直接API验证alice/bob/admin而非只看按钮。在副本新增删除接口，验证非owner拒绝且资源未变。

验收：

- [ ] 同角色非owner不能读取/改写他人资源，admin能力和匿名路径有明确结果。
- [ ] 只改DOM/请求body里的role不能升级权限；API失败反馈保留可恢复路径。

[理论](../../1-notes/05-fullstack-auth/5.2-auth/5.2.7.rbac.md) · [示例](../../2-examples/05-fullstack-auth/5.2-auth/5.2.7.rbac-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.2-auth/5.2.7.rbac.md)

<a id="p-5-2-8"></a>

## 5.2.8 浏览器凭证存储与移动安全存储的差异

核对主项目没有向Web Storage写凭证，并观察HttpOnly cookie/公开用户信息边界。副本完成存储威胁矩阵，不把H5当原生安全存储。

验收：

- [ ] 能说明HttpOnly防直接读但不防同源恶意请求；Web Storage仍脚本可读。
- [ ] 本地观察仅教学值并清理；方案说明包含CSRF/XSS和服务器撤销，不等价Keychain。

[理论](../../1-notes/05-fullstack-auth/5.2-auth/5.2.8.token-keychain-keystore-cookie-session.md) · [示例](../../2-examples/05-fullstack-auth/5.2-auth/5.2.8.token-keychain-keystore-cookie-session-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.2-auth/5.2.8.token-keychain-keystore-cookie-session.md)

<a id="p-5-2-9"></a>

## 5.2.9 Nuxt SSR会话恢复、Cookie转发与私有缓存

已有SSR会话恢复与私有响应；验证alice/bob/匿名交替并发、no-store和payload无session ID。副本引入外部API前先列凭证转发allowlist，不把任意baseURL当可信。

验收：

- [ ] 两份独立Cookie请求的SSR内容/payload不串，匿名不能从缓存拿到上个用户数据。
- [ ] payload不含session ID，私有响应不共享缓存，凭证只转发可信目标；Set-Cookie回程边界说明准确。

[理论](../../1-notes/05-fullstack-auth/5.2-auth/5.2.9.nuxt-ssr-session.md) · [示例](../../2-examples/05-fullstack-auth/5.2-auth/5.2.9.nuxt-ssr-session-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.2-auth/5.2.9.nuxt-ssr-session.md)

<a id="p-5-3-1"></a>

## 5.3.1 同源策略：限制读取，不等于阻止请求

Nuxt主工程保持同源Cookie会话；在本双端口实验解释读取失败与写入已发生，副本再画出真实项目源/站点与认证边界。

验收：

- [ ] 能解释“响应读不到”与“POST没发生”不同，服务器写计数和页面错误同时成立。
- [ ] 指出两个URL不同源但可同站，不把SameSite当作端口隔离或CORS授权。

[理论](../../1-notes/05-fullstack-auth/5.3-cors/5.3.1.item-5-3-1.md) · [示例](../../2-examples/05-fullstack-auth/5.3-cors/5.3.1.item-5-3-1-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.3-cors/5.3.1.item-5-3-1.md)

<a id="p-5-3-2"></a>

## 5.3.2 CORS：简单请求、预检、凭据与精确Origin

在独立CORS实验验证精确来源/凭据/预检，不向Nuxt生产式会话接口添加任意跨源通配；若宿主跨源接入，在副本写完整允许列表与缓存策略。

验收：

- [ ] 允许请求能读响应，拒绝预检时实际POST不发生，不能只根据命令行成功判定CORS正确。
- [ ] 凭据读取使用精确Origin+ACAC，Vary存在；通配*反例在真实浏览器失败。

[理论](../../1-notes/05-fullstack-auth/5.3-cors/5.3.2.cors.md) · [示例](../../2-examples/05-fullstack-auth/5.3-cors/5.3.2.cors-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.3-cors/5.3.2.cors.md)

<a id="p-5-3-3"></a>

## 5.3.3 开发代理：浏览器同源，服务器再转发

对照本lab固定Node代理与Nuxt同源server/api，在副本写开发和生产两张请求拓扑图，不假设开发代理会随静态产物一起运行。

验收：

- [ ] 浏览器请求仍是4404同源，后端记录来自服务器转发，能够画清两跳。
- [ ] 未把密钥/用户指定target直接透传；明确server.proxy不随vite build部署。

[理论](../../1-notes/05-fullstack-auth/5.3-cors/5.3.3.vite.config.md) · [示例](../../2-examples/05-fullstack-auth/5.3-cors/5.3.3.vite.config-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.3-cors/5.3.3.vite.config.md)

<a id="p-5-3-4"></a>

## 5.3.4 JSONP：跨源脚本执行的历史方案

在独立JSONP对照中说明脚本信任风险；为Nuxt迁移方案写Fetch/CORS替代清单，不给当前认证API新增JSONP。

验收：

- [ ] 能解释为什么script执行成功不等于Fetch同源规则失效。
- [ ] 迁移后按HTTP状态/解析失败处理，不保留敏感Token或任意callback拼接。

[理论](../../1-notes/05-fullstack-auth/5.3-cors/5.3.4.jsonp.md) · [示例](../../2-examples/05-fullstack-auth/5.3-cors/5.3.4.jsonp-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.3-cors/5.3.4.jsonp.md)

<a id="p-5-3-5"></a>

## 5.3.5 HTTPS与安全响应头：按部署能力逐步收紧

结合Nuxt实际接管资源写安全头部署清单；复用本lab CSP拒绝/允许对照，不把本轮HTTP样本当生产TLS验收。

验收：

- [ ] 能实际证明本地内联脚本被阻止而允许脚本执行，且不以此声称没有XSS。
- [ ] TLS/HSTS步骤标明真实域名和恢复条件；不修改浏览器安全选项，不把本地HTTP称HTTPS通过。

[理论](../../1-notes/05-fullstack-auth/5.3-cors/5.3.5.content-security-policy.md) · [示例](../../2-examples/05-fullstack-auth/5.3-cors/5.3.5.content-security-policy-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.3-cors/5.3.5.content-security-policy.md)

<a id="p-5-4-1"></a>

## 5.4.1 JSON契约、unknown解码与DTO映射

对照资料库实际DTO与UI字段，增加一个坏类型响应测试；说明何处解析、何处解码、何处给用户反馈。

验收：

- [ ] 必要字段错类型/重复id被拒绝，合法0/false等值不被truthy误判。
- [ ] 内部模型由解码/映射产生；未知额外字段是否接受有明确协议理由。

[理论](../../1-notes/05-fullstack-auth/5.4-data-protocols/5.4.1.json-vs.md) · [示例](../../2-examples/05-fullstack-auth/5.4-data-protocols/5.4.1.json-vs-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.4-data-protocols/5.4.1.json-vs.md)

<a id="p-5-4-2"></a>

## 5.4.2 分页、排序与筛选：稳定身份和参数边界

在资料库副本为现有列表补一个分页/排序契约，核对page/size/q、空页与总量，并说明刷新和条件改变的预期。

验收：

- [ ] 排序并列有稳定id作为次序，size/页码范围明确，重复参数按协议处理。
- [ ] 筛选后页码不指向旧集合；空页不与HTTP失败混淆，说明动态数据下offset局限。

[理论](../../1-notes/05-fullstack-auth/5.4-data-protocols/5.4.2.api.md) · [示例](../../2-examples/05-fullstack-auth/5.4-data-protocols/5.4.2.api-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.4-data-protocols/5.4.2.api.md)

<a id="p-5-4-3"></a>

## 5.4.3 上传接口契约：字段、限额、格式与结果

对照Nuxt上传路由的实际限额、内容校验和会话/CSRF策略，补两项失败测试；若新增存储，另行设计生成名与下载授权。

验收：

- [ ] 非法文件可绕过浏览器选择仍被服务端拒绝；单文件和总量限制分别说明。
- [ ] 主工程200/saved:false与独立lab201/stored:false分别解释；文件名不用作磁盘路径，未验证扫描能力不宣称安全。

[理论](../../1-notes/05-fullstack-auth/5.4-data-protocols/5.4.3.item-5-4-3.md) · [示例](../../2-examples/05-fullstack-auth/5.4-data-protocols/5.4.3.item-5-4-3-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.4-data-protocols/5.4.3.item-5-4-3.md)

<a id="p-5-4-4"></a>

## 5.4.4 HTTP状态、业务错误与响应契约

先在独立HTTP lab核对204无JSON，再整理Nuxt已有登录/授权/上传/读取状态的恢复策略；在副本新增失败分支测试，不把403自动变成重复登录。

验收：

- [ ] 204不读JSON，错误状态不被包成成功，业务消息不泄漏诊断秘密。
- [ ] 400/401/403/429的恢复动作不同且有上限；协议没有强制统一包壳。

[理论](../../1-notes/05-fullstack-auth/5.4-data-protocols/5.4.4.code-data-message.md) · [示例](../../2-examples/05-fullstack-auth/5.4-data-protocols/5.4.4.code-data-message-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.4-data-protocols/5.4.4.code-data-message.md)

<a id="p-5-4-5"></a>

## 5.4.5 GraphQL与REST：请求、局部错误和选型边界（选修）

在独立副本将一个REST读取需求写成GraphQL请求/响应对照，不更换主Nuxt后端；列出权限、局部错误与缓存差异。

验收：

- [ ] 字段为null时不会直接解引用崩溃，局部错误与HTTP错误分清。
- [ ] 选型理由指向实际请求/团队需求，明确本轮未运行GraphQL服务器。

[理论](../../1-notes/05-fullstack-auth/5.4-data-protocols/5.4.5.graphql-rest.md) · [示例](../../2-examples/05-fullstack-auth/5.4-data-protocols/5.4.5.graphql-rest-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.4-data-protocols/5.4.5.graphql-rest.md)

<a id="p-5-4-6"></a>

## 5.4.6 gRPC-Web与Protobuf：生成代码、代理与RPC状态（选修）

在独立方案文档中对照资料库REST读取与gRPC-Web链路，列出新增工具/代理和错误契约；主项目保持现有实现。

验收：

- [ ] 能指出.proto/生成客户端/代理/真实服务各缺一层的失败位置，HTTP200不直接当RPC OK。
- [ ] 没有重用字段编号；明确本轮未生成客户端或运行gRPC服务。

[理论](../../1-notes/05-fullstack-auth/5.4-data-protocols/5.4.6.grpc-protobuf-web-grpc-web.md) · [示例](../../2-examples/05-fullstack-auth/5.4-data-protocols/5.4.6.grpc-protobuf-web-grpc-web-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.4-data-protocols/5.4.6.grpc-protobuf-web-grpc-web.md)

<a id="p-5-5-1"></a>

## 5.5.1 原生WebSocket：连接状态、消息、心跳与重连

Nuxt主工程目前没有实时连接；在本独立lab或Nuxt副本新增连接所有者与清理，验证停止、重连预算和错误反馈，不虚构已有推送。

验收：

- [ ] 真实连接能收发，断线重试有预算，手动stop后不再重连且监听/计时器释放。
- [ ] 区分一次app级ping/pong与定时心跳、业务确认；未知帧和超额发送有处理路径。

[理论](../../1-notes/05-fullstack-auth/5.5-realtime/5.5.1.websocket.md) · [示例](../../2-examples/05-fullstack-auth/5.5-realtime/5.5.1.websocket-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.5-realtime/5.5.1.websocket.md)

<a id="p-5-5-2"></a>

## 5.5.2 Socket.IO与原生WebSocket封装的选择

在独立Socket.IO实验做协议与ack观察；如Nuxt宿主未来采用，先定义服务器事件/身份/重连恢复契约，不把当前Cookie登录直接当已完成socket授权。

验收：

- [ ] 客户端与服务器协议/版本匹配，能够真实收发事件与ack并主动断开。
- [ ] 不把ack、自动重连或库名当业务事务持久化/恰好一次保证。

[理论](../../1-notes/05-fullstack-auth/5.5-realtime/5.5.2.socket.io.md) · [示例](../../2-examples/05-fullstack-auth/5.5-realtime/5.5.2.socket.io-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.5-realtime/5.5.2.socket.io.md)

<a id="p-5-5-3"></a>

## 5.5.3 SSE：事件流、Last-Event-ID与停止重连

Nuxt主工程暂无实时推送；在独立SSE实验验证id恢复和清理，再为宿主副本定义单向事件、认证与历史窗口，明确新增能力。

验收：

- [ ] 服务端记录Last-Event-ID:1，客户端收到1/2并去重，显式close后无新连接。
- [ ] 能说明断线窗口超出历史时的恢复方法，客户端提交另走明确HTTP接口。

[理论](../../1-notes/05-fullstack-auth/5.5-realtime/5.5.3.server-sent-events-sse.md) · [示例](../../2-examples/05-fullstack-auth/5.5-realtime/5.5.3.server-sent-events-sse-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.5-realtime/5.5.3.server-sent-events-sse.md)

<a id="p-5-5-4"></a>

## 5.5.4 移动经验迁移：连接、生命周期与系统推送不同

为Nuxt宿主副本新增实时功能前写移动到Web迁移清单，复用lab停止/重连证据；不要声称现有主工程已实现系统推送。

验收：

- [ ] 每条迁移类比说明平台差异，不把Web连接称系统后台推送。
- [ ] 页面停止/退出和重连预算有可复现证据，恢复时按契约重新同步而非盲信旧消息。

[理论](../../1-notes/05-fullstack-auth/5.5-realtime/5.5.4.websocket-sse.md) · [示例](../../2-examples/05-fullstack-auth/5.5-realtime/5.5.4.websocket-sse-demo.md) · [独立练习](../../3-exercises/05-fullstack-auth/5.5-realtime/5.5.4.websocket-sse.md)
