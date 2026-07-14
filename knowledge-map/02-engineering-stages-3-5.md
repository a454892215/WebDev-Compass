# 阶段 3–5：工程层

> 工程化与 TypeScript · 框架与状态管理 · 全栈协作与认证  
> [← 01-foundation](./01-foundation-stages-0-2.md) · [← 返回总览](../KNOWLEDGE_MAP.md) · [下一部分 →](./03-application-stages-6-7.md)

---

## 阶段 3：工程化与 TypeScript



### 3.1 包管理与项目结构

- [ ] [3.1.1](./notes/03-engineering/3.1-package-management/3.1.1.package.json.md) `package.json`[：dependencies vs devDependencies、](./notes/03-engineering/3.1-package-management/3.1.1.package.json.md)`scripts`[、](./notes/03-engineering/3.1-package-management/3.1.1.package.json.md)`engines`
- [ ] [3.1.2 **npm / yarn / pnpm** 常用命令：install、run、publish、workspace](./notes/03-engineering/3.1-package-management/3.1.2.npm-yarn-pnpm.md)
- [ ] [3.1.3 **语义化版本**（SemVer）：](./notes/03-engineering/3.1-package-management/3.1.3.item-3-1-3.md)`^`[、](./notes/03-engineering/3.1-package-management/3.1.3.item-3-1-3.md)`~`[、锁定版本](./notes/03-engineering/3.1-package-management/3.1.3.item-3-1-3.md)
- [ ] [3.1.4](./notes/03-engineering/3.1-package-management/3.1.4.package-lock.json.md) `package-lock.json` [/](./notes/03-engineering/3.1-package-management/3.1.4.package-lock.json.md) `yarn.lock` [/](./notes/03-engineering/3.1-package-management/3.1.4.package-lock.json.md) `pnpm-lock.yaml` [的作用](./notes/03-engineering/3.1-package-management/3.1.4.package-lock.json.md)
- [ ] [3.1.5 **monorepo** 概念（了解 Lerna、Turborepo、pnpm workspace）](./notes/03-engineering/3.1-package-management/3.1.5.monorepo.md)
- [ ] [3.1.6 常见项目目录结构约定（](./notes/03-engineering/3.1-package-management/3.1.6.src.md)`src/`[、](./notes/03-engineering/3.1-package-management/3.1.6.src.md)`public/`[、](./notes/03-engineering/3.1-package-management/3.1.6.src.md)`dist/`[、](./notes/03-engineering/3.1-package-management/3.1.6.src.md)`tests/`[）](./notes/03-engineering/3.1-package-management/3.1.6.src.md)



### 3.2 构建工具

- [ ] [3.2.1 为什么需要构建工具：模块化、转译、打包、压缩、HMR](./notes/03-engineering/3.2-build-tools/3.2.1.hmr.md)
- [ ] [3.2.2 **Vite**：项目创建、配置、](./notes/03-engineering/3.2-build-tools/3.2.2.vite.md)`index.html` [入口、环境变量（](./notes/03-engineering/3.2-build-tools/3.2.2.vite.md)`.env`[）](./notes/03-engineering/3.2-build-tools/3.2.2.vite.md)
- [ ] [3.2.3 **Webpack** 核心概念（了解）：entry、output、loader、plugin、HMR](./notes/03-engineering/3.2-build-tools/3.2.3.webpack.md)
- [ ] [3.2.4 开发服务器与热更新（HMR）原理](./notes/03-engineering/3.2-build-tools/3.2.4.hmr.md)
- [ ] [3.2.5 生产构建：代码分割（Code Splitting）、Tree Shaking、压缩](./notes/03-engineering/3.2-build-tools/3.2.5.code-splitting-tree-shaking.md)
- [ ] [3.2.6 Source Map 的作用与类型](./notes/03-engineering/3.2-build-tools/3.2.6.source-map.md)
- [ ] [3.2.7 📱 移动端对照：Vite/Webpack ≈ Gradle/Xcode Build + Metro Bundler](./notes/03-engineering/3.2-build-tools/3.2.7.vite-webpack-gradle-xcode-build.md)



### 3.3 TypeScript

- [ ] [3.3.1 为什么使用 TypeScript：类型安全、IDE 支持、可维护性](./notes/03-engineering/3.3-typescript/3.3.1.typescript-ide.md)
- [ ] [3.3.2 基础类型：](./notes/03-engineering/3.3-typescript/3.3.2.string.md)`string`[、](./notes/03-engineering/3.3-typescript/3.3.2.string.md)`number`[、](./notes/03-engineering/3.3-typescript/3.3.2.string.md)`boolean`[、](./notes/03-engineering/3.3-typescript/3.3.2.string.md)`array`[、](./notes/03-engineering/3.3-typescript/3.3.2.string.md)`tuple`[、](./notes/03-engineering/3.3-typescript/3.3.2.string.md)`enum`[、](./notes/03-engineering/3.3-typescript/3.3.2.string.md)`any`[、](./notes/03-engineering/3.3-typescript/3.3.2.string.md)`unknown`[、](./notes/03-engineering/3.3-typescript/3.3.2.string.md)`void`[、](./notes/03-engineering/3.3-typescript/3.3.2.string.md)`never`
- [ ] [3.3.3 接口（](./notes/03-engineering/3.3-typescript/3.3.3.interface.md)`interface`[）与类型别名（](./notes/03-engineering/3.3-typescript/3.3.3.interface.md)`type`[）](./notes/03-engineering/3.3-typescript/3.3.3.interface.md)
- [ ] [3.3.4 联合类型与交叉类型](./notes/03-engineering/3.3-typescript/3.3.4.item-3-3-4.md)
- [ ] [3.3.5 泛型：函数泛型、约束（](./notes/03-engineering/3.3-typescript/3.3.5.extends.md)`extends`[）、常用工具类型（](./notes/03-engineering/3.3-typescript/3.3.5.extends.md)`Partial`[、](./notes/03-engineering/3.3-typescript/3.3.5.extends.md)`Pick`[、](./notes/03-engineering/3.3-typescript/3.3.5.extends.md)`Omit`[、](./notes/03-engineering/3.3-typescript/3.3.5.extends.md)`Record`[）](./notes/03-engineering/3.3-typescript/3.3.5.extends.md)
- [ ] [3.3.6 类型断言与类型守卫（](./notes/03-engineering/3.3-typescript/3.3.6.typeof.md)`typeof`[、](./notes/03-engineering/3.3-typescript/3.3.6.typeof.md)`instanceof`[、自定义守卫）](./notes/03-engineering/3.3-typescript/3.3.6.typeof.md)
- [ ] [3.3.7 函数类型：参数、返回值、可选参数、默认参数](./notes/03-engineering/3.3-typescript/3.3.7.item-3-3-7.md)
- [ ] [3.3.8 类与访问修饰符：](./notes/03-engineering/3.3-typescript/3.3.8.public.md)`public`[、](./notes/03-engineering/3.3-typescript/3.3.8.public.md)`private`[、](./notes/03-engineering/3.3-typescript/3.3.8.public.md)`protected`[、](./notes/03-engineering/3.3-typescript/3.3.8.public.md)`readonly`
- [ ] [3.3.9 模块与声明文件（](./notes/03-engineering/3.3-typescript/3.3.9..d.ts.md)`.d.ts`[）](./notes/03-engineering/3.3-typescript/3.3.9..d.ts.md)
- [ ] [3.3.10](./notes/03-engineering/3.3-typescript/3.3.10.tsconfig.json.md) `tsconfig.json` [核心配置：](./notes/03-engineering/3.3-typescript/3.3.10.tsconfig.json.md)`strict`[、](./notes/03-engineering/3.3-typescript/3.3.10.tsconfig.json.md)`target`[、](./notes/03-engineering/3.3-typescript/3.3.10.tsconfig.json.md)`module`[、](./notes/03-engineering/3.3-typescript/3.3.10.tsconfig.json.md)`paths`[（路径别名）](./notes/03-engineering/3.3-typescript/3.3.10.tsconfig.json.md)
- [ ] [3.3.11 与 React/Vue 结合的 TS 类型（组件 Props、事件类型）— 在阶段 4 深化](./notes/03-engineering/3.3-typescript/3.3.11.react-vue-ts-props.md)
- [ ] [3.3.12 📱 移动端对照：TypeScript ≈ Dart 的类型系统 / Kotlin 空安全](./notes/03-engineering/3.3-typescript/3.3.12.typescript-dart-kotlin.md)



### 3.4 代码质量

- [ ] [3.4.1 **ESLint**：规则配置、](./notes/03-engineering/3.4-code-quality/3.4.1.eslint.md)`eslint-config`[、与编辑器集成](./notes/03-engineering/3.4-code-quality/3.4.1.eslint.md)
- [ ] [3.4.2 **Prettier**：格式化与 ESLint 协作](./notes/03-engineering/3.4-code-quality/3.4.2.prettier.md)
- [ ] [3.4.3 **EditorConfig](./notes/03-engineering/3.4-code-quality/3.4.3.editorconfig.md)**
- [ ] [3.4.4 **Husky** + **lint-staged**：提交前检查](./notes/03-engineering/3.4-code-quality/3.4.4.husky.md)
- [ ] [3.4.5 **Conventional Commits** 提交规范](./notes/03-engineering/3.4-code-quality/3.4.5.conventional-commits.md)
- [ ] [3.4.6](./notes/03-engineering/3.4-code-quality/3.4.6..gitignore.md) `.gitignore` [与](./notes/03-engineering/3.4-code-quality/3.4.6..gitignore.md) `.npmignore`



### 3.5 测试基础

- [ ] [3.5.1 测试金字塔：单元测试、集成测试、E2E 测试](./notes/03-engineering/3.5-testing-basics/3.5.1.e2e.md)
- [ ] [3.5.2 **Vitest** / **Jest**：基本断言、](./notes/03-engineering/3.5-testing-basics/3.5.2.vitest.md)`describe`[/](./notes/03-engineering/3.5-testing-basics/3.5.2.vitest.md)`it`[、mock 函数](./notes/03-engineering/3.5-testing-basics/3.5.2.vitest.md)
- [ ] [3.5.3 **React Testing Library** / **Vue Test Utils** 组件测试入门](./notes/03-engineering/3.5-testing-basics/3.5.3.react-testing-library.md)
- [ ] [3.5.4 **Playwright** / **Cypress** E2E 测试概念](./notes/03-engineering/3.5-testing-basics/3.5.4.playwright.md)
- [ ] [3.5.5 测试覆盖率与合理预期](./notes/03-engineering/3.5-testing-basics/3.5.5.item-3-5-5.md)

---



## 阶段 4：框架与状态管理

> 主流框架建议至少深入一个（**React** 或 **Vue**）。有 React Native 经验者优先深耕 React 生态。



### 4.1 前端框架共通概念

- [ ] [4.1.1 声明式 UI vs 命令式 UI](./notes/04-frameworks/4.1-framework-concepts/4.1.1.ui-vs-ui.md)
- [ ] [4.1.2 组件化：组合、复用、单向数据流](./notes/04-frameworks/4.1-framework-concepts/4.1.2.item-4-1-2.md)
- [ ] [4.1.3 虚拟 DOM / 响应式系统原理（概念级）](./notes/04-frameworks/4.1-framework-concepts/4.1.3.dom.md)
- [ ] [4.1.4 客户端路由 vs 服务端路由](./notes/04-frameworks/4.1-framework-concepts/4.1.4.vs.md)
- [ ] [4.1.5 受控组件 vs 非受控组件](./notes/04-frameworks/4.1-framework-concepts/4.1.5.vs.md)
- [ ] [4.1.6 条件渲染、列表渲染与](./notes/04-frameworks/4.1-framework-concepts/4.1.6.key.md) `key` [的作用](./notes/04-frameworks/4.1-framework-concepts/4.1.6.key.md)
- [ ] [4.1.7 📱 移动端对照：React ≈ React Native；Vue ≈ 组合 Widget + 响应式状态](./notes/04-frameworks/4.1-framework-concepts/4.1.7.react-react-native-vue-widget.md)



### 4.2 React 生态



#### 4.2.1 React 核心

- [ ] [4.2.1.1 JSX 语法与表达式](./notes/04-frameworks/4.2-react/4.2.1.1.jsx.md)
- [ ] [4.2.1.2 函数组件与类组件（重点函数组件）](./notes/04-frameworks/4.2-react/4.2.1.2.item-4-2-1-2.md)
- [ ] [4.2.1.3 Props 与 children](./notes/04-frameworks/4.2-react/4.2.1.3.props-children.md)
- [ ] [4.2.1.4 State：](./notes/04-frameworks/4.2-react/4.2.1.4.usestate.md)`useState`[、状态不可变性（immutable 更新）](./notes/04-frameworks/4.2-react/4.2.1.4.usestate.md)
- [ ] [4.2.1.5 副作用：](./notes/04-frameworks/4.2-react/4.2.1.5.useeffect.md)`useEffect`[、依赖数组、清理函数](./notes/04-frameworks/4.2-react/4.2.1.5.useeffect.md)
- [ ] [4.2.1.6 引用：](./notes/04-frameworks/4.2-react/4.2.1.6.useref.md)`useRef`[（DOM 引用与可变值）](./notes/04-frameworks/4.2-react/4.2.1.6.useref.md)
- [ ] [4.2.1.7 性能：](./notes/04-frameworks/4.2-react/4.2.1.7.usememo.md)`useMemo`[、](./notes/04-frameworks/4.2-react/4.2.1.7.usememo.md)`useCallback`[、](./notes/04-frameworks/4.2-react/4.2.1.7.usememo.md)`React.memo`
- [ ] [4.2.1.8 Context：](./notes/04-frameworks/4.2-react/4.2.1.8.createcontext.md)`createContext`[、](./notes/04-frameworks/4.2-react/4.2.1.8.createcontext.md)`useContext` [— 跨层传递](./notes/04-frameworks/4.2-react/4.2.1.8.createcontext.md)
- [ ] [4.2.1.9 Reducer：](./notes/04-frameworks/4.2-react/4.2.1.9.usereducer.md)`useReducer` [— 复杂状态逻辑](./notes/04-frameworks/4.2-react/4.2.1.9.usereducer.md)
- [ ] [4.2.1.10 自定义 Hook：逻辑复用](./notes/04-frameworks/4.2-react/4.2.1.10.hook.md)
- [ ] [4.2.1.11 错误边界（Error Boundary）](./notes/04-frameworks/4.2-react/4.2.1.11.error-boundary.md)
- [ ] [4.2.1.12 Fragment、](./notes/04-frameworks/4.2-react/4.2.1.12.portal.md)`Portal`[、](./notes/04-frameworks/4.2-react/4.2.1.12.portal.md)`Suspense` [基础](./notes/04-frameworks/4.2-react/4.2.1.12.portal.md)
- [ ] [4.2.1.13 Strict Mode 与双调用（开发环境）](./notes/04-frameworks/4.2-react/4.2.1.13.strict-mode.md)



#### 4.2.2 React 路由

- [ ] [4.2.2.1 **React Router**：](./notes/04-frameworks/4.2-react/4.2.2.1.react-router.md)`BrowserRouter`[、](./notes/04-frameworks/4.2-react/4.2.2.1.react-router.md)`Routes`[、](./notes/04-frameworks/4.2-react/4.2.2.1.react-router.md)`Route`[、](./notes/04-frameworks/4.2-react/4.2.2.1.react-router.md)`Link`[、](./notes/04-frameworks/4.2-react/4.2.2.1.react-router.md)`useNavigate`[、](./notes/04-frameworks/4.2-react/4.2.2.1.react-router.md)`useParams`[、](./notes/04-frameworks/4.2-react/4.2.2.1.react-router.md)`useSearchParams`
- [ ] [4.2.2.2 嵌套路由与布局路由（Layout Route）](./notes/04-frameworks/4.2-react/4.2.2.2.layout-route.md)
- [ ] [4.2.2.3 路由守卫思路：鉴权重定向](./notes/04-frameworks/4.2-react/4.2.2.3.item-4-2-2-3.md)
- [ ] [4.2.2.4 懒加载路由：](./notes/04-frameworks/4.2-react/4.2.2.4.react.lazy.md)`React.lazy` [+](./notes/04-frameworks/4.2-react/4.2.2.4.react.lazy.md) `Suspense`



#### 4.2.3 React 状态管理

- [ ] [4.2.3.1 何时需要全局状态管理](./notes/04-frameworks/4.2-react/4.2.3.1.item-4-2-3-1.md)
- [ ] [4.2.3.2 **Zustand** 或 **Jotai**（轻量方案）](./notes/04-frameworks/4.2-react/4.2.3.2.zustand.md)
- [ ] [4.2.3.3 **Redux Toolkit**：slice、](./notes/04-frameworks/4.2-react/4.2.3.3.redux-toolkit.md)`createAsyncThunk`[、中间件概念](./notes/04-frameworks/4.2-react/4.2.3.3.redux-toolkit.md)
- [ ] [4.2.3.4 服务端状态：**TanStack Query (React Query)** — 请求缓存、重试、失效、乐观更新](./notes/04-frameworks/4.2-react/4.2.3.4.tanstack-query-react-query.md)
- [ ] [4.2.3.5 表单：**React Hook Form** + **Zod** 校验](./notes/04-frameworks/4.2-react/4.2.3.5.react-hook-form.md)



#### 4.2.4 React 工程实践

- [ ] [4.2.4.1 组件设计：展示组件 vs 容器组件](./notes/04-frameworks/4.2-react/4.2.4.1.vs.md)
- [ ] [4.2.4.2 组件库使用：**Ant Design**、**Material UI**、**shadcn/ui** 等](./notes/04-frameworks/4.2-react/4.2.4.2.ant-design.md)
- [ ] [4.2.4.3 CSS 方案：CSS Modules、Styled Components、Tailwind CSS](./notes/04-frameworks/4.2-react/4.2.4.3.css-css-modules-styled-components.md)
- [ ] [4.2.4.4 **Next.js** 入门：文件路由、API Routes、SSR/SSG 概念（阶段 7 深化）](./notes/04-frameworks/4.2-react/4.2.4.4.next.js.md)



### 4.3 Vue 生态



#### 4.3.1 Vue 3 核心

- [ ] [4.3.1.1 模板语法：](./notes/04-frameworks/4.3-vue/4.3.1.1.v-if-v-for-v-show-v-bind-v-on.md)`{{ }}`[、指令（](./notes/04-frameworks/4.3-vue/4.3.1.1.v-if-v-for-v-show-v-bind-v-on.md)`v-if`[、](./notes/04-frameworks/4.3-vue/4.3.1.1.v-if-v-for-v-show-v-bind-v-on.md)`v-for`[、](./notes/04-frameworks/4.3-vue/4.3.1.1.v-if-v-for-v-show-v-bind-v-on.md)`v-show`[、](./notes/04-frameworks/4.3-vue/4.3.1.1.v-if-v-for-v-show-v-bind-v-on.md)`v-bind`[、](./notes/04-frameworks/4.3-vue/4.3.1.1.v-if-v-for-v-show-v-bind-v-on.md)`v-on`[、](./notes/04-frameworks/4.3-vue/4.3.1.1.v-if-v-for-v-show-v-bind-v-on.md)`v-model`[）](./notes/04-frameworks/4.3-vue/4.3.1.1.v-if-v-for-v-show-v-bind-v-on.md)
- [ ] [4.3.1.2 组合式 API：](./notes/04-frameworks/4.3-vue/4.3.1.2.setup.md)`setup`[、](./notes/04-frameworks/4.3-vue/4.3.1.2.setup.md)`ref`[、](./notes/04-frameworks/4.3-vue/4.3.1.2.setup.md)`reactive`[、](./notes/04-frameworks/4.3-vue/4.3.1.2.setup.md)`computed`[、](./notes/04-frameworks/4.3-vue/4.3.1.2.setup.md)`watch`[、](./notes/04-frameworks/4.3-vue/4.3.1.2.setup.md)`watchEffect`
- [ ] [4.3.1.3 生命周期钩子（](./notes/04-frameworks/4.3-vue/4.3.1.3.onmounted.md)`onMounted` [等）](./notes/04-frameworks/4.3-vue/4.3.1.3.onmounted.md)
- [ ] [4.3.1.4 组件：Props、](./notes/04-frameworks/4.3-vue/4.3.1.4.emit.md)`emit`[、插槽（默认、具名、作用域）](./notes/04-frameworks/4.3-vue/4.3.1.4.emit.md)
- [ ] [4.3.1.5 依赖注入：](./notes/04-frameworks/4.3-vue/4.3.1.5.provide.md)`provide` [/](./notes/04-frameworks/4.3-vue/4.3.1.5.provide.md) `inject`
- [ ] [4.3.1.6 模板引用：](./notes/04-frameworks/4.3-vue/4.3.1.6.ref.md)`ref` [获取 DOM](./notes/04-frameworks/4.3-vue/4.3.1.6.ref.md)
- [ ] [4.3.1.7 动态组件与](./notes/04-frameworks/4.3-vue/4.3.1.7.keepalive.md) `<KeepAlive>`



#### 4.3.2 Vue 路由与状态

- [ ] [4.3.2.1 **Vue Router**：路由配置、导航守卫、动态路由、路由懒加载](./notes/04-frameworks/4.3-vue/4.3.2.1.vue-router.md)
- [ ] [4.3.2.2 **Pinia**：store 定义、state、getters、actions](./notes/04-frameworks/4.3-vue/4.3.2.2.pinia.md)



#### 4.3.3 Vue 工程实践

- [ ] [4.3.3.1 单文件组件（](./notes/04-frameworks/4.3-vue/4.3.3.1..vue.md)`.vue`[）：](./notes/04-frameworks/4.3-vue/4.3.3.1..vue.md)`<template>`[、](./notes/04-frameworks/4.3-vue/4.3.3.1..vue.md)`<script setup>`[、](./notes/04-frameworks/4.3-vue/4.3.3.1..vue.md)`<style scoped>`
- [ ] [4.3.3.2 组件库：**Element Plus**、**Naive UI**、**Vuetify** 等](./notes/04-frameworks/4.3-vue/4.3.3.2.element-plus.md)
- [ ] [4.3.3.3 **Nuxt** 入门概念（SSR 框架）](./notes/04-frameworks/4.3-vue/4.3.3.3.nuxt.md)



### 4.4 CSS 框架与 UI 体系

- [ ] [4.4.1 **Tailwind CSS**：工具类、配置、响应式前缀、暗色模式](./notes/04-frameworks/4.4-css-ui/4.4.1.tailwind-css.md)
- [ ] [4.4.2 设计系统概念：颜色、间距、字体、组件规范](./notes/04-frameworks/4.4-css-ui/4.4.2.item-4-4-2.md)
- [ ] [4.4.3 图标方案：Icon Font、SVG Icon（如 Lucide、Heroicons）](./notes/04-frameworks/4.4-css-ui/4.4.3.icon-font-svg-icon-lucide.md)
- [ ] [4.4.4 暗色模式实现：](./notes/04-frameworks/4.4-css-ui/4.4.4.prefers-color-scheme.md)`prefers-color-scheme`[、CSS 变量切换、class 策略](./notes/04-frameworks/4.4-css-ui/4.4.4.prefers-color-scheme.md)

---



## 阶段 5：全栈协作与认证



### 5.1 HTTP 客户端与 API 对接

- [ ] [5.1.1 **axios** 封装：实例、拦截器、错误统一处理](./notes/05-fullstack-auth/5.1-http-client/5.1.1.axios.md)
- [ ] [5.1.2 请求取消：AbortController](./notes/05-fullstack-auth/5.1-http-client/5.1.2.abortcontroller.md)
- [ ] [5.1.3 上传/下载：FormData、Blob、进度监听](./notes/05-fullstack-auth/5.1-http-client/5.1.3.formdata-blob.md)
- [ ] [5.1.4 API 版本管理与文档阅读（OpenAPI / Swagger）](./notes/05-fullstack-auth/5.1-http-client/5.1.4.api-openapi-swagger.md)
- [ ] [5.1.5 Mock 数据：**MSW (Mock Service Worker)** 或 mock 服务器](./notes/05-fullstack-auth/5.1-http-client/5.1.5.msw-mock-service-worker.md)
- [ ] [5.1.6 环境区分：dev / staging / production 的 baseURL 配置](./notes/05-fullstack-auth/5.1-http-client/5.1.6.dev-staging-production-baseurl.md)



### 5.2 认证与授权

- [ ] [5.2.1 **Session + Cookie** 认证流程](./notes/05-fullstack-auth/5.2-auth/5.2.1.session-cookie.md)
- [ ] [5.2.2 **JWT（JSON Web Token）**：access token、refresh token、存储位置权衡](./notes/05-fullstack-auth/5.2-auth/5.2.2.jwt-json-web-token.md)
- [ ] [5.2.3 前端登录流程：登录 → 存 Token → 请求携带 → 刷新/登出](./notes/05-fullstack-auth/5.2-auth/5.2.3.token.md)
- [ ] [5.2.4 请求头：](./notes/05-fullstack-auth/5.2-auth/5.2.4.authorization-bearer-token.md)`Authorization: Bearer <token>`
- [ ] [5.2.5 **OAuth 2.0** 与第三方登录（微信、GitHub、Google）基本概念](./notes/05-fullstack-auth/5.2-auth/5.2.5.oauth.md)
- [ ] [5.2.6 **SSO** 单点登录概念](./notes/05-fullstack-auth/5.2-auth/5.2.6.sso.md)
- [ ] [5.2.7 前端权限控制：路由级、菜单级、按钮级（RBAC 思路）](./notes/05-fullstack-auth/5.2-auth/5.2.7.rbac.md)
- [ ] [5.2.8 📱 移动端对照：Token 存储 ≈ Keychain/Keystore；Cookie 会话 ≈ 服务端 Session](./notes/05-fullstack-auth/5.2-auth/5.2.8.token-keychain-keystore-cookie-session.md)



### 5.3 跨域与安全传输

- [ ] [5.3.1 同源策略详解](./notes/05-fullstack-auth/5.3-cors/5.3.1.item-5-3-1.md)
- [ ] [5.3.2 **CORS**：简单请求、预检请求（OPTIONS）、服务端响应头配置](./notes/05-fullstack-auth/5.3-cors/5.3.2.cors.md)
- [ ] [5.3.3 开发环境代理：](./notes/05-fullstack-auth/5.3-cors/5.3.3.vite.config.md)`vite.config` [/](./notes/05-fullstack-auth/5.3-cors/5.3.3.vite.config.md) `webpack-dev-server` [proxy](./notes/05-fullstack-auth/5.3-cors/5.3.3.vite.config.md)
- [ ] [5.3.4 JSONP 的历史方案（了解）](./notes/05-fullstack-auth/5.3-cors/5.3.4.jsonp.md)
- [ ] [5.3.5 HTTPS 强制与安全响应头（了解：](./notes/05-fullstack-auth/5.3-cors/5.3.5.content-security-policy.md)`Content-Security-Policy`[、](./notes/05-fullstack-auth/5.3-cors/5.3.5.content-security-policy.md)`X-Frame-Options`[）](./notes/05-fullstack-auth/5.3-cors/5.3.5.content-security-policy.md)



### 5.4 数据格式与协议

- [ ] [5.4.1 JSON 设计与前后端字段约定（驼峰 vs 下划线）](./notes/05-fullstack-auth/5.4-data-protocols/5.4.1.json-vs.md)
- [ ] [5.4.2 分页、排序、筛选的 API 参数设计](./notes/05-fullstack-auth/5.4-data-protocols/5.4.2.api.md)
- [ ] [5.4.3 文件上传接口约定](./notes/05-fullstack-auth/5.4-data-protocols/5.4.3.item-5-4-3.md)
- [ ] [5.4.4 错误码与统一响应结构（](./notes/05-fullstack-auth/5.4-data-protocols/5.4.4.code-data-message.md)`{ code, data, message }`[）](./notes/05-fullstack-auth/5.4-data-protocols/5.4.4.code-data-message.md)
- [ ] [5.4.5 GraphQL 基本概念（选学）：与 REST 对比](./notes/05-fullstack-auth/5.4-data-protocols/5.4.5.graphql-rest.md)
- [ ] [5.4.6 gRPC / Protobuf 在 Web 中的了解（grpc-web）](./notes/05-fullstack-auth/5.4-data-protocols/5.4.6.grpc-protobuf-web-grpc-web.md)



### 5.5 实时通信

- [ ] [5.5.1 **WebSocket** 客户端 API：连接、发送、心跳、重连](./notes/05-fullstack-auth/5.5-realtime/5.5.1.websocket.md)
- [ ] [5.5.2 **Socket.IO** 或原生 WebSocket 封装](./notes/05-fullstack-auth/5.5-realtime/5.5.2.socket.io.md)
- [ ] [5.5.3 **Server-Sent Events (SSE)** 与 WebSocket 场景对比](./notes/05-fullstack-auth/5.5-realtime/5.5.3.server-sent-events-sse.md)
- [ ] [5.5.4 📱 移动端对照：WebSocket ≈ 长连接推送；SSE ≈ 单向流式更新](./notes/05-fullstack-auth/5.5-realtime/5.5.4.websocket-sse.md)

---
