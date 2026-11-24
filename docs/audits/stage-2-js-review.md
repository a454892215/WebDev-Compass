# 阶段 2.1 JavaScript进阶：逐点审查与验证

日期：2026-11-24；起点15:16:08 UTC。按[简明总则](../AUTHORING.md)编写并逐点阅读11篇理论、11个实验、11份练习及综合映射。目标是准确、完整、层层递进与实践对应，不增加复杂教学表单。阶段2整体R01–R09结论由主代理集成其余章节后确定。

## 内容与顺序

前置为阶段1对象、函数、作用域、Promise、模块、DOM与事件。推荐先原型/this/调用栈，再事件循环/复制/调度/严格模式/清理，最后平台对照；函数组合与模块史可回读。每篇解释机制、最小例、场景边界、有效移动对照和官方来源，练习包含实际故障注入和修复判据。

| 编号 | 逐点审查焦点 |
| --- | --- |
| 2.1.1 | 原型读取、实例遮蔽与删除回退，构造函数prototype与实际原型身份均用真实操作确认；访问器/不可写例外和原型污染边界已说明。 |
| 2.1.2 | 对象方法、提取调用错误、call/apply/bind、new及箭头捕获分别执行；没有把箭头叫作始终绑定当前组件。 |
| 2.1.3 | 真实嵌套调用和throw/finally/catch路径记录，不把手工日志冒充引擎上下文；综合任务按实际load内部catch契约修正。 |
| 2.1.4 | 真实Promise/queueMicrotask/嵌套微任务/timer入队结果验证；不扩张为任务来源全局FIFO或RAF绝对顺序。 |
| 2.1.5 | 浅引用修改、Date/Map、循环克隆、JSON丢字段和函数DataCloneError分别验证；项目嵌套草稿明确先新增模型。 |
| 2.1.6 | 真实连续调用、等待窗口、leading节流与防抖cancel验证；既有capstone.cancel明确已实现，扩展节流单独说明。 |
| 2.1.7 | 真实柯里化过滤与同步pipe结果对比，原输入未改；指出部分应用/柯里化差别和异步Promise契约。 |
| 2.1.8 | 真实动态import同一模块URL，namespace身份与导出状态增量共享；IIFE封装实际执行，CommonJS/AMD不假装浏览器原生。 |
| 2.1.9 | 实际经典非严格脚本与ESM样本比较this；ReferenceError/TypeError均捕获；综合任务采用人为故障注入而非假定隐式全局已存在。 |
| 2.1.10 | 真实EventTarget、两次mount、AbortSignal与定时器清理；重复运行无叠加，本实验不证明GC发生或堆大小。 |
| 2.1.11 | 真实Dedicated Worker返回总数、无document和输入副本修改，主数组仍为原值；Dart/RN只按官方文档做有边界对照，不宣称真机。 |

## 本轮发现与修正

- 原地图2.1.11的≈及旧RN Bridge表达容易误导；正文改为浏览器、Dart isolate与现代RN运行环境的差异，对地图标题的同步建议已交主代理。
- 结合实际阅读队列代码重新核对综合任务：load在内部catch显示UI而不是保证向外throw；当前草稿只有text/数字updatedAt；防抖已有.cancel；原项目没有隐式全局。任务分别改为契约分析、先新增嵌套模型、增加节流对照、人为故障注入。
- this实验显式使用ES模块严格语义，另用独立经典脚本演示非严格this，不把开发者控制台规则当统一环境。
- 模块史提供两文件最小例，真实实验采用动态import和live binding；没有安装AMD/CommonJS浏览器模拟器。

## 实际验证

[22项浏览器记录](./stage-2-js-runtime.json)：11页×390/1440两视口均通过。Chrome158后台运行，检查h1/main、语言、无整页水平溢出、无未处理异常，以及每个实验真实输出；2.1.8与2.1.10在同页再次运行确认模块共享增量与资源清理可重复。结果不是预填答案。

本轮另做9个单文件理论JS片段的Node语法检查及全部6个JS/MJS源码语法检查；2.1.8、2.1.11明确是两文件片段，按分文件语义审读，实际浏览器实验也分别加载真实模块/Worker。

可复跑命令（Playwright是外部QA工具，不成为教材运行依赖）：

```bash
python3 -m http.server 4195 --bind 127.0.0.1
PLAYWRIGHT_MODULE=/absolute/path/to/playwright-core/index.mjs node learning/2-examples/02-javascript-browser/2.1-js-advanced/verify.mjs
```

静态服务仅本机，验证结束关闭。全库链接、四部分和阶段验收由主代理最终检查；本组没有修改检查器或Git暂存/提交。

## 来源与边界

先查阅[Modern Web Guidance Break Up Long Tasks](https://developer.chrome.com/docs/modern-web-guidance/guides/performance/break-up-long-tasks)正文；该指南影响任务让出和响应性说明。通用原型/this等语言细节没有专门匹配MWG正文，继续读取MDN原型链、this、执行模型、structuredClone、严格模式、内存管理、模块、Debounce/Throttle、Functions及Web Workers正文，具体链接与日期在每篇笔记中。

移动对照核对[Dart Concurrency](https://dart.dev/language/concurrency)与[React Native Threading Model](https://reactnative.dev/architecture/threading-model)，仅用于说明隔离、消息与宿主差异。没有建立移动工程、调用Flutter运行环境或做真机测试；不把浏览器实验当Dart/RN行为验证。

未执行多浏览器、真机、屏幕阅读器全面审计、生产性能基准和GC时机实验。不以精确timer毫秒、RAF全局顺序或内存回收时间判断正确性。学习者独立完成情况未自动勾选。逐点机器记录见[11项JSON](./stage-2-js-points.json)。
