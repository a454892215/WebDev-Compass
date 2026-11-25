# 阶段9.4运行时七点逐点编写与审查

2026-11-25，开始09:41:53 UTC。7点保持既有路径；主Nuxt聚焦SSR性能，本组Worker/虚拟列表/heapfixture在独立runtime-lab，不假称主工程已有。按AUTHORING1 R01–R09，不生子代理、不暂存提交。

## 逐点机制与证据

9.4.1：真实90ms合成同步阻塞与6×12ms/yield任务。nextTick不等绘制，微任务await不等任务让出；能力检测与取消epoch。longtask是原始实验诊断，不是INP。取消故障用同一任务启动/取消防旧结果写回，非固定sleep猜完成。
9.4.2：原始EventTiming包含interactionId/processingStart/End/duration，阈值与支持明确；handler measure不能代替完整输入/处理/呈现或生产p75，debounce按业务语义使用。web-vitals完整采集由9.1负责。
9.4.3：实际CDP HeapProfiler三份快照，Stage9RetainedPanel对象0→20→0，真实Array element入边与代码全局数组/window监听构成保留说明。DOM创建后detach而强引用仍在；显式dispose移除监听/清空数组后诊断GC不再有该对象。可Load到DevTools Memory继续比较Retainers；没有只用数组长度冒充heap释放证明。原始快照忽略不提交。
9.4.4：WeakRef/FinalizationRegistry按MDN/规范观察，最小片段解释强引用/deref，heldValue反向引用风险；不等待或断言GC回调时机，真正资源显式dispose。
9.4.5：真实32/40/48/56可变高前缀二分，窗口11行左右/全量1000行；首行+20后scroll+20且可见锚点位置不变。没有假称ResizeObserver自动测量，交互/读屏/查找/打印限制与全量回退明确。
9.4.6：真实单Worker活动+2队列、第四项拒绝、ArrayBuffer detached、结果100000/20/30、cancel拒绝+terminate后重启15；自审补worker身份guard防旧错误取消新worker、Uint32对齐拒绝和postMessage throw结算，新增Node负例后复验3unit及两视口。不是多线程扩缩容或完整生产调度平台。
9.4.7：原生requestIdleCallback与计时器回退语义清楚，fallback didTimeout=true/timeRemaining=0、取消不执行；timeout时仍要限制工作，关键提交不能只依赖idle。

## 四部分和R01–R09

7理论、7操作卡、7独立练习和integration-cases7任务/每项至少2标准，points逐点映射。R01无遗漏；R02长任务/交互→生命周期→窗口/后台，先机制再变体；R03先MWG break-up-long-tasks/identify-inp-causes/performance正文再MDN/Chrome/Vue；R04真实与观察明确；R05每份有独立输入/场景、故障、修复和参考；R06主Nuxt新增扩展与独立lab分明；R07性能/GC/可访问回退术语前后一致；R08上述错误与必要验证关闭；R09原始结果、未测范围与学习掌握分开。

## 运行与边界

Node26/pnpm11.4，Playwright1.65.1。初始offline缺tarball即停止，显式锁文件联网安装三依赖完成，不改全局工具。最终3项Node、390/1440两组机制与1440实际Heap三快照组通过；Worker错误收尾改动后复跑受影响unit和browser。Prettier只格式化本组文件，没有用格式变化声称性能提升。全库资源检查当时182页681引用0错，主代理集成后再验。

后台Chrome/4520在finally关闭；pagehide清observer、timer、worker、引用与监听；无外部遥测、真实用户或强制系统设置。合成实验不是生产INP/真实用户场数据/跨浏览器/真机/完整无障碍/所有泄漏证明。源码和heap原始数据可能受工具保留影响，本fixture不打印对象、仅记录摘要，不把强制GC当业务保证。

主Nuxt其余SSR真实性与全库正式契约/验收由主代理集成。本组没有必达遗留，静态存在检查不替代逐点内容审查或真实学习者试学。
