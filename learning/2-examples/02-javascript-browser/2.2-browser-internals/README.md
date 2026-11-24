# 2.2 浏览器机制实验

仓库根目录运行：

```bash
node learning/2-examples/02-javascript-browser/2.2-browser-internals/server.mjs
```

默认仅监听127.0.0.1:4192；可设BROWSER_LAB_PORT。普通静态服务可运行部分页面，但脚本延迟、关键路径与缓存端点需要本服务，file://不能替代。

- [2.2.1 浏览器多进程：页面、渲染器与GPU的职责](./2.2.1.gpu-demo.html)
- [2.2.2 渲染流水线：从DOM/CSSOM到布局、绘制与合成](./2.2.2.item-2-2-2-demo.html)
- [2.2.3 布局与绘制失效：避免交错读写造成布局抖动](./2.2.3.reflow-repaint-demo.html)
- [2.2.4 关键渲染路径：先交付可见内容，再安排非关键资源](./2.2.4.critical-rendering-path-demo.html)
- [2.2.5 合成与will-change：提示不是GPU加速开关](./2.2.5.will-change-demo.html)
- [2.2.6 async与defer：下载并行，执行时机不同](./2.2.6.async-demo.html)
- [2.2.7 资源提示：preload、prefetch与preconnect的边界](./2.2.7.link-rel-preload-demo.html)
- [2.2.8 HTTP缓存：新鲜度、验证器与304](./2.2.8.item-2-2-8-demo.html)
- [2.2.9 Service Worker：作用域、生命周期与离线回退](./2.2.9.service-worker-pwa-demo.html)

进程/GPU/布局次数没有被页面伪造：页面只输出真实可见API、几何和脚本日志；任务管理器、Layers及Performance走查由学习者记录。缓存示例使用本地确定性响应，不模拟生产CDN；SW只接管本组目录，且只处理自己的JSON资源，清理只影响本例。

复跑：先启动本服务，再指定PLAYWRIGHT_MODULE运行本目录verify.mjs。结果记录于docs/audits/stage-2-browser-runtime.json，Chrome后台宽窄视口模拟不等于真机或生产性能验收。
