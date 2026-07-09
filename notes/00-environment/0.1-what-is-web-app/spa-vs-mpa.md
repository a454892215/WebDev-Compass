# 单页应用（SPA）vs 多页应用（MPA）

> [← 返回 0.1 目录](./README.md) · [知识库地图](../../../KNOWLEDGE_MAP.md#01-web-应用是什么)

## 一句话理解

- **MPA**：每个页面都是一次完整的浏览器加载（传统网站）
- **SPA**：只加载一次 HTML，之后通过 JS 切换「视图」（现代主流应用）

---

## 多页应用（MPA — Multi-Page Application）

### 工作方式

用户每点击一个链接或提交表单，浏览器向服务器请求一个**新的 HTML 页面**，整个页面**全量刷新**。

```
用户点击「关于我们」
    │
    ▼
浏览器发起 GET /about
    │
    ▼
服务器返回 about.html（完整 HTML 页面）
    │
    ▼
浏览器丢弃旧页面，渲染新页面（白屏闪烁）
```

### 特点

| 优点 | 缺点 |
|------|------|
| 实现简单，服务端可直接渲染 | 页面切换有白屏/闪烁 |
| SEO 友好（每个 URL 对应完整 HTML） | 重复加载相同的 CSS/JS |
| 首屏只需加载当前页资源 | 前后端耦合较紧 |
| 技术栈要求低 | 状态不好在页面间共享 |

### 典型场景

- 企业官网、博客、新闻站
- 后台管理系统的传统实现
- 电商的商品详情页（SSR 场景）

### 技术栈示例

- 服务端模板：JSP、PHP、Django Templates、Rails ERB
- 或纯静态多 HTML 文件

---

## 单页应用（SPA — Single-Page Application）

### 工作方式

浏览器**首次**只加载一个 HTML 壳（通常几乎是空的）和完整的 JS 包。之后的「页面切换」由 **JavaScript 在客户端完成**，不再向服务器请求新 HTML。

```
首次访问
    │
    ▼
加载 index.html + app.js（体积较大）
    │
    ▼
JS 根据 URL 渲染对应「视图」（View）
    │
    ▼
用户点击「关于我们」
    │
    ▼
JS 拦截跳转 → 修改 URL（History API）→ 替换 DOM 内容
    │
    ▼
可能同时发起 API 请求获取数据（页面不刷新）
```

### 特点

| 优点 | 缺点 |
|------|------|
| 页面切换流畅，接近原生 App 体验 | 首屏加载慢（JS 包大） |
| 前后端分离，API 驱动 | SEO 不友好（需 SSR 方案） |
| 状态可在视图间共享 | 初始配置复杂 |
| 开发体验好（组件化、热更新） | 前进/后退需自行管理 |

### 典型场景

- 管理后台（Dashboard）
- SaaS 产品（Notion、Figma、Gmail）
- 社交应用、在线编辑器

### 技术栈示例

- **React** + React Router + Vite
- **Vue** + Vue Router + Pinia
- **Angular**

---

## 核心对比

| 维度 | MPA | SPA |
|------|-----|-----|
| 页面加载 | 每次导航重新加载 HTML | 只加载一次，后续 JS 切换视图 |
| URL 变化 | 浏览器原生处理 | JS 通过 History API 修改 |
| 数据获取 | 服务端嵌入 HTML 或页面内请求 | 主要通过 API 获取 JSON |
| 页面切换体验 | 有刷新感 | 流畅无刷新 |
| SEO | 天然友好 | 需 SSR/SSG 辅助 |
| 首屏速度 | 通常较快 | 取决于 JS 包大小 |
| 开发模式 | 前后端可一体 | 前后端分离为主 |

---

## SPA 的关键技术

### 1. 客户端路由（Client-Side Routing）

SPA 用 JS 监听 URL 变化，渲染不同组件，而不是让浏览器去请求新页面：

```javascript
// React Router 示意
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/users/:id" element={<UserDetail />} />
</Routes>
```

底层依赖浏览器 **History API**：

```javascript
// 编程式导航，不刷新页面
history.pushState({}, '', '/about');
```

### 2. API 驱动

SPA 的数据几乎全来自后端 API：

```javascript
// 进入用户列表页时获取数据
const res = await fetch('/api/users');
const users = await res.json();
// 用数据渲染组件，不刷新页面
```

### 3. 状态管理

多个「页面」共享登录态、购物车等状态，需要全局状态方案（Context、Redux、Pinia 等）。

---

## 混合方案

实际项目中并不只有二选一：

| 方案 | 说明 |
|------|------|
| **SSR（服务端渲染）** | Next.js / Nuxt：首屏服务端生成 HTML，之后水合为 SPA |
| **SSG（静态生成）** | 构建时生成 HTML，部署为静态文件 |
| **MPA + 部分 SPA** | 主站 MPA，某些模块（如编辑器）用 SPA |
| **微前端** | 不同子系统各自 SPA/MPA，组合在一个站点 |

---

## 📱 移动端对照

| Web 概念 | 移动端类比 |
|----------|-----------|
| **SPA** | 单 Activity + 多个 Fragment / 单 Navigator 多 Route |
| **MPA** | 每个功能独立 Activity，切换时重新创建 |
| **客户端路由** | Flutter `Navigator.push`、RN `navigation.navigate` |
| **API 驱动 UI** | 移动端本就这么干（调接口 → 刷新列表） |

有 **React Native** 经验：你写的 RN App **本质上就是 SPA**——一个 JS Bundle，通过 Navigator 切换 Screen，数据来自 API。React Web 的开发模式与 RN 高度一致，主要额外学习 HTML/CSS。

有 **Flutter** 经验：`MaterialApp` + `routes` / `go_router` 就是客户端路由；`Navigator.push` 类似 SPA 视图切换，但不会重新加载整个 App。

有 **Android** 经验：传统多 Activity 类似 MPA；单 Activity + Navigation Component 类似 SPA。

---

## 实践

打开对比示例，观察两种模式的行为差异：

👉 [spa-vs-mpa-demo.html](../../../examples/00-environment/0.1-what-is-web-app/spa-vs-mpa-demo.html)

**操作步骤**：

1. 打开示例页面
2. 先体验 **MPA 模式**：点击链接，观察页面整体刷新（注意 Network 面板有新 HTML 请求）
3. 再体验 **SPA 模式**：点击导航，观察页面无刷新切换（只有 API 请求，无新 HTML）

---

## 如何选择

```
需要 SEO？（内容站、电商列表）
    ├── 是 → MPA 或 SSR/SSG（Next.js / Nuxt）
    └── 否 → 继续判断

应用交互复杂？（后台、工具、社交）
    ├── 是 → SPA（React / Vue）
    └── 否 → 简单 MPA 或静态站即可
```

---

## 常见误区

| 误区 | 正确理解 |
|------|----------|
| 「SPA 只有一个 HTML 文件」 | 通常是一个 HTML **入口**，但会动态加载 JS/CSS 分片 |
| 「SPA 不跟服务器通信」 | SPA 只是不重新加载 HTML，API 请求非常频繁 |
| 「MPA 已经过时」 | 内容型网站、SEO 场景 MPA/SSR 仍是主流 |
| 「用了 React 就是 SPA」 | Next.js 可以做 SSR/SSG，不一定是纯 SPA |

---

## 延伸阅读

- 上一节：[浏览器的角色](./browser-role.md)
- 下一节：[同源策略与跨域](./same-origin-policy.md)
- 阶段 4：React Router / Vue Router 实战（待补充）
- 阶段 7：SSR / Next.js / Nuxt（待补充）
