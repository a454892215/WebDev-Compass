# 阶段4.4主题与UI实验

四个知识点共享同一真实工程：Tailwind 4.3.5 + 官方CLI、本地CSS令牌、本地SVG、系统浅深主题与显式覆盖。这里不是Nuxt工程，不做SSR或hydration运行；它展示可以移入Vue/Nuxt的样式与语义机制。

## 安装与运行

```bash
# 进入本目录
pnpm install --frozen-lockfile
pnpm build
pnpm preview
# http://127.0.0.1:4306
```

实际环境Node26.0.0、pnpm11.4.0；Node约束为24主线24.15+或26+。固定依赖和锁文件保留。构建把src/theme.css真实编译到dist/theme.css，并复制HTML/JS/SVG；dist忽略提交，不能直接打开src/index.html便声称Tailwind已经运行。

pnpm11专有设置在pnpm-workspace.yaml。此隔离实验显式ignoreScripts:true，不运行依赖生命周期脚本；本机平台的可选预编译包已足够执行CLI与验证。首次默认安装曾报告@parcel/watcher脚本未获准，随后显式策略下冻结安装和真实构建通过。此结论不保证所有平台无需原生构建，也不是建议给所有生产项目全局关闭脚本。

## 机制与检查

- Tailwind生成真实grid/断点工具类与品牌色；@source明确实验HTML来源。完整类名能被扫描，任意运行时字符串不自动生成规则。
- 颜色/边框/间距使用语义令牌；共享令牌不强制桌面与手机布局一致。
- 装饰SVG、独立信息图、纯图标按钮分别命名。外部info.svg使用在浅深背景都可辨识的固定中性色，不能继承宿主currentColor；内联图标可跟随文字色。
- 默认meta与CSS支持系统浅深主题；手动选择同步data-theme、令牌和color-scheme，恢复system删除覆盖。本例不持久化；关闭JS仍能跟随系统，但手动交互增强不可用。
- 页面没有服务端、用户秘密、外部图标请求或localStorage；Nuxt持久化主题的SSR一致性属于独立练习。

## 自动验证

先停止手动preview，再运行：

```bash
pnpm verify
```

verify自己启动loopback4306并在finally关闭。默认复用macOS已安装Chrome；其他环境用CHROME_PATH指向可用Chrome，或按Playwright官方文档准备Chromium。不会自动下载浏览器。

本轮后台Chrome验证390/1440两视口的真实computed布局、系统浅深、手动覆盖/重置、名称/装饰图标、收藏状态和无横向溢出/pageerror；另有无JS深色回退，共3组。聚焦检查为DOM焦点与可见样式，并非屏幕阅读器或全键盘交互认证。无真机、多浏览器、生产兼容矩阵或性能基准结论。

参考：[Tailwind CLI](https://tailwindcss.com/docs/installation/tailwind-cli)、[MWG Dark mode](https://developer.chrome.com/docs/modern-web-guidance/guides/visual-design/dark-mode)、[Dark mode toggle](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-components/dark-mode-toggle)。核对日期2026-11-24。
