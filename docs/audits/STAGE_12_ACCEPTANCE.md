# 阶段12编写与质量验收

日期2026-11-25，总则版本1。24点：策略8、专项4、设计系统7、库工程5；编号保留。实际4代理，主负责库/Nuxt/整合，其余三组独立编写与实审；策略组额外核主SSR，专项组额外核库与包验证脚本。只读复审不计为重复测试或真实学习者试学。

## 范围与递进

开始复核[规划](./STAGE_12_PLAN_REVIEW.md)，将隔离/数据清理、视觉基线审批与环境、flaky首错、SSR有效内容/重复请求/双fixture、状态契约、真实tgz/types/CSS/peer消费补入原点，无新增重复ID。

前置阶段3构建/测试、4 Vue/Nuxt、6质量、7交付。先风险与测试组合，再适用专项；token/组件状态先于包契约/消费者。9–11按实际性能/隐私/事故回读，组件平台与多包不变成每个产品的强制前置。

| 规则 | 逐点与集成结论 |
| --- | --- |
| R01 | 24稳定编号四部分与契约/任务锚点齐全，无空文或统一重复练习。 |
| R02 | 风险→层级/隔离→失败与恢复，Token→生成→故事→API/主题→包消费，前置与扩展明确。 |
| R03 | 先MWG再一手资料及安装源码；真实SDK/工具版本、Vue/SSR/HTML语义、metadata与声明范围准确。 |
| R04 | 本地HTTP/视觉/shard、真实Storybook/SD、包dist/tgz/types/CSS/Changesets/Nuxt有运行证据；平台观察不冒称实装。 |
| R05 | 每点至少两项具体标准、独立变体、可复现故障或明确观察/配置推演、纠正参考。 |
| R06 | 24综合任务对应主宿主/库、独立lab或明确新增；不假设主有登录/持久保存、Pact或Figma同步。 |
| R07 | source stories/play、库产物与宿主证据分开；原生button/dialog、SSR/payload与私有数据、自动/人工测试术语一致。 |
| R08 | 下列发现修正与必要复验通过；静态/运行/只读、历史与本轮、未测范围分别报告。 |
| R09 | 正文499/590（84.6%），待91，索引下一阶段13；学习者勾选未修改。 |

## 逐点审查

- [策略8点](./stage-12-strategy-points.json)、[实审与SSR复审](./stage-12-strategy-review.md)。
- [专项4点](./stage-12-specialized-points.json)、[实审与库复审](./stage-12-specialized-review.md)。
- [设计7点](./stage-12-design-points.json)、[实审](./stage-12-design-review.md)。
- [库5点](./stage-12-library-points.json)、[实审](./stage-12-library-review.md)。

各点有机制/示例/故障/综合任务与来源的实质证据，8+4+7+5=24。策略12.1.8原pending在核读主源码和root5E2E真实结果后关闭，没有用文件存在消除质量问题。

## 发现、处置与复验

1. **锁文件与前置顺序**：新增小型workspace/固定Vite需重解析，沙箱DNS重试停止后在允许联网环境安装；最终冻结离线通过。一次prepare未结束即类型检查的缺文件失败，按依赖顺序等待完成再验，不跳过类型检查。
2. **宿主类型与原生行为**：htmlAttrs.dir返回literal类型；dialog中默认button不会提交method=dialog，显式submit；夜间skip link/焦点使用主题token。4组件/逻辑测试与生产5E2E通过。
3. **真实包消费**：不用src alias掩盖发布缺口。pnpm pack解到临时消费者，公开JS/types/CSS可消费、非法variant类型拒绝、单组件消费无unused marker、漏CSS实际重建无CSS，Vue external及本地真实路径同一。临时consumer显式链接宿主Vue，不说registry安装或全部兼容矩阵通过。
4. **Changesets当前行为**：3.0.3 init已交互，管道调用退出13不算成功；读当前官方及安装源码，以工具默认配置写确定临时config，再真实version得到1.0.1和changelog。无publish/tag/push或主库升版。临时CLI依赖解析需用真实模块路径，修正后成功。
5. **独立实验真实性**：本地schema契约不称Pact，手工变体不称Stryker；语法错误不算杀死。视觉正常/变化PNG作者实际查看，verify不写baseline；锁环境下字节比较不等于生产跨OS pixel diff。两shard同机顺序执行，不称远程分布式CI。
6. **专项路径与浏览器**：静态根路径规范化、axe使用独立context后真实复验；真实第二次膨胀构建超预算被拒，不只拿虚构字节比较。矩阵--list发现3测试只是发现，Firefox/WebKit未跑。
7. **Storybook实际集成**：共享.vue初按JS解析，补本lab显式Vue插件后真构建；真实play/主题/CSR CustomElement事件、attribute与delegatesFocus验证。遥测在配置及环境变量双处关闭，避免配置前boot。SD生成CSS/JS/.d.ts且TS正负消费，不把legacy type/value当完整DTCG认证。
8. **生成物目录与验收稳定性**：默认storybook-static及generated不在既有排除集合，会让资源检查/指纹读入可再生输出。迁到dist/storybook、dist/tokens，同步路径与ignore并清理旧输出，完整重跑tokens/类型/3Node/Storybook/两视口，通过；没有为新工具放宽全局检查器。
9. **教材措辞与metadata**：独立复审指出Storybook已有play交互、不应称仅文档；新增JS副作用需同步sideEffects而不能假设只声明CSS仍被保留；非法bump与合法但语义不当patch分别由工具/人审。正文/练习/逐点数据已收紧，不冒称额外浏览器重跑。

## 实际验证

| 范围 | 本轮真实结果 |
| --- | --- |
| 主组件库/Nuxt | 冻结离线、类型/ESLint/格式、4单元、生产构建、5Playwright及新串接check:ci本地全链通过 |
| 主浏览器 | 1440/390：有效初始SSR、reads.a仅增1且浏览器profile请求0、表单错误焦点/纯文本、dialog初焦点/Esc/显式关闭/返回、axe、RTL夜间/pseudo/无溢出 |
| 主HTTP | 并发原始A/B响应各自DTO且互斥、无Cookie原值、private/no-store、非法fixture访客、404 |
| 主包脚本 | 真实tgz/独立消费JS/CSS/types、Vue external与同解析路径、未用导出移除、漏CSS/非法variant负例、真实Changesets临时patch/changelog |
| strategy-lab | 冻结安装、4Node、390/1440正常/变化PNG与异步auto-wait，两shard各2pass/2workers |
| specialized-lab | 冻结安装、3Node、Vite真实膨胀构建预算负例、390/1440 axe标签正反/键盘/dialog/RTL/长文本与溢出故障 |
| storybook-lab | 冻结安装、真实SD生成/TS正负/3Node、Storybook生产构建、390/1440共享源码play/主题/CSR CustomElement事件属性焦点；输出目录修正后重跑 |

运行JSON：[主项目](./stage-12-practice-runtime.json)、[策略](./stage-12-strategy-runtime.json)、[专项](./stage-12-specialized-runtime.json)、[设计](./stage-12-design-runtime.json)。库5点共享主工程证据，不伪造单独一次运行。格式/措辞调整未改变代码时按本轮原证据复用，来源与执行者明确。

全库知识/链接、499/499四部分、HTML资源、42检查器回归及阶段0–12记录门禁通过；门禁仅检验记录覆盖/结构/新鲜度，技术/教学质量仍依据逐点阅读和行为证据，不能替代个人掌握。

## 未测与结论

主无真实身份/持久保存，fixture可改、reads公开且仅教学；本地保守全路由no-store不是生产静态资源缓存策略。Vue peer声明不等于所有版本已测；只有当前ESM/Vite/Nuxt和本地Vue版本，非CJS/UMD/全打包器。组件额外ARIA描述/高级表单需求要重新设计，不能覆盖已有错误关联。

未执行Pact SDK/Broker、Stryker、Chromatic/Percy/LostPixel、Testcontainers/Docker、LHCI、Firefox/WebKit/BrowserStack、屏幕阅读器/真机、Figma/TokensStudio远程同步、完整ASTcodemod、跨框架/SSR CustomElement、远程CI/生产发布或真实学习者试学。相应知识点用具体现成实验、官方观察/配置及待验前提交付，没有把品牌名当完成证据。

本轮声明范围内R01–R09达标，下一阶段13。资料完成、质量审查、学习者掌握和生产交付能力分别判断。
