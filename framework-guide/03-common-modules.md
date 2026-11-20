# 公共模块契约与宿主扩展

返回[模块入口](./README.md)。本文件定义待实现的公共行为与验证边界。接口名用于表达契约，实现阶段可按 Nuxt 已验证版本调整并记录变更。

## 模块与归属

| 模块 | 基座首版职责 | 宿主职责 | 首版关键验收 |
| --- | --- | --- | --- |
| HTTP | 请求工厂、取消/超时、错误分类、请求身份 | baseURL、协议解码、凭据、业务 API | 成功、空响应、错误、取消和并发均可区分 |
| 认证接入 | 会话接口、变更通知、请求归属 | Cookie/Bearer 方案、登录/退出、页面跳转 | 账号切换后旧响应不写入新状态 |
| 配置 | 配置 schema、默认值和启动校验 | 环境、站点、语言与部署 profile | 必填配置缺失时输出可定位诊断 |
| 状态 | 请求状态与分页等可复用 composables | 页面状态、业务 store 和领域模型 | 独立组件、应用和 SSR 请求之间隔离 |
| 存储 | adapter 契约、版本化值、解析失败行为 | 是否启用及保存哪些非敏感值 | 服务端与浏览器生命周期明确 |
| 日志 | level、错误摘要、脱敏与可替换 sink | 采集服务、用户提示、保留策略 | 凭据和原始认证头不进入输出 |
| UI 基础 | 主题 token 约定、空/错/加载状态契约 | 品牌、布局、导航、反馈组件 | 两端可各自覆盖，无 CSS 互相污染 |
| 开发工具 | 规则、检查、同步、任务恢复和模板生成 | 项目事实、应用根和允许修改范围 | 干净宿主可重复运行且无误覆盖 |

## HTTP 和数据获取

首版使用 Nuxt 自带的 $fetch/ofetch 体系。页面初始数据由 useFetch/useAsyncData 管理，用户触发的提交操作由宿主 API 函数调用客户端。原生工具已提供的行为优先复用，基础封装负责统一契约。

Nuxt 文档说明，直接在组件 setup 中调用 $fetch 可能在服务端与 hydration 时重复获取。页面适配必须正确使用 Nuxt 的数据获取生命周期，避免在自定义 composable 中提前 await 而破坏调用约定。 [数据获取](https://nuxt.com/docs/4.x/getting-started/data-fetching) · [自定义 fetcher](https://nuxt.com/docs/4.x/guide/recipes/custom-usefetch)

~~~typescript
type BaseApiErrorKind =
  | 'network'
  | 'http'
  | 'timeout'
  | 'cancelled'
  | 'unauthorized'
  | 'business'
  | 'decode'

interface RequestIdentity {
  requestId: string
  sessionRevision: number
  queryRevision?: number
}

interface ProtocolDecoder {
  decode<T>(body: unknown, decodeData: (value: unknown) => T): T
}
~~~

以上仅示意类型边界。实现时 API 成功返回声明类型，失败抛出带 kind、status、safeMessage、traceId 等可用字段的 BaseApiError。连接失败归 network，一般非成功 HTTP 状态归 http，满足宿主认证失效契约时归 unauthorized，成功传输后的业务码失败归 business。取消保持可识别，页面通常不提示。204 等无内容响应按 API 的 void 契约处理，JSON 解析失败属于 decode 错误。

宿主解码器接收未知输入，验证业务码、数据结构和空值语义。TypeScript 泛型只提供静态约束，不能证明网络数据形状正确。需要运行校验的接口在宿主采用 schema 或显式解析函数，基座不固定某个后端的 code/data/message 字段。

HTTP 配置应包含可替换 fetcher、目标来源、超时、协议适配、凭据提供器和日志接口。基座不在传输层直接弹 toast、跳页面或清空业务 store，认证事件由宿主组合根绑定处理。

### 重试与并发

- 默认不透明重试写操作。读取重试由 API 策略显式开启，写操作需要后端幂等契约才能安全重试，并核对 ofetch 的内置默认值。
- 接收 AbortSignal，页面离开、查询变化和退出时可取消请求。即使取消来不及，响应写回前仍核对 queryRevision 与 sessionRevision。
- loading/error 归属于当前请求，旧请求 finally 不得覆盖新请求状态。分页切换与搜索同时发生时有明确提交策略。
- 若宿主启用 token 刷新，同一会话内使用 single-flight 合并刷新，限制重放次数。退出时使刷新失效，失败后终止等待请求。
- 幂等键、缓存键与请求去重键由接口语义决定，不能把不同请求体或不同账号的请求合并。

## SSR、认证与缓存

有状态客户端、会话和刷新队列按 Nuxt 应用/SSR 请求创建。模块顶层可共享纯函数和不可变配置。SSR 客户端不能把用户 token 写入全局 ofetch defaults，不能把用户数据放进无隔离的模块级 ref 或 Map。 [Nuxt 状态管理](https://nuxt.com/docs/4.x/getting-started/state-management)

首个宿主必须选择认证 profile，并在 ADR 记录。

| Profile | 接入约定 | 需要验证的场景 |
| --- | --- | --- |
| 同源 HttpOnly Cookie/BFF | 浏览器凭据由 Cookie 管理，服务端按可信来源转发需要的字段 | Cookie 属性、CSRF、退出失效、SSR 页面请求 |
| 外部 API/Bearer | 宿主提供获取与刷新凭据的接口，说明内存/持久化策略 | CORS、刷新并发、过期恢复、账号切换 |

认证必须依据真实后端契约选择。前端路由守卫用于导航体验，业务权限由后端验证。SSR 只向声明的可信 API 来源转发必要凭据，避免把整个浏览器请求头无差别转发至第三方。

SSR 刷新上游 Cookie 会话时，服务端认证适配器需将允许的 Set-Cookie 传播到当前浏览器响应，保留多个 Cookie 并核对 Domain、Path、Secure 等属性。客户端刷新走浏览器自己的响应通道。刷新凭据轮换时，同一会话可能并发多个 SSR 请求，逐请求 single-flight 只合并本次上下文内的刷新；跨请求竞争由后端轮换/幂等契约或明确的服务端协调机制解决，并以专项测试确认。

useState、Pinia、useAsyncData 的序列化数据只放允许浏览器获取的内容，刷新凭据与服务端秘密不进入 payload。用户数据获取 key 要能区分账号与查询，在退出或换号时清理相关客户端缓存。对带认证内容的 SSR 页面默认不启用共享公开缓存，确有需求时验证缓存隔离键与响应策略。

基座验收用同进程并发用户 A/B、A 退出后 B 登录、旧请求迟到等测试证明确实隔离。单独启动两次进程各请求一次不足以覆盖跨请求污染。

## 配置与运行环境

- nuxt.config 管理构建和模块配置，runtimeConfig 管理声明过的运行配置，public 下的字段属于客户端可见配置。
- Node SSR 使用部署环境覆盖运行配置。静态产物需要在构建时注入公开配置，或另行实现并验证公开配置加载，不能假定修改服务端环境变量就能改变已生成 JS。
- .env.example 只保存字段名称和安全样例，业务凭据由宿主部署环境提供。hostRoot、规则版本和应用目录写入独立工具绑定配置。
- 浏览器存储和 DOM 访问通过 .client 插件、生命周期或 import.meta.client 边界使用。服务端按需有独立 adapter，缺少客户端存储时有明确默认值。

配置公开范围遵循 Nuxt 的 runtimeConfig 机制。 [运行配置](https://nuxt.com/docs/4.x/api/composables/use-runtime-config)

## UI、状态与扩展

桌面与手机分别绑定 FeedbackAdapter、AuthNavigation 和 ThemeConfig。业务错误以普通文本呈现，未知错误的安全提示由宿主国际化层选择。日志保留 traceId 等可定位信息，避免将服务端堆栈直接展示给用户。

局部 ref/reactive 放在页面或 composable 生命周期中，跨页面状态按 Nuxt useState/可选 Pinia 建模。领域规则是纯 TypeScript 函数，简单 API→composable 路径可以直接使用，存在真实缓存、聚合或复杂业务时再增加 repository/use case。

基础 CSS token 限于语义颜色、字体、间距与状态，应用决定具体值和组件库映射。组件样式使用作用域与明确的级联层，库自身 reset 与宿主主题由应用控制。语义 HTML、键盘焦点、浏览器缩放和动态视口属于两端共同要求。 [CSS 架构](https://developer.chrome.com/docs/modern-web-guidance/guides/css/css) · [HTML](https://developer.chrome.com/docs/modern-web-guidance/guides/html/html)

国际化、监控、PWA 和 WebView bridge 通过可选适配扩展。通用基座提供稳定扩展点，业务包决定实现。每个扩展记录客户端/服务端支持范围、依赖体积与验证场景。
