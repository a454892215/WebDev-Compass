# Web 开发知识库地图

> 面向具备 Android / Flutter / React Native 经验的开发者，系统梳理 Web 开发从入门到中级工程师所需的全部知识点。  
> 与 [README](./README.md) 中的学习目标一致：建立完整知识体系，达到中级 Web 开发工程师水平，能独立完成常见企业级 Web 开发需求。

---

## 如何使用本地图

- **按阶段学习**：从阶段 0 开始，逐阶段推进；每完成一项可在 `[ ]` 中打勾为 `[x]`。
- **对照笔记与示例**：每个知识点链接到 `notes/` 中的详情笔记与 `examples/` 中的配套代码。
- **移动端对照**：文中标注 **📱 移动端对照** 的条目，帮助你用已有经验快速理解 Web 概念。
- **能力锚点**：阶段 4 结束时，应达到 README 所述「中级 Web 开发工程师」能力。

---

## 学习路线总览

```mermaid
flowchart LR
    S0[阶段0 环境与心智模型] --> S1[阶段1 Web基础三件套]
    S1 --> S2[阶段2 JavaScript深入与浏览器]
    S2 --> S3[阶段3 工程化与TypeScript]
    S3 --> S4[阶段4 框架与状态管理]
    S4 --> S5[阶段5 全栈协作与认证]
    S5 --> S6[阶段6 性能安全与可访问性]
    S6 --> S7[阶段7 部署运维与进阶]
```

| 阶段  | 主题                 | 核心产出                  |
| --- | ------------------ | --------------------- |
| 0   | 环境与心智模型            | 能搭建开发环境，理解 Web 应用运行方式 |
| 1   | HTML / CSS / JS 基础 | 能独立实现静态页面与基础交互        |
| 2   | JS 深入与浏览器原理        | 理解事件循环、DOM、网络与存储      |
| 3   | 工程化与 TypeScript    | 能使用现代工具链组织中型项目        |
| 4   | 框架与状态管理            | 能用主流框架开发 SPA 应用       |
| 5   | 全栈协作与认证            | 能对接 API、处理登录与权限       |
| 6   | 性能、安全与可访问性         | 能优化体验并规避常见安全风险        |
| 7   | 部署运维与进阶            | 能完成构建发布，了解 SSR 等进阶方向  |

---

## 阶段 0：环境与心智模型

### 0.1 Web 应用是什么

> 📖 本章笔记：[notes/00-environment/0.1-what-is-web-app/](./notes/00-environment/0.1-what-is-web-app/README.md)

- [ ] 理解 **[1.客户端—服务器（C/S）模型与请求—响应循环](./notes/00-environment/0.1-what-is-web-app/1.client-server-model.md)**
- [ ] 理解 **[2.浏览器的角色：HTML/CSS/JS 解析、渲染、执行](./notes/00-environment/0.1-what-is-web-app/2.browser-role.md)**
- [ ] 理解 **[3.单页应用（SPA）vs 多页应用（MPA）的区别与适用场景](./notes/00-environment/0.1-what-is-web-app/3.spa-vs-mpa.md)**
- [ ] 理解 **[4.同源策略与跨域问题的来源](./notes/00-environment/0.1-what-is-web-app/4.same-origin-policy.md)**
- [ ] 📱 移动端对照：[5.浏览器 ≈ WebView / 系统浏览器；SPA ≈ 单 Activity + Fragment 导航](./notes/00-environment/0.1-what-is-web-app/5.mobile-comparison.md)

### 0.2 开发环境

- [ ] 安装与配置：**Node.js**、**npm / yarn / pnpm**
- [ ] 熟练使用 **VS Code / Cursor** 及 Web 相关插件（ESLint、Prettier、Live Server 等）
- [ ] 熟练使用 **Chrome DevTools**（Elements、Console、Network、Sources、Performance、Application）
- [ ] 了解 **Git** 基础：clone、branch、commit、merge、rebase、PR 工作流
- [ ] 📱 移动端对照：npm ≈ pub / CocoaPods / Gradle 依赖管理；Vite dev server ≈ Hot Reload

### 0.3 网络基础（Web 开发者必备）

- [ ] **URL** 结构：协议、域名、端口、路径、查询参数、锚点
- [ ] **HTTP/HTTPS** 协议：方法（GET/POST/PUT/PATCH/DELETE）、状态码、请求头/响应头
- [ ] **HTTP/1.1、HTTP/2、HTTP/3** 基本概念与差异
- [ ] **Cookie、Session、LocalStorage、SessionStorage** 的区别与使用场景
- [ ] **DNS** 解析与 **CDN** 基本概念
- [ ] **TLS/SSL** 与 HTTPS 加密的基本原理
- [ ] **RESTful API** 设计风格与常见约定
- [ ] **WebSocket** 与长连接的基本概念
- [ ] 📱 移动端对照：Retrofit/OkHttp/Dio ≈ fetch/axios；SharedPreferences ≈ localStorage

---

## 阶段 1：Web 基础三件套

### 1.1 HTML

#### 文档结构与语义化

- [ ] `<!DOCTYPE html>`、`<html>`、`<head>`、`<body>` 文档结构
- [ ] 语义化标签：`<header>`、`<nav>`、`<main>`、`<section>`、`<article>`、`<aside>`、`<footer>`
- [ ] 标题与文本：`<h1>`–`<h6>`、`<p>`、`<span>`、`<strong>`、`<em>`、`<br>`、`<hr>`
- [ ] 列表：`<ul>`、`<ol>`、`<li>`、`<dl>`、`<dt>`、`<dd>`
- [ ] 链接与导航：`<a href>`、锚点、相对路径与绝对路径
- [ ] 图片与媒体：`<img>`、`<picture>`、`<video>`、`<audio>`、`<source>`、`<figure>`、`<figcaption>`
- [ ] 表格：`<table>`、`<thead>`、`<tbody>`、`<tr>`、`<th>`、`<td>`、`<caption>`
- [ ] 元信息：`<meta>`（charset、viewport、description、OG 标签）、`<title>`、`<link>`、`<script>`

#### 表单与用户输入

- [ ] 表单：`<form>`、`<input>` 各类型（text、password、email、number、checkbox、radio、file、hidden 等）
- [ ] `<textarea>`、`<select>`、`<option>`、`<optgroup>`、`<button>`、`<label>`、`<fieldset>`、`<legend>`
- [ ] 表单属性：`required`、`disabled`、`readonly`、`placeholder`、`pattern`、`min`/`max`、`autocomplete`
- [ ] 表单提交：method、action、enctype（`application/x-www-form-urlencoded`、`multipart/form-data`）
- [ ] 原生表单验证与自定义验证提示

#### HTML5 进阶

- [ ] `<canvas>` 2D 绑图基础
- [ ] `<svg>` 矢量图形基础
- [ ] `<template>`、`<slot>`（为 Web Components 打基础）
- [ ] `<details>` / `<summary>`、`<dialog>`、`<progress>`、`<meter>`
- [ ] `data-*` 自定义属性
- [ ] **SEO 基础**：语义化、标题层级、meta description、结构化数据（JSON-LD 概念）

### 1.2 CSS

#### 基础与选择器

- [ ] CSS 引入方式：内联、`<style>`、外部样式表
- [ ] 选择器：元素、类、ID、属性、伪类（`:hover`、`:focus`、`:nth-child` 等）、伪元素（`::before`、`::after`）
- [ ] 选择器优先级与特异性（Specificity）计算
- [ ] 继承与 `inherit`、`initial`、`unset`、`revert`
- [ ] CSS 变量（Custom Properties）：`--name`、`var()`

#### 盒模型与布局

- [ ] **盒模型**：content、padding、border、margin；`box-sizing: content-box` vs `border-box`
- [ ] **显示类型**：`display: block | inline | inline-block | none | flex | grid`
- [ ] **定位**：`static`、`relative`、`absolute`、`fixed`、`sticky`
- [ ] **Flexbox**：主轴/交叉轴、`justify-content`、`align-items`、`flex-grow/shrink/basis`、`gap`
- [ ] **Grid**：`grid-template-columns/rows`、`fr` 单位、`grid-area`、`gap`、隐式网格
- [ ] **传统布局**：浮动（float）与清除（clear）— 了解即可，现代项目优先 Flex/Grid
- [ ] **多列布局**（`column-count` 等）基础了解

#### 视觉与排版

- [ ] 颜色：命名色、HEX、RGB/RGBA、HSL/HSLA
- [ ] 字体：`font-family`、`font-size`、`font-weight`、`line-height`、`letter-spacing`
- [ ] `@font-face` 与 Web 字体加载
- [ ] 文本：`text-align`、`text-decoration`、`text-overflow`、`white-space`、`word-break`
- [ ] 背景：`background-color`、`background-image`、`background-size/position/repeat`
- [ ] 边框与圆角：`border`、`border-radius`、`box-shadow`
- [ ] 溢出：`overflow`、`overflow-x/y`、`text-overflow: ellipsis`

#### 响应式与适配

- [ ] **媒体查询**（`@media`）：断点设计、移动优先 vs 桌面优先
- [ ] **viewport** 与移动端适配
- [ ] 相对单位：`rem`、`em`、`vw`、`vh`、`%`、`ch`
- [ ] 图片响应式：`max-width: 100%`、`<picture>`、`srcset`、`sizes`
- [ ] **容器查询**（Container Queries）基本概念
- [ ] 📱 移动端对照：CSS Flex/Grid ≈ Flutter Row/Column/Wrap、RN Flexbox；rem ≈ 相对尺寸单位

#### 动画与交互

- [ ] `transition`：属性、时长、缓动函数
- [ ] `@keyframes` 与 `animation`
- [ ] `transform`：`translate`、`rotate`、`scale`、`skew`
- [ ] `cursor`、`user-select`、`pointer-events`
- [ ] 性能注意：优先使用 `transform` 和 `opacity` 做动画（合成层）

#### CSS 工程化入门

- [ ] **BEM** 命名规范
- [ ] CSS Modules 概念
- [ ] 预处理器基础（**Sass/SCSS**）：变量、嵌套、混入（`@mixin`）、继承
- [ ] 原子化 CSS 概念（Tailwind CSS 思路）
- [ ] 现代 CSS：`:is()`、`:where()`、`clamp()`、`min()`、`max()`、逻辑属性（`margin-inline` 等）

### 1.3 JavaScript 基础

#### 语言核心

- [ ] 变量：`var`、`let`、`const` 与暂时性死区（TDZ）
- [ ] 数据类型：原始类型（string、number、boolean、null、undefined、symbol、bigint）与引用类型（object）
- [ ] 类型判断：`typeof`、`instanceof`、`Array.isArray()`、`Object.prototype.toString`
- [ ] 类型转换：隐式转换、显式转换（`Number()`、`String()`、`Boolean()`）
- [ ] 运算符：算术、比较、逻辑、空值合并（`??`）、可选链（`?.`）
- [ ] 条件：`if/else`、`switch`、`三元表达式`
- [ ] 循环：`for`、`while`、`do...while`、`for...of`、`for...in`
- [ ] 函数：声明、表达式、箭头函数、`this` 绑定基础
- [ ] 作用域：全局、函数、块级作用域；作用域链
- [ ] 闭包（Closure）概念与应用场景
- [ ] 数组：创建、`map`、`filter`、`reduce`、`find`、`some`、`every`、`forEach`、解构
- [ ] 对象：字面量、属性访问、展开运算符（`...`）、解构、计算属性名
- [ ] 字符串：模板字面量、常用方法（`slice`、`split`、`includes`、`replace` 等）
- [ ] 📱 移动端对照：JS 基础语法与 Dart/Kotlin/Swift 差异；弱类型 vs 强类型

#### ES6+ 重要特性

- [ ] 类（`class`）：constructor、方法、继承（`extends`）、`super`、静态方法
- [ ] 模块（ES Modules）：`import` / `export`（default vs named）
- [ ] Promise 基础：`then`、`catch`、`finally`
- [ ] `async` / `await`
- [ ] 迭代器与生成器（了解）
- [ ] `Map`、`Set`、`WeakMap`、`WeakSet`
- [ ] 可选链、空值合并、逻辑赋值（`&&=`、`||=`）
- [ ] 顶层 `await`（了解）

#### DOM 操作

- [ ] DOM 树概念：Document、Element、Node、Text
- [ ] 查询：`getElementById`、`querySelector`、`querySelectorAll`
- [ ] 创建与修改：`createElement`、`appendChild`、`insertBefore`、`removeChild`
- [ ] 属性与样式：`setAttribute`、`classList`（add/remove/toggle）、`style`、`dataset`
- [ ] 内容：`textContent` vs `innerHTML`（及 XSS 风险）
- [ ] 尺寸与位置：`offsetWidth/Height`、`clientWidth/Height`、`getBoundingClientRect()`
- [ ] 📱 移动端对照：DOM 操作 ≈ 直接操作 Widget 树（Flutter/RN 中较少手写，但理解有助于调试）

#### 事件

- [ ] 事件监听：`addEventListener`、`removeEventListener`
- [ ] 事件流：捕获阶段、目标阶段、冒泡阶段
- [ ] `event.target` vs `event.currentTarget`
- [ ] 阻止默认行为与冒泡：`preventDefault()`、`stopPropagation()`
- [ ] 常见事件：`click`、`input`、`change`、`submit`、`keydown/keyup`、`focus/blur`、`scroll`、`resize`
- [ ] 事件委托（Event Delegation）
- [ ] 自定义事件：`CustomEvent`、`dispatchEvent`

#### 异步与网络

- [ ] 回调函数与回调地狱问题
- [ ] `XMLHttpRequest` 基础（了解即可，现代用 fetch）
- [ ] **Fetch API**：GET/POST 请求、请求头、响应处理、`response.json()`
- [ ] 错误处理：`try/catch/finally`、`throw`
- [ ] 定时器：`setTimeout`、`setInterval`、`requestAnimationFrame`
- [ ] JSON：`JSON.parse`、`JSON.stringify`

---

## 阶段 2：JavaScript 深入与浏览器原理

### 2.1 JavaScript 进阶

- [ ] **原型链**：`prototype`、`__proto__`、`Object.create`
- [ ] `this` 详解：默认绑定、隐式绑定、显式绑定（`call/apply/bind`）、`new` 绑定、箭头函数
- [ ] **执行上下文**与**调用栈**
- [ ] **事件循环（Event Loop）**：宏任务、微任务、`Promise` 与 `setTimeout` 执行顺序
- [ ] 深拷贝 vs 浅拷贝：展开运算符、`structuredClone`、`JSON` 方式的局限
- [ ] 防抖（Debounce）与节流（Throttle）
- [ ] 柯里化、组合函数（了解）
- [ ] 模块化发展史：IIFE → CommonJS → AMD → ES Modules
- [ ] 严格模式（`'use strict'`）
- [ ] 内存管理与垃圾回收基本概念；常见内存泄漏场景（闭包、未清理的监听器、定时器）
- [ ] 📱 移动端对照：Event Loop ≈ Flutter 单线程 + Event Queue / RN JS Bridge 异步模型

### 2.2 浏览器原理

- [ ] 浏览器多进程架构（主进程、渲染进程、GPU 进程等）概览
- [ ] **渲染流水线**：HTML 解析 → DOM 树、CSS 解析 → CSSOM → 渲染树 → 布局（Layout/Reflow）→ 绘制（Paint）→ 合成（Composite）
- [ ] 重排（Reflow）与重绘（Repaint）的触发条件与优化思路
- [ ] 关键渲染路径（Critical Rendering Path）优化
- [ ] 合成层与 `will-change`、GPU 加速
- [ ] 脚本加载：`async`、`defer` 区别
- [ ] 资源优先级与预加载：`<link rel="preload">`、`prefetch`、`preconnect`
- [ ] 浏览器缓存：**强缓存**（Cache-Control、Expires）与**协商缓存**（ETag、Last-Modified）
- [ ] Service Worker 与 PWA 基本概念

### 2.3 浏览器存储

- [ ] `localStorage` / `sessionStorage` API 与限制
- [ ] **Cookie**：属性（`HttpOnly`、`Secure`、`SameSite`、`Domain`、`Path`、`Max-Age`）
- [ ] **IndexedDB** 基本概念（大型结构化本地存储）
- [ ] 存储方案选型对比

### 2.4 Web API 选学

- [ ] **Intersection Observer**（懒加载、无限滚动）
- [ ] **Resize Observer**
- [ ] **Mutation Observer**
- [ ] **Geolocation API**
- [ ] **Clipboard API**
- [ ] **File API** 与文件读取
- [ ] **History API**（`pushState`、`popstate`）— SPA 路由基础
- [ ] **Web Workers** 基本概念
- [ ] **Notification API** 基础

---

## 阶段 3：工程化与 TypeScript

### 3.1 包管理与项目结构

- [ ] `package.json`：dependencies vs devDependencies、`scripts`、`engines`
- [ ] **npm / yarn / pnpm** 常用命令：install、run、publish、workspace
- [ ] **语义化版本**（SemVer）：`^`、`~`、锁定版本
- [ ] `package-lock.json` / `yarn.lock` / `pnpm-lock.yaml` 的作用
- [ ] **monorepo** 概念（了解 Lerna、Turborepo、pnpm workspace）
- [ ] 常见项目目录结构约定（`src/`、`public/`、`dist/`、`tests/`）

### 3.2 构建工具

- [ ] 为什么需要构建工具：模块化、转译、打包、压缩、HMR
- [ ] **Vite**：项目创建、配置、`index.html` 入口、环境变量（`.env`）
- [ ] **Webpack** 核心概念（了解）：entry、output、loader、plugin、HMR
- [ ] 开发服务器与热更新（HMR）原理
- [ ] 生产构建：代码分割（Code Splitting）、Tree Shaking、压缩
- [ ] Source Map 的作用与类型
- [ ] 📱 移动端对照：Vite/Webpack ≈ Gradle/Xcode Build + Metro Bundler

### 3.3 TypeScript

- [ ] 为什么使用 TypeScript：类型安全、IDE 支持、可维护性
- [ ] 基础类型：`string`、`number`、`boolean`、`array`、`tuple`、`enum`、`any`、`unknown`、`void`、`never`
- [ ] 接口（`interface`）与类型别名（`type`）
- [ ] 联合类型与交叉类型
- [ ] 泛型：函数泛型、约束（`extends`）、常用工具类型（`Partial`、`Pick`、`Omit`、`Record`）
- [ ] 类型断言与类型守卫（`typeof`、`instanceof`、自定义守卫）
- [ ] 函数类型：参数、返回值、可选参数、默认参数
- [ ] 类与访问修饰符：`public`、`private`、`protected`、`readonly`
- [ ] 模块与声明文件（`.d.ts`）
- [ ] `tsconfig.json` 核心配置：`strict`、`target`、`module`、`paths`（路径别名）
- [ ] 与 React/Vue 结合的 TS 类型（组件 Props、事件类型）— 在阶段 4 深化
- [ ] 📱 移动端对照：TypeScript ≈ Dart 的类型系统 / Kotlin 空安全

### 3.4 代码质量

- [ ] **ESLint**：规则配置、`eslint-config`、与编辑器集成
- [ ] **Prettier**：格式化与 ESLint 协作
- [ ] **EditorConfig**
- [ ] **Husky** + **lint-staged**：提交前检查
- [ ] **Conventional Commits** 提交规范
- [ ] `.gitignore` 与 `.npmignore`

### 3.5 测试基础

- [ ] 测试金字塔：单元测试、集成测试、E2E 测试
- [ ] **Vitest** / **Jest**：基本断言、`describe`/`it`、mock 函数
- [ ] **React Testing Library** / **Vue Test Utils** 组件测试入门
- [ ] **Playwright** / **Cypress** E2E 测试概念
- [ ] 测试覆盖率与合理预期

---

## 阶段 4：框架与状态管理

> 主流框架建议至少深入一个（**React** 或 **Vue**）。有 React Native 经验者优先深耕 React 生态。

### 4.1 前端框架共通概念

- [ ] 声明式 UI vs 命令式 UI
- [ ] 组件化：组合、复用、单向数据流
- [ ] 虚拟 DOM / 响应式系统原理（概念级）
- [ ] 客户端路由 vs 服务端路由
- [ ] 受控组件 vs 非受控组件
- [ ] 条件渲染、列表渲染与 `key` 的作用
- [ ] 📱 移动端对照：React ≈ React Native；Vue ≈ 组合 Widget + 响应式状态

### 4.2 React 生态

#### React 核心

- [ ] JSX 语法与表达式
- [ ] 函数组件与类组件（重点函数组件）
- [ ] Props 与 children
- [ ] State：`useState`、状态不可变性（immutable 更新）
- [ ] 副作用：`useEffect`、依赖数组、清理函数
- [ ] 引用：`useRef`（DOM 引用与可变值）
- [ ] 性能：`useMemo`、`useCallback`、`React.memo`
- [ ] Context：`createContext`、`useContext` — 跨层传递
- [ ] Reducer：`useReducer` — 复杂状态逻辑
- [ ] 自定义 Hook：逻辑复用
- [ ] 错误边界（Error Boundary）
- [ ] Fragment、`Portal`、`Suspense` 基础
- [ ] Strict Mode 与双调用（开发环境）

#### React 路由

- [ ] **React Router**：`BrowserRouter`、`Routes`、`Route`、`Link`、`useNavigate`、`useParams`、`useSearchParams`
- [ ] 嵌套路由与布局路由（Layout Route）
- [ ] 路由守卫思路：鉴权重定向
- [ ] 懒加载路由：`React.lazy` + `Suspense`

#### React 状态管理

- [ ] 何时需要全局状态管理
- [ ] **Zustand** 或 **Jotai**（轻量方案）
- [ ] **Redux Toolkit**：slice、`createAsyncThunk`、中间件概念
- [ ] 服务端状态：**TanStack Query (React Query)** — 请求缓存、重试、失效、乐观更新
- [ ] 表单：**React Hook Form** + **Zod** 校验

#### React 工程实践

- [ ] 组件设计：展示组件 vs 容器组件
- [ ] 组件库使用：**Ant Design**、**Material UI**、**shadcn/ui** 等
- [ ] CSS 方案：CSS Modules、Styled Components、Tailwind CSS
- [ ] **Next.js** 入门：文件路由、API Routes、SSR/SSG 概念（阶段 7 深化）

### 4.3 Vue 生态

#### Vue 3 核心

- [ ] 模板语法：`{{ }}`、指令（`v-if`、`v-for`、`v-show`、`v-bind`、`v-on`、`v-model`）
- [ ] 组合式 API：`setup`、`ref`、`reactive`、`computed`、`watch`、`watchEffect`
- [ ] 生命周期钩子（`onMounted` 等）
- [ ] 组件：Props、`emit`、插槽（默认、具名、作用域）
- [ ] 依赖注入：`provide` / `inject`
- [ ] 模板引用：`ref` 获取 DOM
- [ ] 动态组件与 `<KeepAlive>`

#### Vue 路由与状态

- [ ] **Vue Router**：路由配置、导航守卫、动态路由、路由懒加载
- [ ] **Pinia**：store 定义、state、getters、actions

#### Vue 工程实践

- [ ] 单文件组件（`.vue`）：`<template>`、`<script setup>`、`<style scoped>`
- [ ] 组件库：**Element Plus**、**Naive UI**、**Vuetify** 等
- [ ] **Nuxt** 入门概念（SSR 框架）

### 4.4 CSS 框架与 UI 体系

- [ ] **Tailwind CSS**：工具类、配置、响应式前缀、暗色模式
- [ ] 设计系统概念：颜色、间距、字体、组件规范
- [ ] 图标方案：Icon Font、SVG Icon（如 Lucide、Heroicons）
- [ ] 暗色模式实现：`prefers-color-scheme`、CSS 变量切换、class 策略

---

## 阶段 5：全栈协作与认证

### 5.1 HTTP 客户端与 API 对接

- [ ] **axios** 封装：实例、拦截器、错误统一处理
- [ ] 请求取消：AbortController
- [ ] 上传/下载：FormData、Blob、进度监听
- [ ] API 版本管理与文档阅读（OpenAPI / Swagger）
- [ ] Mock 数据：**MSW (Mock Service Worker)** 或 mock 服务器
- [ ] 环境区分：dev / staging / production 的 baseURL 配置

### 5.2 认证与授权

- [ ] **Session + Cookie** 认证流程
- [ ] **JWT（JSON Web Token）**：access token、refresh token、存储位置权衡
- [ ] 前端登录流程：登录 → 存 Token → 请求携带 → 刷新/登出
- [ ] 请求头：`Authorization: Bearer <token>`
- [ ] **OAuth 2.0** 与第三方登录（微信、GitHub、Google）基本概念
- [ ] **SSO** 单点登录概念
- [ ] 前端权限控制：路由级、菜单级、按钮级（RBAC 思路）
- [ ] 📱 移动端对照：Token 存储 ≈ Keychain/Keystore；Cookie 会话 ≈ 服务端 Session

### 5.3 跨域与安全传输

- [ ] 同源策略详解
- [ ] **CORS**：简单请求、预检请求（OPTIONS）、服务端响应头配置
- [ ] 开发环境代理：`vite.config` / `webpack-dev-server` proxy
- [ ] JSONP 的历史方案（了解）
- [ ] HTTPS 强制与安全响应头（了解：`Content-Security-Policy`、`X-Frame-Options`）

### 5.4 数据格式与协议

- [ ] JSON 设计与前后端字段约定（驼峰 vs 下划线）
- [ ] 分页、排序、筛选的 API 参数设计
- [ ] 文件上传接口约定
- [ ] 错误码与统一响应结构（`{ code, data, message }`）
- [ ] GraphQL 基本概念（选学）：与 REST 对比
- [ ] gRPC / Protobuf 在 Web 中的了解（grpc-web）

### 5.5 实时通信

- [ ] **WebSocket** 客户端 API：连接、发送、心跳、重连
- [ ] **Socket.IO** 或原生 WebSocket 封装
- [ ] **Server-Sent Events (SSE)** 与 WebSocket 场景对比
- [ ] 📱 移动端对照：WebSocket ≈ 长连接推送；SSE ≈ 单向流式更新

---

## 阶段 6：性能、安全与可访问性

### 6.1 性能优化

#### 加载性能

- [ ] 性能指标：**Core Web Vitals**（LCP、INP、CLS）
- [ ] 网络优化：减少请求、压缩（Gzip/Brotli）、HTTP/2 多路复用
- [ ] 资源优化：图片格式（WebP/AVIF）、懒加载、响应式图片
- [ ] 关键 CSS 内联、非关键 CSS 异步
- [ ] JS 优化：代码分割、动态 import、Tree Shaking、减少 bundle 体积
- [ ] 第三方脚本延迟加载
- [ ] 预连接、预加载、预获取策略
- [ ] CDN 加速静态资源

#### 运行时性能

- [ ] 避免不必要的重排重绘
- [ ] 虚拟列表（长列表优化）
- [ ] 防抖节流在滚动、搜索中的应用
- [ ] Web Worker 处理密集计算
- [ ] React/Vue 性能优化实践：memo、key、合理拆分组件、避免内联对象
- [ ] 使用 Performance API 与 Lighthouse 分析

#### 缓存策略

- [ ] 浏览器缓存层级
- [ ] Service Worker 缓存策略（Cache First、Network First 等）
- [ ] 应用层缓存：React Query 缓存、HTTP 缓存头设置

### 6.2 Web 安全

- [ ] **XSS（跨站脚本）**：存储型、反射型、DOM 型；防御（转义、CSP、`HttpOnly` Cookie）
- [ ] **CSRF（跨站请求伪造）**：Token 验证、SameSite Cookie
- [ ] **点击劫持**：`X-Frame-Options`、`frame-ancestors`
- [ ] 敏感信息泄露：不在前端存密钥、Source Map 生产环境处理
- [ ] 依赖安全：`npm audit`、供应链安全基本意识
- [ ] CORS 配置错误导致的安全问题
- [ ] 📱 移动端对照：Web XSS ≈ 恶意脚本注入；RN 中较少但 WebView 场景需注意

### 6.3 可访问性（a11y）

- [ ] WCAG 基本等级（A / AA）概念
- [ ] 语义化 HTML 与屏幕阅读器
- [ ] `alt` 文本、`aria-label`、`aria-hidden`、`role` 属性
- [ ] 键盘导航：`tabindex`、焦点管理、跳过链接
- [ ] 颜色对比度与不只依赖颜色传达信息
- [ ] 表单：`label` 关联、错误提示与 `aria-describedby`
- [ ] 使用 axe DevTools / Lighthouse a11y 检测

### 6.4 国际化（i18n）

- [ ] 多语言文案管理方案
- [ ] **i18next** / **vue-i18n** 基本使用
- [ ] 日期、数字、货币格式化（`Intl` API）
- [ ] RTL（从右到左）布局基本概念

### 6.5 SEO（搜索引擎优化）

- [ ] 爬虫工作原理与 SPA 的 SEO 挑战
- [ ] 语义化 HTML、合理标题层级
- [ ] Meta 标签：title、description、canonical
- [ ] Open Graph 与 Twitter Card（社交分享）
- [ ] `sitemap.xml`、`robots.txt`
- [ ] 结构化数据（Schema.org / JSON-LD）
- [ ] SSR/SSG 对 SEO 的价值（与 Next.js/Nuxt 关联）

---

## 阶段 7：部署运维与进阶方向

### 7.1 构建与部署

- [ ] 生产构建产物分析：`dist` 目录、资源哈希
- [ ] 静态资源托管：**Vercel**、**Netlify**、**GitHub Pages**、**Cloudflare Pages**
- [ ] **Nginx** 基础：静态文件服务、`try_files`、反向代理、gzip
- [ ] 环境变量在构建与运行时的注入
- [ ] SPA 部署：History 模式下的 fallback 配置
- [ ] Docker 容器化前端应用（了解 Dockerfile 多阶段构建）
- [ ] CI/CD 基础：**GitHub Actions** 自动构建与部署

### 7.2 服务端渲染与全栈框架

- [ ] CSR vs SSR vs SSG vs ISR 概念与选型
- [ ] **Next.js**：页面路由/App Router、SSR/SSG、`getServerSideProps` 或 Server Components 概念
- [ ] **Nuxt**：服务端渲染与静态生成
- [ ] 水合（Hydration）概念
- [ ] 同构应用注意事项（浏览器 API 兼容）

### 7.3 进阶主题（持续学习）

- [ ] **微前端** 架构概念（Module Federation 等）
- [ ] **Web Components**：Custom Elements、Shadow DOM
- [ ] **GraphQL** 客户端（Apollo Client、urql）
- [ ] **WebAssembly (WASM)** 应用场景
- [ ] **Electron** / **Tauri** 桌面应用
- [ ] **React Native Web** / **Expo Web** — 跨端代码复用
- [ ] 可视化：**D3.js**、**ECharts**、**Chart.js**
- [ ] 富文本编辑器：ProseMirror、Slate、TipTap
- [ ] 低代码/无代码平台原理了解

### 7.4 软技能与工程实践

- [ ] 阅读官方文档与 RFC 的能力
- [ ] 需求分析与技术方案简述
- [ ] Code Review 要点：可读性、边界情况、性能、安全
- [ ] 技术债务识别与渐进式重构
- [ ] 与后端、设计、产品的协作流程
- [ ] 撰写 README、CHANGELOG、API 对接文档

---

## 知识点索引（按领域）

便于按需查阅，将上述阶段内容按技术领域重新归类：

| 领域 | 涵盖阶段 | 关键知识点 |
|------|----------|------------|
| HTML | 1 | 语义化、表单、SEO 基础 |
| CSS | 1、4 | 布局、响应式、动画、Tailwind |
| JavaScript | 1、2 | 语法、异步、DOM、事件循环 |
| 浏览器 | 0、2 | 渲染原理、缓存、存储、DevTools |
| 网络 | 0、5 | HTTP、HTTPS、REST、WebSocket、CORS |
| TypeScript | 3 | 类型系统、泛型、工程配置 |
| 工程化 | 3 | 包管理、Vite/Webpack、Lint、测试 |
| React | 4 | Hooks、路由、状态管理、Next.js |
| Vue | 4 | 组合式 API、Pinia、Vue Router、Nuxt |
| 认证安全 | 5、6 | JWT、Session、XSS、CSRF、CORS |
| 性能 | 6 | Core Web Vitals、代码分割、缓存 |
| 可访问性 | 6 | WCAG、ARIA、键盘导航 |
| 部署 | 7 | 静态托管、Nginx、CI/CD、Docker |

---

## 推荐学习顺序与里程碑

### 里程碑 1：能写静态页面（阶段 0–1，约 2–4 周）

- 产出：一个响应式个人介绍页或产品落地页（纯 HTML/CSS）

### 里程碑 2：能写交互式页面（阶段 1–2，约 2–4 周）

- 产出：Todo 应用、天气查询等小项目（原生 JS + Fetch）

### 里程碑 3：能使用现代工具链（阶段 3，约 1–2 周）

- 产出：用 Vite + TypeScript 重构之前的项目

### 里程碑 4：能开发 SPA 应用（阶段 4–5，约 4–8 周）

- 产出：带登录、列表、表单的完整管理后台或电商前台（React 或 Vue）

### 里程碑 5：达到中级工程师标准（阶段 6–7，约 2–4 周）

- 产出：对里程碑 4 的项目做性能优化、部署上线，并撰写技术文档

---

## 与移动端经验的加速路径

若你已有 **React Native** 经验，可优先学习：

1. 阶段 1 的 **HTML/CSS**（RN 中较弱的部分）
2. 阶段 2 的 **浏览器原理与 DOM**（RN 无 DOM）
3. 阶段 5 的 **Cookie/CORS/Session**（RN 跨域场景不同）
4. 阶段 6 的 **SEO、a11y、Core Web Vitals**
5. 阶段 7 的 **部署与 Nginx**

若你已有 **Flutter** 经验，需重点关注：

1. **JavaScript/TypeScript** 整个生态（与 Dart 差异）
2. **HTML 语义化与 CSS 布局**（无 Widget 系统）
3. **浏览器 DevTools** 调试（替代 Flutter DevTools 的部分能力）
4. **npm 生态与 Web 构建工具链**

若你已有 **Android** 经验，需重点关注：

1. **CSS 与响应式布局**（无 XML Layout）
2. **JavaScript 异步模型与前端框架**
3. **浏览器安全模型**（Web 特有风险）
4. **前端工程化**（与 Gradle 不同的工具链）

---

## 配套资源规划（本项目目录建议）

随知识库完善，建议按以下结构组织内容：

```
WebDev_Compass/
├── README.md                 # 项目总览
├── KNOWLEDGE_MAP.md          # 本文件：知识库地图
├── notes/                    # 各知识点详情笔记（点击地图中链接跳转）
│   ├── README.md
│   ├── 00-environment/       # 阶段 0
│   │   └── 0.1-what-is-web-app/  ✅
│   ├── 01-html/              # 待补充
│   └── ...
├── examples/                 # 可运行代码示例
│   ├── README.md
│   ├── 00-environment/
│   │   └── 0.1-what-is-web-app/  ✅
│   └── ...
└── projects/                 # 框架工程化完整示例（待补充）
```

---

## 版本记录

| 版本 | 日期 | 说明 |
|------|------|------|
| 1.0 | 2026-07-09 | 初始版本：完整知识库地图与阶段划分 |

---

**下一步**：从 [阶段 0](#阶段-0环境与心智模型) 开始，点击知识点链接阅读 `notes/` 笔记并运行 `examples/` 示例。
