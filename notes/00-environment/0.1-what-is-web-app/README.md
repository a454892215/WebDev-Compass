# 0.1 Web 应用是什么

> [← 返回阶段 0](../README.md) · [← 返回知识库地图](../../KNOWLEDGE_MAP.md#01-web-应用是什么)

在进入 HTML、CSS、JavaScript 之前，需要先建立对 **Web 应用整体运作方式** 的正确心智模型。本节涵盖 Web 世界最基本的五个概念。

## 知识点列表

| # | 知识点 | 笔记 |
|---|--------|------|
| 1 | 客户端—服务器（C/S）模型与请求—响应循环 | [client-server-model.md](./client-server-model.md) |
| 2 | 浏览器的角色：HTML/CSS/JS 解析、渲染、执行 | [browser-role.md](./browser-role.md) |
| 3 | 单页应用（SPA）vs 多页应用（MPA） | [spa-vs-mpa.md](./spa-vs-mpa.md) |
| 4 | 同源策略与跨域问题的来源 | [same-origin-policy.md](./same-origin-policy.md) |
| 5 | 📱 移动端对照总览 | [mobile-comparison.md](./mobile-comparison.md) |

## 学习建议

按上表顺序阅读。第 1、2 节是地基；第 3 节在理解浏览器之后更容易消化；第 4 节会在后续 API 对接中反复遇到；第 5 节帮助你用已有移动端经验加速理解。

## 配套示例

| 示例 | 说明 |
|------|------|
| [request-response-demo.html](../../examples/00-environment/0.1-what-is-web-app/request-response-demo.html) | 观察浏览器发起 HTTP 请求与响应 |
| [spa-vs-mpa-demo.html](../../examples/00-environment/0.1-what-is-web-app/spa-vs-mpa-demo.html) | 对比 SPA 与 MPA 的页面跳转行为 |
| [same-origin-demo.html](../../examples/00-environment/0.1-what-is-web-app/same-origin-demo.html) | 在控制台体验同源策略限制 |

## 学完后自测

- [ ] 能画出「用户点击按钮 → 浏览器发请求 → 服务器响应 → 页面更新」的流程
- [ ] 能说出 HTML、CSS、JS 在浏览器中各自负责什么
- [ ] 能解释 SPA 和 MPA 的区别，并各举出一个适用场景
- [ ] 能解释什么是「同源」，以及为什么跨域请求会被浏览器拦截
