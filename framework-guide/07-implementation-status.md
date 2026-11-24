# 三仓库实施交接状态

更新于 2026-11-24。本文件区分 2026-11-20 的规划和已交付骨架，不代表所有 W0–W7 条目均已通过。

## 已建立的独立项目

| 仓库 | 职责 | 初始交付提交 |
| --- | --- | --- |
| web-common | core、Nuxt Layer、共享规范、检查工具和 AI 规则 | 95f3cc5 |
| web-pc-workframe | Nuxt UI 桌面宿主，默认 Node SSR | 0945504 |
| web-h5-workframe | Vant 手机宿主，默认静态 SPA | 148b6ca |

本机均位于 `/Volumes/Lenovo PS10/projects/`，各自独立 Git。宿主通过 `link:../web-common/...` 引用公共包，以 `extends: ['@web-base/nuxt']` 使用 Layer。相邻目录联调不等于已验证注册表版本安装。

2026-11-24 只读核对基座 ARCHITECTURE.md 与 docs/verification.md，没有修改或重建三个工程。以下测试结果来自 2026-11-20 交付记录，不是本轮重新执行。

## 规划与实际的差异

| 领域 | 已有 | 待补充 |
| --- | --- | --- |
| W0–W1 环境与结构 | 官方 Nuxt 骨架、五个公共包、锁文件及 Layer | 正式分发、许可和生产浏览器矩阵按业务确定 |
| W2 公共运行能力 | 请求工厂、decoder、错误分类、超时/取消、会话版本、脱敏、每请求装配 | 真实认证与刷新、持久化 adapter、并发 SSR 用户凭据隔离等完整场景证据 |
| W3 质量与 AI 工作流 | ESLint/Prettier、结构检查、任务依赖与证据校验、收尾命令 | 完整 AST 依赖图、暂存 hook、规则同步生成器及变更自动失效 |
| W4 两端模板 | 独立页面、列表、搜索、收藏、详情与错误恢复 | 真实登录、接口、安全区/软键盘及浏览器矩阵专项 |
| W5–W6 分发与复用 | 五个 tarball 及资源检查 | 干净宿主版本安装、升级/回退和正式发布 |
| W7 真实宿主 | fixture 模板 | 宿主接入真实业务并验收 |

实际 HTTP transport 使用标准 Fetch 与 Nitro event.fetch，纯 TS core 注入 fetcher；页面使用 useAsyncData。规划中的 `$fetch/ofetch` 是候选，不能据此宣称当前插件使用 `.raw()`。真实 SSR 曾发现包装器缺少 raw，修复记录已写入基座文档。

## 历史验证边界

2026-11-20 记录包含公共回归 15 项、两宿主 check 和生产构建、SSR/静态路由专项及每端 10 项后台 Chrome 检查。手机为移动视口/触控模拟，未做真机或 Safari/WebView 验证；真实认证、正式后端和发布账号未接入。

详细事实以各项目 ARCHITECTURE.md、README.md、docs/verification.md 和任务记录为准。后续代码任务在各独立项目继续，本指南维护可复用原则与交接事实。

返回[框架指南](./README.md) · [实施验收清单](./06-implementation-and-acceptance.md)
