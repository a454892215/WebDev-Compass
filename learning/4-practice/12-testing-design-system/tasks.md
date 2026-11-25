# 阶段12逐知识点综合任务

先读[主工作台](./README.md)和[验收边界](./docs/TESTING.md)，核对实际功能再做隔离变体。24项各自区分主Nuxt/库产物、独立策略/专项/Storybook实验、待接平台或新增扩展。不要把源码故事当包消费、axe当全部无障碍、模拟视口当真机。

<a id="p-12-1-1"></a>

## 12.1.1 测试策略文档：从产品风险确定证据与退出条件

独立strategy-lab验证本地契约/视觉/手工mutation/分片；主SSR由Nuxt实际测试，Pact/Stryker/SaaS/Testcontainers未运行。

为主Nuxt组件消费表单列策略与证据表：包产物、控件契约、SSR隔离、输入失败与关键旅程；先核实际tests/README，未实现的检查作为扩展，不改旧阶段的质量结论。

验收：

- [ ] 每个最高风险至少关联一个能失败的断言和发布阻断条件，说明选择该层级的理由。
- [ ] 把coverage预期、实际执行、源码审查、未测平台分别记录；无真实后端时不写生产预约成功。

[理论](../../1-notes/12-testing-design-system/12.1-testing-strategy/12.1.1.item-12-1-1.md) · [示例](../../2-examples/12-testing-design-system/12.1-testing-strategy/12.1.1.item-12-1-1-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.1-testing-strategy/12.1.1.item-12-1-1.md)

<a id="p-12-1-2"></a>

## 12.1.2 测试组合：按风险选单元、组件、契约与旅程

独立strategy-lab验证本地契约/视觉/手工mutation/分片；主SSR由Nuxt实际测试，Pact/Stryker/SaaS/Testcontainers未运行。

给主Nuxt的UiButton、UiField、API DTO、SSR接管和一个提交旅程画证据组合；组件与E2E各保留自己的职责，不机械复制每一条内部断言。

验收：

- [ ] 至少识别一个jsdom无法证明的行为和一个不值得放到整套E2E的纯逻辑。
- [ ] 任何mock都有边界说明，不把主HTTP、SSR或控件目标替换成全stub后宣称端到端通过。

[理论](../../1-notes/12-testing-design-system/12.1-testing-strategy/12.1.2.item-12-1-2.md) · [示例](../../2-examples/12-testing-design-system/12.1-testing-strategy/12.1.2.item-12-1-2-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.1-testing-strategy/12.1.2.item-12-1-2.md)

<a id="p-12-1-3"></a>

## 12.1.3 前后端契约：消费者需求、提供者验证与Pact边界

独立strategy-lab验证本地契约/视觉/手工mutation/分片；主SSR由Nuxt实际测试，Pact/Stryker/SaaS/Testcontainers未运行。

核对主Nuxt实际API DTO与前端依赖，新增一个字段改型负例。若团队采用Pact，再按官方步骤接consumer/provider验证；本课程独立lab证据不得改名为Pact通过。

验收：

- [ ] additive变更保持投影结果，字段改型导致实际decoder测试失败；记录失败字段/HTTP状态。
- [ ] 说明本地decoder契约与Pact consumer/provider/Broker各自缺什么，不把未运行Pact写成已集成。

[理论](../../1-notes/12-testing-design-system/12.1-testing-strategy/12.1.3.contract-testing.md) · [示例](../../2-examples/12-testing-design-system/12.1-testing-strategy/12.1.3.contract-testing-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.1-testing-strategy/12.1.3.contract-testing.md)

<a id="p-12-1-4"></a>

## 12.1.4 视觉回归：固定环境、审查基线与真实变化检测

独立strategy-lab验证本地契约/视觉/手工mutation/分片；主SSR由Nuxt实际测试，Pact/Stryker/SaaS/Testcontainers未运行。

为主组件的default/disabled/error与宽窄状态选择最少视觉场景；用独立lab演示基线流程，若接入Chromatic等平台明确新增配置与实际上传尚未完成。

验收：

- [ ] 未批准的可见样式变化导致原基线检查失败；正常场景与故意变化检测分别记录。
- [ ] 不能通过每次自动重建基线/放大阈值让红灯消失；写出OS/浏览器/字体/DPR与审批说明。

[理论](../../1-notes/12-testing-design-system/12.1-testing-strategy/12.1.4.visual-regression.md) · [示例](../../2-examples/12-testing-design-system/12.1-testing-strategy/12.1.4.visual-regression-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.1-testing-strategy/12.1.4.visual-regression.md)

<a id="p-12-1-5"></a>

## 12.1.5 Mutation Testing：用受控缺陷检查断言有效性

独立strategy-lab验证本地契约/视觉/手工mutation/分片；主SSR由Nuxt实际测试，Pact/Stryker/SaaS/Testcontainers未运行。

挑主项目一条具有真实后果的输入/disabled判定做受控变体，保留原通过→变体断言失败→恢复通过。Stryker接入仅作为按需扩展，不默认拉全仓昂贵任务。

验收：

- [ ] 明确记录原实现先通过，以及变体失败的具体AssertionError，不接受SyntaxError代替。
- [ ] 说明单个变体结果与mutation score/覆盖率不同，存活时给出行为分析而非机械添加镜像测试。

[理论](../../1-notes/12-testing-design-system/12.1-testing-strategy/12.1.5.mutation-testing.md) · [示例](../../2-examples/12-testing-design-system/12.1-testing-strategy/12.1.5.mutation-testing-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.1-testing-strategy/12.1.5.mutation-testing.md)

<a id="p-12-1-6"></a>

## 12.1.6 Playwright扩展：并行、Sharding与测试数据隔离

独立strategy-lab验证本地契约/视觉/手工mutation/分片；主SSR由Nuxt实际测试，Pact/Stryker/SaaS/Testcontainers未运行。

给主Nuxt关键旅程列可独立分片的集合与独立上下文，先确保完整单机检查；需要CI时再配置分片/报告合并，主教学项目不默认启动容器。

验收：

- [ ] 两片并集等于完整测试集合，标题/数据不重叠误依赖，保留实际workers/shard日志。
- [ ] 区分API-only、浏览器E2E、远程多机和容器服务；无daemon不写Testcontainers已通过。

[理论](../../1-notes/12-testing-design-system/12.1-testing-strategy/12.1.6.e2e.md) · [示例](../../2-examples/12-testing-design-system/12.1-testing-strategy/12.1.6.e2e-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.1-testing-strategy/12.1.6.e2e.md)

<a id="p-12-1-7"></a>

## 12.1.7 Flaky治理：保留首次失败，修等待与共享状态

独立strategy-lab验证本地契约/视觉/手工mutation/分片；主SSR由Nuxt实际测试，Pact/Stryker/SaaS/Testcontainers未运行。

检查主Nuxt测试是否等待业务状态而非固定时间，给一个假设迟到请求/共享fixture问题写根因记录；未发生真实flaky时以明确推演而非历史事故口吻写。

验收：

- [ ] 失败定位到可解释的等待/状态原因，恢复后无需固定sleep或无限重试。
- [ ] 原始失败、重试与暂时隔离分别记录，quarantine有owner/到期与关键风险替代覆盖。

[理论](../../1-notes/12-testing-design-system/12.1-testing-strategy/12.1.7.flaky-test.md) · [示例](../../2-examples/12-testing-design-system/12.1-testing-strategy/12.1.7.flaky-test-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.1-testing-strategy/12.1.7.flaky-test.md)

<a id="p-12-1-8"></a>

## 12.1.8 Nuxt SSR专项：有效HTML、接管与双请求隔离

独立strategy-lab验证本地契约/视觉/手工mutation/分片；主SSR由Nuxt实际测试，Pact/Stryker/SaaS/Testcontainers未运行。

阅读并运行主Nuxt已有SSR专项，核对有效HTML、payload接管与两fixture并发；若某项不存在，明确新增并给对应失败判据，不拿strategy-lab的静态卡片替代Nuxt证据。

验收：

- [ ] 证据同时覆盖有效SSR内容、接管交互和A/B双上下文隔离；原始Cookie/token不进入HTML/payload。
- [ ] 说明初始数据请求计数范围、明确刷新产生的合法请求；缓存测试不把同URL先后访问当全部并发证据。

[理论](../../1-notes/12-testing-design-system/12.1-testing-strategy/12.1.8.ssr-hydration.md) · [示例](../../2-examples/12-testing-design-system/12.1-testing-strategy/12.1.8.ssr-hydration-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.1-testing-strategy/12.1.8.ssr-hydration.md)

<a id="p-12-2-1"></a>

## 12.2.1 无障碍验收：自动规则、键盘行为与辅助技术分层

专项lab与主宿主的证据分开；LHCI/读屏/Firefox/WebKit/BrowserStack/真机未运行。

为主Nuxt组件的默认/禁用/表单错误/原生dialog状态补一份无障碍验收矩阵，先核已有组件和测试；未包含的状态在隔离副本新增。把自动/键盘/读屏证据分别记录，不以axe零违规宣布全面符合。

验收：

- [ ] 标签缺失负例必须检出并恢复；正常与错误状态都检查，说明自动化不能覆盖的至少两项。
- [ ] 只用键盘打开/关闭模态并重试，焦点不落到inert外部；读屏结果明确已测或未测及版本前提。

[理论](../../1-notes/12-testing-design-system/12.2-specialized-testing/12.2.1.a11y.md) · [示例](../../2-examples/12-testing-design-system/12.2-specialized-testing/12.2.1.a11y-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.2-specialized-testing/12.2.1.a11y.md)

<a id="p-12-2-2"></a>

## 12.2.2 性能回归：固定环境、多次实验与真实产物预算

专项lab与主宿主的证据分开；LHCI/读屏/Firefox/WebKit/BrowserStack/真机未运行。

为主Nuxt/组件库产物制定一份性能回归门禁草案，列包字节与运行时指标分别负责什么；运行独立lab的真实产物差异，并明确主构建目录要适配而不能原样把Vite assets假定为Nuxt _nuxt。

验收：

- [ ] 证据来自实际构建目录，空/缺产物不能当0字节通过；正常与超过阈值两路径都可复现。
- [ ] 明确本轮是字节预算还是LHCI运行，配置若未执行不得填分数；报告指标单位、比较环境与预算依据。

[理论](../../1-notes/12-testing-design-system/12.2-specialized-testing/12.2.2.item-12-2-2.md) · [示例](../../2-examples/12-testing-design-system/12.2-specialized-testing/12.2.2.item-12-2-2-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.2-specialized-testing/12.2.2.item-12-2-2.md)

<a id="p-12-2-3"></a>

## 12.2.3 国际化测试：文本扩展、RTL与混合方向标识

专项lab与主宿主的证据分开；LHCI/读屏/Firefox/WebKit/BrowserStack/真机未运行。

为主Nuxt的locale/dir与表单错误/按钮文本建立长文本/RTL案例，先核实际文案与行为；若增加日期货币应在隔离副本实现并明确固定参数，不把lab截图称主应用所有语言验收。

验收：

- [ ] 伪本地化和RTL分别检查，不将“字符串换了”当排版通过；长文本和按钮可换行且无横溢出。
- [ ] 混合方向标识可正确选择/读取，金额/日期断言明确locale/timezone；母语审校与视觉基线未做则单列。

[理论](../../1-notes/12-testing-design-system/12.2-specialized-testing/12.2.3.item-12-2-3.md) · [示例](../../2-examples/12-testing-design-system/12.2-specialized-testing/12.2.3.item-12-2-3-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.2-specialized-testing/12.2.3.item-12-2-3.md)

<a id="p-12-2-4"></a>

## 12.2.4 跨浏览器矩阵：引擎、版本、设备和服务分别记录

专项lab与主宿主的证据分开；LHCI/读屏/Firefox/WebKit/BrowserStack/真机未运行。

为主Nuxt/组件库提交支持矩阵与原生dialog/焦点/RTL关键旅程清单，标记本轮Chrome实测与Firefox/WebKit/真机未测，明确后续运行条件和fallback。

验收：

- [ ] 每行写明实际引擎/品牌/版本与OS/设备，明确哪些是视口模拟、桌面引擎或真实设备。
- [ ] 配置可以发现同一行为用例，未装引擎/云服务不计运行通过；失败保留版本、最小复现与回退验收。

[理论](../../1-notes/12-testing-design-system/12.2-specialized-testing/12.2.4.item-12-2-4.md) · [示例](../../2-examples/12-testing-design-system/12.2-specialized-testing/12.2.4.item-12-2-4-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.2-specialized-testing/12.2.4.item-12-2-4.md)

<a id="p-12-3-1"></a>

## 12.3.1 Design Token分层：从视觉值到语义与组件契约

Storybook真实共享UiButton源码，SD本地生成；Figma同步/跨框架SSR/完整AST迁移是观察或新增。

为主组件库的按钮/字段列primitive→semantic→组件状态映射，并用独立token实验验证新增focus别名。主宿主没有自动接Figma源，若接入生成CSS应明确作为新增扩展。

验收：

- [ ] 生成CSS/JS/.d.ts均包含新增语义，alias解析后值匹配预期，不能手改generated掩盖源缺失。
- [ ] 在明暗主题及键盘焦点分别核对可见性，说明token类型不能代替视觉/无障碍验收。

[理论](../../1-notes/12-testing-design-system/12.3-design-system/12.3.1.design-token.md) · [示例](../../2-examples/12-testing-design-system/12.3-design-system/12.3.1.design-token-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.3-design-system/12.3.1.design-token.md)

<a id="p-12-3-2"></a>

## 12.3.2 Style Dictionary流水线：设计导出、转换、生成与审查

Storybook真实共享UiButton源码，SD本地生成；Figma同步/跨框架SSR/完整AST迁移是观察或新增。

为主组件库补一条设计源→转换→CSS/types→stories/宿主验收→版本记录的交付说明，先使用本地合成JSON，不声称已有Figma自动同步。

验收：

- [ ] 保留源版本、变换版本与生成差异；缺失/冲突引用必须阻断，不能随意降级为undefined。
- [ ] 明确本地JSON生成已实测，Figma导出/插件/远程同步未测，列需要设计与前端共同核对的字段。

[理论](../../1-notes/12-testing-design-system/12.3-design-system/12.3.2.style-dictionary-tokens-studio.md) · [示例](../../2-examples/12-testing-design-system/12.3-design-system/12.3.2.style-dictionary-tokens-studio-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.3-design-system/12.3.2.style-dictionary-tokens-studio.md)

<a id="p-12-3-3"></a>

## 12.3.3 Storybook Vue3：真实组件状态、交互play与文档基线

Storybook真实共享UiButton源码，SD本地生成；Figma同步/跨框架SSR/完整AST迁移是观察或新增。

运行实际Storybook的共享UiButton故事，将Primary/Disabled与主Nuxt消费同一组件的行为对照；新增状态时同步故事与宿主最小回归，不把构建通过等于所有play通过。

验收：

- [ ] Story引用真实UiButton API，play使用角色/名称和可观察行为，不以query内部Vue实现为主。
- [ ] 保存一项独立失败→修复记录；注明截图本地/源码展示与主dist消费、平台视觉回归的区别。

[理论](../../1-notes/12-testing-design-system/12.3-design-system/12.3.3.storybook.md) · [示例](../../2-examples/12-testing-design-system/12.3-design-system/12.3.3.storybook-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.3-design-system/12.3.3.storybook.md)

<a id="p-12-3-4"></a>

## 12.3.4 Vue组件API：原生语义、属性事件和slot组合

Storybook真实共享UiButton源码，SD本地生成；Figma同步/跨框架SSR/完整AST迁移是观察或新增。

阅读主UiButton与字段组件实际API，给一个新需求写prop/event/slot/键盘/错误行为契约，区分已经实现和建议新增，不改调用方假设。

验收：

- [ ] 调用方式能解释状态优先级、原生type/disabled与可访问名称，不能只有视觉spinner。
- [ ] 保留原variant与slot调用；若必须改变行为，记录兼容/迁移而不是隐式改默认。

[理论](../../1-notes/12-testing-design-system/12.3-design-system/12.3.4.api.md) · [示例](../../2-examples/12-testing-design-system/12.3-design-system/12.3.4.api-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.3-design-system/12.3.4.api.md)

<a id="p-12-3-5"></a>

## 12.3.5 组件SemVer：公开契约、破坏性变化与迁移证据

Storybook真实共享UiButton源码，SD本地生成；Figma同步/跨框架SSR/完整AST迁移是观察或新增。

为主组件库选择一个真实公开契约变更写迁移/兼容/回退文档；独立lab仅验证配置值转换，真正Changelog/包版本操作按12.4实际工具。

验收：

- [ ] 明确至少一个编译可通过但仍破坏行为/样式契约的例子，以及相应版本决定。
- [ ] 静态迁移有前后差异/幂等/保留未知值；不把正则替换称全语法安全codemod。

[理论](../../1-notes/12-testing-design-system/12.3-design-system/12.3.5.item-12-3-5.md) · [示例](../../2-examples/12-testing-design-system/12.3-design-system/12.3.5.item-12-3-5-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.3-design-system/12.3.5.item-12-3-5.md)

<a id="p-12-3-6"></a>

## 12.3.6 CSS变量主题：作用域、品牌与SSR一致

Storybook真实共享UiButton源码，SD本地生成；Figma同步/跨框架SSR/完整AST迁移是观察或新增。

比较主Nuxt的theme/locale初始状态与Storybook局部主题，给跨区域浮层或多品牌接入写约束；新增需求不冒称已由主库自动处理。

验收：

- [ ] 局部品牌改变按钮语义色而不污染外层，并核对默认/hover/focus/disabled各状态对比。
- [ ] SSR/客户端初始theme来源一致，未实装系统偏好或浮层策略需明确列为扩展。

[理论](../../1-notes/12-testing-design-system/12.3-design-system/12.3.6.item-12-3-6.md) · [示例](../../2-examples/12-testing-design-system/12.3-design-system/12.3.6.item-12-3-6-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.3-design-system/12.3.6.item-12-3-6.md)

<a id="p-12-3-7"></a>

## 12.3.7 Web Components选修：原生宿主、Shadow DOM与事件契约

Storybook真实共享UiButton源码，SD本地生成；Figma同步/跨框架SSR/完整AST迁移是观察或新增。

运行独立WebElement原生宿主故事，写是否值得为主Vue库增加CustomElement分发的取舍；主库当前不是Web Components包，SSR/跨框架接入是新增工作。

验收：

- [ ] 能解释并验证DOM CustomEvent detail、命名冲突和attribute/property差别，保留原生button语义。
- [ ] 列Shadow样式/ARIA与SSR/表单边界，未跑其他框架与浏览器时不写“跨框架全兼容”。

[理论](../../1-notes/12-testing-design-system/12.3-design-system/12.3.7.item-12-3-7.md) · [示例](../../2-examples/12-testing-design-system/12.3-design-system/12.3.7.item-12-3-7-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.3-design-system/12.3.7.item-12-3-7.md)

<a id="p-12-4-1"></a>

## 12.4.1 ESM导出与Tree-shaking：从真实消费产物验证

主lib/dist、真实tgz消费者及Nuxt宿主已验证；Changesets只临时version，无publish/远程CI。

运行主verify:package，把真实tgz条目、单组件消费JS中未用marker缺席和类型入口检查合为包体证据；新增其他格式作为扩展而非已有能力。

验收：

- [ ] 消费者从tgz公开入口构建，UnusedWidget标记缺席；库本身不被误当消费包体。
- [ ] 列出导出/类型/CSS路径，说明当前仅ESM和本轮工具链通过，不虚报CJS。

[理论](../../1-notes/12-testing-design-system/12.4-component-library/12.4.1.tree-shaking.md) · [示例](../../2-examples/12-testing-design-system/12.4-component-library/12.4.1.tree-shaking-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.4-component-library/12.4.1.tree-shaking.md)

<a id="p-12-4-2"></a>

## 12.4.2 Vue Peer Dependencies：版本契约与单运行时

主lib/dist、真实tgz消费者及Nuxt宿主已验证；Changesets只临时version，无publish/远程CI。

为主组件库记录peer范围、外部化和真实路径检查，补一张“已测Vue3.5.46/Nuxt4.7，其余待测”的兼容表。

验收：

- [ ] 区分peer声明、external产物和安装解析三份证据，本轮真实路径确认相同。
- [ ] 明确声明范围和实际测试版本；不把“peer自动安装”解释成保证所有依赖图单例。

[理论](../../1-notes/12-testing-design-system/12.4-component-library/12.4.2.peer-dependencies.md) · [示例](../../2-examples/12-testing-design-system/12.4-component-library/12.4.2.peer-dependencies-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.4-component-library/12.4.2.peer-dependencies.md)

<a id="p-12-4-3"></a>

## 12.4.3 按需导入、CSS与sideEffects：避免样式被漏交付

主lib/dist、真实tgz消费者及Nuxt宿主已验证；Changesets只临时version，无publish/远程CI。

核对主Nuxt从@compass/stage12-ui/style.css消费生成样式，并运行漏CSS负例；为未来CSS分入口列新增方案，不声称现已按组件拆CSS。

验收：

- [ ] 有样式/漏样式两次真实构建结果不同，恢复后CSS规则与设计token存在。
- [ ] 能解释sideEffects匹配模式、动态加载与摇树职责，不把包声明当兼容证明。

[理论](../../1-notes/12-testing-design-system/12.4-component-library/12.4.3.item-12-4-3.md) · [示例](../../2-examples/12-testing-design-system/12.4-component-library/12.4.3.item-12-4-3-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.4-component-library/12.4.3.item-12-4-3.md)

<a id="p-12-4-4"></a>

## 12.4.4 Changesets：声明版本意图并审阅实际Changelog

主lib/dist、真实tgz消费者及Nuxt宿主已验证；Changesets只临时version，无publish/远程CI。

运行主verify:changesets并记录临时1.0.0→1.0.1，给UiField一次假设breaking修改写发布说明；主库当前版本不变，真实发布留独立授权。

验收：

- [ ] 真实version能生成预期patch与changelog，明确没有远程publish/标签/推送。
- [ ] 说明至少含行为改变、影响与迁移方式，不只写“update components”；bump取舍有人审阅。

[理论](../../1-notes/12-testing-design-system/12.4-component-library/12.4.4.changelog.md) · [示例](../../2-examples/12-testing-design-system/12.4-component-library/12.4.4.changelog-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.4-component-library/12.4.4.changelog.md)

<a id="p-12-4-5"></a>

## 12.4.5 组件库无障碍门禁：状态契约、键盘与人工验收

主lib/dist、真实tgz消费者及Nuxt宿主已验证；Changesets只临时version，无publish/远程CI。

执行主check:ci，把Unit、E2E、axe、键盘、SSR、人工待验分栏记录；关联独立specialized-lab的真实label/溢出负例，远程流水线另待接入。

验收：

- [ ] check:ci明确失败即阻断；状态矩阵能对应真实测试源，不把所有状态都声称经过axe。
- [ ] 包含键盘、错误关联与焦点恢复；读屏/真机/多引擎未做项如实保留，不以0违规等同完整合规。

[理论](../../1-notes/12-testing-design-system/12.4-component-library/12.4.5.item-12-4-5.md) · [示例](../../2-examples/12-testing-design-system/12.4-component-library/12.4.5.item-12-4-5-demo.md) · [独立练习](../../3-exercises/12-testing-design-system/12.4-component-library/12.4.5.item-12-4-5.md)
