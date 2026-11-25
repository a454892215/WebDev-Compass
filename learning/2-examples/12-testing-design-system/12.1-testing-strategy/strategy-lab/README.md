# 测试策略实验

Node26.0.0/pnpm11.4.0，固定@playwright/test1.65.1。本轮macOS Chrome158，默认本机Chrome或CHROME_PATH指定；只有127.0.0.1:4542及合成数据。无第三方请求、SaaS凭据和容器需求。

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm verify
pnpm shard:1
pnpm shard:2
```

- test：4项Node，包括真实HTTP provider→消费者decoder、类型/缺失负例、受控手工mutation的弱/强断言与重试类别。
- verify：后台Chrome在390/1440固定locale/DPR/字体/动画；只读baselines PNG，正常匹配、padding变化必须被检测；点击后真实异步状态通过自动重试等待。
- shard:1/shard:2：fullyParallel、每片2workers；四项API-only测试，当前两片在同机顺序执行，不冒称多机/浏览器旅程。每项request fixture各自Cookie context，无共享模块currentUser。
- STRATEGY.md：可复用的风险/证据/退出条件约定；不以表格本身证明真实产品已覆盖。

视觉基线是本轮macOS/Chrome158/Arial受控卡片。作者已目视正常与padding变化图，verify不会自动覆盖。需要变更时在隔离副本执行pnpm baseline建立候选，检查差异和理由后再提交；不要在CI每次先baseline。PNG字节比较比像素阈值更严格，会受平台/浏览器/字体影响；真实项目可按官方Playwright toHaveScreenshot或选用视觉平台，不把本例叫Chromatic/Percy通过。artifacts只存本地actual/changed，不提交。

契约是本地schema/decoder实验，不是Pact SDK或Broker；mutation为受控手工变体，不是Stryker引擎。Docker daemon缺失时Testcontainers只官方观察，不重装Colima。原始HTML/hydration/双用户隔离由主Nuxt真正专项提供，本静态卡片不能替代。

[本组章节](../README.md)。server把/README.md作为text/plain提供，未知路径404；finally关闭Chrome/服务。无生产后端、跨浏览器、屏幕阅读器、真机或真实学习者试学证据。
