# 阶段 2 实验目录

- [2.1 JavaScript进阶：11例](./2.1-js-advanced/README.md)：原型、this、栈/任务、克隆、防抖、模块与清理。
- [2.2 浏览器原理：9例](./2.2-browser-internals/README.md)：渲染/资源/缓存及独立scope的Service Worker。
- [2.3 存储：4例](./2.3-browser-storage/README.md)：Storage、Cookie、IndexedDB和选择。
- [2.4 Web API：9例](./2.4-web-apis/README.md)：Observers、权限、文件、历史与Worker。

从仓库根启动综合服务`node learning/4-practice/02-javascript-browser/server.mjs`可提供普通静态实验。2.2的真实延迟资源/缓存/SW使用本组4192服务；Cookie使用存储组4193服务，按各README。不要在file://下运行模块/网络/Worker实验。

定位QA使用虚拟位置，剪贴板QA使用受控适配器，通知实验只检查权限与站内回退；不能把这些说成系统能力实际投递/读取通过。

[本阶段笔记](../../1-notes/02-javascript-browser/README.md) · [综合实践](../../4-practice/02-javascript-browser/README.md)
