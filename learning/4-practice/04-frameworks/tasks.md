# 阶段4逐点综合任务

共59项：Vue/Nuxt主线33项，React跨生态选修26项。先按[项目README](./README.md)运行已实现功能，再在副本做变体；任务不代表作者已替学习者完成所有扩展。React任务在独立React实验，不能硬接到Nuxt主项目。UI库选型与Next观察按章节明确的未测范围处理。

保留改动、运行命令、预期与实际结果、失败原因及修复；无需复杂打卡。

<a id="p-4-1-1"></a>

## 4.1.1 声明式UI与命令式DOM操作

已有：书单数量随useState更新。副本扩展：增加清空命令和空状态，比较与原生计数器的职责。

验收：

- [ ] 同一次状态改变后按钮aria-pressed与数量一致，无手工复制第二份数量状态。
- [ ] 能说明状态改变后DOM批量更新，读取DOM要等待nextTick或测试可重试断言。

[理论](../../1-notes/04-frameworks/4.1-framework-concepts/4.1.1.ui-vs-ui.md) · [示例](../../2-examples/04-frameworks/4.1-framework-concepts/4.1.1.ui-vs-ui-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.1-framework-concepts/4.1.1.ui-vs-ui.md)

<a id="p-4-1-2"></a>

## 4.1.2 组件组合、复用与单向数据流

已有：父级控制书单，卡片发toggle，标题/默认插槽。副本扩展：disabled契约与正反组件测试。

验收：

- [ ] 正常点击发出一次有效id，禁用点击不发事件。
- [ ] 父级更新selected才改变按钮状态；未直接写Props或复制多个不一致事实。

[理论](../../1-notes/04-frameworks/4.1-framework-concepts/4.1.2.item-4-1-2.md) · [示例](../../2-examples/04-frameworks/4.1-framework-concepts/4.1.2.item-4-1-2-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.1-framework-concepts/4.1.2.item-4-1-2.md)

<a id="p-4-1-3"></a>

## 4.1.3 虚拟DOM、响应式追踪与更新调度

已有：从书单状态驱动数量与卡片。副本扩展：新增一个computed派生统计并解释依赖和DOM时序。

验收：

- [ ] 能用实际输出说明基本值解构为何可能脱离追踪，并用toRef或getter修复。
- [ ] 派生结果准确，DOM观察等待正确时机；没有setTimeout猜测框架完成。

[理论](../../1-notes/04-frameworks/4.1-framework-concepts/4.1.3.dom.md) · [示例](../../2-examples/04-frameworks/4.1-framework-concepts/4.1.3.dom-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.1-framework-concepts/4.1.3.dom.md)

<a id="p-4-1-4"></a>

## 4.1.4 客户端路由、服务端路由与直接访问

已有：页面/API路由、q查询和直接404。副本扩展：新增category筛选并验证三种导航入口。

验收：

- [ ] 直接访问详情返回正确内容，未知详情HTTP状态404。
- [ ] 查询筛选可分享且刷新/后退保持一致，不把书单临时状态误认为URL数据。

[理论](../../1-notes/04-frameworks/4.1-framework-concepts/4.1.4.vs.md) · [示例](../../2-examples/04-frameworks/4.1-framework-concepts/4.1.4.vs-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.1-framework-concepts/4.1.4.vs.md)

<a id="p-4-1-5"></a>

## 4.1.5 表单状态、v-model与组件更新契约

已有：v-model搜索草稿、POST标题校验/失败反馈。副本扩展：字符计数、服务器400后重试与组件v-model对照。

验收：

- [ ] 控件标签和提交按钮语义正确；多次点击不会造成不明确的提交状态。
- [ ] 合法/非法标题分别通过/拒绝，服务器校验不依赖浏览器required。

[理论](../../1-notes/04-frameworks/4.1-framework-concepts/4.1.5.vs.md) · [示例](../../2-examples/04-frameworks/4.1-framework-concepts/4.1.5.vs-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.1-framework-concepts/4.1.5.vs.md)

<a id="p-4-1-6"></a>

## 4.1.6 条件渲染、列表与稳定key

已有：稳定id、局部笔记、反转顺序与条件分支。副本扩展：重现index key错误并比较v-if/v-show。

验收：

- [ ] 排序后同一id的笔记、按钮状态仍归属原条目；没有随机key。
- [ ] 能解释过滤销毁与隐藏保留的差别，不把组件局部笔记声称为持久化数据。

[理论](../../1-notes/04-frameworks/4.1-framework-concepts/4.1.6.key.md) · [示例](../../2-examples/04-frameworks/4.1-framework-concepts/4.1.6.key-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.1-framework-concepts/4.1.6.key.md)

<a id="p-4-1-7"></a>

## 4.1.7 从移动开发迁移：组件相似，平台机制不同

已有：SSR/CSR对照与请求隔离实验。副本扩展：移动列表迁移清单和受控window错误修复。

验收：

- [ ] 每条类比同时指出至少一项机制差异，能用资料库真实行为举例。
- [ ] SSR路径不直接读window，前端隐藏按钮不作为服务端授权。

[理论](../../1-notes/04-frameworks/4.1-framework-concepts/4.1.7.react-react-native-vue-widget.md) · [示例](../../2-examples/04-frameworks/4.1-framework-concepts/4.1.7.react-react-native-vue-widget-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.1-framework-concepts/4.1.7.react-react-native-vue-widget.md)

<a id="p-4-2-1-1"></a>

## 4.2.1.1 JSX：表达式、转义与组件树

在React对照lab副本增加读取任务标题的列表，用JSX表达式与稳定id展示，不向Nuxt工程引入React。

验收：

- [ ] 标题中的<b>作为文本，不产生标签。
- [ ] 列表使用稳定id作为key，空列表有明确提示。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.1.1.jsx.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.1.1.jsx-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.1.1.jsx.md)

<a id="p-4-2-1-2"></a>

## 4.2.1.2 函数组件与类组件：渲染纯度和实例边界

在独立React副本写函数版与类版只读任务标题，比较props入口；主线Nuxt组件保持Vue实现。

验收：

- [ ] 两版输出遵循同一输入契约。
- [ ] 渲染不发POST请求，不修改外部数组。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.1.2.item-4-2-1-2.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.1.2.item-4-2-1-2-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.1.2.item-4-2-1-2.md)

<a id="p-4-2-1-3"></a>

## 4.2.1.3 Props与children：只读输入和组合

在React副本实现任务卡外壳，内容由children提供，完成操作通过onToggle(id)通知容器。

验收：

- [ ] 卡片输入改变后显示更新，内部不修改传入task。
- [ ] children支持一段文本及一个按钮，不丢失交互。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.1.3.props-children.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.1.3.props-children-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.1.3.props-children.md)

<a id="p-4-2-1-4"></a>

## 4.2.1.4 useState：快照、更新队列与不可变数据

在React任务列表副本添加一次批量完成操作，按旧状态生成新数组，保留未变记录。

验收：

- [ ] 连续两次依赖旧值的更新都保留。
- [ ] 旧数组与旧记录未被副作用修改。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.1.4.usestate.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.1.4.usestate-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.1.4.usestate.md)

<a id="p-4-2-1-5"></a>

## 4.2.1.5 useEffect：同步外部系统、依赖与清理

在React副本把阅读主题切换连到受控订阅，快速切换A/B并记录清理；若扩展请求，增加迟到响应保护。

验收：

- [ ] 切换前旧订阅被清理，卸载后不再接收通知。
- [ ] 延迟A不能覆盖较新的B，或明确只完成同步订阅实验。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.1.5.useeffect.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.1.5.useeffect-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.1.5.useeffect.md)

<a id="p-4-2-1-6"></a>

## 4.2.1.6 useRef：DOM引用与不参与渲染的可变值

给React副本表单增加“返回标题输入”按钮；比较显示提交次数应使用state还是ref。

验收：

- [ ] 按钮通过真实ref聚焦已挂载输入。
- [ ] 输入卸载后事件不会因null引用崩溃。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.1.6.useref.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.1.6.useref-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.1.6.useref.md)

<a id="p-4-2-1-7"></a>

## 4.2.1.7 useMemo、useCallback与memo：性能缓存的适用边界

在React副本为可测量的大列表筛选比较有无缓存，先验证query变化的正确性，再记录实际测量条件。

验收：

- [ ] 查询变化后计算结果更新。
- [ ] 移除缓存功能仍正确；性能结论来自测量或明确尚未测量。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.1.7.usememo.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.1.7.usememo-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.1.7.usememo.md)

<a id="p-4-2-1-8"></a>

## 4.2.1.8 Context：跨层依赖与更新范围

在React对照副本提供阅读偏好Context，对比Nuxt主工程的注入/状态范围，避免跨请求共享用户偏好。

验收：

- [ ] 消费方取最近Provider值。
- [ ] 嵌套覆盖只影响对应子树，不被误当全局服务注册。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.1.8.createcontext.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.1.8.createcontext-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.1.8.createcontext.md)

<a id="p-4-2-1-9"></a>

## 4.2.1.9 useReducer：集中状态转换与纯函数

在React副本定义添加/完成/删除三种action，先独立测试状态转换，再连接UI事件。

验收：

- [ ] 每种action有明确输入与结果。
- [ ] 旧输入未变，reducer中不发送HTTP请求。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.1.9.usereducer.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.1.9.usereducer-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.1.9.usereducer.md)

<a id="p-4-2-1-10"></a>

## 4.2.1.10 自定义Hook：复用有状态逻辑而非共享实例

在React副本提取两个独立展开卡片的Hook，记录它与Vue composable的相同目标及调用/生命周期差异。

验收：

- [ ] 两个调用默认状态独立。
- [ ] 若Hook订阅外部资源，卸载时完整清理。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.1.10.hook.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.1.10.hook-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.1.10.hook.md)

<a id="p-4-2-1-11"></a>

## 4.2.1.11 错误边界：渲染失败的局部回退

在React对照副本给可选卡片区增加渲染回退，另外在提交事件用try/catch显示HTTP失败，区分两类路径。

验收：

- [ ] 受控子组件渲染失败时其他页面区域可用。
- [ ] 事件/异步失败有自己的处理，不假设边界兜底。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.1.11.error-boundary.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.1.11.error-boundary-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.1.11.error-boundary.md)

<a id="p-4-2-1-12"></a>

## 4.2.1.12 Fragment、Portal与Suspense：三种不同边界

在React副本按需加载帮助卡，采用Fragment组合；若需要对话框，先比较原生dialog而非只做Portal位置搬移。

验收：

- [ ] 动态模块加载后替换回退并正常渲染。
- [ ] Portal目标存在且卸载清理，不把位置变化当焦点管理完成。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.1.12.portal.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.1.12.portal-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.1.12.portal.md)

<a id="p-4-2-1-13"></a>

## 4.2.1.13 StrictMode：开发期纯度与清理探测

在React实验开发入口保留StrictMode，给订阅记录setup/cleanup；对比生产预览交互，解释差别。

验收：

- [ ] 额外探测后只剩当前有效订阅，卸载后全部释放。
- [ ] 渲染或Effect没有造成重复业务写入。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.1.13.strict-mode.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.1.13.strict-mode-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.1.13.strict-mode.md)

<a id="p-4-2-2-1"></a>

## 4.2.2.1 React Router：URL、路由声明与导航

在React对照副本把阅读任务id和搜索条件编码到URL，核对复制链接与刷新；比较Nuxt文件路由的同类职责。

验收：

- [ ] id与query由当前URL解析并处理缺失值。
- [ ] 链接可识别；深链部署条件与MemoryRouter测试范围分开。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.2.1.react-router.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.2.1.react-router-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.2.1.react-router.md)

<a id="p-4-2-2-2"></a>

## 4.2.2.2 嵌套与布局路由：Outlet和相对路径

在React副本把列表/详情放进同一阅读布局，保留导航栏，比较Nuxt layouts与嵌套路由的职责差别。

验收：

- [ ] 父布局始终可见，子页匹配后显示在Outlet。
- [ ] 未匹配路径有404，刷新条件明确。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.2.2.layout-route.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.2.2.layout-route-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.2.2.layout-route.md)

<a id="p-4-2-2-3"></a>

## 4.2.2.3 客户端路由守卫：重定向与服务端授权的分工

在React副本加入显式会话加载占位，再模拟匿名/成功/过期；列出Nuxt中间件与服务端API分别必须做什么。

验收：

- [ ] 未知状态先等待，匿名才跳转。
- [ ] 直接API访问仍由服务端拒绝，无法在本地fixture验证时明确未测。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.2.3.item-4-2-2-3.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.2.3.item-4-2-2-3-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.2.3.item-4-2-2-3.md)

<a id="p-4-2-2-4"></a>

## 4.2.2.4 lazy路由：按需代码、等待与失败

在React副本把低频帮助页拆成懒模块，比较Nuxt页面自动分块；提供等待和加载失败恢复方案。

验收：

- [ ] 生产产物确有独立动态模块。
- [ ] 失败与等待是不同状态，后续能离开或重试。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.2.4.react.lazy.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.2.4.react.lazy-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.2.4.react.lazy.md)

<a id="p-4-2-3-1"></a>

## 4.2.3.1 何时全局状态：按所有权与生命周期选择

为React对照副本的搜索、选中、远程列表、登录占位画所有权表，解释哪些应该局部、URL、缓存或应用共享。

验收：

- [ ] 每项状态只有明确来源与写入者。
- [ ] 共享需求和生命周期有理由，不为演示强加多个store。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.3.1.item-4-2-3-1.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.3.1.item-4-2-3-1-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.3.1.item-4-2-3-1.md)

<a id="p-4-2-3-2"></a>

## 4.2.3.2 Zustand：选择器、订阅与工厂隔离

在React副本以工厂创建选中任务store，用选择器连接两个消费者，再比较Pinia应用实例的隔离职责。

验收：

- [ ] 两消费者按契约共享，同页面另一实例保持独立。
- [ ] 手动订阅解除且未把用户状态做进程单例。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.3.2.zustand.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.3.2.zustand-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.3.2.zustand.md)

<a id="p-4-2-3-3"></a>

## 4.2.3.3 Redux Toolkit：slice、异步action与中间件

在React副本为阅读标题加载定义pending/success/error，模拟失败；若需要UI，另接Provider并说明属于新增扩展。

验收：

- [ ] 成功与拒绝路径分别可验证，loading最终结束。
- [ ] 调用端正确处理unwrap拒绝，不把rejected action当业务成功。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.3.3.redux-toolkit.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.3.3.redux-toolkit-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.3.3.redux-toolkit.md)

<a id="p-4-2-3-4"></a>

## 4.2.3.4 TanStack Query：服务端缓存、失效与乐观更新

在React副本为同一阅读列表设计用户+筛选key和失败回滚计划；新增Mutation时用延迟失败fixture验证，不复制到Nuxt造成两套缓存真相。

验收：

- [ ] 查询输入变化映射到不同key。
- [ ] 失败回滚与最终重新校验可解释，不把本例等同完整并发乐观更新。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.3.4.tanstack-query-react-query.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.3.4.tanstack-query-react-query-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.3.4.tanstack-query-react-query.md)

<a id="p-4-2-3-5"></a>

## 4.2.3.5 React Hook Form + Zod：输入注册与运行校验

在React副本新增描述字段和服务端拒绝fixture，保持输入、字段错误与提交错误分开；主Nuxt表单继续使用其原生/Vue契约。

验收：

- [ ] 空白/过长标题被拒绝且错误关联输入。
- [ ] 成功提交使用schema输出，客户端通过不等于后端可信。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.3.5.react-hook-form.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.3.5.react-hook-form-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.3.5.react-hook-form.md)

<a id="p-4-2-4-1"></a>

## 4.2.4.1 展示组件与容器：按职责组合而非机械分层

在React副本把阅读卡展示与列表查询分开，仅在复用/可测性有收益时拆分，与Vue Props/emits比较。

验收：

- [ ] 展示组件可以用固定props独立渲染。
- [ ] 查询失败由所有者呈现，组件分层没有吞掉错误。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.4.1.vs.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.4.1.vs-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.4.1.vs.md)

<a id="p-4-2-4-2"></a>

## 4.2.4.2 React组件库：Ant Design、MUI与shadcn/ui选型

为React选修副本写一页控件选型比较，选择一套或保持原生，再在独立分支做最小接入；不改变主Nuxt选型。

验收：

- [ ] 比较同一需求、版本与维护方式，结论有理由。
- [ ] 接入未实际完成时清楚写未测，不宣称三套库兼容通过。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.4.2.ant-design.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.4.2.ant-design-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.4.2.ant-design.md)

<a id="p-4-2-4-3"></a>

## 4.2.4.3 React样式：CSS Modules、CSS-in-JS与工具类

在React副本给阅读卡增加局部错误样式，检查产物类名并解释全局/继承边界；与4.4工具类比较后保留一个主方案。

验收：

- [ ] 真实构建生成并消费CSS Modules映射。
- [ ] 切换方案有需求依据，未实装的方案不标已验证。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.4.3.css-css-modules-styled-components.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.4.3.css-css-modules-styled-components-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.4.3.css-css-modules-styled-components.md)

<a id="p-4-2-4-4"></a>

## 4.2.4.4 Next.js App Router：页面、Route Handlers与服务端边界

把主Nuxt阅读应用的pages/layouts/server/API边界映射成一份Next App Router候选目录与数据流，不要求再建生产项目。

验收：

- [ ] App Router与Pages Router目录和API不混淆。
- [ ] 标明服务端秘密、客户端交互及授权位置，并如实记录未运行Next。

[理论](../../1-notes/04-frameworks/4.2-react/4.2.4.4.next.js.md) · [示例](../../2-examples/04-frameworks/4.2-react/4.2.4.4.next.js-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.2-react/4.2.4.4.next.js.md)

<a id="p-4-3-1-1"></a>

## 4.3.1.1 Vue模板与指令：渲染、事件、条件、列表和表单

先在Vue实验核对v-show帮助区域保留节点；再用Nuxt已有卡片临时笔记验证反转列表后的稳定id。标题用文本展示；当前筛选卸载后笔记可丢失，若要跨筛选保留，在副本明确提升状态所有权。

验收：

- [ ] Nuxt反转顺序后笔记仍属于原条目；插入变体也用稳定id，不要求key跨卸载存储。
- [ ] Vue实验帮助区域隐藏后仍保留节点；Nuxt恶意形状标题为文本，空列表有明确反馈。

[理论](../../1-notes/04-frameworks/4.3-vue/4.3.1.1.v-if-v-for-v-show-v-bind-v-on.md) · [示例](../../2-examples/04-frameworks/4.3-vue/4.3.1.1.v-if-v-for-v-show-v-bind-v-on-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.3-vue/4.3.1.1.v-if-v-for-v-show-v-bind-v-on.md)

<a id="p-4-3-1-2"></a>

## 4.3.1.2 Vue响应式：ref、reactive、computed与composables

在Nuxt副本把一个实际筛选/计数整理为纯派生值，说明局部composable与useState/Pinia职责，避免缓存一份重复列表。

验收：

- [ ] 改变任一依赖后显示同步，computed没有网络/存储副作用。
- [ ] 两次composable调用状态独立；能重现普通reactive解构失连接并修复。

[理论](../../1-notes/04-frameworks/4.3-vue/4.3.1.2.setup.md) · [示例](../../2-examples/04-frameworks/4.3-vue/4.3.1.2.setup-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.3-vue/4.3.1.2.setup.md)

<a id="p-4-3-1-3"></a>

## 4.3.1.3 Vue生命周期：挂载、更新、卸载与资源清理

在Nuxt副本盘点一项监听或请求的创建/释放位置；客户端资源放合法生命周期，并说明服务端渲染为何不能访问window。

验收：

- [ ] 反复挂载/卸载后不存在重复监听或计时器。
- [ ] 能够区分挂载、停用与卸载，说明SSR中哪些钩子不执行。

[理论](../../1-notes/04-frameworks/4.3-vue/4.3.1.3.onmounted.md) · [示例](../../2-examples/04-frameworks/4.3-vue/4.3.1.3.onmounted-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.3-vue/4.3.1.3.onmounted.md)

<a id="p-4-3-1-4"></a>

## 4.3.1.4 Vue组件契约：Props、事件、v-model与插槽

在Nuxt副本为一个真实列表项整理Props与事件，增加一个必要的插槽；如改用组件v-model，明确命名和父状态初始化。

验收：

- [ ] 子级不直接修改props对象；正常点击只发一次正确id。
- [ ] 父级模型/props变化回传UI；区分父作用域的普通插槽内容与新增作用域插槽的显式slotProps。

[理论](../../1-notes/04-frameworks/4.3-vue/4.3.1.4.emit.md) · [示例](../../2-examples/04-frameworks/4.3-vue/4.3.1.4.emit-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.3-vue/4.3.1.4.emit.md)

<a id="p-4-3-1-5"></a>

## 4.3.1.5 Vue依赖注入：provide/inject的作用域与类型

在Nuxt副本选择一个真正跨层的主题/配置契约，比较props与inject；若使用provide，标出提供范围、默认值和修改责任。

验收：

- [ ] 子树使用最近提供者，其他分支不受覆盖影响。
- [ ] 缺失依赖有明确反馈，键和payload经TS检查。

[理论](../../1-notes/04-frameworks/4.3-vue/4.3.1.5.provide.md) · [示例](../../2-examples/04-frameworks/4.3-vue/4.3.1.5.provide-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.3-vue/4.3.1.5.provide.md)

<a id="p-4-3-1-6"></a>

## 4.3.1.6 Vue模板引用：DOM可用时机、nextTick与组件公开接口

在Nuxt副本给一个实际可展开表单增加更新后聚焦，注明客户端时机，不在服务端setup读取document。

验收：

- [ ] 元素在更新后确实获得焦点，关闭后不会对空引用调用方法。
- [ ] 不通过ref手改渲染文本，必要子组件接口保持最小。

[理论](../../1-notes/04-frameworks/4.3-vue/4.3.1.6.ref.md) · [示例](../../2-examples/04-frameworks/4.3-vue/4.3.1.6.ref-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.3-vue/4.3.1.6.ref.md)

<a id="p-4-3-1-7"></a>

## 4.3.1.7 Vue动态组件与KeepAlive：实例缓存、激活和停用

评估Nuxt副本是否确需缓存一个页面，给出保留/重置/过期策略；没有需要时保留普通组件，不强加KeepAlive。

验收：

- [ ] 缓存场景草稿保留，去掉缓存后预期重建，能解释原因。
- [ ] 后台资源按激活状态暂停，缓存上限与刷新后重建边界清楚。

[理论](../../1-notes/04-frameworks/4.3-vue/4.3.1.7.keepalive.md) · [示例](../../2-examples/04-frameworks/4.3-vue/4.3.1.7.keepalive-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.3-vue/4.3.1.7.keepalive.md)

<a id="p-4-3-1-8"></a>

## 4.3.1.8 Vue侦听副作用：watch、watchEffect、取消与迟到结果

在Nuxt副本选择一处依赖用户输入的副作用，区分是否应交给useFetch/useAsyncData；若手工watch，写慢旧结果、清空和离开页面三项验收。

验收：

- [ ] 慢A不能覆盖快B；取消调用可观察且即使底层忽略取消仍不会写旧状态。
- [ ] 清空输入和停止scope后不再展示迟到结果，失败可恢复；清理在await前注册。

[理论](../../1-notes/04-frameworks/4.3-vue/4.3.1.8.watch-cleanup.md) · [示例](../../2-examples/04-frameworks/4.3-vue/4.3.1.8.watch-cleanup-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.3-vue/4.3.1.8.watch-cleanup.md)

<a id="p-4-3-2-1"></a>

## 4.3.2.1 Vue Router：动态参数、懒加载、导航守卫与历史

在Nuxt综合项目核对动态详情及query的行为，比较文件路由与本节显式routes；副本增加一次参数复用/刷新专项，不重复手工安装router。

验收：

- [ ] 详情id1→id2不出现旧数据，返回/刷新/不存在id均有可解释结果。
- [ ] 链接是原生可导航锚点，能说明生产fallback与服务端授权责任。

[理论](../../1-notes/04-frameworks/4.3-vue/4.3.2.1.vue-router.md) · [示例](../../2-examples/04-frameworks/4.3-vue/4.3.2.1.vue-router-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.3-vue/4.3.2.1.vue-router.md)

<a id="p-4-3-2-2"></a>

## 4.3.2.2 Pinia：state、getters、actions与实例边界

在Nuxt副本把状态分为局部/URL/useState/Pinia/服务端数据，选择一项真正跨页业务状态实现；若无需Pinia，给出具体理由而非为了覆盖技术强引入。

验收：

- [ ] 同应用两处状态一致，storeToRefs解构后getter仍实时变化。
- [ ] 第二Pinia实例不继承第一实例状态，刷新/持久化边界有明确说明。

[理论](../../1-notes/04-frameworks/4.3-vue/4.3.2.2.pinia.md) · [示例](../../2-examples/04-frameworks/4.3-vue/4.3.2.2.pinia-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.3-vue/4.3.2.2.pinia.md)

<a id="p-4-3-3-1"></a>

## 4.3.3.1 Vue单文件组件：template、script setup与scoped CSS

在Nuxt综合项目副本选一个实际页面，拆出最小SFC；指出哪些是组件实例状态、哪些是应用配置，不为复用提取空壳组件。

验收：

- [ ] 两个实例各自拥有本地状态，修改一个不改另一个。
- [ ] vue-tsc与生产构建都通过，能解释scoped与Shadow DOM的差别。

[理论](../../1-notes/04-frameworks/4.3-vue/4.3.3.1..vue.md) · [示例](../../2-examples/04-frameworks/4.3-vue/4.3.3.1..vue-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.3-vue/4.3.3.1..vue.md)

<a id="p-4-3-3-2"></a>

## 4.3.3.2 Vue组件库选型：Nuxt UI、Vant与实际产品约束

为Nuxt综合项目写一页UI选型决策，用实际页面列必要控件；选一个候选副本验证，不因教程标题含库名就声称工程已依赖该库。

验收：

- [ ] 比较结果至少覆盖需求、版本/SSR、交互/无障碍、主题与产物成本。
- [ ] 区分文档声明和自己实测；未安装/运行的库不写已通过。

[理论](../../1-notes/04-frameworks/4.3-vue/4.3.3.2.element-plus.md) · [示例](../../2-examples/04-frameworks/4.3-vue/4.3.3.2.element-plus-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.3-vue/4.3.3.2.element-plus.md)

<a id="p-4-3-3-3"></a>

## 4.3.3.3 Nuxt概览：Vue应用框架与4.5的学习入口

对照Nuxt综合项目实际目录，说明从本Vue lab迁移时删去哪些手工装配；为当前模式列出首屏、客户端导航、刷新和运行配置验证。

验收：

- [ ] 能说明Vue与Nuxt分工，不把Nuxt等同组件库或单一SSR模式。
- [ ] 静态托管/server能力、配置公开边界和每请求状态风险表述准确。

[理论](../../1-notes/04-frameworks/4.3-vue/4.3.3.3.nuxt.md) · [示例](../../2-examples/04-frameworks/4.3-vue/4.3.3.3.nuxt-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.3-vue/4.3.3.3.nuxt.md)

<a id="p-4-4-1"></a>

## 4.4.1 Tailwind CSS 4：真实工具类构建与响应式前缀

主Nuxt任务板使用自己的CSS。先对照两种样式组织方式；若在副本接入Tailwind，只替换一张卡片并检查真实产物，不把本实验构建结果当作Nuxt已集成。

验收：

- [ ] 实际构建生成grid与md断点规则，HTML引用的是本地编译CSS。
- [ ] 390与1440宽度分别一列/两列，无横向溢出；能解释移动优先。

[理论](../../1-notes/04-frameworks/4.4-css-ui/4.4.1.tailwind-css.md) · [示例](../../2-examples/04-frameworks/4.4-css-ui/4.4.1.tailwind-css-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.4-css-ui/4.4.1.tailwind-css.md)

<a id="p-4-4-2"></a>

## 4.4.2 设计令牌与组件规范：颜色、间距和行为契约

列出Nuxt阅读资料库的背景、正文、边框、焦点与错误令牌，在副本统一一处硬编码样式；不要求主工程改用某个UI库。

验收：

- [ ] 相同语义由同一令牌驱动，切换主题时文本、背景、边框成组变化。
- [ ] 按钮有明确名称、焦点与aria-pressed，说明规范包含行为而非只含颜色。

[理论](../../1-notes/04-frameworks/4.4-css-ui/4.4.2.item-4-4-2.md) · [示例](../../2-examples/04-frameworks/4.4-css-ui/4.4.2.item-4-4-2-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.4-css-ui/4.4.2.item-4-4-2.md)

<a id="p-4-4-3"></a>

## 4.4.3 本地SVG图标：装饰、名称与外部资源边界

核对阅读资料卡片动作是否有可见文字或按钮名称；若新增图标，使用本地资源并验证装饰/信息区分，不为图标强装组件库。

验收：

- [ ] 装饰图标不重复命名，纯图标动作仍有明确按钮名称。
- [ ] 独立信息图标有名称，图标加载失败时关键按钮含义不丢失。

[理论](../../1-notes/04-frameworks/4.4-css-ui/4.4.3.icon-font-svg-icon-lucide.md) · [示例](../../2-examples/04-frameworks/4.4-css-ui/4.4.3.icon-font-svg-icon-lucide-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.4-css-ui/4.4.3.icon-font-svg-icon-lucide.md)

<a id="p-4-4-4"></a>

## 4.4.4 浅深主题：系统偏好、手动覆盖与SSR初始一致

主Nuxt工程默认CSS跟随系统。将手动主题与持久化作为副本扩展：先保证SSR/客户端初始一致，再分别验证两主题和恢复系统，不声称主项目已有该设置。

验收：

- [ ] 系统默认、两种手动覆盖及回system行为明确，颜色和color-scheme一致。
- [ ] 无脚本初始内容可读；明确本例不保存偏好，也未声称Nuxt已实现持久化。

[理论](../../1-notes/04-frameworks/4.4-css-ui/4.4.4.prefers-color-scheme.md) · [示例](../../2-examples/04-frameworks/4.4-css-ui/4.4.4.prefers-color-scheme-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.4-css-ui/4.4.4.prefers-color-scheme.md)

<a id="p-4-5-1"></a>

## 4.5.1 Nuxt 4骨架、文件路由与布局

核对阅读资料库的列表/详情/关于页与布局。在副本新增页面并验证深链，现有工程不是自动生成所有业务页面。

验收：

- [ ] 能画出app入口→布局→页面与server/api的不同职责。
- [ ] 详情客户端进入、直接打开和刷新均有明确结果，未知id不被当正常资料。

[理论](../../1-notes/04-frameworks/4.5-nuxt/4.5.1.scaffold-routing-layouts.md) · [示例](../../2-examples/04-frameworks/4.5-nuxt/4.5.1.scaffold-routing-layouts-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.5-nuxt/4.5.1.scaffold-routing-layouts.md)

<a id="p-4-5-2"></a>

## 4.5.2 CSR、SSR、SSG与hydration：同一组件的不同运行时机

比较默认SSR资料库、client-demo客户端页与独立generate的已知静态路径；用原始响应/静态产物与真实操作各留证据，说明静态副本不等价支持任意query/POST。

验收：

- [ ] 能用实际初始HTML和浏览器行为分别解释SSR、CSR与预渲染。
- [ ] 浏览器专属代码没有在SSR执行，初始输出一致；未将已预生成路径等同所有动态业务都能静态运行。

[理论](../../1-notes/04-frameworks/4.5-nuxt/4.5.2.rendering-hydration.md) · [示例](../../2-examples/04-frameworks/4.5-nuxt/4.5.2.rendering-hydration-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.5-nuxt/4.5.2.rendering-hydration.md)

<a id="p-4-5-3"></a>

## 4.5.3 useFetch/useAsyncData：payload、状态、key与取消

追踪已有资料库列表/详情读取与表单提交；在独立副本新增一次可取消的条件读取，验证payload、key、刷新及signal传递。主项目没有取消按钮，公开fixture也不是真实业务后端。

验收：

- [ ] 首屏payload复用与后续刷新/查询各有证据，读取与提交路径分清。
- [ ] 错误、空、加载、成功分别处理；变化的数据身份与key/URL一致，取消传到下层并说明业务边界。

[理论](../../1-notes/04-frameworks/4.5-nuxt/4.5.3.data-fetching-lifecycle.md) · [示例](../../2-examples/04-frameworks/4.5-nuxt/4.5.3.data-fetching-lifecycle-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.5-nuxt/4.5.3.data-fetching-lifecycle.md)

<a id="p-4-5-4"></a>

## 4.5.4 Nuxt状态：组件、本应用与SSR请求隔离

验证资料库书签在同应用可复用，并用isolation公开seed检查SSR请求边界；持久化和登录作为后续扩展，不虚构已有功能。

验收：

- [ ] 同应用组件共享正确；两个独立SSR请求的seed或状态不串。
- [ ] 能指出顶层可变单例风险，并说明useState不提供认证或数据库持久化。

[理论](../../1-notes/04-frameworks/4.5-nuxt/4.5.4.state-request-boundaries.md) · [示例](../../2-examples/04-frameworks/4.5-nuxt/4.5.4.state-request-boundaries-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.5-nuxt/4.5.4.state-request-boundaries.md)

<a id="p-4-5-5"></a>

## 4.5.5 runtimeConfig：公开配置、服务端秘密与运行时覆盖

核对资料库public标签与配置端点，在副本检验同一构建的覆盖与泄漏边界；不把布尔configured标志当生产安全审计。

验收：

- [ ] public覆盖在客户端可观察，私有演示值未进入HTML/payload/客户端产物或API返回。
- [ ] 能解释.env开发读取与生产环境注入、SSR服务与静态部署的差别。

[理论](../../1-notes/04-frameworks/4.5-nuxt/4.5.5.runtime-config.md) · [示例](../../2-examples/04-frameworks/4.5-nuxt/4.5.5.runtime-config-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.5-nuxt/4.5.5.runtime-config.md)

<a id="p-4-5-6"></a>

## 4.5.6 Nitro最小API：输入校验与业务后端边界

阅读资料库的公开API与validate端点，解释何处校验、哪些能力尚未实现；不伪造登录或生产数据库。

验收：

- [ ] 合法与非法输入均有真实HTTP结果，错误类型和状态明确。
- [ ] 公开fixture、输入校验、身份认证与资源授权没有混为一谈；不回传内部配置或堆栈。

[理论](../../1-notes/04-frameworks/4.5-nuxt/4.5.6.nitro-server-routes.md) · [示例](../../2-examples/04-frameworks/4.5-nuxt/4.5.6.nitro-server-routes-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.5-nuxt/4.5.6.nitro-server-routes.md)

<a id="p-4-5-7"></a>

## 4.5.7 Plugins、composables、modules与Layers：选择复用边界

追踪资料库插件、composable、local module和learning Layer。副本只扩展一种能力，写明哪些是本地复用、哪些仍未发布。

验收：

- [ ] 四种职责和调用上下文能分别解释，有对应实际文件和装配结果。
- [ ] 复用不破坏请求隔离或引入浏览器API到SSR；未将本地Layer当真实发布完成。

[理论](../../1-notes/04-frameworks/4.5-nuxt/4.5.7.plugins-modules-layers.md) · [示例](../../2-examples/04-frameworks/4.5-nuxt/4.5.7.plugins-modules-layers-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.5-nuxt/4.5.7.plugins-modules-layers.md)

<a id="p-4-5-8"></a>

## 4.5.8 Nuxt中间件、错误页、404与浏览器边界

核对资料库study中间件、404与错误页恢复；真实权限流程在阶段5按后台契约实现，当前公开样本不提供身份保护。

验收：

- [ ] 重定向不循环，未知资源/未知页面有明确404与恢复路径。
- [ ] SSR/客户端错误处理与API授权职责分开，浏览器API只在正确环境执行。

[理论](../../1-notes/04-frameworks/4.5-nuxt/4.5.8.middleware-errors-client-boundaries.md) · [示例](../../2-examples/04-frameworks/4.5-nuxt/4.5.8.middleware-errors-client-boundaries-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.5-nuxt/4.5.8.middleware-errors-client-boundaries.md)

<a id="p-4-5-9"></a>

## 4.5.9 useHead/useSeoMeta：SSR首屏与导航后的页面标题

验证资料库列表/详情的标题与描述在SSR和导航中都正确，在副本新增一个页面元信息；不承诺收录或排名。

验收：

- [ ] SSR原始HTML有与资源一致的标题/描述，公开字段安全。
- [ ] 客户端导航、参数变化与返回列表后标题正确，无旧页残留；不冒称完整SEO验收。

[理论](../../1-notes/04-frameworks/4.5-nuxt/4.5.9.head-page-metadata.md) · [示例](../../2-examples/04-frameworks/4.5-nuxt/4.5.9.head-page-metadata-demo.md) · [独立练习](../../3-exercises/04-frameworks/4.5-nuxt/4.5.9.head-page-metadata.md)
