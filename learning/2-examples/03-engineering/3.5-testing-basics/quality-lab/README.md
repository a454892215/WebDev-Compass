# 阶段3质量与测试实验工程

前置：JavaScript、Promise、Git暂存区、3.1包管理与3.3 TypeScript。先运行纯函数测试，再读最小Vue组件契约，最后进入浏览器流程；完整Vue3与SFC在阶段4学习。此小工程用于3.4–3.5的工具证据，与阶段综合任务板独立，避免把原生任务板误写成已有Vue项目。

## 安装与入口

从仓库根进入：

```bash
cd learning/2-examples/03-engineering/3.5-testing-basics/quality-lab
pnpm install --frozen-lockfile --ignore-scripts
pnpm typecheck
pnpm lint
pnpm format:check
pnpm coverage
pnpm build
pnpm verify:tools
pnpm test:e2e
```

本轮环境Node26.0.0、pnpm11.4.0。package.json固定版本，pnpm-lock.yaml固定解析；TypeScript6.0.3满足typescript-eslint8.74的peer范围<6.1，未盲目使用最新7.x。其他机器先满足engines，按锁文件安装，遇到依赖变化先排查，不直接删锁。

pnpm11的非认证/registry配置放pnpm-workspace.yaml，ignoreScripts:true已用pnpm config get ignoreScripts核验。此前.npmrc写法无效已删除；首次命令显式传--ignore-scripts，后续通过YAML保持相同策略，冻结安装实际通过。11项minimumReleaseAgeExclude是本轮安装对精确版本的自动例外，不能当通用关闭供应链保护的模板。此例不提供全局pnpm配置，不需要在主仓库安装hooks。

Playwright默认复用本机Chrome可执行文件；其他环境用CHROME_PATH指定已有兼容浏览器，或按官方方式安装Playwright浏览器。本轮未下载浏览器。pnpm dev提供127.0.0.1:4203教学页面；E2E脚本自动启动和停止该服务。不绑定公网。

## 文件与观察顺序

1. src/domain.ts：unknown输入解码、纯函数、不可变数组。tests/domain.test.ts检查成功与边界。
2. src/service.ts：注入fetcher，HTTP失败先退出，再解码JSON。tests/service.test.ts是替身证据，不是远端服务器验证。
3. src/TaskButton.ts：defineComponent+h的Vue3最小受控组件；tests/component.test.ts验证props、emits、异步更新与卸载。它没有接入原生页面，避免引入未讲的SFC编译链。
4. index.html、src/main.ts：原生form/label/button/status/list。e2e/tasks.spec.ts在1440与390宽度下验证添加、完成、撤销、文本安全和无溢出。
5. verify-tools.mjs：实际负例与临时Git/npm工程。TypeScript错误、ESLint错误、Prettier差异和错误断言均应返回非零；脚本只有在观察到预期失败后才记通过。

## 工具验证的安全边界

verify:tools只在新建临时Git仓库设置Husky；暂存debugger阻止提交，修复后提交成功，再删除临时仓库。不会改本学习仓库hooksPath，也不提供真实仓库prepare脚本。Git身份只通过单次-c参数，不改用户配置。

临时npm pack --dry-run --json --ignore-scripts核对无敏感内容的DEMO_ONLY文件是否进入产物，没有publish。临时错误测试会清理，.cache为忽略的本地fixture。工具报告写入仓库docs/audits/stage-3-quality-tools.json，以便复核；不是伪造终端网页。

Conventional Commit演示正则仅校验本课程标题子集，不声称解析完整规范。EditorConfig验证通过支持工具Prettier读取，不声称所有IDE均自动生效。

## 本轮实测与未测

2026-11-24：typecheck、lint、14项Vitest、Chrome双视口2项E2E通过。coverage.include仅3个领域/服务/组件文件，语句96.42%、分支93.33%、函数和行100%；main.ts布局和交互另由浏览器检查，不将其排除后数字解释为全工程覆盖率。具体命令与问题修复见docs/audits/stage-3-quality-runtime.json及review.md。

未测：真实手机、多浏览器、生产API、真实发布、编辑器插件UI、屏幕阅读器和学习者独立试学。工具通过不代表业务需求完整或学习者已掌握。

依据：[Modern Web Guidance HTML](https://developer.chrome.com/docs/modern-web-guidance/guides/html/html)、[Vitest](https://vitest.dev/guide/)、[Vue Test Utils](https://test-utils.vuejs.org/guide/)、[Playwright](https://playwright.dev/docs/best-practices)、[pnpm11配置变化](https://pnpm.io/blog/releases/11.0)。核对日期：2026-11-24。
