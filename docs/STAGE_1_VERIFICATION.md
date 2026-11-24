# 阶段 1 与四部分目录交付验证

本文件记录14:14:52 UTC开始的前一次教材建设任务。后续按新总则的复核、修正和最新结论见[阶段0、1验收](./audits/STAGE_0_1_ACCEPTANCE.md)；本文件保留当时证据，不冒充后续重跑。

日期：2026-11-24。任务开始 14:14:52 UTC。本轮完成 HTML 19、CSS 41、JavaScript 42、基础质量 4，共 106 项理论、实验、独立练习和综合任务；阶段 0 的 19 项补齐四部分映射，旧理论仍待专项复审。学习者复选框未自动改动。

## 实际验证

| 验证 | 本轮结果 | 边界 |
| --- | --- | --- |
| Markdown 导航、预留链接、地图覆盖 | 最终检查零错误；125/583 正文，458 预留 | 未来预留不算正文 |
| 四部分契约 | 125/125 通过，其中阶段 1 为 106/106 | 结构完整，不证明掌握与语义正确 |
| 检查器单元回归 | 22 项通过 | 含错目录、重复编号、路径逃逸、缺失练习与锚点等反例 |
| HTML 专项 | 19 页 × 1440/390 两视口 = 38 项通过 | 后台 Chrome 158；非真机 |
| CSS / JS / 基础质量 | 87 页 × 两视口 = 174 项通过 | 实际交互与计算样式，预期 Fetch 404 单独允许 |
| 综合项目和构建页面 | 6 组场景通过 | 列表、主题、收藏、空态、HTTP/JSON 错误、重试、取消、请求竞争、无脚本/断网回退 |
| 专项补查 | 6 组通过 | 空表单焦点与错误清除、Tab、失败重试、无脚本、网络失败、真实 POST 与 HTTP 校验 |
| CSS 工具链 | 实际 Vite 编译及产物断言通过，浏览器两视口通过 | CSS Modules、Sass、Tailwind；复用现有及临时依赖，不声称干净安装 |

代码语法另经 Node 检查，具体构建版本和命令见[构建证据](../learning/4-practice/01-web-fundamentals/toolchain/BUILD_EVIDENCE.md)。原始浏览器报告：[HTML](./stages/webdev-stage1-html.json)、[其余实验与综合项目](./stages/webdev-stage1-browser.json)、[专项](./stages/webdev-stage1-special.json)。

## 复核命令

```bash
python3 scripts/check_knowledge.py --report
python3 scripts/check_learning_delivery.py
python3 -m unittest discover -s scripts/tests -v
node learning/4-practice/01-web-fundamentals/server.mjs
PLAYWRIGHT_MODULE=/absolute/path/to/playwright-core/index.mjs EXAMPLES_BASE_URL=http://127.0.0.1:4174/ node scripts/check_html_examples.mjs
PLAYWRIGHT_MODULE=/absolute/path/to/playwright-core/index.mjs EXAMPLES_BASE_URL=http://127.0.0.1:4174/ node scripts/check_stage1_examples.mjs
# POST 专项服务：另开端口，按 JavaScript 章节 README 操作
PORT=4175 node learning/2-examples/01-web-fundamentals/1.3-javascript/server.mjs
```

Playwright/Chrome 为本机验证工具，未添加为学习库强制运行依赖。验证期间服务均仅监听 loopback，完成后关闭本轮临时服务与防休眠断言。

## 依据与限制

先阅读 Modern Web Guidance 的 [HTML](https://developer.chrome.com/docs/modern-web-guidance/guides/html/html)、[CSS 架构](https://developer.chrome.com/docs/modern-web-guidance/guides/css/css)、[布局](https://developer.chrome.com/docs/modern-web-guidance/guides/css/css-layout)等匹配正文，再按各篇来源补充 MDN 与官方工具文档。通用 JavaScript 指南入口未能访问，语言与 API 结论转而核对 MDN，来源记录在各篇正文。

本轮没有真机、多浏览器、屏幕阅读器全面认证、真实后端认证、生产部署或外部 API 验证。媒体/CORS 等受浏览器或环境影响的观察按示例说明执行。综合项目是教学实现，逐点任务包含要求学习者扩展或评审的能力，不表示示例预先实现了每项进阶任务。阶段 2–15、旧阶段 0 专项复审及独立 Nuxt 仓库的进一步验收仍为后续工作。
