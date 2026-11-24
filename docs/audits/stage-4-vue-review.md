# 阶段4.3 Vue 3、Router与Pinia逐点审查

日期：2026-11-24。子任务开始16:15:35 UTC。范围为原有12点及新增4.3.1.8，共13点；依据AUTHORING版本1 R01–R09。该报告是分组内容/运行证据，最终阶段契约、综合任务事实和总体验收由主代理集成核对，不把分组完成替代阶段通过。

## 规划与递进

明显问题是原4.3.1.2将状态、派生值、watch/watchEffect和异步清理挤在一项；拆出4.3.1.8专门解释副作用、依赖追踪、注册时机、取消与迟到保护。其余必要基础补入现有点，不无限扩目录：响应式解构与nextTick在4.3.1.2，生命周期SSR边界在4.3.1.3，命名v-model与插槽在4.3.1.4，Router params复用和生产fallback在4.3.2.1，Pinia实例隔离在4.3.2.2。

先4.3.3.1 SFC，再模板/响应式/组件与生命周期，随后watch/Router/Pinia，最后选型与Nuxt概览。编号保留地图索引，不要求React先修；Nuxt完整框架知识和运行在4.5。

## 逐点核对

| 编号 | 具体机制与实测/观察 | 练习与边界 |
| --- | --- | --- |
| 4.3.1.1 | 文本插值、条件/列表、稳定key、表单model；浏览器草稿文字不生成b元素，切换完成驱动摘要 | 插入重排变体、索引key串位故障；未把v-show当权限 |
| 4.3.1.2 | ref/reactive/computed、toRefs与普通解构；真实测试旧快照1对比派生4 | 两次composable实例与纯派生；Vue3.5 props解构编译例外明确 |
| 4.3.1.3 | mounted/activated/deactivated/unmounted日志；停止scope后旧结果不回写 | 外部监听重复注册可复现；mounted非所有异步就绪，SSR钩子不照搬客户端 |
| 4.3.1.4 | 真实SFC Props/emit/draft模型/作用域slot；VTU和Chrome验证，错误输入类型被编译器拒绝 | 父级拥有状态、具体update:draft事件名故障，不假定emit自然冒泡 |
| 4.3.1.5 | 同一InjectionKey提供readonly ref+动作，实际注入后切主题 | 同名不同Symbol的缺失故障、最近祖先作用域；不是进程单例 |
| 4.3.1.6 | v-if后nextTick聚焦，VTU与真实Chrome焦点断言 | 空引用和提前focus故障；未做真实移动键盘/屏幕阅读器 |
| 4.3.1.7 | KeepAlive计数保持1、日志停用再激活，mounted仅一次 | 无缓存/缓存上限与资源暂停变体；不声称持久化/HTTP缓存 |
| 4.3.1.8 | watchEffect清理、watch受控慢A快B、忽略abort的旧结果、空/错/恢复与停止后不回写 | 取消+代次保护，明确await前注册；数据为内存延迟fixture |
| 4.3.2.1 | 详情1→2、刷新、懒加载产物与演示守卫；memory Router单测+Chrome | onMounted只读一次params故障，生产回退/状态码/授权边界 |
| 4.3.2.2 | Pinia action与实时getter，两个Pinia实例隔离 | store解构快照故障；无持久化、未证明SSR请求隔离 |
| 4.3.3.1 | 实际.vue编译、独立实例状态、真实scoped CSS属性选择器产物 | 插件缺失故障；scoped非Shadow DOM，不把宏当普通TS函数 |
| 4.3.3.2 | 阅读Nuxt UI/Vant官方，原生实验作为行为基线与具体选型清单 | 版本/SSR/键盘/触控/主题/构建小样；未安装两套UI库，不冒称测试通过 |
| 4.3.3.3 | Vue自装配main/router与Nuxt职责/模式对照 | 静态托管server能力误区；本组只概览，Nuxt实测见主综合工程 |

四部分路径及更具体的内容事实见[逐点记录](./stage-4-vue-points.json)。13项综合任务建议在本组integration-cases.json，最终以主代理tasks.md和机器契约为准。

## R01–R09分组结论

- R01：13唯一编号、理论、源码操作卡和独立练习齐全；综合建议各有2项标准。
- R02：先SFC再模板与状态，副作用独立解释；代码片段标明setup/模板上下文，复杂细节链接完整源码。
- R03：先读MWG Forms正文，再核对Vue官方、Router/Pinia、Nuxt和UI库官方。实际版本经registry核对，未把训练知识冒充查阅。
- R04：真正vue-tsc、Vite、Vitest/VTU和Chrome运行；选型与Nuxt概览明确为阅读/比较。
- R05：13份练习均有独立变体、至少2标准、明确复现故障及修复判据，不用通用“理解知识点”充数。
- R06：建议任务面向Nuxt副本或Vue实验，没虚构主工程已使用Pinia、KeepAlive或指定UI库；主代理仍需对照实际项目作最终集成。
- R07：模型/事件/状态名与源码核对，普通响应式解构区别于Vue3.5编译宏例外；客户端/SSR、注入/全局、路由/授权边界一致。
- R08：类型配置、原生search编译识别、测试依赖提供者和负例期望等发现已修复并实证；无未关闭必达问题。
- R09：本报告区分分组交付、正式阶段验收与学习者掌握；没有修改地图勾选、公共索引或提交。

## 实际结果与范围

环境：Node26.0.0、pnpm11.4.0、Vue3.5.46、Router5.5.1、Pinia4.1.0、TS6.0.3、vue-tsc3.3.14、Vite8.3.8、plugin-vue6.0.11。当前官方Router/Pinia文档主版本已变化，固定锁文件与公开API核对，不能泛称旧主版本为最新。

冻结安装、vue-tsc、11个单元/VTU测试、3类真实SFC编译错误、实际生产构建、scoped CSS与3个懒路由chunk检查通过；后台Chrome1440×900/390×844共2个完整E2E通过。详见[运行记录](./stage-4-vue-runtime.json)。HTML资源检查在分组时162页/612引用/0错；不是最终全阶段统计。

本轮修正：exactOptionalPropertyTypes要求可选字段缺席而非undefined；路由测试重定向后要提供真实注入依赖；原生search标签在当前编译器需显式保留以消除未解析组件警告。负例中SFC监听器参数方差没有产生预期第三错误，改为直接调用类型化emit的错误payload，真实检查TS2345，不伪造监听器报错。

未测真机、其他浏览器、屏幕阅读器、编辑器UI、真实后端/登录/SSR请求隔离/生产部署与学习者试学。搜索是内存fixture，Pinia只验应用实例隔离，Nuxt由4.5/综合项目另验，Nuxt UI/Vant只做官方资料比较。

## 官方资料

[MWG Forms](https://developer.chrome.com/docs/modern-web-guidance/guides/forms/forms)影响原生label/button/search与状态反馈；框架专属语义按[Vue指南](https://vuejs.org/guide/introduction.html)、[watchers](https://vuejs.org/guide/essentials/watchers.html)、[Props](https://vuejs.org/guide/components/props.html)、[组件model](https://vuejs.org/guide/components/v-model.html)、[模板引用](https://vuejs.org/guide/essentials/template-refs.html)、[KeepAlive](https://vuejs.org/guide/built-ins/keep-alive.html)、[Router动态参数](https://router.vuejs.org/guide/essentials/dynamic-matching.html)、[Pinia](https://pinia.vuejs.org/core-concepts/)、[Nuxt渲染](https://nuxt.com/docs/4.x/guide/concepts/rendering)、[Nuxt UI](https://ui.nuxt.com/docs/getting-started)、[Vant官方仓库](https://github.com/youzan/vant)核对。Vant客户端文档页面无可读正文时改读官方仓库介绍。
