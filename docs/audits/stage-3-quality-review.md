# 阶段3.4–3.5逐点内容审查

日期：2026-11-24。范围为3.4的6点、3.5的5点；完整阶段验收由主审集成，不以本分组结论代替阶段整体达标。

## 审查范围与顺序

已逐点核对理论机制/最小例/移动类比/误区/官方来源、真实共享实验映射、独立变体与可复现故障、综合任务建议。推荐3.4.1→3.4.6，3.5.1→3.5.5；前置为阶段2及3.1–3.3。Vue组件只引入测试所需最小props/emits/h，完整Vue/SFC阶段4展开。3.5.3保留历史react-testing-library路径，标题和实际主线明确是Vue Test Utils。

| 编号 | 实际机制与证据 | 审查结论 |
| --- | --- | --- |
| 3.4.1 | flat config、tsc分工；真实debugger导致no-debugger非零 | 分组通过 |
| 3.4.2 | check不改写/write改写、忽略规则；真实差异返回非零 | 分组通过 |
| 3.4.3 | root/section和支持工具；Prettier实际解析四空格 | 分组通过；不冒充IDE UI验证 |
| 3.4.4 | 临时Git真实Husky+lint-staged拒绝错误暂存提交，修复成功 | 分组通过；不改主仓库hooks |
| 3.4.5 | type/scope/破坏性变化/正文；三种标题样本 | 分组通过；仅标题子集，不是完整解析器 |
| 3.4.6 | 已跟踪不被ignore移除；npm dry-run前后清单差异 | 分组通过；只有无秘密fixture，无publish |
| 3.5.1 | 单元/组件/真实浏览器分层、风险与替身边界 | 分组通过；不套固定测试比例 |
| 3.5.2 | domain边界、服务异步/HTTP/解析失败、受控错误断言 | 分组通过 |
| 3.5.3 | VTU真实mount/trigger/emitted/setProps/auto-unmount | 分组通过；jsdom非真实布局 |
| 3.5.4 | 实际Chrome两视口添加/完成/撤销/文本安全/无溢出 | 分组通过；视口非真机 |
| 3.5.5 | 明确3文件include，14测试与真实V8报告；阈值局限 | 分组通过；非全工程覆盖率 |

## R01–R09

- R01：11编号均有理论、共享工程具体文件、独立练习及综合任务建议。映射在stage-3-quality-points.json；主审把integration-cases.json写入主任务板契约。
- R02：先机制后工具后独立练习；Vue最小支线和阶段4先后边界明确，不让原生主UI依赖完整Vue知识。
- R03：先读Modern Web Guidance HTML语义控件正文，再核对ESLint flat config、Prettier、EditorConfig、Husky/lint-staged、CC、Git/npm、Vitest、VTU、Playwright官方资料；日期2026-11-24。现代Web指南没有专门ESLint/覆盖率课程，不编造专属条目。
- R04：实际脚本、负例、14个测试、2个浏览器流程和构建；不是静态HTML伪终端。运行见runtime/tools JSON。
- R05：11练习均有具体变体、>=2标准、可复现故障与参考；不要求真实凭据或危险发布。
- R06：综合任务明确“已有”与“副本新增”；主任务板原生UI不冒称已有Vue组件/生产后端/真实hooks。
- R07：示例脚本与正文一致，Prettier和ESLint分工、ignore与发布区别、jsdom/Chrome/真机边界明确。
- R08：发现并关闭TS6直接文件模式、Prettier忽略样本、Husky bin、符号链接ignore、pnpm11配置位置等问题。修复后有关负例全过，正常测试仍需成功，不隐藏失败输出。
- R09：本报告说明分组交付与未测范围；地图不勾选，未将资料通过等同学习者掌握。阶段总索引、契约和最终提交由主审统一更新。

## 实测范围

pnpm冻结安装、YAML配置读取、typecheck、lint、format:check、coverage、build、verify:tools通过；Playwright使用本机Chrome两视口2项通过。coverage分母仅domain/service/TaskButton，语句96.42%、分支93.33%、函数/行100%。网页资源检查本轮159页607引用0错误。报告数目是该时刻实测，不替代最终集成复验。

未测：真机、多浏览器、生产接口、生产发布、编辑器插件UI、屏幕阅读器和真实学习者试学。主综合任务板自身结果由主审记录，不能拿独立lab结果替代。

## 官方来源

- [MWG HTML](https://developer.chrome.com/docs/modern-web-guidance/guides/html/html)
- [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files)、[Prettier与linters](https://prettier.io/docs/integrating-with-linters)、[EditorConfig](https://editorconfig.org/)
- [Husky](https://typicode.github.io/husky/get-started.html)、[lint-staged](https://github.com/lint-staged/lint-staged)、[CC](https://www.conventionalcommits.org/en/v1.0.0/)
- [Git ignore](https://git-scm.com/docs/gitignore)、[npm files](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#files)
- [Vitest coverage](https://vitest.dev/guide/coverage)、[VTU](https://test-utils.vuejs.org/guide/)、[Playwright](https://playwright.dev/docs/best-practices)、[pnpm11配置](https://pnpm.io/blog/releases/11.0)
