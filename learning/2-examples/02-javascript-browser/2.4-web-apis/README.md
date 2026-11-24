# 浏览器API

前置：阶段1原生DOM、事件、异步与错误处理。先理解用途与边界，再按示例观察，独立练习和综合任务逐步实现。不要求先会Vue/Nuxt。

推荐顺序：先Observer与History，File/Worker按场景选学；定位、剪贴板和通知只在明确需求下学习权限与失败回退。

- [IntersectionObserver：按交叉状态触发工作](./2.4.1.intersection-observer-demo.html)
- [ResizeObserver：组件尺寸变化与反馈环](./2.4.2.resize-observer-demo.html)
- [MutationObserver：观察DOM变化而非业务状态](./2.4.3.mutation-observer-demo.html)
- [Geolocation：安全上下文、授权与失败体验](./2.4.4.geolocation-api-demo.html)
- [Clipboard：用户动作、权限与拒绝回退](./2.4.5.clipboard-api-demo.html)
- [File API：用户提供文件、异步读取与安全展示](./2.4.6.file-api-demo.html)
- [History API：URL、状态、后退与刷新](./2.4.7.history-api-demo.html)
- [Web Worker：消息、计算与终止](./2.4.8.web-workers-demo.html)
- [Notification：权限与站内提示的边界](./2.4.9.notification-api-demo.html)

仓库根目录运行 `node learning/2-examples/02-javascript-browser/2.3-browser-storage/server.mjs`，通过 http://127.0.0.1:4193/learning/2-examples/02-javascript-browser/ 进入具体页面。Cookie依赖该服务；测试数据库与键均使用stage2命名。
