# 📱 移动端对照：Web 应用是什么

> [← 返回 0.1 目录](./README.md) · [知识库地图](../../../KNOWLEDGE_MAP.md#01-web-应用是什么)

本节汇总 0.1 中各知识点的移动端对照，帮助有 Android / Flutter / React Native 经验的开发者快速建立 Web 心智模型。

---

## 总览对照表

| Web 概念 | Android | Flutter | React Native |
|----------|---------|---------|--------------|
| **浏览器** | WebView / Chrome Custom Tabs | 无（或用 `webview_flutter`） | 无（或用 `react-native-webview`） |
| **HTML** | XML Layout / Compose | Widget Tree | JSX → Native Views |
| **CSS** | styles.xml / Theme / Modifier | Theme / BoxDecoration | StyleSheet |
| **JavaScript** | Kotlin / Java | Dart | JavaScript / TypeScript |
| **HTTP 客户端** | OkHttp / Retrofit | `http` / `dio` | `fetch` / `axios` |
| **本地存储** | SharedPreferences / Room | `shared_preferences` / Hive | AsyncStorage |
| **路由导航** | Navigation Component / Intent | Navigator / go_router | React Navigation |
| **SPA** | 单 Activity + Fragments | MaterialApp + Routes | Single Bundle + Screens |
| **跨域限制** | 无 CORS | 无 CORS | 无 CORS（Web 端有） |

---

## 分概念详解

### 1. 客户端—服务器模型

```
Web:     浏览器 ──HTTP──► 服务器 API
Android: App    ──HTTP──► 服务器 API  （Retrofit）
Flutter: App    ──HTTP──► 服务器 API  （dio）
RN:      App    ──HTTP──► 服务器 API  （fetch）
```

**一致点**：架构完全相同，你已有经验直接适用。

**差异点**：Web 的「客户端」是浏览器，需要理解页面渲染；移动端客户端直接操控原生 UI。

### 2. 浏览器 ≈ WebView / 运行时

| 角色 | Web | 移动端 |
|------|-----|--------|
| 网络层 | 浏览器网络栈 | OkHttp / URLSession |
| 渲染层 | Blink / WebKit 引擎 | Android View / Skia / Yoga |
| 逻辑层 | V8 JS 引擎 | ART / Dart VM / Hermes |
| 壳 | 地址栏 + 标签页 | App 图标 + 原生导航栏 |

Flutter 比较特殊：它不依赖浏览器，自绘 UI（Skia/Impeller），更接近「自带渲染引擎的客户端」。

### 3. SPA ≈ 单 Activity + Fragment 导航

| 操作 | Web SPA | Android | Flutter | RN |
|------|---------|---------|---------|-----|
| 首次加载 | 下载 HTML + JS Bundle | 启动 Activity | `runApp()` | 加载 JS Bundle |
| 切换页面 | JS 替换 DOM / 组件 | `FragmentTransaction` | `Navigator.push` | `navigation.navigate` |
| 是否重新加载壳 | 否 | 否（单 Activity 模式） | 否 | 否 |
| 数据刷新 | `fetch` API | Retrofit | dio | fetch |

**RN 开发者**：你写的 App 就是 SPA，迁移到 React Web 时组件思维一致，重点补 HTML/CSS。

### 4. 同源策略 — Web 独有

移动端 App 发 HTTP 请求**不受浏览器同源策略限制**：

```kotlin
// Android — 直接请求任何域名，无需 CORS
@GET("https://api.any-domain.com/users")
suspend fun getUsers(): List<User>
```

```javascript
// Web — 跨域需要服务端配合 CORS
const res = await fetch('https://api.other-domain.com/users');
// 如果服务端没配 CORS，浏览器会拦截响应
```

**记住**：上线 Web 项目前，一定要和后端确认 CORS 配置。

---

## 各背景学习加速建议

### 有 React Native 经验

| 已掌握 | 需重点补 |
|--------|----------|
| JS / TS 语法 | HTML 语义化 |
| React 组件思维 | CSS 布局（Flexbox、Grid） |
| 状态管理、Hooks | DOM API 与浏览器 DevTools |
| API 对接 | Cookie / Session / CORS |
| 导航 | SEO、SSR 概念 |

**加速路径**：可跳过 JS 基础，从阶段 1 的 HTML/CSS 开始，阶段 4 React 可快速过。

### 有 Flutter 经验

| 已掌握 | 需重点补 |
|--------|----------|
| 组件化 UI 思维 | HTML + CSS 整套体系 |
| 状态管理（Provider 等） | JavaScript / TypeScript |
| 路由 | 浏览器渲染原理 |
| API 对接（dio） | npm 生态与构建工具 |
| 响应式布局 | 同源策略 / CORS |

**加速路径**：阶段 1 全学，阶段 2 JS 从零开始，阶段 4 可选 React 或 Vue。

### 有 Android 经验

| 已掌握 | 需重点补 |
|--------|----------|
| 工程化（Gradle） | 前端工程化（npm / Vite） |
| 生命周期概念 | JS 事件循环 / 异步 |
| 布局（XML/Compose） | CSS 布局 |
| 网络（Retrofit） | fetch / axios + CORS |
| Activity 导航 | SPA 客户端路由 |

**加速路径**：按标准路线从阶段 0 开始，利用网络和后端协作经验加速阶段 5。

---

## 概念映射图

```
┌─────────────────────────────────────────────────────────────┐
│                     你已有的移动端经验                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                  │
│  │ Android  │  │ Flutter  │  │    RN    │                  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘                  │
│       │             │             │                         │
│       └─────────────┼─────────────┘                         │
│                     ▼                                       │
│          HTTP / API / 状态管理 / 路由  ← 直接迁移            │
└─────────────────────────────────────────────────────────────┘
                      │
                      ▼ 需要新学
┌─────────────────────────────────────────────────────────────┐
│                     Web 特有知识                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   HTML   │  │   CSS    │  │ 浏览器原理 │  │CORS / SEO│   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 延伸阅读

- [客户端—服务器模型](./client-server-model.md)
- [浏览器的角色](./browser-role.md)
- [SPA vs MPA](./spa-vs-mpa.md)
- [同源策略与跨域](./same-origin-policy.md)
