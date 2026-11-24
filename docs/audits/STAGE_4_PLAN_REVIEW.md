# 阶段4规划复核

日期2026-11-24；先核对项目学习路径与R01–R09，再检索Modern Web Guidance并阅读HTML、Forms、Accessibility正文及Vue/Nuxt官方文档。结论：原57点范围总体合理，但需要两项明确补齐与若干现有条目修正；保留原编号、路径和学习勾选，不为增加数字重复设章。

| 缺口/问题 | 调整 | 原因与依据 |
| --- | --- | --- |
| 响应式、派生值、侦听异步清理混在4.3.1.2 | 新增4.3.1.8 watch/watchEffect依赖、竞态、取消和清理；原条目专注ref/reactive/computed及nextTick/composable | [Vue Watchers](https://vuejs.org/guide/essentials/watchers.html)：副作用清理与调用时序需要独立可观察实验 |
| Nuxt基本页面缺少明确标题与元信息任务 | 新增4.5.9 useHead/useSeoMeta，检查SSR与客户端导航 | [Nuxt SEO/Meta](https://nuxt.com/docs/4.x/getting-started/seo-meta)：应用头信息是基本交付，深入SEO仍在阶段6 |
| React选修易使用旧Next API Routes当默认 | 原4.2.4.4明确App Router、Route Handlers、Server/Client Components，旧Pages Router仅对照 | 当前Next官方文档与实际选修实验核对，不让React成为主线先修 |
| 移动类比写成约等于 | 4.1.7明确共通概念与平台差异 | DOM、JS事件与原生控件/Widget的机制不同，不能按名字类推 |
| 容易遗漏的已有主题细节 | 在原条目补充响应式解构/nextTick、路由params复用、组件错误/异步边界、Pinia实例边界、Nuxt context与同key数据选项、主题SSR一致性 | 已有条目可以容纳，不另造重复编号 |

调整后阶段4共59点：共通7、React选修26、Vue13、UI4、Nuxt9。全图585点；这是当前教学粒度，不是官方规定的知识点数量。后续正文与运行中发现问题仍应修正，不以规划具体代替正确性。

推荐顺序：4.1 → 4.3.3.1 SFC → 4.3.1核心（先响应式，再生命周期/契约，再侦听清理）→ 4.3.2路由/状态 → 4.3.3工程选择 → 4.5 Nuxt → 按需4.4样式；4.2整组可跳过。阶段3类型/工程化为前置，阶段5完整认证与阶段7部署为后续。

框架示例按各自技术最佳实践实现，不复制Flutter底层框架；保留与移动经验的对照与非等价边界。主实践用Nuxt4本地资料库，独立Vue与React实验各自固定锁文件；源码与HTTP/浏览器实际结果分别验证。

已读参考：[MWG HTML](https://developer.chrome.com/docs/modern-web-guidance/guides/html/html)、[Forms](https://developer.chrome.com/docs/modern-web-guidance/guides/forms/forms)、[Accessibility](https://developer.chrome.com/docs/modern-web-guidance/guides/accessibility/accessibility)、[Vue Reactivity](https://vuejs.org/guide/essentials/reactivity-fundamentals)、[Nuxt介绍](https://nuxt.com/docs/4.x/getting-started/introduction)、[数据获取](https://nuxt.com/docs/4.x/getting-started/data-fetching)、[状态](https://nuxt.com/docs/4.x/getting-started/state-management)、[分环境tsconfig](https://nuxt.com/docs/4.x/directory-structure/tsconfig)。专属框架API不由MWG直接定义，均按框架官方核对。旧Nuxt guide/directory-structure/app与going-further/modules路径返回404，改用当前directory-structure与[Module Author Guide](https://nuxt.com/docs/4.x/guide/modules)目录，不把失败请求算已读。
