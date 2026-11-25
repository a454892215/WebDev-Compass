# 阶段13逐知识点综合任务

先读[主workspace](./README.md)和[工程边界](./docs/PLATFORM.md)，再做隔离变体。28项区分主实际pnpm/Turbo/Nuxt/Vite、独立发布/构建/兼容/DX实验、官方观察和待扩展；不把工具名、dry计划、单机测试当远程平台交付。

<a id="p-13-1-1"></a>

## 13.1.1 pnpm、Turborepo与Nx：按任务和团队规模选择

主实际包/任务图、反向依赖selector与本地cache；Nx、SCM --affected、远程缓存未运行。

运行主pnpm build与verify:graph，将包关系和任务依赖画成两张图；给当前两个教学应用说明为何共享core，并写不采用Nx的本轮理由。

验收：

- [ ] 能区分包管理、任务编排与团队治理，主图含core前置且三实际任务通过。
- [ ] Nx/remoteCI未运行明确；不把教学workspace解释为必须迁现有三个独立生产仓库。

[理论](../../1-notes/13-platform/13.1-monorepo/13.1.1.turborepo-nx.md) · [示例](../../2-examples/13-platform/13.1-monorepo/13.1.1.turborepo-nx-demo.md) · [练习](../../3-exercises/13-platform/13.1-monorepo/13.1.1.turborepo-nx.md)

<a id="p-13-1-2"></a>

## 13.1.2 依赖图与受影响构建：变更范围、前置与反向依赖

主实际包/任务图、反向依赖selector与本地cache；Nx、SCM --affected、远程缓存未运行。

用主graph与依赖selector生成一次影响说明，核对根测试工具也声明core；新增SCM自动选择作为独立扩展并记录baseline条件。

验收：

- [ ] 列清依赖图、任务图、SCM变更集合；selector实际输出与声明范围一致。
- [ ] CI缺基线/历史或共享配置变化时有保守全量策略，未运行SCM时明确标注。

[理论](../../1-notes/13-platform/13.1-monorepo/13.1.2.item-13-1-2.md) · [示例](../../2-examples/13-platform/13.1-monorepo/13.1.2.item-13-1-2-demo.md) · [练习](../../3-exercises/13-platform/13.1-monorepo/13.1.2.item-13-1-2.md)

<a id="p-13-1-3"></a>

## 13.1.3 远程缓存：输入完整性、权限与产物信任

主实际包/任务图、反向依赖selector与本地cache；Nx、SCM --affected、远程缓存未运行。

运行主verify:graph并保存localCache五项证据，再给未来远程缓存写接入/访问/签名/撤销与日志清理清单；未接远程不标通过。

验收：

- [ ] warm hit时确有产物恢复，环境/源变化必须miss，不只看“cached”字样。
- [ ] remote权限/secret/日志与签名职责分开，远程未接入和同机证据边界明确。

[理论](../../1-notes/13-platform/13.1-monorepo/13.1.3.remote-cache.md) · [示例](../../2-examples/13-platform/13.1-monorepo/13.1.3.remote-cache-demo.md) · [练习](../../3-exercises/13-platform/13.1-monorepo/13.1.3.remote-cache.md)

<a id="p-13-1-4"></a>

## 13.1.4 workspace协议：本地包、公开入口与打包版本

主实际包/任务图、反向依赖selector与本地cache；Nx、SCM --affected、远程缓存未运行。

检查主三个消费者的workspace声明、core公开导出与构建前置；用13.2实际tgz记录说明协议改写，而不是给workspace包直接上线。

验收：

- [ ] 依赖声明、本地解析与exports/dist三者对齐，干净安装不依赖偶然提升包。
- [ ] 将声明范围/打包版本/registry发布区分，未发布不伪造下载或安装记录。

[理论](../../1-notes/13-platform/13.1-monorepo/13.1.4.workspace.md) · [示例](../../2-examples/13-platform/13.1-monorepo/13.1.4.workspace-demo.md) · [练习](../../3-exercises/13-platform/13.1-monorepo/13.1.4.workspace.md)

<a id="p-13-1-5"></a>

## 13.1.5 跨层依赖门禁：从约定到可失败的检查

主实际包/任务图、反向依赖selector与本地cache；Nx、SCM --affected、远程缓存未运行。

执行主boundary与单测，给core新增越界负例并恢复；再比较13.5真实ESLint规则，说明两者范围与接入成本。

验收：

- [ ] 实际违规返回非零，注释中的假import不触发；相对逃逸/未声明/动态specifier分别验证。
- [ ] 说明当前gate范围与未覆盖别名/完整SFC，不把最小检查说成全面架构或安全证明。

[理论](../../1-notes/13-platform/13.1-monorepo/13.1.5.enforcement.md) · [示例](../../2-examples/13-platform/13.1-monorepo/13.1.5.enforcement-demo.md) · [练习](../../3-exercises/13-platform/13.1-monorepo/13.1.5.enforcement.md)

<a id="p-13-1-6"></a>

## 13.1.6 Android多Module与Melos对照：共用概念与Web差异

主实际包/任务图、反向依赖selector与本地cache；Nx、SCM --affected、远程缓存未运行。

为主workspace写移动端对照表与“不选Monorepo”的备选方案，引用真实graph和实际输出路径，不用类比替代Web验证。

验收：

- [ ] 图能分清源包、输出和部署应用，依赖箭头与真实graph一致。
- [ ] 有明确不适用条件，不能以学习示例为由合并用户原有独立Git项目。

[理论](../../1-notes/13-platform/13.1-monorepo/13.1.6.monorepo-android-gradle-module-melos.md) · [示例](../../2-examples/13-platform/13.1-monorepo/13.1.6.monorepo-android-gradle-module-melos-demo.md) · [练习](../../3-exercises/13-platform/13.1-monorepo/13.1.6.monorepo-android-gradle-module-melos.md)

<a id="p-13-2-1"></a>

## 13.2.1 Changesets多包版本：依赖联动、Changelog与发布职责

真实Changesets/pack/锁/catalog/override在独立release-lab；registry/Bot/semantic-release/远程发布未运行。

在主workspace副本画出两个host及根工具→core的包依赖、core变更对消费者的影响与发布职责，结合独立lab的core major/widget patch记录写迁移说明。主项目没有现成发布平台，不把独立fixture版本当主包已升版。

验收：

- [ ] 保存core/widget的实际版本、依赖范围及changelog，区分声明意图、生成版本与远程发布。
- [ ] 解释为何本例widget是patch而core是major；不把“内部依赖变了”一律当所有包major。

[理论](../../1-notes/13-platform/13.2-release-deps/13.2.1.changesets.md) · [示例](../../2-examples/13-platform/13.2-release-deps/13.2.1.changesets-demo.md) · [练习](../../3-exercises/13-platform/13.2-release-deps/13.2.1.changesets.md)

<a id="p-13-2-2"></a>

## 13.2.2 内部npm包交付：scope、registry、权限与可回退产物

真实Changesets/pack/锁/catalog/override在独立release-lab；registry/Bot/semantic-release/远程发布未运行。

为主core包写交接表，将“主core打包待在隔离副本新增验证、独立widget的pack已测、registry待接”分别列出：scope、registry、读写角色、归档检查、旧版本保留与回退。选择是否需要registry并说明成本，不搭建新服务。

验收：

- [ ] 区分pack成功与发布/安装授权成功，列明实际未运行Verdaccio/Artifactory/GitHub Packages。
- [ ] 为回退保留已知锁文件/版本/构建产物；不建议覆盖同一已发布版本或把unpublish当普通回退。

[理论](../../1-notes/13-platform/13.2-release-deps/13.2.2.npm.md) · [示例](../../2-examples/13-platform/13.2-release-deps/13.2.2.npm-demo.md) · [练习](../../3-exercises/13-platform/13.2-release-deps/13.2.2.npm.md)

<a id="p-13-2-3"></a>

## 13.2.3 依赖更新Bot：分组、兼容评审与可验证回退

真实Changesets/pack/锁/catalog/override在独立release-lab；registry/Bot/semantic-release/远程发布未运行。

为主Nuxt/Vite/core写升级分组与major playbook，列最小类型/构建/双host/SSR验证及回退锁文件/产物。Bot接入另行授权，当前只用模板和本地策略实验。

验收：

- [ ] 至少一例minor因peer或行为变化仍需人工迁移，至少一例安全修复保留关键验证。
- [ ] 回退同时说明锁文件、运行产物、数据兼容与forward fix，不仅“git checkout旧package.json”。

[理论](../../1-notes/13-platform/13.2-release-deps/13.2.3.renovate-dependabot.md) · [示例](../../2-examples/13-platform/13.2-release-deps/13.2.3.renovate-dependabot-demo.md) · [练习](../../3-exercises/13-platform/13.2-release-deps/13.2.3.renovate-dependabot.md)

<a id="p-13-2-4"></a>

## 13.2.4 锁文件政策：固定工具、冻结安装与供应链检查边界

真实Changesets/pack/锁/catalog/override在独立release-lab；registry/Bot/semantic-release/远程发布未运行。

核对主packageManager、pnpm-workspace.yaml、锁文件与CI入口，说明哪些命令允许开发更新、哪些必须冻结；在独立lab复现明确锁错误，别破坏主锁。

验收：

- [ ] 冻结负例必须是明确锁配置/manifest错误，而非DNS、超时或下载失败。
- [ ] 恢复后冻结成功且锁不被暗改；区分开发重解析、CI拒绝、缓存与安全策略。

[理论](../../1-notes/13-platform/13.2-release-deps/13.2.4.lockfile.md) · [示例](../../2-examples/13-platform/13.2-release-deps/13.2.4.lockfile-demo.md) · [练习](../../3-exercises/13-platform/13.2-release-deps/13.2.4.lockfile.md)

<a id="p-13-2-5"></a>

## 13.2.5 Catalog与Override：统一意图、实际解析与兼容责任

真实Changesets/pack/锁/catalog/override在独立release-lab；registry/Bot/semantic-release/远程发布未运行。

读取主workspace的实际catalog和依赖引用，画“声明范围→锁解析→运行验证”链；如果提出override，附问题/测试/到期移除记录，无需求不新增生产override。

验收：

- [ ] 分别展示catalog解析与普通依赖override结果，主声明/锁/实际解析三者不混淆。
- [ ] 每条override有退出条件和兼容验证；不能以安装成功、去重或版本号相同替代SSR/功能回归。

[理论](../../1-notes/13-platform/13.2-release-deps/13.2.5.catalog-override.md) · [示例](../../2-examples/13-platform/13.2-release-deps/13.2.5.catalog-override-demo.md) · [练习](../../3-exercises/13-platform/13.2-release-deps/13.2.5.catalog-override.md)

<a id="p-13-3-1"></a>

## 13.3.1 Module Federation故障定位：远程入口、共享版本与发布缓存

真实Vite插件、显式cache、ESM/CJS/types在build-lab；主core仅ESM，MF/esbuild/SWC为官方观察。

给主多包项目写一份“继续workspace包还是新增MF”的取舍，列独立部署收益、远程信任和失败回退成本。主没有MF；如选择新增，在隔离副本按官方插件建立真正remote/host，再取自己的证据。

验收：

- [ ] 正确区分静态包、普通dynamic import与MF container/share协商，不把本地JSON审查说成运行MF。
- [ ] 诊断至少覆盖入口/manifest/expose/shared/cache五类，列出fallback负责人和不放宽安全策略的处理。

[理论](../../1-notes/13-platform/13.3-build-advanced/13.3.1.module-federation.md) · [示例](../../2-examples/13-platform/13.3-build-advanced/13.3.1.module-federation-demo.md) · [练习](../../3-exercises/13-platform/13.3-build-advanced/13.3.1.module-federation.md)

<a id="p-13-3-2"></a>

## 13.3.2 Vite插件最小闭环：虚拟模块、构建钩子与公开Manifest

真实Vite插件、显式cache、ESM/CJS/types在build-lab；主core仅ESM，MF/esbuild/SWC为官方观察。

给主Vite preview在隔离副本新增一个公开版本虚拟模块；使用本lab验证精确id/公开字段/产物清单，再核SSR或开发需要哪些额外钩子。主是否已有插件先查源码，不假设已接入本插件。

验收：

- [ ] 真实build和页面显示相同公开label，audit包含JS产物，未知virtual id不被插件接管。
- [ ] 不透传环境秘密；说明generateBundle并非dev每请求hook，源码变换的map要求另列。

[理论](../../1-notes/13-platform/13.3-build-advanced/13.3.2.custom-webpack-vite-plugin.md) · [示例](../../2-examples/13-platform/13.3-build-advanced/13.3.2.custom-webpack-vite-plugin-demo.md) · [练习](../../3-exercises/13-platform/13.3-build-advanced/13.3.2.custom-webpack-vite-plugin.md)

<a id="p-13-3-3"></a>

## 13.3.3 转换器、打包器与类型检查：Vite8/Rolldown/Oxc及esbuild/SWC

真实Vite插件、显式cache、ESM/CJS/types在build-lab；主core仅ESM，MF/esbuild/SWC为官方观察。

为主Nuxt/Vite与core包画“源码→框架编译/转换→打包→声明/类型→运行”工具链图，按实际版本标角色；列一条类型错误不能被build绿色掩盖的门禁。

验收：

- [ ] 复现Vite发出JS而tsc拒绝TS2322，明确这是隔离负例，不把坏源码放主应用。
- [ ] 工具图使用当前Vite8/Rolldown/Oxc事实，esbuild/SWC仅读官方未执行如实标注。

[理论](../../1-notes/13-platform/13.3-build-advanced/13.3.3.esbuild-swc.md) · [示例](../../2-examples/13-platform/13.3-build-advanced/13.3.3.esbuild-swc-demo.md) · [练习](../../3-exercises/13-platform/13.3-build-advanced/13.3.3.esbuild-swc.md)

<a id="p-13-3-4"></a>

## 13.3.4 持久产物缓存与构建测量：键、输出恢复和失效证据

真实Vite插件、显式cache、ESM/CJS/types在build-lab；主core仅ESM，MF/esbuild/SWC为官方观察。

给主多包pipeline检查inputs/outputs/env：真实删除core输出后再命中恢复，改其源应影响消费者；对照本lab的局部cache结果，不能假称已验证Vite内部或远程缓存。

验收：

- [ ] 记录冷/暖定义、环境和实际hit/输出恢复，源/配置变更与损坏都不会错误复用。
- [ ] 注明固定输入清单与信任范围，计时仅本地样本，不作普适倍数加速承诺。

[理论](../../1-notes/13-platform/13.3-build-advanced/13.3.4.persistent-cache.md) · [示例](../../2-examples/13-platform/13.3-build-advanced/13.3.4.persistent-cache-demo.md) · [练习](../../3-exercises/13-platform/13.3-build-advanced/13.3.4.persistent-cache.md)

<a id="p-13-3-5"></a>

## 13.3.5 库模式双格式与声明：真实import、require和类型消费者

真实Vite插件、显式cache、ESM/CJS/types在build-lab；主core仅ESM，MF/esbuild/SWC为官方观察。

核主core当前真实导出格式及类型，记录只ESM还是双格式；用本lab单独完成ESM/CJS消费者演练。若业务只需要ESM，解释不额外维护CJS的收益。

验收：

- [ ] Node import与require分别消费实际.mjs/.cjs公开入口，.mts/.cts类型检查均有真实证据。
- [ ] 声明生成与JS输出分开，写清当前无相对声明图限制；不把链接消费说成npm发布。

[理论](../../1-notes/13-platform/13.3-build-advanced/13.3.5.library-mode.md) · [示例](../../2-examples/13-platform/13.3-build-advanced/13.3.5.library-mode-demo.md) · [练习](../../3-exercises/13-platform/13.3-build-advanced/13.3.5.library-mode.md)

<a id="p-13-4-1"></a>

## 13.4.1 Browserslist与Vite目标：查询策略、转译和legacy分开

兼容lab与主各有有限证据；能力缺失注入不是旧浏览器，其他引擎/真机/物理打印未测。

为主多包工程列支持策略→各工具配置→实际证据链，核对主Vite/Nuxt配置；若接legacy需作为新增集成并补生产产物和浏览器回归。

验收：

- [ ] 保存真实查询及数据库/工具版本，非法query失败；不将解析结果标成多浏览器通过。
- [ ] 能指出Vite普通build不会仅因.browserslistrc自动实现相同语法/API兼容；未跑legacy保持未执行。

[理论](../../1-notes/13-platform/13.4-browser-compat/13.4.1.browserslist.md) · [示例](../../2-examples/13-platform/13.4-browser-compat/13.4.1.browserslist-demo.md) · [练习](../../3-exercises/13-platform/13.4-browser-compat/13.4.1.browserslist.md)

<a id="p-13-4-2"></a>

## 13.4.2 按需Polyfill与本地回退：先判能力和可信来源

兼容lab与主各有有限证据；能力缺失注入不是旧浏览器，其他引擎/真机/物理打印未测。

检查主宿主增强是否需要完整API兼容，先用最低复杂度的业务回退；任何新polyfill写清依据/锁版本/失败状态，不让示例远程注入成为默认架构。

验收：

- [ ] 原生不加载模块，缺失分支仅加载本地模块，失败保留基础内容。
- [ ] 清楚区分这个业务fallback与完整规范polyfill，未接远程脚本也不声称已审所有第三方。

[理论](../../1-notes/13-platform/13.4-browser-compat/13.4.2.polyfill.md) · [示例](../../2-examples/13-platform/13.4-browser-compat/13.4.2.polyfill-demo.md) · [练习](../../3-exercises/13-platform/13.4-browser-compat/13.4.2.polyfill.md)

<a id="p-13-4-3"></a>

## 13.4.3 渐进增强与优雅降级：先明确基线任务

兼容lab与主各有有限证据；能力缺失注入不是旧浏览器，其他引擎/真机/物理打印未测。

在主Nuxt的无JS路径核对实际SSR正文/原生details，定义当前被验证的基线任务；业务交互需要JS的部分另列，不能把SSR有HTML当整应用无JS可用。

验收：

- [ ] 使用真实禁JS上下文保留正文及可操作details，记录具体功能而非只截屏。
- [ ] 给出增强失败的可观察状态与基线任务边界，不宣称未实现的后端流程。

[理论](../../1-notes/13-platform/13.4-browser-compat/13.4.3.progressive-enhancement.md) · [示例](../../2-examples/13-platform/13.4-browser-compat/13.4.3.progressive-enhancement-demo.md) · [练习](../../3-exercises/13-platform/13.4-browser-compat/13.4.3.progressive-enhancement.md)

<a id="p-13-4-4"></a>

## 13.4.4 Support Matrix：支持承诺、计划与实测证据分栏

兼容lab与主各有有限证据；能力缺失注入不是旧浏览器，其他引擎/真机/物理打印未测。

为主Nuxt+预览宿主分别建立目标/已测/待测表，并给兼容问题标基线、增强或不支持的实际决策。

验收：

- [ ] 版本/OS/视口/引擎/日期与证据路径可核，模拟和实际设备明确区分。
- [ ] 未测目标保持待验，不以Browserslist、project名称或UA字符串替代真实运行。

[理论](../../1-notes/13-platform/13.4-browser-compat/13.4.4.support-matrix.md) · [示例](../../2-examples/13-platform/13.4-browser-compat/13.4.4.support-matrix-demo.md) · [练习](../../3-exercises/13-platform/13.4-browser-compat/13.4.4.support-matrix.md)

<a id="p-13-4-5"></a>

## 13.4.5 Feature Detection：检测具体能力，别把UA当授权

兼容lab与主各有有限证据；能力缺失注入不是旧浏览器，其他引擎/真机/物理打印未测。

检查主宿主的增强能力判断是否根据实际API及安全上下文，并为缺失/调用失败补任务；任何UA例外需有具体bug依据、范围与移除日期。

验收：

- [ ] UA伪装不影响相同宿主能力决策，缺失注入触发明确回退而非假旧浏览器结论。
- [ ] 至少指出一种存在但调用仍失败的场景，并给出错误恢复而非授权绕过。

[理论](../../1-notes/13-platform/13.4-browser-compat/13.4.5.feature-detection.md) · [示例](../../2-examples/13-platform/13.4-browser-compat/13.4.5.feature-detection-demo.md) · [练习](../../3-exercises/13-platform/13.4-browser-compat/13.4.5.feature-detection.md)

<a id="p-13-4-6"></a>

## 13.4.6 CSS @supports与JS能力检查：各管各层，保留默认样式

兼容lab与主各有有限证据；能力缺失注入不是旧浏览器，其他引擎/真机/物理打印未测。

在主宿主选择一个装饰/布局增强，写默认样式与@supports覆盖，记录实际computed/窄屏结果；JS能力门禁单列。

验收：

- [ ] 合法/非法CSS.supports与最终computed分别记录；增强不生效时有基础display规则。
- [ ] 390视口无溢出，打印另有可解释布局；不以supports true替代视觉或键盘证据。

[理论](../../1-notes/13-platform/13.4-browser-compat/13.4.6.supports.md) · [示例](../../2-examples/13-platform/13.4-browser-compat/13.4.6.supports-demo.md) · [练习](../../3-exercises/13-platform/13.4-browser-compat/13.4.6.supports.md)

<a id="p-13-4-7"></a>

## 13.4.7 Print CSS：打印媒体、折叠内容与PDF边界

兼容lab与主各有有限证据；能力缺失注入不是旧浏览器，其他引擎/真机/物理打印未测。

为主宿主中适合导出的内容补打印任务与数据范围；基础设施/构建报告的真实导出作为新增，不假设主已具备PDF接口。

验收：

- [ ] 真实print媒体computed与PDF生成分别有证据，保留正文且不含无关操作区域。
- [ ] 指出长表/分页/真实打印与隐私未验范围，不把一个PDF头当完全排版通过。

[理论](../../1-notes/13-platform/13.4-browser-compat/13.4.7.print-css.md) · [示例](../../2-examples/13-platform/13.4-browser-compat/13.4.7.print-css-demo.md) · [练习](../../3-exercises/13-platform/13.4-browser-compat/13.4.7.print-css.md)

<a id="p-13-5-1"></a>

## 13.5.1 共享ESLint Flat Config：规则包、作用域与升级契约

DX lab真实ESLint/AST/安全generator/pack消费；VSCode仅静态审查，主未直接集成所有lab工具。

为主多包工程写共享配置职责与宿主覆盖位置，在隔离副本引入本lab配置/相应TS解析方案；主已有边界gate与本labESLint规则分开，不假称自动接入。

验收：

- [ ] 实际calculateConfigForFile和lintText均证明目标目录生效，其他目录不被误套同一约束。
- [ ] 真实tarball包含配置及rule文件，可解包消费；记录声明peer与仅当前版本实测、未发布。

[理论](../../1-notes/13-platform/13.5-dx/13.5.1.eslint-config.md) · [示例](../../2-examples/13-platform/13.5-dx/13.5.1.eslint-config-demo.md) · [练习](../../3-exercises/13-platform/13.5-dx/13.5.1.eslint-config.md)

<a id="p-13-5-2"></a>

## 13.5.2 自定义ESLint规则：从AST节点到可验证架构边界

DX lab真实ESLint/AST/安全generator/pack消费；VSCode仅静态审查，主未直接集成所有lab工具。

将主core→app禁止方向与本lab规则支持的语法列成对照表；新增主工程需要的解析/别名能力前，先为绕过和误报写可复现测试。

验收：

- [ ] 至少覆盖静态导入、re-export、字面量动态导入与相似合法名字，断言messageId。
- [ ] 报告明确禁止方向且不提供危险fix；对计算导入/别名等无法证明处写限制。

[理论](../../1-notes/13-platform/13.5-dx/13.5.2.eslint.md) · [示例](../../2-examples/13-platform/13.5-dx/13.5.2.eslint-demo.md) · [练习](../../3-exercises/13-platform/13.5-dx/13.5.2.eslint.md)

<a id="p-13-5-3"></a>

## 13.5.3 jscodeshift AST迁移：保留绑定、别名与幂等

DX lab真实ESLint/AST/安全generator/pack消费；VSCode仅静态审查，主未直接集成所有lab工具。

为主core一个假设公开API更名编写小范围迁移计划，以本lab的binding/alias/type/幂等fixture为最小门槛；不直接批量改主源码或旧阶段。

验收：

- [ ] 其他模块、局部shadow、对象键与type-only import保持；value import正确变为newTitle as原local。
- [ ] 真实CLI转换和第二次结果稳定，非法语法使门禁非零；不把解析失败算成功迁移。

[理论](../../1-notes/13-platform/13.5-dx/13.5.3.codemod.md) · [示例](../../2-examples/13-platform/13.5-dx/13.5.3.codemod-demo.md) · [练习](../../3-exercises/13-platform/13.5-dx/13.5.3.codemod.md)

<a id="p-13-5-4"></a>

## 13.5.4 安全项目生成器：明确输入、拒绝覆盖与可重复模板

DX lab真实ESLint/AST/安全generator/pack消费；VSCode仅静态审查，主未直接集成所有lab工具。

为主多包样例新增app模板提出安全生成方案和待验清单，先只在temp演练；本lab不替用户建立新的生产宿主仓库。

验收：

- [ ] 已有目录/symlink与所有非法名称拒绝，sentinel仍在；正常输出可解析且没有隐式install/Git。
- [ ] 说明可信根目录/并发攻击未覆盖，失败只回收本次拥有的目录；输入不进入shell。

[理论](../../1-notes/13-platform/13.5-dx/13.5.4.cli.md) · [示例](../../2-examples/13-platform/13.5-dx/13.5.4.cli-demo.md) · [练习](../../3-exercises/13-platform/13.5-dx/13.5.4.cli.md)

<a id="p-13-5-5"></a>

## 13.5.5 VS Code多根工作区：推荐扩展、设置与Snippet边界

DX lab真实ESLint/AST/安全generator/pack消费；VSCode仅静态审查，主未直接集成所有lab工具。

为主Nuxt/Vite与共享包准备一份多根工作区评审说明及必要推荐扩展，保留CLI门禁；本组仅配置模板，不修改用户全局编辑器配置。

验收：

- [ ] 两个根路径按文件所在位置解析正确，清楚区分窗口聚合与Git/pnpm管理。
- [ ] snippet scope/type/placeholder正确，知道需放.vscode；扩展推荐/编辑器展开尚未实测。

[理论](../../1-notes/13-platform/13.5-dx/13.5.5.vs-code.md) · [示例](../../2-examples/13-platform/13.5-dx/13.5.5.vs-code-demo.md) · [练习](../../3-exercises/13-platform/13.5-dx/13.5.5.vs-code.md)
