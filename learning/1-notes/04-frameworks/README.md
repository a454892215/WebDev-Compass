# 阶段4：Vue 3 + Nuxt应用开发与状态管理

前置：阶段1原生Web、阶段2模块/异步/HTTP和阶段3TypeScript/构建测试。目标：能用组件契约、路由和状态组织小型应用，解释SSR/CSR/SSG与运行环境，定位常见失败。

推荐顺序：4.1 → 4.3.3.1 SFC → 4.3.1模板/响应式/契约/生命周期 → 4.3.1.8侦听清理 → 4.3.2 Router/Pinia → 4.5 Nuxt；4.4按样式需要穿插。4.2为React跨生态选修，不阻塞Vue/Nuxt主线。编号是稳定索引，不要求按数字顺序先读React。

解释机制、场景与边界，再读实验；框架细节以固定版本与官方资料为准。

| 章节 | 知识点 |
| --- | --- |
| [4.1 组件、响应式、路由与表单共通概念](./4.1-framework-concepts/README.md) | 7 |
| [4.2 React/Router/Next跨生态选修](./4.2-react/README.md) | 26 |
| [4.3 Vue 3、Vue Router、Pinia与侦听清理](./4.3-vue/README.md) | 13 |
| [4.4 Tailwind、设计令牌、图标与主题](./4.4-css-ui/README.md) | 4 |
| [4.5 Nuxt路由、SSR数据、状态、配置与元信息](./4.5-nuxt/README.md) | 9 |

本次规划先核对明显遗漏，将watch异步副作用与Nuxt页面元信息补为独立条目，共59点。拆分数量是教学粒度，不是官方规定，调整记录见[规划复核](../../../docs/audits/STAGE_4_PLAN_REVIEW.md)。

[Nuxt资料库综合项目](../../4-practice/04-frameworks/README.md) · [59项综合任务](../../4-practice/04-frameworks/tasks.md) · [阶段4验收](../../../docs/audits/STAGE_4_ACCEPTANCE.md)

后续阶段5深入真实API与认证，阶段6/7深入质量与部署；示例API为本地公开教学数据，不能当生产授权/持久化已完成。实际验证、未实装UI库/Next和真机等边界见各组记录。
