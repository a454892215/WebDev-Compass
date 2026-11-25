# 当前内容进度与下一步

更新日期：2026-11-25。统计对象是已编写的知识正文，地图勾选仍代表学习者进度；内容覆盖率不等于教材质量或个人能力达成率。

## 当前覆盖与目录

Vue 3 + Nuxt 为主线，React/Next 为选修。共 590 项，正文 527 项，待编写 63 项，覆盖约 89.3%；阶段 1 的106项、阶段 2 的33项、阶段3的36项、阶段4的59项、阶段5的31项、阶段6的43项、阶段7的29项、阶段8的39项、阶段9的30项、阶段10的29项、阶段11的21项、阶段12的24项及阶段13的28项已提供四部分资料。所有资料统一迁移至 [learning/](../learning/README.md)，工程搭建专题保留在 framework-guide。

四部分结构检查 527/527 通过。阶段 0、1 已按总则执行逐点复核、修正及必要运行验证，阶段0、1质量结论见[验收记录](./audits/STAGE_0_1_ACCEPTANCE.md)；阶段13见[最新验收](./audits/STAGE_13_ACCEPTANCE.md)，阶段12见[验收记录](./audits/STAGE_12_ACCEPTANCE.md)，阶段11见[验收记录](./audits/STAGE_11_ACCEPTANCE.md)，阶段10见[验收记录](./audits/STAGE_10_ACCEPTANCE.md)，阶段9见[验收记录](./audits/STAGE_9_ACCEPTANCE.md)，阶段8见[验收记录](./audits/STAGE_8_ACCEPTANCE.md)，阶段7见[验收记录](./audits/STAGE_7_ACCEPTANCE.md)，阶段6见[验收记录](./audits/STAGE_6_ACCEPTANCE.md)，阶段5见[验收记录](./audits/STAGE_5_ACCEPTANCE.md)，阶段4见[验收记录](./audits/STAGE_4_ACCEPTANCE.md)，阶段3见[验收记录](./audits/STAGE_3_ACCEPTANCE.md)，阶段2见[验收记录](./audits/STAGE_2_ACCEPTANCE.md)。阶段 1 交互和构建验证见[本轮记录](./STAGE_1_VERIFICATION.md)。运行 `python3 scripts/check_knowledge.py --table` 查看实时完成度。

以下为早期 HTML 增量的历史记录，不能用旧分母替代当前统计。

## HTML 正文建设前的历史状态

知识地图覆盖阶段 0–15，共 565 个知识点，分为六册。阶段 0 的 19 篇正文已存在，其中 0.1 有 5 篇、0.2 有 5 篇、0.3 有 9 篇；有 15 个配套示例入口，包括 HTML、Node 小工程和观察清单。正文覆盖为 19/565，约 3.4%。

现有基础内容包含原理、移动开发对照和实践，具备学习价值。但旧内容并未全部经过本轮技术复审，存在断链和版本说明过时的问题，不能只因目录标注完成就称全量验收通过。

框架专题已形成六篇规划正文，并在其他仓库建立 Nuxt 基座和两端模板。原指南仍称“未来创建”，需按[交接状态](../framework-guide/07-implementation-status.md)阅读实际能力，完整 W0–W7 验收仍有未完成项。

## HTML 正文建设记录

- 补齐 1.1 HTML：文档结构与语义 8 篇、表单 5 篇、HTML 进阶 6 篇，共 19 篇及对应离线示例。
- 修复知识地图相对路径和旧正文、示例 README 的真实断链；未来未编写的正文仍明确作为预留，不造空文件。
- 建立自动覆盖统计、链接/锚点检查器及解析边界回归。
- 修正 Corepack 随 Node 分发范围的过时说明，更新根入口与框架实施交接状态。

正文完成后覆盖为 38/565，约 6.7%。当时阶段 1 共 96 项，本轮 HTML 覆盖其中 19 项；CSS、JavaScript 仍待编写。具体执行结果与边界以[本轮验证记录](./verification-2026-11-24.md)为准。

## 各模块状态

| 模块                    | 内容状态                   | 质量与验证范围                                           |
| ----------------------- | -------------------------- | -------------------------------------------------------- |
| 知识地图                | 六册、590 项已规划         | 本地导航与预留路径机械检查，不代表正文存在               |
| 0.1 Web 应用            | 5 篇及实践入口已有         | 逐篇复审，HTTP/CORS与导航专项通过                           |
| 0.2 开发环境            | 5 篇及实践入口已有         | 逐篇复审，Node/npm与临时Git运行；编辑器UI未实测       |
| 0.3 网络基础            | 9 篇、8 个示例入口已有     | 逐篇复审，REST/WS专项通过；公网清单未实测         |
| 1.1 HTML                | 19 篇及 19 个示例          | 本轮按具体交互与宽窄视口验收，详见验证记录               |
| 1.2 CSS、1.3 JavaScript、1.4 基础质量 | 41 + 42 + 4 项四部分资料 | 本轮浏览器交互、真实 CSS 构建及结构检查通过；见最新记录 |
| 阶段 2 | 33项理论/示例/练习/综合任务 | 66项页面/视口、缓存/SW/存储/API专项与综合项目验证；见阶段2记录 |
| 阶段 3 | 36项理论/真实工具实验/练习/综合任务 | tsc正反例、pnpm/Vite/HMR、质量工具与组件/浏览器测试，见阶段3验收 |
| 阶段 4 | 59项理论/实验/练习/综合任务（React26项选修） | Vue/React真实构建与组件、Nuxt SSR/CSR/SSG、请求隔离和两视口流程，见阶段4记录 |
| 阶段 5 | 31项理论/实验/练习/综合任务 | 真实HTTP/会话/CSRF/授权/SSR隔离、JWT与跨源/实时协议，见阶段5验收 |
| 阶段 6 | 43项四部分资料与Nuxt三语目录 | 真实lab与SSR、键盘、axe验证 |
| 阶段 7 | 29项四部分资料与三种Nuxt产物 | SSR/SSG/CSR、Nginx、回滚与选修原生实验 |
| 阶段 8 | 39项四部分资料与模块化工作台 | 边界图/SSR/DTO、跨源隔离、HTTP超时、IndexedDB与离线队列 |
| 阶段 9 | 30项四部分资料与Nuxt性能实践 | web-vitals、字节预算、加载、CDP heap/Worker、SSR与按需水合 |
| 阶段 10 | 29项四部分资料与Nuxt匿名安全笔记 | CSP/TT、CSRF/对象授权、JWT/刷新、供应链与隐私隔离实验 |
| 阶段 11 | 21项四部分资料与Nuxt可观测工作台 | 真实Sentry/OTel、本地灰度/回退、Nginx缓存限流与错误恢复 |
| 阶段 12 | 24项四部分资料与Vue组件包/Nuxt宿主 | 真实Storybook/SD、tgz/types/CSS、SSR/交互与策略/专项正反例 |
| 阶段 13 | 28项四部分资料与Nuxt/Vite多包workspace | 真实Turbo缓存、版本/锁、插件/双格式、兼容回退与AST/generator |
| 阶段 14–15 | 仅知识点清单 | 待按学习顺序逐节完成 |
| 框架实践专题            | 六篇规划正文及一篇交接记录 | 规划已形成、初始骨架已交付；高级门禁和发布复用待专项验收 |

## 可续跑待办

- [x] G01 审计已有覆盖，区分正文、学习进度和验证范围。
- [x] G02 修复导航并建立可重复检查。
- [x] G03 编写 1.1 HTML 全部 19 个知识点与示例。
- [x] G04 核对新增示例行为、宽窄视口和脚本回归，记录结果。
- [x] G05 编写 1.2 CSS：先选择器/层叠/盒模型，再 Flex/Grid 与响应式；每个知识点提供可观察实验。
- [x] G06 编写 1.3 JavaScript，并明确 DOM、事件和异步练习的前置知识。
- [x] G07 专项复审阶段 0 的 CORS、Cookie/SameSite、SPA/SSR 与工具版本陈述，运行相关教学服务。
- [ ] G08 按阶段 14–15 逐章扩展，避免一次性生成大量缺少验证的正文。

本轮收尾要求：新增内容与索引匹配、真实断链为零、计划项与已验证项分开、受影响回归通过、差异审查及本地提交完成。框架代码和高级能力的后续工作留在各自项目，不在本仓库执行。

本轮补充：基础质量 4 项、106 项独立练习和综合任务已提供；四部分目录迁移与门禁已实施。下一正文阶段为阶段 14：Node.js、Nuxt Nitro与BFF接口开发，G07 的逐篇复审和本地服务验证已完成；公网 DNS/TLS/CDN、真机与多浏览器仍按学习任务需要另行执行。

## 阶段编写与质量验收总则

现行总则为[AUTHORING.md](./AUTHORING.md)版本1。新增HTML资源检查、阶段R01–R09验收记录、125项逐点审查及来源指纹门禁；文件存在统计已随阶段5更新为284/587，质量结果单独记录。阶段0、1的发现、修正与实测/复用边界以[本轮验收](./audits/STAGE_0_1_ACCEPTANCE.md)为准。

## 阶段 2 本轮交付

33点四部分及阅读队列/草稿项目完成，逐点审查与运行边界见[阶段2验收](./audits/STAGE_2_ACCEPTANCE.md)。核心路线为事件循环与清理→渲染/缓存→存储→History与Observer/Worker；权限类API按需阅读，QA模拟与真实系统能力分开。其后阶段3现已完成TypeScript、Vite、代码检查与测试。

## 阶段 3 本轮交付

36点四部分及Vite+TS阅读任务板完成，正文覆盖194/583。先包管理和TS基础，再构建、质量与测试；Vue契约/组件测试只作最小桥接。真实验证包含锁文件与workspace、HMR状态保持、代码分割与map、27项TS检查、临时Git hooks与发布清单负例、组件测试和Chrome桌面/手机模拟视口，具体数量与限制见[阶段3验收](./audits/STAGE_3_ACCEPTANCE.md)。

pnpm11专有配置采用pnpm-workspace.yaml并实查生效；TypeScript6.0.3匹配当前typescript-eslint支持范围。新增.pnpm-store缓存排除及两条回归，避免生成依赖内容混入课程统计/验收指纹。未做真机、生产部署、多浏览器或真实学习者试学。阶段4、5现已完成，下一步阶段6：质量专项。

## 阶段4本轮交付

开始前以MWG和Vue/Nuxt官方资料复核，新增watch异步清理、Nuxt页面元信息2点（[规划记录](./audits/STAGE_4_PLAN_REVIEW.md)），阶段4共59点，总图585。四部分齐全，主线33点/React选修26点；真实Nuxt资料库、Vue/React/Tailwind独立实验与操作观察边界清楚。

具体结果见[阶段4验收](./audits/STAGE_4_ACCEPTANCE.md)：真实类型/组件/构建，SSR payload接管、URL/参数、稳定key、400/404/503及恢复、配置公私边界、请求隔离、静态生成与两视口。Next/UI多库比较明确未实装，不冒称取消业务回滚或真机/生产后端/部署通过。修正search编译冲突、默认SSR预渲染混淆和综合任务事实；阶段5现已完成API、登录与授权，下一阶段6继续质量专项。

## 阶段5本轮交付

先复核规划补5.1.7安全重试/幂等和5.2.9 SSR会话/私有缓存，阶段5共31点、全图587。四部分齐备；Nuxt私人笔记与独立HTTP/data、JWT、CORS/WS/SSE/Socket.IO实验有真实运行，OAuth/SSO/GraphQL/grpc-web按明确观察类型。

[规划记录](./audits/STAGE_5_PLAN_REVIEW.md)和[阶段5验收](./audits/STAGE_5_ACCEPTANCE.md)说明来源、顺序、真实结果及未测范围。公开fixture账号、内存store、本地HTTP Cookie与教学过期接口不称生产身份系统；认证/授权/CSRF、SSR Cookie转发/缓存隔离、上传限额/DTO、重试和实时生命周期分别有边界。下一步阶段6：性能、安全、无障碍与SEO。

## 阶段6本轮交付

规划补6.3.8重排、目标尺寸与用户偏好，共43点，全图588点；累计正文327/588，55.6%。[规划复核](./audits/STAGE_6_PLAN_REVIEW.md)、[验收](./audits/STAGE_6_ACCEPTANCE.md)分别记录依据、结果与未测范围。四部分完整，下一阶段7。旧段落是各阶段当时记录，实时统计以脚本为准。

## 阶段7本轮交付

规划补7.1.8最小监测、7.1.9发布回滚，共29点，全图590点；正文356/590，60.3%。[规划复核](./audits/STAGE_7_PLAN_REVIEW.md)与[验收](./audits/STAGE_7_ACCEPTANCE.md)记录三种Nuxt真实构建/HTTP/浏览器、Nginx/回滚、选修原生实验及未测范围。远程CI、云平台、Docker运行未冒称通过；主线0–7资料齐全不等于学习者已掌握。下一阶段8，旧段落保留各阶段当时口径。

## 阶段8本轮交付

保留39点，修正Module Federation集成分类、源码依赖箭头和移动类比；全图仍590点，正文395/590（66.9%）。[规划](./audits/STAGE_8_PLAN_REVIEW.md)和[验收](./audits/STAGE_8_ACCEPTANCE.md)记录模块化工作台、依赖门禁、SSR/DTO、隔离/BFF/状态独立lab。真实身份、生产容量/部署、未安装的RSC/Edge/CRDT等未冒称完成。下一阶段9，旧段落保留历史口径。

## 阶段9本轮交付

保留30点，全图590点，正文425/590（72.0%）。[规划](./audits/STAGE_9_PLAN_REVIEW.md)与[验收](./audits/STAGE_9_ACCEPTANCE.md)记录真实web-vitals归因/最小collector、产物预算、字体图片缓存/103、CDP heap与Nuxt SSR/水合。原始lab不是RUM/p75，nextTick不是INP，HTTP分段不是Nuxt组件StreamingSSR；本轮未跑LH/LHCI/远程CI/生产Edge。下一阶段10，旧段落保留历史口径。

## 阶段10本轮交付

保留29点，正文454/590（76.9%），待编写136点。[规划复核](./audits/STAGE_10_PLAN_REVIEW.md)与[验收](./audits/STAGE_10_ACCEPTANCE.md)记录四部分、威胁模型和安全Review。主Nuxt5项单元与5项E2E、独立漏洞/认证/隐私lab均有实际证据。匿名会话不是真实身份；固定parser探针与Nuxt模块nonce后处理风险分别说明，TTL物理删除是惰性清理。真实IdP/Passkey、生产部署、法律认证未冒称通过。下一阶段11，学习勾选不变。

## 阶段11本轮交付

保留21点，全图仍590点，正文475/590（80.5%），待115。[规划](./audits/STAGE_11_PLAN_REVIEW.md)与[验收](./audits/STAGE_11_ACCEPTANCE.md)记录错误→最小遥测→trace关联→灰度/恢复四部分。主Nuxt4单元/5E2E，独立Sentry/OTel/发布/Nginx实验实际运行；远程平台通知、真实RUM/Replay、Docker/K8s/Actions/云回退未执行。修正实际v-if开关、SSR trace传播与错误路径日志，不把源码复审当额外运行。下一阶段12，学习勾选不变。

## 阶段12本轮交付

保留24点，正文499/590（84.6%），待91点。[规划](./audits/STAGE_12_PLAN_REVIEW.md)与[验收](./audits/STAGE_12_ACCEPTANCE.md)记录风险测试→专项→Token/Storybook→Vue包/消费者四部分。主4单元/5E2E、本地CI入口、真实tgz/type/CSS/Tree-shaking与Changesets临时version；独立策略/专项/Storybook均实测。未跑Pact/Stryker/SaaS/多引擎/读屏/真机/远程CI/发布，未把源码故事当包产物。下一阶段13，学习勾选未变。

## 阶段13本轮交付

保留28点，正文527/590（89.3%），待63。[规划](./audits/STAGE_13_PLAN_REVIEW.md)与[验收](./audits/STAGE_13_ACCEPTANCE.md)记录多包/依赖/构建/兼容/DX四部分。主真实Turbo图/cache、3单元/5E2E与check:ci；独立版本/pack/锁、插件/双格式、回退/print、ESLint/AST/generator均实测。selector不是SCMaffected，local不是remote，未发布/接云平台或合并用户生产仓库。生成.turbo纳入原有缓存排除并回归。下一阶段14，学习勾选未动。
