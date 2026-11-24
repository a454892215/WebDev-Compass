# 阶段 2 综合任务

[项目说明](./README.md) · [运行项目](./index.html)

这些任务要求独立实现、审查或扩展，不表示参考项目已实现每一种能力。先运行阅读队列，再根据具体编号在副本中操作；工具/渲染/权限主题可以提交真实观察与取舍记录。

<a id="p-2-1-1"></a>

## 2.1.1 综合任务

审查阅读队列条目的普通对象与共享方法需求；在练习副本做Object.create版本，与原数据对象比较，避免为学习原型强改现有模型。

[理论](../../1-notes/02-javascript-browser/2.1-js-advanced/2.1.1.item-2-1-1.md) · [示例](../../2-examples/02-javascript-browser/2.1-js-advanced/2.1.1.item-2-1-1-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.1-js-advanced/2.1.1.item-2-1-1.md)

- [ ] Object.getPrototypeOf两个实例指向同一共享对象，修改实例title不改变另一个。
- [ ] 能用Object.hasOwn和删除操作说明自身/继承查找；无原型字典不调用继承方法。

<a id="p-2-1-2"></a>

## 2.1.2 综合任务

在阅读队列的事件装配副本中加入一个需要this的控制器方法，复现提取回调后接收者丢失，再比较显式绑定和纯函数方案。

[理论](../../1-notes/02-javascript-browser/2.1-js-advanced/2.1.2.this.md) · [示例](../../2-examples/02-javascript-browser/2.1-js-advanced/2.1.2.this-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.1-js-advanced/2.1.2.this.md)

- [ ] 脱离对象的方法能复现严格模式错误，call/apply/bind能得到约定值。
- [ ] 能解释箭头call不改this、new使用实例接收者，而不是背口诀。

<a id="p-2-1-3"></a>

## 2.1.3 综合任务

为阅读队列的加载/解码/渲染三个函数画调用链；注入shape场景错误，观察load内部catch的UI提示和finally清理。若调用方需区分结果，在副本显式设计返回状态，不假定现有load会再throw。

[理论](../../1-notes/02-javascript-browser/2.1-js-advanced/2.1.3.item-2-1-3.md) · [示例](../../2-examples/02-javascript-browser/2.1-js-advanced/2.1.3.item-2-1-3-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.1-js-advanced/2.1.3.item-2-1-3.md)

- [ ] 正常与shape错误的调用路径和清理可解释，UI能够观察错误而非静默吞掉。
- [ ] 能区分内部捕获、向外抛错和返回状态三种契约，不仅检查有没有catch。

<a id="p-2-1-4"></a>

## 2.1.4 综合任务

给阅读队列搜索输入、debounce定时器、Fetch完成和DOM更新记录顺序；只解释实际可保证的先后，再评估大批量处理是否需Worker。

[理论](../../1-notes/02-javascript-browser/2.1-js-advanced/2.1.4.event-loop.md) · [示例](../../2-examples/02-javascript-browser/2.1-js-advanced/2.1.4.event-loop-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.1-js-advanced/2.1.4.event-loop.md)

- [ ] 同步、直接微任务、嵌套微任务、timer的本例顺序可解释。
- [ ] 能说明微任务饥饿风险，不对RAF/timer或后台页面作绝对时序承诺。

<a id="p-2-1-5"></a>

## 2.1.5 综合任务

当前草稿只有text和数字updatedAt；先在副本增加含嵌套字段的草稿模型，再比较浅复制与structuredClone的隔离，明确JSON编码边界。

[理论](../../1-notes/02-javascript-browser/2.1-js-advanced/2.1.5.structuredclone.md) · [示例](../../2-examples/02-javascript-browser/2.1-js-advanced/2.1.5.structuredclone-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.1-js-advanced/2.1.5.structuredclone.md)

- [ ] 现有草稿模型与新增嵌套扩展分开描述，不凭空假设已有Date或嵌套对象。
- [ ] 嵌套副本修改不误改原稿，支持类型和失败路径明确。

<a id="p-2-1-6"></a>

## 2.1.6 综合任务

审查现有关键词防抖已具备.cancel且卸载会调用；在副本增加leading节流对照，分别验证防抖取消、Fetch取消与迟到归属。

[理论](../../1-notes/02-javascript-browser/2.1-js-advanced/2.1.6.debounce-throttle.md) · [示例](../../2-examples/02-javascript-browser/2.1-js-advanced/2.1.6.debounce-throttle-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.1-js-advanced/2.1.6.debounce-throttle.md)

- [ ] 密集输入最后词生效，leading节流窗口内首值生效，策略差异可解释。
- [ ] 卸载后待执行定时器不发新请求，已发请求仍由AbortController/归属处理。

<a id="p-2-1-7"></a>

## 2.1.7 综合任务

把队列搜索词正规化提成小函数，比较普通函数与参数化过滤器；允许结论是不需要引入通用pipe工具。

[理论](../../1-notes/02-javascript-browser/2.1-js-advanced/2.1.7.item-2-1-7.md) · [示例](../../2-examples/02-javascript-browser/2.1-js-advanced/2.1.7.item-2-1-7-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.1-js-advanced/2.1.7.item-2-1-7.md)

- [ ] 相同输入两种实现得到同样结果，原列表不被修改。
- [ ] 能说明参数固定与执行时机；异步步骤不混入同步pipe冒充完成值。

<a id="p-2-1-8"></a>

## 2.1.8 综合任务

将阅读队列的存储/请求/视图模块边界画清，再用同URL动态import验证实例复用；不为了演进史引入CommonJS/AMD依赖。

[理论](../../1-notes/02-javascript-browser/2.1-js-advanced/2.1.8.iife-commonjs-amd-es-modules.md) · [示例](../../2-examples/02-javascript-browser/2.1-js-advanced/2.1.8.iife-commonjs-amd-es-modules-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.1-js-advanced/2.1.8.iife-commonjs-amd-es-modules.md)

- [ ] 通过HTTP实际加载，重复同URL导入共享导出值而非每次重置。
- [ ] 能解释require/define不属于浏览器原生API，区分包管理、构建与运行时。

<a id="p-2-1-9"></a>

## 2.1.9 综合任务

核对阅读队列type=module和显式状态归属；在副本故意注入未声明赋值复现ReferenceError，再修复声明，不假设当前项目已有隐式全局。

[理论](../../1-notes/02-javascript-browser/2.1-js-advanced/2.1.9.use-strict.md) · [示例](../../2-examples/02-javascript-browser/2.1-js-advanced/2.1.9.use-strict-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.1-js-advanced/2.1.9.use-strict.md)

- [ ] 原项目与故障注入分开记录，严格模块能明确暴露未声明赋值。
- [ ] 修复后不存在该意外全局，仍说明严格模式不是权限/类型校验。

<a id="p-2-1-10"></a>

## 2.1.10 综合任务

审查阅读队列的定时器、AbortController、Observer和Worker清理；在副本反复装配/销毁并恢复，确认旧回调不更新界面。

[理论](../../1-notes/02-javascript-browser/2.1-js-advanced/2.1.10.item-2-1-10.md) · [示例](../../2-examples/02-javascript-browser/2.1-js-advanced/2.1.10.item-2-1-10-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.1-js-advanced/2.1.10.item-2-1-10.md)

- [ ] 同一事件只增一次计数，重复装配不会叠加监听。
- [ ] dispose后事件和定时器都不再修改旧状态；不以堆大小或GC精确时间作为通过条件。

<a id="p-2-1-11"></a>

## 2.1.11 综合任务

为队列统计功能审查Worker消息契约、结果归属和terminate；再记录与移动端经验的可迁移点及浏览器特有差异，不重写现有宿主架构。

[理论](../../1-notes/02-javascript-browser/2.1-js-advanced/2.1.11.event-loop-flutter-event-queue.md) · [示例](../../2-examples/02-javascript-browser/2.1-js-advanced/2.1.11.event-loop-flutter-event-queue-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.1-js-advanced/2.1.11.event-loop-flutter-event-queue.md)

- [ ] 真实Worker返回结果且document不可用，主页面输入数据未被Worker普通修改共享。
- [ ] 平台对照明确宿主、DOM、消息和清理差异，不把浏览器结果称移动端已验证。

<a id="p-2-2-1"></a>

## 2.2.1 综合任务

为阅读队列写一份故障分类：输入卡顿、网络失败、页面崩溃分别先看什么工具；不在业务代码伪造内部进程数。

[理论](../../1-notes/02-javascript-browser/2.2-browser-internals/2.2.1.gpu.md) · [示例](../../2-examples/02-javascript-browser/2.2-browser-internals/2.2.1.gpu-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.2-browser-internals/2.2.1.gpu.md)

- [ ] 能区分进程、线程、标签与frame，记录观察工具及版本。
- [ ] 页面显示逻辑处理器提示时，明确不将其当进程数。

<a id="p-2-2-2"></a>

## 2.2.2 综合任务

给阅读队列卡片增加宽度、颜色和transform三个独立变体，记录几何结果与可选Performance跟踪，不把每次变化说成完整重排。

[理论](../../1-notes/02-javascript-browser/2.2-browser-internals/2.2.2.item-2-2-2.md) · [示例](../../2-examples/02-javascript-browser/2.2-browser-internals/2.2.2.item-2-2-2-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.2-browser-internals/2.2.2.item-2-2-2.md)

- [ ] 能解释DOM存在与参与布局的区别。
- [ ] 几何测量与实际绘制跟踪分别记录，不把尺寸数值当GPU证据。

<a id="p-2-2-3"></a>

## 2.2.3 综合任务

审查阅读队列的ResizeObserver与卡片尺寸读取，在副本实现批量测量/写入，避免观察回调内反复改同一尺寸触发循环。

[理论](../../1-notes/02-javascript-browser/2.2-browser-internals/2.2.3.reflow-repaint.md) · [示例](../../2-examples/02-javascript-browser/2.2-browser-internals/2.2.3.reflow-repaint-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.2-browser-internals/2.2.3.reflow-repaint.md)

- [ ] 读写阶段可以在源码中明确指出，最终几何结果正确。
- [ ] 性能结论有实际跟踪或明确标未测，不凭一个duration推断FPS。

<a id="p-2-2-4"></a>

## 2.2.4 综合任务

为阅读队列绘制首屏依赖图，确认输入与静态说明不等待Worker或草稿数据库完成；性能改善只在实际测量后下结论。

[理论](../../1-notes/02-javascript-browser/2.2-browser-internals/2.2.4.critical-rendering-path.md) · [示例](../../2-examples/02-javascript-browser/2.2-browser-internals/2.2.4.critical-rendering-path-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.2-browser-internals/2.2.4.critical-rendering-path.md)

- [ ] 能区分解析阻塞、渲染阻塞与网络慢，不把它们统称加载慢。
- [ ] 至少一个非关键依赖调整后功能正确，并准确声明指标边界。

<a id="p-2-2-5"></a>

## 2.2.5 综合任务

在阅读队列副本给一张正在交互的卡片增加临时will-change，结束即清理；如无实测瓶颈，允许保留无提示版本并解释理由。

[理论](../../1-notes/02-javascript-browser/2.2-browser-internals/2.2.5.will-change.md) · [示例](../../2-examples/02-javascript-browser/2.2-browser-internals/2.2.5.will-change-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.2-browser-internals/2.2.5.will-change.md)

- [ ] 提示能清理，重复操作不会永久给整页元素加will-change。
- [ ] 位移和减少动效终态正确，未测GPU就不作加速保证。

<a id="p-2-2-6"></a>

## 2.2.6 综合任务

审查阅读队列的module入口与Worker初始化；在独立分支演示经典async依赖故障，不假定现有模块项目本来就有该竞态。

[理论](../../1-notes/02-javascript-browser/2.2-browser-internals/2.2.6.async.md) · [示例](../../2-examples/02-javascript-browser/2.2-browser-internals/2.2.6.async-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.2-browser-internals/2.2.6.async.md)

- [ ] 依赖脚本在不同延迟下均不出现未定义错误。
- [ ] 能分别解释解析、执行、DCL和load，不只背顺口溜。

<a id="p-2-2-7"></a>

## 2.2.7 综合任务

若给阅读队列新增首屏封面，核对是否需要preload；现有纯文本目录不强塞无用图片或第三方preconnect。

[理论](../../1-notes/02-javascript-browser/2.2-browser-internals/2.2.7.link-rel-preload.md) · [示例](../../2-examples/02-javascript-browser/2.2-browser-internals/2.2.7.link-rel-preload-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.2-browser-internals/2.2.7.link-rel-preload.md)

- [ ] 资源地址、类型和消费方对应，页面最终图片可用。
- [ ] 能够解释提示不等于保证执行，未用的提示已清理。

<a id="p-2-2-8"></a>

## 2.2.8 综合任务

在阅读队列的独立缓存实验中对比只读资源的max-age与ETag，保留请求证据；不声称当前项目已实现离线或CDN缓存。

[理论](../../1-notes/02-javascript-browser/2.2-browser-internals/2.2.8.item-2-2-8.md) · [示例](../../2-examples/02-javascript-browser/2.2-browser-internals/2.2.8.item-2-2-8-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.2-browser-internals/2.2.8.item-2-2-8.md)

- [ ] 能够分别证明直接复用与条件验证，区分脚本状态和网络实际状态。
- [ ] 解释no-cache/no-store、HTTP缓存/SW缓存的差别，未将教学服务当生产认证策略。

<a id="p-2-2-9"></a>

## 2.2.9 综合任务

为阅读队列副本设计一个只读资源的离线回退及更新方案，复用本组真实SW实验；明确主参考项目本身未提供生产PWA。

[理论](../../1-notes/02-javascript-browser/2.2-browser-internals/2.2.9.service-worker-pwa.md) · [示例](../../2-examples/02-javascript-browser/2.2-browser-internals/2.2.9.service-worker-pwa-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.2-browser-internals/2.2.9.service-worker-pwa.md)

- [ ] 在线后能真实离线读回既有数据，第一次离线无缓存时有明确失败。
- [ ] 清理只影响本例，能说明安装、激活、控制客户端和更新等待的不同。

<a id="p-2-3-1"></a>

## 2.3.1 综合任务

审查阅读队列THEME_KEY的JSON解析、theme白名单和失败回退；在副本加入版本字段，并验证损坏偏好不会阻断列表。

[理论](../../1-notes/02-javascript-browser/2.3-browser-storage/2.3.1.localstorage.md) · [示例](../../2-examples/02-javascript-browser/2.3-browser-storage/2.3.1.localstorage-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.3-browser-storage/2.3.1.localstorage.md)

- [ ] 用合法light/dark、坏JSON、未知theme三种输入复核页面可用。
- [ ] 仅改本例主题键，不清除同源其他数据；说明为何筛选用URL而非sessionStorage。

<a id="p-2-3-2"></a>

## 2.3.2 综合任务

为阅读队列目前没有账号/服务端会话说明不引入Cookie的理由；在本组Cookie实验中比较HttpOnly与普通Cookie，若将来加登录另设计服务端安全协议。

[理论](../../1-notes/02-javascript-browser/2.3-browser-storage/2.3.2.cookie.md) · [示例](../../2-examples/02-javascript-browser/2.3-browser-storage/2.3.2.cookie-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.3-browser-storage/2.3.2.cookie.md)

- [ ] document.cookie不可读测试HttpOnly，但服务端回显收到；不输出其他Cookie。
- [ ] 明确本机HTTP未验证Secure和真实跨站SameSite，也不把HttpOnly当完整CSRF防护。

<a id="p-2-3-3"></a>

## 2.3.3 综合任务

审查storage.mjs草稿事务：保存等complete、失败保留输入、卸载信号取消和versionchange关闭；在副本模拟中止并确认旧草稿保留。

[理论](../../1-notes/02-javascript-browser/2.3-browser-storage/2.3.3.indexeddb.md) · [示例](../../2-examples/02-javascript-browser/2.3-browser-storage/2.3.3.indexeddb-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.3-browser-storage/2.3.3.indexeddb.md)

- [ ] 保存后刷新再恢复；主动中止不显示提交成功。
- [ ] 仅删除webdev-stage2-reading-v1中的本例main记录，不清除整个origin数据库。

<a id="p-2-3-4"></a>

## 2.3.4 综合任务

为当前队列的主题、URL筛选、内存列表、IndexedDB草稿列选型依据，再说明未来会话及离线响应缓存为何属于其他方案。

[理论](../../1-notes/02-javascript-browser/2.3-browser-storage/2.3.4.item-2-3-4.md) · [示例](../../2-examples/02-javascript-browser/2.3-browser-storage/2.3.4.item-2-3-4-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.3-browser-storage/2.3.4.item-2-3-4.md)

- [ ] 每项说明访问方式、敏感度、丢失后果与回退。
- [ ] 区分HTTP缓存、Cache Storage、IndexedDB，不因容量而默认把所有数据塞入同一存储。

<a id="p-2-4-1"></a>

## 2.4.1 综合任务

审查#sentinel交叉提示与dispose断开；在副本扩展为一次只请求一页的加载哨兵，保留手动加载和结束状态。

[理论](../../1-notes/02-javascript-browser/2.4-web-apis/2.4.1.intersection-observer.md) · [示例](../../2-examples/02-javascript-browser/2.4-web-apis/2.4.1.intersection-observer-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.4-web-apis/2.4.1.intersection-observer.md)

- [ ] 原项目只提示交叉，不冒称已有无限滚动。
- [ ] 扩展有loading/去重/结束条件，卸载后不继续触发加载。

<a id="p-2-4-2"></a>

## 2.4.2 综合任务

审查.queue-panel的ResizeObserver仅读尺寸、把读数写到独立#size-info；改变容器布局并验证读数，卸载后停止。

[理论](../../1-notes/02-javascript-browser/2.4-web-apis/2.4.2.resize-observer.md) · [示例](../../2-examples/02-javascript-browser/2.4-web-apis/2.4.2.resize-observer-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.4-web-apis/2.4.2.resize-observer.md)

- [ ] 窗口不变化而容器改变时仍能报告尺寸。
- [ ] 回调不持续写回被测宽度，不以Observer代替能用CSS完成的列布局。

<a id="p-2-4-3"></a>

## 2.4.3 综合任务

审查#list的MutationObserver与树外#mutation-info调试读数，解释为什么业务列表应由render/数据驱动而非反推DOM。

[理论](../../1-notes/02-javascript-browser/2.4-web-apis/2.4.3.mutation-observer.md) · [示例](../../2-examples/02-javascript-browser/2.4-web-apis/2.4.3.mutation-observer-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.4-web-apis/2.4.3.mutation-observer.md)

- [ ] 区分变更记录数与用户操作次数，不产生自我触发循环。
- [ ] dispose后disconnect，重新装配不累加旧观察者。

<a id="p-2-4-4"></a>

## 2.4.4 综合任务

在队列副本设计可选地区筛选：默认手工选择，用户主动定位才作增强；参考项目目前不请求位置。

[理论](../../1-notes/02-javascript-browser/2.4-web-apis/2.4.4.geolocation-api.md) · [示例](../../2-examples/02-javascript-browser/2.4-web-apis/2.4.4.geolocation-api-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.4-web-apis/2.4.4.geolocation-api.md)

- [ ] 拒绝/超时不影响核心阅读与草稿操作。
- [ ] 不上传或保存坐标，自动化虚拟坐标与真实设备定位体验分开记录。

<a id="p-2-4-5"></a>

## 2.4.5 综合任务

在队列副本新增“复制当前筛选链接”按钮，等待writeText完成再提示；失败保留可选择URL，不读取剪贴板。

[理论](../../1-notes/02-javascript-browser/2.4-web-apis/2.4.5.clipboard-api.md) · [示例](../../2-examples/02-javascript-browser/2.4-web-apis/2.4.5.clipboard-api-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.4-web-apis/2.4.5.clipboard-api.md)

- [ ] 链接保留当前q/mode，不复制页面秘密或用户草稿。
- [ ] 拒绝/不支持时手动复制可用；受控writer测试不冒充OS剪贴板验证。

<a id="p-2-4-6"></a>

## 2.4.6 综合任务

在队列副本新增小型JSON草稿导入，先限制大小并校验id/text，预览后由用户确认写入IndexedDB；当前项目没有导入功能。

[理论](../../1-notes/02-javascript-browser/2.4-web-apis/2.4.6.file-api.md) · [示例](../../2-examples/02-javascript-browser/2.4-web-apis/2.4.6.file-api-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.4-web-apis/2.4.6.file-api.md)

- [ ] 坏JSON、错字段和超限各有提示，原输入仍保留。
- [ ] 尖括号文本不生成DOM；只读取用户主动提供File且不上传。
- [ ] 旧文件迟到读取不覆盖新文件或清空状态；离开时使未完成读取失效。

<a id="p-2-4-7"></a>

## 2.4.7 综合任务

审查readURL/writeURL、初始replaceState与popstate；从含q/mode的地址进入、刷新、后退至初始条目，列表与控件保持一致。

[理论](../../1-notes/02-javascript-browser/2.4-web-apis/2.4.7.history-api.md) · [示例](../../2-examples/02-javascript-browser/2.4-web-apis/2.4.7.history-api-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.4-web-apis/2.4.7.history-api.md)

- [ ] pushState后主动加载，popstate读取URL且不重复push。
- [ ] 防抖输入不重复堆相同URL；未知mode有安全默认，不声称支持任意路径服务器路由。

<a id="p-2-4-8"></a>

## 2.4.8 综合任务

审查stats-worker.mjs统计协议与revision过滤，卸载terminate；在副本制造旧响应及Worker加载错误，核心列表仍可用。

[理论](../../1-notes/02-javascript-browser/2.4-web-apis/2.4.8.web-workers.md) · [示例](../../2-examples/02-javascript-browser/2.4-web-apis/2.4.8.web-workers-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.4-web-apis/2.4.8.web-workers.md)

- [ ] Worker只回数据，主线程更新DOM；旧revision不覆盖当前统计。
- [ ] 有终止和错误回退，记录小列表使用Worker是学习演示而非性能结论。

<a id="p-2-4-9"></a>

## 2.4.9 综合任务

为阅读队列保留站内保存结果，写是否需要通知的取舍说明；如确有需求在副本设计主动授权和关闭入口，当前不引入系统通知或Push。

[理论](../../1-notes/02-javascript-browser/2.4-web-apis/2.4.9.notification-api.md) · [示例](../../2-examples/02-javascript-browser/2.4-web-apis/2.4.9.notification-api-demo.html) · [独立练习](../../3-exercises/02-javascript-browser/2.4-web-apis/2.4.9.notification-api.md)

- [ ] 页面加载不请求通知权限，拒绝后不反复提示。
- [ ] 区分站内状态、Notification、SW通知与Push；未做OS送达不写已验证。
