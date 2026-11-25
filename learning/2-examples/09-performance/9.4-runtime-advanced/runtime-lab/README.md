# 运行时进阶实验

仓库根或本目录运行时注意工作目录：

```bash
# 本目录
pnpm install --frozen-lockfile
pnpm test
pnpm verify
```

Node26/pnpm11.4，Playwright1.65.1，已安装macOS Chrome可用CHROME_PATH覆盖。后台loopback4520，finally关闭；无第三方上报。手工用pnpm serve后访问 http://127.0.0.1:4520。

先同步阻塞，再分片/取消；读取原始longtask和EventTiming（含交互标识/processingStart/End），不要把它们直接叫完整INP或生产p75。反馈textContent已更新不代表同一长任务内已绘制。scheduler.yield能力检测有setTimeout回退；requestIdleCallback原生与计时器回退不同，回退明示didTimeout:true/timeRemaining:0。

可变高列表由真实前缀和二分定位窗口，首行高度改变时保持可见锚点；全量模式恢复1000条DOM，非完整交互列表/搜索/打印/读屏认证。Worker单活动任务+最多2个排队任务，transfer后原ArrayBuffer detached；取消终止worker并拒绝队列，下一次按需重启，不是多worker高吞吐生产池。

内存演示故意保留已经detach的DOM wrapper和window监听，点击清理同步释放强引用和监听。verify通过实际CDP HeapProfiler保存baseline/leaked/cleaned三快照，在1440组统计Stage9RetainedPanel对象与数组element入边；原始快照在忽略的artifacts目录，可在Chrome DevTools Memory Load导入比较Retainers。强制GC用于诊断，不承诺正常GC何时发生，WeakRef/FinalizationRegistry不是资源清理方案。

本轮仅合成本地浏览器/两视口，不是真机、生产INP/GC/泄漏全量证明。原始profile包含页面内存，分享真实项目profile前须检查秘密；此fixture无真实身份或数据。不要把本lab误植到业务生产页。
