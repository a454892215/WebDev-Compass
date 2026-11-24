# 本轮真实构建证据

时间：2026-11-24 14:35 UTC。执行环境：macOS、Node.js 26.0.0。

依赖：Vite 8.3.8、Sass 1.108.2（dart2js 3.13.7）、Tailwind CSS 与 @tailwindcss/vite 4.3.5。Sass 官方安装页面已核实该稳定版本。锁文件由本项目 package.json 在独立临时目录生成；未执行一次全新 `npm ci` 安装，实际构建复用本机已有 Vite/Tailwind 包及临时安装 Sass。

执行本实验 `npm run check`，退出码 0。该命令执行真实 `vite build` 后运行 `node verify.mjs`，关键结果：

```text
vite v8.3.8 building client environment for production...
8 modules transformed.
dist/index.html                  1.79 kB
dist/assets/index-BwE68-5t.css     5.53 kB
dist/assets/index-Bh9ZlkcN.js      1.46 kB

result: PASS
modules: ._card_17j7l_1, ._card_1juof_1
sassPadding: 24px
tailwind: grid, sm:grid-cols-2
```

独立断言检查：两个不同 CSS Modules 类、JS 引用转换类、Sass 函数计算和嵌套选择器、Tailwind display/grid 两列 utility、产物未残留 Sass 语法。

实际排错：初次仅扫描 src 时，构建仍成功，但断言因缺少响应式两列 utility 失败。根 index.html 未纳入 source 范围；修正为源 CSS 相对的上一级后通过。证明“构建退出码 0”不足以确认扫描配置正确。

本记录只证明这次构建和产物断言。浏览器计算样式和键盘验收由主任务另行执行，不把产物正则断言写成多浏览器或真机通过。无新启动的构建/开发常驻服务；生成产物和 node_modules 被本目录 .gitignore 排除。
