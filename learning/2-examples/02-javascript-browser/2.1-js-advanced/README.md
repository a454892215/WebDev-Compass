# 2.1 JavaScript进阶实验

仓库根目录启动任意HTTP静态服务，例如 `python3 -m http.server 4191 --bind 127.0.0.1`，从 `/learning/2-examples/02-javascript-browser/2.1-js-advanced/` 打开下列文件。不能通过file://验证ESM/Worker加载。零第三方依赖；核心代码在assets/experiments.mjs，lab.mjs只负责运行和文本展示。

- [2.1.1 原型链：对象委托与属性遮蔽](./2.1.1.item-2-1-1-demo.html)
- [2.1.2 this：由调用方式决定的接收者](./2.1.2.this-demo.html)
- [2.1.3 执行上下文、调用栈与异常展开](./2.1.3.item-2-1-3-demo.html)
- [2.1.4 事件循环：任务、微任务与渲染机会](./2.1.4.event-loop-demo.html)
- [2.1.5 浅复制、structuredClone与JSON序列化边界](./2.1.5.structuredclone-demo.html)
- [2.1.6 防抖与节流：频繁事件的调度与取消](./2.1.6.debounce-throttle-demo.html)
- [2.1.7 柯里化与函数组合：小型可复用转换](./2.1.7.item-2-1-7-demo.html)
- [2.1.8 模块化演进：理解旧格式，实际使用ES Modules](./2.1.8.iife-commonjs-amd-es-modules-demo.html)
- [2.1.9 严格模式：把隐式错误转为明确失败](./2.1.9.use-strict-demo.html)
- [2.1.10 资源生命周期与垃圾回收：先释放引用和订阅](./2.1.10.item-2-1-10-demo.html)
- [2.1.11 移动端对照：浏览器事件循环、Dart isolate与RN运行环境](./2.1.11.event-loop-flutter-event-queue-demo.html)

模块史的CommonJS/AMD只作格式与运行时对照，不伪造浏览器加载器；模块实例实验使用真实动态import。Worker是Web执行环境实验，不声称验证Dart/RN。
