# 阶段 2：JavaScript 异步、浏览器渲染与存储

[笔记目录](../README.md) · [知识地图](../../../knowledge-map/01-foundation-stages-0-2.md#阶段-2javascript-异步浏览器渲染与存储)

前置：阶段1的对象/函数、模块、DOM事件、Promise/Fetch和CSS布局。目标：解释异步与渲染边界，选择本地存储，恢复URL状态，并为计时器、请求、Observer与Worker承担清理责任。

| 章节 | 知识点 | 核心产出 |
| --- | ---: | --- |
| [2.1 JavaScript进阶](./2.1-js-advanced/README.md) | 11 | 预测调用栈/微任务顺序，处理对象复制与回调，装配和释放资源 |
| [2.2 浏览器与缓存](./2.2-browser-internals/README.md) | 9 | 解释渲染阶段，用真实资源/条件请求/离线实验区分机制 |
| [2.3 浏览器存储](./2.3-browser-storage/README.md) | 4 | 按数据与信任边界选择存储，等待事务提交并处理失败 |
| [2.4 Web API](./2.4-web-apis/README.md) | 9 | 处理历史、观察与Worker生命周期，识别权限API的适用边界 |

## 推荐顺序

先调用栈与严格模式，再原型/this和事件循环；随后复制、防抖与清理。进入浏览器渲染/缓存和存储，再学History、Observer和Worker，最后按业务需要阅读定位、剪贴板与通知。章节内前置以各篇说明为准，地图编号保持稳定，不代表每点都严格线性必修。

柯里化、模块史及特定权限API是扩展学习，不要求首个Vue/Nuxt项目一口气全部采用。先预测最小例子的结果，再运行解释；独立练习改变输入或故障，最后完成[阅读队列与草稿](../../4-practice/02-javascript-browser/README.md)及[逐点任务](../../4-practice/02-javascript-browser/tasks.md)。

本阶段33项均按四部分组织。文件齐全、质量验收与学习者掌握分别记录；不自动勾选地图。最终结论见[阶段2验收](../../../docs/audits/STAGE_2_ACCEPTANCE.md)。
