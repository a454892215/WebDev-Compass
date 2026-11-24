# 阶段 3.1–3.2 逐点编写与质量审查

审查日期：2026-11-24。范围为包管理 6 点、构建工具 7 点；依据 `docs/AUTHORING.md` R01–R09。子任务开始时间 15:39:39 UTC。本报告是阶段 3 的分组证据，不能替代主代理的全阶段验收。

## 完整性与教学顺序

先 package.json、包管理命令、版本范围和锁文件，再 workspace、目录边界；构建部分先说明服务器/产物职责，再 Vite 配置、Webpack 选读、HMR、分包摇树、Source Map 与移动构建对照。未把 Vue/Nuxt 当作本阶段前置。

13 点均逐项检查理论、真实实验操作卡、独立练习（至少两条验收及故障注入/修正）、综合任务建议和官方来源日期。综合任务分清任务板已有代码与副本扩展，不声称任务板已经实现 monorepo、发布或认证。具体映射见 [逐点 JSON](./stage-3-build-points.json)，任务建议位于两个 `integration-cases.json`，最终以阶段综合任务正文和契约为准。

| 知识点 | 理论审查重点 | 练习与修正检查 | 结论 |
| --- | --- | --- | --- |
| 3.1.1 | dependencies用于包运行所需依赖，devDependencies用于开发、构建和测试工具；对于浏览器应用，最终哪些代码进入产物由导入与构建决定，不能把devDependencies等同“不会进入客户端”。 | 在副本把check脚本改成不存在文件，运行并记录退出码；恢复路径后同一命令通过。 | 通过 |
| 3.1.2 | install安装依赖，run执行scripts，workspace相关命令定位子包；不同工具的锁文件、安装布局和命令参数不能简单互换。 | 在副本错写filter包名，观察未匹配或失败信息；不能把没有执行任何包当任务通过。 | 通过 |
| 3.1.3 | SemVer表达兼容承诺，不自动证明代码确实兼容。^1.2.3通常允许1.x范围；~1.2.3通常限1.2.x。精确版本只固定直接声明，完整依赖图仍由锁文件记录。 | 把^0.2.3误认为允许0.3.0，先预测，再让semver断言反驳并修正规则。 | 通过 |
| 3.1.4 | package-lock.json、yarn.lock、pnpm-lock.yaml分别由对应工具维护，记录解析版本、完整性及依赖关系等。格式与语义不应手工互相改名转换。 | 制造依赖声明/锁不一致，定位ERR_PNPM_OUTDATED_LOCKFILE；按明确升级目标重生成锁，不用关闭冻结掩盖问题。 | 通过 |
| 3.1.5 | workspace由根pnpm-workspace.yaml声明包范围，子包仍有独立manifest。workspace:*明确要求本地workspace包，避免误从注册表匹配同名外部版本。 | 临时把workspace:*依赖名称改成不存在本地包，说明应报错而非悄悄取任意注册表包。 | 通过 |
| 3.1.6 | src通常放应用源码；tests可放测试，具体位置由框架/团队约定，目录名本身不会自动执行测试。Vite默认index.html位于工程根，是构建图入口。 | 只修改dist内文字，再重新build观察改动丢失；正确修复应回到对应src再生成。 | 通过 |
| 3.2.1 | 开发工具解析包导入、转换TypeScript/CSS等资源并维护模块图；生产构建生成适合部署的资源，可能进行代码分割、去除不可达代码和压缩。 | 把build改成只有vite build并宣称类型安全，注入错误后用单独tsc指出漏检并恢复组合命令。 | 通过 |
| 3.2.2 | create-vite可创建模板，也可用显式index.html与src/main.ts理解骨架；本实验保留可阅读的最小配置，避免把生成器当理解工程的替代品。 | 只配置TS paths却删除Vite alias，在副本触发运行/打包解析失败；恢复两侧一致配置。 | 通过 |
| 3.2.3 | entry指定依赖图起点，output定义生成位置与文件名；loader转换匹配模块，plugin通过构建钩子处理更广的任务。它们职责不同。 | 把loader写在plugins数组中，说明调用契约为什么不同；在独立副本按官方配置修复，不改当前Vite配置冒充验证。 | 通过 |
| 3.2.4 | dev server监视文件并通知客户端；变化在可接受的模块边界内由运行时应用，否则可能沿依赖图传播或回退全页刷新。HMR不是永不重载的承诺。 | 在副本移除accept，再改依赖，观察刷新和计数归零；还原后重测，不把浏览器自动刷新都叫HMR。 | 通过 |
| 3.2.5 | 动态import提供按需加载边界，构建器可生成独立chunk；不是所有动态路径都能静态分析，也不能把更多chunk一概当更快。 | 把初始化副作用加入模块并在副本观察产物；说明为什么不能为缩包盲目声明所有sideEffects:false。 | 通过 |
| 3.2.6 | Source Map把生成位置映射到原始源码位置，帮助调试和错误定位，不改变运行逻辑或自动修复错误。不同工具支持外部、内联、隐藏等策略，具体选项不是统一跨工具枚举。 | 删去发布包的map但保留sourceMappingURL，观察调试获取失败；在副本修正部署清单或策略而不改业务逻辑掩盖。 | 通过 |
| 3.2.7 | 共同目标包括解析依赖、转换源码/资源、生成可运行产物和提供开发反馈。Webpack/Vite、Gradle、Xcode和Metro的职责范围并不一致，不能一对一替换。 | 把vite build成功当签名发布完成，列出实际尚未发生的部署、配置和验收步骤并修正交付描述。 | 通过 |

## 本轮实际运行证据

- [包实验报告](./stage-3-package-runtime.json)：4 组通过。固定锁文件安装保持锁内容；8 个 SemVer 断言与真实 workspace 计算结果 5；临时副本改变 manifest 后冻结安装按预期拒绝；只执行本地 pack，tarball 白名单只有 index.js/package.json。
- [构建实验报告](./stage-3-build-runtime.json)：7 组通过。真实类型检查与构建、动态 chunk、纯导出移除、有效 map 和 public 文件复制；已导入的受控类型错误被 tsc 拒绝而 Vite-only 仍可转换，明确两者职责不同。
- Chrome 后台浏览器分别在 390/1440 宽度运行 dev 和 preview。真实修改消息模块后 HMR 更新文本、计数仍为 3、文档标识不变且没有主 frame 导航；生产环境点击前无统计 chunk 请求，点击后恰有一次请求并显示总和 6。两尺寸无横向溢出、无 pageerror，公开环境变量、alias 和 public 图片均实测。
- 不用构建后的总大小推断性能提升；唯一未使用导出标记只在运行 JS 中检查，Source Map 可能包含源码是预期边界。

实际环境：Node 26.0.0、pnpm 11.4.0、Vite 8.3.8、TypeScript 6.0.3；依赖版本固定且保留锁文件。Vite 8 的转换/打包实现不能按旧版 esbuild/Rollup 笼统描述。实验清晰分开 `typecheck`、`build`、`preview`。

## 配置修正与恢复记录

早先两个安装在下载为零时等待超过约 60 秒，已停止相关自建进程并向主代理报告保存/未暂存/未提交状态。改用明确 registry、无重试与 15 秒 fetch 上限、独立缓存后恢复；未把原因未经证明地归为 pnpm 缺陷。

按 pnpm 11 官方发布说明核实 `.npmrc` 只接受认证/registry，实验中仅含自建 store 的 `.npmrc` 已删除，专有设置移至 `pnpm-workspace.yaml` 的 `storeDir: node_modules/.pnpm-store`。两个 lab 的 `pnpm config get storeDir` 和 `pnpm store path` 均返回预期路径，随后冻结安装与受影响实验重新验证。未关闭供应链默认保护；未执行真实 publish 或全局安装。

## 复跑与范围

```bash
node learning/2-examples/03-engineering/3.1-package-management/verify.mjs
PLAYWRIGHT_MODULE=/absolute/path/to/playwright-core/index.mjs node learning/2-examples/03-engineering/3.2-build-tools/verify.mjs
```

第二项需要本机 Chrome 和允许 loopback 4201/4202 的环境；脚本在 finally 中恢复消息源码、删除自己创建的临时副本并关闭服务器与浏览器。若 sandbox 禁止 listen，应按权限流程运行，不把 EPERM 算业务失败。

Webpack 提供可理解的真实配置文件并作 Node 语法核对，本轮未安装/运行 Webpack；npm/Yarn 是命令对照而非全部实装；Source Map 核实生成内容，不冒充 DevTools 完整断点验证。无真机、多浏览器、生产部署、学习者试学或性能基准结论。最终全阶段契约、综合任务、索引和提交由主代理集成验证。

## 官方资料与采用决策

均核对于 2026-11-24：

- [Modern Web Guidance Performance](https://developer.chrome.com/docs/modern-web-guidance/guides/performance/performance)：资源按需消费、优化以可观察证据为依据。
- [pnpm 11.0](https://pnpm.io/blog/releases/11.0)、[workspace](https://pnpm.io/workspaces)、[冻结安装](https://pnpm.io/cli/install)：配置位置、workspace 协议与锁文件约束。
- [npm package.json](https://docs.npmjs.com/cli/v11/configuring-npm/package-json)、[node-semver](https://github.com/npm/node-semver)：manifest 职责、0.x/预发布版本边界。
- [Vite 功能](https://vite.dev/guide/features)、[HMR API](https://vite.dev/guide/api-hmr)、[环境变量](https://vite.dev/guide/env-and-mode)、[构建](https://vite.dev/guide/build)：转换不等于类型检查、显式 HMR 边界、公开变量与 chunk。
- [Webpack Concepts](https://webpack.js.org/concepts/)：理解 entry/output/loader/plugin 职责，仅作选读实验。
