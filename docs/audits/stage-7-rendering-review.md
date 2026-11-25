# 阶段7.2渲染与部署逐点审查

日期：2026-11-25；开始07:56:50 UTC。范围7.2.1–7.2.5五点，主线为Nuxt，Next仅选修观察。按AUTHORING版本1 R01–R09逐点审阅，不以本组完成代替整阶段集成。

## 规划、前置与顺序

五点现有规划没有需要另增编号的明显缺口。把产物/profile选择、运行配置公开边界、状态/缓存隔离、静态API限制、真实fallback状态与按版本区分Next缓存模型补入原主题；不扩为第二套完整框架课。

前置阶段3–6。先7.2.1选择产物，再7.2.3实际部署，接着7.2.4接管及7.2.5并发/环境边界；7.2.2不阻塞主线。每点理论有问题、机制、最小上下文片段、观察、误区、移动对照与官方依据。操作卡、独立变体/具体故障/两项标准/参考、integration-cases逐点建议齐备。

## 主工程源码交叉核对

已读取nuxt.config.ts、scripts/build-profile.mjs、static-server.mjs、verify-profiles.mjs、index/account/course详情、SiteFrame、private端点与headers。STAGE7_PROFILE决定ssr/ssg/csr；顺序构建保存artifacts不同目录，不能并发覆盖.output。

首页是shared课程常量的useAsyncData Promise payload，详情同步按slug读取，不能虚称已有默认HTTP fetch。已修订7.2.4练习为SSR副本新增现有/api/catalog读取，再对照useFetch与裸$fetch；静态profile不执行该server端点变体。/account的内嵌读取401会显示匿名说明，不把它自动说成整页HTTP401；/api/private的身份拒绝才是401。

/account与/api/private在routeRules为cache:false/prerender:false并明确private,no-store，static prerender忽略且导航不链接；合成stage7-demo Cookie选择公开Alice/Bob fixture，任何人可伪造，不是真实认证或生产授权。已反馈主代理把匿名/account、非法Cookie加入并发证据，并检查复用详情组件导航未知slug的处理。

runtimeConfig public值会进入payload，privateCanary默认空且server-only声明；输出DTO不可包含其值。Node生产入口不会自动读取开发.env。公开swr端点与私有路径分开，不把HTTP no-store当身份认证或所有缓存层关闭。

## R01–R09分组结论

R01五编号三部分和综合建议完整；R02机制→最小例→变体→项目顺序清楚；R03先MWG性能/安全正文再Nuxt/Next/MDN官方，并区分框架基线/在线新文档；R04已核读主工程真实三profile构建/HTTP/browser证据通过；R05每份练习有不同输入或故障及至少两标准；R06项目已有与SSR副本新增取数明确；R07源代码事实与术语已修订一致；R08必要共享证据已核读通过；R09Next明确观察型，未实装/外部限制单列，状态不提前passed。

## 一手依据与未测边界

先用短英文主题检索Modern Web Guidance并阅读[Performance](https://developer.chrome.com/docs/modern-web-guidance/guides/performance/performance)、[Security](https://developer.chrome.com/docs/modern-web-guidance/guides/security/security)正文，采用资源版本、明确缓存、公开/私有边界；不要机械套用敏感响应公开缓存。MWG的no-store/bfcache绝对表述已由阶段6专项核对更具体Chrome事实，本章不重复该过时结论。

实际阅读Nuxt4的[部署](https://nuxt.com/docs/4.x/getting-started/deployment)、[渲染](https://nuxt.com/docs/4.x/guide/concepts/rendering)、[预渲染](https://nuxt.com/docs/4.x/getting-started/prerendering)、[运行配置](https://nuxt.com/docs/4.x/guide/going-further/runtime-config)、[hydration](https://nuxt.com/docs/4.x/guide/best-practices/hydration)、[数据](https://nuxt.com/docs/4.x/getting-started/data-fetching)、[状态](https://nuxt.com/docs/4.x/getting-started/state-management)，以及Next的Pages getServerSideProps、App Server/Client Components、Caching与Static Export正文。当前Next文档显示16.4.6，Cache Components与Previous Model不同，不以“全部默认缓存/不缓存”代替配置核对。没有安装/运行Next，也未把Server Components输出称秘密。

本组无独立服务器，不复制另一套Nuxt。云平台ISR、CDN、真实Node/Edge生产托管、TLS、生产登录、多浏览器/真机/读屏/学习者试学未验证。共享Nuxt执行与本组核读将分开记录，不把理论或文档观察说成真实部署通过。

## 最终共享运行证据核读

主代理已执行，本组真实读取三构建日志、verify-profiles代码与结果、E2E代码/日志/6项JSON、类型与2项单测日志；不冒充本组重跑。SSR有server入口；SSG无server入口，public有6个HTML和4个_payload.json，首页能找到public-courses键；CSR无server入口，3个HTML壳。6项E2E为三profile各1440/390，原始详情正文与CSR壳区分、首页接管交互/键盘、链接/刷新、版本与metadata、axe与溢出、已知/未知路由均按契约通过，0fail/0skip。

profile HTTP组真实验证公开Node运行配置、health、合成私有标记未进入首页HTML、Alice/Bob/匿名/非法Cookie四并发不串用、匿名API401；静态输出无私有页/标记且API/JS404；SSG未知路由404，CSR文档fallback200再由应用显示404，未把二者状态说成一样。主页面数据为shared常量，零API不是HTTP去重基准。server-only标记排除只覆盖已声明响应/扫描，不声称未知秘密全无。

详情复用未知slug已增加watch并在构建前保存；本轮E2E直接导航未知路径，未另做该watch的单独故障注入。SSR副本裸$fetch变体是学习者任务，未冒充已跑。Next、ISR/CDN/Edge、生产身份与公网部署仍未实装。五点现均passed，无本组必达遗留，公共索引/契约/任务/总验收由主代理集成。
