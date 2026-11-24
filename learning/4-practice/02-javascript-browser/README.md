# 阶段 2 综合实践：阅读队列与草稿

前置：阶段1的DOM、事件、模块、Fetch和表单。目标：把异步顺序、状态恢复、持久化与资源清理组合起来，不依赖Vue/Nuxt。

## 运行

仓库根目录：

```bash
node learning/4-practice/02-javascript-browser/server.mjs
```

打开 http://127.0.0.1:4190/ ，服务跳转到实际项目路径。`STAGE2_PORT`可改端口；只监听127.0.0.1。普通静态服务器不实现`/stage2-api/items`，只能运行不依赖此API的单点实验。

## 从简单到组合

1. 先运行正常查询，阅读`index.html`与`render()`；预测`submit`和微任务的关系，再用Network核对真实请求。保留阶段1语义/键盘基础。
2. 对比Enter提交与输入防抖。`debounce()`只管理调用时机，`load()`通过版本号和AbortController处理已发请求；二者职责不同。
3. 修改关键词，后退、前进及刷新，观察URL与表单恢复。初始条目使用replaceState，pushState本身不会发出popstate。
4. 切主题后刷新，观察本例localStorage键；写错JSON或限制存储时仍能查询。这里只存主题，不存令牌或可信授权。
5. 输入演示草稿，保存、读取及删除。`storage.mjs`按IndexedDB事务complete报告成功，连接使用后关闭，错误保留当前输入；取消不能撤回已提交事务。
6. 查看真实Resize/Intersection/MutationObserver与Worker结果，再卸载视图。卸载取消防抖、请求与订阅，断开观察器并终止Worker；重新装配不会重复注册。这不表示强制GC或证明没有任何内存泄漏。

先跟随这条成功路径，再独立完成[逐点任务](./tasks.md)。需要理解的代码集中在`app.mjs`、`storage.mjs`和`stats-worker.mjs`，服务器只是本地只读fixture。

## 现有能力与扩展边界

| 已实现 | 未实现／仅供独立任务分析 |
| --- | --- |
| 8项本地只读数据、空/慢/HTTP503/坏JSON/坏结构响应 | 真实远程接口、登录与跨设备同步 |
| 防抖、请求取消/竞态保护、URL查询和历史恢复 | 产品分页、无限加载、业务路由框架 |
| 主题localStorage、IndexedDB单条草稿 | Cookie认证、离线提交、生产PWA |
| 三种Observer、Worker标题码点统计、显式生命周期清理 | 系统定位、剪贴板读取、通知投递 |

Worker在小数据量下不是必需，保留它是为了观察消息与终止。Observer结果和视口模拟不代替真实滚动性能、手机或GPU测量。Service Worker与HTTP缓存见2.2独立实验，不注册到本项目。

## 总体验收

- [ ] 能解释防抖、Promise等待、取消与版本号各自职责；慢请求不会覆盖新结果。
- [ ] Enter不重复发出防抖查询；URL初始、后退与刷新恢复一致条件。
- [ ] 主题结构错误或存储不可用时页面仍可读，明确本地存储会被清理。
- [ ] 草稿提交后读取一致，删除只影响本例记录；保存错误不清空当前输入。
- [ ] 卸载后延迟回调、订阅和旧请求不能修改当前视图；重新装配仍正常。
- [ ] 输入/接口文本不经innerHTML执行，390px与桌面视口内容可读、键盘焦点可见。
- [ ] 独立新增一种排序或状态恢复变体，并保存代码、预期/实际与一次排错记录。

## 来源与限制

先读Modern Web Guidance [Performance](https://developer.chrome.com/docs/modern-web-guidance/guides/performance/performance)及[HTML](https://developer.chrome.com/docs/modern-web-guidance/guides/html/html)，核对日期2026-11-24；存储、历史和Worker行为另查MDN官方正文。基本机制优先，未将指南中的性能启发式当作硬性选型标准。

无脚本时保留资料链接；动态筛选、草稿与观察依赖JS。浏览器拒绝API时有局部反馈，不声称所有旧浏览器都支持。无真实用户数据、网络上传、账号和外部上报。本轮验证见阶段验收记录，不把AI审查当作学习者已经独立完成。
