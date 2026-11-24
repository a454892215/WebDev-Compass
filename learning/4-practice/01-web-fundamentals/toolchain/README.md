# CSS 构建工具真实实践

对应知识点：1.2.6.2 CSS Modules、1.2.6.3 Sass/SCSS、1.2.6.4 Tailwind CSS。

这是独立、小型 Vite 实验，不是 Nuxt 项目模板。浏览器只接收最终 CSS/JS；`.module.css` 的类映射、Sass 编译、Tailwind 扫描都发生在构建期。本实验补充单知识点中“人工编译结果 fixture”的边界。

## 环境与可重复命令

需要 Node.js 22.12+（本轮实际 Node.js 26.0.0）及 npm。直接依赖锁定 Vite 8.3.8、Sass 1.108.2、Tailwind CSS / @tailwindcss/vite 4.3.5；`package-lock.json` 固定传递依赖。

在本目录执行：

```sh
npm ci
npm run check
npm run dev
```

`check` 先构建 `dist/`，再对产物运行独立断言。开发服务器地址以终端实际输出为准，仅绑定 127.0.0.1；完成后 Ctrl+C 停止。也可用任意本地静态服务器打开构建后的 `dist/index.html`。配置 `base: './'`，支持置于知识库的子路径。

不能直接从普通静态服务器打开本目录源码 `index.html`：原生浏览器不能导入 CSS Module 对象或编译 SCSS。`dist/`、`node_modules/` 均忽略，不提交生成产物或依赖。`npm ci` 是首次复现步骤，不能把已有依赖缓存当作所有机器均可直接运行的保证。

## 三条真实编译链

| 主题        | 源码入口                                                      | 观察产物及页面                                                                           |
| ----------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| CSS Modules | `src/CardA.module.css`、`src/CardB.module.css`、`src/main.js` | 两个源码 `.card` 导出不同生成类名；`#module-a` 与 `#module-b` 分别为蓝、棕色，互不覆盖   |
| Sass        | `src/tokens.scss`、`src/card.scss`                            | `@use` 引入变量和函数；`step(3)` 变为 `24px`，嵌套 `strong` 展开为后代选择器             |
| Tailwind    | `src/style.css`、根 `index.html`                              | Vite 插件扫描静态完整类名，生成 `grid`、`gap-4`、`sm:grid-cols-2`；窄屏一列、≥640px 两列 |

`src/style.css` 以 `source('../')` 指定从该 CSS 文件所在位置向上一级扫描，才能覆盖根 `index.html`。如果写 `source('./')`，只扫描 src，会生成碰巧出现在 JS 中的 `grid` 而漏掉 HTML 中的响应式类。构建成功不代表 utility 齐全，`verify.mjs` 会在此条件下报错。

本页使用 Tailwind Preflight；本地基础排版放进 `@layer base`，utility 层可按明确顺序覆盖。CSS Modules 是构建期命名隔离，不是 Shadow DOM，也不能阻止全局标签选择器、继承和层叠影响元素。Sass 编译期变量不等于运行时可级联的 CSS 自定义属性。

## 动手任务

1. 把模块 B 的源码 `.card` 颜色改成另一种易识别颜色，保持模块 A 不变，重新构建，核对 DOM 类映射及样式隔离。
2. 修改 `tokens.step(3)` 为 `tokens.step(4)`，先预测 padding，再构建观察 32px；对应修改 `verify.mjs` 的验收值，不可删除断言掩盖失败。
3. 把 Tailwind 网格改成 `grid-cols-1 md:grid-cols-3`，观察断点、生成 CSS 和不同宽度。恢复后确认原始 `check` 通过。
4. 故意缩小 Tailwind source 范围复现缺失 utility；检查 HTML 的完整类名，再修正扫描范围。不要用动态字符串拼接 `bg-${color}-100` 期待扫描器执行 JS。

## 验收标准

- [ ] `npm run check` 通过，产物出现两个不同的模块类名。
- [ ] 页面模块 A/B 的 Computed color 分别为 `rgb(0, 70, 110)` 与 `rgb(120, 50, 0)`。
- [ ] `#sass-card` 的 padding 为 24px、边框色为 `rgb(0, 102, 68)`；`.sass-card strong` 已展开，不残留 `$accent` / `@use`。
- [ ] 390px 下 `#tailwind-grid` 一列；1280px 下两列；display 为 grid、gap 为 16px。
- [ ] Tab 可以到“读取计算样式”按钮，焦点可见，点击后 `#result` 与当前实际布局一致。
- [ ] 新增/修改源码后必须重新构建，不能以旧 dist 作为本次成功证据。

## 本轮执行证据与边界

核对日期：2026-11-24。实际使用现有宿主的 Vite/Tailwind 包作本地只读复用，Sass 仅装入专用 `/tmp` 环境，未修改宿主依赖；通过本实验忽略的 node_modules 链接供 Vite 解析。本轮执行了真实 `vite build` 与 `node verify.mjs`，验证了以上三种转换，不是手写编译产物。

完整执行记录见 [BUILD_EVIDENCE.md](./BUILD_EVIDENCE.md)。本地复用方式不属于可移植交付；其他机器按 `npm ci` 使用本项目锁文件。构建断言检查输出规则，不替代浏览器计算样式、键盘操作和多浏览器兼容性验证。本次不声称移动真机、多浏览器、Nuxt SSR 集成已经通过；此实验不启动后端，也不收集数据。

## 官方依据

- [Modern Web Guidance：CSS 架构](https://developer.chrome.com/docs/modern-web-guidance/guides/css/css)：先用平台能力与清晰的层叠/组织结构，再按需求引入构建抽象。
- [Vite：CSS Modules 与 CSS 预处理](https://vite.dev/guide/features.html#css-modules)：`.module.css` 导出类映射，预处理器需自行安装。
- [Sass：官方安装与 Node.js 包](https://sass-lang.com/install/)：本轮核实官方稳定版 1.108.2，选用纯 JS `sass` 包。
- [Tailwind：Vite 插件安装](https://tailwindcss.com/docs/installation/using-vite)：使用 `@tailwindcss/vite` 与 CSS import。
- [Tailwind：源码类检测](https://tailwindcss.com/docs/detecting-classes-in-source-files)：完整类名、显式 source 基准与动态拼接边界。
