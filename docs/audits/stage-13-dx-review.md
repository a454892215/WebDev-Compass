# 阶段13.5逐点审查

2026-11-25，五点理论/示例/练习及integrationCase逐点交叉阅读；主tasks/manifest由主作者整合，不以工具名或文件数量当质量结论。

- 13.5.1：flat config数组/作用域/规则与peer声明正确，ESLint calculateConfigForFile/lintText真实检查，另实际pack解包消费rule，避免只测源码。当前JS parser/files，不假称自动覆盖主Nuxt SFC/TS；未registry发布。
- 13.5.2：真实RuleTester三合法/四违规涵盖import/re-export/dynamic literal和相似合法名称；固定messageId，无危险autofix。声明的模块字面量模式不是全解析器，computed/alias/CJS/跨包图未覆盖列清。
- 13.5.3：真实jscodeshift17.4 AST与CLI，不是字符串替换。value命名导出改名而保留local alias，shadow/object/othermodule/type-only不动；幂等与非法语法--fail-on-error真实通过。新旧API签名兼容是前提，不称通用TS/Vue模板迁移。
- 13.5.4：可信已有根目录下验证名称、realpath/relative、mkdir拒覆盖和wx写文件；sentinel/路径逃逸/symlink/实际CLI均测试。无install/Git/远程模板；恶意并发文件系统竞态未覆盖，不写成完整安全沙箱。
- 13.5.5：multi-root窗口、Git仓库、pnpm依赖图明确分开。真实JSON结构/相对路径/snippet placeholder检查，只是静态；templates需复制到相应位置才加载。没有启动VSCode/安装扩展/验证实际展开，不改用户全局设置。

## 来源与递进

先查读MWG security/HTML正文，采用安全DOM/原生button、输入与外部执行边界；再读ESLint当前flat config/RuleTester/custom rule、jscodeshift API/CLI、Node文件API、Vue tooling与VSCode multi-root/snippets/Workspace Trust官方正文。两个旧VSCode目录不可达，改检索到的editing/workspaces现行页，不记旧地址为成功来源。

官方npm实核ESLint10.15.0（Node ^20.19/^22.13/>=24）、jscodeshift17.4.0（>=16），本轮Node26满足；锁定版本，不把最低要求等同全部版本已验。顺序为共享配置→规则正反→迁移→安全生成→编辑器交接，每点独立变体/至少两标准/具体故障与参考、移动端对照。

## 发现、修正与验证

首AST变体仅改ImportSpecifier.imported时，Recast按原shorthand范围打印成import {newTitle}却保留oldTitle调用，实测断言发现。改整体替换specifier并显式保留local，alias/shadow/type-only与CLI正反复验通过，不靠改预期掩盖断绑定。

Prettier按code-workspace的JSONC格式添加尾逗号，严格JSON静态测试发现不再是本模板承诺的JSON子集；为本lab明确trailingComma:none，格式化后七组全部复验。没有声称VSCode不支持JSONC，只是本模板选择可严格解析的子集。

真实冻结离线安装通过；最终格式化后七组Node通过：RuleTester、ESLint实加载、AST正反/幂等、真实CLI/非法语法、生成器、VSCode静态、共享配置真实tarball消费。所有文件操作只在自建temp目录，finally清理，未创建生产宿主/registry/浏览器服务或Git提交。

实读当前主core/package与root package脚本，主有独立边界gate/多包/Turbo，不假设本labESLint已被主安装；综合任务明确评审/隔离接入/新增扩展。R01–R09在本分组声明范围满足，父索引/正式契约/整阶段门禁由主整合。AI审阅不称真实学习者试学。

## 13.1及主多包工程额外只读复审

主作者委托后只读核对13.1六点理论、操作卡、独立练习和points integrationCase，以及主package/workspace/Turbo/core/apps/scripts/tests。核读/tmp/stage13-workspace-result.json和root实际5E2E日志，未重跑主测试或修改主源码。

确认包图/task图/SCM变更集合分开，...core反向依赖selector不冒称--affected；真实任务图为web/preview build依赖core，根测试工具也声明core。core公开ESM/DTS消费、Nuxt/Vite独立输出与移动类比边界准确。local cache cold/warm/删除输出恢复/env/source miss有对应断言；remote服务/跨OS/签名接入未运行明确。最小boundary gate仅core TS AST、manifest及静态specifier，不冒称全SFC/alias/安全沙箱；对应单测含注释、相对越界、动态计算和未声明依赖。

两项已反馈主作者待其处置：
1. 13.1.3称“输出恢复逐字对照dist”，当前脚本只逐字比较index.js，label metadata另验。可收紧为具体文件证据，或补其他输出快照；不能把单JS比较说成全部DTS/metadata逐字恢复。
2. verify-workspace原finally无论是否注入probe都覆盖source original，可能丢并发编辑；需只恢复本次确实注入且当前仍等于probe的内容，检测未知变化后保留并报错。缓存清理应独立finally，避免最终rebuild失败跳过清理。操作卡已要求隔离/无并发，但实现保护仍有实际收益。

未发现其他新增阻断。主实验执行者root，本次仅文件/日志审阅；上述关闭与受影响必要运行由主作者负责，不用只读审查冒充已复验。

### 上述两项关闭复核

再次只读确认：13.1.3理论/操作卡/points均已改为恢复index.js逐字一致、build-info label另验，不再扩大为整个dist快照。verify-workspace加入注入前原文校验与probeWritten；finally仅当仍为本次probe才恢复，发现其他内容保留并报错，cache rm放独立finally。Turbo子命令截止20秒。

两项在源码/教材层关闭。该保护不是文件锁或对抗竞态保证，仍要求隔离、无并发编辑；读后写之间竞态等边界没有冒称消除。正常cache流程实际复验由root执行，本次未运行或把静态复审冒充测试，无新增阻断。
