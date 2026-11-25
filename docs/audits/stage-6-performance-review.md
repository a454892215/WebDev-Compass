# 阶段6.1 性能组逐点编写与审查

日期：2026-11-25。范围：17个知识点的理论、示例操作卡、独立练习及综合任务建议。保持原编号，没有为数量增删知识点。本组结论不替代全阶段集成验收。

## 范围、递进与 R01–R09

前置为阶段2–4。先区分实验室与真实用户指标，再按加载、运行时、缓存推进；补齐指标采集边界、隐私、取消清理、图片尺寸、SW白名单和虚拟列表无障碍限制。React只做机制对照，Vue/Nuxt仍是主线。

- R01：17点均有独立理论、操作卡和练习。integration-cases.json逐点列出综合任务及至少两项标准；完整映射及逐点结论见 stage-6-performance-points.json。
- R02：各篇先问题与机制，再说明上下文的最小片段、观察、练习和项目任务；共享lab另有阅读顺序。
- R03：核对MWG、web.dev、Chrome、MDN和Vue官方正文。CWV良好阈值是LCP≤2.5s、INP≤200ms、CLS≤0.1；真实用户按p75判断。原始条目、TBT与正式INP明确区分。
- R04：4项Node测试、生产构建、动态分包和无用纯导出移除产物断言通过；390/1440视口与SW离线共三组浏览器检查通过。HTTP、图片、长任务、Worker、DOM窗口均为真实本地机制。
- R05：每点有动手变体、至少两项具体验收、可复现故障及修复参考；自动化通过不替代学习者掌握。
- R06：主Nuxt工程的动态模块、图片和Worker与独立lab分清；虚拟列表、SW及真实压缩在lab，CDN/HTTP2、自动关键CSS提取和场数据为观察或新增扩展。
- R07：虚拟列表说明DOM外内容、查找、打印、焦点及屏幕阅读边界；第三方替身为本地且用户动作后加载；私有数据不进公开SW缓存。
- R08：已修复并复验计时器接收者导致Illegal invocation、文本换行断言及离线HTML的UTF-8声明。资源检查器由主代理补齐限定Vite publicDir支持，全库172页/641引用为0错；未复制图像迎合检查器。
- R09：逐点路径、机制、练习及项目事实在points.json，运行与未测范围在runtime.json；不改学习勾选，不把AI审阅称真实学习者试学。

## 实际验证与复用边界

最终pnpm install --frozen-lockfile通过。pnpm check默认沙盒禁止loopback监听而报EPERM，按既有本机测试授权升级执行后4项Node测试、Vite构建及产物断言再次通过。固定文本原始125000字节、gzip364、Brotli34；这是高度重复fixture，不是业务压缩比。

浏览器实查动态模块首次点击才加载、本地第三方替身、90ms阻塞及约90–91ms长任务、6×15ms分块、Worker结果、12→1000→12 DOM数量、防抖、ETag条件请求、响应式图片候选和离屏lazy加载。布局读写的单次时长仅记录，不断言任何机器都更快。

两视口在离线页字符集修复前已通过并保存；最后只复跑受影响的SW组，真实断网验证cache-first、network-first更新、离线缓存及导航、旧专有版本清理与其他前缀保留。runtime保留resumedUnaffectedViewportMeasurements=true，没有冒称最后一次重跑全部视口。

Lighthouse 13.6.0只执行一次：移动模拟412×823、CPU4倍、RTT150ms；LCP约925ms、TBT约25ms、CLS0、性能分数1。结果仅代表轻量lab的单次实验，既没有真实用户INP/p75，也没有生产优化保证。最终新增可选print.css、片段说明及静态检查能力未改变已测JS或图片URL，没有重复审计追分。

## 来源核对与限制

实际阅读[MWG performance](https://developer.chrome.com/docs/modern-web-guidance/guides/performance/performance)、[MWG optimize-image-priority](https://developer.chrome.com/docs/modern-web-guidance/guides/performance/optimize-image-priority)、[CWV](https://web.dev/articles/vitals)、[Lighthouse评分](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring)及[Vue性能](https://vuejs.org/guide/best-practices/performance.html)。完整逐点来源在笔记及points.json。

MWG性能正文将no-store阻止bfcache写得过于绝对。按更具体且更新的[Chrome说明](https://developer.chrome.com/docs/web-platform/bfcache-ccns)和[web.dev bfcache](https://web.dev/articles/bfcache)，Chrome自2025起在安全条件下允许部分no-store页进入bfcache；HTTP缓存不能等同bfcache。敏感响应仍依隐私要求配置no-store，不为性能删除保护。

未做生产CDN/HTTP2/TLS部署、自动关键CSS提取、React渲染基准、真实移动设备、其他浏览器或辅助技术认证；没有采集用户或上传遥测。列表lab不构成完整无障碍认证，公开SW也不是完整PWA或私有缓存方案。

自建服务器和浏览器均由finally关闭，专有SW注册和缓存清理；没有第三方压测。node_modules、dist、artifacts、store均忽略。组内修改由主代理统一集成提交。
