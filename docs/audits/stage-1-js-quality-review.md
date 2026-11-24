# 阶段 1 JavaScript 与基础质量逐点复核

审查日期：2026-11-24。依据：[阶段编写与验收总则](../AUTHORING.md)，规则版本 1，R01–R09。范围为 1.3 的 42 个知识点、1.4 的 4 个知识点。逐点审查见 [46 项记录](./stage-1-js-quality-points.json)。本记录只负责这两个章节，阶段 1 整体结论由阶段验收记录集成 HTML、CSS、公共综合项目和全仓门禁后给出。

## 审查方法与结论

逐篇阅读理论、对应场景实现/HTML、独立练习和共享项目中的逐点任务，并比较核心结论、预期输出、错误输入和前置依赖。未以标题、固定字数或脚本成功替代语义审查。检查器可以验证路径与覆盖，不能证明讲解正确或学习者已独立完成。

修正下列问题后，本范围 46 项资料符合本阶段基础学习目标：先建立语言与浏览器机制，再连接本地 HTTP，并明确高级语言、兼容治理、辅助技术、真实后端和生产安全的后续边界。每个点保留独立任务与排错，完整综合项目不要求预先实现所有扩展。

| 问题 | 范围与修正 | 复核证据 |
| --- | --- | --- |
| JS-01 前置重复并出现跳跃 | 42 篇改为具体前置；章节推荐先补回调、同步错误和定时器，再学 Promise；说明共享实验外壳不是首课先修 | 各篇前置与章节 README；逐点记录 |
| JS-02 最小片段上下文不清 | 转换页不再引用未声明 input；async 基础改函数内部 await；事件页显式查询按钮并定义 onResize/清理 | 41 个单文件 JS 片段 Node 语法检查通过；2 个多文件模块例按分文件语义审阅；转换及 async 离线断言 |
| JS-03 标题包含但最小片段未展开的语法 | 补数组解构、对象计算属性名和 slice/includes；字符串操作改为副本常量，不声称页面有额外输入框 | 对应正文/练习；数组解构与计算键离线断言 |
| JS-04 移动端标题误导 | 将 DOM≈直接操作 Widget 树改为 DOM 节点、原生 View 与声明式 UI 的区别 | 正文、示例、章节及主代理同步地图标题 |
| JS-05 迁移后返回笔记链接错误 | 修正 42 个 JS HTML 的 ../../../learning/1-notes 为 ../../../1-notes | 全仓 HTML 资源检查 118 页、445 个本地引用零错误；一个实际返回链接后台浏览器加载 200 |
| JS-06 XHR 实现与理论不一致 | 理论要求检查 status，场景却直接 JSON.parse；现先检查 2xx 再解析 | 浏览器正常 200 与注入 404 专项通过，404 给 HTTP 诊断而不是 SyntaxError |
| JS-07 教学静态服务符号链接边界 | 原字面路径校验不能阻止链接指向仓库外；现核对真实根、真实目标及隐藏路径 | 正常静态、仓库外符号链接、隐藏目标符号链接、隐藏 URL、POST 成功/坏 JSON/坏 title/错误方法，共 8 项 HTTP 回归通过 |
| JS-08 综合任务与现有项目事实不一致 | 当前 id 为字符串、收藏仅在内存；图标命中需先加样本；回调重构不假定项目存在回调地狱 | 主代理已同步 tasks/integration-cases，进一步明确收藏 Set、分页/嵌套配置/第二数据源/计时器为副本扩展、Promise 链改写与既有 async/await 的区别、Vue 后续预告及 HTTP 503/404 分支；对应笔记/独立练习已按任务契约同步，逐点任务重新核对 |
| Q-01 质量章节上下文与后续导航 | 可访问表单最小例补 form；兼容深化由错误的阶段 13 改为阶段 6/12；章节明确产出与未验证范围 | 四篇正文/示例/练习对照，章节入口 |

## 技术边界核对

- WeakMap/WeakSet 的对象身份、弱持有与不可依赖 GC 时机正确；现代标准允许未注册 Symbol，不能写成“所有原始类型都禁止”。本轮 Node 离线复核对象/未注册 Symbol、注册 Symbol、字符串边界。
- Promise 不是后台线程；then/catch/finally 与 async/await 的返回、错误和等待机制分清。Promise.all 不自动取消其他请求，缺 await 影响错误传播。
- Fetch 成功得到 Response 不等于 HTTP/JSON/业务数据成功。HTTP 404、解析错误、协议错误和取消分别处理；客户端取消不保证服务端回滚。
- 原生 DOM 节点不等同于 Flutter Widget 配置。DOM 修改、事件传播和浏览器生命周期单独学习；框架章节不作为当前原生实验的隐含前置。
- 质量实验区分 Baseline/能力检测/实际行为、人工状态切换/真实接口、模拟取消或失败/真实弱网、自动化检查/完整 WCAG。未发现必须依赖真机才能修正的本轮问题。

## 本轮实际验证

可复用专项脚本和结果：[check-js-teaching-service.mjs](./check-js-teaching-service.mjs)、[本轮运行 JSON](./stage-1-js-quality-runtime.json)。

```bash
PLAYWRIGHT_MODULE=/absolute/path/to/playwright-core/index.mjs node docs/audits/check-js-teaching-service.mjs
python3 scripts/check_learning_resources.py
python3 scripts/check_learning_delivery.py --stage 1
```

专项结果为 8 项 HTTP + 3 项后台 Chrome：XHR 正常解析、XHR 404 先检查状态、返回笔记链接真实加载。服务使用随机 loopback 端口，临时符号链接与文件运行后删除；本代理另行调试用的 4182 服务已关闭。浏览器依赖由本机提供，不为教材增加 Playwright 强制依赖。

修改的服务及共享 scenarios.mjs 经 Node 语法检查。理论 41 个单文件 JS 片段通过 Node 语法检查；2 个明确标成两文件的模块片段分开审阅，不把它们拼成一个文件检查。另执行转换、数组解构、计算属性名、async 函数和 WeakMap Symbol 边界的离线断言，全部通过。

未修改的运行机制复用同日此前证据：[实验与综合项目报告](../stages/webdev-stage1-browser.json)中对应 46 页 × 两视口的 92 项结果，以及[质量专项历史报告](../stages/webdev-stage1-special.json)。本轮只对受影响的 XHR 和服务/链接追加验证，不把历史结果改称本轮新跑。HTML 返回链接变化由本轮全仓资源检查覆盖。

## 来源与限制

本轮先读取 Modern Web Guidance 的 [Forms](https://developer.chrome.com/docs/modern-web-guidance/guides/forms/forms) 与 [Accessibility](https://developer.chrome.com/docs/modern-web-guidance/guides/accessibility/accessibility)，用于核对原生表单、标签、焦点及可访问反馈。通用 JS 语言机制没有可用匹配 MWG 入口，继续参考各篇已登记的 MDN 来源；本轮另读取 [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) 与 [Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) 正文核对重点边界。

没有执行真实设备、多浏览器、屏幕阅读器全面审计、生产部署、真实身份认证或公网接口验证；本阶段基础资料的达标不能表述成这些能力已获认证。逐点记录是审查结论和依据，不是学习者已独立完成练习的证明。
