# 知识笔记目录

本目录存放 [Web 工程师知识地图](../../KNOWLEDGE_MAP.md)（及 [knowledge-map/](../../knowledge-map/) 分册）中各知识点对应的**详细笔记**。配套可运行代码见 [learning/2-examples/](../2-examples/) 目录。

## 序号与文件命名规范

知识点序号与知识地图中的 checkbox 一一对应，格式为 `{阶段}.{小节}.{子节}.{条目}`：

| 层级 | 示例 | 说明 |
| --- | --- | --- |
| 三级 | `0.2.1` | 小节下无 `####` 子节时 |
| 四级 | `1.1.2.3` | 小节下有 `####` 子节时 |

文件路径规则：

```
learning/1-notes/{阶段目录}/{小节目录}/{序号}.{英文简述}.md
learning/2-examples/{阶段目录}/{小节目录}/{序号}.{示例名}.html
```

示例：

- 笔记：`learning/1-notes/00-environment/0.1-what-is-web-app/0.1.1.client-server-model.md`
- 示例：`learning/2-examples/00-environment/0.1-what-is-web-app/0.1.1.request-response-demo.html`

## 目录结构

```
learning/1-notes/
├── 00-environment/          # 阶段 0
│   ├── 0.1-what-is-web-app/ ✅
│   ├── 0.2-dev-environment/ ✅
│   └── 0.3-network-basics/  ✅
├── 01-web-fundamentals/     # 阶段 1：106 项理论与配套资料已提供
└── ...
```

## 如何使用

1. 在 [知识地图分册](../../knowledge-map/) 或 [总览](../../KNOWLEDGE_MAP.md) 中点击知识点链接，跳转到对应笔记。
2. 阅读笔记中的概念说明、图示与 **📱 移动端对照**。
3. 按笔记底部的「实践」指引，在 `learning/2-examples/` 中运行同序号的配套示例。
4. 学完后回到知识库地图，将对应项勾选为 `[x]`。

## 当前内容进度

这里记录内容是否已提供，不等同于学习者掌握程度。阶段 0 和 1 已按阶段总则逐点复核；实际验证见[进度与验证范围](../../docs/PROGRESS.md)。

| 阶段 | 小节 | 状态 |
| --- | --- | --- |
| 0 | [0.1 Web 应用是什么](./00-environment/0.1-what-is-web-app/README.md) | ✅ 已完成 |
| 0 | [0.2 开发环境](./00-environment/0.2-dev-environment/README.md) | ✅ 已完成 |
| 0 | [0.3 网络基础](./00-environment/0.3-network-basics/README.md) | ✅ 已完成 |
| 1 | [1.1 HTML](./01-web-fundamentals/1.1-html/README.md) | 19 篇及配套示例，见本轮验证记录 |

阶段 1 已补齐 HTML 19、CSS 41、JavaScript 42、基础质量 4 项，详见[阶段入口](./01-web-fundamentals/README.md)。总正文 425/590，学习勾选独立记录。

- [阶段 2：JavaScript、浏览器与存储](./02-javascript-browser/README.md)：原理与机制。

- [阶段 3：TypeScript、Vite、代码检查与测试](./03-engineering/README.md)：36项原理与工具职责，先TS基础再构建测试。

工程类知识点可使用同编号Markdown操作卡链接真实源码工程；不要求每点都是单独HTML。具体映射以docs/stages中的契约为准。

- [阶段4：Vue 3 + Nuxt](./04-frameworks/README.md)：59项理论，Vue/Nuxt主线与React选修分明。

- [阶段5：API、会话与服务端授权](./05-fullstack-auth/README.md)：31项请求、契约、会话、授权与实时原理。

- [阶段6：性能、安全、无障碍、国际化与SEO](./06-performance-security/README.md)：43项四部分资料与真实本地实验。

- [阶段7：Nuxt渲染、构建部署与发布回滚](./07-deployment/README.md)：29点四部分资料、三种profile及本地发布演练。

- [阶段8：Vue/Nuxt模块、状态与渲染选型](./08-architecture/README.md)：39点四部分资料、模块化工作台及隔离实验。

- [阶段9：Web Vitals、加载与交互性能优化](./09-performance/README.md)：30点四部分资料、真实归因/预算/heap与Nuxt实践。
