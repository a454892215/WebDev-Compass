# WebDev Compass 项目规则

## 学习主线与目录维护

- 默认学习与示例主线是 HTML/CSS/JavaScript → TypeScript → Vue 3 → Nuxt。React/Next.js 是选修，不作为 Vue/Nuxt 主线交付或继续编写的前置。
- 阶段和章节标题应具体写明学习的技术或产出；框架阶段标明 Vue 3、Nuxt 等框架名称，通用阶段写明操作能力，不用“平台化工程”“生态”等宽泛名称代替。标题与总览、统计输出保持一致，改名保护旧链接锚点。
- 先按 KNOWLEDGE_MAP.md 和 docs/LEARNING_PATH.md 定位前置、产出及验收，再编写正文。阶段编号是稳定索引，不等于全部主题严格线性必修；阶段 8–15 按项目与职责深化。
- 无障碍、兼容、隐私、安全和测试从基础练习贯穿。目录新增须说明真实缺口，不重复统计已有专题；保护既有编号、路径和学习勾选。
- 总覆盖率包括选修，反映知识库正文建设，不作为主线通关或高级能力保证。固定周数、目录勾选、AI 生成均不能替代掌握和交付证据。

## 查询知识地图完成度

- 用户询问“知识地图完成度”“各阶段进度”或同义问题时，运行 `python3 scripts/check_knowledge.py --table`，直接以 Markdown 表格输出实际结果，不凭记忆填写数字。
- 固定列为：阶段、主题、知识点、已编写、待编写、正文完成度；包含各阶段及合计。标题和数量取自当前文件，新增正文后自动变化。
- 统计口径为“已存在的知识点正文 ÷ 地图知识点总数”，不使用学习勾选，不把覆盖率当作质量验收率；独立框架专题不计入地图分母。
- 若脚本报错或发现断链，明确说明，不能把上次结果当作本次成功统计。仅查询进度不修改文件或重跑浏览器验收。

## Web 相关任务先查 Modern Web Guidance

- 回答 Web 开发相关问题，或编写、修改、审查相关知识笔记和示例时，必须先检索 Modern Web Guidance 并阅读匹配的指南正文，再作答、确定技术方案或修改文件。适用范围包括 HTML、CSS、浏览器端 JavaScript/TypeScript、Web UI、浏览器 API、可访问性、性能、安全和兼容性等 Web 开发主题。
- 优先使用已安装的 `modern-web-guidance` 技能。技能不可用时，使用官方 CLI 的 `search` 和 `retrieve`，或直接查阅 [官方指南目录](https://developer.chrome.com/docs/modern-web-guidance/guides)。检索时使用简短的英文动作短语。
- 结合项目约束和目标浏览器的支持情况采用指南建议，并在答复或交付说明中注明参考的指南 ID 或链接。查阅后没有匹配指南，或指南无法访问时，简要说明检索结果或访问问题，再依据可核实的资料继续任务。

## 学习资料四部分约束

- 学习内容统一放在 `learning/1-notes/`、`learning/2-examples/`、`learning/3-exercises/`、`learning/4-practice/`，内部按阶段与编号组织；`framework-guide/` 独立维护工程搭建专题。
- 遵守 `docs/LEARNING_STRUCTURE.md`；每个已编写知识点必须维护四部分契约 `docs/stages/stage-N.json`，不得用空文件或通用重复任务充数。未来未编写章节保持预留。
- 内容改动必须通过 `python3 scripts/check_knowledge.py --report` 与 `python3 scripts/check_learning_delivery.py`；检查器改动运行 `python3 -m unittest discover -s scripts/tests -v`。
- 结构完整、实际运行和学习掌握分别报告，地图复选框不自动勾选。

## 阶段编写与质量验收

- 每次新增、修订或验收阶段知识内容前，必须先读取 `docs/AUTHORING.md`《阶段编写与验收总则》，按 R01–R09 制定并持续更新阶段清单。
- 正式验收必须逐点审查理论、示例、练习、综合任务与跨章节逻辑；不能仅凭文件存在或脚本通过认定质量达标。
- 阶段整体达标必须覆盖该阶段全部知识点，具有 `docs/stages/stage-N-acceptance.json` 和逐点审查证据，并通过 `python3 scripts/check_stage_acceptance.py --stage N`。未达标写明具体规则、问题与恢复条件。
- 代码变更后复验受影响行为；未改且条件适用的旧证据可注明来源复用，不冒充本轮重跑。质量结论不得改变正文完成度表格统计口径或学习者勾选。

- 学习资料 HTML 改动须运行 `python3 scripts/check_learning_resources.py`，检查示例中的资源与返回导航链接；Markdown 检查器不能替代此项。

- 采用总则中的简明教学原则：内容准确、范围完整、前置清楚、层层递进、示例和练习对应。参考项目已有功能必须查实际代码，新增扩展明确标注；不增加重复教学设计表，不把AI审阅当真实学习者试学。
