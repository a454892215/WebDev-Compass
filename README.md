# WebDev Compass

面向已有 Android / Flutter / React Native 经验的开发者，逐步建立 Web 原理笔记、可运行示例、工程选型和 AI 协作规范，学习路线覆盖阶段 0–15。

## 阅读入口

- [当前进度与后续计划](./docs/PROGRESS.md)：已编写内容、验证范围及待办。
- [知识地图总览](./KNOWLEDGE_MAP.md)与[六个分册](./knowledge-map/README.md)：565 个知识点的学习路线。
- [笔记](./notes/README.md)与[配套示例](./examples/README.md)：原理、移动开发对照与练习。
- [Nuxt 基座与宿主指南](./framework-guide/README.md)：通用工程规划与独立项目交接。
- [内容编写与验证规范](./docs/AUTHORING.md)：来源、命名、示例与验收要求。

## 当前覆盖

| 模块          | 已提供的内容                                             |
| ------------- | -------------------------------------------------------- |
| 阶段 0        | 19 篇笔记、15 个示例入口，覆盖环境、浏览器与网络心智模型 |
| 阶段 1 · HTML | 19 篇笔记及对应离线示例，覆盖语义、表单与原生元素        |
| 工程实践专题  | 6 篇规划正文及三仓库实施交接记录                         |

阶段 1 的 CSS、JavaScript，以及阶段 2–15 的详细教材仍待逐节编写。地图复选框保留为学习者进度，正文是否存在由检查器独立统计。清单覆盖不代表正文或学习已完成。

## 示例与检查

在仓库根目录启动纯 HTML 示例的静态服务：

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

浏览器打开 http://127.0.0.1:4173/examples/ 。REST、WebSocket 需按各自 README 启动 Node 服务。

```bash
python3 scripts/check_knowledge.py --report
python3 -m unittest discover -s scripts/tests -v
```

检查器核对覆盖、本地链接、锚点与已勾选条目，区分未来章节的预留链接；不替代浏览器、接口、安全或辅助技术验证。

## 独立框架边界

web-common、web-pc-workframe、web-h5-workframe 已另建为三个独立仓库。具体实现和后续开发在各自项目中进行；本仓库维护通用知识与规范。已交付和待验证能力见[框架交接记录](./framework-guide/07-implementation-status.md)。

Web 技术方案先检索 Modern Web Guidance，再按目标浏览器选择可用能力。本项目支持逐步形成复杂 Web 工程的开发与治理能力，不把目录齐全表述为已达到高级工程师水平。
