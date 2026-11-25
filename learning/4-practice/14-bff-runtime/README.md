# 阶段14：Nuxt Nitro BFF 与运行时实践

前置：Nuxt请求/状态、HTTP/认证、部署、安全与测试。目标是在真实本地链路中验证“浏览器/SSR → BFF → 两个合成上游”的身份、聚合、错误和契约，而非搭一套生产账号系统。SPA/静态站有合适API时可不加BFF。

## 运行与最小验证

Node26.0.0、pnpm11.4.0；固定Nuxt4.7.0、Nitro2.14.0、Vue3.5.46（实际解析见锁文件）。从本目录运行：

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm test:e2e
```

check执行类型、lint、格式、单元和生产构建。E2E自动启动4561上的生产Nuxt及4567合成上游，结束后关闭；使用已安装的Google Chrome，其他环境通过CHROME_PATH指定可执行路径，或先按Playwright官方说明安装浏览器。本轮仅桌面1440与手机390视口模拟，不是真机/多引擎。

开发交互用两个终端，在本目录分别执行：

```sh
pnpm upstream
pnpm dev
```

打开http://127.0.0.1:4561，先选择公开演示身份，再切换情景并点击“重新获取”。结束两个终端Ctrl+C。不要同时启动开发服务和E2E争用端口；若修改端口，还需同步Nuxt配置的appOrigin、固定上游校验、Playwright和测试URL。

## 实际已实现的链路

- server/middleware/context.ts为每次请求生成traceId，不相信入站伪造身份。
- POST /api/session只选择alice/bob公开fixture，随机SID存于有容量/期限的内存表，HttpOnly/Lax Cookie；它不是生产登录。精确Origin、JSON、字段及256字节保留上限已验证。本地完整排空输入再返回413，未实现慢速/超大网络上传防御；生产必须在入口和读取层限制字节、读时限及速率。
- GET /api/dashboard验证会话后按SID限流，再同时启动profile/items。profile必需、items可选。上游固定127.0.0.1:4567，不接受任意代理URL、不转发入站Cookie/Authorization，不追随重定向；只发送合成服务凭据。
- 250ms上游期限覆盖fetch及JSON正文；profile超时504，无效形状或失败502；items失败200+warnings。请求响应提前close时尝试取消上游；未将该局部监听等同于所有SSR父请求的端到端取消。
- 仅投影公开DTO，私有字段不进JSON/SSR payload；页面用useRequestFetch相对路径+useAsyncData保留SSR身份与hydration数据。双用户HTTP与SSR并发隔离另有真实测试。
- shared/contracts.ts的受限Schema供实际响应校验和GET /api/openapi共用。该OpenAPI3.1.1只描述dashboard，非全接口描述/SDK生成器。生产应采用标准Schema校验器与明确版本策略。

| 情景             | 可观察结果                               |
| ---------------- | ---------------------------------------- |
| 未选择身份       | API401，页面有明确提示                   |
| ok               | 当前用户与自己的推荐                     |
| optional-fail    | HTTP200，用户可见、推荐为空且有warning   |
| timeout          | 必需profile超时504，可换ok重试           |
| invalid / denied | 上游无效数据/拒绝映射502，不返回内部正文 |
| 同SID第21次/60秒 | 429与保守Retry-After:60                  |

本地HTTP不设Secure Cookie；生产HTTPS需Secure及适用的__Host-命名，真正认证、授权、撤销/共享存储和入口限流。Map不是跨实例会话或全局限流，不把公开fixture当安全身份系统。这里统一no-store以便观察私有SSR；生产静态资源应有单独缓存策略。

## 独立实验与选修范围

主项目保持小型REST聚合，以下独立lab展示具体机制；不声称它们已经集成进主BFF。

- [Node调度/背压/Worker/配置/进程](../../2-examples/14-bff-runtime/14.1-node-runtime/node-lab/README.md)
- [HTTP流式、已发送头和取消](../../2-examples/14-bff-runtime/14.3-ssr-runtime/runtime-lab/README.md)
- [Edge可信来源、公开缓存及一致性模型](../../2-examples/14-bff-runtime/14.4-edge-runtime/edge-lab/README.md)
- [真实GraphQL/DataLoader/Apollo和SSE，Redis/迁移模型](../../2-examples/14-bff-runtime/14.5-data-layer/data-lab/README.md)
- [分片恢复、完整性、限时能力和扫描隔离模型](../../2-examples/14-bff-runtime/14.6-file-upload/upload-lab/README.md)

云Edge/KV/D1/CDN、Redis、Prisma迁移、S3/OSS及杀毒没有真实部署；Next、PM2、urql为明确标识的官方观察。Node HTTP数据流不是Nuxt组件HTML Streaming，也未启用MWG volatile OOO HTML能力。需要这些能力时按[29项综合任务](./tasks.md)在隔离副本新增并取自己的证据。

[理论](../../1-notes/14-bff-runtime/README.md) · [示例](../../2-examples/14-bff-runtime/README.md) · [独立练习](../../3-exercises/14-bff-runtime/README.md) · [验收记录](../../../docs/audits/STAGE_14_ACCEPTANCE.md)
