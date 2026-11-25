# Storybook与Token实验

Node26.0.0/pnpm11.4.0；真实Storybook/vue3-vite10.6.9、Vue3.5.46、Vite8.3.8、Style Dictionary5.8.0、Playwright1.65.1。版本从官方npm registry核对，Node26满足SD>=22。

在本目录执行：

```bash
pnpm install --frozen-lockfile
pnpm tokens
pnpm typecheck
pnpm test
pnpm build
pnpm verify
# 手动故事：pnpm storybook → http://127.0.0.1:4544/
```

tokens/source.json用Style Dictionary原生legacy type/value，包含颜色别名、间距、字体、圆角与阴影；不是Figma导出或当前DTCG完整规范认证。真实生成CSS/JS/.d.ts，负例引用不存在应拒绝；生成物不提交，改源后重建，不能手改dist/tokens。

Storybook直接引用主Nuxt项目lib/src/UiButton.vue源SFC，原生button/disabled/type/slot契约与主相同；不等于验证packed dist/exports，后者由主项目执行。stories/theme.css是本故事的示范语义主题，不冒称已经与主库/Figma自动同步。Primary/Disabled有真实play断言；构建不自动保证所有play通过，因此verify实际打开iframe等待play。DarkBrand验证真实computed CSS，不只看属性。WebElement是独立Vue CustomElement CSR故事，原生宿主事件、attribute响应与焦点委派实测，不是主库新增分发、全框架/SSR证明。

build和dev既设core.disableTelemetry也通过STORYBOOK_DISABLE_TELEMETRY环境变量关闭配置前boot事件；无上传token或真实DSN。verify启动仅loopback4544静态服务/后台Chrome，390/1440模拟视口，无前台鼠标或系统安全设置修改；finally关闭服务/浏览器。CHROME_PATH可指定Chrome，本轮macOS路径；artifacts截图不提交，不当作已审批视觉金图。

policy.mjs是SemVer教学分类与有限配置值转换，不是AST codemod或发布工具。Figma/Tokens Studio插件/Git同步、Chromatic或其他SaaS上传、真实包发布、其他框架/浏览器/真机/读屏/人类试学均未执行。

所有可再生成输出统一为dist/tokens（CSS/JS/types）与dist/storybook（静态故事站），两者均由既有门禁排除，不进入正文统计、HTML资源盘点或验收来源指纹。首次克隆先tokens再typecheck/test；build自身会先tokens，verify读取dist/storybook。截图仍在已排除的artifacts。旧generated/storybook-static目录已清理。
