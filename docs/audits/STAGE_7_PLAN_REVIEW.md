# 阶段7规划复核

2026-11-25，读者已有多年移动开发经验，已学浏览器、TS、Vue/Nuxt、API与基本质量。本阶段目标是把可运行源码变成可解释、可部署、可恢复的产物，不重新教授一遍Vue或强迫安装所有选修工具。

原27点：7.1部署7、7.2渲染5、7.3业务选修9、7.4协作6。按学习路径“首次交付”验收复核，有两个明显缺口：健康/版本与最小监测没有承接条目；标题承诺回滚却缺不可变产物、旧资源保留和实际恢复练习。补7.1.8、7.1.9，合计29。其它细节落入已有知识点，保留旧编号、路径和学习勾选。

推荐顺序：先7.2.1理解渲染/托管关系，再7.1.1/4产物与配置；7.1.2/3/5按选定托管验证深链；7.2.3–5验证Nuxt请求/状态/payload；7.1.7–9验证门禁、监测与回滚；7.4贯穿方案、审查与交接。7.1.6容器可理解而不强装；7.2.2 Next和7.3九点均为选修，不阻塞首次Vue/Nuxt交付。

实际先搜索MWG deploy web applications，目录未给出Nuxt/云厂商专属部署教程；阅读[Performance](https://developer.chrome.com/docs/modern-web-guidance/guides/performance/performance)与[Security](https://developer.chrome.com/docs/modern-web-guidance/guides/security/security)正文，采用版本化资源、缓存边界、现状发现、分步发布与报告隐私；Nuxt实现再核对[部署](https://nuxt.com/docs/4.x/getting-started/deployment)、[渲染](https://nuxt.com/docs/4.x/guide/concepts/rendering)、[预渲染](https://nuxt.com/docs/4.x/getting-started/prerendering)、[运行配置](https://nuxt.com/docs/4.x/guide/going-further/runtime-config)。不把指南通用建议直接套所有路由或隐私数据。

基线继续使用Nuxt4.7.0/Vue3.5.46/TS6.0.3/Node26/pnpm11.4锁文件，不为一章教学升级整套工具。Node生产明确NODE_ENV=production，生成产物.output/public与Node server入口不同；相同源码依次构建并保存artifacts各profile。静态无Node运行时/真实私有接口，ISR受适配器平台影响，不保证所有主机支持。

7.4核对HTTP RFC与Google工程评审原文、OpenAPI和Keep a Changelog，区分协议规范/团队选择/文档惯例。业务选修核对各官方资料，真实轻量本地机制与未安装的Electron/Tauri/Expo/远程GraphQL等明确分开。

验证以最小充分为准：真正构建/HTTP/后台Chrome、Nginx独立loopback、A/B回滚、原生组件/WASM等。没有公网厂商账号、远程Actions运行、Docker daemon/Colima重建、真实读屏/真机、生产流量与数据库迁移，不能写已上线或完整生产认证。四部分、逐点事实与R01–R09分别验收，不用文件数代替教学质量。
