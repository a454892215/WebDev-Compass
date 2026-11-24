# 阶段 0、1：按总则的质量验收

日期：2026-11-24。任务起点：14:53:22 UTC。总则版本1（已按用户要求收敛为简明标准）。实际参与4个代理：主代理负责总则、HTML、公共任务、检查器与集成；其余分别审查阶段0、CSS、JavaScript及基础质量。

## 验收结论

| 阶段 | 逐点审查 | 初检 | 修正后结论 | 必达规则 |
| --- | --- | --- | --- | --- |
| 0 环境、浏览器与HTTP基础 | 19/19 | 未达标 | 基础教材质量达标 | R01–R09全部通过 |
| 1 HTML、CSS与JavaScript页面 | 106/106 | 未达标 | 基础教材质量达标 | R01–R09全部通过 |

原来的正文100%表示文件覆盖；初检确有技术和教学缺陷，本轮已修复。最终达标限本总则声明的基础教材范围及列明验证，不保证没有任何未知错误，也不代表学习者已做完练习。全库正文仍125/583（21.4%），未改变学习者复选框。

## R01–R09集成复核

| 规则 | 阶段0 | 阶段1 | 证据 |
| --- | --- | --- | --- |
| R01 范围与覆盖 | 19点四部分，19点审查 | HTML19+CSS41+JS42+质量4，106点四部分审查 | 两阶段契约与逐点JSON、结构检查 |
| R02 前置与顺序 | 环境/工具/网络目标与观察产出清楚，框架不作先修 | 原生结构→CSS→JS→脚本型HTML回读→完整质量/综合实践；各章补具体先修 | 两阶段及各章README |
| R03 理论与来源 | 修正SOP/CSRF、Cookie、SSR、Node/Git/TLS/WS等表述，19篇有来源 | HTML日期/标签、CSS层叠/BFC、JS上下文和类比等逐点核对 | 4份分组报告及逐点记录 |
| R04 示例与复现 | 本地HTTP/CORS、REST、WS、CLI实际运行；外网观察类型明确 | 修复动画、XHR与服务边界；静态fixture/真实构建/本地API分开 | 本轮运行JSON与适用历史记录 |
| R05 独立练习 | 19份操作、验收、排错和参考 | 106份逐篇核对；41项CSS排错改可操作故障，其余修复具体错配 | 练习文件、分组记录 |
| R06 综合实践 | 环境与网络观察报告、19项对应任务 | 原生目录项目、106项具体任务；已有代码与新增扩展分开 | 两阶段tasks与项目README |
| R07 连贯与适用质量 | 同源/同站、导航/渲染、模拟/实测、移动类比明确 | Set/数组、现有/新增分页、Promise链/async-await、Vue预告等交叉修正 | 公共tasks及逐点审查 |
| R08 验证与闭环 | 必达问题已修复，运行记录与未测边界明确 | 必达问题已修复，受影响专项通过，未改机制注明历史复用 | 本轮机器检查、分组运行证据 |
| R09 状态与交接 | 旧“待复审”状态更新 | 质量与正文统计分开，旧建设记录保留历史身份 | README、PROGRESS、本记录与机器验收记录 |

## 本轮具体问题的再次核对（非新增规则层）

| 条目 | 已采取措施 |
| --- | --- |
| Q01 项目事实 | 主代理交叉检查公共任务，修正收藏Set、未实现分页/第二数据源/计时器、Promise改写及图标前置等假设；HTML19项改为具体项目扩展 |
| Q02 片段上下文 | 修复未声明input、async基础顶层await、事件片段接收者、缺label；语言片段语法与关键机制另验证 |
| Q03 真实排错 | CSS41项改具体注入和修复判据；HTML/JS/阶段0逐份核对动手与错误路径 |
| Q04 目标机制 | 动画不再只切换同一终点；XHR先查HTTP状态；模拟fetch日志不冒充请求 |
| Q05 四部分迁移 | 每点关联具体实验、独立任务和共享项目产出，不要求参考项目预装全部扩展答案 |
| Q06 路径闭环 | 修复59处HTML内部返回路径；Markdown、HTML、模块/接口加载分别检查，新增HTML离线门禁 |
| Q07 证据真实 | 阶段0默认本地fixture；记录本轮实测与前轮复用；外网、真机、生产等未测不冒充通过 |
| Q08 概念维度 | SOP/CSRF、SPA/SSR、DOM/Widget、绑定/对象等修正并检查标题及相邻正文 |
| Q09 无循环先修 | 章节索引明确回读，观察支架不等于必须先会实现；Vue仅作后续预告 |
| Q10 有效失败回归 | 37项单元回归含迁移断链、缺项、未关闭问题、遗漏审查、共享资源和规则变化后的过期拒绝 |

本轮按实际问题逐项复核，最终总则只保留准确、完整、递进、实践对应等基本要求，不增加复杂教学设计文件。已查阅[外部教学依据](../TEACHING_EVIDENCE.md)，适用原则落实到阶段入口、示例、独立练习及综合任务；预测/解释/延后变体是学习建议。没有真实学习者试学或学习效果实验。

## 逐点审查与修正依据

- [阶段0：19点报告](./stage-0-review.md) · [逐点JSON](./stage-0-points.json)
- [阶段1 HTML：19点报告](./stage-1-html-review.md) · [逐点JSON](./stage-1-html-points.json)
- [阶段1 CSS：41点报告](./stage-1-css-review.md) · [逐点JSON](./stage-1-css-points.json)
- [阶段1 JS与质量：46点报告](./stage-1-js-quality-review.md) · [逐点JSON](./stage-1-js-quality-points.json)

## 验证分层

本轮执行：Markdown本地链接和预留检查、四部分125/125、HTML资源118页445引用、检查器37项单元回归、61个脚本入口的Node语法检查；最终结果零错误。阶段质量记录的覆盖、9规则、证据文件、未关闭问题及来源指纹检查均通过。脚本不自动理解教材语义，技术与教学判断来自上述逐点审阅。

运行专项：[阶段0浏览器14项](./stage-0-browser.json)，另有REST CRUD/204/404/坏JSON、WS双页广播、Node CLI、临时Git操作，命令及边界见分组报告；[CSS动画8项](./stage-1-css-runtime.json)；[JS服务8项HTTP与3项Chrome](./stage-1-js-quality-runtime.json)。修复的运行行为专项验证，未改的阶段1机制复用[前轮HTML38项](../stages/webdev-stage1-html.json)、[其余实验174项及综合项目6组](../stages/webdev-stage1-browser.json)、[质量专项](../stages/webdev-stage1-special.json)和[真实CSS构建证据](../../learning/4-practice/01-web-fundamentals/toolchain/BUILD_EVIDENCE.md)。未把旧证据说成本轮全量重跑。

浏览器均为后台Chrome158，390/1440视口模拟；本轮无真机、多浏览器、屏幕阅读器全面认证、公网DNS/TLS/CDN/HTTP2/3对比、真实业务后端、部署或完整编辑器UI验收。阶段0的外网主题保留可执行观察清单和未验证出口；这是教材交付，不宣称这些外部实践已替学习者完成。所有本轮教学服务和临时防休眠断言在收尾释放。

## 后续与可复跑命令

```bash
python3 scripts/check_knowledge.py --report
python3 scripts/check_learning_delivery.py
python3 scripts/check_learning_resources.py
python3 -m unittest discover -s scripts/tests -v
python3 scripts/check_stage_acceptance.py --stage 0 --stage 1
```

阶段正式记录：[阶段0](../stages/stage-0-acceptance.json)、[阶段1](../stages/stage-1-acceptance.json)。来源指纹过期时先复核变更与必要验证，再刷新，不允许只改指纹消除报错。下一正文阶段为阶段2；独立Nuxt仓库仍在各自项目开发，本轮未修改。

本轮先读Modern Web Guidance [HTML](https://developer.chrome.com/docs/modern-web-guidance/guides/html/html)、[Forms](https://developer.chrome.com/docs/modern-web-guidance/guides/forms/forms)、[CSS布局](https://developer.chrome.com/docs/modern-web-guidance/guides/css/css-layout)等匹配正文，其他官方来源和无法匹配的主题见各组报告；不把指南的新能力视为所有浏览器必需支持。
