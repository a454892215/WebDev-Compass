# 浏览器存储

前置：阶段1原生DOM、事件、异步与错误处理。先理解用途与边界，再按示例观察，独立练习和综合任务逐步实现。不要求先会Vue/Nuxt。

推荐顺序：Web Storage → Cookie协议与安全属性 → IndexedDB事务 → 按需求选型。产出是有失败恢复的小型偏好/草稿存取与选型说明。

- [localStorage / sessionStorage：作用域、序列化与失败](./2.3.1.localstorage-demo.html)
- [Cookie：传输属性、脚本可见性与认证边界](./2.3.2.cookie-demo.html)
- [IndexedDB：对象仓库、事务与失败恢复](./2.3.3.indexeddb-demo.html)
- [浏览器存储选型：按数据与访问需求选择](./2.3.4.item-2-3-4-demo.html)

仓库根目录运行 `node learning/2-examples/02-javascript-browser/2.3-browser-storage/server.mjs`，通过 http://127.0.0.1:4193/learning/2-examples/02-javascript-browser/ 进入具体页面。Cookie依赖该服务；测试数据库与键均使用stage2命名。
