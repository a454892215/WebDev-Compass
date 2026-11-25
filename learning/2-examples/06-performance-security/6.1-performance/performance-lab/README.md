# 真实本地性能机制实验

前置阶段2–4。目标是观察资源加载、主线程、DOM窗口和缓存，不制造生产性能保证。固定Node24.15+的24主线或26+、pnpm11.4.0、Vite8.3.8、Vue3.5.46、Playwright1.65.1、Lighthouse13.6.0；本轮Node26.0.0。

```bash
# 仓库根目录进入
cd learning/2-examples/06-performance-security/6.1-performance/performance-lab
pnpm install --frozen-lockfile
pnpm check
pnpm verify
# 或单独启动后手工观察：http://127.0.0.1:4501/
pnpm serve
```

首次安装需要公共npm注册表。pnpm11专有配置在YAML，固定锁文件；不全局安装，不访问第三方网站/上报。verify自动启动4501、后台Chrome，最后执行一次本地Lighthouse；需要允许loopback和本机Chrome，CHROME_PATH可覆盖路径。失败会finally关闭服务/浏览器，Lighthouse子进程有45秒上限，不无限等待。

## 逐步阅读

1. index.html/src/style.css：真实AVIF/WebP/PNG候选、尺寸、fetchpriority、匹配的responsive preload、离屏lazy。图片是确定性几何fixture，不用它推断业务照片压缩比。
2. src/main.js：用户动作动态import统计与本地第三方替身、90ms可控阻塞、6×15ms分块（scheduler.yield兼容回退）、Worker与布局读写。
3. src/control.mjs、tests/unit.test.mjs：防抖/节流独立clock的边界、尾调用与cancel；Vuecomputed只验证缓存机制，不是框架速度对比。
4. 虚拟列表固定36px、1000项、窗口12条。DOM外没有对应内容，需要另外设计查找、打印、焦点和屏幕阅读；完整模式仅用于比较，不称完成所有无障碍。
5. server.mjs：同一125000字节高度重复文本的真实Gzip/Brotli、ETag/304、mockPrivate no-store。查询参数仅为可控编码fixture，不冒充完整生产Accept-Encoding协商。
6. public/sw-lab/：仅该scope公开GET白名单。Cache First、Network First、离线公开页与专有版本前缀；verify真实断网且清理自己的registration/cache，保留其他前缀。没有私人数据、登录或完整PWA。

PerformanceObserver记录longtask/LCP候选/layout-shift/event原始条目并按支持探测；退出时断开。它们不是完整web-vitals算法，不能把最大event duration直接称真实用户INP。mark/measure跨await时是区间总时长，不是纯CPU。

## 结果与解释

`pnpm check`运行4项Node测试、Vite生产构建与产物断言。原始HTTP编码大小和解码内容都实查，conditional304无新响应体。`pnpm verify`分别在390/1440宽度运行真实Chrome，记录动态模块、图片currentSrc、布局/长任务条目、Worker、虚拟窗口、HTTP缓存，另做SW离线/版本隔离和一次Lighthouse。

`artifacts/runtime.json`和`artifacts/lighthouse.json`是可重建产物，不提交。Lighthouse只代表本次lab配置，TBT不是INP；本组没有真实用户分布/场数据p75、公网CDN/HTTP2性能或多浏览器/真机认证。单次thrash/batch耗时仅记录，不断言任何机器一定更快。

no-store控制HTTP缓存，不能照搬成“所有浏览器永远禁止bfcache”。Chrome2025起在安全条件下允许部分no-store页使用bfcache；敏感响应仍按隐私要求配置，不能为性能删保护。

[17点操作目录](../README.md) · [本组审查](../../../../../docs/audits/stage-6-performance-review.md)。
