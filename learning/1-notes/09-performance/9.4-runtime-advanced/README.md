# 9.4 长任务、内存、列表与后台工作

前置阶段2–8。先9.4.1/2识别工作与交互，再9.4.3/4生命周期，9.4.5窗口、9.4.6/7有界后台任务。不是所有项目都需Worker或虚拟化；WeakRef选修。

- [长任务与分片：让出主线程、取消和框架更新](./9.4.1.long-task.md)
- [INP排查：输入延迟、处理和呈现不能混成一项](./9.4.2.inp.md)
- [内存定位：用实际Heap快照追踪强引用与Detached DOM](./9.4.3.profiling.md)
- [WeakRef与FinalizationRegistry：不依赖GC时机](./9.4.4.weakref-finalizationregistry.md)
- [可变高虚拟列表：前缀定位、锚点与可访问回退](./9.4.5.item-9-4-5.md)
- [Worker任务池：有界队列、转移所有权和取消](./9.4.6.web-worker.md)
- [空闲任务：deadline、timeout与可取消回退](./9.4.7.requestidlecallback.md)

[主综合项目](../../../4-practice/09-performance/README.md) · [逐点任务](../../../4-practice/09-performance/tasks.md)
