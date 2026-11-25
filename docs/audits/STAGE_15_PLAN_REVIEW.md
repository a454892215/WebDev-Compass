# 阶段15规划、前置与资料缺口核对

开始2026-11-25 13:18:40 UTC；先读AGENTS、AUTHORING R01–R09、LEARNING_STRUCTURE/LEARNING_PATH及阶段15完整地图，再查MWG匹配正文。实际6代理：主迁移6点/集成；决策协作10、代码评审4、i18n/a11y6、浏览器导航4、浏览器专项4。独立文件与实验并行，主负责跨组事实、运行与收尾。

## 合理性与范围

34点六组覆盖从决策/评审到迁移和交付的主要职责，没有明显结构遗漏。保留全部稳定编号、路径和学习勾选；不把本阶段变成生产后端、项目管理系统或真实采购/会议。重点补足原点内部：兼容窗口、依赖/资源、DOM所有权、只读双跑与写副作用区别、回退数据兼容、焦点与滚动、语言/方向、选修能力/回退/资源释放。

| 分组 | 点数 | 顺序和必要补足 |
| --- | --- | --- |
| 15.1 | 5 | 问题/约束→候选/Spike→契约/角色→区间估算；事实、假设和未决分开 |
| 15.2 | 4 | 可复现行为→完整切片→热点线索→特征重构，AI/CI不替人类LGTM |
| 15.3 | 5 | 任务/owner/依赖→共同推理→知识交接→证据分工→可回退首次交付 |
| 15.4 | 6 | 接缝→MPA/Vue所有权→只读对照/分流→CSS→策略比较→AST与回归 |
| 15.5 | 6 | 消息/ICU、RTL/BiDi、时区→范围与WCAG→路由/复杂组件；从设计贯穿 |
| 15.6 | 8 | 按业务选修，真实能力与缺失回退、隔离与生命周期；不强接Nuxt主路由 |

前置为阶段4/5/7/8/10/12/13及适用14；选修React、Edge、音视频、认证或3D不是主线迁移门槛。主产出是一个合成只读旧MPA到Nuxt目录切片及交付包；组织课用具体卡片与可运行依赖/契约实验，不给每个非编程主题强造工程。

## 已查一手依据

- [MWG无障碍](https://developer.chrome.com/docs/modern-web-guidance/guides/accessibility/accessibility)：原生语义、可聚焦skip目标、路由焦点、dialog与自动检查局限。
- [MWG安全](https://developer.chrome.com/docs/modern-web-guidance/guides/security/security)：可信输入、文本输出和最小凭据边界。
- [MWG同文档转场](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/same-document-transitions)：转场为增强，不代替内容/焦点和回退。
- [Vue多种接入](https://vuejs.org/guide/extras/ways-of-using-vue.html)、[SFC scoped](https://vuejs.org/api/sfc-css-features.html#scoped-css)、[Nuxt路由](https://nuxt.com/docs/4.x/getting-started/routing)：按路由并存、单一DOM/路由owner，scoped非安全隔离。
- [Strangler](https://martinfowler.com/bliki/StranglerFigApplication.html)、[Parallel Change](https://martinfowler.com/bliki/ParallelChange.html)、[Feature Toggles](https://martinfowler.com/articles/feature-toggles.html)：接缝、兼容扩展/迁消费者/收旧与开关成本。
- [TypeScript官方Compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)：精确AST转换并真实运行，不对未分析语法盲改。旧handbook/compiler-api入口404后用官方Wiki。
- [W3C WebAuthn3备份状态](https://www.w3.org/TR/webauthn-3/#sctn-credential-backup)：网站API不暴露私钥与多设备备份能力分开。其他各点官方来源与访问限制见分组审查。

核对日期2026-11-25；固定Nuxt4.7.0/Vue3.5.46/TypeScript6.0.3/Node26.0.0，教学固定版本不表示最新。浏览器单引擎Chrome158、宽窄视口模拟，云服务、生产和真实学习者不伪报。

## 待办与完成判据

按[阶段清单](../STAGE_15_DELIVERY.md)依次核34点四部分、真实项目/分组实验、问题关闭与R01–R09。来源指纹只保新鲜度，不代替技术/教学复核。全图正文完成后同步590/590，后续转为实际项目应用、勘误和环境专项验收，不自动宣称达到高级职级或全部生产场景已测。
