# 阶段2.2 浏览器机制：逐点审查与验证

日期：2026-11-24；开始15:16:20 UTC。依据[阶段总则](../AUTHORING.md)R01–R09。范围9点理论、9个主实验入口及其真实资源、9份独立练习和综合任务建议。逐点记录见[JSON](./stage-2-browser-points.json)。本组修正后满足声明的教材范围，阶段2整体及公共任务集成由主代理验收。

## 编写与技术审查

先读Modern Web Guidance [Performance](https://developer.chrome.com/docs/modern-web-guidance/guides/performance/performance)、[HTML](https://developer.chrome.com/docs/modern-web-guidance/guides/html/html)，再读Chrome进程/渲染、MDN缓存/脚本/SW/will-change/关键路径等匹配正文。核对来源已列到每篇，日期2026-11-24。

核心边界：标签/frame/进程非固定一对一；流水线是心智模型，不是每帧必全走；rAF不等于after-paint；Computed不证明GPU合成；no-cache可存储但复用需验证、no-store不清除既有Cache Storage；Chrome针对no-store页面的bfcache策略已变化，不能照抄旧的绝对禁用说法；async下载顺序不保证；注册SW不等于当前页面受控。

## 实际发现与修正

- 初版延迟资源使用虚拟 /browser-fixture/script.js 路径，HTML离线门禁不能找到物理文件。改为真实assets/ordered-script.js、ready.js和slow.css，服务只按delay查询参数延后发送真实文件，静态与HTTP对应。
- 最小片段明确运行于配套浏览器页面/模块，#card等由页面提供；说明型资源名明确标占位，真实实验使用已有本地文件。
- SW只注册本组scope、只拦截自己一个JSON目标，并提供精确清理；不接管其他教材、不删除其他Cache Storage。
- 综合任务已阅读主项目README/app.mjs对照：主参考实现有Observers/Worker/IDB，未提供HTTP缓存与生产PWA。缓存/SW任务明确是独立实验或副本设计，不冒称已实现。

## 本轮验证

[原始结果](./stage-2-browser-runtime.json)：Chrome158后台，9主页面×390/1440=18项全部通过；真实条件304空体、缺资源404、隐藏路径403共3项HTTP通过。关键结果包括真实defer/async执行顺序、资源/几何、HTTP缓存200→304及脚本重建200、SW真正离线缓存回退和精确清理。不是只截屏或预填输出。

复跑：仓库根启动本组server.mjs，另运行：

```bash
PLAYWRIGHT_MODULE=/absolute/path/to/playwright-core/index.mjs node learning/2-examples/02-javascript-browser/2.2-browser-internals/verify.mjs
```

静态资源检查在并行编写中执行，156页/603引用零错误。Markdown检查当前本组仅等待主代理生成综合tasks稳定锚点，主入口/最终验收记录亦由主代理收尾；未用空文件规避。Node对server、verify和SW脚本检查通过。阶段2正式契约、全库链接和最终提交由主代理集成后检查。

## 逐点审查摘要

| 编号 | 机制实验与审查依据 |
| --- | --- |
| 2.2.1 | 页面读取真实hardwareConcurrency/isolation提示并明确不能枚举PID；任务管理器拓扑是操作清单，未虚构进程数量。 |
| 2.2.2 | 实际切换width/颜色和display:none，读取260→0几何且DOM仍在；没有把几何读数称paint完成。 |
| 2.2.3 | 实际20节点交错/批量两种实现，均得到101px；duration来自performance.now，但明确未测Layout次数/FPS。 |
| 2.2.4 | 真实iframe加载阻塞样式/脚本与内联样式/defer对照，读取各自Navigation和Resource Timing；未将DCL叫首屏。 |
| 2.2.5 | 实际will-change准备→transform40px→auto清理及复位；Computed只证明CSS，不证明GPU层。 |
| 2.2.6 | 两个真实外部经典脚本，A延迟160ms、B20ms；defer日志parse-tail/A/B/DCL，async在这个控制条件出现B先A。 |
| 2.2.7 | 真实本地SVG preload与img消费，读取实际资源条目；prefetch可忽略，同源preconnect不声称公网收益。 |
| 2.2.8 | fresh组服务端仅200一次，validate组200后304，脚本均看到200重建响应；另用HTTP条件请求证明304空体。 |
| 2.2.9 | 真实注册/接管本组scope，在线network后context.setOffline返回cache样本，恢复在线后仅清理本例registration与命名缓存。 |

## R01–R09本组结论

9个编号与四部分路径一致；明确前置和建议顺序；逐篇机制/类比/来源审阅；实验运行及独立练习的故障注入对应；综合任务结合真实项目，未实现能力标成副本新增。已知必达技术问题已关闭，公共R06/R09由主代理集成后最终判定，不能用本组通过代替整阶段达标。

未做：真实设备、多浏览器、屏幕阅读器全面审计、任务管理器实际PID观察、Layers/GPU/生产性能测量、真实公网/CDN与生产认证、完整PWA更新兼容。本地可操作实验与可执行DevTools观察清单分别标注，材料质量通过不等于学习者已完成这些操作。
