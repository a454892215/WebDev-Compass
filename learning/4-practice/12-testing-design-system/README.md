# 阶段12：Vue组件包与Nuxt验收工作台

前置阶段3/4/6/7。目标是把组件契约、测试层级、包导出和宿主行为连起来；不是新建通用生产基座，也没有修改web-common或两端宿主仓库。

## 运行顺序

本轮Node26.0.0/pnpm11.4.0，固定Nuxt4.7.0、Vue3.5.46、TS6.0.3、Vite8.3.8、Vitest5.1.1、Playwright1.65.1。项目目录执行：

```bash
pnpm install --frozen-lockfile
pnpm build:ui
pnpm dev
# http://127.0.0.1:4541/
```

库dist是生成产物，不提交；首次安装后先build:ui再dev/typecheck/test。宿主通过workspace包的exports读取dist，不从src别名绕过发布边界。

```bash
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test
pnpm verify:package
pnpm verify:changesets
pnpm build
pnpm test:e2e
# 本地CI入口（包括上述必要检查及生产E2E）：
pnpm run check:ci
```

test:e2e前须build，自动启动生产Node/后台Chrome并在结束关闭。默认macOS Chrome，可用CHROME_PATH指定已安装浏览器；没有可用浏览器时按官方准备，不把project名称当多引擎实测。

## 实际目录与依赖

- lib/src：原生button封装UiButton、显式label/hint/error/v-model的UiField及用于摇树验证的UnusedWidget。组件不依赖Nuxt自动导入、路由或私有身份。
- lib/vite.config.ts：ESM library mode、external Vue与CSS抽取；vue-tsc生成公开声明。lib/package.json约定exports、files、CSS sideEffects及Vue peer。
- lib/dist：可重新生成的JS/CSS/types；主Nuxt与临时tgz消费者分别验证。小型workspace只为一个库和宿主，团队级多包任务图另在阶段13深化。
- app：表单校验/安全文本、原生dialog、日间与RTL夜间/伪本地化状态。草稿只在当前页面内存，无后端保存。
- server/api/profile：按当前请求Cookie选择固定合成A/B/访客DTO；fixtures只读，reads是三个有限键的公开教学计数。无真实登录/账号/持久化或生产权限，实际业务要另设计。
- tests/unit：对dist组件公共行为、字段关联、安全SSR文本及校验边界的4项测试。
- tests/e2e：两视口真实交互/axe/SSR接管/主题，以及原始并发A/B响应隔离。
- scripts/verify-package.mjs：真实pnpm pack，临时解包到消费者，从公开入口构建、校验类型和样式，并验证未用导出缺席。临时目录结束删除。
- scripts/verify-changesets.mjs：真实CLI3.0.3临时workspace version演练，仅1.0.0→1.0.1/changelog，不改变主库0.1.0，不publish/tag/push。

## 契约与证据边界

UiButton默认type=button，禁用是原生disabled，slot与原生attrs/click透传；dialog关闭的form按钮需显式type=submit。UiField把非props attrs送到真实input，并自己维护id/label/错误描述关联；不是全功能表单框架。用户传入的额外描述需按未来API另设计，不能无意覆盖内部关联。

主请求数据用useAsyncData稳定key与useRequestFetch，SSR给出有效初始内容并通过payload接管。本轮浏览器可交互后服务端reads.a只增1、浏览器/api/profile请求0；另原始HTTP并发A/B响应分别含自己的DTO、无原Cookie、private/no-store。reads不是生产观测后端，也不是全局currentUser。

Vue peer ^3.5.0是声明范围，实际测试仅3.5.46/Nuxt4.7；本轮检查库JS仍external Vue、工作区真实Vue路径一致。没有保证全部版本/构建器、CJS或UMD。Vite抽出单个style.css后需显式导入，sideEffects不负责自动加载样式；真实漏样式构建负例不输出CSS。

默认、禁用、错误与对话框键盘/焦点分别由合适层级检查。axe只跑声明状态，不是完整WCAG或屏幕阅读器认证；同机Chrome的390/1440视口不是真机或两种浏览器。

## 四部分与独立实验

[理论](../../1-notes/12-testing-design-system/README.md) → [示例](../../2-examples/12-testing-design-system/README.md) → [独立练习](../../3-exercises/12-testing-design-system/README.md) → [24项任务](./tasks.md)。

- strategy-lab（4542）：真实本地HTTP/schema契约、已审PNG匹配/变化、手工mutation、两shard。没有Pact SDK/Broker、Stryker、SaaS或Testcontainers运行。
- specialized-lab（4543）：真实axe标签正反、键盘/dialog、pseudo/RTL、产物膨胀预算负例。LHCI/读屏/Firefox/WebKit/BrowserStack仅观察或配置，未跑。
- storybook-lab（4544）：Storybook10.6.9真实共享UiButton源码故事/play，StyleDictionary5.8本地token→CSS/JS/types，CSR CustomElement。不是包dist消费、Figma同步、多框架或SSR CustomElement认证。

[测试范围与运行边界](./docs/TESTING.md) · [阶段验收](../../../docs/audits/STAGE_12_ACCEPTANCE.md)。所有服务loopback，无真实数据或远程发布；未恢复Colima、创建云资源、下载新浏览器或操控前台。
