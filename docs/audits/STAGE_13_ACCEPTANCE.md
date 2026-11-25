# 阶段13编写与质量验收

日期2026-11-25，总则版本1。28点：多包6、依赖5、构建5、兼容7、DX5。实际5代理，主负责多包/两宿主与整合，其余分别完成四个独立实验分组；DX额外只读复核多包，发布分组额外核整合边界。不将源码审阅计作重复运行或学习者试学。

## 范围与递进

开始依[规划复核](./STAGE_13_PLAN_REVIEW.md)核对目录/前置。补入图与SCM区分、缓存输入/输出/权限、依赖显式声明、版本兼容/安全升级/回退、Vite8角色、支持矩阵/基线与失败回退、AST绑定和generator安全；28个稳定编号容纳真实缺口，无重复新增。

阶段3/7/12为重点前置；先选仓库/包边界再任务图/锁/版本，构建按问题深化，兼容贯穿，DX让规则可失败。教学workspace不改变用户web-common和两宿主独立Git决策，不强制所有产品采用同样平台。

| 规则 | 逐点与集成结论 |
| --- | --- |
| R01 | 28编号四部分、manifest和任务锚点齐全，6+5+5+7+5无遗漏或空文。 |
| R02 | 前置/推荐顺序清楚，机制→实际例或明确观察→独立变体→综合交接，包/任务/部署分开。 |
| R03 | 先MWG后当前官方/安装源码，pnpm11与v12文档、Turbo、Vite8/Oxc、Changesets3、API能力/语法转换等边界准确。 |
| R04 | 主真实workspace/cache/两宿主，独立版本/锁/插件/双格式/兼容/AST/generator有运行；平台未执行不借品牌名充数。 |
| R05 | 每点至少两项具体标准、独立任务、故障输入/定位/修复参考；平台推演明确类型。 |
| R06 | 28任务对应主实现、独立lab、官方观察或新增能力；先核实际源码，不假设主有MF/registry/完整ESLint平台。 |
| R07 | dry计划/执行、selector/SCMaffected、local/remote、override解析/兼容、能力注入/旧浏览器、source/产物等术语一致。 |
| R08 | 下列必达发现已关闭并最小充分复验；只读/运行、未测与实际范围分别记录。 |
| R09 | 正文527/590（89.3%），待63，索引下一阶段14同步；学习者勾选未改。 |

## 逐点证据

- [多包6点](./stage-13-monorepo-points.json)、[实审](./stage-13-monorepo-review.md)。
- [依赖5点](./stage-13-release-points.json)、[实审](./stage-13-release-review.md)。
- [构建5点](./stage-13-build-points.json)、[实审](./stage-13-build-review.md)。
- [兼容7点](./stage-13-compat-points.json)、[实审](./stage-13-compat-review.md)。
- [DX5点](./stage-13-dx-points.json)、[实审及主工程复核](./stage-13-dx-review.md)。

各点记录实质机制、例子、独立故障、任务及一手来源。四部分完整不是质量自动证明，本轮逐点与跨章检查另有上述证据。

## 发现、修正与复验

1. **真实依赖与类型入口**：Nuxt子应用需自己的tsconfig引用；根测试用core却未声明时真实解析失败。补正确应用配置和显式workspace dev依赖/锁，不手动node_modules链接。Vite预览增加独立tsc，core由tsc构建，Nuxt独立typecheck；不把Vite转换当语义检查。
2. **图与缓存范围**：主实际三任务图依赖core、反向selector含根工具；该结果不是SCM --affected，也不是远程执行。实际cold/warm、删dist恢复index.js逐字、label元数据/env/source miss通过；复审收紧“全dist逐字”措辞，未做的文件快照不夸大。
3. **源探针恢复**：原无条件恢复可能覆盖并发编辑，改probeWritten/注入前原文检查/当前内容匹配，未知内容保留报错；去try中无条件恢复，cache独立finally，每命令20秒截止。正常cache流程实际复验，仍要求隔离无并发环境，非文件锁或彻底竞态防护。
4. **生成日志与指纹**：实际发现Turbo各包.turbo/turbo-build.log；将.turbo加入现有SKIP_DIRS并扩两条既有缓存回归，42检查器测试通过。旧阶段0–12记录重新核新鲜度；真实源码/配置未排除。
5. **版本联动语义**：独立widget自动patch不当然兼容core major。fixture保留公开布尔契约并在前后schema两版本真实执行true；教材明确若暴露breaking API需额外major意图，人审不能被工具替代。
6. **冻结锁证据**：含外部依赖的失配安装先做供应链元数据验证，offline仍可能网络/失败；已停止沙箱重试，不算锁拒绝。改纯本地workspace负例，明确OUTDATED_LOCKFILE并恢复锁字节不变；catalog与override单独真解析，不推断组合优先级或跨major兼容。
7. **构建角色与负例**：Vite8默认Rolldown/Oxc核官方；真实错误TS仍由Vite出JS而tsc TS2322。显式cache损坏/恢复、漏label错误命中真实断言；不称Vite内部或remote缓存。双格式/.d.ts/.d.cts只当前受控API有效，不称通用声明复制策略。
8. **兼容与打印**：缺失能力注入、UA伪装、按需模块/加载失败、CSS无效条件、固定宽度溢出及恢复、无JS基线均实际；print媒体/PDF仅有限检查。不是完整polyfill/真实旧引擎或物理打印，已目视必要打印内容。
9. **AST迁移与模板**：Recast shorthand原range导致import alias丢失，改替换ImportSpecifier保留local/类型/遮蔽，真实AST/CLI/幂等/解析失败复验。严格JSON模板与格式化尾逗号不一致已修，不把JSONC通用能力误套子集。generator拒路径逃逸/覆写，编辑器仅静态配置。
10. **来源与前提**：旧TypeScript handbook地址与若干官方旧页不可达，改已读当前官方路径，不记失败为成功。工具文档新版本/平台能力均结合本轮固定版本及实测，未引入新浏览器/Colima或真实平台账户。

11. **依赖方向与证据归属**：整合只读复核发现13.2任务把包依赖/变更影响箭头混写，并易将独立widget pack算成主core已测。已统一宿主/根工具→core、core→消费者影响，主core打包列隔离副本新增。主/独立证据不互换；仅文案修正，不新增运行宣称。

## 本轮实际验证

| 范围 | 已运行 |
| --- | --- |
| 主workspace | 冻结离线、core/Nuxt/preview类型、Nuxt lint、AST gate、格式、3单元、三Turbo build任务、本地check:ci及5Playwright |
| 主图/cache | 三任务真实依赖、反向selector；cold/warm、删core输出恢复index.js、环境/源码miss，保护修正后正常流程重跑 |
| 主浏览器/HTTP | 1440/390 Nuxt/Vite同core产物、SSR payload无浏览器catalog重复请求、键盘/axe/details/hash；函数缺失注入与禁JS基线；API1/10、400/404 |
| release-lab | 冻结安装、3Node政策、真实Changesets联动/changelog/公共契约前后验证、pack范围、OUTDATED_LOCKFILE/恢复、catalog/override实际解析 |
| build-lab | 冻结安装、3Node/真实Vite构建、虚拟模块/双manifest、转换类型负例、双格式/类型消费者、显式cache与漏键/损坏负例、390/1440后台Chrome |
| compat-lab | 冻结安装、3Node、Vite构建、390/1440 Chrome、无JS/UA/缺失/加载失败/CSS/溢出、print媒体/PDF有限验证 |
| dx-lab | 冻结安装、7组Node、真实ESLint/RuleTester、共享包pack消费、jscodeshift AST与CLI、安全生成器及VSCode静态检查 |

运行记录：[主](./stage-13-practice-runtime.json)、[发布](./stage-13-release-runtime.json)、[构建](./stage-13-build-runtime.json)、[兼容](./stage-13-compat-runtime.json)、[DX](./stage-13-dx-runtime.json)。主6点复用主工程实际证据，不伪造额外一轮测试。措辞/格式调整未改行为时按本轮原证据复用，执行者与范围明确。

全库知识链接、527/527四部分、HTML资源、42检查器回归及阶段0–13记录门禁通过。门禁验证覆盖/结构/指纹，不自动认证语义或个人能力；技术结论基于逐点审阅和上述有限运行证据。

## 限制与结论

主只有ESM/shared core、只读合成计划，不是真实身份/持久业务/生产平台。最小TS gate不解析全部alias/SFC/符号链接；lint只Nuxt，其他范围类型/边界验证不冒称全量ESLint。缓存只当前同机固定Node，未自动完整建模跨平台键。

未运行Nx、SCM --affected实际CI、远程cache/签名/registry发布/Bot/semantic-release/云CI、MF runtime、esbuild/SWC API、完整legacy插件/polyfill、其他浏览器引擎/真机/读屏/物理打印、编辑器UI/真实扩展安装、生产项目生成或真实学习者试学。相应点提供官方观察、配置前提或明确扩展，不以名称替代执行证据。

声明范围内R01–R09达标，下一阶段14。教材完成、质量验收与学习者掌握/生产治理能力分别判断。
