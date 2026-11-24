# 知识地图专业性与学习路径审查

审查日期：2026-11-24。用户已确认 **Vue 3 + Nuxt 为主线，React 为选修**。本轮只调整总目录与指导规则，不新增教材正文，也不修改三个独立框架的代码。

## 判断

原地图从原生 Web 到工程治理，范围广、分层基本合理，能够作为长期知识索引。原路线仍不适合不加选择地逐项线性学习：React 比 Vue/Nuxt 详细，基础质量要求集中靠后，高级组织/服务端职责被当作统一前置，里程碑又依赖固定周数。需要先修订这些结构问题，再继续编写内容。

修订后认可它作为本项目的建设方向：主线覆盖平台基础、Vue/Nuxt 应用、API/认证和首次交付；专题保留高级深度，以实际问题和职责选择。没有一份目录可以一次性穷尽 Web，后续仍需按浏览器、官方 API 和真实项目反馈维护。

## 本轮目录修订

| 问题 | 已采取的修改 | 不继续堆叠的内容 |
| --- | --- | --- |
| 主线与已有 Vue/Nuxt 选择不一致 | 总览及阶段 4–15 默认 Vue/Nuxt，React/Next 标为选修；4.5 新增 8 项应用主线 | 不要求两套框架、路由和状态库全部精通 |
| CSS 基础与手机浏览器边界不足 | 新增 6 项：完整层叠、正常流、层叠上下文、内在尺寸、手机视口与输入/动效偏好 | 已有容器查询、Flex/Grid、逻辑属性等不重复设章 |
| 无障碍/兼容/设计被误解为后期补丁 | 新增 1.4 的 4 项质量基础，明确从首张页面贯穿 | 深层 WCAG、复杂组件测试和兼容矩阵仍归原有专题 |
| 学习顺序不等于前置依赖 | 新增学习路径，指出 SFC 先读、HTML 脚本实验回读及阶段 2 的核心/选修差别 | 不挪动既有章节编号和正文路径 |
| HTTP/认证措辞带有移动端或特定库假设 | 修正默认 Axios、默认存 Token、Keychain 类比、前端隐藏按钮即授权等表述 | 不在没有具体认证契约时强推 Cookie 或 JWT 单一方案 |
| 高级专题成为全员硬门槛 | 阶段 8–15 分支化；BFF/Edge、微前端、Monorepo 等按需要 | 不把平台负责人的全部职责当初学者最低要求 |
| 时间或清单被当作能力证明 | 九个里程碑改为实际产出与验收证据，去掉固定周数和读完即达高级的保证 | 不增加“看过/勾选即掌握”的新统计 |

## 新增条目与兼容

- 基础层新增 10 项：1.2.1.6、1.2.2.8–1.2.2.10、1.2.4.7、1.2.5.6、1.4.1–1.4.4。
- 工程层新增 8 项：4.5.1–4.5.8，覆盖路由布局、渲染、数据、状态、配置、Nitro、复用装配和错误边界。
- 原有 565 项的编号、目标路径和学习勾选保留，没有重命名已交付的 38 篇正文。
- 总规划为 583 项，已编写仍为 38 篇，545 项待建设；覆盖率约 6.5%。此前 6.7% 的变化来自分母补齐，不是内容被撤回。
- 总覆盖率仍含全部选修，只衡量知识库正文建设。主线是否可交付以[学习路径](./LEARNING_PATH.md)的验收为准。

## 官方依据与本项目判断的边界

| 已读取来源 | 影响的判断 |
| --- | --- |
| [MDN 核心课程](https://developer.mozilla.org/en-US/curriculum/core/)与[开发者设计](https://developer.mozilla.org/en-US/curriculum/core/design-for-developers/) | 标准、语义、布局、脚本、无障碍和设计作为基础能力，不只堆框架 API |
| [MWG HTML](https://developer.chrome.com/docs/modern-web-guidance/guides/html/html)、[CSS 架构](https://developer.chrome.com/docs/modern-web-guidance/guides/css/css)、[布局](https://developer.chrome.com/docs/modern-web-guidance/guides/css/css-layout)、[无障碍](https://developer.chrome.com/docs/modern-web-guidance/guides/accessibility/accessibility) | 原生语义、层叠、内在布局、视口及键盘/替代内容纳入基础实践 |
| [Baseline](https://web.dev/baseline) | 特性支持需与项目浏览器/WebView目标一起判断，不能仅以某个 Chrome 可用作结论 |
| [Vue 入门](https://vuejs.org/guide/introduction.html)与[SSR](https://vuejs.org/guide/scaling-up/ssr.html) | 平台基础先行；响应式、复用和每请求隔离需要明确学习与测试 |
| Nuxt [入门](https://nuxt.com/docs/4.x/getting-started/introduction)、[数据获取](https://nuxt.com/docs/4.x/getting-started/data-fetching)、[状态](https://nuxt.com/docs/4.x/getting-started/state-management)、[配置](https://nuxt.com/docs/4.x/guide/going-further/runtime-config) | Nuxt 独立列出应用能力，不能只用“SSR 框架概念”两项代表掌握 |
| [W3C WAI](https://www.w3.org/WAI/fundamentals/accessibility-intro/)与[模态对话框](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) | 无障碍应持续执行；焦点陷阱用于适当的模态场景，不套给普通路由 |

主线框架、阶段编号和里程碑安排是结合用户目标作出的工程与教学判断，不是上述机构对本地图的认证。目录广度不构成所有内容已验收的证据。

## 验证与后续

本轮知识库覆盖/链接检查为零真实错误，12 项检查器回归全部通过。与 5485ccf 基线比较，原 565 项编号、路径和学习勾选逐项一致，新增恰好 18 项且无重复 ID，已编写正文仍为 38 篇。统计表格已实际运行，结果为 38/583、545 项待编写。只修改目录与文档，没有修改 HTML 示例或框架代码，因此未重跑浏览器或手机测试。最终本地提交随交付报告提供。

后续顺序：继续 1.2 CSS，将 1.4 基础质量要求同步应用，再补 1.3 JavaScript。新正文必须写明前置、实践与验证边界；高级专题只有在对应问题或职责出现时提前选读。


## 标题具体化补充

阶段 0–15、六个分册及主要章节的标题已改成具体技术和任务名称。例如 Vue 3 + Nuxt 应用、TypeScript/Vite、Storybook/Vue 组件库、pnpm 多包发布、Node/Nitro/BFF，而非泛称框架、平台化或生态。原生与通用阶段直接表述 HTML/CSS/JS、请求、渲染、存储、安全和发布能力，不强行贴框架标签。旧标题锚点保留，所有知识点行不变，统计仍为 583 项与 38 篇正文。

## 阶段4开始前复核补充

2026-11-24阶段4实施前补齐两个独立目标：4.3.1.8 watch异步清理与4.5.9 Nuxt页面元信息；其余细节补入现有条目，原编号/路径/学习勾选保留。阶段4从57变59，全图从583变585。[本次规划依据与边界](./audits/STAGE_4_PLAN_REVIEW.md)单独记录，以上历史统计保持原日期口径。
