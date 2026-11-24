# 阶段2存储与Web API逐点审查

日期2026-11-24，起点15:16:36 UTC。按总则R01–R09覆盖2.3的4点与2.4的9点，共13点，理论、真实实验、独立练习与综合任务逐点核对。主代理负责阶段整体集成和最终验收，本组不以文件存在代替内容正确。

## 内容层次和边界

先基于阶段1 DOM/事件/异步/异常，依次学习Web Storage、Cookie和IDB事务，再按场景选择API。History与Observer连接原生页面；定位、剪贴板、通知属于可选增强，不阻断首个Vue/Nuxt项目。每篇包含用途、机制、自包含或明确上下文的代码、移动端类比及差异、误区、官方来源、实验与独立排错。

已读主综合项目app.mjs/storage.mjs：现有THEME_KEY、IDB草稿、q/mode查询参数、三类Observer、Worker与dispose；综合任务中的无限滚动、定位、剪贴板、导入、通知明确是副本扩展或取舍分析，未假称已有实现。Cookie演示不被冒充真实认证。

## 本轮实际运行

- Chrome158.0.8127.37后台，13页×390/1440=26项通过；[原始报告](./stage-2-storage-apis-runtime.json)。检查单h1/main、无整页横溢和无未处理页面异常。
- 真实Web Storage保存/刷新/独立标签、坏JSON与仅本例清理；真实HttpOnly服务端收到而JS不可读、清除后消失；IDB complete与abort后读取旧值。
- 真实Intersection/Resize/Mutation变化与disconnect；File内存样本纯文本显示与超限拒绝；History初始条目、返回和查询参数深链接刷新；真实模块Worker消息/校验/终止。
- 定位拒绝为隔离浏览器权限分支，允许分支由Playwright虚拟坐标提供。剪贴板成功/拒绝使用受控writer，不触碰系统剪贴板。Notification只测试受控权限与站内回退，从未创建OS通知或Push。
- 3项额外分支：虚拟定位允许、writer拒绝回退、Notification默认→拒绝；均通过。
- 主代理交叉审查发现File.text缺版本归属可能让迟到A覆盖清空/新B，已加递增readRevision及pagehide失效；[慢A→清空/快B两项专项](./stage-2-storage-apis-file-race.json)通过。这两项是修改File分支后的必要复验，其余未改机制复用上面的26项记录。

复跑（仓库根目录，另启动本组4193服务）：

```bash
node learning/2-examples/02-javascript-browser/2.3-browser-storage/server.mjs
PLAYWRIGHT_MODULE=/absolute/path/to/playwright-core/index.mjs node learning/2-examples/02-javascript-browser/2.3-browser-storage/verify.mjs
```

首轮行为运行没有失败日志，但测试报告的相对输出路径多一层，导致ENOENT而未保存证据，没有写入仓库外。修正报告路径后只复跑一次，以上结果来自保存成功的正式报告。它不被说成第一次已完整通过。

未执行真实系统剪贴板/定位/通知送达、真机、Safari/Firefox、多浏览器、屏幕阅读器完整验证、真实跨站SameSite/HTTPS Secure、生产会话或Push。IDB升级blocked路径有代码和操作说明，但本轮主要运行提交/中止/刷新，不声称全量迁移或抗断电验证。

## 来源

先查阅[MWG HTML](https://developer.chrome.com/docs/modern-web-guidance/guides/html/html)与[Performance](https://developer.chrome.com/docs/modern-web-guidance/guides/performance/performance)，采用原生语义、明确标签、局部资源和生命周期清理。没有发现覆盖所有存储/API细节的专门MWG指南，继续读取每篇登记的MDN对应正文：Web Storage、Cookies、Using IndexedDB、Observers、Geolocation、Clipboard、File、History、Workers、Notifications。核对日期2026-11-24，不编造所有平台兼容。

## 逐点依据

| 编号 | 核心机制及对应排错 | 结论 |
| --- | --- | --- |
| 2.3.1 | localStorage / sessionStorage：作用域、序列化与失败；把stage2:local写成{broken再读取，观察JSON解析失败；修复为捕获解析/协议错误而非清空整个origin。 | 本组修正后通过 |
| 2.3.2 | Cookie：传输属性、脚本可见性与认证边界；尝试document.cookie="stage2_http=client; HttpOnly"，检查它不能设置真正的HttpOnly属性；改由Set-Cookie，再验证脚本不可读。 | 本组修正后通过 |
| 2.3.3 | IndexedDB：对象仓库、事务与失败恢复；在request.onsuccess直接显示全部保存成功，再让同事务第二个写入触发约束错误；应改等transaction.complete，并在abort说明回滚。 | 本组修正后通过 |
| 2.3.4 | 浏览器存储选型：按数据与访问需求选择；把服务端授权位isAdmin存入localStorage并由页面读取决定权限，说明用户修改后为什么不能获得真实权限，改由服务端授权。 | 本组修正后通过 |
| 2.4.1 | IntersectionObserver：按交叉状态触发工作；让每次回调直接追加哨兵并请求，复现重复触发；增加loading/已结束标志，成功后unobserve或移动稳定哨兵。 | 本组修正后通过 |
| 2.4.2 | ResizeObserver：组件尺寸变化与反馈环；在回调把目标width设为当前宽度+1，说明循环风险；改为只更新独立输出或有界不回写的尺寸计算。 | 本组修正后通过 |
| 2.4.3 | MutationObserver：观察DOM变化而非业务状态；把日志追加到watched内部并在回调继续写日志，分析为什么循环；改放树外并缩小attributeFilter。 | 本组修正后通过 |
| 2.4.4 | Geolocation：安全上下文、授权与失败体验；删除失败回调，模拟拒绝后页面永远等待；恢复错误分类与结束加载，确认不循环弹权限请求。 | 本组修正后通过 |
| 2.4.5 | Clipboard：用户动作、权限与拒绝回退；不await writeText就显示成功，再让writer拒绝；修复为await/catch，并确保失败后没有误导成功提示。 | 本组修正后通过 |
| 2.4.6 | File API：用户提供文件、异步读取与安全展示；把文件内容赋给innerHTML，在隔离无执行事件的标记样本中观察产生节点；改textContent，并说明为何文件是输入而非可信模板。 | 本组修正后通过 |
| 2.4.7 | History API：URL、状态、后退与刷新；删popstate监听，复现地址回退但界面不变；恢复统一readURL/render流程，测试初始条目及直接深链接。 | 本组修正后通过 |
| 2.4.8 | Web Worker：消息、计算与终止；在Worker访问document，观察error并保持界面可用；改为返回数据，由主线程操作DOM。 | 本组修正后通过 |
| 2.4.9 | Notification：权限与站内提示的边界；让页面加载立刻requestPermission并拒绝后循环重试，分析为何打扰用户；改为明确按钮与拒绝后的站内回退，不实际循环触发系统请求。 | 本组修正后通过 |

完整四部分依据见[13项机器记录](./stage-2-storage-apis-points.json)。本组无遗留必达缺陷；公共manifest、tasks合并、全库链接、阶段R09与提交由主代理收尾。实际学习者尚未独立完成这些练习，教材资料通过不等于学习者掌握。

所有API的pagehide清理使用可重复调用的监听，避免bfcache恢复后重新启动资源却只在首次离开清理。资源清理不等于强制GC，也不保证系统杀进程前一定派发事件。

收尾静态检查：本组7个.mjs模块Node语法通过，13个审查编号唯一；全库HTML资源156页603引用零错误。收尾时全库Markdown仅剩主代理尚在创建的STAGE_2_ACCEPTANCE.md入口，非本组断链，最终以主代理集成检查为准。

主代理集成追加：Worker错误处理调用preventDefault，避免已显示回退仍被当未处理页面异常上报；[真实Worker脚本受控抛错及恢复两项](./stage-2-worker-error-runtime.json)通过，可用2.4目录verify-worker-error.mjs复跑。原成功/输入校验/停止机制不变，未重复无关用例。
