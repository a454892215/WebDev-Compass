# 多包工程与平台交接边界

## 三种图与输出

包关系是web/preview/root-tools→core，任务顺序是core#build先于web/preview#build。源码图中应用只能从公开包入口消费；浏览器与SSR各有运行时，不因同仓共用currentUser。产物分别是core/dist、web/.output、preview/dist，部署/发布可以独立。

pnpm selector实际包含根测试工具，因为它也声明core。Turbo图只有三项build，根脚本是编排入口；dry计划不是执行，selector也不是SCM affected。真CI要明确base/head、checkout历史和全局配置影响，缺证据时保守跑全量，不能拿少任务当优化成功。

## 缓存契约

| 项目 | 当前实现                                               | 限制                                                               |
| ---- | ------------------------------------------------------ | ------------------------------------------------------------------ |
| 输入 | 默认包源码/manifest/锁与配置，build.env含COMPASS_LABEL | 未自动纳入所有Node/OS变化；本例限同机固定版本，跨环境先扩键/禁复用 |
| 输出 | dist/**、.output/**                                    | 缺outputs可能只复用日志；Nuxt临时.nuxt类型需prepare                |
| 存储 | .cache/turbo，本地local:rw                             | 没远程认证/权限/签名/撤销实测                                      |
| 观察 | cold/warm、删除core/dist恢复、env/source miss          | 恢复逐字比对index.js；label另验，不是所有文件快照                  |
| 数据 | 合成build-info label，范围校验                         | 不将secret写入产物或日志；cache不是认证                            |
| 清理 | 临时验证cache独立finally                               | 正常项目cache可保留复用，忽略提交                                  |

源探针必须在隔离无并发编辑环境；脚本比对已知内容，未知修改不覆盖，不宣称提供锁。只缓存确定性build，不把deploy/DB迁移/registry写入放普通cache任务；remote cache不是remote execution。与CI依赖下载缓存也不同。

## 实际质量闭环

根测试用core所以显式dev workspace依赖，不能靠残留node_modules/提升包。core API拒绝非字符串/越界limit，独立返回新计划；SSR与预览都从相同公开ESM产物消费。gate是有限TS AST规则，ESLint/完整架构治理另在DX lab。

主3单元/5E2E覆盖领域边界、AST正反、两个应用、SSR接管无浏览器重复catalog请求、键盘/axe、函数缺失注入、禁JS details/锚点、API1–10/400/404。模拟输入缺失不是旧浏览器兼容证明，截图/auto axe不是读屏或真机。

支持矩阵要分“目标/官方状态/实际环境/回退/负责人”，按需加载可信本地模块并保留失败基线；Browserslist查询、JS转译、DOM API支持三者不能混同。Vite8默认Rolldown/Oxc，不能从依赖出现esbuild/SWC推导当前默认执行。

## 平台与发布未执行

registry路由/读取/发布权限、Bot分组/升级批准、远程cache权限与签名、SCM affected、云CI/部署均待独立接入。Changesets自动patch消费者不等于API兼容；锁固定解析不等于安全，override解析成功也不等于跨major兼容。

主无MF、双格式库或完整codemod平台；各独立lab的真实范围见其运行记录。现有独立web-common与两个宿主Git布局不变；本例不能替用户决定生产仓库合并。未执行Docker/Colima、真实用户数据、外部消息、真机/多浏览器/读屏或真实学习者试学。

## CI接入复用

本地typecheck检查Nuxt与Vite预览，core由tsc构建做类型语义检查；lint当前针对Nuxt，core另有最小边界gate，完整组织ESLint包接入属于DX扩展，不冒称所有文件已全量lint。远程平台可复用[阶段11审查骨架](../../../2-examples/11-observability/11.4-infra/infra-lab/templates/quality.yml.example)，调整工作目录与check:ci、核验action SHA/浏览器和环境权限，先全量再引入受影响选择。该模板/平台设置未在本轮远程运行。
