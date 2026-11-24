# 2.2 浏览器进程、渲染与HTTP缓存

前置：阶段1的DOM、CSS布局、Fetch/Promise和模块基础；2.1事件循环帮助理解脚本与渲染时机。目标是解释页面从结构到像素、脚本资源依赖和缓存复用，能区分页面API、实际网络证据与浏览器内部跟踪。

推荐顺序：2.2.1进程职责 → 2.2.2渲染阶段 → 2.2.3布局读写 → 2.2.6脚本时机 → 2.2.4关键路径/2.2.7资源提示 → 2.2.8HTTP缓存 → 2.2.9可选SW。2.2.5合成/提示结合布局与性能跟踪回读；不以GPU调优或生产PWA作为进入Vue/Nuxt的前置。

页面可操作部分与DevTools人工观察分开；不是每个主题都能由JavaScript精确暴露内部指标。

| 编号 | 理论 | 示例 |
| --- | --- | --- |
| 2.2.1 | [浏览器多进程：页面、渲染器与GPU的职责](./2.2.1.gpu.md) | [实验](../../../2-examples/02-javascript-browser/2.2-browser-internals/2.2.1.gpu-demo.html) |
| 2.2.2 | [渲染流水线：从DOM/CSSOM到布局、绘制与合成](./2.2.2.item-2-2-2.md) | [实验](../../../2-examples/02-javascript-browser/2.2-browser-internals/2.2.2.item-2-2-2-demo.html) |
| 2.2.3 | [布局与绘制失效：避免交错读写造成布局抖动](./2.2.3.reflow-repaint.md) | [实验](../../../2-examples/02-javascript-browser/2.2-browser-internals/2.2.3.reflow-repaint-demo.html) |
| 2.2.4 | [关键渲染路径：先交付可见内容，再安排非关键资源](./2.2.4.critical-rendering-path.md) | [实验](../../../2-examples/02-javascript-browser/2.2-browser-internals/2.2.4.critical-rendering-path-demo.html) |
| 2.2.5 | [合成与will-change：提示不是GPU加速开关](./2.2.5.will-change.md) | [实验](../../../2-examples/02-javascript-browser/2.2-browser-internals/2.2.5.will-change-demo.html) |
| 2.2.6 | [async与defer：下载并行，执行时机不同](./2.2.6.async.md) | [实验](../../../2-examples/02-javascript-browser/2.2-browser-internals/2.2.6.async-demo.html) |
| 2.2.7 | [资源提示：preload、prefetch与preconnect的边界](./2.2.7.link-rel-preload.md) | [实验](../../../2-examples/02-javascript-browser/2.2-browser-internals/2.2.7.link-rel-preload-demo.html) |
| 2.2.8 | [HTTP缓存：新鲜度、验证器与304](./2.2.8.item-2-2-8.md) | [实验](../../../2-examples/02-javascript-browser/2.2-browser-internals/2.2.8.item-2-2-8-demo.html) |
| 2.2.9 | [Service Worker：作用域、生命周期与离线回退](./2.2.9.service-worker-pwa.md) | [实验](../../../2-examples/02-javascript-browser/2.2-browser-internals/2.2.9.service-worker-pwa-demo.html) |

[示例运行方法](../../../2-examples/02-javascript-browser/2.2-browser-internals/README.md) · [独立练习](../../../3-exercises/02-javascript-browser/2.2-browser-internals/README.md)
