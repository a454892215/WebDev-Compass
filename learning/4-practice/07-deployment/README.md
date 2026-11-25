# 阶段7：Nuxt 三种产物与发布恢复实践

前置：阶段0–6，尤其4.5 Nuxt、5身份/请求边界、6缓存/无障碍/SEO。目标是能解释源码如何成为产物，选择托管模式，验证深链、配置、错误和隔离，并演示回滚。不是另建业务基座或真实上线。

## 先运行一个profile，再比较

在本目录执行。Node要求见package.json；本轮Node26.0.0、pnpm11.4.0，沿用Nuxt4.7.0/Vue3.5.46/TS6.0.3固定锁文件基线。不要在仓库根运行pnpm，也不要并发构建同一项目。

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm build:ssg
pnpm build:csr
pnpm test:profiles
pnpm test:e2e
pnpm format:check
```

三个脚本完成后分别保存artifacts/ssr、artifacts/ssg、artifacts/csr，原.output仍会被下一次构建覆盖。artifacts、依赖、缓存不提交。pnpm workspace显式packages:[.]避免把保存的Node产物package.json识别成新包；verifyDepsBeforeRun:error保留严格校验，失败应显式冻结安装，不自动禁用发布冷却或构建限制。

| profile | 原始HTTP正文           | 托管与启动                                                                       | 公开配置/接口                                      |
| ------- | ---------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------- |
| SSR     | 每请求渲染的课程HTML   | NODE_ENV=production HOST=127.0.0.1 PORT=4507 node artifacts/ssr/server/index.mjs | 声明的NUXT_PUBLIC_*可运行时覆盖；有Node API        |
| SSG     | 生成时课程HTML/payload | PORT=4507 node scripts/static-server.mjs ssg                                     | 配置固化；无Node API；直接未知文档404              |
| CSR     | 壳HTML，JS启动后呈现   | PORT=4507 node scripts/static-server.mjs csr                                     | 配置固化；无Node API；未知文档先壳200，再客户端404 |

上述静态服务器是教学profile验证工具，不是完整生产Nginx/CDN替代品。不使用全局fallback吞掉/api/*或缺失JS；hash资产immutable，HTML需再验证。真实静态站的头/状态由宿主设置，routeRules不会凭空变成任意CDN配置。

## 按源码理解实际能力

1. shared/catalog.ts是公开课程常量。首页useAsyncData返回本地Promise以展示SSR payload，不假装访问真实后端；详情同步查slug，未知值返回404。
2. nuxt.config.ts按STAGE7_PROFILE选择Node/静态及SSR/CSR。静态明确列出公开预渲染路由、不爬私有页；SSG源码有server目录并不意味着上传public后仍能执行它。
3. /account和/api/private仅Node可用。stage7-demo=alice/bob只是公开fixture选择，人人可伪造，**不是认证**。真实会话学习阶段5。本例演示请求内隔离和private/no-store/cache:false/prerender:false；匿名/account HTTP200显示401说明，API本身返回401。
4. /api/health只返回ok和公开release，不证明数据库/全依赖健康。NUXT_PUBLIC_RELEASE_ID/SITE_LABEL可在Node启动时覆盖；privateCanary只作服务器配置占位，不输出。浏览器中的public不是秘密，生成时的环境也不能在静态服务器启动后自动改变。
5. SiteFrame、语义/焦点、原生按钮和逻辑尺寸保证教学导航可操作。测试用后台Chrome桌面/手机视口，不叫真机；axe不等于全部WCAG或真实读屏体验。

## 发布演练与四部分

[理论](../../1-notes/07-deployment/README.md) → [代码与观察](../../2-examples/07-deployment/README.md) → [独立练习](../../3-exercises/07-deployment/README.md) → [29项综合任务](./tasks.md)。

7.1独立release-lab真正演示Nginx、A→B→A、候选健康拒绝、旧hash资源可取、503/恢复与日志隐私；主Nuxt没有内置生产部署器。7.3可选lab演示WebComponent/WASM/SVG/schema边界，不强装桌面壳或全部跨端框架。云托管/Actions/Docker/Next等有明确官方观察类型，未运行远程发布不写已上线。

交付文档：[技术方案](./docs/TECHNICAL_PLAN.md)、[API契约](./docs/API_CONTRACT.md)、[变更记录](./docs/CHANGELOG.md)。7.4用这些真实文件做需求、评审、重构和交接；角色演练不等于已经与真实团队协作。

测试默认4507、4510、4511三个loopback服务，结束自动关闭；已构建三个profile才能运行test:e2e。默认macOS Chrome，其他环境设置CHROME_PATH。无远程业务服务、账号或真实凭据。部署lab使用4508，选修lab4509，不能同时占同一端口。

本轮证据见[阶段验收](../../../docs/audits/STAGE_7_ACCEPTANCE.md)。未验证公网域名/TLS/CDN、远程CI/平台发布、Docker镜像运行、生产监测/负载、真实数据库迁移、跨浏览器、真实设备与辅助技术；不把本地回滚当整个线上系统自动恢复保证。
