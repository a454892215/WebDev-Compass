# 客户端—服务器（C/S）模型与请求—响应循环

> [← 返回 0.1 目录](./README.md) · [知识库地图](../../../KNOWLEDGE_MAP.md#01-web-应用是什么)

## 一句话理解

Web 应用的本质是：**浏览器（客户端）向服务器发起请求，服务器处理后返回响应，浏览器再据此更新界面。**

---

## 什么是 C/S 模型

**C/S（Client / Server）** 即客户端—服务器架构：

| 角色 | 是什么 | 典型职责 |
|------|--------|----------|
| **客户端（Client）** | 用户直接使用的程序 | 发起请求、展示界面、处理用户交互 |
| **服务器（Server）** | 运行在远端计算机上的程序 | 接收请求、处理业务逻辑、读写数据库、返回结果 |

在 Web 开发中：

- **客户端** = 浏览器（Chrome、Safari、Firefox 等）
- **服务器** = 后端服务（Node.js、Java Spring、Go、Python Django 等）

```
┌─────────────┐         HTTP 请求          ┌─────────────┐
│   浏览器     │  ──────────────────────►  │   Web 服务器  │
│  (客户端)    │  ◄──────────────────────  │  (服务端)    │
└─────────────┘         HTTP 响应          └─────────────┘
                                                  │
                                                  ▼
                                           ┌─────────────┐
                                           │   数据库      │
                                           └─────────────┘
```

---

## 请求—响应循环（Request-Response Cycle）

每一次 Web 交互都遵循这个循环：

### 1. 用户触发动作

例如：在地址栏输入 URL、点击链接、提交表单、点击「加载更多」按钮。

### 2. 浏览器构建并发送 HTTP 请求

请求中包含：

- **请求方法**：`GET`（获取资源）、`POST`（提交数据）等
- **URL**：要访问的地址，如 `https://api.example.com/users?page=1`
- **请求头（Headers）**：如 `Content-Type`、`Authorization`、`Cookie`
- **请求体（Body）**：POST/PUT 时携带的 JSON 或表单数据

### 3. 服务器处理请求

服务器根据 URL 路由到对应处理逻辑，可能涉及：

- 查询数据库
- 调用其他微服务
- 读写文件
- 执行业务规则（权限校验、数据校验等）

### 4. 服务器返回 HTTP 响应

响应中包含：

- **状态码**：`200` 成功、`404` 未找到、`500` 服务器错误等
- **响应头**：如 `Content-Type: application/json`、`Set-Cookie`
- **响应体（Body）**：HTML 页面、JSON 数据、图片二进制等

### 5. 浏览器处理响应

根据 `Content-Type` 决定如何处理：

| Content-Type | 浏览器行为 |
|--------------|------------|
| `text/html` | 解析 HTML，构建 DOM，加载 CSS/JS，渲染页面 |
| `application/json` | 交给 JavaScript 处理（通常用 `fetch` / `axios`） |
| `image/png` 等 | 显示图片 |
| `text/css` | 应用样式 |
| `application/javascript` | 执行脚本 |

### 6. 用户看到更新后的界面

页面刷新、局部 DOM 更新、或弹出提示——取决于前端实现方式（MPA 或 SPA）。

---

## 完整示例：访问一个网页

以在浏览器输入 `https://example.com` 为例：

```
1. 浏览器向 DNS 查询 example.com 的 IP 地址
2. 浏览器向该 IP 的 443 端口发起 HTTPS 请求
   GET / HTTP/1.1
   Host: example.com
3. 服务器返回 HTML 文档（状态码 200）
4. 浏览器解析 HTML，发现引用了 style.css 和 app.js
5. 浏览器再发起两个 GET 请求获取 CSS 和 JS（可能并行）
6. 浏览器构建 DOM + CSSOM，渲染出完整页面
7. JS 执行，可能再发起 API 请求获取动态数据
```

**关键点**：加载一个页面往往涉及**多次**请求—响应，而不只是一次。

---

## 静态资源 vs 动态接口

| 类型 | 说明 | 示例 |
|------|------|------|
| **静态资源** | 服务器直接返回文件，内容不变 | HTML、CSS、JS、图片、字体 |
| **动态接口（API）** | 服务器根据参数实时计算结果 | `GET /api/users`、`POST /api/login` |

现代 Web 应用中，首次加载返回 HTML 骨架，后续数据通过 **API 接口**以 JSON 形式获取——这与移动端通过 Retrofit/Dio 调接口的模式非常相似。

---

## 📱 移动端对照

| Web | Android | Flutter | React Native |
|-----|---------|---------|--------------|
| 浏览器（客户端） | App 本身 | App 本身 | App 本身 |
| HTTP 请求 | OkHttp / Retrofit | `http` / `dio` | `fetch` / `axios` |
| 服务器 API | 同一个后端 | 同一个后端 | 同一个后端 |
| 渲染 UI | 浏览器渲染引擎 | Flutter Engine |原生组件 / JS 桥接 |

**核心一致**：无论 Web 还是移动端，都是客户端通过 HTTP(S) 与服务器通信。你在移动端积累的接口对接经验，可以直接迁移到 Web 的 `fetch` / `axios`。

**主要差异**：Web 的「客户端」是浏览器，需要额外理解 HTML/CSS 渲染；移动端是原生控件或自绘引擎，没有 DOM 概念。

---

## 实践

打开配套示例，在 Chrome DevTools 的 **Network** 面板观察请求—响应：

👉 [request-response-demo.html](../../../examples/00-environment/0.1-what-is-web-app/request-response-demo.html)

**操作步骤**：

1. 用浏览器打开该 HTML 文件（或 Live Server）
2. 按 `F12` 打开 DevTools → 切换到 **Network** 标签
3. 点击页面上的「获取用户列表」按钮
4. 观察出现的 HTTP 请求：请求 URL、方法、状态码、响应 JSON

---

## 常见误区

| 误区 | 正确理解 |
|------|----------|
| 「前端只写页面，不需要懂服务器」 | 前端需要理解请求—响应才能正确对接 API、处理错误 |
| 「一次页面加载只有一次请求」 | 通常有多次：HTML + CSS + JS + 图片 + API |
| 「POST 比 GET 更安全」 | 安全性取决于 HTTPS 和鉴权设计，不是 HTTP 方法本身 |

---

## 延伸阅读

- 下一节：[浏览器的角色](./browser-role.md)
- 阶段 0.3：[HTTP/HTTPS 协议详解](../0.3-network-basics/)（待补充）
