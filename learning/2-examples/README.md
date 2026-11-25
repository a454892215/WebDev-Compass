# 示例代码目录

本目录存放与 [learning/1-notes/](../1-notes/) 中知识点配套的**可运行示例**。文件名序号与知识地图、笔记保持一致。

## 命名规范

```
learning/2-examples/{阶段目录}/{小节目录}/{序号}.{示例简述}.html
```

示例：`learning/2-examples/00-environment/0.1-what-is-web-app/0.1.1.request-response-demo.html` 对应知识点 **0.1.1**。

## 如何运行

在仓库根目录运行 `node learning/4-practice/01-web-fundamentals/server.mjs`，通过 HTTP 打开示例。模块与 Fetch 示例应使用 HTTP；独立 POST、REST、WebSocket 按章节 README 启动。

## 当前进度

| 序号 | 示例 | 状态 |
| --- | --- | --- |
| 0.1.1 | request-response-demo | ✅ |
| 0.1.3 | spa-vs-mpa-demo | ✅ |
| 0.1.4 | same-origin-demo | ✅ |
| 0.2.1 | package-demo | ✅ |
| 0.2.2 | vscode-config | ✅ |
| 0.2.3 | devtools-demo | ✅ |
| 0.2.4 | git-workflow | ✅ |
| 0.3.1 | url-parse-demo | ✅ |
| 0.3.2 | http-methods-demo | ✅ |
| 0.3.3 | http-versions（观察清单） | ✅ |
| 0.3.4 | storage-demo | ✅ |
| 0.3.5 | dns-cdn（观察清单） | ✅ |
| 0.3.6 | tls-overview（观察清单） | ✅ |
| 0.3.7 | rest-api-demo | ✅ |
| 0.3.8 | websocket-demo | ✅ |


## 阶段 1：HTML

新增 19 个离线示例，完整入口见 [HTML 示例目录](./01-web-fundamentals/1.1-html/README.md)。例子运行、观察清单与真实服务验证分别记录，范围见[本轮验证记录](../../docs/verification-2026-11-24.md)。

## 阶段 1 完整示例

| 章节 | 数量 | 入口 |
| --- | --- | --- |
| HTML | 19 | [目录](./01-web-fundamentals/1.1-html/README.md) |
| CSS | 41 | [目录](./01-web-fundamentals/1.2-css/README.md) |
| JavaScript | 42 | [目录](./01-web-fundamentals/1.3-javascript/README.md) |
| 基础质量 | 4 | [目录](./01-web-fundamentals/1.4-quality-basics/README.md) |

最新验证见[阶段 1 记录](../../docs/STAGE_1_VERIFICATION.md)；上方 HTML 记录是前一次增量交付。静态样式 fixture 与真实工具链编译在目录中分别标明。

- [阶段 2：JavaScript、浏览器与存储](./02-javascript-browser/README.md)：真实实验及运行条件。

- [阶段 3：TypeScript、Vite、代码检查与测试](./03-engineering/README.md)：固定依赖的真实pnpm、Vite、类型、质量与测试实验。

工程类知识点可使用同编号Markdown操作卡链接真实源码工程；不要求每点都是单独HTML。具体映射以docs/stages中的契约为准。

- [阶段4：Vue 3 + Nuxt](./04-frameworks/README.md)：真实Vue/React/Tailwind实验、Nuxt工程与明确的观察清单。

- [阶段5：API、会话与服务端授权](./05-fullstack-auth/README.md)：真实HTTP/JWT/CORS/WS/SSE实验及Nuxt综合工程。

- [阶段6：性能、安全、无障碍、国际化与SEO](./06-performance-security/README.md)：43项四部分资料与真实本地实验。

- [阶段7：Nuxt渲染、构建部署与发布回滚](./07-deployment/README.md)：29点四部分资料、三种profile及本地发布演练。

- [阶段8：Vue/Nuxt模块、状态与渲染选型](./08-architecture/README.md)：39点四部分资料、模块化工作台及隔离实验。

- [阶段9：Web Vitals、加载与交互性能优化](./09-performance/README.md)：30点四部分资料、真实归因/预算/heap与Nuxt实践。

- [阶段10：XSS/CSRF、认证安全与隐私](./10-security/README.md)：29点四部分资料、匿名安全笔记及隔离实验。

- [阶段11：错误监控、日志指标与灰度发布](./11-observability/README.md)：21点四部分、Nuxt工作台及独立SDK/发布/代理实验。

- [阶段12：自动化测试、Storybook与Vue组件库](./12-testing-design-system/README.md)：24点四部分、组件包/Nuxt宿主及真实策略/专项/故事实验。

- [阶段13：pnpm多包管理、版本发布与CI流水线](./13-platform/README.md)：28点四部分、多应用workspace及发布/构建/兼容/DX实验。

- [阶段14：Node.js、Nuxt Nitro 与 BFF 接口开发](./14-bff-runtime/README.md)：29点示例及配套运行边界。
