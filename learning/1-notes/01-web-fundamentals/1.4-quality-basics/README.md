# 1.4 基础质量：兼容、无障碍、设计与失败体验

[返回阶段 1](../README.md) · [知识地图](../../../../knowledge-map/01-foundation-stages-0-2.md)

这些要求从第一张页面贯穿，不需要等到高级阶段再补。已有 HTML/CSS 后可开始前三节，异步故障实验在 1.3 Promise/Fetch 后回读。

| 内容                           | 笔记                                          | 示例                                                                                                       |
| ------------------------------ | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 标准、Baseline 与能力检测      | [1.4.1](./1.4.1.standards-baseline.md)        | [运行](../../../2-examples/01-web-fundamentals/1.4-quality-basics/1.4.1.standards-baseline-demo.html)        |
| 语义、键盘、焦点、缩放与对比度 | [1.4.2](./1.4.2.accessibility-foundations.md) | [运行](../../../2-examples/01-web-fundamentals/1.4-quality-basics/1.4.2.accessibility-foundations-demo.html) |
| 设计稿与交互状态               | [1.4.3](./1.4.3.design-interaction-states.md) | [运行](../../../2-examples/01-web-fundamentals/1.4-quality-basics/1.4.3.design-interaction-states-demo.html) |
| 慢网、取消、失败与无 JS 回退   | [1.4.4](./1.4.4.progressive-enhancement.md)   | [运行](../../../2-examples/01-web-fundamentals/1.4-quality-basics/1.4.4.progressive-enhancement-demo.html)   |

能力检测不等于完整兼容性，自动检查不等于完整 WCAG，模拟失败不等于真实弱网，状态演示不等于后端集成。手机视口、真机、读屏器和真实部署分别记录证据。

## 章节产出与运行边界

完成后交付：一份目标浏览器与回退说明、一份键盘/缩放/错误反馈检查记录、一张组件状态表，以及脚本关闭、网络失败、取消和重试的实践记录。前三项可在 HTML/CSS 后先观察；含 Promise/Fetch 的实现待 1.3 后完成。例子采用本地模拟数据，不据此宣布生产兼容、完整 WCAG 或真实弱网通过。

本轮内容审查与修正见[JavaScript 与基础质量复核记录](../../../../docs/audits/stage-1-js-quality-review.md)，资料审查不代替学习者独立验收。
