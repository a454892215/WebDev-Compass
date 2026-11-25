# 阶段12.3逐点审查

2026-11-25。七点理论/操作卡/独立练习/综合任务逐点交叉审查，未改主lib/父索引/检查器或旧阶段，不以文件存在或工具名认定达标。

- 12.3.1：primitive/semantic/component职责、五类视觉token、alias/单位/公开契约清楚。源是SD原生legacy type/value，生成CSS/JS/.d.ts，真实TS正负消费与别名负例通过；类型不保证对比度。全套DTCG格式认证未做。
- 12.3.2：设计导出/转换/生成/发布分开。真实StyleDictionary5.8解析alias并输出不同平台表示，手改产物会被覆盖。Figma/TokensStudio插件/远程同步未运行，复合类型/transforms须另核；没有假称只改字段名即可兼容最新DTCG。
- 12.3.3：真实Storybook10.6.9与vue3-vite构建，直接共享主UiButton源；Primary/Disabled真实play、主题computed结果与两视口iframe运行通过。源码展示不代替dist消费者/SSR。配置和环境变量都关遥测，包括配置前boot。截图仅本地artifacts，未作SaaS或已审批金图。
- 12.3.4：实读共享UiButton/UiField源码，单根button透传、type默认/disabled与slot名称事实一致；继承属性、多根/emits与link/button差异明确。新增loading是独立需求，不假称已实现。div反例针对真实原生契约。
- 12.3.5：SemVer按公开契约不只prop，主Changesets工程另由root记录。本组真实有限配置值迁移/分类单测，未称ASTcodemod或发布。未知值保留、幂等/人工审查和CSS破坏性变化列入练习。
- 12.3.6：真实scope主题/品牌覆盖只改变局部按钮语义色，两视口computed颜色通过；主SSR主题来源按实际root源码可见route参数，而非声称localStorage自动同步。teleport/强制颜色/系统偏好列边界或新增。
- 12.3.7：Vue defineCustomElement CSR原生宿主、open shadow、DOM CustomEvent detail[0]、attribute→prop响应均真测；按MWG补delegatesFocus并在两视口检验shadow activeElement。未声称跨框架SDK/SSR/表单关联自动完成，不重造button语义。

## 来源、递进与修正

先读MWG accessibility/html/WebComponents/accessible-WebComponents正文，按原生语义、作用域和焦点边界决定；再读Storybook VueVite/play/Telemetry、Style Dictionary token/formats/transforms、Tokens Studio类型、Vue attrs/slots/SSR/custom elements、SemVer及DTCG当前文档。官方npm版本/peer范围实核，Node26满足SD>=22，Storybook10.6兼容Vite8。

先token定义→真实生成→故事状态/play→API/版本→主题，WebComponents选修；七点练习各自变体/至少两标准/明确故障参考。综合任务区分主已有组件/独立实验/新增接入，所有远程与跨框架/SSR能力不凭名称推导。

首构建共享.vue被按JS解析，查配置后加本lab显式ViteVue插件，重建通过；没有改主SFC或降级为伪故事。后核MWG与Vue实际源码，为CustomElement补焦点委派并真实复验。产物生成/类型、3Node、Storybookbuild、两视口play/主题/原生宿主均通过；最后package追加typecheck脚本不改浏览器代码，类型检查实际通过，不冒称再次跑全部浏览器。

## 真实验证与边界

冻结离线安装通过；真实SD生成/3Node（包含未解析引用拒绝）/TS生成声明正负消费/Storybook生产构建/390与1440后台Chrome通过。每视口3个play、主题computed rgb(233,182,255)、customElement属性/事件/焦点、无pageerror/横溢出/外站浏览器请求。服务和Chrome在finally关闭，4544无监听。未改变系统鼠标/浏览器安全设置，没有真实设计账户或凭据。

R01七编号四部分任务数据齐；R02递进与前置明确；R03官方现行API和范围；R04真实工具与观察分开；R05具体练习/故障；R06主/独立/扩展对应；R07契约一致；R08发现已修/影响复验；R09本组状态明确。全阶段manifest/父索引/主tasks和总体验收由root整合；本组passed不代表真实平台同步、全浏览器/读屏、人类试学或学习者掌握。

## 生成目录与来源指纹修正复验

主整合发现storybook-static/generated虽然被Git忽略，但不在已有学习/验收检查器排除集合，可能被当正文资源扫描或使干净克隆缺少生成文件而指纹不一致。按最小范围改为dist/storybook与dist/tokens，现有dist排除即可覆盖，不增加通用检查器规则。

同步package的Storybook输出参数、token生成默认目录、preview CSS入口、真实TS消费路径、Node测试、静态服务器与正文/任务证据。删除仅本组可再生旧输出，源码/截图/已审基线未删。首次克隆运行顺序tokens→types/test，build自身先生成tokens。

目录修正后实际重跑tokens、类型正负消费、3Node、Storybook生产构建、390/1440真实play/主题/CustomElement属性/事件/焦点全部通过；仍外站浏览器请求0，4544服务关闭。更新runtime记录，不把之前路径运行结果冒充新路径验证。
