# 阶段4：Vue 3 + Nuxt编写与质量验收

日期：2026-11-24。依据[阶段编写与验收总则](../AUTHORING.md)版本1，覆盖阶段4全部59点。结论：**在声明的运行/观察范围内达到R01–R09标准**；资料交付和审查不等于学习者已掌握，也不保证未知错误为零。

## 先复核规划，再编写

原规划57点，经MWG和框架官方资料核对，新增4.3.1.8侦听异步副作用/竞态/清理、4.5.9页面标题/元信息；其余细节补入已有点。阶段4共59点，全图585点，原编号与学习勾选保留。[规划复核](./STAGE_4_PLAN_REVIEW.md)记录缺口、依据、调整及边界，不把具体数量说成官方课程标准。

| 分组 | 点数 | 内容与优先级 |
| --- | --- | --- |
| 4.1 共通概念 | 7 | 声明式、组件契约、响应式、路由、表单、key及移动经验迁移 |
| 4.2 React生态 | 26 | 跨生态选修；核心、Router、数据/状态工具与工程比较，不阻塞Vue/Nuxt |
| 4.3 Vue 3 | 13 | SFC、模板、响应式、生命周期、契约、注入、DOM引用、KeepAlive、watch、Router和Pinia |
| 4.4 样式与UI | 4 | Tailwind、令牌、图标与主题；按需穿插 |
| 4.5 Nuxt | 9 | 路由布局、渲染接管、数据、请求状态、配置、Nitro、复用、中间件/错误及元信息 |

四部分都有实际内容：59份理论、59份具体实验操作卡/明确观察清单、59份独立练习、[59项综合任务](../../learning/4-practice/04-frameworks/tasks.md)。代码共享Vue/React/Tailwind实验及[Nuxt学习资料库](../../learning/4-practice/04-frameworks/README.md)，不为每点重复新建工程。阶段入口先说明前置、产出与顺序：4.1 → SFC → Vue核心/副作用 → Router/Pinia → Nuxt，样式按需；React可跳过。

## R01–R09

| 规则 | 核对结果 |
| --- | --- |
| R01 范围完整 | 59唯一编号、四部分文件与稳定综合锚点齐全；[交付契约](../stages/stage-4.json)逐项对应地图。 |
| R02 层层递进 | 原生Web/TS为前置，SFC先读再用宏/模板；响应式、纯派生与异步副作用分开；不让React或生产认证成为Nuxt入门先修。 |
| R03 内容准确 | 先查MWG HTML/Forms/Accessibility等，再核对Vue/Nuxt/React及工具官方正文；固定实际版本，区分编译宏/运行时、作用域/单例、页面/接口、客户端守卫/授权。 |
| R04 示例有效 | 实际SFC/TS编译、Vue/React组件、框架构建、Chrome交互、Node SSR与SSG产物；观察型UI/Next条目明确未实装，不用模拟终端冒充运行。 |
| R05 练习具体 | 每点有独立变体、至少两条可核验标准、可复现故障与参考；如key串位、解构失响应、旧请求回写、错误事件类型、漏Outlet、静态部署误用API。 |
| R06 综合对应 | 逐条对照Nuxt源码，分清已有书单/临时笔记、Vue独立帮助区/KeepAlive/Pinia、React选修与副本扩展；主项目没有取消按钮、登录、数据库或生产部署。 |
| R07 前后一致 | 四部分与实际文件/协议/命令一致；SSR/CSR/SSG、props/事件、局部草稿/事实、同应用/每请求状态、私有/public配置均区分；界面原生标签和文本输出。 |
| R08 问题关闭 | 下述发现已修正复验，结构/链接/HTML资源/历史阶段门禁通过；记录真实验证与未测范围，不用构建成功代替全部行为证明。 |
| R09 状态清楚 | 索引、总图与进度同步为253/585（43.2%）、待编写332；下一阶段5深入API/认证；编写、质量与个人掌握保持独立。 |

逐点内容证据：[共通7点](./stage-4-common-points.json)、[React26点](./stage-4-react-points.json)、[Vue13点](./stage-4-vue-points.json)、[UI/Nuxt13点](./stage-4-nuxt-ui-points.json)。分组正文：[共通/集成审查](./stage-4-common-review.md)、[React](./stage-4-react-review.md)、[Vue](./stage-4-vue-review.md)、[UI/Nuxt](./stage-4-nuxt-ui-review.md)。各组逐点核对四部分后，主审复核共享工程、关键正文、跨章前置、任务事实及全库集成。

## 本轮真实验证

实际环境Node26.0.0、pnpm11.4.0；主工程Nuxt4.7.0、Vue3.5.46、TS6.0.3、vue-tsc3.3.14、Vite8.3.8、Nitro2.14.0。Vue独立实验Router5.5.1、Pinia4.1.0；React独立实验React19.3.1、Router8.5.2；Tailwind4.3.5。版本/兼容来自官方registry与实际锁文件，不泛称旧版本为最新。见[主版本记录](./stage-4-tool-versions.json)和各lab manifest/锁文件。

| 范围 | 实际结果 | 证据 |
| --- | --- | --- |
| Vue实验 | 冻结安装、vue-tsc、11项Vitest/VTU、3类SFC真实类型拒绝、Vite生产构建、scoped CSS/路由chunk检查；390/1440两视口2流程通过 | [Vue运行](./stage-4-vue-runtime.json) |
| React选修实验 | 冻结安装、tsc、24项组件/Router/状态/表单/Query测试、Vite构建、2项lazy/CSS Modules产物检查；Chrome390/1440两组流程通过 | [React运行](./stage-4-react-runtime.json) |
| 样式实验与Nuxt API契约 | Tailwind真实CLI构建、390/1440系统/覆盖主题及无JS回退3组通过；Nuxt useAsyncData/signal真实vue-tsc正例与数字signal反例TS2322 | [UI/Nuxt运行](./stage-4-nuxt-ui-runtime.json) |
| Nuxt主工程 | 冻结安装、Nuxt四类型上下文、ESLint零错误、Prettier、11项纯模型/组件测试与node-server生产构建通过 | [主工程运行](./stage-4-practice-runtime.json) |
| Nuxt浏览器/HTTP | 完整4流程通过（两流程×两视口）；新增完整404错误页clearError后，再做受影响两视口专项2项通过 | [同上](./stage-4-practice-runtime.json) |
| SSG | 独立generate静态构建退出0、10条生成路由含payload/API产物；4个已知HTML内容/title实查通过，public JS/HTML/JSON无私有标记；随后回建SSR | [同上](./stage-4-practice-runtime.json) |
| 全库 | 253/253四部分、162个HTML/612个本地引用零错误；39项既有脚本回归、阶段0–4验收门禁通过 | 检查脚本与阶段机器记录可复跑 |

主工程实际断言包括：SSR资料/description/public运行期覆盖；hydration无重复初始API请求或警告；稳定key保留笔记、书单输入/事件；详情params及title/description更新；q刷新保留而内存书单重建；503恢复、重复q400、坏POST400/合法saved:false；中间件302、直接404/错误页恢复；CSR原始响应无内容而浏览器有；4个并发SSR seed分别初始化；API不返回私有配置、两视口无溢出。SSR seed是公开教学标签，不是用户身份。

## 发现与修正

1. **原生search编译冲突**：当前编译器将search解析为同名setup函数组件，SSR调用导航导致首页302自循环。重命名为submitSearch并显式保留原生标签，真实SSR/浏览器复验通过；保留语义标签，不用删除可访问结构掩盖问题。
2. **SSR/SSG混淆**：初版把首页列入常态prerender，会影响任意query的每请求结果。默认build改为动态SSR；generate子进程才启用4个已知静态页面，关闭爬取。SSG不能提供任意动态query、POST校验或新请求初始化，文档与任务同步。
3. **测试定位与错误协议**：Nuxt导航播报器也有status，给表单状态明确名称；H3 statusMessage采用ASCII，中文放message，404错误页可恢复。没有用固定sleep隐藏问题。
4. **严格类型与工具配置**：模块meta可能undefined，先初始化；Vue类型负例用真实错误payload而非虚构方差错误；pnpm11专有配置在YAML，依赖脚本明确选择且冻结/构建实证，不改全局策略。
5. **生成产物审查**：Nuxt generate创建的dist符号链接不属于课程源码，已清理并按文件名忽略，防止目录规则漏掉符号链接。
6. **综合任务事实**：Vue帮助区、Pinia与KeepAlive属独立实验，Nuxt已有局部笔记；反转保留与卸载丢失分清，若要跨筛选保留需提升所有权。useAsyncData取消是类型契约与副本任务，不冒称已验证远端业务回滚。

## 验证边界与下一步

本轮是实际编译器、Node与后台Chrome，但手机使用模拟视口，**未做手机真机、多浏览器、屏幕阅读器或真实学习者试学**。未连接真实认证/持久化后端、发布包或部署生产；Next、Nuxt UI/Vant、Ant/MUI/shadcn等按明确观察清单比较，未声称全部安装验证。Vue取消实验是受控内存异步；Nuxt signal证明类型，未验证远端取消副作用。React未启用Compiler/Fast Refresh，未声明相关性能结论。

遵循[MWG HTML](https://developer.chrome.com/docs/modern-web-guidance/guides/html/html)、[Forms](https://developer.chrome.com/docs/modern-web-guidance/guides/forms/forms)、[Accessibility](https://developer.chrome.com/docs/modern-web-guidance/guides/accessibility/accessibility)组织语义/表单/状态；框架细节查各篇精确官方链接，包括[Nuxt数据获取](https://nuxt.com/docs/4.x/getting-started/data-fetching)、[状态](https://nuxt.com/docs/4.x/getting-started/state-management)、[元信息](https://nuxt.com/docs/4.x/getting-started/seo-meta)与[模块](https://nuxt.com/docs/4.x/guide/modules)。未把训练知识当作本轮查阅。

下一阶段5在此基础上深入HTTP API、登录与服务端授权；阶段6/7再深化质量与部署。独立web-common/桌面/手机宿主不在本轮修改。质量机器记录：[stage-4-acceptance.json](../stages/stage-4-acceptance.json)；来源变更后应复核受影响内容与证据再刷新指纹。
