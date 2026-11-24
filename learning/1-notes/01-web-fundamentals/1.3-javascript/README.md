# 1.3 JavaScript 基础

[返回阶段 1](../README.md) · [知识地图](../../../../knowledge-map/01-foundation-stages-0-2.md)

共42个知识点：语言核心14项、ES6+特性8项、DOM7项、事件7项、异步网络6项。先语言与函数，再模块/Promise，接着真实DOM与事件，最后连接本地HTTP。已有移动经验仍需验证动态类型、this、对象引用与浏览器生命周期差异。

## 建议学习顺序与实验外壳

编号是稳定索引，不强制所有内容按编号线性阅读。建议：

1. 语言核心 1.3.1.1–14；遇到对象/函数写法可在 1.3.1.8/12 回读，首轮不要求掌握所有原型细节。
2. 提前读 1.3.5.4 的同步错误、1.3.5.1 的回调和 1.3.5.5 的一次性定时器，再学 1.3.2.3 Promise 与 1.3.2.4 async/await。
3. 学 1.3.2.2 静态模块；动态 import/顶层 await 在 Promise 后回读。类、生成器、Weak 集合按需选读，不作为 DOM 入门前置。
4. 学 DOM 1.3.3，再学事件 1.3.4；克隆监听器、IME/高频优化等扩展可以回读。
5. 先学 1.3.5.6 JSON，再实践 Fetch；最后用基础质量 1.4 整合失败恢复与可访问行为。

配套 HTML 提供控件，`assets/lab.mjs` 提供按钮、日志及清理，`assets/scenarios.mjs` 中对应编号才是本节机制。共享外壳使用 ES Module/async/AbortSignal，读语言首课时只需观察该节函数内部；后续学过模块、事件和异步后再研究外壳，避免把脚手架代码当成本课全部前置。DOM 最小片段中的元素变量必须由 HTML 与明确查询提供，不依赖 ID 自动挂到 window。

每个实验含独立行为与输出；共享外壳不改变不同主题的规则。通过本地HTTP运行，禁止将测试数据当真实认证或上传个人信息。XHR为维护选读；生成器、Weak集合、顶层await为进阶选读。

| 知识点                                                                                                     | 正文                                                      | 实践                                                                                                                |
| ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 1.3.1.1 变量：`var`、`let`、`const` 与暂时性死区（TDZ）                                                    | [笔记](./1.3.1.1.var.md)                                  | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.1.var-demo.html)                                  |
| 1.3.1.2 数据类型：原始类型（string、number、boolean、null、undefined、symbol、bigint）与引用类型（object） | [笔记](./1.3.1.2.string-number-boolean-null-undefined.md) | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.2.string-number-boolean-null-undefined-demo.html) |
| 1.3.1.3 类型判断：`typeof`、`instanceof`、`Array.isArray()`、`Object.prototype.toString`                   | [笔记](./1.3.1.3.typeof.md)                               | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.3.typeof-demo.html)                               |
| 1.3.1.4 类型转换：隐式转换、显式转换（`Number()`、`String()`、`Boolean()`）                                | [笔记](./1.3.1.4.number.md)                               | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.4.number-demo.html)                               |
| 1.3.1.5 运算符：算术、比较、逻辑、空值合并（`??`）、可选链（`?.`）                                         | [笔记](./1.3.1.5.item-1-3-1-5.md)                         | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.5.item-1-3-1-5-demo.html)                         |
| 1.3.1.6 条件：`if/else`、`switch`、`三元表达式`                                                            | [笔记](./1.3.1.6.if-else.md)                              | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.6.if-else-demo.html)                              |
| 1.3.1.7 循环：`for`、`while`、`do...while`、`for...of`、`for...in`                                         | [笔记](./1.3.1.7.for.md)                                  | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.7.for-demo.html)                                  |
| 1.3.1.8 函数：声明、表达式、箭头函数、`this` 绑定基础                                                      | [笔记](./1.3.1.8.this.md)                                 | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.8.this-demo.html)                                 |
| 1.3.1.9 作用域：全局、函数、块级作用域；作用域链                                                           | [笔记](./1.3.1.9.item-1-3-1-9.md)                         | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.9.item-1-3-1-9-demo.html)                         |
| 1.3.1.10 闭包（Closure）概念与应用场景                                                                     | [笔记](./1.3.1.10.closure.md)                             | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.10.closure-demo.html)                             |
| 1.3.1.11 数组：创建、`map`、`filter`、`reduce`、`find`、`some`、`every`、`forEach`、解构                   | [笔记](./1.3.1.11.map.md)                                 | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.11.map-demo.html)                                 |
| 1.3.1.12 对象：字面量、属性访问、展开运算符（`...`）、解构、计算属性名                                     | [笔记](./1.3.1.12.....md)                                 | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.12....-demo.html)                                 |
| 1.3.1.13 字符串：模板字面量、常用方法（`slice`、`split`、`includes`、`replace` 等）                        | [笔记](./1.3.1.13.slice.md)                               | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.13.slice-demo.html)                               |
| 1.3.1.14 📱 移动端对照：JS 基础语法与 Dart/Kotlin/Swift 差异；弱类型 vs 强类型                             | [笔记](./1.3.1.14.js-dart-kotlin-swift-vs.md)             | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.1.14.js-dart-kotlin-swift-vs-demo.html)             |
| 1.3.2.1 类（`class`）：constructor、方法、继承（`extends`）、`super`、静态方法                             | [笔记](./1.3.2.1.class.md)                                | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.2.1.class-demo.html)                                |
| 1.3.2.2 模块（ES Modules）：`import` / `export`（default vs named）                                        | [笔记](./1.3.2.2.import.md)                               | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.2.2.import-demo.html)                               |
| 1.3.2.3 Promise 基础：`then`、`catch`、`finally`                                                           | [笔记](./1.3.2.3.then.md)                                 | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.2.3.then-demo.html)                                 |
| 1.3.2.4 `async` / `await`                                                                                  | [笔记](./1.3.2.4.async.md)                                | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.2.4.async-demo.html)                                |
| 1.3.2.5 迭代器与生成器（了解）                                                                             | [笔记](./1.3.2.5.item-1-3-2-5.md)                         | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.2.5.item-1-3-2-5-demo.html)                         |
| 1.3.2.6 `Map`、`Set`、`WeakMap`、`WeakSet`                                                                 | [笔记](./1.3.2.6.map.md)                                  | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.2.6.map-demo.html)                                  |
| 1.3.2.7 可选链、空值合并、逻辑赋值（`&&=`、`                                                               |                                                           | =`）                                                                                                                | [笔记](./1.3.2.7.item-1-3-2-7.md) | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.2.7.item-1-3-2-7-demo.html) |
| 1.3.2.8 顶层 `await`（了解）                                                                               | [笔记](./1.3.2.8.await.md)                                | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.2.8.await-demo.html)                                |
| 1.3.3.1 DOM 树概念：Document、Element、Node、Text                                                          | [笔记](./1.3.3.1.dom-document-element-node-text.md)       | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.3.1.dom-document-element-node-text-demo.html)       |
| 1.3.3.2 查询：`getElementById`、`querySelector`、`querySelectorAll`                                        | [笔记](./1.3.3.2.getelementbyid.md)                       | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.3.2.getelementbyid-demo.html)                       |
| 1.3.3.3 创建与修改：`createElement`、`appendChild`、`insertBefore`、`removeChild`                          | [笔记](./1.3.3.3.createelement.md)                        | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.3.3.createelement-demo.html)                        |
| 1.3.3.4 属性与样式：`setAttribute`、`classList`（add/remove/toggle）、`style`、`dataset`                   | [笔记](./1.3.3.4.setattribute.md)                         | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.3.4.setattribute-demo.html)                         |
| 1.3.3.5 内容：`textContent` vs `innerHTML`（及 XSS 风险）                                                  | [笔记](./1.3.3.5.textcontent.md)                          | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.3.5.textcontent-demo.html)                          |
| 1.3.3.6 尺寸与位置：`offsetWidth/Height`、`clientWidth/Height`、`getBoundingClientRect()`                  | [笔记](./1.3.3.6.offsetwidth-height.md)                   | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.3.6.offsetwidth-height-demo.html)                   |
| 1.3.3.7 📱 移动端对照：DOM 节点、原生 View 与声明式 UI 的区别            | [笔记](./1.3.3.7.dom-widget-flutter-rn.md)                | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.3.7.dom-widget-flutter-rn-demo.html)                |
| 1.3.4.1 事件监听：`addEventListener`、`removeEventListener`                                                | [笔记](./1.3.4.1.addeventlistener.md)                     | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.4.1.addeventlistener-demo.html)                     |
| 1.3.4.2 事件流：捕获阶段、目标阶段、冒泡阶段                                                               | [笔记](./1.3.4.2.item-1-3-4-2.md)                         | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.4.2.item-1-3-4-2-demo.html)                         |
| 1.3.4.3 `event.target` vs `event.currentTarget`                                                            | [笔记](./1.3.4.3.event.target.md)                         | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.4.3.event.target-demo.html)                         |
| 1.3.4.4 阻止默认行为与冒泡：`preventDefault()`、`stopPropagation()`                                        | [笔记](./1.3.4.4.preventdefault.md)                       | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.4.4.preventdefault-demo.html)                       |
| 1.3.4.5 常见事件：`click`、`input`、`change`、`submit`、`keydown/keyup`、`focus/blur`、`scroll`、`resize`  | [笔记](./1.3.4.5.click.md)                                | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.4.5.click-demo.html)                                |
| 1.3.4.6 事件委托（Event Delegation）                                                                       | [笔记](./1.3.4.6.event-delegation.md)                     | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.4.6.event-delegation-demo.html)                     |
| 1.3.4.7 自定义事件：`CustomEvent`、`dispatchEvent`                                                         | [笔记](./1.3.4.7.customevent.md)                          | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.4.7.customevent-demo.html)                          |
| 1.3.5.1 回调函数与回调地狱问题                                                                             | [笔记](./1.3.5.1.item-1-3-5-1.md)                         | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.5.1.item-1-3-5-1-demo.html)                         |
| 1.3.5.2 `XMLHttpRequest` 基础（了解即可，现代用 fetch）                                                    | [笔记](./1.3.5.2.xmlhttprequest.md)                       | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.5.2.xmlhttprequest-demo.html)                       |
| 1.3.5.3 Fetch API：GET/POST 请求、请求头、响应处理、`response.ok`、解析失败与 `response.json()`            | [笔记](./1.3.5.3.fetch-api.md)                            | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.5.3.fetch-api-demo.html)                            |
| 1.3.5.4 错误处理：`try/catch/finally`、`throw`                                                             | [笔记](./1.3.5.4.try-catch-finally.md)                    | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.5.4.try-catch-finally-demo.html)                    |
| 1.3.5.5 定时器：`setTimeout`、`setInterval`、`requestAnimationFrame`                                       | [笔记](./1.3.5.5.settimeout.md)                           | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.5.5.settimeout-demo.html)                           |
| 1.3.5.6 JSON：`JSON.parse`、`JSON.stringify`                                                               | [笔记](./1.3.5.6.json.parse.md)                           | [实验](../../../2-examples/01-web-fundamentals/1.3-javascript/1.3.5.6.json.parse-demo.html)                           |

## 本章验收

能预测表达式和异步顺序，解释复制/共享与作用域，构建可清理的DOM事件，识别HTTP失败和JSON失败，说明代码运行环境。不能以点击按钮得到结果代替独立实现和排障。

## 本章可观察产出

- 不使用框架完成函数、对象/数组转换、真实模块与异步错误边界的小实验。
- 用原生 DOM 和事件实现动态列表，能够解释查询、传播、输出安全与清理。
- 连接本地 HTTP，区分 HTTP 失败、解析失败、协议失败和取消；提交独立练习及综合项目扩展证据。

语言机制阅读与运行结果、学习者独立验收分别记录。完整深度和实际项目生命周期在后续阶段继续深化。

本轮内容审查与修正见[JavaScript 与基础质量复核记录](../../../../docs/audits/stage-1-js-quality-review.md)，资料审查不代替学习者独立验收。
