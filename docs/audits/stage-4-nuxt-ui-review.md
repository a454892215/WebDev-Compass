# 阶段4.4–4.5编写与逐点审查

日期：2026-11-24；本组开始16:15:49 UTC。按AUTHORING R01–R09，范围为UI基础4点与Nuxt9点，共13点。各点均已写理论、真实工程操作卡、独立变体/故障/标准，以及综合任务建议。最终全阶段契约、跨组衔接与提交由主代理统一执行。

## 规划与递进

原4.5缺少应用最基本的路由标题/元信息，新增4.5.9 useHead/useSeoMeta；深入SEO保留阶段6，不重复整套SEO课程。现有4.5.3补充key一致性、payload与取消边界，4.5.7补调用上下文。4.4补语义令牌、装饰/信息图标与SSR初始主题一致性，不再增加宽泛条目。

Nuxt先Vue基础、文件装配与页面，再渲染/数据/状态/配置/服务端，最后复用与失败边界、页面元信息；4.4按产品需要选读。四部分不是同一标题复制：操作卡指定源码与真实观察，练习改变输入/故障，综合任务区分现有实现与副本新增。

## 逐点审查事实

| 知识点 | 机制、实际示例及练习检查 |
| --- | --- |
| 4.4.1 | Tailwind4.3.5 CLI真实生成工具类、md断点与token；完整类名扫描不执行运行时拼接；练习增加断点/映射，故障为拼接类未生成。 |
| 4.4.2 | 语义令牌消费与主题覆盖，组件规范包含焦点/状态；故障为硬编码背景造成两主题不匹配。 |
| 4.4.3 | 内联currentColor与外部img继承不同；装饰隐藏、信息图title、纯图标按钮动作名称；练习移除名称再修正，不强装Lucide/Heroicons。 |
| 4.4.4 | system/light/dark模型、meta与CSS一致、重置删除覆盖、无JS系统回退；本例不持久化，Nuxt持久化作为副本扩展，避免假称已测SSR主题。 |
| 4.5.1 | Nuxt4 app/目录、NuxtLayout/NuxtPage、动态参数与API分层；原生search在当前Vue编译器需显式识别，不能只看浏览器支持；练习缺渲染出口后修复。 |
| 4.5.2 | 默认动态SSR、client-demo CSR与独立generate静态只读对照；初始HTML/浏览器/静态产物分开；故障为SSR直接读localStorage。 |
| 4.5.3 | useFetch/useAsyncData payload、状态、key一致、事件提交；额外真实vue-tsc验证handler signal正例与数字signal TS2322；没有虚称主工程已有取消按钮或运行取消。 |
| 4.5.4 | useState请求上下文、同key本应用共享、readonly消费与toggle、公开seed隔离；顶层可变单例反例不当用户认证，持久化不假称已有。 |
| 4.5.5 | public.courseLabel与privateDemoLabel教学占位分开，匹配NUXT_变量；构建Node服务不自动读.env；config端点只回公开字段/布尔值，真实秘密须空默认+环境注入。 |
| 4.5.6 | GET公开fixtures、query类型、未知资源404、POST unknown校验title1–60且saved:false；校验/认证/授权/持久化分别说明，不能把API演示称完整后端。 |
| 4.5.7 | 应用插件formatCategory、请求内composable、本地构建module与Layer徽章各有源文件；上下文与执行时机分别核对，本地扩展不等同版本发布。 |
| 4.5.8 | about具名study notice规则与不循环目标、未知页/详情404、error.vue恢复；路由中间件不等同Nitro请求或后端授权。 |
| 4.5.9 | 原始SSR title/description和参数/客户端导航更新分别观察；不靠onMounted改document冒充SSR元信息，不承诺搜索排名。 |

完整路径及更具体的练习/综合边界见[points JSON](./stage-4-nuxt-ui-points.json)。

## 已完成的独立运行

theme-lab冻结安装、真实CLI构建、脚本语法通过；后台Chrome390/1440两视口与无JS深色共3组通过。核对真实列数、系统浅深/手动覆盖/恢复system、品牌文字颜色、装饰与命名图标、按钮状态、无溢出/pageerror。第一次深色品牌色仍固定蓝，修正语义覆盖并专项复验。未做屏幕阅读器或完整键盘认证。

pnpm默认安装报告@parcel/watcher脚本被拒绝，本独立fixture显式YAML ignoreScripts:true后冻结安装与预编译CLI实际构建通过；没有全局关保护，不保证所有平台相同。pnpm专有设置不再放旧式.npmrc。

额外contracts实验依赖综合工程已prepare的Nuxt4.7上下文，实际vue-tsc接受响应式key、handler signal和dedupe；临时负例把signal变数字，真实TS2322，临时目录finally删除。这里只是类型契约证据，不替代Nuxt运行取消、网络中止或后端回滚实测。

HTML资源检查本组时刻为162页、612本地引用、零错误；git diff --check通过。自建4306服务器及Chrome已关闭，没有暂存/提交。

## Nuxt集成运行结果

主代理已实际完成Nuxt typecheck、ESLint、11个Vitest、node-server构建、两流程×两视口共4项Chrome E2E及static generate。本组读取原始E2E JSON（4 expected/0 unexpected/0 skipped）、实际测试脚本和各命令日志核对，未重复冒充自己执行。SSR资源/public配置、payload复用、key/props/书单、详情参数/标题、q刷新、503恢复、404/400/合法POST、中间件302、CSR对照、四个并发SSR seed隔离均有实际断言。

generate实际输出10路由/产物；主代理核对四个预渲染HTML内容/标题与私有marker未泄露，本组已读取结果JSON。原始静态目录随后为最终SSR回建所替换，本组未重复检查或重跑generate。此静态证据不代表任意query或POST能在静态服务器执行。最终回建SSR后E2E再4项通过，新增description首屏/导航断言和public环境变量覆盖HTML/API验证；原始JSON与最终日志已读，主代理保留完整证据；useAsyncData取消仍仅真实类型契约，不声称运行取消已测。

13点均在上述范围内通过内容/示例/练习审查；完整R01–R09全阶段集成验收仍由主代理执行。

## 依据与未测边界

已先检索并读取MWG [CSS](https://developer.chrome.com/docs/modern-web-guidance/guides/css/css)、[Accessibility](https://developer.chrome.com/docs/modern-web-guidance/guides/accessibility/accessibility)、[Dark mode](https://developer.chrome.com/docs/modern-web-guidance/guides/visual-design/dark-mode)与[Dark mode toggle](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-components/dark-mode-toggle)匹配正文，指导原生语义、主题模型与回退；Nuxt API具体语义另核Nuxt4官方安装/渲染/数据/状态/config/server/plugins/layers/head文档，Tailwind核CLI/检测与theme，图标核W3C功能图像。每点正文附对应官方链接和日期。

未做真机、多浏览器、真实账号/生产后端/部署、实际秘密、真实发布、SSR主题持久化、取消业务回滚、搜索收录或学习者试学。静态视口验证、类型检查与编写质量不表示学习者已经掌握。
