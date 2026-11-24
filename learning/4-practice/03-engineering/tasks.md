# 阶段3：阅读任务板逐点综合任务

前置：先读[项目说明](./README.md)，运行已有实现，再在自己的副本完成扩展。以下36项是学习任务与验收标准，不表示作者已替学习者完成全部扩展。主工程已有原生TS任务板、失败恢复、纯模型/服务测试、产物检查与E2E；workspace、Husky、Vue组件在独立实验中，Webpack只作配置阅读。

推荐顺序：3.1 → 3.3.1–3.3.10 → 3.2 → 3.4 → 3.5；3.3.11与3.5.3为Vue最小桥接，完整Vue/Nuxt留阶段4。各任务保留“改动、运行命令、预期/实际、失败原因、修复结果”，不必额外填写复杂表单。

<a id="p-3-1-1"></a>

## 3.1.1 package.json：依赖、脚本与运行环境

为任务板逐项解释scripts、依赖类型、Node范围与private，指出真实命令入口，不把声明当验证。

验收：

- [ ] 能说明typecheck、build、test各检查什么，错误退出能被发现。
- [ ] 依赖版本和运行环境有记录，private防误发布且不把它当秘密保护。

[理论](../../1-notes/03-engineering/3.1-package-management/3.1.1.package.json.md) · [示例](../../2-examples/03-engineering/3.1-package-management/3.1.1.package.json-demo.md) · [独立练习](../../3-exercises/03-engineering/3.1-package-management/3.1.1.package.json.md)

<a id="p-3-1-2"></a>

## 3.1.2 npm、Yarn、pnpm：安装、脚本与本地打包

在任务板用pnpm脚本完成安装与检查；filter命令和本地pack转到3.1 package-lab操作，不对private任务板执行真实publish。

验收：

- [ ] 能区分安装、运行、归档与发布。
- [ ] filter仅运行预期包，pack清单无凭据/缓存和node_modules。

[理论](../../1-notes/03-engineering/3.1-package-management/3.1.2.npm-yarn-pnpm.md) · [示例](../../2-examples/03-engineering/3.1-package-management/3.1.2.npm-yarn-pnpm-demo.md) · [独立练习](../../3-exercises/03-engineering/3.1-package-management/3.1.2.npm-yarn-pnpm.md)

<a id="p-3-1-3"></a>

## 3.1.3 SemVer：范围、零主版本与预发布

为任务板一项工具依赖设计升级范围，并说明锁文件与兼容回归各负责什么。

验收：

- [ ] 手算^1.2.3、~1.2.3、^0.2.3、^0.0.3边界后与实现核对。
- [ ] 不能把满足范围当作功能/安全已验证。

[理论](../../1-notes/03-engineering/3.1-package-management/3.1.3.item-3-1-3.md) · [示例](../../2-examples/03-engineering/3.1-package-management/3.1.3.item-3-1-3-demo.md) · [独立练习](../../3-exercises/03-engineering/3.1-package-management/3.1.3.item-3-1-3.md)

<a id="p-3-1-4"></a>

## 3.1.4 锁文件：解析图与冻结安装

在任务板保持manifest与pnpm锁一致，升级时同时审查锁变化并运行检查。

验收：

- [ ] 原工程冻结安装退出0且锁文件未被改写。
- [ ] 临时副本manifest不一致时冻结命令非0，能指出修复路径。

[理论](../../1-notes/03-engineering/3.1-package-management/3.1.4.package-lock.json.md) · [示例](../../2-examples/03-engineering/3.1-package-management/3.1.4.package-lock.json-demo.md) · [独立练习](../../3-exercises/03-engineering/3.1-package-management/3.1.4.package-lock.json.md)

<a id="p-3-1-5"></a>

## 3.1.5 pnpm workspace：两个包的明确依赖

评估阅读任务板当前是否需要workspace；如新增共享纯模型包，在副本显式声明依赖方向。

验收：

- [ ] 在package-lab指出workspace根、包入口和app→math依赖；若扩展任务板，在副本另画app→model方向。
- [ ] 允许保持单包，并有基于当前规模的理由；不把本地链接当发布完成。

[理论](../../1-notes/03-engineering/3.1-package-management/3.1.5.monorepo.md) · [示例](../../2-examples/03-engineering/3.1-package-management/3.1.5.monorepo-demo.md) · [独立练习](../../3-exercises/03-engineering/3.1-package-management/3.1.5.monorepo.md)

<a id="p-3-1-6"></a>

## 3.1.6 项目目录：源码、静态资源、测试与产物

为任务板画出入口、领域模型、UI、测试和产物边界，再新增功能时指出应改的源码与测试。

验收：

- [ ] 明确浏览器入口、源码模块与public资源消费路径。
- [ ] 构建后文件与源文件职责区分，node_modules/dist不夹带提交。

[理论](../../1-notes/03-engineering/3.1-package-management/3.1.6.src.md) · [示例](../../2-examples/03-engineering/3.1-package-management/3.1.6.src-demo.md) · [独立练习](../../3-exercises/03-engineering/3.1-package-management/3.1.6.src.md)

<a id="p-3-2-1"></a>

## 3.2.1 构建工具：转换、模块图与检查边界

审查任务板的typecheck/build/lint/test命令各自职责，并在副本注入类型错误验证门禁。

验收：

- [ ] 能区分转换、类型、lint、测试的证据。
- [ ] 类型错误副本中Vite单独转换不充当类型通过。

[理论](../../1-notes/03-engineering/3.2-build-tools/3.2.1.hmr.md) · [示例](../../2-examples/03-engineering/3.2-build-tools/3.2.1.hmr-demo.md) · [独立练习](../../3-exercises/03-engineering/3.2-build-tools/3.2.1.hmr.md)

<a id="p-3-2-2"></a>

## 3.2.2 Vite：入口、配置、alias和公开环境变量

核对任务板index入口、tsconfig与Vite alias及公开标签，不把VITE_当密钥管理。

验收：

- [ ] 实际运行入口与别名对应，build后公开标签可在客户端观察。
- [ ] 说明开发/构建时配置与后续Nuxt运行配置不同。

[理论](../../1-notes/03-engineering/3.2-build-tools/3.2.2.vite.md) · [示例](../../2-examples/03-engineering/3.2-build-tools/3.2.2.vite-demo.md) · [独立练习](../../3-exercises/03-engineering/3.2-build-tools/3.2.2.vite.md)

<a id="p-3-2-3"></a>

## 3.2.3 Webpack核心概念：按需对照

若未来接手Webpack任务板，写入口/转换/产物迁移清单；当前工程继续Vite，不强引第二构建器。

验收：

- [ ] 能分别解释entry、output、loader、plugin与HMR边界。
- [ ] 明确本轮只阅读/语法检查配置，未做Webpack兼容验收。

[理论](../../1-notes/03-engineering/3.2-build-tools/3.2.3.webpack.md) · [示例](../../2-examples/03-engineering/3.2-build-tools/3.2.3.webpack-demo.md) · [独立练习](../../3-exercises/03-engineering/3.2-build-tools/3.2.3.webpack.md)

<a id="p-3-2-4"></a>

## 3.2.4 HMR：更新边界与状态保留

先在3.2的vite-lab将计数加至3，修改message.ts并核对HMR；再回任务板修改CSS，比较模块更新与全页刷新。任务板没有示例计数器，也未为main.ts实现手工accept，不能把lab的状态保持结论套过来。

验收：

- [ ] vite-lab中消息改变后计数仍3、document身份不变，删除accept的副本可观察到刷新差异。
- [ ] 记录任务板实际更新结果及可接受边界；解释变化可能回退全页刷新，不宣称任意状态都会保留。

[理论](../../1-notes/03-engineering/3.2-build-tools/3.2.4.hmr.md) · [示例](../../2-examples/03-engineering/3.2-build-tools/3.2.4.hmr-demo.md) · [独立练习](../../3-exercises/03-engineering/3.2-build-tools/3.2.4.hmr.md)

<a id="p-3-2-5"></a>

## 3.2.5 生产构建：动态分块、Tree Shaking与压缩

给任务板按需统计模块检查真实chunk与首次消费请求，并判断是否值得分割。

验收：

- [ ] 构建生成独立按需JS，按钮首次点击后实际加载并运行。
- [ ] 明确本例纯导出被删，不宣称所有副作用/依赖都自动安全裁剪。

[理论](../../1-notes/03-engineering/3.2-build-tools/3.2.5.code-splitting-tree-shaking.md) · [示例](../../2-examples/03-engineering/3.2-build-tools/3.2.5.code-splitting-tree-shaking-demo.md) · [独立练习](../../3-exercises/03-engineering/3.2-build-tools/3.2.5.code-splitting-tree-shaking.md)

<a id="p-3-2-6"></a>

## 3.2.6 Source Map：生成代码与源码的映射

为任务板决定开发/生产map策略，写明哪些产物公开、错误诊断如何取得映射。

验收：

- [ ] 实际产物map可解析且mappings非空，能区分生成/发布/消费。
- [ ] 不声称hidden防止下载，不把映射当运行时校验。

[理论](../../1-notes/03-engineering/3.2-build-tools/3.2.6.source-map.md) · [示例](../../2-examples/03-engineering/3.2-build-tools/3.2.6.source-map-demo.md) · [独立练习](../../3-exercises/03-engineering/3.2-build-tools/3.2.6.source-map.md)

<a id="p-3-2-7"></a>

## 3.2.7 Web构建与移动构建：职责相似，机制不同

给任务板画四栏：类型/构建/质量/测试；用移动经验解释共同目标，并写出至少三项Web特有边界。

验收：

- [ ] 能解释浏览器资源URL、开发服务器和生产静态资源的关系。
- [ ] 类比说明职责与差异，不宣称移动工具或真实部署实测。

[理论](../../1-notes/03-engineering/3.2-build-tools/3.2.7.vite-webpack-gradle-xcode-build.md) · [示例](../../2-examples/03-engineering/3.2-build-tools/3.2.7.vite-webpack-gradle-xcode-build-demo.md) · [独立练习](../../3-exercises/03-engineering/3.2-build-tools/3.2.7.vite-webpack-gradle-xcode-build.md)

<a id="p-3-3-1"></a>

## 3.3.1 TypeScript解决什么问题与类型擦除

审查任务板模型与unknown解码边界，指出哪些错误由tsc发现、哪些必须运行时拒绝。

验收：

- [ ] 错误任务字段能被类型检查拒绝。
- [ ] 合法JSON但字段类型错误仍被解码器拒绝，未将as当验证。

[理论](../../1-notes/03-engineering/3.3-typescript/3.3.1.typescript-ide.md) · [示例](../../2-examples/03-engineering/3.3-typescript/3.3.1.typescript-ide-demo.md) · [独立练习](../../3-exercises/03-engineering/3.3-typescript/3.3.1.typescript-ide.md)

<a id="p-3-3-2"></a>

## 3.3.2 基础类型、unknown、元组与enum

为任务板id、标题、完成状态和筛选条件写准确类型，评估用字面量联合而非强引enum。

验收：

- [ ] 字段类型与运行期协议一致，坏字段被拒绝。
- [ ] 区分null、undefined与空字符串，不因类型注解隐藏缺失状态。

[理论](../../1-notes/03-engineering/3.3-typescript/3.3.2.string.md) · [示例](../../2-examples/03-engineering/3.3-typescript/3.3.2.string-demo.md) · [独立练习](../../3-exercises/03-engineering/3.3-typescript/3.3.2.string.md)

<a id="p-3-3-3"></a>

## 3.3.3 interface与type：结构契约和声明合并

整理任务板的Task与Filter契约，区分服务端字段、UI派生字段，避免把所有扩展塞进同一可选接口。

验收：

- [ ] 能说明interface/type各自用途且类型检查通过。
- [ ] 没有依赖类型注解自动过滤外部未知字段。

[理论](../../1-notes/03-engineering/3.3-typescript/3.3.3.interface.md) · [示例](../../2-examples/03-engineering/3.3-typescript/3.3.3.interface-demo.md) · [独立练习](../../3-exercises/03-engineering/3.3-typescript/3.3.3.interface.md)

<a id="p-3-3-4"></a>

## 3.3.4 联合、交叉与可辨识状态

审查任务板加载/失败/成功分支，若多个布尔标志能形成矛盾状态，在副本用判别联合整理。

验收：

- [ ] 每个状态只能访问自己的数据。
- [ ] 新增状态能暴露遗漏分支，错误输入仍有运行时处理。

[理论](../../1-notes/03-engineering/3.3-typescript/3.3.4.item-3-3-4.md) · [示例](../../2-examples/03-engineering/3.3-typescript/3.3.4.item-3-3-4-demo.md) · [独立练习](../../3-exercises/03-engineering/3.3-typescript/3.3.4.item-3-3-4.md)

<a id="p-3-3-5"></a>

## 3.3.5 泛型约束与常用工具类型

给任务板的按id查询或摘要映射保留输入/输出类型关系；仅在确有复用时抽出泛型。

验收：

- [ ] 不存在id的结果显式处理。
- [ ] Partial/Pick/Omit只约束类型，更新与序列化逻辑仍真实实现。

[理论](../../1-notes/03-engineering/3.3-typescript/3.3.5.extends.md) · [示例](../../2-examples/03-engineering/3.3-typescript/3.3.5.extends-demo.md) · [独立练习](../../3-exercises/03-engineering/3.3-typescript/3.3.5.extends.md)

<a id="p-3-3-6"></a>

## 3.3.6 断言、类型守卫与unknown数据入口

为任务板fetch得到的unknown数据设计解码及反例测试，避免把响应直接断言为Task[]。

验收：

- [ ] 合法JSON但字段错误也被拒绝。
- [ ] 数据进入UI前完成校验，没有把tsc通过当服务端可信。

[理论](../../1-notes/03-engineering/3.3-typescript/3.3.6.typeof.md) · [示例](../../2-examples/03-engineering/3.3-typescript/3.3.6.typeof-demo.md) · [独立练习](../../3-exercises/03-engineering/3.3-typescript/3.3.6.typeof.md)

<a id="p-3-3-7"></a>

## 3.3.7 函数参数、返回值与回调契约

为任务板筛选、解码和测试fetch替身定义函数契约，保留真实的异步与失败行为。

验收：

- [ ] 替身与生产函数输入输出契约一致。
- [ ] 没有把Promise当同步结果使用，错误不被无意吞掉。

[理论](../../1-notes/03-engineering/3.3-typescript/3.3.7.item-3-3-7.md) · [示例](../../2-examples/03-engineering/3.3-typescript/3.3.7.item-3-3-7-demo.md) · [独立练习](../../3-exercises/03-engineering/3.3-typescript/3.3.7.item-3-3-7.md)

<a id="p-3-3-8"></a>

## 3.3.8 类修饰符、readonly与#private的边界

评估任务板状态是否确需class；在独立分支比较纯函数与实例封装，不为修饰符重写主工程。

验收：

- [ ] 能清楚列出编译期与运行期限制。
- [ ] 主工程没有用private/readonly承担认证或数据校验。

[理论](../../1-notes/03-engineering/3.3-typescript/3.3.8.public.md) · [示例](../../2-examples/03-engineering/3.3-typescript/3.3.8.public-demo.md) · [独立练习](../../3-exercises/03-engineering/3.3-typescript/3.3.8.public.md)

<a id="p-3-3-9"></a>

## 3.3.9 ES模块、type-only import与声明文件

审查任务板domain类型的type-only导入和实际函数导入，检查产物/声明与运行模块是否一致。

验收：

- [ ] 类型导入不残留成错误运行时依赖。
- [ ] 新增第三方声明前先确认真实库及其导出存在。

[理论](../../1-notes/03-engineering/3.3-typescript/3.3.9..d.ts.md) · [示例](../../2-examples/03-engineering/3.3-typescript/3.3.9..d.ts-demo.md) · [独立练习](../../3-exercises/03-engineering/3.3-typescript/3.3.9..d.ts.md)

<a id="p-3-3-10"></a>

## 3.3.10 strict、target、module与paths

核对任务板tsconfig与Vite alias的一致性，并分别运行typecheck、build和产物浏览器验证。

验收：

- [ ] 相同别名在检查器和构建器都解析。
- [ ] target没有被当polyfill，生产构建成功不替代类型检查。

[理论](../../1-notes/03-engineering/3.3-typescript/3.3.10.tsconfig.json.md) · [示例](../../2-examples/03-engineering/3.3-typescript/3.3.10.tsconfig.json-demo.md) · [独立练习](../../3-exercises/03-engineering/3.3-typescript/3.3.10.tsconfig.json.md)

<a id="p-3-3-11"></a>

## 3.3.11 Vue Props、事件与composable类型预告

主任务板是原生TS；在独立副本定义Vue卡片契约和composable返回类型，为阶段4迁移准备，不冒称主项目已有Vue UI。

验收：

- [ ] Props/事件/返回值经类型检查。
- [ ] 明确Vue片段仅桥接，React不作为本阶段先修。

[理论](../../1-notes/03-engineering/3.3-typescript/3.3.11.react-vue-ts-props.md) · [示例](../../2-examples/03-engineering/3.3-typescript/3.3.11.react-vue-ts-props-demo.md) · [独立练习](../../3-exercises/03-engineering/3.3-typescript/3.3.11.react-vue-ts-props.md)

<a id="p-3-3-12"></a>

## 3.3.12 TypeScript、Dart与Kotlin：可迁移经验和边界

写任务板从移动经验迁移的三条注意事项，分别指向实际解码、状态和编译配置代码。

验收：

- [ ] 每条差异有具体代码或输入证明。
- [ ] 没有将类型、存储或前端权限作为可信后端保障。

[理论](../../1-notes/03-engineering/3.3-typescript/3.3.12.typescript-dart-kotlin.md) · [示例](../../2-examples/03-engineering/3.3-typescript/3.3.12.typescript-dart-kotlin-demo.md) · [独立练习](../../3-exercises/03-engineering/3.3-typescript/3.3.12.typescript-dart-kotlin.md)

<a id="p-3-4-1"></a>

## 3.4.1 ESLint：用 flat config 检查代码质量

现有任务板已有 flat config。复制项目，增加 no-debugger 规则并用一个会失败的临时源文件证明脚本覆盖 src；修复后保留成功记录。

验收：

- [ ] pnpm lint 对 debugger 返回非零且指出规则名
- [ ] 移除 debugger 后 lint 与 typecheck 均通过

[理论](../../1-notes/03-engineering/3.4-code-quality/3.4.1.eslint.md) · [示例](../../2-examples/03-engineering/3.4-code-quality/3.4.1-eslint/README.md) · [独立练习](../../3-exercises/03-engineering/3.4-code-quality/3.4.1.eslint.md)

<a id="p-3-4-2"></a>

## 3.4.2 Prettier：统一排版并用 check 阻止漂移

现有任务板已有 format:check。副本故意制造一个排版差异，证明 check 不改源码，再格式化并通过功能测试。

验收：

- [ ] check 第一次失败且没有改写文件
- [ ] write 后 check 通过，业务测试仍通过

[理论](../../1-notes/03-engineering/3.4-code-quality/3.4.2.prettier.md) · [示例](../../2-examples/03-engineering/3.4-code-quality/3.4.2-prettier/README.md) · [独立练习](../../3-exercises/03-engineering/3.4-code-quality/3.4.2.prettier.md)

<a id="p-3-4-3"></a>

## 3.4.3 EditorConfig：约定编辑器缩进、换行与编码

现有任务板有基础 EditorConfig。副本增加 Markdown 专用 section，解释为什么代码缩进与 Markdown 尾空格需要不同策略。

验收：

- [ ] 能解释 root 和 section 的匹配/覆盖次序
- [ ] 支持工具读到四空格，根配置保持两空格且排版检查通过

[理论](../../1-notes/03-engineering/3.4-code-quality/3.4.3.editorconfig.md) · [示例](../../2-examples/03-engineering/3.4-code-quality/3.4.3-editorconfig/README.md) · [独立练习](../../3-exercises/03-engineering/3.4-code-quality/3.4.3.editorconfig.md)

<a id="p-3-4-4"></a>

## 3.4.4 Husky + lint-staged：在暂存文件上执行提交前检查

主任务板不安装真实 hooks。阅读隔离验证，另建临时 Git 仓库重复“暂存错误—阻止—修复—提交”，记录主项目未受影响。

验收：

- [ ] 坏暂存内容阻止提交且出现实际 ESLint 规则名
- [ ] 修复并重新 git add 后成功；主仓库 hooksPath 未改变

[理论](../../1-notes/03-engineering/3.4-code-quality/3.4.4.husky.md) · [示例](../../2-examples/03-engineering/3.4-code-quality/3.4.4-husky/README.md) · [独立练习](../../3-exercises/03-engineering/3.4-code-quality/3.4.4.husky.md)

<a id="p-3-4-5"></a>

## 3.4.5 Conventional Commits：写清变更类型、范围与破坏性变化

基于任务板的一次真实副本改动撰写提交说明；若只练习文案无需提交真实仓库，另提供一次破坏性 JSON 协议变化的示范消息。

验收：

- [ ] feat/fix 类型与实际变更一致，描述说明结果
- [ ] 不兼容变更使用 ! 或 BREAKING CHANGE 并说明迁移

[理论](../../1-notes/03-engineering/3.4-code-quality/3.4.5.conventional-commits.md) · [示例](../../2-examples/03-engineering/3.4-code-quality/3.4.5-conventional-commits/README.md) · [独立练习](../../3-exercises/03-engineering/3.4-code-quality/3.4.5.conventional-commits.md)

<a id="p-3-4-6"></a>

## 3.4.6 Git ignore 与 npm 打包：分别核对跟踪范围和发布产物

现有任务板是 private 应用而非待发布库。复制一个无秘密的最小包，在 dry-run 中核对 files 白名单，不把任务板直接 publish。

验收：

- [ ] 说明已跟踪文件为何仍出现在 git ls-files
- [ ] dry-run 产物符合白名单且无 config.demo、源码测试缓存

[理论](../../1-notes/03-engineering/3.4-code-quality/3.4.6..gitignore.md) · [示例](../../2-examples/03-engineering/3.4-code-quality/3.4.6-.gitignore/README.md) · [独立练习](../../3-exercises/03-engineering/3.4-code-quality/3.4.6..gitignore.md)

<a id="p-3-5-1"></a>

## 3.5.1 测试分层：单元、组件与端到端如何配合

为任务板写一页风险—测试层映射；复用已有单元与 E2E，并给尚未连接的真实后台明确标记未验证。

验收：

- [ ] 至少列出一项必须真实浏览器观察的行为
- [ ] mock 与真实后端、视口与真机的证据边界明确

[理论](../../1-notes/03-engineering/3.5-testing-basics/3.5.1.e2e.md) · [示例](../../2-examples/03-engineering/3.5-testing-basics/3.5.1-e2e/README.md) · [独立练习](../../3-exercises/03-engineering/3.5-testing-basics/3.5.1.e2e.md)

<a id="p-3-5-2"></a>

## 3.5.2 Vitest：边界断言、异步失败和依赖替身

现有任务板已有解析测试。副本新增一个未覆盖的导入边界，先写失败测试再修复；新增服务接入需标为扩展，不能假称已有后台。

验收：

- [ ] 失败 Promise 被 await expect(...).rejects 捕获
- [ ] HTTP失败时 json 未调用，成功路径结果保持原协议

[理论](../../1-notes/03-engineering/3.5-testing-basics/3.5.2.vitest.md) · [示例](../../2-examples/03-engineering/3.5-testing-basics/3.5.2-vitest/README.md) · [独立练习](../../3-exercises/03-engineering/3.5-testing-basics/3.5.2.vitest.md)

<a id="p-3-5-3"></a>

## 3.5.3 Vue Test Utils：挂载 Vue 3 组件并验证 props/emits

原生任务板不已有 Vue UI。使用隔离 lab 的 TaskButton 作为组件测试支线，在副本增加 disabled 契约和正常/禁用测试，不给主任务板硬接Vue。

验收：

- [ ] 正常点击发一次合法 id，禁用状态不发事件
- [ ] props 更新后按钮 aria-pressed 正确且挂载被清理

[理论](../../1-notes/03-engineering/3.5-testing-basics/3.5.3.react-testing-library.md) · [示例](../../2-examples/03-engineering/3.5-testing-basics/3.5.3-react-testing-library/README.md) · [独立练习](../../3-exercises/03-engineering/3.5-testing-basics/3.5.3.react-testing-library.md)

<a id="p-3-5-4"></a>

## 3.5.4 Playwright：用可访问定位和条件等待验收用户流程

任务板已有浏览器脚本；副本按现有表单真实标签增加一次失败后纠正成功的流程，在两视口通过，不用固定等待掩盖错误。

验收：

- [ ] 使用 label/role 定位和可重试断言，不使用固定 sleep
- [ ] 390与1440视口的成功/失败恢复流程均可独立重跑

[理论](../../1-notes/03-engineering/3.5-testing-basics/3.5.4.playwright.md) · [示例](../../2-examples/03-engineering/3.5-testing-basics/3.5.4-playwright/README.md) · [独立练习](../../3-exercises/03-engineering/3.5-testing-basics/3.5.4.playwright.md)

<a id="p-3-5-5"></a>

## 3.5.5 覆盖率与测试边界：用报告发现遗漏而非追逐数字

读取任务板自身 coverage 报告，写明实际分母、主要漏测风险；副本新增一个真实边界测试，不套用 lab 的百分比到任务板。

验收：

- [ ] 未import目标模块仍出现在报告分母
- [ ] 能指出一个高覆盖率但错误断言/缺失需求的反例

[理论](../../1-notes/03-engineering/3.5-testing-basics/3.5.5.item-3-5-5.md) · [示例](../../2-examples/03-engineering/3.5-testing-basics/3.5.5-item-3-5-5/README.md) · [独立练习](../../3-exercises/03-engineering/3.5-testing-basics/3.5.5.item-3-5-5.md)
