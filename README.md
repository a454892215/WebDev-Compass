# WebDev Compass

面向已有 Android / Flutter / React Native 经验的开发者，逐步建立 Web 原理笔记、可运行示例、工程选型和 AI 协作规范，学习路线覆盖阶段 0–15。

默认框架主线为 **Vue 3 + Nuxt**，React/Next.js 为选修。完整顺序和前置见[学习路径](./docs/LEARNING_PATH.md)，目录结构判断见[审查记录](./docs/CURRICULUM_REVIEW.md)。

## 阅读入口

- [当前进度与后续计划](./docs/PROGRESS.md)：已编写内容、验证范围及待办。
- [知识地图总览](./KNOWLEDGE_MAP.md)与[六个分册](./knowledge-map/README.md)：590 个知识点的学习路线。
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
| 阶段 3 | 包管理6、Vite构建7、TypeScript12、代码质量6、测试5，共36项四部分资料 |
| 阶段 4 | 共通7、React选修26、Vue13、UI4、Nuxt9，共59项四部分资料 |
| 阶段 5 | 请求7、认证9、CORS5、数据6、实时4，共31项四部分资料 |
| 阶段 6 | 性能17、安全7、无障碍8、国际化4、SEO7，共43项四部分资料 |
| 阶段 7 | 部署9、渲染5、业务选修9、协作6，共29项四部分资料 |
| 阶段 8 | 架构文档6、应用分层6、渲染7、微前端7、BFF6、状态7，共39项四部分资料 |
| 阶段 9 | 测量7、预算5、加载6、运行时7、SSR5，共30项四部分资料 |
| 阶段 10 | 基线4、漏洞8、认证7、供应链5、隐私5，共29项四部分资料 |
| 阶段 11 | 错误5、日志指标5、发布6、基础设施5，共21项四部分资料 |
| 阶段 12 | 测试策略8、专项4、设计系统7、组件库5，共24项四部分资料 |
| 工程专题 | Nuxt 基座、桌面及手机宿主的规划与独立仓库交接 |

正文覆盖 499/590（约 84.6%），阶段 13–15 仍待编写。地图复选框代表学习者进度，不因资料交付自动勾选。最新质量结论见[阶段 12 验收](./docs/audits/STAGE_12_ACCEPTANCE.md)、[阶段 11 验收](./docs/audits/STAGE_11_ACCEPTANCE.md)、[阶段 10 验收](./docs/audits/STAGE_10_ACCEPTANCE.md)、[阶段 9 验收](./docs/audits/STAGE_9_ACCEPTANCE.md)、[阶段 8 验收](./docs/audits/STAGE_8_ACCEPTANCE.md)、[阶段 7 验收](./docs/audits/STAGE_7_ACCEPTANCE.md)、[阶段 6 验收](./docs/audits/STAGE_6_ACCEPTANCE.md)、[阶段 5 验收](./docs/audits/STAGE_5_ACCEPTANCE.md)、[阶段 4 验收](./docs/audits/STAGE_4_ACCEPTANCE.md)、[阶段 3 验收](./docs/audits/STAGE_3_ACCEPTANCE.md)、[阶段 2 验收](./docs/audits/STAGE_2_ACCEPTANCE.md)及[阶段 0、1 验收](./docs/audits/STAGE_0_1_ACCEPTANCE.md)，前一次运行边界见[阶段 1 验证记录](./docs/STAGE_1_VERIFICATION.md)。

## 运行与检查

```bash
node learning/4-practice/01-web-fundamentals/server.mjs
# 打开 http://127.0.0.1:4174/learning/4-practice/01-web-fundamentals/
python3 scripts/check_knowledge.py --table
python3 scripts/check_knowledge.py --report
python3 scripts/check_learning_delivery.py
python3 scripts/check_learning_resources.py
python3 scripts/check_stage_acceptance.py --stage 0 --stage 1 --stage 2 --stage 3 --stage 4 --stage 5
python3 -m unittest discover -s scripts/tests -v
```

阶段2综合项目运行 `node learning/4-practice/02-javascript-browser/server.mjs`，打开 http://127.0.0.1:4190/ 。综合项目服务同时提供仓库静态资源和本地教学 API。JavaScript POST、阶段 0 REST/WebSocket 以及 CSS 构建项目按各自 README 启动。使用 HTTP 运行模块与 Fetch 示例，避免 file:// 限制。检查器验证结构、映射及本地链接；浏览器行为与真实构建另行验证。

阶段3使用独立pnpm工程，先从[阶段入口](./learning/1-notes/03-engineering/README.md)按推荐顺序学习，再运行[阅读任务板](./learning/4-practice/03-engineering/README.md)。TS源码需经Vite转换，不能直接用上述静态服务运行。

阶段4先从[Vue/Nuxt学习入口](./learning/1-notes/04-frameworks/README.md)开始，再运行[Nuxt资料库](./learning/4-practice/04-frameworks/README.md)。开始前复核规划补齐watch清理与页面元信息2点，原有编号保留，当时总规划更新为585项；React仍是选修。

阶段5先读[API/会话学习入口](./learning/1-notes/05-fullstack-auth/README.md)，运行[Nuxt私人笔记](./learning/4-practice/05-fullstack-auth/README.md)。规划复核补安全重试/幂等及SSR会话/私有缓存两点；本地协议实验与真实生产身份系统分明。

## 独立框架边界

web-common、web-pc-workframe、web-h5-workframe 已另建为三个独立仓库。具体实现和后续开发在各自项目中进行；本仓库维护通用知识与规范。已交付和待验证能力见[框架交接记录](./framework-guide/07-implementation-status.md)。

Web 技术方案先检索 Modern Web Guidance，再按目标浏览器选择可用能力。本项目支持逐步形成复杂 Web 工程的开发与治理能力，不把目录齐全表述为已达到高级工程师水平。

阶段6：[质量学习入口](./learning/1-notes/06-performance-security/README.md)、[Nuxt三语目录](./learning/4-practice/06-performance-security/README.md)。阶段7已完成，阶段8已完成，阶段9已完成，阶段10已完成，阶段11已完成，阶段12已完成，下一阶段13：pnpm多包管理、版本发布与CI流水线。

阶段7：[部署学习入口](./learning/1-notes/07-deployment/README.md)、[Nuxt三种profile与发布恢复](./learning/4-practice/07-deployment/README.md)。

阶段8：[架构学习入口](./learning/1-notes/08-architecture/README.md)、[Nuxt模块化工作台](./learning/4-practice/08-architecture/README.md)。

阶段9：[性能学习入口](./learning/1-notes/09-performance/README.md)、[Nuxt首屏与水合实验](./learning/4-practice/09-performance/README.md)。

阶段10：[安全学习入口](./learning/1-notes/10-security/README.md)、[Nuxt匿名安全笔记](./learning/4-practice/10-security/README.md)。

阶段11：[可观测学习入口](./learning/1-notes/11-observability/README.md)、[Nuxt诊断与稳定开关工作台](./learning/4-practice/11-observability/README.md)。

阶段12：[测试与设计系统入口](./learning/1-notes/12-testing-design-system/README.md)、[Vue组件包与Nuxt验收工作台](./learning/4-practice/12-testing-design-system/README.md)。
