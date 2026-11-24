# React选修：明确类型的官方观察清单

用于4.2.4.2–4.2.4.4。日期2026-11-24。**本页是可操作观察任务，不能当作已安装库或已部署Next的证据。** 共享Vite lab只真实运行CSS Modules、React核心/Router/表单和纯数据工具；学习者在独立副本按需接入一个候选即可，不要求全装。

## 4.2.4.2 同一需求比较三种组件方案

需求：任务编辑表单有标签、错误、禁用/提交中和一个选择控件，桌面和手机键盘/触控都可操作。

| 候选 | 官方阅读入口 | 要实际记录什么 |
| --- | --- | --- |
| Ant Design | [说明](https://ant.design/docs/react/introduce/) | 文档版本、表单与选择控件契约、主题、目标React/SSR支持、必要附加依赖 |
| MUI | [说明](https://mui.com/material-ui/getting-started/) | 同一控件value/change、主题与SSR样式注入条件、免费/附加组件边界 |
| shadcn/ui | [说明](https://ui.shadcn.com/docs) | 组件源码进入项目后的维护归属、所用底层实现、升级diff与样式依赖 |

1. 在官方文档中定位一个候选的表单/选择控件，不只看首页截图。
2. 把value、onChange、disabled、错误关联映射到同一需求，列出不兼容处。
3. 在自己的独立分支选择一套做最小表单，再验证Tab/Space/Enter、label、错误反馈、390px和缩放。若仅阅读，写“未接入/未测”，不填通过。
4. 检查安装和生成命令会改哪些文件；不在当前学习仓库执行三套初始化器。保留保持原生控件的备选理由。

验收：选择有具体约束依据；能说明源码分发与npm组件库维护方式的差异。官网没有说明的能力标为待验证，不自行推断“全支持”。

## 4.2.4.3 样式策略对照

- 已实现：`react-lab/src/Card.module.css` → `App.tsx`类名映射 → `pnpm build`真实CSS → `pnpm verify:artifacts`检查生成类。
- [Styled Components](https://styled-components.com/docs/basics)：观察目标稳定版本，不把官网可能展示的alpha方案直接引入。记录组件样式、动态props、SSR注入/编译条件和测试代价；本轮未安装。
- [Tailwind工具类](https://tailwindcss.com/docs/styling-with-utility-classes)：阅读完整类名扫描、响应式/状态前缀和主题；React分支未装，主线4.4另有真实实践。不要用`'bg-'+color`并假设扫描器自动枚举所有值。

变体：把CSS Module `.card`改成`.readingCard`但故意保留旧消费名，观察样式丢失；同步更名后检查DOM/产物。Vite的通用`.module.css`类型通常不保证每个具体类名的拼写，所以“tsc通过”不能代替样式观察。

验收：可指出构建后生成类及实际消费；能说明CSS Modules仍受层叠/继承影响，并如实区分其他方案未运行。

## 4.2.4.4 Next App Router目录与请求追踪

按[Next官方App Router文档](https://nextjs.org/docs/app/getting-started/server-and-client-components)阅读；本文未安装Next，没有把下面目录作为已构建项目。

```text
app/
├── layout.tsx              根布局（提供html/body）
├── page.tsx                首页
├── tasks/[id]/page.tsx     动态详情
└── api/tasks/route.ts      导出GET/POST等Route Handler
```

1. 对照Nuxt主工程指出页面、布局、参数、HTTP入口分别在哪里，不能混用Pages Router的`pages/api`写法。
2. 找一个需要state/事件的最小客户端卡片，说明`'use client'`边界及其导入影响；把服务端秘密留服务端，不因为组件能渲染就认为秘密不会进客户端包。
3. 追踪首次请求的HTML、后续导航和数据请求；缓存/静态生成/SSR需结合目标版本配置判断，不能仅看目录图给结论。
4. 在独立副本真正建Next前再核对registry、Node范围和目标版本官方安装说明；未执行安装/build/start时保留“未运行”。

验收：目录与运行边界解释正确，能指出服务端输入校验/授权位置；没有用React Vite测试结果证明Next的SSR/Route Handlers可用。
