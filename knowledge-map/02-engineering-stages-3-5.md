<a id="阶段-35工程层"></a>

# 阶段 3–5：TypeScript、Vue/Nuxt 与 API 认证

> TypeScript 与构建测试 · Vue 3 + Nuxt · API、登录与授权\
> [← 01-foundation](./01-foundation-stages-0-2.md) · [← 返回总览](../KNOWLEDGE_MAP.md) · [下一部分 →](./03-application-stages-6-7.md)

---

<a id="阶段-3工程化与-typescript"></a>

## 阶段 3：TypeScript、Vite、代码检查与测试

> 前置：已能编写基础 HTML/CSS/JavaScript，并理解模块和异步请求。产出：可运行、可构建的 TypeScript 小工程。验收：依赖与锁文件可复现，类型/格式/必要单元测试能独立运行；默认用 pnpm 与 Vite/Nuxt 工具链；npm 用于理解通用命令与初始化入口，Yarn/Webpack 只作按需对照，不要求精通全部工具。学习顺序及选修规则见[学习路径](../docs/LEARNING_PATH.md)。



<a id="31-包管理与项目结构"></a>

### 3.1 package.json、pnpm、锁文件与项目目录

- [ ] [3.1.1 `package.json`：dependencies vs devDependencies、`scripts`、`engines`](../learning/1-notes/03-engineering/3.1-package-management/3.1.1.package.json.md)
- [ ] [3.1.2 **npm / yarn / pnpm** 常用命令：install、run、publish、workspace](../learning/1-notes/03-engineering/3.1-package-management/3.1.2.npm-yarn-pnpm.md)
- [ ] [3.1.3 **语义化版本**（SemVer）：`^`、`~`、锁定版本](../learning/1-notes/03-engineering/3.1-package-management/3.1.3.item-3-1-3.md)
- [ ] [3.1.4 `package-lock.json` / `yarn.lock` / `pnpm-lock.yaml` 的作用](../learning/1-notes/03-engineering/3.1-package-management/3.1.4.package-lock.json.md)
- [ ] [3.1.5 **monorepo** 概念（了解 Lerna、Turborepo、pnpm workspace）](../learning/1-notes/03-engineering/3.1-package-management/3.1.5.monorepo.md)
- [ ] [3.1.6 常见项目目录结构约定（`src/`、`public/`、`dist/`、`tests/`）](../learning/1-notes/03-engineering/3.1-package-management/3.1.6.src.md)



<a id="32-构建工具"></a>

### 3.2 Vite 开发服务器与生产构建（Webpack 选读）

- [ ] [3.2.1 为什么需要构建工具：模块化、转译、打包、压缩、HMR](../learning/1-notes/03-engineering/3.2-build-tools/3.2.1.hmr.md)
- [ ] [3.2.2 **Vite**：项目创建、配置、`index.html` 入口、环境变量（`.env`）](../learning/1-notes/03-engineering/3.2-build-tools/3.2.2.vite.md)
- [ ] [3.2.3 **Webpack** 核心概念（了解）：entry、output、loader、plugin、HMR](../learning/1-notes/03-engineering/3.2-build-tools/3.2.3.webpack.md)
- [ ] [3.2.4 开发服务器与热更新（HMR）原理](../learning/1-notes/03-engineering/3.2-build-tools/3.2.4.hmr.md)
- [ ] [3.2.5 生产构建：代码分割（Code Splitting）、Tree Shaking、压缩](../learning/1-notes/03-engineering/3.2-build-tools/3.2.5.code-splitting-tree-shaking.md)
- [ ] [3.2.6 Source Map 的作用与类型](../learning/1-notes/03-engineering/3.2-build-tools/3.2.6.source-map.md)
- [ ] [3.2.7 📱 移动端对照：Web 构建与 Gradle、Xcode、Metro 的职责差异](../learning/1-notes/03-engineering/3.2-build-tools/3.2.7.vite-webpack-gradle-xcode-build.md)



<a id="33-typescript"></a>

### 3.3 TypeScript 类型、泛型与 tsconfig

- [ ] [3.3.1 为什么使用 TypeScript：类型安全、IDE 支持、可维护性](../learning/1-notes/03-engineering/3.3-typescript/3.3.1.typescript-ide.md)
- [ ] [3.3.2 基础类型：`string`、`number`、`boolean`、`array`、`tuple`、`enum`、`any`、`unknown`、`void`、`never`](../learning/1-notes/03-engineering/3.3-typescript/3.3.2.string.md)
- [ ] [3.3.3 接口（`interface`）与类型别名（`type`）](../learning/1-notes/03-engineering/3.3-typescript/3.3.3.interface.md)
- [ ] [3.3.4 联合类型与交叉类型](../learning/1-notes/03-engineering/3.3-typescript/3.3.4.item-3-3-4.md)
- [ ] [3.3.5 泛型：函数泛型、约束（`extends`）、常用工具类型（`Partial`、`Pick`、`Omit`、`Record`）](../learning/1-notes/03-engineering/3.3-typescript/3.3.5.extends.md)
- [ ] [3.3.6 类型断言与类型守卫（`typeof`、`instanceof`、自定义守卫）](../learning/1-notes/03-engineering/3.3-typescript/3.3.6.typeof.md)
- [ ] [3.3.7 函数类型：参数、返回值、可选参数、默认参数](../learning/1-notes/03-engineering/3.3-typescript/3.3.7.item-3-3-7.md)
- [ ] [3.3.8 类与访问修饰符：`public`、`private`、`protected`、`readonly`](../learning/1-notes/03-engineering/3.3-typescript/3.3.8.public.md)
- [ ] [3.3.9 模块与声明文件（`.d.ts`）](../learning/1-notes/03-engineering/3.3-typescript/3.3.9..d.ts.md)
- [ ] [3.3.10 `tsconfig.json` 核心配置：`strict`、`target`、`module`、`paths`（路径别名）](../learning/1-notes/03-engineering/3.3-typescript/3.3.10.tsconfig.json.md)
- [ ] [3.3.11 Vue 组件与 composables 的 TS 类型（Props、事件、返回值）；React 类型为选修对照，阶段 4 深化](../learning/1-notes/03-engineering/3.3-typescript/3.3.11.react-vue-ts-props.md)
- [ ] [3.3.12 📱 移动端对照：TypeScript 与 Dart、Kotlin 类型及空安全的差异](../learning/1-notes/03-engineering/3.3-typescript/3.3.12.typescript-dart-kotlin.md)



<a id="34-代码质量"></a>

### 3.4 ESLint、Prettier 与 Git 提交检查

- [ ] [3.4.1 **ESLint**：规则配置、`eslint-config`、与编辑器集成](../learning/1-notes/03-engineering/3.4-code-quality/3.4.1.eslint.md)
- [ ] [3.4.2 **Prettier**：格式化与 ESLint 协作](../learning/1-notes/03-engineering/3.4-code-quality/3.4.2.prettier.md)
- [ ] [3.4.3 **EditorConfig**](../learning/1-notes/03-engineering/3.4-code-quality/3.4.3.editorconfig.md)
- [ ] [3.4.4 **Husky** + **lint-staged**：提交前检查](../learning/1-notes/03-engineering/3.4-code-quality/3.4.4.husky.md)
- [ ] [3.4.5 **Conventional Commits** 提交规范](../learning/1-notes/03-engineering/3.4-code-quality/3.4.5.conventional-commits.md)
- [ ] [3.4.6 `.gitignore` 与 `.npmignore`](../learning/1-notes/03-engineering/3.4-code-quality/3.4.6..gitignore.md)



<a id="35-测试基础"></a>

### 3.5 Vitest、Vue Test Utils 与 Playwright 入门

- [ ] [3.5.1 测试金字塔：单元测试、集成测试、E2E 测试](../learning/1-notes/03-engineering/3.5-testing-basics/3.5.1.e2e.md)
- [ ] [3.5.2 **Vitest**：基本断言、`describe`/`it`、mock 函数；Jest 作为按需对照](../learning/1-notes/03-engineering/3.5-testing-basics/3.5.2.vitest.md)
- [ ] [3.5.3 **Vue Test Utils** 组件测试入门；React Testing Library 随 React 分支选学](../learning/1-notes/03-engineering/3.5-testing-basics/3.5.3.react-testing-library.md)
- [ ] [3.5.4 **Playwright** E2E 测试概念与关键流程；Cypress 按项目选用](../learning/1-notes/03-engineering/3.5-testing-basics/3.5.4.playwright.md)
- [ ] [3.5.5 测试覆盖率与合理预期](../learning/1-notes/03-engineering/3.5-testing-basics/3.5.5.item-3-5-5.md)

---



## 阶段 4：Vue 3 + Nuxt 应用开发与状态管理

> 前置：基础 Web 能力与阶段 3 的 TypeScript 工具链。主线采用 **Vue 3 + TypeScript + Nuxt**，按 **4.1 → 4.3 → 4.5 → 4.4** 阅读；4.2 React/Next 为跨生态选修，React Native 经验可用于概念对照，不要求双修。产出：含列表、表单、路由和明确加载/空/错状态的小应用。验收：刷新和导航行为正确、组件可复用、关键交互及宽窄视口可检查；质量基线从本阶段执行。见[学习路径](../docs/LEARNING_PATH.md)。



<a id="41-前端框架共通概念"></a>

### 4.1 组件、数据流、响应式与客户端路由

- [ ] [4.1.1 声明式 UI vs 命令式 UI](../learning/1-notes/04-frameworks/4.1-framework-concepts/4.1.1.ui-vs-ui.md)
- [ ] [4.1.2 组件化：组合、复用、单向数据流](../learning/1-notes/04-frameworks/4.1-framework-concepts/4.1.2.item-4-1-2.md)
- [ ] [4.1.3 虚拟 DOM / 响应式系统原理（概念级）](../learning/1-notes/04-frameworks/4.1-framework-concepts/4.1.3.dom.md)
- [ ] [4.1.4 客户端路由 vs 服务端路由](../learning/1-notes/04-frameworks/4.1-framework-concepts/4.1.4.vs.md)
- [ ] [4.1.5 组件表单状态与双向绑定契约；受控/非受控作为 React 选修对照](../learning/1-notes/04-frameworks/4.1-framework-concepts/4.1.5.vs.md)
- [ ] [4.1.6 条件渲染、列表渲染与 `key` 的作用](../learning/1-notes/04-frameworks/4.1-framework-concepts/4.1.6.key.md)
- [ ] [4.1.7 📱 移动端对照：Web 组件与 React Native / Flutter 的共通概念和平台差异](../learning/1-notes/04-frameworks/4.1-framework-concepts/4.1.7.react-react-native-vue-widget.md)



<a id="42-react-生态选修不阻塞-vuenuxt-主线"></a>

### 4.2 React、React Router 与 Next.js（选修）



#### 4.2.1 React 核心

- [ ] [4.2.1.1 JSX 语法与表达式](../learning/1-notes/04-frameworks/4.2-react/4.2.1.1.jsx.md)
- [ ] [4.2.1.2 函数组件与类组件（重点函数组件）](../learning/1-notes/04-frameworks/4.2-react/4.2.1.2.item-4-2-1-2.md)
- [ ] [4.2.1.3 Props 与 children](../learning/1-notes/04-frameworks/4.2-react/4.2.1.3.props-children.md)
- [ ] [4.2.1.4 State：`useState`、状态不可变性（immutable 更新）](../learning/1-notes/04-frameworks/4.2-react/4.2.1.4.usestate.md)
- [ ] [4.2.1.5 副作用：`useEffect`、依赖数组、清理函数](../learning/1-notes/04-frameworks/4.2-react/4.2.1.5.useeffect.md)
- [ ] [4.2.1.6 引用：`useRef`（DOM 引用与可变值）](../learning/1-notes/04-frameworks/4.2-react/4.2.1.6.useref.md)
- [ ] [4.2.1.7 性能：`useMemo`、`useCallback`、`React.memo`](../learning/1-notes/04-frameworks/4.2-react/4.2.1.7.usememo.md)
- [ ] [4.2.1.8 Context：`createContext`、`useContext` — 跨层传递](../learning/1-notes/04-frameworks/4.2-react/4.2.1.8.createcontext.md)
- [ ] [4.2.1.9 Reducer：`useReducer` — 复杂状态逻辑](../learning/1-notes/04-frameworks/4.2-react/4.2.1.9.usereducer.md)
- [ ] [4.2.1.10 自定义 Hook：逻辑复用](../learning/1-notes/04-frameworks/4.2-react/4.2.1.10.hook.md)
- [ ] [4.2.1.11 错误边界（Error Boundary）](../learning/1-notes/04-frameworks/4.2-react/4.2.1.11.error-boundary.md)
- [ ] [4.2.1.12 Fragment、`Portal`、`Suspense` 基础](../learning/1-notes/04-frameworks/4.2-react/4.2.1.12.portal.md)
- [ ] [4.2.1.13 Strict Mode 与双调用（开发环境）](../learning/1-notes/04-frameworks/4.2-react/4.2.1.13.strict-mode.md)



#### 4.2.2 React 路由

- [ ] [4.2.2.1 **React Router**：`BrowserRouter`、`Routes`、`Route`、`Link`、`useNavigate`、`useParams`、`useSearchParams`](../learning/1-notes/04-frameworks/4.2-react/4.2.2.1.react-router.md)
- [ ] [4.2.2.2 嵌套路由与布局路由（Layout Route）](../learning/1-notes/04-frameworks/4.2-react/4.2.2.2.layout-route.md)
- [ ] [4.2.2.3 路由守卫思路：鉴权重定向](../learning/1-notes/04-frameworks/4.2-react/4.2.2.3.item-4-2-2-3.md)
- [ ] [4.2.2.4 懒加载路由：`React.lazy` + `Suspense`](../learning/1-notes/04-frameworks/4.2-react/4.2.2.4.react.lazy.md)



#### 4.2.3 React 状态管理

- [ ] [4.2.3.1 何时需要全局状态管理](../learning/1-notes/04-frameworks/4.2-react/4.2.3.1.item-4-2-3-1.md)
- [ ] [4.2.3.2 **Zustand** 或 **Jotai**（轻量方案）](../learning/1-notes/04-frameworks/4.2-react/4.2.3.2.zustand.md)
- [ ] [4.2.3.3 **Redux Toolkit**：slice、`createAsyncThunk`、中间件概念](../learning/1-notes/04-frameworks/4.2-react/4.2.3.3.redux-toolkit.md)
- [ ] [4.2.3.4 服务端状态：**TanStack Query (React Query)** — 请求缓存、重试、失效、乐观更新](../learning/1-notes/04-frameworks/4.2-react/4.2.3.4.tanstack-query-react-query.md)
- [ ] [4.2.3.5 表单：**React Hook Form** + **Zod** 校验](../learning/1-notes/04-frameworks/4.2-react/4.2.3.5.react-hook-form.md)



#### 4.2.4 React 工程实践

- [ ] [4.2.4.1 组件设计：展示组件 vs 容器组件](../learning/1-notes/04-frameworks/4.2-react/4.2.4.1.vs.md)
- [ ] [4.2.4.2 组件库使用：**Ant Design**、**Material UI**、**shadcn/ui** 等](../learning/1-notes/04-frameworks/4.2-react/4.2.4.2.ant-design.md)
- [ ] [4.2.4.3 CSS 方案：CSS Modules、Styled Components、Tailwind CSS](../learning/1-notes/04-frameworks/4.2-react/4.2.4.3.css-css-modules-styled-components.md)
- [ ] [4.2.4.4 **Next.js** 入门：App Router、Route Handlers、Server/Client Components 与 SSR/SSG（旧 Pages Router 按需对照）](../learning/1-notes/04-frameworks/4.2-react/4.2.4.4.next.js.md)



<a id="43-vue-生态"></a>

### 4.3 Vue 3：组合式 API、Vue Router 与 Pinia



#### 4.3.1 Vue 3 核心

- [ ] [4.3.1.1 模板语法：`{{ }}`、指令（`v-if`、`v-for`、`v-show`、`v-bind`、`v-on`、`v-model`）](../learning/1-notes/04-frameworks/4.3-vue/4.3.1.1.v-if-v-for-v-show-v-bind-v-on.md)
- [ ] [4.3.1.2 组合式 API：`setup`、`ref`、`reactive`、`computed`；响应式解构边界、`nextTick` 与 composables 复用（侦听清理见 4.3.1.8）](../learning/1-notes/04-frameworks/4.3-vue/4.3.1.2.setup.md)
- [ ] [4.3.1.3 生命周期钩子（`onMounted` 等）](../learning/1-notes/04-frameworks/4.3-vue/4.3.1.3.onmounted.md)
- [ ] [4.3.1.4 组件：Props、`emit`、组件 `v-model` 与插槽（默认、具名、作用域）](../learning/1-notes/04-frameworks/4.3-vue/4.3.1.4.emit.md)
- [ ] [4.3.1.5 依赖注入：`provide` / `inject`](../learning/1-notes/04-frameworks/4.3-vue/4.3.1.5.provide.md)
- [ ] [4.3.1.6 模板引用：`ref` 获取 DOM](../learning/1-notes/04-frameworks/4.3-vue/4.3.1.6.ref.md)
- [ ] [4.3.1.7 动态组件与 `<KeepAlive>`](../learning/1-notes/04-frameworks/4.3-vue/4.3.1.7.keepalive.md)
- [ ] [4.3.1.8 `watch` / `watchEffect`：依赖追踪、异步请求竞态与副作用清理](../learning/1-notes/04-frameworks/4.3-vue/4.3.1.8.watch-cleanup.md)



#### 4.3.2 Vue 路由与状态

- [ ] [4.3.2.1 **Vue Router**：路由配置、导航守卫、动态路由、路由懒加载](../learning/1-notes/04-frameworks/4.3-vue/4.3.2.1.vue-router.md)
- [ ] [4.3.2.2 **Pinia**：store 定义、state、getters、actions](../learning/1-notes/04-frameworks/4.3-vue/4.3.2.2.pinia.md)



#### 4.3.3 Vue 工程实践

- [ ] [4.3.3.1 单文件组件（`.vue`）：`<template>`、`<script setup>`、`<style scoped>`](../learning/1-notes/04-frameworks/4.3-vue/4.3.3.1..vue.md)
- [ ] [4.3.3.2 组件库选型：按桌面/手机场景选择 Nuxt UI、Vant 或其他 Vue 组件库，不要求全部学习](../learning/1-notes/04-frameworks/4.3-vue/4.3.3.2.element-plus.md)
- [ ] [4.3.3.3 **Nuxt** 概览：基于 Vue 的应用框架，完整应用主线见 4.5](../learning/1-notes/04-frameworks/4.3-vue/4.3.3.3.nuxt.md)



<a id="44-css-框架与-ui-体系"></a>

### 4.4 Tailwind CSS、Nuxt UI/Vant 与主题样式

- [ ] [4.4.1 **Tailwind CSS**：工具类、配置、响应式前缀、暗色模式](../learning/1-notes/04-frameworks/4.4-css-ui/4.4.1.tailwind-css.md)
- [ ] [4.4.2 设计系统概念：颜色、间距、字体、组件规范](../learning/1-notes/04-frameworks/4.4-css-ui/4.4.2.item-4-4-2.md)
- [ ] [4.4.3 图标方案：Icon Font、SVG Icon（如 Lucide、Heroicons）](../learning/1-notes/04-frameworks/4.4-css-ui/4.4.3.icon-font-svg-icon-lucide.md)
- [ ] [4.4.4 暗色模式实现：`prefers-color-scheme`、CSS 变量切换、class 策略](../learning/1-notes/04-frameworks/4.4-css-ui/4.4.4.prefers-color-scheme.md)

---



<a id="45-nuxt-应用开发主线"></a>

### 4.5 Nuxt：路由布局、SSR 数据、配置与 Nitro

先完成 4.3 Vue 基础，再用本节组织完整应用；7.2 深化生产渲染与部署，不在这里重复编写同一套教程。Nuxt 可以按需求采用 CSR、SSR 或静态生成，不能把 Nuxt 等同于必须运行 Node 服务。

- [ ] [4.5.1 官方骨架与目录：文件路由、页面、布局和动态参数](../learning/1-notes/04-frameworks/4.5-nuxt/4.5.1.scaffold-routing-layouts.md)
- [ ] [4.5.2 CSR / SSR / SSG 与 hydration 基础：首屏、客户端导航和运行环境](../learning/1-notes/04-frameworks/4.5-nuxt/4.5.2.rendering-hydration.md)
- [ ] [4.5.3 `useFetch` / `useAsyncData`：payload、请求状态、取消与刷新；区分提交操作的 `$fetch`](../learning/1-notes/04-frameworks/4.5-nuxt/4.5.3.data-fetching-lifecycle.md)
- [ ] [4.5.4 `useState` / Pinia：组件、本应用和每请求状态边界，避免跨用户共享](../learning/1-notes/04-frameworks/4.5-nuxt/4.5.4.state-request-boundaries.md)
- [ ] [4.5.5 `runtimeConfig` 与 public 边界：构建期、服务端运行期及静态部署配置](../learning/1-notes/04-frameworks/4.5-nuxt/4.5.5.runtime-config.md)
- [ ] [4.5.6 Nitro / server 路由：最小 BFF、输入校验、服务端授权与业务后端边界](../learning/1-notes/04-frameworks/4.5-nuxt/4.5.6.nitro-server-routes.md)
- [ ] [4.5.7 plugins / composables / modules / Layers：生命周期、依赖注入与复用职责](../learning/1-notes/04-frameworks/4.5-nuxt/4.5.7.plugins-modules-layers.md)
- [ ] [4.5.8 中间件、错误页与 404：浏览器 API 边界，客户端守卫不等于服务端授权](../learning/1-notes/04-frameworks/4.5-nuxt/4.5.8.middleware-errors-client-boundaries.md)
- [ ] [4.5.9 `useHead` / `useSeoMeta`：SSR 页面标题、描述与客户端导航更新（完整 SEO 见阶段 6）](../learning/1-notes/04-frameworks/4.5-nuxt/4.5.9.head-page-metadata.md)

---

<a id="阶段-5全栈协作与认证"></a>

## 阶段 5：HTTP API 对接、登录与权限控制

> 前置：能完成阶段 4 的框架小应用。产出：按明确契约对接 API、登录/退出及权限反馈，缺少真实后端时使用注明范围的 mock。验收：响应解码、加载/空/错、取消/迟到响应和认证失效可解释并复现；权限由服务端执行，不把前端隐藏控件当授权。见[学习路径](../docs/LEARNING_PATH.md)。



<a id="51-http-客户端与-api-对接"></a>

### 5.1 Fetch/Nuxt 请求、取消、上传与错误处理

- [ ] [5.1.1 HTTP 客户端选型：原生 Fetch、Nuxt 数据获取与统一错误边界；Axios 按需](../learning/1-notes/05-fullstack-auth/5.1-http-client/5.1.1.axios.md)
- [ ] [5.1.2 请求生命周期：AbortController、超时、迟到响应与加载/空/错/重试状态](../learning/1-notes/05-fullstack-auth/5.1-http-client/5.1.2.abortcontroller.md)
- [ ] [5.1.3 上传/下载：FormData、Blob、进度监听](../learning/1-notes/05-fullstack-auth/5.1-http-client/5.1.3.formdata-blob.md)
- [ ] [5.1.4 API 版本管理与文档阅读（OpenAPI / Swagger）](../learning/1-notes/05-fullstack-auth/5.1-http-client/5.1.4.api-openapi-swagger.md)
- [ ] [5.1.5 Mock 数据：**MSW (Mock Service Worker)** 或 mock 服务器](../learning/1-notes/05-fullstack-auth/5.1-http-client/5.1.5.msw-mock-service-worker.md)
- [ ] [5.1.6 环境区分：dev / staging / production 的 baseURL 配置](../learning/1-notes/05-fullstack-auth/5.1-http-client/5.1.6.dev-staging-production-baseurl.md)
- [ ] [5.1.7 安全重试与幂等：429/Retry-After、重复提交和取消后的结果边界](../learning/1-notes/05-fullstack-auth/5.1-http-client/5.1.7.retry-idempotency.md)



<a id="52-认证与授权"></a>

### 5.2 Cookie/Session、Bearer 登录与服务端授权

- [ ] [5.2.1 **Session + Cookie**：会话流程、Secure/HttpOnly/SameSite 与 CSRF 基础边界](../learning/1-notes/05-fullstack-auth/5.2-auth/5.2.1.session-cookie.md)
- [ ] [5.2.2 **JWT（JSON Web Token）**：access token、refresh token、存储位置权衡](../learning/1-notes/05-fullstack-auth/5.2-auth/5.2.2.jwt-json-web-token.md)
- [ ] [5.2.3 登录与恢复：按 Cookie/Session 或 Bearer 契约处理会话、刷新、失效和退出，不默认存 Token](../learning/1-notes/05-fullstack-auth/5.2-auth/5.2.3.token.md)
- [ ] [5.2.4 请求头：`Authorization: Bearer <token>`](../learning/1-notes/05-fullstack-auth/5.2-auth/5.2.4.authorization-bearer-token.md)
- [ ] [5.2.5 **OAuth 2.0** 与第三方登录（微信、GitHub、Google）基本概念](../learning/1-notes/05-fullstack-auth/5.2-auth/5.2.5.oauth.md)
- [ ] [5.2.6 **SSO** 单点登录概念](../learning/1-notes/05-fullstack-auth/5.2-auth/5.2.6.sso.md)
- [ ] [5.2.7 权限反馈：路由、菜单、按钮与 RBAC；前端控制体验，服务端逐请求授权](../learning/1-notes/05-fullstack-auth/5.2-auth/5.2.7.rbac.md)
- [ ] [5.2.8 📱 移动端对照：浏览器存储不等于 Keychain/Keystore；比较会话、脚本可读性与威胁边界](../learning/1-notes/05-fullstack-auth/5.2-auth/5.2.8.token-keychain-keystore-cookie-session.md)
- [ ] [5.2.9 Nuxt SSR 会话恢复：当前请求 Cookie 转发、用户隔离与私有响应缓存](../learning/1-notes/05-fullstack-auth/5.2-auth/5.2.9.nuxt-ssr-session.md)



<a id="53-跨域与安全传输"></a>

### 5.3 同源、CORS、开发代理与 HTTPS

- [ ] [5.3.1 同源策略详解](../learning/1-notes/05-fullstack-auth/5.3-cors/5.3.1.item-5-3-1.md)
- [ ] [5.3.2 **CORS**：简单请求、预检请求（OPTIONS）、服务端响应头配置](../learning/1-notes/05-fullstack-auth/5.3-cors/5.3.2.cors.md)
- [ ] [5.3.3 开发环境代理：`vite.config` / `webpack-dev-server` proxy](../learning/1-notes/05-fullstack-auth/5.3-cors/5.3.3.vite.config.md)
- [ ] [5.3.4 JSONP 的历史方案（了解）](../learning/1-notes/05-fullstack-auth/5.3-cors/5.3.4.jsonp.md)
- [ ] [5.3.5 HTTPS 强制与安全响应头（了解：`Content-Security-Policy`、`X-Frame-Options`）](../learning/1-notes/05-fullstack-auth/5.3-cors/5.3.5.content-security-policy.md)



<a id="54-数据格式与协议"></a>

### 5.4 JSON 校验、API 分页、错误码与数据契约

- [ ] [5.4.1 JSON 与数据契约：字段约定、unknown 响应的运行期校验及 DTO 映射；TS 类型不校验网络数据](../learning/1-notes/05-fullstack-auth/5.4-data-protocols/5.4.1.json-vs.md)
- [ ] [5.4.2 分页、排序、筛选的 API 参数设计](../learning/1-notes/05-fullstack-auth/5.4-data-protocols/5.4.2.api.md)
- [ ] [5.4.3 文件上传接口约定](../learning/1-notes/05-fullstack-auth/5.4-data-protocols/5.4.3.item-5-4-3.md)
- [ ] [5.4.4 HTTP 状态、业务错误与响应契约；`{ code, data, message }` 仅为可选约定，不强制所有接口包壳](../learning/1-notes/05-fullstack-auth/5.4-data-protocols/5.4.4.code-data-message.md)
- [ ] [5.4.5 GraphQL 基本概念（选学）：与 REST 对比](../learning/1-notes/05-fullstack-auth/5.4-data-protocols/5.4.5.graphql-rest.md)
- [ ] [5.4.6 gRPC / Protobuf 在 Web 中的了解（grpc-web）](../learning/1-notes/05-fullstack-auth/5.4-data-protocols/5.4.6.grpc-protobuf-web-grpc-web.md)



<a id="55-实时通信"></a>

### 5.5 WebSocket、SSE 与断线重连

- [ ] [5.5.1 **WebSocket** 客户端 API：连接、发送、心跳、重连](../learning/1-notes/05-fullstack-auth/5.5-realtime/5.5.1.websocket.md)
- [ ] [5.5.2 **Socket.IO** 或原生 WebSocket 封装](../learning/1-notes/05-fullstack-auth/5.5-realtime/5.5.2.socket.io.md)
- [ ] [5.5.3 **Server-Sent Events (SSE)** 与 WebSocket 场景对比](../learning/1-notes/05-fullstack-auth/5.5-realtime/5.5.3.server-sent-events-sse.md)
- [ ] [5.5.4 📱 移动端对照：WebSocket/SSE 与移动长连接、系统推送的机制和生命周期差异](../learning/1-notes/05-fullstack-auth/5.5-realtime/5.5.4.websocket-sse.md)

---
