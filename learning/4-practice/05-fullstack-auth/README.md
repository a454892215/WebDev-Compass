# 阶段5综合实践：Nuxt接口、会话与私人笔记

前置：阶段4能运行Vue/Nuxt工程，知道组件、SSR、payload与运行配置。本项目把请求/数据契约、Cookie会话、CSRF、对象授权和SSR隐私放进同一个小应用；不是直接可部署的生产身份系统。主线先5.1读取生命周期→5.4数据→5.2会话与授权，再按需读跨源/实时、第三方登录和协议选修。

## 运行与检查

在本目录执行，沿用已验证的Nuxt4.7.0、Vue3.5.46、TS6.0.3与pnpm11.4.0固定基线，不改阶段4工程。实际Node26.0.0；项目支持24.15+的24主线或26+。

```bash
cd learning/4-practice/05-fullstack-auth
pnpm install --frozen-lockfile
pnpm dev
# http://127.0.0.1:4400/
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test
pnpm build
HOST=127.0.0.1 PORT=4400 pnpm preview
# 停止手动服务后，再运行：
pnpm test:e2e
```

pnpm check组合类型、lint、格式、单元测试和build；浏览器另外运行。测试启动器用uncaughtExceptionMonitor记录服务端意外异常，teardown非空即失败；413响应正确也不能掩盖后台异常。Playwright使用本机Chrome或CHROME_PATH，不自动下载浏览器。首次安装需要npm注册表；依赖和pnpm11策略在锁文件/YAML，esbuild脚本选择false后实际prepare/build可用，不能当作所有平台通用禁脚本建议。

本项目只做Node SSR，不做SSG或共享SWR/ISR个人页缓存。生产模式也必须限制在loopback启动教学服务。不要在真实账号系统部署本项目：账号选择器、/api/lab/expire、内存store和HTTP Cookie配置都是明确教学设计。

## 从哪里开始读代码

| 顺序 | 文件                             | 核心问题                                              |
| ---- | -------------------------------- | ----------------------------------------------------- |
| 1    | shared/utils/contracts.ts        | unknown解码、DTO复制/字段、分页和标题校验             |
| 2    | server/utils/session-store.ts    | 32字节随机opaque ID、15分钟过期、轮换/撤销、200条容量 |
| 3    | server/utils/auth.ts             | 固定Origin、session-bound CSRF、Cookie属性、认证检查  |
| 4    | server/utils/note-store.ts       | owner/admin授权、稳定分页、幂等重放与版本写入         |
| 5    | server/api/                      | 真实HTTP状态/限额/协议，接口不依赖前端隐藏按钮        |
| 6    | app/composables/useLabSession.ts | 同key一致default、SSR当前请求会话读取                 |
| 7    | app/pages/index.vue              | 状态/错误/失效反馈、退出清理、会话代次与迟到结果保护  |

## 已有能力与精确协议

**本地会话流程：**

1. GET /api/session只读，返回`{ user, csrfToken }`，匿名/过期为`user:null`。SSR读取已有Cookie并恢复当前身份，缺Cookie不创建匿名会话，也不假定内部API的Set-Cookie能自动送达页面浏览器。
2. 浏览器挂载后POST /api/session/bootstrap，由固定Origin与JSON类型检查创建匿名HttpOnly Cookie及CSRF token。此接口不授予身份，不作为登录替代；仅解决本地匿名初始化。
3. POST /api/login提交公开fixture选择`demoUser: alice / bob / admin`，必须带当前session的X-CSRF-Token及合法Origin。服务端从固定表决定角色，忽略请求伪造role；成功创建新SID/CSRF，撤销旧SID并发送Cookie。
4. 退出POST /api/logout撤销服务端会话并精确删除Cookie，客户端清理notes/admin数据和未完成读取。请求失败会明确提示服务端撤销未确认，不以只清界面冒充退出成功。
5. /api/lab/expire是本地教学过期按钮；受保护接口对过期会话401，页面清除私人数据并恢复匿名初始化，不自动重放写操作。会话代次、CSRF与主体共同拦截旧结果，包括退出后重新登录同一账号；Nuxt signal用于取消读取，取消不保证服务器回滚。

Cookie名compass_stage5_sid，HttpOnly、SameSite=Lax、Path=/、不设Domain。**本地HTTP所以Secure=false，生产必须按HTTPS配置Secure并评估__Host-前缀等要求**。HttpOnly只限制直接读，不阻止同源恶意脚本发请求；SameSite也不能替代CSRF。演示不做真实密码、MFA、限流、持久化、会话审计或生产密钥管理。

**私人笔记与写入：**

- GET /api/notes需登录；q单字符串，page为1–1000，pageSize为1–20（UI每页2）。返回`{ items, page, pageSize, total }`，项目Note字段为id/ownerId/title/version。按title和id稳定排序；offset分页仍可能受并发写影响，不声称实时快照游标。
- alice只能访问自己的a系列，bob只能访问b系列；admin能访问全部。对象不存在与非owner读取均404；/api/admin对普通读者403，匿名401。菜单/中间件只负责体验，直接API也独立检查。
- POST /api/notes需要会话/Origin/CSRF和Idempotency-Key。首次201，相同主体+键+规范化标题重放200且同id，变更标题同键409。客户端不自动重试POST；未确认时保留同一次提交的键。该内存示例仅演示有限重放，不保证生产数据库事务与跨实例幂等。
- GET单条返回ETag；PATCH需要If-Match，缺失428、旧版本412。主体授权先于读取/改写；成功增加version并返回新ETag。没有删除接口；删除属于练习扩展。
- JSON入口按流限制4096字节，再解析/校验unknown；共用Node流读取器超限时停止缓冲并排空，保留连接完成413响应，不在提前退出时销毁socket；文本标题采用JS字符串长度1–80，不是完整Unicode字素计数。客户端TS类型与HTML required不能代替服务端验证。

**文件与下载：**

- POST /api/uploads需要会话/Origin/CSRF，FormData自动生成boundary，不手写Content-Type。Node流式读取总请求最多16KiB，单个file最多4KiB，限定text/plain与有效UTF-8、拒绝额外字段/多个文件。
- 合法返回200 `{ fileName, bytes, saved:false }`，不落盘、不执行、不声称病毒或复杂文件格式扫描。用户MIME/文件名都不可信；当前只回显受限文件名作为文本，不把它拼磁盘路径。
- 下载按钮把**当前页已解码DTO**生成JSON Blob，实际文件名/完成内容已测试，并释放临时对象URL。它不是HTTP文件下载，也没有XHR进度。独立HTTP实验另有合法201/stored:false、1KiB限制和真实XHR进度，不能混用两工程协议。

**SSR与缓存：**

useLabSession统一同key/default factory，useRequestFetch只把当前请求上下文带到可信相对API；不把Cookie转发给任意外部baseURL。个人HTML/API发送private,no-store与Vary:Cookie。payload含当前用户允许看的数据与CSRF，不含SID；backend内存Map按随机SID隔离，不能把它照搬成模块顶层Vue用户ref。

后端store是单进程有界教学数据，重启清空，不适合多实例/serverless持久化。幂等记录最多300条，无生产TTL/事务；不能据此保证支付重试或分布式一致性。读写错误返回HTTP状态，未强制把所有协议包成统一code/data/message。

## 实际验收与独立扩展

- [ ] Cookie确实存在且HttpOnly，document.cookie读不到SID；登录SID变更，旧SID/撤销/过期均失效。
- [ ] 恶意Origin、缺CSRF、伪造role、非owner和匿名请求分别被服务器拒绝。
- [ ] 两用户与匿名直接/并发SSR不串，私有响应不共享缓存，payload无SID。
- [ ] URL筛选/刷新、错误结构解码失败与恢复、过期清理可观察；未确认写入不被无条件重放。
- [ ] 幂等冲突、If-Match、上传总量/单文件/格式和JSON限额有真实失败证据。
- [ ] 两视口上传/下载完成内容、退出后界面清理与无横向溢出通过；不称真机或屏幕阅读器测试。

接着完成[31项综合任务](./tasks.md)。JWT签验/refresh协调在独立认证lab，OAuth/SSO是官方流程观察；CORS、CSP、WS/SSE/Socket.IO在独立网络lab，主工程**没有实时连接或第三方登录**。HTTP/GraphQL/grpc-web等也按各卡片标明运行/观察范围。

依据先读[MWG Security](https://developer.chrome.com/docs/modern-web-guidance/guides/security/security)与[Forms](https://developer.chrome.com/docs/modern-web-guidance/guides/forms/forms)，再核对Nuxt/OWASP/MDN/RFC。完整实际结果与未测范围见[阶段5验收](../../../docs/audits/STAGE_5_ACCEPTANCE.md)。
