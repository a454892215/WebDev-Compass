# 阶段8逐知识点综合任务

先按[工作台说明](./README.md)核对已有能力，再在副本完成变体。39项对应主项目、独立模块/BFF/状态lab或明确官方观察。没有真实需求时可不采用微前端、CRDT或Edge；保持解释与取舍证据，不以安装数量衡量掌握。

<a id="p-8-1-1"></a>

## 8.1.1 RFC与ADR：记录可检验的取舍和决策后果

给目录新增“推荐课程”需求，写直接扩展现有feature与独立feature两方案，明确是否需独立部署，不为了使用微前端而创造团队。

验收：

- [ ] 至少两备选按同一约束比较，决策后果含复杂度、验证和撤回条件。
- [ ] 说清已有与要求新增；用实际文件/请求/行为证据支撑，不把打分矩阵当客观科学。

[理论](../../1-notes/08-architecture/8.1-architecture-docs/8.1.1.rfc-adr.md) · [示例](../../2-examples/08-architecture/8.1-architecture-docs/8.1.1.rfc-adr-demo.md) · [独立练习](../../3-exercises/08-architecture/8.1-architecture-docs/8.1.1.rfc-adr.md)

<a id="p-8-1-2"></a>

## 8.1.2 非功能需求：把性能、安全与演进目标变成验收

把可选进度改成购买决策所必需的数据，重新写可用性与失败策略，比较null降级和阻断页面。

验收：

- [ ] 至少三项可观察响应或状态，记录环境、输入、采样范围和未测生产限制。
- [ ] 质量冲突有取舍：安全/一致性要求不能为页面始终200而静默吞掉错误。

[理论](../../1-notes/08-architecture/8.1-architecture-docs/8.1.2.nfr.md) · [示例](../../2-examples/08-architecture/8.1-architecture-docs/8.1.2.nfr-demo.md) · [独立练习](../../3-exercises/08-architecture/8.1-architecture-docs/8.1.2.nfr.md)

<a id="p-8-1-3"></a>

## 8.1.3 C4架构图：区分系统、运行单元与代码组件

在副本假设接入真正HTTP课程服务，更新Container和信任边界，并将实际已有与设想用文字分开。

验收：

- [ ] 关系标注请求/响应协议、公开与服务端边界，图与对应代码一致。
- [ ] 解释C4 Container与Docker区别；用文字提供图的等价说明，不只靠颜色。

[理论](../../1-notes/08-architecture/8.1-architecture-docs/8.1.3.item-8-1-3.md) · [示例](../../2-examples/08-architecture/8.1-architecture-docs/8.1.3.item-8-1-3-demo.md) · [独立练习](../../3-exercises/08-architecture/8.1-architecture-docs/8.1.3.item-8-1-3.md)

<a id="p-8-1-4"></a>

## 8.1.4 按业务域和技术层划分：以变更边界组织代码

为“课程推荐”列一条独立变化路径；选择并解释放现有catalog还是独立feature，定义允许依赖的公共接口。

验收：

- [ ] 域规则可离开Vue单测，页面不直接访问server/infra。
- [ ] 不把纯DTO契约升级为万能shared业务仓库；说明一项真实避免重复和一项防过度抽象措施。

[理论](../../1-notes/08-architecture/8.1-architecture-docs/8.1.4.item-8-1-4.md) · [示例](../../2-examples/08-architecture/8.1-architecture-docs/8.1.4.item-8-1-4-demo.md) · [独立练习](../../3-exercises/08-architecture/8.1-architecture-docs/8.1.4.item-8-1-4.md)

<a id="p-8-1-5"></a>

## 8.1.5 依赖规则与门禁：显式import、别名和循环

在隔离副本新增domain导入vue、两个文件互相import、页面通过别名导入server三种违规；分别验证非零退出再恢复。

验收：

- [ ] 真实违规引入后门禁失败，修复后通过；别名不能成为绕过路径。
- [ ] 说明Nuxt自动导入、计算属性导入、运行时eval/插件、外部包内部图等未完整覆盖，不宣称完整安全沙箱。

[理论](../../1-notes/08-architecture/8.1-architecture-docs/8.1.5.item-8-1-5.md) · [示例](../../2-examples/08-architecture/8.1-architecture-docs/8.1.5.item-8-1-5-demo.md) · [独立练习](../../3-exercises/08-architecture/8.1-architecture-docs/8.1.5.item-8-1-5.md)

<a id="p-8-1-6"></a>

## 8.1.6 移动端模块化与Vue/Nuxt：复用目标，区分运行约束

将一份移动模块“全局currentUser单例+网络service+UI”迁移设计拆成Web请求上下文、DTO、客户端状态与服务端端口，给出并发请求/刷新后的行为。

验收：

- [ ] 至少列源码依赖、每请求状态、公开payload、部署单元四个维度差异。
- [ ] 说明公共前端代码和URL不是秘密，后台仍负责真实授权；不得把fixture scope校验当生产账号保护。

[理论](../../1-notes/08-architecture/8.1-architecture-docs/8.1.6.android-flutter-feature-module-feature-sliced.md) · [示例](../../2-examples/08-architecture/8.1-architecture-docs/8.1.6.android-flutter-feature-module-feature-sliced-demo.md) · [独立练习](../../3-exercises/08-architecture/8.1-architecture-docs/8.1.6.android-flutter-feature-module-feature-sliced.md)

<a id="p-8-2-1"></a>

## 8.2.1 Feature-Sliced Design：协调业务模块与Nuxt目录

在副本新增reports业务域，只提取真正公共的契约，画出与catalog的依赖。

验收：

- [ ] Nuxt仍能发现pages，server实现没有进入浏览器模块。
- [ ] 没有为了共享两个字段导入catalog私有内部；说明是否需要完整FSD。

[理论](../../1-notes/08-architecture/8.2-app-architecture/8.2.1.feature-sliced-design-fsd.md) · [示例](../../2-examples/08-architecture/8.2-app-architecture/8.2.1.feature-sliced-design-fsd-demo.md) · [独立练习](../../3-exercises/08-architecture/8.2-app-architecture/8.2.1.feature-sliced-design-fsd.md)

<a id="p-8-2-2"></a>

## 8.2.2 分层与依赖反转：调用方向不等于导入方向

在副本替换一个内存adapter为可控失败adapter，保持应用核心不认识Nuxt/DOM。

验收：

- [ ] 核心可用无Nuxt环境测试，坏返回不能流入UI。
- [ ] 说明运行调用与源码导入两张图；具体adapter在外层组合。

[理论](../../1-notes/08-architecture/8.2-app-architecture/8.2.2.item-8-2-2.md) · [示例](../../2-examples/08-architecture/8.2-app-architecture/8.2.2.item-8-2-2-demo.md) · [独立练习](../../3-exercises/08-architecture/8.2-app-architecture/8.2.2.item-8-2-2.md)

<a id="p-8-2-3"></a>

## 8.2.3 容器与展示组件：按变化原因分职责

把一个课程卡独立展示，增加空标题回退与select事件，不读取全局路由或直接写父对象。

验收：

- [ ] 组件可用固定props展示并键盘触发意图，父层决定实际状态改变。
- [ ] 加载/空/错仍在容器有明确表达，不因拆组件消失。

[理论](../../1-notes/08-architecture/8.2-app-architecture/8.2.3.container-presentation.md) · [示例](../../2-examples/08-architecture/8.2-app-architecture/8.2.3.container-presentation-demo.md) · [独立练习](../../3-exercises/08-architecture/8.2-app-architecture/8.2.3.container-presentation.md)

<a id="p-8-2-4"></a>

## 8.2.4 模块化路由：URL归属与构建边界分别核对

为独立reports模块分配前缀，写出父子路由、未知URL与上线/下线策略。

验收：

- [ ] 直接GET与刷新能到同一模块；未知资源不会被HTML200吞掉。
- [ ] 解释一处feature与chunk不一致的真实产物，而非只看源码文件夹。

[理论](../../1-notes/08-architecture/8.2-app-architecture/8.2.4.item-8-2-4.md) · [示例](../../2-examples/08-architecture/8.2-app-architecture/8.2.4.item-8-2-4-demo.md) · [独立练习](../../3-exercises/08-architecture/8.2-app-architecture/8.2.4.item-8-2-4.md)

<a id="p-8-2-5"></a>

## 8.2.5 配置驱动UI：受限schema、解释器与安全边界

新增required布尔字段及最多三个控件的业务限制，先验证后渲染；为未知版本做可读错误。

验收：

- [ ] 类型、长度、未知属性和非法节点在DOM变化前拒绝。
- [ ] label关联正确，文本不变成HTML，错误不只靠颜色。

[理论](../../1-notes/08-architecture/8.2-app-architecture/8.2.5.ui.md) · [示例](../../2-examples/08-architecture/8.2-app-architecture/8.2.5.ui-demo.md) · [独立练习](../../3-exercises/08-architecture/8.2-app-architecture/8.2.5.ui.md)

<a id="p-8-2-6"></a>

## 8.2.6 插件扩展点：注册、版本、清理与权限

在副本添加可控失败插件，定义宿主回退与失败前资源释放，再测试卸载/重挂。

验收：

- [ ] 成功、未知、重复及失败注册有确定行为；宿主基础导航可用。
- [ ] dispose幂等且事件/资源无重复，不把插件隔离说成进程沙箱。

[理论](../../1-notes/08-architecture/8.2-app-architecture/8.2.6.item-8-2-6.md) · [示例](../../2-examples/08-architecture/8.2-app-architecture/8.2.6.item-8-2-6-demo.md) · [独立练习](../../3-exercises/08-architecture/8.2-app-architecture/8.2.6.item-8-2-6.md)

<a id="p-8-3-1"></a>

## 8.3.1 CSR、SSR、SSG、ISR与Streaming：按约束比较而非排名

为公开周更文档、每秒行情、带身份工作台各选候选模式，给同一工作台两种方案并说明何时推翻决定。

验收：

- [ ] 每个决定列内容新鲜度、身份、路由与托管约束，不以一个分数决定所有页面。
- [ ] 标明真实测量/历史证据/官方观察；Streaming与ISR未运行不记已通过。

[理论](../../1-notes/08-architecture/8.3-rendering/8.3.1.csr-ssr-ssg-isr-streaming.md) · [示例](../../2-examples/08-architecture/8.3-rendering/8.3.1.csr-ssr-ssg-isr-streaming-demo.md) · [独立练习](../../3-exercises/08-architecture/8.3-rendering/8.3.1.csr-ssr-ssg-isr-streaming.md)

<a id="p-8-3-2"></a>

## 8.3.2 React Server Components与Server Functions：可见输出与远程入口

给“只有管理员可改课程”画一次Server Action请求链，把身份/授权/输入验证放到服务端，并指出哪些返回字段将对浏览器公开。

验收：

- [ ] 授权必须在每次服务端写调用按资源检查，不能只在React组件分支检查。
- [ ] 区分RSC、SSR、Client Components及Server Functions，明确这是选修观察。

[理论](../../1-notes/08-architecture/8.3-rendering/8.3.2.react-server-components-rsc.md) · [示例](../../2-examples/08-architecture/8.3-rendering/8.3.2.react-server-components-rsc-demo.md) · [独立练习](../../3-exercises/08-architecture/8.3-rendering/8.3.2.react-server-components-rsc.md)

<a id="p-8-3-3"></a>

## 8.3.3 Islands、Partial与Selective Hydration：减少接管范围的不同机制

将公开介绍页设计成两个互不依赖交互区；再加入“结算需立即键盘使用”约束，修改触发与回退。

验收：

- [ ] 静态内容与真实链接不因JS未就绪消失，关键操作有明确就绪/失败路径。
- [ ] 记录跨岛通信成本，不将所有部件都延后以追分。

[理论](../../1-notes/08-architecture/8.3-rendering/8.3.3.partial-hydration-selective-hydration.md) · [示例](../../2-examples/08-architecture/8.3-rendering/8.3.3.partial-hydration-selective-hydration-demo.md) · [独立练习](../../3-exercises/08-architecture/8.3-rendering/8.3.3.partial-hydration-selective-hydration.md)

<a id="p-8-3-4"></a>

## 8.3.4 Hydration不匹配：先保证首次数据与DOM一致

在副本新增mounted后显示视口宽度、SSR先显示“未测量”；再故意把window读取放setup，记录服务器失败与修复；另外用随机初值比较payload保真。

验收：

- [ ] 初始HTML/客户端占位一致，浏览器API不在SSR顶层执行。
- [ ] 保留真实console/请求与修复后结果，区分首次接管与主动refresh请求。

[理论](../../1-notes/08-architecture/8.3-rendering/8.3.4.hydration.md) · [示例](../../2-examples/08-architecture/8.3-rendering/8.3.4.hydration-demo.md) · [独立练习](../../3-exercises/08-architecture/8.3-rendering/8.3.4.hydration.md)

<a id="p-8-3-5"></a>

## 8.3.5 同构代码：请求作用域、序列化与公开payload

在隔离副本加入模块级lastScope并让无输入请求复用它，先用合成数据暴露串用，再恢复每请求解析和明确默认/错误规则。

验收：

- [ ] 并发结果只来自当前scope，非法scope被拒；不存在“上个用户”回退。
- [ ] HTML/payload不含内部DTO字段；浏览器与server模块依赖保持单向。

[理论](../../1-notes/08-architecture/8.3-rendering/8.3.5.item-8-3-5.md) · [示例](../../2-examples/08-architecture/8.3-rendering/8.3.5.item-8-3-5-demo.md) · [独立练习](../../3-exercises/08-architecture/8.3-rendering/8.3.5.item-8-3-5.md)

<a id="p-8-3-6"></a>

## 8.3.6 Edge与Origin SSR：计算靠近不等于数据靠近

假设用户分布亚洲而数据库只在欧洲，比较边缘SSR、欧洲Origin、公共SSG+独立账户API；再加入数据驻留要求。

验收：

- [ ] 延迟分解覆盖回源数据/身份，不只写用户到边缘RTT。
- [ ] 声明具体平台运行时约束与尚未验证项，不将Node构建成功当Edge兼容。

[理论](../../1-notes/08-architecture/8.3-rendering/8.3.6.edge-ssr.md) · [示例](../../2-examples/08-architecture/8.3-rendering/8.3.6.edge-ssr-demo.md) · [独立练习](../../3-exercises/08-architecture/8.3-rendering/8.3.6.edge-ssr.md)

<a id="p-8-3-7"></a>

## 8.3.7 渲染决策树：从身份、时效和托管约束给出可推翻决定

为课程目录新增“公开周更、无Node运维预算”和“每用户即时余额”两组互相不同需求，分别沿决策树走到结论并给替代方案。

验收：

- [ ] 每条路径能回溯到明确需求与失败处理，至少两备选和后果。
- [ ] 写出验证与重新评估触发，不能把SSR/Edge/Islands当所有产品默认。

[理论](../../1-notes/08-architecture/8.3-rendering/8.3.7.item-8-3-7.md) · [示例](../../2-examples/08-architecture/8.3-rendering/8.3.7.item-8-3-7-demo.md) · [独立练习](../../3-exercises/08-architecture/8.3-rendering/8.3.7.item-8-3-7.md)

<a id="p-8-4-1"></a>

## 8.4.1 微前端动机：独立交付收益与协调成本

给三个团队不同发布节奏的场景比较模块化单体/微前端，并为当前单团队场景写不采用理由。

验收：

- [ ] 至少两个备选，解释部署自治和运行权限不是同一指标。
- [ ] 记录失败降级、共同URL/身份/质量责任，不只画盒子。

[理论](../../1-notes/08-architecture/8.4-micro-frontends/8.4.1.item-8-4-1.md) · [示例](../../2-examples/08-architecture/8.4-micro-frontends/8.4.1.item-8-4-1-demo.md) · [独立练习](../../3-exercises/08-architecture/8.4-micro-frontends/8.4.1.item-8-4-1.md)

<a id="p-8-4-2"></a>

## 8.4.2 微前端集成方式：构建组合与运行加载

为同框架推荐卡和不可信第三方小工具分别选集成方式，解释为什么不复用一个方案。

验收：

- [ ] 正确识别Federation运行时remote加载；普通dynamic import不叫联邦成功。
- [ ] 说明每方案代码信任、路由与失败代价，第三方不直接获得宿主DOM能力。

[理论](../../1-notes/08-architecture/8.4-micro-frontends/8.4.2.item-8-4-2.md) · [示例](../../2-examples/08-architecture/8.4-micro-frontends/8.4.2.item-8-4-2-demo.md) · [独立练习](../../3-exercises/08-architecture/8.4-micro-frontends/8.4.2.item-8-4-2.md)

<a id="p-8-4-3"></a>

## 8.4.3 Module Federation契约：remote、shared与版本

为旧宿主+新remote写兼容矩阵，增加远端不可达/版本不符/旧chunk丢失三种恢复方案。

验收：

- [ ] 版本和共享实例策略有具体理由，不用singleton:true代替兼容测试。
- [ ] 失败保留本地课程入口，回滚同时考虑remoteEntry与旧chunk。

[理论](../../1-notes/08-architecture/8.4-micro-frontends/8.4.3.module-federation.md) · [示例](../../2-examples/08-architecture/8.4-micro-frontends/8.4.3.module-federation-demo.md) · [独立练习](../../3-exercises/08-architecture/8.4-micro-frontends/8.4.3.module-federation.md)

<a id="p-8-4-4"></a>

## 8.4.4 样式隔离：作用域与继承边界

为另一个模块增加相同.badge与全局button reset，比较CSSModules/scoped/Shadow的可控范围，并定义一个主题token。

验收：

- [ ] 实际CSS结果与预测一致，说明哪些继承/主题通道仍存在。
- [ ] 键盘焦点、字体与对比度保持可用，不把视觉隔离当权限。

[理论](../../1-notes/08-architecture/8.4-micro-frontends/8.4.4.item-8-4-4.md) · [示例](../../2-examples/08-architecture/8.4-micro-frontends/8.4.4.item-8-4-4-demo.md) · [独立练习](../../3-exercises/08-architecture/8.4-micro-frontends/8.4.4.item-8-4-4.md)

<a id="p-8-4-5"></a>

## 8.4.5 路由协调：宿主地址所有权与子模块激活

新增/report/detail路径和返回操作，写下哪个模块拥有pushState、谁负责unknown和资源404。

验收：

- [ ] 导航、后退、刷新与直接访问结果一致；单次激活只注册一份监听。
- [ ] 未知模块与缺JS都有明确处理，不用200假装所有地址存在。

[理论](../../1-notes/08-architecture/8.4-micro-frontends/8.4.5.item-8-4-5.md) · [示例](../../2-examples/08-architecture/8.4-micro-frontends/8.4.5.item-8-4-5-demo.md) · [独立练习](../../3-exercises/08-architecture/8.4-micro-frontends/8.4.5.item-8-4-5.md)

<a id="p-8-4-6"></a>

## 8.4.6 跨模块通信：版本事件与来源校验

增加requestId和允许事件白名单；关闭模块时释放监听，写出敏感数据不进入协议的约束。

验收：

- [ ] 正确消息可达，错误source/origin/version/形状分别拒绝。
- [ ] 卸载不再消费，协议无token或用户完整DTO；不能用*发送敏感数据。

[理论](../../1-notes/08-architecture/8.4-micro-frontends/8.4.6.item-8-4-6.md) · [示例](../../2-examples/08-architecture/8.4-micro-frontends/8.4.6.item-8-4-6-demo.md) · [独立练习](../../3-exercises/08-architecture/8.4-micro-frontends/8.4.6.item-8-4-6.md)

<a id="p-8-4-7"></a>

## 8.4.7 不采用微前端：识别组织与运行反模式

当新增两个团队独立发布但共用身份/设计系统时，更新ADR，给引入阈值、回滚与退出策略。

验收：

- [ ] 比较至少两种方案，成本和收益能对应真实约束。
- [ ] 选择与产物一致；尚未部署remote/独立团队流程明确未验。

[理论](../../1-notes/08-architecture/8.4-micro-frontends/8.4.7.item-8-4-7.md) · [示例](../../2-examples/08-architecture/8.4-micro-frontends/8.4.7.item-8-4-7-demo.md) · [独立练习](../../3-exercises/08-architecture/8.4-micro-frontends/8.4.7.item-8-4-7.md)

<a id="p-8-5-1"></a>

## 8.5.1 BFF聚合与裁剪：服务端职责和失败预算

在lab副本把可选进度返回伪造0，先证明UI无法区分“未完成”和“未知”，再恢复null与警示；为必要依赖增加失败案例。

验收：

- [ ] 可选失败仍保留课程且明确degraded/unknown，不把失败掩盖成0。
- [ ] 必要失败非200，deadline/取消与恢复能由真实HTTP观察，不无界等待。

[理论](../../1-notes/08-architecture/8.5-bff/8.5.1.bff-backend-for-frontend.md) · [示例](../../2-examples/08-architecture/8.5-bff/8.5.1.bff-backend-for-frontend-demo.md) · [独立练习](../../3-exercises/08-architecture/8.5-bff/8.5.1.bff-backend-for-frontend.md)

<a id="p-8-5-2"></a>

## 8.5.2 BFF还是直连API：用网络与职责收益抵偿运维成本

给单后端两页面和三上游多端聚合各写BFF/直连两备选；在lab副本列允许业务参数并拒绝未知target字段。

验收：

- [ ] 方案有新增故障/运维成本与可验证收益，不以层数多当成熟。
- [ ] 任意URL/未知scope输入被拒且不会产生上游请求，授权责任仍在服务端。

[理论](../../1-notes/08-architecture/8.5-bff/8.5.2.bff-vs-api-bff.md) · [示例](../../2-examples/08-architecture/8.5-bff/8.5.2.bff-vs-api-bff-demo.md) · [独立练习](../../3-exercises/08-architecture/8.5-bff/8.5.2.bff-vs-api-bff.md)

<a id="p-8-5-3"></a>

## 8.5.3 GraphQL与REST BFF：契约、成本与权限不是二选一魔法

为课程+可选进度定义REST DTO和GraphQL query/partial response；说明权限、缓存key、N+1与查询预算。

验收：

- [ ] 两种协议均能表达进度未知与课程可用，不把GraphQL200误当全部成功。
- [ ] 明确数据加载作用域、权限和复杂度治理，不保证换协议自然变快。

[理论](../../1-notes/08-architecture/8.5-bff/8.5.3.graphql-bff.md) · [示例](../../2-examples/08-architecture/8.5-bff/8.5.3.graphql-bff-demo.md) · [独立练习](../../3-exercises/08-architecture/8.5-bff/8.5.3.graphql-bff.md)

<a id="p-8-5-4"></a>

## 8.5.4 API版本与废弃：并行兼容、Deprecation与Sunset

将v1字段title改为label制造旧客户端失败，再选择保留v1映射/v2并行或兼容字段迁移；写窗口和停止条件。

验收：

- [ ] v1消费者原字段/类型/语义保持，v2有明确契约和回滚。
- [ ] Deprecation是@秒结构日期，Sunset是可解析HTTP-date；公告不等于自动关服。

[理论](../../1-notes/08-architecture/8.5-bff/8.5.4.api.md) · [示例](../../2-examples/08-architecture/8.5-bff/8.5.4.api-demo.md) · [独立练习](../../3-exercises/08-architecture/8.5-bff/8.5.4.api.md)

<a id="p-8-5-5"></a>

## 8.5.5 DTO映射：运行校验、公开字段与时间/null契约

扩展副本DTO加入可空priceCents，严格区分null、0、缺失及字符串金额；写失败样本并防止内部字段进入响应。

验收：

- [ ] 成功公开DTO只含允许字段，错误结构进入明确失败路径，不用as断言伪装校验。
- [ ] 0/null/缺失语义、时间格式与失败样本明确，坏日期不被默默修成另一日。

[理论](../../1-notes/08-architecture/8.5-bff/8.5.5.dto.md) · [示例](../../2-examples/08-architecture/8.5-bff/8.5.5.dto-demo.md) · [独立练习](../../3-exercises/08-architecture/8.5-bff/8.5.5.dto.md)

<a id="p-8-5-6"></a>

## 8.5.6 BFF与移动Gateway/API Adapter：职责相似但信任位置不同

为PC表格与手机摘要复用同一课程后端设计共享契约；列一个值得拆BFF的真实差异与一个不拆的理由。

验收：

- [ ] 图中每个组件的运行位置与信任边界明确，客户端不含服务凭据。
- [ ] 不把UI独立等同业务/权限逻辑复制，明确fixture演示与真实认证差距。

[理论](../../1-notes/08-architecture/8.5-bff/8.5.6.bff-gateway-api-adapter.md) · [示例](../../2-examples/08-architecture/8.5-bff/8.5.6.bff-gateway-api-adapter-demo.md) · [独立练习](../../3-exercises/08-architecture/8.5-bff/8.5.6.bff-gateway-api-adapter.md)

<a id="p-8-6-1"></a>

## 8.6.1 状态归属：组件、URL、Nuxt共享状态与服务端数据

在副本为“刷新后筛选保留、未提交文字不进入分享URL、跨组件收藏同步”写一张状态归属清单并实现一处变体。

验收：

- [ ] URL只含可分享筛选，不含真实凭据或私有草稿。
- [ ] SSR/客户端首值一致，组件销毁与用户作用域变化不会沿用错误状态。

[理论](../../1-notes/08-architecture/8.6-state-data/8.6.1.vs.md) · [示例](../../2-examples/08-architecture/8.6-state-data/8.6.1.vs-demo.md) · [独立练习](../../3-exercises/08-architecture/8.6-state-data/8.6.1.vs.md)

<a id="p-8-6-2"></a>

## 8.6.2 查询Key、缓存层级与作用域失效

在隔离副本遗漏key中的scope，观察两个查询互相复用；恢复key并为切换scope时迟到结果加epoch/取消保护。

验收：

- [ ] 相同filter但不同scope结果不共用，key不包含令牌。
- [ ] 切换后旧响应不能回写新scope，说明HTTP/CDN/Nitro是否另有缓存。

[理论](../../1-notes/08-architecture/8.6-state-data/8.6.2.query-key.md) · [示例](../../2-examples/08-architecture/8.6-state-data/8.6.2.query-key-demo.md) · [独立练习](../../3-exercises/08-architecture/8.6-state-data/8.6.2.query-key.md)

<a id="p-8-6-3"></a>

## 8.6.3 乐观更新：版本冲突、确认值与安全回滚

给lab模型新增“服务端明确拒绝”和“发送后响应丢失”两种输入，解释何时可回滚、何时应按operation id核对结果；再测试scope切换。

验收：

- [ ] 旧失败不覆盖较新成功，换scope后旧结果无回写。
- [ ] 过期revision被实际拒绝；不对未知写结果直接重放非幂等业务。

[理论](../../1-notes/08-architecture/8.6-state-data/8.6.3.optimistic-update.md) · [示例](../../2-examples/08-architecture/8.6-state-data/8.6.3.optimistic-update-demo.md) · [独立练习](../../3-exercises/08-architecture/8.6-state-data/8.6.3.optimistic-update.md)

<a id="p-8-6-4"></a>

## 8.6.4 SWR体验：旧数据、后台刷新与失败可见性

把已有数据与首次读取均失败两种情景分别实现；加入一项过期标识与显式重试，不把错误藏在console。

验收：

- [ ] 已有数据失败保留但明确标记过期，首次失败不伪造数据。
- [ ] 成功后清旧错误并更新；说明哪些操作禁止基于过期权限执行。

[理论](../../1-notes/08-architecture/8.6-state-data/8.6.4.stale-while-revalidate.md) · [示例](../../2-examples/08-architecture/8.6-state-data/8.6.4.stale-while-revalidate-demo.md) · [独立练习](../../3-exercises/08-architecture/8.6-state-data/8.6.4.stale-while-revalidate.md)

<a id="p-8-6-5"></a>

## 8.6.5 Offline-first：IndexedDB、幂等队列与显式恢复

在副本保存两scope草稿并模拟断网、配额/事务abort和服务端409；把“待发送”与“已确认”分开，明确本地清理/退出策略。

验收：

- [ ] 事务失败不显示已保存，断网请求失败不丢队列。
- [ ] 跨scope草稿/队列分开；匹配ack才删除，幂等与冲突边界明确。

[理论](../../1-notes/08-architecture/8.6-state-data/8.6.5.offline-first.md) · [示例](../../2-examples/08-architecture/8.6-state-data/8.6.5.offline-first-demo.md) · [独立练习](../../3-exercises/08-architecture/8.6-state-data/8.6.5.offline-first.md)

<a id="p-8-6-6"></a>

## 8.6.6 Local-first与CRDT：协作收敛不等于业务正确

为课程协作笔记写两备选：单人草稿+提交、CRDT协作；给同时插入、删除后编辑和权限撤回三种情景定义预期与未解问题。

验收：

- [ ] 说明数据类型收敛条件与业务约束不同，不能承诺所有冲突自动正确。
- [ ] 明确更新传输/授权/存储及限制；未运行库保持观察型标记。

[理论](../../1-notes/08-architecture/8.6-state-data/8.6.6.local-first.md) · [示例](../../2-examples/08-architecture/8.6-state-data/8.6.6.local-first-demo.md) · [独立练习](../../3-exercises/08-architecture/8.6-state-data/8.6.6.local-first.md)

<a id="p-8-6-7"></a>

## 8.6.7 CQRS与事件溯源：读写分离、投影与运维代价

给普通课程收藏写CRUD与CQRS/事件溯源两个方案，明确为何当前不选复杂方案；若新增审计要求，列事件schema演进与投影落后时用户体验。

验收：

- [ ] 正确区分CQRS与事件溯源，投影延迟不冒充写失败。
- [ ] 列重放/幂等/版本/补偿/隐私成本，未知事件有明确处理而非静默吞掉。

[理论](../../1-notes/08-architecture/8.6-state-data/8.6.7.event-sourcing-cqrs.md) · [示例](../../2-examples/08-architecture/8.6-state-data/8.6.7.event-sourcing-cqrs-demo.md) · [独立练习](../../3-exercises/08-architecture/8.6-state-data/8.6.7.event-sourcing-cqrs.md)
