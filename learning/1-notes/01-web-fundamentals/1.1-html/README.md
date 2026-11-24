# 1.1 HTML

[返回阶段 1](../README.md) · [知识地图](../../../../knowledge-map/01-foundation-stages-0-2.md)

本章从原生文档结构开始，理解语义、表单和浏览器内置交互。共 19 个知识点，每篇配套一个不依赖外网的示例；手机与桌面共享的是 Web 语义基础，不要求产品 UI 一致。

## 阅读与实验

先学 1.1.1，再学 1.1.2，最后用 1.1.3 探索图形、组件基础和原生交互。纯 HTML 示例可直接打开，推荐在仓库根目录启动 `python3 -m http.server 4173 --bind 127.0.0.1` 后访问 learning/2-examples 目录，便于观察 URL 与资源加载。

| 知识点                                                                                                      | 正文                                                   | 实践                                                                                                       |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| 1.1.1.1 `<!DOCTYPE html>`、`<html>`、`<head>`、`<body>` 文档结构                                            | [笔记](./1.1.1.1.doctype-html.md)                      | [示例](../../../2-examples/01-web-fundamentals/1.1-html/1.1.1.1.doctype-html-demo.html)                      |
| 1.1.1.2 语义化标签：`<header>`、`<nav>`、`<main>`、`<section>`、`<article>`、`<aside>`、`<footer>`          | [笔记](./1.1.1.2.header.md)                            | [示例](../../../2-examples/01-web-fundamentals/1.1-html/1.1.1.2.header-demo.html)                            |
| 1.1.1.3 标题与文本：`<h1>`–`<h6>`、`<p>`、`<span>`、`<strong>`、`<em>`、`<br>`、`<hr>`                      | [笔记](./1.1.1.3.h1.md)                                | [示例](../../../2-examples/01-web-fundamentals/1.1-html/1.1.1.3.h1-demo.html)                                |
| 1.1.1.4 列表：`<ul>`、`<ol>`、`<li>`、`<dl>`、`<dt>`、`<dd>`                                                | [笔记](./1.1.1.4.ul.md)                                | [示例](../../../2-examples/01-web-fundamentals/1.1-html/1.1.1.4.ul-demo.html)                                |
| 1.1.1.5 链接与导航：`<a href>`、锚点、相对路径与绝对路径                                                    | [笔记](./1.1.1.5.a-href.md)                            | [示例](../../../2-examples/01-web-fundamentals/1.1-html/1.1.1.5.a-href-demo.html)                            |
| 1.1.1.6 图片与媒体：`<img>`、`<picture>`、`<video>`、`<audio>`、`<source>`、`<figure>`、`<figcaption>`      | [笔记](./1.1.1.6.img.md)                               | [示例](../../../2-examples/01-web-fundamentals/1.1-html/1.1.1.6.img-demo.html)                               |
| 1.1.1.7 表格：`<table>`、`<thead>`、`<tbody>`、`<tr>`、`<th>`、`<td>`、`<caption>`                          | [笔记](./1.1.1.7.table.md)                             | [示例](../../../2-examples/01-web-fundamentals/1.1-html/1.1.1.7.table-demo.html)                             |
| 1.1.1.8 元信息：`<meta>`（charset、viewport、description、OG 标签）、`<title>`、`<link>`、`<script>`        | [笔记](./1.1.1.8.meta.md)                              | [示例](../../../2-examples/01-web-fundamentals/1.1-html/1.1.1.8.meta-demo.html)                              |
| 1.1.2.1 表单：`<form>`、`<input>` 各类型（text、password、email、number、checkbox、radio、file、hidden 等） | [笔记](./1.1.2.1.form.md)                              | [示例](../../../2-examples/01-web-fundamentals/1.1-html/1.1.2.1.form-demo.html)                              |
| 1.1.2.2 `<textarea>`、`<select>`、`<option>`、`<optgroup>`、`<button>`、`<label>`、`<fieldset>`、`<legend>` | [笔记](./1.1.2.2.textarea.md)                          | [示例](../../../2-examples/01-web-fundamentals/1.1-html/1.1.2.2.textarea-demo.html)                          |
| 1.1.2.3 表单属性：`required`、`disabled`、`readonly`、`placeholder`、`pattern`、`min`/`max`、`autocomplete` | [笔记](./1.1.2.3.required.md)                          | [示例](../../../2-examples/01-web-fundamentals/1.1-html/1.1.2.3.required-demo.html)                          |
| 1.1.2.4 表单提交：method、action、enctype（`application/x-www-form-urlencoded`、`multipart/form-data`）     | [笔记](./1.1.2.4.application-x-www-form-urlencoded.md) | [示例](../../../2-examples/01-web-fundamentals/1.1-html/1.1.2.4.application-x-www-form-urlencoded-demo.html) |
| 1.1.2.5 原生表单验证与自定义验证提示                                                                        | [笔记](./1.1.2.5.item-1-1-2-5.md)                      | [示例](../../../2-examples/01-web-fundamentals/1.1-html/1.1.2.5.item-1-1-2-5-demo.html)                      |
| 1.1.3.1 `<canvas>` 2D 绘图基础                                                                              | [笔记](./1.1.3.1.canvas.md)                            | [示例](../../../2-examples/01-web-fundamentals/1.1-html/1.1.3.1.canvas-demo.html)                            |
| 1.1.3.2 `<svg>` 矢量图形基础                                                                                | [笔记](./1.1.3.2.svg.md)                               | [示例](../../../2-examples/01-web-fundamentals/1.1-html/1.1.3.2.svg-demo.html)                               |
| 1.1.3.3 `<template>`、`<slot>`（为 Web Components 打基础）                                                  | [笔记](./1.1.3.3.template.md)                          | [示例](../../../2-examples/01-web-fundamentals/1.1-html/1.1.3.3.template-demo.html)                          |
| 1.1.3.4 `<details>` / `<summary>`、`<dialog>`、`<progress>`、`<meter>`                                      | [笔记](./1.1.3.4.details.md)                           | [示例](../../../2-examples/01-web-fundamentals/1.1-html/1.1.3.4.details-demo.html)                           |
| 1.1.3.5 `data-*` 自定义属性                                                                                 | [笔记](./1.1.3.5.data.md)                              | [示例](../../../2-examples/01-web-fundamentals/1.1-html/1.1.3.5.data-demo.html)                              |
| 1.1.3.6 SEO 基础：语义化、标题层级、meta description、结构化数据（JSON-LD 概念）                            | [笔记](./1.1.3.6.seo.md)                               | [示例](../../../2-examples/01-web-fundamentals/1.1-html/1.1.3.6.seo-demo.html)                               |

## 本章验收

- 能使用结构、标题和列表表达内容，并区分导航链接与动作按钮。
- 能构建带显式标签、可键盘操作的表单，解释原生验证与服务端校验的边界。
- 能解释 disabled/readonly/name 对提交的影响，区分 URL 编码、multipart 与 JSON。
- 能使用原生 details/dialog/progress/meter，给图形和媒体提供文字替代，说明本地媒体选择的限制。
- 能在桌面与窄视口运行示例，检查语义、溢出、焦点与控制台，不把页面运行等同于真实后端或 SEO 验收。

本轮验证结果见[验证记录](../../../../docs/verification-2026-11-24.md)。地图勾选由学习者维护，不因正文生成而自动完成。

## 前置、产出与阅读顺序

前置是阶段 0 的文件/HTTP/DevTools 基础，不要求先会 Vue、Nuxt 或 JavaScript 框架。先完成 1.1.1 文档与语义、1.1.2 表单的原生结构，再进入 CSS 与 JavaScript；1.1.3 的 Canvas、SVG 动态更新、Custom Elements、dataset 操作在具备 1.3 的 DOM/事件/类基础后返回完成。首次阅读可操作演示，不要求重写脚本支架。

本章产出是一份语义结构清楚、媒体有替代说明、标签与键盘可操作的学习页面，以及可解释的表单数据集。独立练习涉及 URL/FormData/事件处理时，先完成对应 1.3 小节再交付脚本；纯 HTML 结构部分可以先做。样式与脚本分步添加，不将它们作为理解标签含义的隐藏前提。

本次质量复核见[HTML 逐点审查](../../../../docs/audits/stage-1-html-review.md)，早期浏览器结果只在未改交互代码的范围复用。
