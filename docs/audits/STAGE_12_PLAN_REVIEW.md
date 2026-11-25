# 阶段12规划复核

2026-11-25。24点保留：测试策略8、专项4、设计系统7、组件库5。按总则先读地图/学习路径、核对前置阶段3/4/6/7，9–11按性能/隐私/事故需求回读；不是每个产品都需先建组件平台。

补充真实缺口到原条目：风险/退出条件而非固定覆盖率；测试数据清理与worker隔离；视觉基线审批/环境；flaky首错/责任；SSR有效HTML/重复请求/双fixture；状态×验证层级；RTL/pseudo与真机/多引擎区别；token格式/别名/主题；组件slot/原生语义；真实tgz、types、CSS与peer/external；发布意图与实际版本分开。没有需要重复新增ID的明显目标缺口。

先检索并阅读MWG [accessibility](https://developer.chrome.com/docs/modern-web-guidance/guides/accessibility/accessibility)、[HTML](https://developer.chrome.com/docs/modern-web-guidance/guides/html/html)、[security](https://developer.chrome.com/docs/modern-web-guidance/guides/security/security)，采用原生button/dialog、标签与键盘、自动检查不替代人工及合成数据边界。设计组另读WebComponents/accessible-WebComponents正文。

再核Vue测试/attrs/SSR、Nuxt数据、Playwright、Pact/Stryker/Chromatic、Storybook/StyleDictionary/TokensStudio、Vite library mode/npm包及Changesets当前官方。两处旧Changesets GitHub路径初访失败，改已读changesets.dev现行站，CLI3.0.3与Node要求实核；init为交互，临时脚本确定配置后运行version，不发布。Pact/Stryker等未安装不能被自制实验冒名。

主Nuxt4.7/Vue3.5.46/TS6.0.3与Vite8.3.8沿既有固定基线；小型Vue库+宿主workspace用于验证产物边界，不扩成通用生产基座。Storybook直接source文档/交互、主宿主和tgz实际dist消费分别取证；SD是本地合成token转换，Figma不接真实账户。

必要实测集中本地Node/后台Chrome/构建/包消费；Docker/Testcontainers/真机/新浏览器/远程CI/发布不在本轮引入。规范与实验采取最小充分验证，未测项各点明确。R01–R09逐点审查/集成，不以脚本、测试数或AI审阅保证个人掌握。
