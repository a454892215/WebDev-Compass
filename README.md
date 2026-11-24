# WebDev Compass

面向已有 Android / Flutter / React Native 经验的开发者，逐步建立 Web 原理笔记、可运行示例、工程选型和 AI 协作规范，学习路线覆盖阶段 0–15。

默认框架主线为 **Vue 3 + Nuxt**，React/Next.js 为选修。完整顺序和前置见[学习路径](./docs/LEARNING_PATH.md)，目录结构判断见[审查记录](./docs/CURRICULUM_REVIEW.md)。

## 阅读入口

- [当前进度与后续计划](./docs/PROGRESS.md)：已编写内容、验证范围及待办。
- [知识地图总览](./KNOWLEDGE_MAP.md)与[六个分册](./knowledge-map/README.md)：583 个知识点的学习路线。
- [四部分学习资料](./learning/README.md)：理论、代码示例、独立练习与综合实践。
- [学习资料结构规范](./docs/LEARNING_STRUCTURE.md)：目录、逐知识点映射与脚本门禁。
- [Nuxt 基座与宿主指南](./framework-guide/README.md)：通用工程规划与独立项目交接。
- [阶段编写与验收总则](./docs/AUTHORING.md)：来源、命名、示例与验收要求。

## 当前覆盖

| 模块 | 已提供内容 |
| --- | --- |
| 阶段 0 | 19 项四部分资料，已按总则逐篇复审并修正网络与工具陈述 |
| 阶段 1 | HTML 19、CSS 41、JavaScript 42、基础质量 4，共 106 项四部分资料 |
| 阶段 2 | JavaScript进阶11、浏览器原理9、存储4、Web API 9，共33项四部分资料 |
| 工程专题 | Nuxt 基座、桌面及手机宿主的规划与独立仓库交接 |

正文覆盖 158/583（约 27.1%），阶段 3–15 仍待编写。地图复选框代表学习者进度，不因资料交付自动勾选。最新质量结论见[阶段 2 验收](./docs/audits/STAGE_2_ACCEPTANCE.md)及[阶段 0、1 验收](./docs/audits/STAGE_0_1_ACCEPTANCE.md)，前一次运行边界见[阶段 1 验证记录](./docs/STAGE_1_VERIFICATION.md)。

## 运行与检查

```bash
node learning/4-practice/01-web-fundamentals/server.mjs
# 打开 http://127.0.0.1:4174/learning/4-practice/01-web-fundamentals/
python3 scripts/check_knowledge.py --table
python3 scripts/check_knowledge.py --report
python3 scripts/check_learning_delivery.py
python3 scripts/check_learning_resources.py
python3 scripts/check_stage_acceptance.py --stage 0 --stage 1 --stage 2
python3 -m unittest discover -s scripts/tests -v
```

阶段2综合项目运行 `node learning/4-practice/02-javascript-browser/server.mjs`，打开 http://127.0.0.1:4190/ 。综合项目服务同时提供仓库静态资源和本地教学 API。JavaScript POST、阶段 0 REST/WebSocket 以及 CSS 构建项目按各自 README 启动。使用 HTTP 运行模块与 Fetch 示例，避免 file:// 限制。检查器验证结构、映射及本地链接；浏览器行为与真实构建另行验证。

## 独立框架边界

web-common、web-pc-workframe、web-h5-workframe 已另建为三个独立仓库。具体实现和后续开发在各自项目中进行；本仓库维护通用知识与规范。已交付和待验证能力见[框架交接记录](./framework-guide/07-implementation-status.md)。

Web 技术方案先检索 Modern Web Guidance，再按目标浏览器选择可用能力。本项目支持逐步形成复杂 Web 工程的开发与治理能力，不把目录齐全表述为已达到高级工程师水平。
