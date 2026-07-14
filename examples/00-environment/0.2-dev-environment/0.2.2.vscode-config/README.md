# 0.2.2 VS Code / Cursor 工作区配置示例

对应笔记：[0.2.2 VS Code / Cursor](../../../notes/00-environment/0.2-dev-environment/0.2.2.vs-code-cursor.md)

## 文件说明

| 文件 | 作用 |
| --- | --- |
| `.vscode/extensions.json` | 推荐团队成员安装的插件 |
| `.vscode/settings.json` | 工作区：保存格式化、ESLint fix、Live Server |
| `.editorconfig` | 跨编辑器基础缩进与换行 |
| `.prettierrc` | Prettier 格式化规则 |

## 如何使用

1. 将 `.vscode/`、`.editorconfig`、`.prettierrc` 复制到你的 Web 项目根目录
2. 用 Cursor 打开项目 → 弹出「安装推荐扩展」时选择安装
3. 打开 `sample.html`，右键 **Open with Live Server** 预览

## sample.html

用于验证 Live Server 与格式化：故意写乱缩进，保存后应被 Prettier 整理（若已安装插件并启用 formatOnSave）。
