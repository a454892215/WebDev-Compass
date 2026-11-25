# 本地发布、健康检查与 Nginx 实验

先学阶段3构建/HTTP与阶段6缓存。目标不是另造部署框架，而是用最少代码真实观察发布时HTML、资源、健康与路由的变化。

```bash
# 仓库根目录，Node26.0.0；无npm依赖
node --test learning/2-examples/07-deployment/7.1-build-deploy/release-lab/verify.mjs
```

Nginx专项使用现有`/opt/homebrew/bin/nginx`（本轮1.31.8），其他路径用NGINX_PATH覆盖。未安装时先独立安装Nginx或只读该项，不把跳过称通过。需要loopback监听；测试不启动系统Nginx服务、不用Docker/Colima。Node监听临时本地端口，独立Nginx4508，临时目录存放配置/日志/fixture，finally清理。

## 四个真实实验

1. `createReleaseLab().stage/activate`建立合成A/B版本，真实HTTP看到A→B→A；内容hash不同、HTML`no-cache`，B上线后A资源仍可取且`immutable`。这是内存版本指针和合成JS，不是Nuxt构建、云发布、多机原子切换或真实动态import浏览器体验。
2. 不健康candidate不能activate，当前版本保持；`setReadiness(false)`使`/health`返回503，恢复后200，健康`no-store`。没有生产编排器/真实依赖探针；不要将此单接口直接当完整liveness/readiness方案。
3. `/assets/missing.js`与`/api/missing`404；请求query/Authorization包含合成标记，日志不含该标记，只记录method/path/status/release/durationMs。生产路径本身也可能有PII，需路由模板/允许列表、采样和保留策略；这里路径均为合成fixture。
4. 真实Nginx`-t`后前台子进程监听4508：页面深链返回SPA壳，assets和API缺失保持404，`/api/status`代理至Node，hash文本资源实际gzip编码、Vary:Accept-Encoding且解码不变。gzip高度重复fixture不代表业务压缩比；壳没装Vue，框架导航由主工程另测。

测试断言真实HTTP状态、头、正文与记录，不用事先编造日志。Nginx临时配置只有本地HTTP，未做TLS、HTTP/2/CDN、生产转发链或高负载。本轮四组真实通过记录见[运行证据](../../../../../docs/audits/stage-7-deployment-runtime.json)。

## 模板与观察

- `templates/Dockerfile.example`与`.dockerignore.example`：复制到独立Nuxt工程合适位置，以主阶段7工程为context。多阶段只将`artifacts/ssr`复制到非root运行层；构建/运行镜像tag教学固定，生产另审核digest/平台并更新。真实秘密运行时注入，不作为ARG/镜像ENV；模板未构建或启动。
- `templates/quality.yml.example`：主仓库路径版CI门禁。两个Action SHA来自本轮官方GitHub refs/v6 API（完整SHA），非自行猜测；固定不等于已审计全部Action代码。未放入`.github/workflows`、未推送/远端执行。它只验证，不含真实账户部署、凭据、环境保护或产物上传；CD为明确后续扩展。
- 官方平台核对：静态/SSR适配器、输出目录、子路径、404、环境、回滚各项；不登录真实Vercel/Netlify/GitHub/Cloudflare账户。

## 阅读顺序

先server.mjs看版本/缓存/健康，再verify.mjs看真实输入与失败路径；再按[9点操作卡](../README.md)完成独立变体，最后应用到[主Nuxt三个profile](../../../../4-practice/07-deployment/README.md)。不把本lab的教学指针切换写成主Nuxt已经实现零停机发布。

Docker可选后续验证（本轮未执行）：将模板复制到独立Nuxt工程并配置.dockerignore后，在该工程上下文构建；运行时访问`/api/health`、`/courses/nuxt`，检查非root与SIGTERM停止，不向教学仓库写入真实私密环境值。
