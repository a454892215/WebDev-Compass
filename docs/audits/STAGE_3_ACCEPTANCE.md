# 阶段3：编写与质量验收

日期：2026-11-24。依据[阶段编写与验收总则](../AUTHORING.md)版本1，范围为3.1–3.5全部36点。结论：**在下述验证范围内，阶段3资料达到R01–R09标准**。这是教材与工程交付结论，不表示学习者已掌握，也不保证未知错误为零。

## 交付与学习顺序

| 章节 | 点数 | 四部分与审查 |
| --- | --- | --- |
| 3.1 package.json、pnpm、SemVer、锁与workspace | 6 | 齐全，逐点通过 |
| 3.2 Vite、HMR、分包、Source Map与Webpack对照 | 7 | 齐全，逐点通过；Webpack仅配置阅读/语法检查 |
| 3.3 TypeScript类型、函数、类、模块与配置 | 12 | 齐全，逐点通过；Vue契约最小桥接 |
| 3.4 ESLint、Prettier、EditorConfig、Git检查 | 6 | 齐全，逐点通过；hooks仅临时仓库 |
| 3.5 Vitest、Vue Test Utils、Playwright与覆盖率 | 5 | 齐全，逐点通过；组件实验采用jsdom |

前置为阶段1原生Web基础、阶段2模块/异步/HTTP。推荐顺序为3.1 → 3.3.1–3.3.10 → 3.2 → 3.4 → 3.5；3.3.11与3.5.3介绍Vue组件契约所需最小概念，完整Vue 3 + Nuxt在阶段4。历史编号和路径不变；React保留选修边界。

四部分分别有理论正文、链接真实源码工程的操作卡、独立变体/可复现故障/具体标准、[阅读任务板及36项任务](../../learning/4-practice/03-engineering/README.md)。主任务板使用原生Vite+TS，workspace、Vue与Git hooks在独立实验；综合任务已逐项区分现有实现、分析题与副本扩展。

## R01–R09审查

| 规则 | 结论与证据 |
| --- | --- |
| R01 范围完整 | 36个唯一编号、四部分与36个稳定任务锚点齐全；[交付契约](../stages/stage-3.json)及三个逐点审查JSON完整覆盖。 |
| R02 层层递进 | 阶段入口明确先包管理/TS再构建测试；类型转换、工具职责和Vue预览前置明确，没有把完整Vue/Nuxt放成原生工程先修。 |
| R03 内容准确 | 核对MWG与各工具官方正文及实际版本；检查类型擦除/unknown/别名、Vite不做类型检查、pnpm11配置位置、Source Map公开边界及移动类比。 |
| R04 示例有效 | 使用真实编译器、包管理器、构建器、测试框架和Chrome；有明确的正例与预期失败；未将伪终端或注释当运行证据。 |
| R05 练习具体 | 36点均有独立任务、至少两项标准、故障与参考；如锁冲突、类型错误、错误暂存、漏await和别名配置不一致，均指明定位/修正判据。 |
| R06 综合对应 | 对照任务板实际源码，保留现有功能与副本扩展的区别；修正HMR计数归属，未虚构主工程已有monorepo、Vue UI、hooks、生产接口或部署。 |
| R07 前后一致 | 四部分与命令/配置核对；TS检查不代替解码，格式不代替lint，模拟不代替生产。界面采用原生标签、按钮、文本写入与可恢复错误；390/1440视口无横向溢出。 |
| R08 问题关闭 | 下列必达问题已修复复验；最终链接、资源、结构、脚本回归及阶段验收门禁通过。运行证据分别保存，不用独立lab覆盖率替代主工程。 |
| R09 状态清楚 | 正文194/583（33.3%），待编写389；更新总览、四部分入口与下一阶段。质量结论、编写统计和学习复选框独立。 |

逐点内容证据：[包管理与构建](./stage-3-build-points.json)、[TypeScript](./stage-3-ts-points.json)、[质量与测试](./stage-3-quality-points.json)。分组审查正文：[3.1–3.2](./stage-3-build-review.md)、[3.3](./stage-3-ts-review.md)、[3.4–3.5](./stage-3-quality-review.md)。主审补充核对共享工程、跨章节顺序、任务事实与全库集成。

## 实际验证

环境：Node26.0.0、pnpm11.4.0、Vite8.3.8、TypeScript6.0.3；版本固定并提交锁文件。选TS6而不是registry最新TS7，是当前typescript-eslint8.74支持范围限制，详见[版本记录](./stage-3-tool-versions.json)。未修改全局工具设置或其他项目。

| 范围 | 本轮结果 | 记录 |
| --- | --- | --- |
| 包管理实验 | 4组通过：冻结安装、8个SemVer断言与workspace计算、锁冲突拒绝、本地pack清单 | [包运行](./stage-3-package-runtime.json) |
| Vite实验 | 7组通过：实际构建、map/公开资源/别名、受控类型错误对照；390/1440的真实HMR保持计数/document，以及点击后动态chunk网络请求 | [构建运行](./stage-3-build-runtime.json) |
| TS实验 | 27项通过：12运行正例、12真实编译反例及过期expect-error/别名/声明产物边界检查；Vue Props/事件反例被拒绝 | [TS运行](./stage-3-ts-runtime.json) |
| 质量与组件实验 | 类型/lint/格式/build通过，14个Vitest测试、真实VTU挂载和V8覆盖率；9项工具检查、Chrome两视口共2项E2E通过 | [质量运行](./stage-3-quality-runtime.json)、[工具负例](./stage-3-quality-tools.json) |
| 主综合项目 | 冻结安装、ESLint、Prettier、两套tsc、17项单元/服务测试、生产构建与动态分包/纯导出移除/hidden map检查通过；两视口共4项E2E通过 | [任务板运行](./stage-3-practice-runtime.json) |
| 全库门禁 | 194/194四部分；159个HTML、607个本地引用零错误；39个脚本回归通过；阶段0/1/2/3验收门禁通过 | 脚本可复跑，阶段机器记录见下方 |

主项目E2E实际访问本地preview：添加/完成/筛选、恶意形状文本不生成标签、统计动态加载、列表变动后的统计失效与重新计算、HTTP404/坏JSON/错结构及恢复正常。fetch单元替身只验证服务契约，不当作真实服务端业务。覆盖率分母仅domain/services，语句96.77%、分支100%、函数91.66%、行96.29%；不为未用调试函数追逐100%，UI不在此覆盖率内。

## 发现与关闭

- **pnpm11配置**：发现仅含store/ignore-scripts的旧式.npmrc无效，按[11.0官方发布说明](https://pnpm.io/blog/releases/11.0)移入pnpm-workspace.yaml，实查config get/store path并冻结安装。主工程及两个构建lab、质量lab已分别核对。
- **综合任务事实**：HMR计数器属于vite-lab，任务板main未实现相同accept边界；修正练习/任务和数据建议，保持已有实现与实验/扩展边界。workspace的app→math也明确属于独立包实验。
- **工具负例有效性**：TS6直接文件模式需--ignoreConfig；Prettier错误fixture曾被.gitignore跳过；Husky CLI路径、临时Git ignore样本均已修正后实测，不把“未执行”算通过。
- **HTTP失败**：Vite的SPA回退可能将缺失fixture返回HTML200；提供显式本地404教学中间件并由E2E验证错误与恢复。
- **统计过期**：主工程列表/筛选变化时清除旧统计提示重新计算，两视口均新增变更后重算断言并通过。
- **生成内容混入检查**：pnpm缓存及coverage/test-results/playwright-report等生成目录从课程扫描和来源指纹排除，并增加两条回归（包括多种目录样本），保持教材源码变动仍会使指纹失效。

## 未测范围与下一步

Chrome为后台真实浏览器、模拟桌面/手机视口，**未做真机或多浏览器兼容认证**。未验证编辑器插件UI、屏幕阅读器、生产后端/登录/部署/发布、真实Dart/Kotlin运行、性能基准或真实学习者试学；npm/Yarn主要作命令对照，Webpack未实装构建。安装需要公共npm注册表，教学HTTP仅loopback；未上传包或推送Git。

本阶段达标后，按阶段4学习Vue 3组件、路由、Pinia及Nuxt渲染/数据获取。独立的web-common与两端宿主继续在各自项目中实施，不在本知识库修改。

机器验收：[stage-3-acceptance.json](../stages/stage-3-acceptance.json)。内容变更后应复核受影响证据再更新指纹，不能只改摘要消除门禁。学习者按实际独立实现更新复选框。
