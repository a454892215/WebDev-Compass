# 阶段 15：项目整合与附录

> 项目整合、治理与交付 · 索引 · 里程碑 · 资源规划  
> [← 05-platform](./05-platform-stages-12-14.md) · [← 返回总览](../KNOWLEDGE_MAP.md)

---

## 阶段 15：项目整合、治理与工程管理



### 15.1 技术决策与协作

- [ ] [15.1.1 **技术选型** 流程：PoC、Spike、评审会、决策记录](./notes/15-project-delivery/15.1-tech-decisions/15.1.1.item-15-1-1.md)
- [ ] [15.1.2 **Build vs Buy**：自研组件库 vs 采购 SaaS / 开源方案](./notes/15-project-delivery/15.1-tech-decisions/15.1.2.build-vs-buy.md)
- [ ] [15.1.3 **跨团队 API 契约** 协作：Mock First、OpenAPI、联调节奏](./notes/15-project-delivery/15.1-tech-decisions/15.1.3.api.md)
- [ ] [15.1.4 与 **设计 / 产品 / 后端 / QA / SRE** 的协作界面定义](./notes/15-project-delivery/15.1-tech-decisions/15.1.4.qa-sre.md)
- [ ] [15.1.5 **Estimation**：Story 拆分、风险缓冲、Unknown Unknowns](./notes/15-project-delivery/15.1-tech-decisions/15.1.5.estimation.md)



### 15.2 Code Review 与质量文化

- [ ] [15.2.1 **Review 清单**：正确性、边界、性能、安全、a11y、可测试性](./notes/15-project-delivery/15.2-code-review/15.2.1.review.md)
- [ ] [15.2.2 **Review 规模** 控制与 LGTM 文化](./notes/15-project-delivery/15.2-code-review/15.2.2.review.md)
- [ ] [15.2.3 **技术债务** 识别、量化（Hotspot）与偿还计划](./notes/15-project-delivery/15.2-code-review/15.2.3.item-15-2-3.md)
- [ ] [15.2.4 **Boy Scout Rule** 与渐进式重构](./notes/15-project-delivery/15.2-code-review/15.2.4.boy-scout-rule.md)



### 15.3 工程管理与团队协作

- [ ] [15.3.1 **任务拆分与协作分工**：Story 分解、联调节奏、模块 Owner](./notes/15-project-delivery/15.3-team-collaboration/15.3.1.task-collaboration.md)
- [ ] [15.3.2 **Pair Programming / Mob** 在前端场景的运用](./notes/15-project-delivery/15.3-team-collaboration/15.3.2.pair-programming-mob.md)
- [ ] [15.3.3 **知识分享** 机制：Tech Talk、内部 Wiki、Onboarding 文档](./notes/15-project-delivery/15.3-team-collaboration/15.3.3.item-15-3-3.md)
- [ ] [15.3.4 **前端能力评估维度**：用于排期、Review 与模块分工（工程视角，非招聘）](./notes/15-project-delivery/15.3-team-collaboration/15.3.4.skill-assessment.md)
- [ ] [15.3.5 **Onboarding Checklist** for 新成员](./notes/15-project-delivery/15.3-team-collaboration/15.3.5.onboarding-checklist.md)



### 15.4 遗留系统与迁移

- [ ] [15.4.1 **Strangler Fig** 渐进式替换模式](./notes/15-project-delivery/15.4-legacy-migration/15.4.1.strangler-fig.md)
- [ ] [15.4.2 **jQuery / 老 MPA → React/Vue** 迁移策略](./notes/15-project-delivery/15.4-legacy-migration/15.4.2.jquery-mpa-react-vue.md)
- [ ] [15.4.3 **双跑（Parallel Run）** 与 Feature Flag 切流](./notes/15-project-delivery/15.4-legacy-migration/15.4.3.parallel-run.md)
- [ ] [15.4.4 **CSS 遗留债务** 治理：全局命名空间、!important、层叠上下文](./notes/15-project-delivery/15.4-legacy-migration/15.4.4.css.md)
- [ ] [15.4.5 **Big Bang vs Incremental** 迁移风险评估](./notes/15-project-delivery/15.4-legacy-migration/15.4.5.big-bang-vs-incremental.md)
- [ ] [15.4.6 **Codemod + 自动化测试** 保障迁移安全](./notes/15-project-delivery/15.4-legacy-migration/15.4.6.codemod.md)



### 15.5 国际化与无障碍（生产级）

- [ ] [15.5.1 **i18n 架构**：namespace 懒加载、ICU MessageFormat、复数与性别](./notes/15-project-delivery/15.5-i18n-a11y-prod/15.5.1.i18n.md)
- [ ] [15.5.2 **RTL** 生产级：逻辑属性、镜像图标、BiDi 混排](./notes/15-project-delivery/15.5-i18n-a11y-prod/15.5.2.rtl.md)
- [ ] [15.5.3 **时区**：](./notes/15-project-delivery/15.5-i18n-a11y-prod/15.5.3.item-15-5-3.md)`Intl.DateTimeFormat`[、dayjs timezone、服务端 UTC 约定](./notes/15-project-delivery/15.5-i18n-a11y-prod/15.5.3.item-15-5-3.md)
- [ ] [15.5.4 **WCAG 2.2 AA** 达标流程与 VPAT 报告基础](./notes/15-project-delivery/15.5-i18n-a11y-prod/15.5.4.wcag-aa.md)
- [ ] [15.5.5 **SPA 路由切换** 焦点管理：](./notes/15-project-delivery/15.5-i18n-a11y-prod/15.5.5.spa.md)`focus-trap`[、skip link、live region](./notes/15-project-delivery/15.5-i18n-a11y-prod/15.5.5.spa.md)
- [ ] [15.5.6 复杂组件 a11y：**Combobox、DatePicker、Modal** WAI-ARIA 模式](./notes/15-project-delivery/15.5-i18n-a11y-prod/15.5.6.combobox-datepicker-modal.md)



### 15.6 Web 平台进阶（按业务选学）

- [ ] [15.6.1 **View Transitions API** 与 SPA 路由动画](./notes/15-project-delivery/15.6-web-platform-advanced/15.6.1.view-transitions-api.md)
- [ ] [15.6.2 **Navigation API](./notes/15-project-delivery/15.6-web-platform-advanced/15.6.2.navigation-api.md)**
- [ ] [15.6.3 **OPFS（Origin Private File System）](./notes/15-project-delivery/15.6-web-platform-advanced/15.6.3.opfs-origin-private-file-system.md)**
- [ ] [15.6.4 **WebRTC** 基础（音视频场景）](./notes/15-project-delivery/15.6-web-platform-advanced/15.6.4.webrtc.md)
- [ ] [15.6.5 **WebAuthn / Payment Request API](./notes/15-project-delivery/15.6-web-platform-advanced/15.6.5.webauthn-payment-request-api.md)**
- [ ] [15.6.6 **Import Maps** 与原生 ESM CDN](./notes/15-project-delivery/15.6-web-platform-advanced/15.6.6.import-maps.md)
- [ ] [15.6.7 **WebAssembly** 线程、SIMD、与 JS 边界](./notes/15-project-delivery/15.6-web-platform-advanced/15.6.7.webassembly.md)
- [ ] [15.6.8 **WebGL / Three.js** 3D 场景 — 可视化选学](./notes/15-project-delivery/15.6-web-platform-advanced/15.6.8.webgl-three.js.md)



### 15.7 能力锚点（阶段 15）

- 能主导一次 **遗留模块迁移** 从方案到上线
- 能输出 **迁移与整合方案文档**，协调跨团队评审与落地

---

---



## 知识点索引（按领域）

便于按需查阅，将全部阶段内容按技术领域重新归类：


| 领域         | 涵盖阶段    | 关键知识点                                  |
| ---------- | ------- | -------------------------------------- |
| HTML       | 1       | 语义化、表单、SEO 基础                          |
| CSS        | 1、4、12  | 布局、响应式、动画、Tailwind、Design Token        |
| JavaScript | 1、2     | 语法、异步、DOM、事件循环、原型链                     |
| 浏览器        | 0、2     | 渲染原理、缓存、存储、DevTools                    |
| 网络         | 0、5、14  | HTTP、REST、WebSocket、CORS、GraphQL       |
| TypeScript | 3       | 类型系统、泛型、工程配置                           |
| 工程化        | 3、13    | 包管理、Vite/Webpack、Monorepo、发布治理         |
| React      | 4、8、14  | Hooks、路由、状态管理、RSC、Next.js              |
| Vue        | 4       | 组合式 API、Pinia、Vue Router、Nuxt          |
| 架构         | 8       | FSD、微前端、BFF、渲染选型、RFC                   |
| 认证安全       | 5、6、10  | JWT、Session、XSS、CSRF、CSP、合规            |
| 性能         | 6、9     | Core Web Vitals、RUM、性能预算、Streaming SSR |
| 可访问性       | 6、12、15 | WCAG、ARIA、键盘导航、生产级 a11y                |
| 测试         | 3、12    | 单元/E2E、契约测试、视觉回归                       |
| 可观测性       | 11      | Sentry、Feature Flag、灰度、On-call         |
| 设计系统       | 4、12    | 组件库、Storybook、Token 流水线                |
| 部署运维       | 7、11    | 静态托管、Nginx、CI/CD、Docker、K8s            |
| BFF / 运行时  | 14      | Node、Edge、SSR 深入                       |
| 项目整合       | 7、15    | Review、迁移、协作治理、i18n 生产级                |


---



## 推荐学习顺序与里程碑



### 里程碑 1：能写静态页面（阶段 0–1，约 2–4 周）

- 产出：一个响应式个人介绍页或产品落地页（纯 HTML/CSS）



### 里程碑 2：能写交互式页面（阶段 1–2，约 2–4 周）

- 产出：Todo 应用、天气查询等小项目（原生 JS + Fetch）



### 里程碑 3：能使用现代工具链（阶段 3，约 1–2 周）

- 产出：用 Vite + TypeScript 重构之前的项目



### 里程碑 4：能开发 SPA 应用（阶段 4–5，约 4–8 周）

- 产出：带登录、列表、表单的完整管理后台或电商前台（React 或 Vue）



### 里程碑 5：生产就绪（阶段 6–7，约 2–4 周）

- 产出：对里程碑 4 的项目做性能优化、安全加固、部署上线



### 里程碑 6：能输出架构方案（阶段 8，约 2–4 周）

- 产出：一份完整 **技术 RFC**（含渲染选型 + 模块划分 + 风险）



### 里程碑 7：能治理生产质量（阶段 9–11，约 4–6 周）

- 产出：接入 **Sentry + Web Vitals + 性能预算 CI + CSP 草案 + 灰度流程**



### 里程碑 8：能建设团队平台（阶段 12–13，约 4–6 周）

- 产出：**Storybook + Design Token** 流水线；或 **Monorepo** 模板仓库



### 里程碑 9：高级 Web 工程师综合达标（阶段 14–15，约 4–8 周）

- 产出：实现 **BFF 原型** + 主导一次 **模块迁移整合** + 完成 **项目 Onboarding 文档**

---



## 与移动端经验的加速路径

若你已有 **React Native** 经验，可优先学习：

1. 阶段 1 的 **HTML/CSS**（RN 中较弱的部分）
2. 阶段 2 的 **浏览器原理与 DOM**（RN 无 DOM）
3. 阶段 5 的 **Cookie/CORS/Session**（RN 跨域场景不同）
4. 阶段 6 的 **SEO、a11y、Core Web Vitals**
5. 阶段 7、11 的 **部署、Nginx 与生产运维**
6. 阶段 8–15 的 **架构、监控、平台化**（RN 工程化差异大）

若你已有 **Flutter** 经验，需重点关注：

1. **JavaScript/TypeScript** 整个生态（与 Dart 差异）
2. **HTML 语义化与 CSS 布局**（无 Widget 系统）
3. **浏览器 DevTools** 调试（替代 Flutter DevTools 的部分能力）
4. **npm 生态与 Web 构建工具链**
5. 阶段 8–15 的 **架构治理与 BFF/Edge** 能力

若你已有 **Android** 经验，需重点关注：

1. **CSS 与响应式布局**（无 XML Layout）
2. **JavaScript 异步模型与前端框架**
3. **浏览器安全模型**（Web 特有风险）
4. **前端工程化**（与 Gradle 不同的工具链）
5. 阶段 13 的 **Monorepo**（≈ Gradle 多 Module）

---



## 配套资源规划（本项目目录建议）

```
WebDev_Compass/
├── README.md
├── KNOWLEDGE_MAP.md              # 总览与分册目录
├── knowledge-map/                # 知识点分册（01–06）
│   ├── 01-foundation-stages-0-2.md
│   ├── 02-engineering-stages-3-5.md
│   ├── 03-application-stages-6-7.md
│   ├── 04-architecture-stages-8-11.md
│   ├── 05-platform-stages-12-14.md
│   └── 06-delivery-stages-15-appendix.md
├── notes/
├── examples/
└── projects/
```



### 文件命名规范


| 类型   | 路径示例                                                                           |
| ---- | ------------------------------------------------------------------------------ |
| 笔记   | `notes/00-environment/0.1-what-is-web-app/0.1.1.client-server-model.md`        |
| 示例   | `examples/00-environment/0.1-what-is-web-app/0.1.1.request-response-demo.html` |
| 小节索引 | `notes/00-environment/0.1-what-is-web-app/README.md`                           |


---



## 版本记录


| 版本  | 日期         | 说明                       |
| --- | ---------- | ------------------------ |
| 1.0 | 2026-07-09 | 初始版本                     |
| 2.0 | 2026-07-13 | 融合至阶段 15，目标调整为高级 Web 工程师 |
| 2.1 | 2026-07-13 | 全量知识点四级序号，笔记/示例路径与序号对齐 |
| 2.2 | 2026-07-14 | 拆分为 6 个分册（knowledge-map/01–06），总览保留在 KNOWLEDGE_MAP.md |
| 2.3 | 2026-07-14 | 分册改用英文文件名；阶段 15 调整为项目整合与工程管理 |


---

**相关链接**：[返回总览](../KNOWLEDGE_MAP.md) · [01-foundation](./01-foundation-stages-0-2.md)
