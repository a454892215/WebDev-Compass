# 阶段15综合实践任务

先运行[主迁移项目](./README.md)，再选择适用分支。主项目已有只读旧MPA/Nuxt路由、适配/比较与回退；组织流程、复杂i18n组件与浏览器能力在独立lab或官方观察中，尚未全部接入主项目。每项任务同时完成配套独立练习的变体与下列集成目标，验收中的具体输入属于该变体。标注新增的任务由学习者在隔离副本实现；完成课程不自动勾地图。

<a id="p-15-1-1"></a>

## 15.1.1 技术选型：问题、Spike、PoC、RFC与ADR

为主Nuxt迁移写一页RFC，比较保留旧页、逐路由替换和全量重写；定义一个可在隔离副本验证的Spike及退出条件。

- [ ] 至少两个可行候选及约束/后果有证据，未验证项不标通过。
- [ ] Spike有具体问题、时间盒与停止/继续条件；ADR不抹掉被替代决定。

[理论](../../../learning/1-notes/15-project-delivery/15.1-tech-decisions/15.1.1.item-15-1-1.md) · [示例](../../../learning/2-examples/15-project-delivery/15.1-tech-decisions/15.1.1.item-15-1-1-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.1-tech-decisions/15.1.1.item-15-1-1.md)

<a id="p-15-1-2"></a>

## 15.1.2 自研、开源与SaaS：同范围成本和退出约束

为主项目拟采用的一个组件或服务写自研/开源/SaaS比较，统一范围，改变退出成本做敏感性分析，不执行采购。

- [ ] 说明数字假设、范围和单位，缺失成本不静默按0，至少一次敏感性变化。
- [ ] 至少列无障碍/SSR/供应链或数据/退出约束，并说明由谁核实；未采购不称已采纳。

[理论](../../../learning/1-notes/15-project-delivery/15.1-tech-decisions/15.1.2.build-vs-buy.md) · [示例](../../../learning/2-examples/15-project-delivery/15.1-tech-decisions/15.1.2.build-vs-buy-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.1-tech-decisions/15.1.2.build-vs-buy.md)

<a id="p-15-1-3"></a>

## 15.1.3 跨团队API契约：Mock先行、兼容窗口与联调

为主Nuxt目录记录一份请求/响应/错误契约，将一处字段改名作为隔离变体，验证旧消费者失败与适配恢复；真实接口联调列待验。

- [ ] 正例、空/错或类型漂移负例及兼容适配都有实际证据；Mock和真实服务分清。
- [ ] 契约同时覆盖权限/错误/版本窗口，改名不直接删除旧消费者仍需的字段。

[理论](../../../learning/1-notes/15-project-delivery/15.1-tech-decisions/15.1.3.api.md) · [示例](../../../learning/2-examples/15-project-delivery/15.1-tech-decisions/15.1.3.api-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.1-tech-decisions/15.1.3.api.md)

<a id="p-15-1-4"></a>

## 15.1.4 设计、产品、后端、QA与SRE：明确交付界面

给主迁移切片补交接表与未决项清单，列设计状态、API契约、回归、发布/回退负责人；只有实际存在的功能才能标现有。

- [ ] 每个必达交付物有明确负责人/确认方式，未决项有恢复条件。
- [ ] 关键错误/深链/无障碍和回退有具体入口；无生产环境的项明确待验。

[理论](../../../learning/1-notes/15-project-delivery/15.1-tech-decisions/15.1.4.qa-sre.md) · [示例](../../../learning/2-examples/15-project-delivery/15.1-tech-decisions/15.1.4.qa-sre-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.1-tech-decisions/15.1.4.qa-sre.md)

<a id="p-15-1-5"></a>

## 15.1.5 估算：依赖路径、区间与未知风险

为主迁移增加一个外部依赖和一个失败恢复任务，重新画DAG与区间，解释共享人员/环境如何改变可并行性。

- [ ] 模型区间与依赖计算可复核，人员/日历/外部等待等未建模假设明确。
- [ ] 已知风险有触发与重估条件，不把低高界称统计置信区间或承诺日期。

[理论](../../../learning/1-notes/15-project-delivery/15.1-tech-decisions/15.1.5.estimation.md) · [示例](../../../learning/2-examples/15-project-delivery/15.1-tech-decisions/15.1.5.estimation-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.1-tech-decisions/15.1.5.estimation.md)

<a id="p-15-2-1"></a>

## 15.2.1 代码评审：从用户行为到可复现缺陷

审查主Nuxt迁移项目实际输入、DTO、旧/新渲染及回退路径，提交至少一条有复现证据的意见；同时在review-lab副本完成标题边界变体。现有lab没有UI/SSR审计器，不把其true清单称主项目安全通过。

- [ ] 坏输入实际被拒绝，正常398与公开字段不变；测试包含缺失、错误类型及长度边界。
- [ ] 意见包含触发输入、用户影响和复验方法，区分函数测试与真实UI/SSR证据。

[理论](../../../learning/1-notes/15-project-delivery/15.2-code-review/15.2.1.review.md) · [示例](../../../learning/2-examples/15-project-delivery/15.2-code-review/15.2.1.review-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.2-code-review/15.2.1.review.md)

<a id="p-15-2-2"></a>

## 15.2.2 评审规模与LGTM：完整的小改动，不是行数竞赛

给主Nuxt迁移写一份评审切片：契约适配与特征测试、页面接入与相关测试、切流/回退验证。保留真实兼容依赖；把独立练习localize清单作为补充，不声称已经创建或批准线上PR。

- [ ] 每片包含相关测试和可理解上下文，契约变化/特征重构分别标清，不能先部署不兼容的一半。
- [ ] 缺localize或依赖逆序会被脚本拒绝；人的LGTM声明范围与未测，不用行数作为唯一依据。

[理论](../../../learning/1-notes/15-project-delivery/15.2-code-review/15.2.2.review.md) · [示例](../../../learning/2-examples/15-project-delivery/15.2-code-review/15.2.2.review-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.2-code-review/15.2.2.review.md)

<a id="p-15-2-3"></a>

## 15.2.3 技术债与Hotspot：历史线索、业务风险及偿还验证

对主Nuxt目录迁移写三条具体债务候选（例如适配器重复、全局CSS、回退证据缺失），先读实际代码避免虚构缺陷；另完成临时历史变体。候选可判无需处理，必须说明证据、风险和选择，不声称拥有真实生产变更史。

- [ ] 真实历史计数由输出复算，生成文件/重命名/样本窗口等偏差有说明，不把人工权重称静态复杂度实测。
- [ ] 偿还条目包含用户影响、范围、最小变更、回归及复查条件，不用候选榜评价个人。

[理论](../../../learning/1-notes/15-project-delivery/15.2-code-review/15.2.3.item-15-2-3.md) · [示例](../../../learning/2-examples/15-project-delivery/15.2-code-review/15.2.3.item-15-2-3-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.2-code-review/15.2.3.item-15-2-3.md)

<a id="p-15-2-4"></a>

## 15.2.4 渐进重构：先保行为，再做有界改进

在主Nuxt迁移副本中找一个真实重复或过宽函数，写收益评估，先加受影响路径特征测试再做有界提取；没有合理收益可选择不改并说明。纯函数lab的12组等价不冒充主项目已完成重构。

- [ ] 前后公开字段、值及错误行为在声明输入域内一致，故意改一字段的负例能失败。
- [ ] 说明提取实际收益和停止边界；输入契约改变另记行为变更，受影响UI/SSR按需补验。

[理论](../../../learning/1-notes/15-project-delivery/15.2-code-review/15.2.4.boy-scout-rule.md) · [示例](../../../learning/2-examples/15-project-delivery/15.2-code-review/15.2.4.boy-scout-rule-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.2-code-review/15.2.4.boy-scout-rule.md)

<a id="p-15-3-1"></a>

## 15.3.1 按用户切片拆任务：依赖、Owner与联调顺序

用主Nuxt迁移的真实目录与路由做一个最小可回退切片任务图，补一个环境共享限制，并指出哪些任务可独立推进。

- [ ] 任务产出、owner、前置与验收具体，环路/缺依赖有固定负例和恢复证据。
- [ ] 并行方案注明同文件/同环境串行边界，整体墙钟估算不把多人工时相加。

[理论](../../../learning/1-notes/15-project-delivery/15.3-team-collaboration/15.3.1.task-collaboration.md) · [示例](../../../learning/2-examples/15-project-delivery/15.3-team-collaboration/15.3.1.task-collaboration-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.3-team-collaboration/15.3.1.task-collaboration.md)

<a id="p-15-3-2"></a>

## 15.3.2 Pair与Mob：共同推理、角色轮换和适用边界

围绕主迁移的一处实际风险准备Pair/Mob演练：写共同目标、角色轮换、失败输入和结束解释；无同伴则完成并标注个人替代。

- [ ] 记录区分真实协作与个人替代，参与者均能解释风险/测试，未用AI冒充同伴。
- [ ] 目标与时间盒有退出条件，保存可复现失败与决定，保护参与者隐私。

[理论](../../../learning/1-notes/15-project-delivery/15.3-team-collaboration/15.3.2.pair-programming-mob.md) · [示例](../../../learning/2-examples/15-project-delivery/15.3-team-collaboration/15.3.2.pair-programming-mob-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.3-team-collaboration/15.3.2.pair-programming-mob.md)

<a id="p-15-3-3"></a>

## 15.3.3 知识分享：按任务组织Wiki、演示与维护责任

为主迁移做一份可复现故障短讲稿与一页Wiki入口，链接真实命令，指定文档owner及过期触发；试学保持未进行或如实记录。

- [ ] 运行入口、版本、预期和排错与实际文件一致，链接有效且不重复维护多份命令。
- [ ] 明确读者/范围、owner与过期触发，未试学不写新人验证通过。

[理论](../../../learning/1-notes/15-project-delivery/15.3-team-collaboration/15.3.3.item-15-3-3.md) · [示例](../../../learning/2-examples/15-project-delivery/15.3-team-collaboration/15.3.3.item-15-3-3-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.3-team-collaboration/15.3.3.item-15-3-3.md)

<a id="p-15-3-4"></a>

## 15.3.4 按交付证据分工：前端能力维度与复核边界

为主迁移挑三类风险任务，列必须的交付证据、需协助项和reviewer能力范围；仅用合成角色，不写个人等级。

- [ ] 分工依据指向具体实现/失败修复/解释，区分已证明、需协助和未知。
- [ ] 不从正文覆盖或AI评分推导职级，不伪造真实员工评价；高风险有适任复核。

[理论](../../../learning/1-notes/15-project-delivery/15.3-team-collaboration/15.3.4.skill-assessment.md) · [示例](../../../learning/2-examples/15-project-delivery/15.3-team-collaboration/15.3.4.skill-assessment-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.3-team-collaboration/15.3.4.skill-assessment.md)

<a id="p-15-3-5"></a>

## 15.3.5 新成员上手：从锁定环境到可回退小交付

为主迁移副本编写首个小改动上手清单：运行、复现一个故障、修复、专项测试、评审和回退；由未来使用者反馈修订。

- [ ] 从干净或明确已有环境运行到小交付的步骤可执行，权限和真实凭据不外泄。
- [ ] 清单有失败恢复/反馈owner，作者自测与真实新人试走区分，不承诺固定掌握时长。

[理论](../../../learning/1-notes/15-project-delivery/15.3-team-collaboration/15.3.5.onboarding-checklist.md) · [示例](../../../learning/2-examples/15-project-delivery/15.3-team-collaboration/15.3.5.onboarding-checklist-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.3-team-collaboration/15.3.5.onboarding-checklist.md)

<a id="p-15-4-1"></a>

## 15.4.1 Strangler Fig：建立接缝，逐个替换产品切片

在隔离副本新增一个库存只读切片，列新旧入口、适配契约和退回路径；保持旧目录可用，不新增真实写操作。

- [ ] 切片边界包含路由/数据/用户状态，旧入口、搜索参数与回退实际可用。
- [ ] DTO中金额单位明确，私有字段不外露，写数据和旧系统下线未验证范围明确。

[理论](../../../learning/1-notes/15-project-delivery/15.4-legacy-migration/15.4.1.strangler-fig.md) · [示例](../../../learning/2-examples/15-project-delivery/15.4-legacy-migration/15.4.1.strangler-fig-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.4-legacy-migration/15.4.1.strangler-fig.md)

<a id="p-15-4-2"></a>

## 15.4.2 旧 MPA / jQuery 到 Vue 3：DOM所有权与兼容窗口

写一个旧插件清理清单，并在隔离副本用有界原生事件订阅模拟挂载/卸载两轮，证明一次操作只触发一次；不额外安装全局jQuery。

- [ ] 新旧渲染器不争用同一DOM，挂载两轮后无重复事件。
- [ ] URL、过滤、深链和关键键盘行为有证据；本例未实际运行jQuery的边界写清。

[理论](../../../learning/1-notes/15-project-delivery/15.4-legacy-migration/15.4.2.jquery-mpa-react-vue.md) · [示例](../../../learning/2-examples/15-project-delivery/15.4-legacy-migration/15.4.2.jquery-mpa-react-vue-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.4-legacy-migration/15.4.2.jquery-mpa-react-vue.md)

<a id="p-15-4-3"></a>

## 15.4.3 只读双跑、稳定分组与可执行回退

给只读比较增加新增/删除商品差异，并把百分比边界改为25做0/24/25/99测试；给生产开关写负责人、到期和回退触发条件。

- [ ] 新增、缺失、内容变化均识别，差异记录只含允许的公开字段。
- [ ] 分流边界和退回旧入口实际通过，不双写、不将请求级fixture当生产开关或授权。

[理论](../../../learning/1-notes/15-project-delivery/15.4-legacy-migration/15.4.3.parallel-run.md) · [示例](../../../learning/2-examples/15-project-delivery/15.4-legacy-migration/15.4.3.parallel-run-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.4-legacy-migration/15.4.3.parallel-run.md)

<a id="p-15-4-4"></a>

## 15.4.4 遗留 CSS：命名范围、层叠与可达性

在隔离副本新增一个旧button全局背景故障，先用Computed定位，再收窄为旧范围；另写普通声明与!important的层叠判断说明。

- [ ] 计算样式证明两个按钮保持各自颜色，窄屏无溢出且焦点可见。
- [ ] 能解释scoped不阻止所有外部样式/继承，层叠上下文与z-index边界明确。

[理论](../../../learning/1-notes/15-project-delivery/15.4-legacy-migration/15.4.4.css.md) · [示例](../../../learning/2-examples/15-project-delivery/15.4-legacy-migration/15.4.4.css-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.4-legacy-migration/15.4.4.css.md)

<a id="p-15-4-5"></a>

## 15.4.5 Big Bang 与渐进迁移：按耦合和回退成本选择

为目录只读与订单写入各写两种候选，明确推荐改变的条件；把适配维护和旧系统清理计入成本。

- [ ] 至少两个可行方案按同一范围比较，关键假设与估算区间明确。
- [ ] 回退覆盖入口和数据兼容，结论可随约束变化而调整，未执行的评审/生产步骤标待验。

[理论](../../../learning/1-notes/15-project-delivery/15.4-legacy-migration/15.4.5.big-bang-vs-incremental.md) · [示例](../../../learning/2-examples/15-project-delivery/15.4-legacy-migration/15.4.5.big-bang-vs-incremental-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.4-legacy-migration/15.4.5.big-bang-vs-incremental.md)

<a id="p-15-4-6"></a>

## 15.4.6 AST Codemod：保留绑定、拒绝歧义并运行回归

在副本增加一个受控导入格式变体，并先写拒绝/正例测试；把命名空间导入列为人工处理，不擅自扩大工具范围。

- [ ] 直接与alias调用实际等价，第二次运行幂等，不改无匹配源码或普通字符串。
- [ ] 歧义输入明确拒绝，测试包含错误路径，说明未分析跨文件符号/未修改真实宿主项目。

[理论](../../../learning/1-notes/15-project-delivery/15.4-legacy-migration/15.4.6.codemod.md) · [示例](../../../learning/2-examples/15-project-delivery/15.4-legacy-migration/15.4.6.codemod-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.4-legacy-migration/15.4.6.codemod.md)

<a id="p-15-5-1"></a>

## 15.5.1 按模块加载消息、ICU复数与select

将本点用于主Nuxt迁移交付：先审查其已有实现，完成上述独立变体，再写清需要新增的接入与验收；不把独立lab冒称已集成主项目。具体任务：在副本新增checkout namespace和三个待翻译key，显式注册locale/namespace加载表；对并发请求去重、加载失败重试和缺key降级写测试，不用任意路径import。

- [ ] 0/1/2/多项按目标语言而非简单加s，select未知值有other。
- [ ] 新增namespace只按允许表加载，SSR请求语言不共享可变单例；失败与缺key有证据。

[理论](../../../learning/1-notes/15-project-delivery/15.5-i18n-a11y-prod/15.5.1.i18n.md) · [示例](../../../learning/2-examples/15-project-delivery/15.5-i18n-a11y-prod/15.5.1.i18n-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.5-i18n-a11y-prod/15.5.1.i18n.md)

<a id="p-15-5-2"></a>

## 15.5.2 RTL逻辑布局、图标方向与BiDi隔离

将本点用于主Nuxt迁移交付：先审查其已有实现，完成上述独立变体，再写清需要新增的接入与验收；不把独立lab冒称已集成主项目。具体任务：在副本加入邮箱、用户昵称和带正负号金额，分别为可信/未知方向内容选择隔离策略；给一个应镜像箭头和一个不镜像品牌图形写检查。

- [ ] LTR/RTL切换不改DOM阅读顺序，逻辑间距/边框方向正确，窄屏无内容丢失。
- [ ] 订单号/邮箱复制值不插人为控制字符，镜像只作用于有方向语义的图标。

[理论](../../../learning/1-notes/15-project-delivery/15.5-i18n-a11y-prod/15.5.2.rtl.md) · [示例](../../../learning/2-examples/15-project-delivery/15.5-i18n-a11y-prod/15.5.2.rtl-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.5-i18n-a11y-prod/15.5.2.rtl.md)

<a id="p-15-5-3"></a>

## 15.5.3 UTC瞬间、业务时区与夏令时

将本点用于主Nuxt迁移交付：先审查其已有实现，完成上述独立变体，再写清需要新增的接入与验收；不把独立lab冒称已集成主项目。具体任务：为订单创建时间、生日、纽约门店每周预约分别定义接口字段模型；增加跨日时区显示和秋季重复小时的消歧测试，并记录SSR/客户端一致策略。

- [ ] 明确瞬间/纯日期/当地预约三种契约，不把生日转UTC后造成日期偏移。
- [ ] 同一瞬间跨时区显示可复现，歧义输入有明确拒绝或消歧规则，不靠运行机器默认zone。

[理论](../../../learning/1-notes/15-project-delivery/15.5-i18n-a11y-prod/15.5.3.item-15-5-3.md) · [示例](../../../learning/2-examples/15-project-delivery/15.5-i18n-a11y-prod/15.5.3.item-15-5-3-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.5-i18n-a11y-prod/15.5.3.item-15-5-3.md)

<a id="p-15-5-4"></a>

## 15.5.4 WCAG2.2 AA评估范围与VPAT/ACR证据

将本点用于主Nuxt迁移交付：先审查其已有实现，完成上述独立变体，再写清需要新增的接入与验收；不把独立lab冒称已集成主项目。具体任务：为主迁移项目拟定一页有限范围评估清单，选三个适用准则记录方法/证据/发现；另写一条ACR式说明，明确未做真实读屏和用户试验，不填虚假的Supports。

- [ ] 范围含完整关键流程与状态，自动/人工证据分开，未验证项明确待验。
- [ ] 正确区分WCAG符合性、axe结果、VPAT模板与产品ACR，不声称认证或职级达成。

[理论](../../../learning/1-notes/15-project-delivery/15.5-i18n-a11y-prod/15.5.4.wcag-aa.md) · [示例](../../../learning/2-examples/15-project-delivery/15.5-i18n-a11y-prod/15.5.4.wcag-aa-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.5-i18n-a11y-prod/15.5.4.wcag-aa.md)

<a id="p-15-5-5"></a>

## 15.5.5 SPA路由的标题、焦点、通知与滚动

将本点用于主Nuxt迁移交付：先审查其已有实现，完成上述独立变体，再写清需要新增的接入与验收；不把独立lab冒称已集成主项目。具体任务：在隔离副本将滚动表改为每历史条目唯一key，测试同路径两个条目各自位置，并覆盖返回时异步内容高度改变；为失败导航指定标题/焦点回退。

- [ ] 新路由标题与主标题/aria-current一致，焦点落在有意义目标且局部刷新不抢焦点。
- [ ] 同路径不同历史条目恢复各自位置；明确等待布局、hash与失败策略，不在普通路由设置焦点陷阱。

[理论](../../../learning/1-notes/15-project-delivery/15.5-i18n-a11y-prod/15.5.5.spa.md) · [示例](../../../learning/2-examples/15-project-delivery/15.5-i18n-a11y-prod/15.5.5.spa-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.5-i18n-a11y-prod/15.5.5.spa.md)

<a id="p-15-5-6"></a>

## 15.5.6 Combobox、日期选择与原生模态框

将本点用于主Nuxt迁移交付：先审查其已有实现，完成上述独立变体，再写清需要新增的接入与验收；不把独立lab冒称已集成主项目。具体任务：在副本增加异步城市建议并用请求版本或取消处理晚到结果；另为日期选择器只编制键盘/读屏验收矩阵，未实装保持待验。为dialog触发点删除场景指定替代焦点。

- [ ] 建议项活动ID、展开/选中状态与DOM一致，键盘和指针可完成，晚到结果不能污染新输入。
- [ ] 原生dialog可关闭并恢复焦点；DatePicker观察与实际组件证据分开，不以ARIA声明等同生产可用。

[理论](../../../learning/1-notes/15-project-delivery/15.5-i18n-a11y-prod/15.5.6.combobox-datepicker-modal.md) · [示例](../../../learning/2-examples/15-project-delivery/15.5-i18n-a11y-prod/15.5.6.combobox-datepicker-modal-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.5-i18n-a11y-prod/15.5.6.combobox-datepicker-modal.md)

<a id="p-15-6-1"></a>

## 15.6.1 View Transitions：内容先可用，动画渐进增强

先完成独立练习的具体变体。为主Nuxt迁移项目评估可选接入；现有主路由不因本lab自动获得此功能。给独立lab新增一个列表→详情的公开卡片，使用唯一转场名并在返回后清理；保留减弱动画和无API回退。

- [ ] 原生/强制回退/减弱动画三路径都更新同一内容，焦点落点明确。
- [ ] 同一快照侧没有重复name；取消或跳过动画不丢失可操作内容。

[理论](../../../learning/1-notes/15-project-delivery/15.6-web-platform-advanced/15.6.1.view-transitions-api.md) · [示例](../../../learning/2-examples/15-project-delivery/15.6-web-platform-advanced/15.6.1.view-transitions-api-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.6-web-platform-advanced/15.6.1.view-transitions-api.md)

<a id="p-15-6-2"></a>

## 15.6.2 Navigation API：拦截边界、历史与框架路由所有权

先完成独立练习的具体变体。为主Nuxt迁移项目评估可选接入；现有主路由不因本lab自动获得此功能。在原生lab新增/nav/three并为直接深链、后退、未知路径、锚点及下载列测试；对主Nuxt只写路由owner评审，不另装全局拦截器。

- [ ] 同文档导航与普通链接回退均可到达新页面，标题/焦点与实际内容一致。
- [ ] 未知/跨源/表单/下载不被错误接管；说明主Nuxt已有路由owner和深链服务器责任。

[理论](../../../learning/1-notes/15-project-delivery/15.6-web-platform-advanced/15.6.2.navigation-api.md) · [示例](../../../learning/2-examples/15-project-delivery/15.6-web-platform-advanced/15.6.2.navigation-api-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.6-web-platform-advanced/15.6.2.navigation-api.md)

<a id="p-15-6-3"></a>

## 15.6.3 OPFS：源私有草稿、配额和可恢复边界

先完成独立练习的具体变体。为主Nuxt迁移项目评估可选接入；现有主路由不因本lab自动获得此功能。新增可导出的版本化草稿格式，测试未知版本拒绝、正文读取失败和存储不可用回退；只清理由本练习创建的唯一文件。

- [ ] close后才显示保存成功，读回正文与版本一致；失败有明确状态和导出恢复。
- [ ] 不清空整个源；区分配额/站点清理/权限/备份，未测的跨会话持久性不声称通过。

[理论](../../../learning/1-notes/15-project-delivery/15.6-web-platform-advanced/15.6.3.opfs-origin-private-file-system.md) · [示例](../../../learning/2-examples/15-project-delivery/15.6-web-platform-advanced/15.6.3.opfs-origin-private-file-system-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.6-web-platform-advanced/15.6.3.opfs-origin-private-file-system.md)

<a id="p-15-6-4"></a>

## 15.6.4 WebRTC：信令、ICE、数据通道与媒体权限边界

先完成独立练习的具体变体。为主Nuxt迁移项目评估可选接入；现有主路由不因本lab自动获得此功能。把本地通道扩展为有最大消息长度和缓冲阈值的发送器，模拟超时/断开并清理；另写音视频接入的授权、拒绝、停止轨道与TURN验证清单。

- [ ] 只在open发送，超时与失败释放peer/channel/timer，未知消息长度被拒绝。
- [ ] 明确本地数据通道与真实音视频/远端连通的证据区别，不记录完整SDP/候选。

[理论](../../../learning/1-notes/15-project-delivery/15.6-web-platform-advanced/15.6.4.webrtc.md) · [示例](../../../learning/2-examples/15-project-delivery/15.6-web-platform-advanced/15.6.4.webrtc-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.6-web-platform-advanced/15.6.4.webrtc.md)

<a id="p-15-6-5"></a>

## 15.6.5 WebAuthn仪式、服务端验证与Payment Request边界

在隔离副本建立服务端验证责任表：challenge生成/存储/消费、RP/origin、UV、凭证归属、验签、业务会话。增加一个过期或已消费challenge的状态模型；Payment写取消与后端待确认的订单状态图，不接真实支付。

- [ ] 责任表明确前端与服务端，重放/过期挑战拒绝，模型不能冒称密码学验证。
- [ ] 支付状态区分取消、授权结果和服务端确认；没有真实商户证据就不写支付成功。

[理论](../../../learning/1-notes/15-project-delivery/15.6-web-platform-advanced/15.6.5.webauthn-payment-request-api.md) · [示例](../../../learning/2-examples/15-project-delivery/15.6-web-platform-advanced/15.6.5.webauthn-payment-request-api-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.6-web-platform-advanced/15.6.5.webauthn-payment-request-api.md)

<a id="p-15-6-6"></a>

## 15.6.6 Import Maps、原生ESM与CDN信任边界

在隔离副本新增formatter裸名映射，返回有单位的展示文本；再画出如果替换成版本固定CDN时的CORS、CSP、完整性、缓存和失败责任表。主Nuxt不因此改用Import Map。

- [ ] 实际裸名导入成功，缺失目标能通过请求状态定位；不把映射称npm安装或TS转译。
- [ ] 回退不加载无法解析的模块；CDN计划固定版本并分别核CORS/CSP/完整性，不将本地结果称跨源实测。

[理论](../../../learning/1-notes/15-project-delivery/15.6-web-platform-advanced/15.6.6.import-maps.md) · [示例](../../../learning/2-examples/15-project-delivery/15.6-web-platform-advanced/15.6.6.import-maps-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.6-web-platform-advanced/15.6.6.import-maps.md)

<a id="p-15-6-7"></a>

## 15.6.7 Wasm的JS边界、SIMD、内存增长与线程条件

在隔离副本增加有界数组求和的JS/Wasm边界设计及小输入一致性测试，记录批量与逐元素调用的测量条件。另删Worker的COEP响应头复现隔离通道错误，再恢复；不要动主宿主的全局安全策略。

- [ ] 标量/变体结果与独立JS参考一致，内存上限和grow后新视图有断言，不宣称通用加速倍数。
- [ ] 区分SIMD、共享Memory+JS Atomics与真正Wasm线程；失败可退标量/JS，Worker按期退出。

[理论](../../../learning/1-notes/15-project-delivery/15.6-web-platform-advanced/15.6.7.webassembly.md) · [示例](../../../learning/2-examples/15-project-delivery/15.6-web-platform-advanced/15.6.7.webassembly-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.6-web-platform-advanced/15.6.7.webassembly.md)

<a id="p-15-6-8"></a>

## 15.6.8 WebGL场景、Three.js职责与GPU资源生命周期

在隔离副本为主Nuxt目录设计可选的3D预览入口，先保留普通详情内容。扩展lab加入ResizeObserver、受控DPR及卸载清理；如选Three.js，再建立真实scene/camera/geometry并按所有权dispose，不说主已有Three预览。

- [ ] 实际渲染结果与背景区分，尺寸/DPR改变不越预算；无GPU仍能读取业务内容。
- [ ] 创建与释放责任清楚，移除DOM不等于dispose；不把SwiftShader像素测试称硬件/Three性能验收。

[理论](../../../learning/1-notes/15-project-delivery/15.6-web-platform-advanced/15.6.8.webgl-three.js.md) · [示例](../../../learning/2-examples/15-project-delivery/15.6-web-platform-advanced/15.6.8.webgl-three.js-demo.md) · [练习](../../../learning/3-exercises/15-project-delivery/15.6-web-platform-advanced/15.6.8.webgl-three.js.md)
