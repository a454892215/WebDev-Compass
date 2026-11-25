# 阶段6.3/6.5逐点编写与质量审查

日期2026-11-25；分组开始07:27:49 UTC。范围为无障碍原7点+新增6.3.8，以及SEO7点，共15点。本报告为分组证据，主审统一综合项目、契约、指纹与整体验收，不以组内文件存在代替全部通过。

## 规划与递进

新增6.3.8合理：现有目录没有明确承接200%文字、320CSSpx重排、目标尺寸与运动偏好。等级按WCAG2.2原文区分：24CSSpx最小目标/例外为AA，44CSSpx增强为AAA；交互动效2.3.3属AAA，不能把所有动效都写成AA违规。其余细节补已有条目：focus not obscured、dialog还焦、名称/描述、noindex与robots、canonical/hreflang、HTTP状态与JSONLD安全。不继续为数量造新章。

先语义/名称，再键盘/表单/视觉，工具与窄宽验收组合；SEO先抓取/渲染/索引概念，再内容、head、发现和结构化数据，最后SSR/SSG取舍。前置为阶段1原生Web、阶段3工具和阶段4Nuxt；没有要求真实Google账号或生产发布才能理解本章。

## 逐点内容核对

| 编号 | 具体机制、实验/练习与边界 |
| --- | --- |
| 6.3.1 | A/AA/AAA和范围、适用准则；正确页0规则违规与坏样本3类违规对照，不把零扫描当符合性。 |
| 6.3.2 | 原生地标/标题/列表/控件、DOM与无障碍树；role/axe检查仅工具证据，不冒称真实读屏。 |
| 6.3.3 | 信息图alt、装饰SVG、名称与描述；真实缺alt/name/label负例，aria-hidden不承担禁用。 |
| 6.3.4 | 自然Tab、-1、跳过链接、原生dialog与还焦；Chrome实测Tab/Enter/Escape，无正数tabindex。 |
| 6.3.5 | 4.5/3阈值与适用例外、非文字对比、非颜色状态；真实CSS色值比值及axe，错误有文字/描述。 |
| 6.3.6 | label/hint/error关系、提交后aria-invalid与焦点、修正后清理及成功反馈；实际操作链通过。 |
| 6.3.7 | axe4.14.1规则/版本/incomplete、受控失败与人工范围；未操作axe扩展UI，不虚报Lighthouse已运行。 |
| 6.3.8 | 320宽/200%文字局部实验、44px设计与24pxAA例外区分、reduce媒体；非浏览器zoom/真机/完整WCAG。 |
| 6.5.1 | 抓取/渲染/索引/排名分开，真实href/SSR内容/404；没有Google提交/真实抓取承诺。 |
| 6.5.2 | 主标题、主题层级、链接文字与可见内容；语义不是排名魔法。 |
| 6.5.3 | 响应式SSR/导航head、可信canonical origin、语言自指/替代URL、查询noindex，非绝对收录命令。 |
| 6.5.4 | OG与twitter协议、公开绝对图像URL；本地标签检查与真实社交平台抓取分开。 |
| 6.5.5 | sitemap公开规范URL、robots抓取协定/noindex/认证不同；不会把robots作为API授权。 |
| 6.5.6 | Schema词汇/JSON表达/富结果资格分开；script上下文转义<与恶意结束标签，数据和可见内容一致。 |
| 6.5.7 | Nuxt原始HTML/状态/head/导航，SSR/SSG范围与取舍；Next/公网部署未实装不冒充通过。 |

15份练习均有独立变体、至少2标准、明确故障与定位/修正判据。四部分映射和具体事实在stage-6-a11y-seo-points.json，两组integration-cases供主审生成综合任务；未虚构主工程已有完整读屏/搜索排名/平台发布。

## 本组实际实验

固定axe-core4.14.1、Playwright1.65.1，Node26/pnpm11.4；axe版本由官方registry实核。冻结离线安装及Node语法通过，源码经既有Prettier工具格式化为可读代码，不影响根配置。

独立a11y-lab实际5组通过：390/1440各一组（axe零违规/incomplete空、skip焦点、表单错误与恢复、dialog Escape/还焦、44px按钮、reduce、无横向溢出）；320CSSpx+根字号200%局部重排一组；缺button name/image alt/label的真实负例一组；从浏览器computed style读取的实际不透明色值在白底的WCAG亮度对比计算一组；复审时将固定色值改为真实样式输入，并重新运行5组通过，避免CSS改变而测试仍算旧常量。详见stage-6-a11y-lab-runtime.json。verify.mjs finally关闭4505与Chrome。

本组不做真实屏幕阅读器/残障用户试学、浏览器zoom UI、多浏览器或真机；自动规则及DOM焦点不是这些范围的替代。

## 共享Nuxt源码与运行证据复核

本组实际核读ContactDialog、layout、locale首页/详情、shared/utils/seo、robots/sitemap与unit/E2E源码；另读取主代理保存的build/unit/e2e日志和JSON结果。Nuxt4.7 Node SSR构建、12项unit、6项Playwright均通过；6项为两视口各2条流程，加SSR/SEO HTTP检查与320暗色RTL/文字局部放大各1条。执行者是主代理，本组核读证据，没有重复运行或冒称亲自执行主工程。

SEO7点由pending转passed：三语并发SSR、真实404、可信canonical/4个alternate、查询/preview noindex、robots真实LF、12项sitemap与PNG本地200/1200×630、Course JSONLD解析及恶意序列化往返、详情/语言导航description/canonical同步和hydration均有具体证据。每点运行事实及未单独断言的边界写入points，不把只有源码核对的所有head字段说成全面浏览器测试。

反馈已关闭：首页和详情改共享PNG OG，hint移到input前；浅色必要控件边界由#A7B4CC改#60708c。对当前源码不透明组合按sRGB计算：浅色边框/白panel5.01、边框/页面4.62；深色#7e90ae边框/panel4.80、边框/页面5.49，均超过非文字3:1。这是源颜色计算，未冒充本组新一轮computed-style浏览器测量，其他背景/状态仍须按实际需求复核。

本组15点资料与所声明局部实验范围通过。公共综合README/tasks、契约及全阶段检查由主审随后统一生成核对，不以本分组通过替代集成验收。真实屏幕阅读器、浏览器zoom UI、多浏览器/真机、Google抓取收录与分享平台抓取、SSG生产托管均未测。

## 官方依据

先检索阅读[MWG Accessibility](https://developer.chrome.com/docs/modern-web-guidance/guides/accessibility/accessibility)、[HTML](https://developer.chrome.com/docs/modern-web-guidance/guides/html/html)、[Forms](https://developer.chrome.com/docs/modern-web-guidance/guides/forms/forms)，采用语义、合理名称、原生dialog与可恢复错误；再核对[WCAG2.2 Quickref](https://www.w3.org/WAI/WCAG22/quickref/)、[目标尺寸](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)、[重排](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)、[文字放大](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html)、[动画等级](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)、[焦点不遮挡](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)、[对比度](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)、[APG Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)、[Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)、[canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)、[多语言](https://developers.google.com/search/docs/specialty/international/localized-versions)、[robots](https://developers.google.com/search/docs/crawling-indexing/robots/intro)、[结构化数据](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)、[Schema Course](https://schema.org/Course)、[OG协议](https://ogp.me/)、[Nuxt Head](https://nuxt.com/docs/4.x/getting-started/seo-meta)。没有把训练知识冒充本轮读取。
