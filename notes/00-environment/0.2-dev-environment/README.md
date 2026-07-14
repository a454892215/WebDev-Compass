# 0.2 开发环境

> [← 返回阶段 0](../README.md) · [← 返回知识库地图](../../knowledge-map/01-foundation-stages-0-2.md#02-开发环境)

在写第一行 HTML 之前，需要先搭建 **Node.js 运行时、包管理器、编辑器、浏览器调试工具与 Git** 这套 Web 前端日常开发环境。本节 5 个知识点按推荐顺序学习。

## 知识点列表

| 序号 | 知识点 | 笔记 | 示例 |
| --- | --- | --- | --- |
| 0.2.1 | 安装与配置 Node.js、npm / yarn / pnpm | [0.2.1.node.js.md](./0.2.1.node.js.md) | [0.2.1.package-demo/](../../../examples/00-environment/0.2-dev-environment/0.2.1.package-demo/) |
| 0.2.2 | VS Code / Cursor 及 Web 相关插件 | [0.2.2.vs-code-cursor.md](./0.2.2.vs-code-cursor.md) | [0.2.2.vscode-config/](../../../examples/00-environment/0.2-dev-environment/0.2.2.vscode-config/) |
| 0.2.3 | Chrome DevTools 六大面板 | [0.2.3.chrome-devtools.md](./0.2.3.chrome-devtools.md) | [0.2.3.devtools-demo.html](../../../examples/00-environment/0.2-dev-environment/0.2.3.devtools-demo.html) |
| 0.2.4 | Git 基础与工作流 | [0.2.4.git.md](./0.2.4.git.md) | [0.2.4.git-workflow.md](../../../examples/00-environment/0.2-dev-environment/0.2.4.git-workflow.md) |
| 0.2.5 | 📱 移动端对照总览 | [0.2.5.npm-pub-cocoapods-gradle-vite.md](./0.2.5.npm-pub-cocoapods-gradle-vite.md) | — |

## 学习建议

1. **0.2.1** 优先完成：后续 Vite、npm scripts、ESLint 都依赖 Node 生态。
2. **0.2.2** 与 **0.2.3** 可交叉练习：用编辑器写代码，用 DevTools 观察结果。
3. **0.2.4** 贯穿整个项目：本仓库本身就用 Git 管理。
4. **0.2.5** 在有 Android / Flutter / RN 经验时阅读，建立工具链对照。

## 环境自检清单

完成本节后可逐项确认：

- [ ] `node -v` 与 `npm -v`（或 `pnpm -v`）能输出版本号
- [ ] 能在 Cursor/VS Code 中格式化代码、看到 ESLint 提示
- [ ] 能用 Live Server 或 `npx serve` 以 `http://` 协议打开示例
- [ ] 能在 DevTools 的 Network / Console / Application 面板完成基本操作
- [ ] 能完成 `clone → branch → commit → push` 基本 Git 流程
