# 阶段15：旧目录到 Vue 3 / Nuxt 的迁移与交付

目标是交付一个小而完整的只读迁移切片：旧MPA保留、Nuxt新页可用、搜索与金额契约一致、分流可退、错误可复现，并能解释未验证范围。不是重建生产旧系统或发布控制平台。

## 运行与验证

本轮Node26.0.0/pnpm11.4.0，Nuxt4.7.0/Vue3.5.46/TypeScript6.0.3，解析Nitro2.14.0/Vite8.3.8。主实践目录运行：

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm test:e2e
```

check执行类型、lint、格式、3单元、受限AST迁移和生产构建；E2E使用后台Chrome启动127.0.0.1:4571服务，结束关闭。默认已安装Google Chrome路径；其他环境用CHROME_PATH指定，或按Playwright官方安装浏览器。

交互查看：

```sh
pnpm dev
```

打开http://127.0.0.1:4571，结束Ctrl+C。开发与E2E不要同时占用4571。所有数据都是公开fixture，无真实账号、订单、数据库或付款。

## 源码与实际机制

| 路径/入口                   | 真实行为                                                                      |
| --------------------------- | ----------------------------------------------------------------------------- |
| /entry?bucket=99 / bucket=0 | 同一固定接缝分别302到旧MPA/新版Nuxt；合法bucket为0–99                         |
| /entry?bucket=0&rollback=1  | 单次请求退回旧版，保留q；不是生产全局开关或授权                               |
| /legacy/catalog             | Nitro返回独立HTML文档，GET搜索、显式文本转义、独立旧CSS；没有安装jQuery       |
| /catalog、/product/p1       | Vue目录过滤、空/错状态、详情深链；SSR数据用useFetch，接口失败与缺失商品分开   |
| /api/catalog                | 稳定{id,title,cents}公开DTO；query.broken=1为503合成故障                      |
| /api/shadow、/comparison    | 两个独立只读fixture规范化后比较；mismatch=1注入1分差；无双写/生产影子流量     |
| shared/catalog.ts           | 旧形状适配、严格分币/唯一id校验、公开投影、分流与差异函数                     |
| migration/codemod           | 真实AST命名导入迁移，保留alias/局部绑定，拒绝歧义；12有效/8无效行为等价与幂等 |

[迁移交付包](./migration/README.md)记录基线、接缝、比较、回退和退出旧系统条件。主没有删除旧路由，无法借此声称生产下线已完成。配置migrationPercent可由Nuxt匹配环境变量覆盖；非法百分比失败关闭。公开bucket与rollback只为演示，生产需要可信分组、受控开关、持久化和观测。

跳至内容链接在重复导航前，main可程序聚焦；真正路径切换后聚焦h1，首次hydration和同页搜索不强移焦。NuxtRouteAnnouncer负责通知，不代替焦点。/comparison的两种按钮用命名范围和SFC scoped隔离，Computed样式、键盘、宽窄布局和所选axe规则实际检查。它不是完整WCAG评估，未做读屏/真实用户试学或全历史滚动恢复。

## 独立实验与组织产物

- [决策与协作实验](../../2-examples/15-project-delivery/15.1-tech-decisions/delivery-lab/README.md)：依赖图/区间/成本/契约真实运行；会议、采购、Pair、人员评价与新人试学是明确待执行模板。
- [代码评审实验](../../2-examples/15-project-delivery/15.2-code-review/review-lab/fixture-review.md)：负例回归、切片清单、真实隔离Git历史和纯函数等价；不替代人工LGTM。
- [ICU/Intl及RTL/无障碍实验](../../2-examples/15-project-delivery/15.5-i18n-a11y-prod/i18n-lab/README.md)：Node消息格式化与浏览器交互分开；主没有接入多语言引擎、日期网格或完整滚动恢复。
- [转场、导航、OPFS、RTC](../../2-examples/15-project-delivery/15.6-web-platform-advanced/navigation-lab/README.md)：真实本地浏览器和回退；没有覆盖Nuxt路由或远端音视频。
- [WebAuthn、Import Map、Wasm、WebGL](../../2-examples/15-project-delivery/15.6-web-platform-advanced/specialized-lab/README.md)：虚拟认证器只验证浏览器仪式、Payment只检查接口；Wasm共享内存中的JS Atomics不等于Wasm线程实现，WebGL不等于已运行Three.js。

每组实验都是独立边界，不是主Nuxt默认依赖。按[34项任务](./tasks.md)完成变体和集成设计，未实施部分保持待验；不为目录齐全强行引入所有浏览器API或组织工具。

[理论](../../1-notes/15-project-delivery/README.md) · [示例](../../2-examples/15-project-delivery/README.md) · [独立练习](../../3-exercises/15-project-delivery/README.md) · [验收记录](../../../docs/audits/STAGE_15_ACCEPTANCE.md)
