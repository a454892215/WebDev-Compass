# 阶段7.1 构建部署组逐点审查

2026-11-25，开始07:56 UTC左右。范围9点：保留原7路径，新增7.1.8健康/最小监测和7.1.9发布/回滚/旧资源兼容。只负责本组资料与独立lab，不替代主工程、全阶段验收和学习者实践。

## 规划、递进与准确性

推荐先产物→配置→深链→Nginx，再健康/回滚，托管平台/容器/CI按目标选择。没有要求安装Docker、Colima或申请云账户才能完成首次本地闭环。主线仍Nuxt；Vite作产物和部署机制对照。

- 7.1.1：Vite dist、Nuxt Node server/public与SSG/CSR public清楚区分，主工程源码真实脚本build/build:ssg/build:csr按顺序保存artifacts/ssr|ssg|csr。
- 7.1.2：GitHub Pages静态与Vercel/Netlify/Cloudflare适配能力区别；官方观察六列清单，不把四平台全部部署列成已完成。
- 7.1.3：真实Nginx1.31.8临时配置通过-t与HTTP；proxy_pass路径、location、gzip、缓存和缺失资源分别解释。
- 7.1.4：Vite编译变量与Nuxt运行配置、public/private、生产.env行为及静态固化清楚；真实秘密不在源码默认值或日志。
- 7.1.5：合法SPA壳、缺失资源/API404、SSG页面/200.html/404.html与宿主状态分开；合成壳没有冒称Vue导航实测。
- 7.1.6：多阶段Dockerfile、非root/exec CMD/context/.dockerignore、目标平台与digest治理；模板未构建运行，未恢复本地虚拟化。
- 7.1.7：门禁、缓存/产物、可信PR、最小权限、完整SHA及远端未跑；工作流只是quality，不假装已配置CD凭据/审批/产物上传。
- 7.1.8：200/503真实readiness、版本、耗时与日志脱敏；进程/liveness/readiness不同，生产告警和数据保留未部署。
- 7.1.9：真实A→B→A、不健康候选拒绝、旧hash资源保留、HTML no-cache；不等于多副本零停机或数据库回滚。

先检索/读MWG security/performance正文，再读Nuxt/Vite、Nginx、Docker、GitHub、平台官方资料。MWG performance中no-store/bfcache旧绝对表述沿用阶段6更具体事实纠正；HTTP缓存与bfcache区别保留。MWG安全建议按约束渐进部署，不机械给本地HTTP添加无效HSTS或外网上报端点。

## 四部分与 R01–R09

9份理论、9操作卡、9独立练习已逐点读；integration-cases.json有9项具体综合任务和各2标准，points.json保留完整映射、机制、反例、主/独立/扩展边界。独立练习分别改变路由/profile/反代URI/变量/fallback/镜像平台/CI失败/健康/旧chunk，不重复一份通用任务。

R01九编号完整；R02前置/顺序明确；R03以上术语/来源/版本核对；R04真实lab与观察模板分别记录；R05各点变体、失败与修复判据；R06主Nuxt源码核读与独立lab/扩展分明；R07产物入口、状态、缓存和日志一致；R08必要本地专项通过，未测边界明确；R09无自动学习勾选/生产成功声明，正式全阶段契约和索引由主代理集成。

主项目源码已核读nuxt.config.ts、package.json、scripts/build-profile.mjs和verify-profiles.mjs；运行结果由主代理提供，本文不冒称独立重跑三套Nuxt构建。

## 真实运行与问题关闭

Node26.0.0，无npm依赖。Nginx1.31.8在4508、临时前缀、独立前台子进程，无系统服务配置改动。默认沙盒EPERM后按既有授权执行loopback验证，4组真实测试最终通过。之后因修正Nginx文本资源为真实内容hash、给HTTP加2秒超时、固定每请求日志版本、gzip协商补Vary:Accept-Encoding而复验受影响lab，不重复主工程构建。

四组：A/B/A与旧资源；坏候选与健康503/恢复；资产/API404与合成凭据不进日志；真实Nginx静态fallback/API反代/严格404/gzip/访问日志不含query。finally关闭Node/Nginx，临时配置/日志/fixture删除；4508无监听。gzip对象是高度重复合成文本，不推业务压缩比。

官方Action v6 refs通过GitHub API实际读取，类型commit，checkout d23441a48e516b6c34aea4fa41551a30e30af803、setup-node 249970729cb0ef3589644e2896645e5dc5ba9c38；固定来源已核，不等于完整Action源码安全审计。quality.yml.example通过Ruby Psych语法解析，未作为真实Actions执行。Dockerfile仅逐行源审，未作镜像构建声明。

全库HTML资源检查173页644引用0错是本轮当时快照，主代理后续集成会再验。Markdown未来综合入口由主代理创建；本组路径/资源无已知缺失，最后以全库门禁为准。

未测：公网TLS/HTTP2/CDN、四平台实际发布、远端CI/CD、真实Docker镜像、生产告警/负载/真实用户、真实数据库迁移和多机零停机。本组没有暂存/提交，由主代理统一处理。
