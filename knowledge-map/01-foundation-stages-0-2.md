# 阶段 0–2：基础层

> 环境与心智模型 · Web 基础三件套 · JavaScript 与浏览器  
> [← 返回总览](../KNOWLEDGE_MAP.md) · [下一部分 →](./02-engineering-stages-3-5.md)

---

## 阶段 0：环境与心智模型



### 0.1 Web 应用是什么

> 📖 本章笔记：[notes/00-environment/0.1-what-is-web-app/](./notes/00-environment/0.1-what-is-web-app/README.md)

- [x] [0.1.1 **客户端—服务器（C/S）模型与请求—响应循环](./notes/00-environment/0.1-what-is-web-app/0.1.1.client-server-model.md)**
- [x] [0.1.2 **浏览器的角色：HTML/CSS/JS 解析、渲染、执行](./notes/00-environment/0.1-what-is-web-app/0.1.2.browser-role.md)**
- [x] [0.1.3 **单页应用（SPA）vs 多页应用（MPA）的区别与适用场景](./notes/00-environment/0.1-what-is-web-app/0.1.3.spa-vs-mpa.md)**
- [x] [0.1.4 **同源策略与跨域问题的来源](./notes/00-environment/0.1-what-is-web-app/0.1.4.same-origin-policy.md)**
- [x] [0.1.5 📱 移动端对照：浏览器 ≈ WebView / 系统浏览器；SPA ≈ 单 Activity + Fragment 导航](./notes/00-environment/0.1-what-is-web-app/0.1.5.mobile-comparison.md)



### 0.2 开发环境

- [x] [0.2.1 安装与配置：**Node.js**、**npm / yarn / pnpm**](./notes/00-environment/0.2-dev-environment/0.2.1.node.js.md)
- [x] [0.2.2 熟练使用 **VS Code / Cursor** 及 Web 相关插件（ESLint、Prettier、Live Server 等）](./notes/00-environment/0.2-dev-environment/0.2.2.vs-code-cursor.md)
- [x] [0.2.3 熟练使用 **Chrome DevTools**（Elements、Console、Network、Sources、Performance、Application）](./notes/00-environment/0.2-dev-environment/0.2.3.chrome-devtools.md)
- [x] [0.2.4 了解 **Git** 基础：clone、branch、commit、merge、rebase、PR 工作流](./notes/00-environment/0.2-dev-environment/0.2.4.git.md)
- [x] [0.2.5 📱 移动端对照：npm ≈ pub / CocoaPods / Gradle 依赖管理；Vite dev server ≈ Hot Reload](./notes/00-environment/0.2-dev-environment/0.2.5.npm-pub-cocoapods-gradle-vite.md)



### 0.3 网络基础（Web 开发者必备）

> 📖 本章笔记：[notes/00-environment/0.3-network-basics/](../notes/00-environment/0.3-network-basics/README.md)

- [x] [0.3.1 **URL** 结构：协议、域名、端口、路径、查询参数、锚点](../notes/00-environment/0.3-network-basics/0.3.1.url.md)
- [x] [0.3.2 **HTTP/HTTPS** 协议：方法（GET/POST/PUT/PATCH/DELETE）、状态码、请求头/响应头](../notes/00-environment/0.3-network-basics/0.3.2.http-https.md)
- [x] [0.3.3 **HTTP/1.1、HTTP/2、HTTP/3** 基本概念与差异](../notes/00-environment/0.3-network-basics/0.3.3.http-http-http.md)
- [x] [0.3.4 **Cookie、Session、LocalStorage、SessionStorage** 的区别与使用场景](../notes/00-environment/0.3-network-basics/0.3.4.cookie-session-localstorage-sessionstorage.md)
- [x] [0.3.5 **DNS** 解析与 **CDN** 基本概念](../notes/00-environment/0.3-network-basics/0.3.5.dns.md)
- [x] [0.3.6 **TLS/SSL** 与 HTTPS 加密的基本原理](../notes/00-environment/0.3-network-basics/0.3.6.tls-ssl.md)
- [x] [0.3.7 **RESTful API** 设计风格与常见约定](../notes/00-environment/0.3-network-basics/0.3.7.restful-api.md)
- [x] [0.3.8 **WebSocket** 与长连接的基本概念](../notes/00-environment/0.3-network-basics/0.3.8.websocket.md)
- [x] [0.3.9 📱 移动端对照：Retrofit/OkHttp/Dio ≈ fetch/axios；SharedPreferences ≈ localStorage](../notes/00-environment/0.3-network-basics/0.3.9.retrofit-okhttp-dio-fetch-axios.md)


---



## 阶段 1：Web 基础三件套



### 1.1 HTML



#### 1.1.1 文档结构与语义化

- [ ] [1.1.1.1](./notes/01-web-fundamentals/1.1-html/1.1.1.1.doctype-html.md) `<!DOCTYPE html>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.1.doctype-html.md)`<html>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.1.doctype-html.md)`<head>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.1.doctype-html.md)`<body>` [文档结构](./notes/01-web-fundamentals/1.1-html/1.1.1.1.doctype-html.md)
- [ ] [1.1.1.2 语义化标签：](./notes/01-web-fundamentals/1.1-html/1.1.1.2.header.md)`<header>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.2.header.md)`<nav>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.2.header.md)`<main>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.2.header.md)`<section>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.2.header.md)`<article>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.2.header.md)`<aside>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.2.header.md)`<footer>`
- [ ] [1.1.1.3 标题与文本：](./notes/01-web-fundamentals/1.1-html/1.1.1.3.h1.md)`<h1>`[–](./notes/01-web-fundamentals/1.1-html/1.1.1.3.h1.md)`<h6>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.3.h1.md)`<p>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.3.h1.md)`<span>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.3.h1.md)`<strong>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.3.h1.md)`<em>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.3.h1.md)`<br>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.3.h1.md)`<hr>`
- [ ] [1.1.1.4 列表：](./notes/01-web-fundamentals/1.1-html/1.1.1.4.ul.md)`<ul>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.4.ul.md)`<ol>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.4.ul.md)`<li>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.4.ul.md)`<dl>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.4.ul.md)`<dt>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.4.ul.md)`<dd>`
- [ ] [1.1.1.5 链接与导航：](./notes/01-web-fundamentals/1.1-html/1.1.1.5.a-href.md)`<a href>`[、锚点、相对路径与绝对路径](./notes/01-web-fundamentals/1.1-html/1.1.1.5.a-href.md)
- [ ] [1.1.1.6 图片与媒体：](./notes/01-web-fundamentals/1.1-html/1.1.1.6.img.md)`<img>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.6.img.md)`<picture>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.6.img.md)`<video>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.6.img.md)`<audio>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.6.img.md)`<source>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.6.img.md)`<figure>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.6.img.md)`<figcaption>`
- [ ] [1.1.1.7 表格：](./notes/01-web-fundamentals/1.1-html/1.1.1.7.table.md)`<table>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.7.table.md)`<thead>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.7.table.md)`<tbody>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.7.table.md)`<tr>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.7.table.md)`<th>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.7.table.md)`<td>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.7.table.md)`<caption>`
- [ ] [1.1.1.8 元信息：](./notes/01-web-fundamentals/1.1-html/1.1.1.8.meta.md)`<meta>`[（charset、viewport、description、OG 标签）、](./notes/01-web-fundamentals/1.1-html/1.1.1.8.meta.md)`<title>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.8.meta.md)`<link>`[、](./notes/01-web-fundamentals/1.1-html/1.1.1.8.meta.md)`<script>`



#### 1.1.2 表单与用户输入

- [ ] [1.1.2.1 表单：](./notes/01-web-fundamentals/1.1-html/1.1.2.1.form.md)`<form>`[、](./notes/01-web-fundamentals/1.1-html/1.1.2.1.form.md)`<input>` [各类型（text、password、email、number、checkbox、radio、file、hidden 等）](./notes/01-web-fundamentals/1.1-html/1.1.2.1.form.md)
- [ ] [1.1.2.2](./notes/01-web-fundamentals/1.1-html/1.1.2.2.textarea.md) `<textarea>`[、](./notes/01-web-fundamentals/1.1-html/1.1.2.2.textarea.md)`<select>`[、](./notes/01-web-fundamentals/1.1-html/1.1.2.2.textarea.md)`<option>`[、](./notes/01-web-fundamentals/1.1-html/1.1.2.2.textarea.md)`<optgroup>`[、](./notes/01-web-fundamentals/1.1-html/1.1.2.2.textarea.md)`<button>`[、](./notes/01-web-fundamentals/1.1-html/1.1.2.2.textarea.md)`<label>`[、](./notes/01-web-fundamentals/1.1-html/1.1.2.2.textarea.md)`<fieldset>`[、](./notes/01-web-fundamentals/1.1-html/1.1.2.2.textarea.md)`<legend>`
- [ ] [1.1.2.3 表单属性：](./notes/01-web-fundamentals/1.1-html/1.1.2.3.required.md)`required`[、](./notes/01-web-fundamentals/1.1-html/1.1.2.3.required.md)`disabled`[、](./notes/01-web-fundamentals/1.1-html/1.1.2.3.required.md)`readonly`[、](./notes/01-web-fundamentals/1.1-html/1.1.2.3.required.md)`placeholder`[、](./notes/01-web-fundamentals/1.1-html/1.1.2.3.required.md)`pattern`[、](./notes/01-web-fundamentals/1.1-html/1.1.2.3.required.md)`min`[/](./notes/01-web-fundamentals/1.1-html/1.1.2.3.required.md)`max`[、](./notes/01-web-fundamentals/1.1-html/1.1.2.3.required.md)`autocomplete`
- [ ] [1.1.2.4 表单提交：method、action、enctype（](./notes/01-web-fundamentals/1.1-html/1.1.2.4.application-x-www-form-urlencoded.md)`application/x-www-form-urlencoded`[、](./notes/01-web-fundamentals/1.1-html/1.1.2.4.application-x-www-form-urlencoded.md)`multipart/form-data`[）](./notes/01-web-fundamentals/1.1-html/1.1.2.4.application-x-www-form-urlencoded.md)
- [ ] [1.1.2.5 原生表单验证与自定义验证提示](./notes/01-web-fundamentals/1.1-html/1.1.2.5.item-1-1-2-5.md)



#### 1.1.3 HTML5 进阶

- [ ] [1.1.3.1](./notes/01-web-fundamentals/1.1-html/1.1.3.1.canvas.md) `<canvas>` [2D 绑图基础](./notes/01-web-fundamentals/1.1-html/1.1.3.1.canvas.md)
- [ ] [1.1.3.2](./notes/01-web-fundamentals/1.1-html/1.1.3.2.svg.md) `<svg>` [矢量图形基础](./notes/01-web-fundamentals/1.1-html/1.1.3.2.svg.md)
- [ ] [1.1.3.3](./notes/01-web-fundamentals/1.1-html/1.1.3.3.template.md) `<template>`[、](./notes/01-web-fundamentals/1.1-html/1.1.3.3.template.md)`<slot>`[（为 Web Components 打基础）](./notes/01-web-fundamentals/1.1-html/1.1.3.3.template.md)
- [ ] [1.1.3.4](./notes/01-web-fundamentals/1.1-html/1.1.3.4.details.md) `<details>` [/](./notes/01-web-fundamentals/1.1-html/1.1.3.4.details.md) `<summary>`[、](./notes/01-web-fundamentals/1.1-html/1.1.3.4.details.md)`<dialog>`[、](./notes/01-web-fundamentals/1.1-html/1.1.3.4.details.md)`<progress>`[、](./notes/01-web-fundamentals/1.1-html/1.1.3.4.details.md)`<meter>`
- [ ] [1.1.3.5](./notes/01-web-fundamentals/1.1-html/1.1.3.5.data.md) `data-*` [自定义属性](./notes/01-web-fundamentals/1.1-html/1.1.3.5.data.md)
- [ ] [1.1.3.6 **SEO 基础**：语义化、标题层级、meta description、结构化数据（JSON-LD 概念）](./notes/01-web-fundamentals/1.1-html/1.1.3.6.seo.md)



### 1.2 CSS



#### 1.2.1 基础与选择器

- [ ] [1.2.1.1 CSS 引入方式：内联、](./notes/01-web-fundamentals/1.2-css/1.2.1.1.style.md)`<style>`[、外部样式表](./notes/01-web-fundamentals/1.2-css/1.2.1.1.style.md)
- [ ] [1.2.1.2 选择器：元素、类、ID、属性、伪类（](./notes/01-web-fundamentals/1.2-css/1.2.1.2.hover.md)`:hover`[、](./notes/01-web-fundamentals/1.2-css/1.2.1.2.hover.md)`:focus`[、](./notes/01-web-fundamentals/1.2-css/1.2.1.2.hover.md)`:nth-child` [等）、伪元素（](./notes/01-web-fundamentals/1.2-css/1.2.1.2.hover.md)`::before`[、](./notes/01-web-fundamentals/1.2-css/1.2.1.2.hover.md)`::after`[）](./notes/01-web-fundamentals/1.2-css/1.2.1.2.hover.md)
- [ ] [1.2.1.3 选择器优先级与特异性（Specificity）计算](./notes/01-web-fundamentals/1.2-css/1.2.1.3.specificity.md)
- [ ] [1.2.1.4 继承与](./notes/01-web-fundamentals/1.2-css/1.2.1.4.inherit.md) `inherit`[、](./notes/01-web-fundamentals/1.2-css/1.2.1.4.inherit.md)`initial`[、](./notes/01-web-fundamentals/1.2-css/1.2.1.4.inherit.md)`unset`[、](./notes/01-web-fundamentals/1.2-css/1.2.1.4.inherit.md)`revert`
- [ ] [1.2.1.5 CSS 变量（Custom Properties）：](./notes/01-web-fundamentals/1.2-css/1.2.1.5.name.md)`--name`[、](./notes/01-web-fundamentals/1.2-css/1.2.1.5.name.md)`var()`



#### 1.2.2 盒模型与布局

- [ ] [1.2.2.1 **盒模型**：content、padding、border、margin；](./notes/01-web-fundamentals/1.2-css/1.2.2.1.item-1-2-2-1.md)`box-sizing: content-box` [vs](./notes/01-web-fundamentals/1.2-css/1.2.2.1.item-1-2-2-1.md) `border-box`
- [ ] [1.2.2.2 **显示类型**：](./notes/01-web-fundamentals/1.2-css/1.2.2.2.item-1-2-2-2.md)`display: block | inline | inline-block | none | flex | grid`
- [ ] [1.2.2.3 **定位**：](./notes/01-web-fundamentals/1.2-css/1.2.2.3.item-1-2-2-3.md)`static`[、](./notes/01-web-fundamentals/1.2-css/1.2.2.3.item-1-2-2-3.md)`relative`[、](./notes/01-web-fundamentals/1.2-css/1.2.2.3.item-1-2-2-3.md)`absolute`[、](./notes/01-web-fundamentals/1.2-css/1.2.2.3.item-1-2-2-3.md)`fixed`[、](./notes/01-web-fundamentals/1.2-css/1.2.2.3.item-1-2-2-3.md)`sticky`
- [ ] [1.2.2.4 **Flexbox**：主轴/交叉轴、](./notes/01-web-fundamentals/1.2-css/1.2.2.4.flexbox.md)`justify-content`[、](./notes/01-web-fundamentals/1.2-css/1.2.2.4.flexbox.md)`align-items`[、](./notes/01-web-fundamentals/1.2-css/1.2.2.4.flexbox.md)`flex-grow/shrink/basis`[、](./notes/01-web-fundamentals/1.2-css/1.2.2.4.flexbox.md)`gap`
- [ ] [1.2.2.5 **Grid**：](./notes/01-web-fundamentals/1.2-css/1.2.2.5.grid.md)`grid-template-columns/rows`[、](./notes/01-web-fundamentals/1.2-css/1.2.2.5.grid.md)`fr` [单位、](./notes/01-web-fundamentals/1.2-css/1.2.2.5.grid.md)`grid-area`[、](./notes/01-web-fundamentals/1.2-css/1.2.2.5.grid.md)`gap`[、隐式网格](./notes/01-web-fundamentals/1.2-css/1.2.2.5.grid.md)
- [ ] [1.2.2.6 **传统布局**：浮动（float）与清除（clear）— 了解即可，现代项目优先 Flex/Grid](./notes/01-web-fundamentals/1.2-css/1.2.2.6.item-1-2-2-6.md)
- [ ] [1.2.2.7 **多列布局**（](./notes/01-web-fundamentals/1.2-css/1.2.2.7.item-1-2-2-7.md)`column-count` [等）基础了解](./notes/01-web-fundamentals/1.2-css/1.2.2.7.item-1-2-2-7.md)



#### 1.2.3 视觉与排版

- [ ] [1.2.3.1 颜色：命名色、HEX、RGB/RGBA、HSL/HSLA](./notes/01-web-fundamentals/1.2-css/1.2.3.1.hex-rgb-rgba-hsl-hsla.md)
- [ ] [1.2.3.2 字体：](./notes/01-web-fundamentals/1.2-css/1.2.3.2.font-family.md)`font-family`[、](./notes/01-web-fundamentals/1.2-css/1.2.3.2.font-family.md)`font-size`[、](./notes/01-web-fundamentals/1.2-css/1.2.3.2.font-family.md)`font-weight`[、](./notes/01-web-fundamentals/1.2-css/1.2.3.2.font-family.md)`line-height`[、](./notes/01-web-fundamentals/1.2-css/1.2.3.2.font-family.md)`letter-spacing`
- [ ] [1.2.3.3](./notes/01-web-fundamentals/1.2-css/1.2.3.3.font-face.md) `@font-face` [与 Web 字体加载](./notes/01-web-fundamentals/1.2-css/1.2.3.3.font-face.md)
- [ ] [1.2.3.4 文本：](./notes/01-web-fundamentals/1.2-css/1.2.3.4.text-align.md)`text-align`[、](./notes/01-web-fundamentals/1.2-css/1.2.3.4.text-align.md)`text-decoration`[、](./notes/01-web-fundamentals/1.2-css/1.2.3.4.text-align.md)`text-overflow`[、](./notes/01-web-fundamentals/1.2-css/1.2.3.4.text-align.md)`white-space`[、](./notes/01-web-fundamentals/1.2-css/1.2.3.4.text-align.md)`word-break`
- [ ] [1.2.3.5 背景：](./notes/01-web-fundamentals/1.2-css/1.2.3.5.background-color.md)`background-color`[、](./notes/01-web-fundamentals/1.2-css/1.2.3.5.background-color.md)`background-image`[、](./notes/01-web-fundamentals/1.2-css/1.2.3.5.background-color.md)`background-size/position/repeat`
- [ ] [1.2.3.6 边框与圆角：](./notes/01-web-fundamentals/1.2-css/1.2.3.6.border.md)`border`[、](./notes/01-web-fundamentals/1.2-css/1.2.3.6.border.md)`border-radius`[、](./notes/01-web-fundamentals/1.2-css/1.2.3.6.border.md)`box-shadow`
- [ ] [1.2.3.7 溢出：](./notes/01-web-fundamentals/1.2-css/1.2.3.7.overflow.md)`overflow`[、](./notes/01-web-fundamentals/1.2-css/1.2.3.7.overflow.md)`overflow-x/y`[、](./notes/01-web-fundamentals/1.2-css/1.2.3.7.overflow.md)`text-overflow: ellipsis`



#### 1.2.4 响应式与适配

- [ ] [1.2.4.1 **媒体查询**（](./notes/01-web-fundamentals/1.2-css/1.2.4.1.item-1-2-4-1.md)`@media`[）：断点设计、移动优先 vs 桌面优先](./notes/01-web-fundamentals/1.2-css/1.2.4.1.item-1-2-4-1.md)
- [ ] [1.2.4.2 **viewport** 与移动端适配](./notes/01-web-fundamentals/1.2-css/1.2.4.2.viewport.md)
- [ ] [1.2.4.3 相对单位：](./notes/01-web-fundamentals/1.2-css/1.2.4.3.rem.md)`rem`[、](./notes/01-web-fundamentals/1.2-css/1.2.4.3.rem.md)`em`[、](./notes/01-web-fundamentals/1.2-css/1.2.4.3.rem.md)`vw`[、](./notes/01-web-fundamentals/1.2-css/1.2.4.3.rem.md)`vh`[、](./notes/01-web-fundamentals/1.2-css/1.2.4.3.rem.md)`%`[、](./notes/01-web-fundamentals/1.2-css/1.2.4.3.rem.md)`ch`
- [ ] [1.2.4.4 图片响应式：](./notes/01-web-fundamentals/1.2-css/1.2.4.4.max-width-100.md)`max-width: 100%`[、](./notes/01-web-fundamentals/1.2-css/1.2.4.4.max-width-100.md)`<picture>`[、](./notes/01-web-fundamentals/1.2-css/1.2.4.4.max-width-100.md)`srcset`[、](./notes/01-web-fundamentals/1.2-css/1.2.4.4.max-width-100.md)`sizes`
- [ ] [1.2.4.5 **容器查询**（Container Queries）基本概念](./notes/01-web-fundamentals/1.2-css/1.2.4.5.item-1-2-4-5.md)
- [ ] [1.2.4.6 📱 移动端对照：CSS Flex/Grid ≈ Flutter Row/Column/Wrap、RN Flexbox；rem ≈ 相对尺寸单位](./notes/01-web-fundamentals/1.2-css/1.2.4.6.css-flex-grid-flutter-row.md)



#### 1.2.5 动画与交互

- [ ] [1.2.5.1](./notes/01-web-fundamentals/1.2-css/1.2.5.1.transition.md) `transition`[：属性、时长、缓动函数](./notes/01-web-fundamentals/1.2-css/1.2.5.1.transition.md)
- [ ] [1.2.5.2](./notes/01-web-fundamentals/1.2-css/1.2.5.2.keyframes.md) `@keyframes` [与](./notes/01-web-fundamentals/1.2-css/1.2.5.2.keyframes.md) `animation`
- [ ] [1.2.5.3](./notes/01-web-fundamentals/1.2-css/1.2.5.3.transform.md) `transform`[：](./notes/01-web-fundamentals/1.2-css/1.2.5.3.transform.md)`translate`[、](./notes/01-web-fundamentals/1.2-css/1.2.5.3.transform.md)`rotate`[、](./notes/01-web-fundamentals/1.2-css/1.2.5.3.transform.md)`scale`[、](./notes/01-web-fundamentals/1.2-css/1.2.5.3.transform.md)`skew`
- [ ] [1.2.5.4](./notes/01-web-fundamentals/1.2-css/1.2.5.4.cursor.md) `cursor`[、](./notes/01-web-fundamentals/1.2-css/1.2.5.4.cursor.md)`user-select`[、](./notes/01-web-fundamentals/1.2-css/1.2.5.4.cursor.md)`pointer-events`
- [ ] [1.2.5.5 性能注意：优先使用](./notes/01-web-fundamentals/1.2-css/1.2.5.5.transform.md) `transform` [和](./notes/01-web-fundamentals/1.2-css/1.2.5.5.transform.md) `opacity` [做动画（合成层）](./notes/01-web-fundamentals/1.2-css/1.2.5.5.transform.md)



#### 1.2.6 CSS 工程化入门

- [ ] [1.2.6.1 **BEM** 命名规范](./notes/01-web-fundamentals/1.2-css/1.2.6.1.bem.md)
- [ ] [1.2.6.2 CSS Modules 概念](./notes/01-web-fundamentals/1.2-css/1.2.6.2.css-modules.md)
- [ ] [1.2.6.3 预处理器基础（**Sass/SCSS**）：变量、嵌套、混入（](./notes/01-web-fundamentals/1.2-css/1.2.6.3.sass-scss.md)`@mixin`[）、继承](./notes/01-web-fundamentals/1.2-css/1.2.6.3.sass-scss.md)
- [ ] [1.2.6.4 原子化 CSS 概念（Tailwind CSS 思路）](./notes/01-web-fundamentals/1.2-css/1.2.6.4.css-tailwind-css.md)
- [ ] [1.2.6.5 现代 CSS：](./notes/01-web-fundamentals/1.2-css/1.2.6.5.is.md)`:is()`[、](./notes/01-web-fundamentals/1.2-css/1.2.6.5.is.md)`:where()`[、](./notes/01-web-fundamentals/1.2-css/1.2.6.5.is.md)`clamp()`[、](./notes/01-web-fundamentals/1.2-css/1.2.6.5.is.md)`min()`[、](./notes/01-web-fundamentals/1.2-css/1.2.6.5.is.md)`max()`[、逻辑属性（](./notes/01-web-fundamentals/1.2-css/1.2.6.5.is.md)`margin-inline` [等）](./notes/01-web-fundamentals/1.2-css/1.2.6.5.is.md)



### 1.3 JavaScript 基础



#### 1.3.1 语言核心

- [ ] [1.3.1.1 变量：](./notes/01-web-fundamentals/1.3-javascript/1.3.1.1.var.md)`var`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.1.var.md)`let`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.1.var.md)`const` [与暂时性死区（TDZ）](./notes/01-web-fundamentals/1.3-javascript/1.3.1.1.var.md)
- [ ] [1.3.1.2 数据类型：原始类型（string、number、boolean、null、undefined、symbol、bigint）与引用类型（object）](./notes/01-web-fundamentals/1.3-javascript/1.3.1.2.string-number-boolean-null-undefined.md)
- [ ] [1.3.1.3 类型判断：](./notes/01-web-fundamentals/1.3-javascript/1.3.1.3.typeof.md)`typeof`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.3.typeof.md)`instanceof`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.3.typeof.md)`Array.isArray()`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.3.typeof.md)`Object.prototype.toString`
- [ ] [1.3.1.4 类型转换：隐式转换、显式转换（](./notes/01-web-fundamentals/1.3-javascript/1.3.1.4.number.md)`Number()`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.4.number.md)`String()`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.4.number.md)`Boolean()`[）](./notes/01-web-fundamentals/1.3-javascript/1.3.1.4.number.md)
- [ ] [1.3.1.5 运算符：算术、比较、逻辑、空值合并（](./notes/01-web-fundamentals/1.3-javascript/1.3.1.5.item-1-3-1-5.md)`??`[）、可选链（](./notes/01-web-fundamentals/1.3-javascript/1.3.1.5.item-1-3-1-5.md)`?.`[）](./notes/01-web-fundamentals/1.3-javascript/1.3.1.5.item-1-3-1-5.md)
- [ ] [1.3.1.6 条件：](./notes/01-web-fundamentals/1.3-javascript/1.3.1.6.if-else.md)`if/else`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.6.if-else.md)`switch`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.6.if-else.md)`三元表达式`
- [ ] [1.3.1.7 循环：](./notes/01-web-fundamentals/1.3-javascript/1.3.1.7.for.md)`for`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.7.for.md)`while`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.7.for.md)`do...while`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.7.for.md)`for...of`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.7.for.md)`for...in`
- [ ] [1.3.1.8 函数：声明、表达式、箭头函数、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.8.this.md)`this` [绑定基础](./notes/01-web-fundamentals/1.3-javascript/1.3.1.8.this.md)
- [ ] [1.3.1.9 作用域：全局、函数、块级作用域；作用域链](./notes/01-web-fundamentals/1.3-javascript/1.3.1.9.item-1-3-1-9.md)
- [ ] [1.3.1.10 闭包（Closure）概念与应用场景](./notes/01-web-fundamentals/1.3-javascript/1.3.1.10.closure.md)
- [ ] [1.3.1.11 数组：创建、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.11.map.md)`map`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.11.map.md)`filter`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.11.map.md)`reduce`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.11.map.md)`find`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.11.map.md)`some`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.11.map.md)`every`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.11.map.md)`forEach`[、解构](./notes/01-web-fundamentals/1.3-javascript/1.3.1.11.map.md)
- [ ] [1.3.1.12 对象：字面量、属性访问、展开运算符（](./notes/01-web-fundamentals/1.3-javascript/1.3.1.12.....md)`...`[）、解构、计算属性名](./notes/01-web-fundamentals/1.3-javascript/1.3.1.12.....md)
- [ ] [1.3.1.13 字符串：模板字面量、常用方法（](./notes/01-web-fundamentals/1.3-javascript/1.3.1.13.slice.md)`slice`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.13.slice.md)`split`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.13.slice.md)`includes`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.1.13.slice.md)`replace` [等）](./notes/01-web-fundamentals/1.3-javascript/1.3.1.13.slice.md)
- [ ] [1.3.1.14 📱 移动端对照：JS 基础语法与 Dart/Kotlin/Swift 差异；弱类型 vs 强类型](./notes/01-web-fundamentals/1.3-javascript/1.3.1.14.js-dart-kotlin-swift-vs.md)



#### 1.3.2 ES6+ 重要特性

- [ ] [1.3.2.1 类（](./notes/01-web-fundamentals/1.3-javascript/1.3.2.1.class.md)`class`[）：constructor、方法、继承（](./notes/01-web-fundamentals/1.3-javascript/1.3.2.1.class.md)`extends`[）、](./notes/01-web-fundamentals/1.3-javascript/1.3.2.1.class.md)`super`[、静态方法](./notes/01-web-fundamentals/1.3-javascript/1.3.2.1.class.md)
- [ ] [1.3.2.2 模块（ES Modules）：](./notes/01-web-fundamentals/1.3-javascript/1.3.2.2.import.md)`import` [/](./notes/01-web-fundamentals/1.3-javascript/1.3.2.2.import.md) `export`[（default vs named）](./notes/01-web-fundamentals/1.3-javascript/1.3.2.2.import.md)
- [ ] [1.3.2.3 Promise 基础：](./notes/01-web-fundamentals/1.3-javascript/1.3.2.3.then.md)`then`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.2.3.then.md)`catch`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.2.3.then.md)`finally`
- [ ] [1.3.2.4](./notes/01-web-fundamentals/1.3-javascript/1.3.2.4.async.md) `async` [/](./notes/01-web-fundamentals/1.3-javascript/1.3.2.4.async.md) `await`
- [ ] [1.3.2.5 迭代器与生成器（了解）](./notes/01-web-fundamentals/1.3-javascript/1.3.2.5.item-1-3-2-5.md)
- [ ] [1.3.2.6](./notes/01-web-fundamentals/1.3-javascript/1.3.2.6.map.md) `Map`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.2.6.map.md)`Set`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.2.6.map.md)`WeakMap`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.2.6.map.md)`WeakSet`
- [ ] [1.3.2.7 可选链、空值合并、逻辑赋值（](./notes/01-web-fundamentals/1.3-javascript/1.3.2.7.item-1-3-2-7.md)`&&=`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.2.7.item-1-3-2-7.md)`||=`[）](./notes/01-web-fundamentals/1.3-javascript/1.3.2.7.item-1-3-2-7.md)
- [ ] [1.3.2.8 顶层](./notes/01-web-fundamentals/1.3-javascript/1.3.2.8.await.md) `await`[（了解）](./notes/01-web-fundamentals/1.3-javascript/1.3.2.8.await.md)



#### 1.3.3 DOM 操作

- [ ] [1.3.3.1 DOM 树概念：Document、Element、Node、Text](./notes/01-web-fundamentals/1.3-javascript/1.3.3.1.dom-document-element-node-text.md)
- [ ] [1.3.3.2 查询：](./notes/01-web-fundamentals/1.3-javascript/1.3.3.2.getelementbyid.md)`getElementById`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.3.2.getelementbyid.md)`querySelector`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.3.2.getelementbyid.md)`querySelectorAll`
- [ ] [1.3.3.3 创建与修改：](./notes/01-web-fundamentals/1.3-javascript/1.3.3.3.createelement.md)`createElement`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.3.3.createelement.md)`appendChild`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.3.3.createelement.md)`insertBefore`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.3.3.createelement.md)`removeChild`
- [ ] [1.3.3.4 属性与样式：](./notes/01-web-fundamentals/1.3-javascript/1.3.3.4.setattribute.md)`setAttribute`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.3.4.setattribute.md)`classList`[（add/remove/toggle）、](./notes/01-web-fundamentals/1.3-javascript/1.3.3.4.setattribute.md)`style`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.3.4.setattribute.md)`dataset`
- [ ] [1.3.3.5 内容：](./notes/01-web-fundamentals/1.3-javascript/1.3.3.5.textcontent.md)`textContent` [vs](./notes/01-web-fundamentals/1.3-javascript/1.3.3.5.textcontent.md) `innerHTML`[（及 XSS 风险）](./notes/01-web-fundamentals/1.3-javascript/1.3.3.5.textcontent.md)
- [ ] [1.3.3.6 尺寸与位置：](./notes/01-web-fundamentals/1.3-javascript/1.3.3.6.offsetwidth-height.md)`offsetWidth/Height`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.3.6.offsetwidth-height.md)`clientWidth/Height`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.3.6.offsetwidth-height.md)`getBoundingClientRect()`
- [ ] [1.3.3.7 📱 移动端对照：DOM 操作 ≈ 直接操作 Widget 树（Flutter/RN 中较少手写，但理解有助于调试）](./notes/01-web-fundamentals/1.3-javascript/1.3.3.7.dom-widget-flutter-rn.md)



#### 1.3.4 事件

- [ ] [1.3.4.1 事件监听：](./notes/01-web-fundamentals/1.3-javascript/1.3.4.1.addeventlistener.md)`addEventListener`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.4.1.addeventlistener.md)`removeEventListener`
- [ ] [1.3.4.2 事件流：捕获阶段、目标阶段、冒泡阶段](./notes/01-web-fundamentals/1.3-javascript/1.3.4.2.item-1-3-4-2.md)
- [ ] [1.3.4.3](./notes/01-web-fundamentals/1.3-javascript/1.3.4.3.event.target.md) `event.target` [vs](./notes/01-web-fundamentals/1.3-javascript/1.3.4.3.event.target.md) `event.currentTarget`
- [ ] [1.3.4.4 阻止默认行为与冒泡：](./notes/01-web-fundamentals/1.3-javascript/1.3.4.4.preventdefault.md)`preventDefault()`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.4.4.preventdefault.md)`stopPropagation()`
- [ ] [1.3.4.5 常见事件：](./notes/01-web-fundamentals/1.3-javascript/1.3.4.5.click.md)`click`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.4.5.click.md)`input`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.4.5.click.md)`change`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.4.5.click.md)`submit`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.4.5.click.md)`keydown/keyup`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.4.5.click.md)`focus/blur`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.4.5.click.md)`scroll`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.4.5.click.md)`resize`
- [ ] [1.3.4.6 事件委托（Event Delegation）](./notes/01-web-fundamentals/1.3-javascript/1.3.4.6.event-delegation.md)
- [ ] [1.3.4.7 自定义事件：](./notes/01-web-fundamentals/1.3-javascript/1.3.4.7.customevent.md)`CustomEvent`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.4.7.customevent.md)`dispatchEvent`



#### 1.3.5 异步与网络

- [ ] [1.3.5.1 回调函数与回调地狱问题](./notes/01-web-fundamentals/1.3-javascript/1.3.5.1.item-1-3-5-1.md)
- [ ] [1.3.5.2](./notes/01-web-fundamentals/1.3-javascript/1.3.5.2.xmlhttprequest.md) `XMLHttpRequest` [基础（了解即可，现代用 fetch）](./notes/01-web-fundamentals/1.3-javascript/1.3.5.2.xmlhttprequest.md)
- [ ] [1.3.5.3 **Fetch API**：GET/POST 请求、请求头、响应处理、](./notes/01-web-fundamentals/1.3-javascript/1.3.5.3.fetch-api.md)`response.json()`
- [ ] [1.3.5.4 错误处理：](./notes/01-web-fundamentals/1.3-javascript/1.3.5.4.try-catch-finally.md)`try/catch/finally`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.5.4.try-catch-finally.md)`throw`
- [ ] [1.3.5.5 定时器：](./notes/01-web-fundamentals/1.3-javascript/1.3.5.5.settimeout.md)`setTimeout`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.5.5.settimeout.md)`setInterval`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.5.5.settimeout.md)`requestAnimationFrame`
- [ ] [1.3.5.6 JSON：](./notes/01-web-fundamentals/1.3-javascript/1.3.5.6.json.parse.md)`JSON.parse`[、](./notes/01-web-fundamentals/1.3-javascript/1.3.5.6.json.parse.md)`JSON.stringify`

---



## 阶段 2：JavaScript 深入与浏览器原理



### 2.1 JavaScript 进阶

- [ ] [2.1.1 **原型链**：](./notes/02-javascript-browser/2.1-js-advanced/2.1.1.item-2-1-1.md)`prototype`[、](./notes/02-javascript-browser/2.1-js-advanced/2.1.1.item-2-1-1.md)`__proto__`[、](./notes/02-javascript-browser/2.1-js-advanced/2.1.1.item-2-1-1.md)`Object.create`
- [ ] [2.1.2](./notes/02-javascript-browser/2.1-js-advanced/2.1.2.this.md) `this` [详解：默认绑定、隐式绑定、显式绑定（](./notes/02-javascript-browser/2.1-js-advanced/2.1.2.this.md)`call/apply/bind`[）、](./notes/02-javascript-browser/2.1-js-advanced/2.1.2.this.md)`new` [绑定、箭头函数](./notes/02-javascript-browser/2.1-js-advanced/2.1.2.this.md)
- [ ] [2.1.3 **执行上下文**与**调用栈](./notes/02-javascript-browser/2.1-js-advanced/2.1.3.item-2-1-3.md)**
- [ ] [2.1.4 **事件循环（Event Loop）**：宏任务、微任务、](./notes/02-javascript-browser/2.1-js-advanced/2.1.4.event-loop.md)`Promise` [与](./notes/02-javascript-browser/2.1-js-advanced/2.1.4.event-loop.md) `setTimeout` [执行顺序](./notes/02-javascript-browser/2.1-js-advanced/2.1.4.event-loop.md)
- [ ] [2.1.5 深拷贝 vs 浅拷贝：展开运算符、](./notes/02-javascript-browser/2.1-js-advanced/2.1.5.structuredclone.md)`structuredClone`[、](./notes/02-javascript-browser/2.1-js-advanced/2.1.5.structuredclone.md)`JSON` [方式的局限](./notes/02-javascript-browser/2.1-js-advanced/2.1.5.structuredclone.md)
- [ ] [2.1.6 防抖（Debounce）与节流（Throttle）](./notes/02-javascript-browser/2.1-js-advanced/2.1.6.debounce-throttle.md)
- [ ] [2.1.7 柯里化、组合函数（了解）](./notes/02-javascript-browser/2.1-js-advanced/2.1.7.item-2-1-7.md)
- [ ] [2.1.8 模块化发展史：IIFE → CommonJS → AMD → ES Modules](./notes/02-javascript-browser/2.1-js-advanced/2.1.8.iife-commonjs-amd-es-modules.md)
- [ ] [2.1.9 严格模式（](./notes/02-javascript-browser/2.1-js-advanced/2.1.9.use-strict.md)`'use strict'`[）](./notes/02-javascript-browser/2.1-js-advanced/2.1.9.use-strict.md)
- [ ] [2.1.10 内存管理与垃圾回收基本概念；常见内存泄漏场景（闭包、未清理的监听器、定时器）](./notes/02-javascript-browser/2.1-js-advanced/2.1.10.item-2-1-10.md)
- [ ] [2.1.11 📱 移动端对照：Event Loop ≈ Flutter 单线程 + Event Queue / RN JS Bridge 异步模型](./notes/02-javascript-browser/2.1-js-advanced/2.1.11.event-loop-flutter-event-queue.md)



### 2.2 浏览器原理

- [ ] [2.2.1 浏览器多进程架构（主进程、渲染进程、GPU 进程等）概览](./notes/02-javascript-browser/2.2-browser-internals/2.2.1.gpu.md)
- [ ] [2.2.2 **渲染流水线**：HTML 解析 → DOM 树、CSS 解析 → CSSOM → 渲染树 → 布局（Layout/Reflow）→ 绘制（Paint）→ 合成（Composite）](./notes/02-javascript-browser/2.2-browser-internals/2.2.2.item-2-2-2.md)
- [ ] [2.2.3 重排（Reflow）与重绘（Repaint）的触发条件与优化思路](./notes/02-javascript-browser/2.2-browser-internals/2.2.3.reflow-repaint.md)
- [ ] [2.2.4 关键渲染路径（Critical Rendering Path）优化](./notes/02-javascript-browser/2.2-browser-internals/2.2.4.critical-rendering-path.md)
- [ ] [2.2.5 合成层与](./notes/02-javascript-browser/2.2-browser-internals/2.2.5.will-change.md) `will-change`[、GPU 加速](./notes/02-javascript-browser/2.2-browser-internals/2.2.5.will-change.md)
- [ ] [2.2.6 脚本加载：](./notes/02-javascript-browser/2.2-browser-internals/2.2.6.async.md)`async`[、](./notes/02-javascript-browser/2.2-browser-internals/2.2.6.async.md)`defer` [区别](./notes/02-javascript-browser/2.2-browser-internals/2.2.6.async.md)
- [ ] [2.2.7 资源优先级与预加载：](./notes/02-javascript-browser/2.2-browser-internals/2.2.7.link-rel-preload.md)`<link rel="preload">`[、](./notes/02-javascript-browser/2.2-browser-internals/2.2.7.link-rel-preload.md)`prefetch`[、](./notes/02-javascript-browser/2.2-browser-internals/2.2.7.link-rel-preload.md)`preconnect`
- [ ] [2.2.8 浏览器缓存：**强缓存**（Cache-Control、Expires）与**协商缓存**（ETag、Last-Modified）](./notes/02-javascript-browser/2.2-browser-internals/2.2.8.item-2-2-8.md)
- [ ] [2.2.9 Service Worker 与 PWA 基本概念](./notes/02-javascript-browser/2.2-browser-internals/2.2.9.service-worker-pwa.md)



### 2.3 浏览器存储

- [ ] [2.3.1](./notes/02-javascript-browser/2.3-browser-storage/2.3.1.localstorage.md) `localStorage` [/](./notes/02-javascript-browser/2.3-browser-storage/2.3.1.localstorage.md) `sessionStorage` [API 与限制](./notes/02-javascript-browser/2.3-browser-storage/2.3.1.localstorage.md)
- [ ] [2.3.2 **Cookie**：属性（](./notes/02-javascript-browser/2.3-browser-storage/2.3.2.cookie.md)`HttpOnly`[、](./notes/02-javascript-browser/2.3-browser-storage/2.3.2.cookie.md)`Secure`[、](./notes/02-javascript-browser/2.3-browser-storage/2.3.2.cookie.md)`SameSite`[、](./notes/02-javascript-browser/2.3-browser-storage/2.3.2.cookie.md)`Domain`[、](./notes/02-javascript-browser/2.3-browser-storage/2.3.2.cookie.md)`Path`[、](./notes/02-javascript-browser/2.3-browser-storage/2.3.2.cookie.md)`Max-Age`[）](./notes/02-javascript-browser/2.3-browser-storage/2.3.2.cookie.md)
- [ ] [2.3.3 **IndexedDB** 基本概念（大型结构化本地存储）](./notes/02-javascript-browser/2.3-browser-storage/2.3.3.indexeddb.md)
- [ ] [2.3.4 存储方案选型对比](./notes/02-javascript-browser/2.3-browser-storage/2.3.4.item-2-3-4.md)



### 2.4 Web API 选学

- [ ] [2.4.1 **Intersection Observer**（懒加载、无限滚动）](./notes/02-javascript-browser/2.4-web-apis/2.4.1.intersection-observer.md)
- [ ] [2.4.2 **Resize Observer](./notes/02-javascript-browser/2.4-web-apis/2.4.2.resize-observer.md)**
- [ ] [2.4.3 **Mutation Observer](./notes/02-javascript-browser/2.4-web-apis/2.4.3.mutation-observer.md)**
- [ ] [2.4.4 **Geolocation API](./notes/02-javascript-browser/2.4-web-apis/2.4.4.geolocation-api.md)**
- [ ] [2.4.5 **Clipboard API](./notes/02-javascript-browser/2.4-web-apis/2.4.5.clipboard-api.md)**
- [ ] [2.4.6 **File API** 与文件读取](./notes/02-javascript-browser/2.4-web-apis/2.4.6.file-api.md)
- [ ] [2.4.7 **History API**（](./notes/02-javascript-browser/2.4-web-apis/2.4.7.history-api.md)`pushState`[、](./notes/02-javascript-browser/2.4-web-apis/2.4.7.history-api.md)`popstate`[）— SPA 路由基础](./notes/02-javascript-browser/2.4-web-apis/2.4.7.history-api.md)
- [ ] [2.4.8 **Web Workers** 基本概念](./notes/02-javascript-browser/2.4-web-apis/2.4.8.web-workers.md)
- [ ] [2.4.9 **Notification API** 基础](./notes/02-javascript-browser/2.4-web-apis/2.4.9.notification-api.md)

---
