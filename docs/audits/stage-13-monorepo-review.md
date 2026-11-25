# 阶段13.1逐点审查

2026-11-25。6点理论/操作/练习/integrationCase对照主manifest、包/任务图、脚本、源码与测试；DX分工另独立只读核对。

- 13.1.1：pnpm/Turbo/Nx职责、真实复用与维护成本、独立仓库备选分开；主3build任务是实际Turbo依赖编排，无Nx安装、无生产仓库迁移。
- 13.1.2：源码/包/task/SCM集合区分，真实dry图与反向selector包含core、两应用及根测试工具；不是SCM --affected已运行。基线/历史/全量回退作为CI接入条件，不拿少任务或cachehit当正确性。
- 13.1.3：实际cold/warm、删dist恢复index.js逐字、label元数据、env/source miss；只本地同机固定版本，remote权限/签名/secret与跨平台另验。复审后收紧“逐字全部dist”为实际index.js范围。
- 13.1.4：workspace:*、catalog/override/公开exports职责准确；根测试少声明core确实解析失败，修manifest和锁而非手动链接。主未发布，pack协议改写引用13.2真实独立实验。
- 13.1.5：实际最小TS AST gate覆盖import/export/dynamic/require静态specifier及相对边界/未声明依赖，注释无误报；不声称完整SFC/alias/符号链接/安全沙箱或ESLint集成。
- 13.1.6：Gradle/Melos仅概念对照，包/产物/部署/SSR差异明确，无Flutter工程修改。主两个应用共享core不等于共享UI/身份/一次发布。

每点有机制/真实或明确观察例/误区/移动对照/官方来源；独立练习两个标准/具体故障参考，综合任务真实能力和新增SCM/remote平台分开。source路径例明确按文件位置计算，不复制错误../层数。

必要运行：冻结安装、Nuxt与预览/核心类型、Nuxt lint、3单元、真实graph/cache、三任务生产build与5E2E、check:ci均通过。浏览器两视口共享产物/SSR接管、原生锚点/details/axe/函数缺失与禁JS基线，HTTP限制/400/404；不是其他引擎或真机。清理自建服务/临时cache。

独立复审指出source恢复可能覆写并发编辑，已去无条件恢复：probeWritten/原值/当前内容比对，未知内容保留报错，cache独立finally，即使重建失败也清理，每条20秒截止；仍要求隔离无并发环境，不称文件锁。源码保护后正常cache流程已实际复验，复审只读确认关闭，不冒充第二轮测试。

Turbo会生成.turbo日志，最小加入现有SKIP_DIRS并扩两条既有缓存回归用例；42检查器测试通过，防生成日志改变正文/验收指纹，不排除真实源码。全阶段旧验收新鲜度另由整合门禁核验。

R01–R09本组范围满足；正式全阶段记录/进度由root整合。Nx/remote/registry/云CI/MF、多引擎/真机/读屏/真实学习者试学未运行。
