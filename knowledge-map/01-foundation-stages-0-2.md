<a id="阶段-02基础层"></a>

# 阶段 0–2：HTML/CSS/JavaScript 与浏览器基础

> Web 环境与 HTTP · 原生页面与交互 · 浏览器渲染与存储\
> [← 返回总览](../KNOWLEDGE_MAP.md) · [下一部分 →](./02-engineering-stages-3-5.md)

---

<a id="阶段-0环境与心智模型"></a>

## 阶段 0：Web 开发环境、浏览器与 HTTP 基础

> 主线前置：已有编程经验即可。产出：能解释一次浏览器请求并用 DevTools 定位问题。网络版本、工具命令按需查阅；不要求同时掌握所有包管理器。



<a id="01-web-应用是什么"></a>

### 0.1 Web 页面、浏览器与服务器如何协作

> 📖 本章笔记：[learning/1-notes/00-environment/0.1-what-is-web-app/](../learning/1-notes/00-environment/0.1-what-is-web-app/README.md)

- [x] [0.1.1 **客户端—服务器（C/S）模型与请求—响应循环**](../learning/1-notes/00-environment/0.1-what-is-web-app/0.1.1.client-server-model.md)
- [x] [0.1.2 **浏览器的角色：HTML/CSS/JS 解析、渲染、执行**](../learning/1-notes/00-environment/0.1-what-is-web-app/0.1.2.browser-role.md)
- [x] [0.1.3 **单页应用（SPA）vs 多页应用（MPA）的区别与适用场景**](../learning/1-notes/00-environment/0.1-what-is-web-app/0.1.3.spa-vs-mpa.md)
- [x] [0.1.4 **同源策略与跨域问题的来源**](../learning/1-notes/00-environment/0.1-what-is-web-app/0.1.4.same-origin-policy.md)
- [x] [0.1.5 📱 移动端对照：浏览器 ≈ WebView / 系统浏览器；SPA ≈ 单 Activity + Fragment 导航](../learning/1-notes/00-environment/0.1-what-is-web-app/0.1.5.mobile-comparison.md)



<a id="02-开发环境"></a>

### 0.2 Node.js、包管理器、编辑器与 DevTools

- [x] [0.2.1 安装与配置：**Node.js**、**npm / yarn / pnpm**](../learning/1-notes/00-environment/0.2-dev-environment/0.2.1.node.js.md)
- [x] [0.2.2 熟练使用 **VS Code / Cursor** 及 Web 相关插件（ESLint、Prettier、Live Server 等）](../learning/1-notes/00-environment/0.2-dev-environment/0.2.2.vs-code-cursor.md)
- [x] [0.2.3 熟练使用 **Chrome DevTools**（Elements、Console、Network、Sources、Performance、Application）](../learning/1-notes/00-environment/0.2-dev-environment/0.2.3.chrome-devtools.md)
- [x] [0.2.4 了解 **Git** 基础：clone、branch、commit、merge、rebase、PR 工作流](../learning/1-notes/00-environment/0.2-dev-environment/0.2.4.git.md)
- [x] [0.2.5 📱 移动端对照：npm ≈ pub / CocoaPods / Gradle 依赖管理；Vite dev server ≈ Hot Reload](../learning/1-notes/00-environment/0.2-dev-environment/0.2.5.npm-pub-cocoapods-gradle-vite.md)



<a id="03-网络基础web-开发者必备"></a>

### 0.3 URL、HTTP、Cookie、DNS 与 WebSocket

> 📖 本章笔记：[learning/1-notes/00-environment/0.3-network-basics/](../learning/1-notes/00-environment/0.3-network-basics/README.md)

- [x] [0.3.1 **URL** 结构：协议、域名、端口、路径、查询参数、锚点](../learning/1-notes/00-environment/0.3-network-basics/0.3.1.url.md)
- [x] [0.3.2 **HTTP/HTTPS** 协议：方法（GET/POST/PUT/PATCH/DELETE）、状态码、请求头/响应头](../learning/1-notes/00-environment/0.3-network-basics/0.3.2.http-https.md)
- [x] [0.3.3 **HTTP/1.1、HTTP/2、HTTP/3** 基本概念与差异](../learning/1-notes/00-environment/0.3-network-basics/0.3.3.http-http-http.md)
- [x] [0.3.4 **Cookie、Session、LocalStorage、SessionStorage** 的区别与使用场景](../learning/1-notes/00-environment/0.3-network-basics/0.3.4.cookie-session-localstorage-sessionstorage.md)
- [x] [0.3.5 **DNS** 解析与 **CDN** 基本概念](../learning/1-notes/00-environment/0.3-network-basics/0.3.5.dns.md)
- [x] [0.3.6 **TLS/SSL** 与 HTTPS 加密的基本原理](../learning/1-notes/00-environment/0.3-network-basics/0.3.6.tls-ssl.md)
- [x] [0.3.7 **RESTful API** 设计风格与常见约定](../learning/1-notes/00-environment/0.3-network-basics/0.3.7.restful-api.md)
- [x] [0.3.8 **WebSocket** 与长连接的基本概念](../learning/1-notes/00-environment/0.3-network-basics/0.3.8.websocket.md)
- [x] [0.3.9 📱 移动端对照：Retrofit/OkHttp/Dio ≈ fetch/axios；SharedPreferences ≈ localStorage](../learning/1-notes/00-environment/0.3-network-basics/0.3.9.retrofit-okhttp-dio-fetch-axios.md)


---



<a id="阶段-1web-基础三件套"></a>

## 阶段 1：HTML、CSS 与 JavaScript 页面开发

> 主线前置：阶段 0 的浏览器/请求心智模型。顺序：1.1 语义与表单 → 1.2 布局 → 1.3 交互，1.4 质量要求贯穿练习。产出与验收见[学习主线](../docs/LEARNING_PATH.md)。



### 1.1 HTML



#### 1.1.1 文档结构与语义化

- [ ] [1.1.1.1 `<!DOCTYPE html>`、`<html>`、`<head>`、`<body>` 文档结构](../learning/1-notes/01-web-fundamentals/1.1-html/1.1.1.1.doctype-html.md)
- [ ] [1.1.1.2 语义化标签：`<header>`、`<nav>`、`<main>`、`<section>`、`<article>`、`<aside>`、`<footer>`](../learning/1-notes/01-web-fundamentals/1.1-html/1.1.1.2.header.md)
- [ ] [1.1.1.3 标题与文本：`<h1>`–`<h6>`、`<p>`、`<span>`、`<strong>`、`<em>`、`<br>`、`<hr>`](../learning/1-notes/01-web-fundamentals/1.1-html/1.1.1.3.h1.md)
- [ ] [1.1.1.4 列表：`<ul>`、`<ol>`、`<li>`、`<dl>`、`<dt>`、`<dd>`](../learning/1-notes/01-web-fundamentals/1.1-html/1.1.1.4.ul.md)
- [ ] [1.1.1.5 链接与导航：`<a href>`、锚点、相对路径与绝对路径](../learning/1-notes/01-web-fundamentals/1.1-html/1.1.1.5.a-href.md)
- [ ] [1.1.1.6 图片与媒体：`<img>`、`<picture>`、`<video>`、`<audio>`、`<source>`、`<figure>`、`<figcaption>`](../learning/1-notes/01-web-fundamentals/1.1-html/1.1.1.6.img.md)
- [ ] [1.1.1.7 表格：`<table>`、`<thead>`、`<tbody>`、`<tr>`、`<th>`、`<td>`、`<caption>`](../learning/1-notes/01-web-fundamentals/1.1-html/1.1.1.7.table.md)
- [ ] [1.1.1.8 元信息：`<meta>`（charset、viewport、description、OG 标签）、`<title>`、`<link>`、`<script>`](../learning/1-notes/01-web-fundamentals/1.1-html/1.1.1.8.meta.md)



#### 1.1.2 表单与用户输入

- [ ] [1.1.2.1 表单：`<form>`、`<input>` 各类型（text、password、email、number、checkbox、radio、file、hidden 等）](../learning/1-notes/01-web-fundamentals/1.1-html/1.1.2.1.form.md)
- [ ] [1.1.2.2 `<textarea>`、`<select>`、`<option>`、`<optgroup>`、`<button>`、`<label>`、`<fieldset>`、`<legend>`](../learning/1-notes/01-web-fundamentals/1.1-html/1.1.2.2.textarea.md)
- [ ] [1.1.2.3 表单属性：`required`、`disabled`、`readonly`、`placeholder`、`pattern`、`min`/`max`、`autocomplete`](../learning/1-notes/01-web-fundamentals/1.1-html/1.1.2.3.required.md)
- [ ] [1.1.2.4 表单提交：method、action、enctype（`application/x-www-form-urlencoded`、`multipart/form-data`）](../learning/1-notes/01-web-fundamentals/1.1-html/1.1.2.4.application-x-www-form-urlencoded.md)
- [ ] [1.1.2.5 原生表单验证与自定义验证提示](../learning/1-notes/01-web-fundamentals/1.1-html/1.1.2.5.item-1-1-2-5.md)



#### 1.1.3 原生能力与进阶选读

Canvas、SVG 脚本和 template/slot 的实现可在 1.3 后回读；只观察示例不等于已掌握 JavaScript。原生 details/dialog、dataset 与基本 SEO 可按当前任务先学。

- [ ] [1.1.3.1 【选修】`<canvas>` 2D 绘图基础](../learning/1-notes/01-web-fundamentals/1.1-html/1.1.3.1.canvas.md)
- [ ] [1.1.3.2 `<svg>` 矢量图形基础](../learning/1-notes/01-web-fundamentals/1.1-html/1.1.3.2.svg.md)
- [ ] [1.1.3.3 【选修】`<template>`、`<slot>`（为 Web Components 打基础）](../learning/1-notes/01-web-fundamentals/1.1-html/1.1.3.3.template.md)
- [ ] [1.1.3.4 `<details>` / `<summary>`、`<dialog>`、`<progress>`、`<meter>`](../learning/1-notes/01-web-fundamentals/1.1-html/1.1.3.4.details.md)
- [ ] [1.1.3.5 `data-*` 自定义属性](../learning/1-notes/01-web-fundamentals/1.1-html/1.1.3.5.data.md)
- [ ] [1.1.3.6 **SEO 基础**：语义化、标题层级、meta description、结构化数据（JSON-LD 概念）](../learning/1-notes/01-web-fundamentals/1.1-html/1.1.3.6.seo.md)



### 1.2 CSS



#### 1.2.1 基础与选择器

- [ ] [1.2.1.1 CSS 引入方式：内联、`<style>`、外部样式表](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.1.1.style.md)
- [ ] [1.2.1.2 选择器：元素、类、ID、属性、伪类（`:hover`、`:focus`、`:nth-child` 等）、伪元素（`::before`、`::after`）](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.1.2.hover.md)
- [ ] [1.2.1.3 选择器优先级与特异性（Specificity）计算](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.1.3.specificity.md)
- [ ] [1.2.1.4 继承与 `inherit`、`initial`、`unset`、`revert`](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.1.4.inherit.md)
- [ ] [1.2.1.5 CSS 变量（Custom Properties）：`--name`、`var()`](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.1.5.name.md)
- [ ] [1.2.1.6 完整层叠顺序：来源、重要性、`@layer` 与特异性；避免只比较选择器权重](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.1.6.cascade-layers.md)



#### 1.2.2 盒模型与布局

- [ ] [1.2.2.1 **盒模型**：content、padding、border、margin；`box-sizing: content-box` vs `border-box`](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.2.1.item-1-2-2-1.md)
- [ ] [1.2.2.2 **显示类型**：`display: block | inline | inline-block | none | flex | grid`](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.2.2.item-1-2-2-2.md)
- [ ] [1.2.2.3 **定位**：`static`、`relative`、`absolute`、`fixed`、`sticky`](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.2.3.item-1-2-2-3.md)
- [ ] [1.2.2.4 **Flexbox**：主轴/交叉轴、`justify-content`、`align-items`、`flex-grow/shrink/basis`、`gap`](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.2.4.flexbox.md)
- [ ] [1.2.2.5 **Grid**：`grid-template-columns/rows`、`fr` 单位、`grid-area`、`gap`、隐式网格](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.2.5.grid.md)
- [ ] [1.2.2.6 【维护选读】**传统布局**：浮动（float）与清除（clear）— 了解即可，现代项目优先 Flex/Grid](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.2.6.item-1-2-2-6.md)
- [ ] [1.2.2.7 【按需选学】**多列布局**（`column-count` 等）基础了解](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.2.7.item-1-2-2-7.md)
- [ ] [1.2.2.8 正常流、格式化上下文与外边距折叠：理解布局行为后再选 Flex/Grid](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.2.8.normal-flow-formatting-context.md)
- [ ] [1.2.2.9 层叠上下文与 `z-index`：定位、transform、顶层元素与覆盖层排障](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.2.9.stacking-context.md)
- [ ] [1.2.2.10 内在尺寸与约束：min/max-content、fit-content、minmax、min-inline-size:0、aspect-ratio](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.2.10.intrinsic-sizing.md)



#### 1.2.3 视觉与排版

- [ ] [1.2.3.1 颜色：命名色、HEX、RGB/RGBA、HSL/HSLA](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.3.1.hex-rgb-rgba-hsl-hsla.md)
- [ ] [1.2.3.2 字体：`font-family`、`font-size`、`font-weight`、`line-height`、`letter-spacing`](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.3.2.font-family.md)
- [ ] [1.2.3.3 `@font-face` 与 Web 字体加载](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.3.3.font-face.md)
- [ ] [1.2.3.4 文本：`text-align`、`text-decoration`、`text-overflow`、`white-space`、`word-break`](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.3.4.text-align.md)
- [ ] [1.2.3.5 背景：`background-color`、`background-image`、`background-size/position/repeat`](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.3.5.background-color.md)
- [ ] [1.2.3.6 边框与圆角：`border`、`border-radius`、`box-shadow`](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.3.6.border.md)
- [ ] [1.2.3.7 溢出：`overflow`、`overflow-x/y`、`text-overflow: ellipsis`](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.3.7.overflow.md)



#### 1.2.4 响应式与适配

- [ ] [1.2.4.1 **媒体查询**（`@media`）：断点设计、移动优先 vs 桌面优先](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.4.1.item-1-2-4-1.md)
- [ ] [1.2.4.2 **viewport** 与移动端适配](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.4.2.viewport.md)
- [ ] [1.2.4.3 相对单位：`rem`、`em`、`vw`、`vh`、`%`、`ch`](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.4.3.rem.md)
- [ ] [1.2.4.4 图片响应式：`max-width: 100%`、`<picture>`、`srcset`、`sizes`](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.4.4.max-width-100.md)
- [ ] [1.2.4.5 **容器查询**（Container Queries）基本概念](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.4.5.item-1-2-4-5.md)
- [ ] [1.2.4.6 📱 移动端对照：CSS Flex/Grid ≈ Flutter Row/Column/Wrap、RN Flexbox；rem ≈ 相对尺寸单位](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.4.6.css-flex-grid-flutter-row.md)
- [ ] [1.2.4.7 手机浏览器视口：svh/dvh、safe-area、软键盘和滚动容器；真机验证边界](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.4.7.mobile-viewport-safe-area.md)



#### 1.2.5 动画与交互

- [ ] [1.2.5.1 `transition`：属性、时长、缓动函数](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.5.1.transition.md)
- [ ] [1.2.5.2 `@keyframes` 与 `animation`](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.5.2.keyframes.md)
- [ ] [1.2.5.3 `transform`：`translate`、`rotate`、`scale`、`skew`](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.5.3.transform.md)
- [ ] [1.2.5.4 `cursor`、`user-select`、`pointer-events`](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.5.4.cursor.md)
- [ ] [1.2.5.5 性能注意：优先使用 `transform` 和 `opacity` 做动画（合成层）](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.5.5.transform.md)
- [ ] [1.2.5.6 尊重用户偏好：prefers-reduced-motion、键盘焦点可见性与触控/悬停差异](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.5.6.motion-input-preferences.md)



#### 1.2.6 CSS 工程化入门

- [ ] [1.2.6.1 **BEM** 命名规范](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.6.1.bem.md)
- [ ] [1.2.6.2 CSS Modules 概念](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.6.2.css-modules.md)
- [ ] [1.2.6.3 【选修】预处理器基础（**Sass/SCSS**）：变量、嵌套、混入（`@mixin`）、继承](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.6.3.sass-scss.md)
- [ ] [1.2.6.4 原子化 CSS 概念（Tailwind CSS 思路）](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.6.4.css-tailwind-css.md)
- [ ] [1.2.6.5 现代 CSS：`:is()`、`:where()`、`clamp()`、`min()`、`max()`、逻辑属性（`margin-inline` 等）](../learning/1-notes/01-web-fundamentals/1.2-css/1.2.6.5.is.md)



### 1.3 JavaScript 基础



#### 1.3.1 语言核心

- [ ] [1.3.1.1 变量：`var`、`let`、`const` 与暂时性死区（TDZ）](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.1.1.var.md)
- [ ] [1.3.1.2 数据类型：原始类型（string、number、boolean、null、undefined、symbol、bigint）与引用类型（object）](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.1.2.string-number-boolean-null-undefined.md)
- [ ] [1.3.1.3 类型判断：`typeof`、`instanceof`、`Array.isArray()`、`Object.prototype.toString`](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.1.3.typeof.md)
- [ ] [1.3.1.4 类型转换：隐式转换、显式转换（`Number()`、`String()`、`Boolean()`）](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.1.4.number.md)
- [ ] [1.3.1.5 运算符：算术、比较、逻辑、空值合并（`??`）、可选链（`?.`）](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.1.5.item-1-3-1-5.md)
- [ ] [1.3.1.6 条件：`if/else`、`switch`、`三元表达式`](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.1.6.if-else.md)
- [ ] [1.3.1.7 循环：`for`、`while`、`do...while`、`for...of`、`for...in`](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.1.7.for.md)
- [ ] [1.3.1.8 函数：声明、表达式、箭头函数、`this` 绑定基础](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.1.8.this.md)
- [ ] [1.3.1.9 作用域：全局、函数、块级作用域；作用域链](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.1.9.item-1-3-1-9.md)
- [ ] [1.3.1.10 闭包（Closure）概念与应用场景](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.1.10.closure.md)
- [ ] [1.3.1.11 数组：创建、`map`、`filter`、`reduce`、`find`、`some`、`every`、`forEach`、解构](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.1.11.map.md)
- [ ] [1.3.1.12 对象：字面量、属性访问、展开运算符（`...`）、解构、计算属性名](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.1.12.....md)
- [ ] [1.3.1.13 字符串：模板字面量、常用方法（`slice`、`split`、`includes`、`replace` 等）](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.1.13.slice.md)
- [ ] [1.3.1.14 📱 移动端对照：JS 基础语法与 Dart/Kotlin/Swift 差异；弱类型 vs 强类型](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.1.14.js-dart-kotlin-swift-vs.md)



#### 1.3.2 ES6+ 重要特性

- [ ] [1.3.2.1 类（`class`）：constructor、方法、继承（`extends`）、`super`、静态方法](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.2.1.class.md)
- [ ] [1.3.2.2 模块（ES Modules）：`import` / `export`（default vs named）](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.2.2.import.md)
- [ ] [1.3.2.3 Promise 基础：`then`、`catch`、`finally`](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.2.3.then.md)
- [ ] [1.3.2.4 `async` / `await`](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.2.4.async.md)
- [ ] [1.3.2.5 迭代器与生成器（了解）](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.2.5.item-1-3-2-5.md)
- [ ] [1.3.2.6 `Map`、`Set`、`WeakMap`、`WeakSet`](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.2.6.map.md)
- [ ] [1.3.2.7 可选链、空值合并、逻辑赋值（`&&=`、`||=`）](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.2.7.item-1-3-2-7.md)
- [ ] [1.3.2.8 顶层 `await`（了解）](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.2.8.await.md)



#### 1.3.3 DOM 操作

- [ ] [1.3.3.1 DOM 树概念：Document、Element、Node、Text](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.3.1.dom-document-element-node-text.md)
- [ ] [1.3.3.2 查询：`getElementById`、`querySelector`、`querySelectorAll`](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.3.2.getelementbyid.md)
- [ ] [1.3.3.3 创建与修改：`createElement`、`appendChild`、`insertBefore`、`removeChild`](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.3.3.createelement.md)
- [ ] [1.3.3.4 属性与样式：`setAttribute`、`classList`（add/remove/toggle）、`style`、`dataset`](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.3.4.setattribute.md)
- [ ] [1.3.3.5 内容：`textContent` vs `innerHTML`（及 XSS 风险）](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.3.5.textcontent.md)
- [ ] [1.3.3.6 尺寸与位置：`offsetWidth/Height`、`clientWidth/Height`、`getBoundingClientRect()`](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.3.6.offsetwidth-height.md)
- [ ] [1.3.3.7 📱 移动端对照：DOM 操作 ≈ 直接操作 Widget 树（Flutter/RN 中较少手写，但理解有助于调试）](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.3.7.dom-widget-flutter-rn.md)



#### 1.3.4 事件

- [ ] [1.3.4.1 事件监听：`addEventListener`、`removeEventListener`](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.4.1.addeventlistener.md)
- [ ] [1.3.4.2 事件流：捕获阶段、目标阶段、冒泡阶段](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.4.2.item-1-3-4-2.md)
- [ ] [1.3.4.3 `event.target` vs `event.currentTarget`](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.4.3.event.target.md)
- [ ] [1.3.4.4 阻止默认行为与冒泡：`preventDefault()`、`stopPropagation()`](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.4.4.preventdefault.md)
- [ ] [1.3.4.5 常见事件：`click`、`input`、`change`、`submit`、`keydown/keyup`、`focus/blur`、`scroll`、`resize`](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.4.5.click.md)
- [ ] [1.3.4.6 事件委托（Event Delegation）](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.4.6.event-delegation.md)
- [ ] [1.3.4.7 自定义事件：`CustomEvent`、`dispatchEvent`](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.4.7.customevent.md)



#### 1.3.5 异步与网络

- [ ] [1.3.5.1 回调函数与回调地狱问题](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.5.1.item-1-3-5-1.md)
- [ ] [1.3.5.2 `XMLHttpRequest` 基础（了解即可，现代用 fetch）](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.5.2.xmlhttprequest.md)
- [ ] [1.3.5.3 **Fetch API**：GET/POST 请求、请求头、响应处理、`response.ok`、解析失败与 `response.json()`](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.5.3.fetch-api.md)
- [ ] [1.3.5.4 错误处理：`try/catch/finally`、`throw`](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.5.4.try-catch-finally.md)
- [ ] [1.3.5.5 定时器：`setTimeout`、`setInterval`、`requestAnimationFrame`](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.5.5.settimeout.md)
- [ ] [1.3.5.6 JSON：`JSON.parse`、`JSON.stringify`](../learning/1-notes/01-web-fundamentals/1.3-javascript/1.3.5.6.json.parse.md)

---



<a id="14-基础质量与产品体验贯穿-1113"></a>

### 1.4 兼容、无障碍、设计稿与失败体验（贯穿 1.1–1.3）

本节从第一张页面起应用，不等到读完 JavaScript 再补质量。阶段 6 深化审计与安全，阶段 12/13 深化测试及兼容治理。

- [ ] [1.4.1 Web 标准与兼容基础：目标浏览器/WebView、Baseline、能力检测、`@supports` 与渐进增强](../learning/1-notes/01-web-fundamentals/1.4-quality-basics/1.4.1.standards-baseline.md)
- [ ] [1.4.2 无障碍基础验收：语义、标签、键盘、焦点、缩放、对比度与文字替代](../learning/1-notes/01-web-fundamentals/1.4-quality-basics/1.4.2.accessibility-foundations.md)
- [ ] [1.4.3 开发者设计基础：读设计稿、视觉层级、间距排版、内容优先及加载/空/错/禁用状态](../learning/1-notes/01-web-fundamentals/1.4-quality-basics/1.4.3.design-interaction-states.md)
- [ ] [1.4.4 渐进增强与失败体验：慢网/断网、JS或资源失败时的内容与操作，最小数据采集和清楚反馈](../learning/1-notes/01-web-fundamentals/1.4-quality-basics/1.4.4.progressive-enhancement.md)

---

<a id="阶段-2javascript-深入与浏览器原理"></a>

## 阶段 2：JavaScript 异步、浏览器渲染与存储

> 主线先掌握事件循环、资源清理、渲染、HTTP 缓存和存储边界；掌握这些即可进入阶段 3。生成器、模块史、特殊 Web API 可按需回读，不作为首个 Nuxt 应用的全部前置。



<a id="21-javascript-进阶"></a>

### 2.1 原型、this、事件循环与资源清理

- [ ] [2.1.1 **原型链**：`prototype`、`__proto__`、`Object.create`](../learning/1-notes/02-javascript-browser/2.1-js-advanced/2.1.1.item-2-1-1.md)
- [ ] [2.1.2 `this` 详解：默认绑定、隐式绑定、显式绑定（`call/apply/bind`）、`new` 绑定、箭头函数](../learning/1-notes/02-javascript-browser/2.1-js-advanced/2.1.2.this.md)
- [ ] [2.1.3 **执行上下文**与**调用栈**](../learning/1-notes/02-javascript-browser/2.1-js-advanced/2.1.3.item-2-1-3.md)
- [ ] [2.1.4 **事件循环（Event Loop）**：宏任务、微任务、`Promise` 与 `setTimeout` 执行顺序](../learning/1-notes/02-javascript-browser/2.1-js-advanced/2.1.4.event-loop.md)
- [ ] [2.1.5 深拷贝 vs 浅拷贝：展开运算符、`structuredClone`、`JSON` 方式的局限](../learning/1-notes/02-javascript-browser/2.1-js-advanced/2.1.5.structuredclone.md)
- [ ] [2.1.6 防抖（Debounce）与节流（Throttle）](../learning/1-notes/02-javascript-browser/2.1-js-advanced/2.1.6.debounce-throttle.md)
- [ ] [2.1.7 柯里化、组合函数（了解）](../learning/1-notes/02-javascript-browser/2.1-js-advanced/2.1.7.item-2-1-7.md)
- [ ] [2.1.8 模块化发展史：IIFE → CommonJS → AMD → ES Modules](../learning/1-notes/02-javascript-browser/2.1-js-advanced/2.1.8.iife-commonjs-amd-es-modules.md)
- [ ] [2.1.9 严格模式（`'use strict'`）](../learning/1-notes/02-javascript-browser/2.1-js-advanced/2.1.9.use-strict.md)
- [ ] [2.1.10 内存管理与垃圾回收基本概念；常见内存泄漏场景（闭包、未清理的监听器、定时器）](../learning/1-notes/02-javascript-browser/2.1-js-advanced/2.1.10.item-2-1-10.md)
- [ ] [2.1.11 📱 移动端对照：Event Loop ≈ Flutter 单线程 + Event Queue / RN JS Bridge 异步模型](../learning/1-notes/02-javascript-browser/2.1-js-advanced/2.1.11.event-loop-flutter-event-queue.md)



<a id="22-浏览器原理"></a>

### 2.2 浏览器进程、渲染流水线与 HTTP 缓存

- [ ] [2.2.1 浏览器多进程架构（主进程、渲染进程、GPU 进程等）概览](../learning/1-notes/02-javascript-browser/2.2-browser-internals/2.2.1.gpu.md)
- [ ] [2.2.2 **渲染流水线**：HTML 解析 → DOM 树、CSS 解析 → CSSOM → 渲染树 → 布局（Layout/Reflow）→ 绘制（Paint）→ 合成（Composite）](../learning/1-notes/02-javascript-browser/2.2-browser-internals/2.2.2.item-2-2-2.md)
- [ ] [2.2.3 重排（Reflow）与重绘（Repaint）的触发条件与优化思路](../learning/1-notes/02-javascript-browser/2.2-browser-internals/2.2.3.reflow-repaint.md)
- [ ] [2.2.4 关键渲染路径（Critical Rendering Path）优化](../learning/1-notes/02-javascript-browser/2.2-browser-internals/2.2.4.critical-rendering-path.md)
- [ ] [2.2.5 合成层与 `will-change`、GPU 加速](../learning/1-notes/02-javascript-browser/2.2-browser-internals/2.2.5.will-change.md)
- [ ] [2.2.6 脚本加载：`async`、`defer` 区别](../learning/1-notes/02-javascript-browser/2.2-browser-internals/2.2.6.async.md)
- [ ] [2.2.7 资源优先级与预加载：`<link rel="preload">`、`prefetch`、`preconnect`](../learning/1-notes/02-javascript-browser/2.2-browser-internals/2.2.7.link-rel-preload.md)
- [ ] [2.2.8 浏览器缓存：**强缓存**（Cache-Control、Expires）与**协商缓存**（ETag、Last-Modified）](../learning/1-notes/02-javascript-browser/2.2-browser-internals/2.2.8.item-2-2-8.md)
- [ ] [2.2.9 Service Worker 与 PWA 基本概念](../learning/1-notes/02-javascript-browser/2.2-browser-internals/2.2.9.service-worker-pwa.md)



<a id="23-浏览器存储"></a>

### 2.3 Cookie、Web Storage 与 IndexedDB

- [ ] [2.3.1 `localStorage` / `sessionStorage` API 与限制](../learning/1-notes/02-javascript-browser/2.3-browser-storage/2.3.1.localstorage.md)
- [ ] [2.3.2 **Cookie**：属性（`HttpOnly`、`Secure`、`SameSite`、`Domain`、`Path`、`Max-Age`）](../learning/1-notes/02-javascript-browser/2.3-browser-storage/2.3.2.cookie.md)
- [ ] [2.3.3 **IndexedDB** 基本概念（大型结构化本地存储）](../learning/1-notes/02-javascript-browser/2.3-browser-storage/2.3.3.indexeddb.md)
- [ ] [2.3.4 存储方案选型对比](../learning/1-notes/02-javascript-browser/2.3-browser-storage/2.3.4.item-2-3-4.md)



### 2.4 Web API：路由基础与按需选学

2.4.7 History API 属 SPA 路由基础；Observer 按场景学习，定位、剪贴板、Worker 和通知等依业务选择并检查权限/兼容。

- [ ] [2.4.1 **Intersection Observer**（懒加载、无限滚动）](../learning/1-notes/02-javascript-browser/2.4-web-apis/2.4.1.intersection-observer.md)
- [ ] [2.4.2 **Resize Observer**](../learning/1-notes/02-javascript-browser/2.4-web-apis/2.4.2.resize-observer.md)
- [ ] [2.4.3 **Mutation Observer**](../learning/1-notes/02-javascript-browser/2.4-web-apis/2.4.3.mutation-observer.md)
- [ ] [2.4.4 **Geolocation API**](../learning/1-notes/02-javascript-browser/2.4-web-apis/2.4.4.geolocation-api.md)
- [ ] [2.4.5 **Clipboard API**](../learning/1-notes/02-javascript-browser/2.4-web-apis/2.4.5.clipboard-api.md)
- [ ] [2.4.6 **File API** 与文件读取](../learning/1-notes/02-javascript-browser/2.4-web-apis/2.4.6.file-api.md)
- [ ] [2.4.7 **History API**（`pushState`、`popstate`）— SPA 路由基础](../learning/1-notes/02-javascript-browser/2.4-web-apis/2.4.7.history-api.md)
- [ ] [2.4.8 **Web Workers** 基本概念](../learning/1-notes/02-javascript-browser/2.4-web-apis/2.4.8.web-workers.md)
- [ ] [2.4.9 **Notification API** 基础](../learning/1-notes/02-javascript-browser/2.4-web-apis/2.4.9.notification-api.md)

---
