# 2026-11-24 知识库增量验证记录

## 交付与来源

本轮完成现有内容审计、导航修复、1.1 HTML 的 19 篇正文与 19 个离线示例、章节索引、内容规范和三仓库框架交接记录。阶段 1 共 96 项，新增内容仅覆盖 HTML 的 19 项；未将 CSS、JavaScript 或其他阶段写成已完成。

正文覆盖从 19/565 增至 38/565，约 6.7%；527 个未来知识点仍明确保留为计划。地图原有学习勾选不变。1.1 HTML 的文档结构 8 项、表单 5 项、进阶 6 项均有正文和单独入口。

已查阅 Modern Web Guidance 的 [HTML](https://developer.chrome.com/docs/modern-web-guidance/guides/html/html)、[Forms](https://developer.chrome.com/docs/modern-web-guidance/guides/forms/forms)、[Dialog](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-components/dialog)，影响原生语义、标签、缩放、键盘行为与对话框能力检测。各笔记附具体 WHATWG、MDN 或 Google Search 官方来源。Node/Corepack 说明按 [Corepack 官方文档](https://github.com/nodejs/corepack)修正。

## 本轮实际执行

| 检查                | 结果                                                                                                                                                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 覆盖与本地链接/锚点 | scripts/check_knowledge.py 的报告，真实错误为零；未来正文按 planned 统计                                                                                                     |
| 检查器边界回归      | 9 项 unittest，通过；覆盖预留/真实断链、重复引用、代码块、Unicode 锚点与路径解析                                                                                             |
| HTML/JS 静态自查    | 19 页单 h1/main、唯一 ID、label 目标、资源及内联脚本语法；通过                                                                                                               |
| 后台 Chrome         | 19 页 × 1440/390 两种视口，共 38 个页面/视口检查通过                                                                                                                         |
| 页面行为            | 标准模式、语义切换、列表、URL/锚点、响应式图片、音频元数据、表头、元信息、表单脱敏、disabled/readonly、编码预览、跨字段校验、Canvas/SVG、模板、dialog/焦点、dataset、JSON-LD |
| 运行边界            | HTTP 页面/资源成功、无 pageerror、无整页水平溢出、Tab 可聚焦；媒体不自动播放                                                                                                 |

浏览器原始结果保存在 [html-example-checks.json](./html-example-checks.json)，包含 Chrome 版本、时间和逐页结果。验证使用后台 headless Chrome，不移动系统鼠标或抢占前台。

## 可重复执行

在仓库根目录运行：

```bash
python3 scripts/check_knowledge.py --report
python3 -m unittest discover -s scripts/tests -v
python3 -m http.server 4173 --bind 127.0.0.1
```

另一个终端执行浏览器检查。Playwright 只作为可选验证工具，不是课程示例依赖；已有安装时直接设置模块路径，不必重复安装。

```bash
# 如本机没有可用安装，可单独准备临时 QA 环境
npm install --prefix /tmp/webdev-compass-qa playwright-core
PLAYWRIGHT_MODULE=/tmp/webdev-compass-qa/node_modules/playwright-core/index.mjs \
  node scripts/check_html_examples.mjs
```

脚本默认使用 macOS 的 Chrome 与本机 4173 端口，可通过 CHROME_PATH、EXAMPLES_BASE_URL 更改；默认 JSON 输出在 /tmp，只有显式指定 EXAMPLES_REPORT 才覆盖仓库证据。静态服务用完即停止。

## 验证限制与剩余任务

- 手机结果为桌面 Chrome 的移动视口和触控模拟，没有执行手机真机、Safari/WebView 或完整屏幕阅读器验收。键盘及结构检查不等于 WCAG 全量审计。
- 音频检查资源和元数据，不宣称自动化验证听觉效果；视频由学习者选取本地文件，没有实际课程视频/字幕，也没有验证所有编码。
- 表单是本地预览，没有向真实后端提交；SEO 仅检查文档与结构化数据，不验证抓取、收录、排名或富媒体结果。
- 阶段 0 本轮主要修复导航及 Corepack 事实，没有重跑所有旧服务，也未逐篇复审 CORS/Cookie 等技术陈述。继续工作见 [PROGRESS](./PROGRESS.md)。
- 框架工程只读核对已有证据，没有重新构建或修改；2026-11-20 的结果按历史记录标注。
- 链接检查器只支持本仓库使用的 Markdown 子集，不验证外部网址可达性、内容真实性，也不完整实现 CommonMark。

本轮没有发布网站、安装到真实手机或推送远程仓库。最终本地提交哈希随交付报告提供。
