# 加载边界实验：关键路径、字体/图片与缓存

前置阶段3–8，先看六份9.3操作卡。目标是观测加载边界，不用几何图片压缩比或本地首屏时长推断真实业务收益。

在本目录执行：

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm verify
# 或 pnpm serve，打开 http://127.0.0.1:4519/
```

固定Node26/pnpm11.4/Playwright1.65.1，本轮后台Chrome。支持CHROME_PATH覆盖路径；只绑定loopback，finally关闭Chrome和服务，不改浏览器设置。运行记录写artifacts/runtime.json，缓存/依赖/产物不提交。

1. 首屏布局/焦点样式内联；noncritical.css人为延迟600ms，media=print非匹配时加载，外部模块在load后切all。没有依赖inline onload；若脚本不可用，只有非关键离屏装饰缺失，正文与焦点仍可用。浏览器记录FCP和CSS responseEnd，本轮FCP先于非关键CSS；这是机制演示，不称生产优化已达标或自动critical CSS提取。
2. Roboto Latin400 WOFF2来自官方Google Fonts，21884字节，随assets/Roboto-OFL.txt和FONT-SOURCE.json保留许可证/来源。已是Google提供的Latin子集，不声称本轮运行subset工具。font-display:swap、preload as=font/type/crossorigin与CSS URL匹配；本轮一个字体资源请求、FontFace loaded。中文用系统回退，不保证Latin子集支持其他语言。
3. AVIF/WebP/PNG候选与640×240固有尺寸，固定比例LQIP背景；图片来自本仓库阶段6原创几何fixture，未修改旧文件。Chrome实际currentSrc可核对；回退链源码存在不等于本轮所有codec禁用路径都已实测。没有CDN变换服务。
4. 用户动作添加固定公开next.html的SpeculationRules prefetch建议；能力或Save-Data不满足则保留普通链接。真实浏览器验证支持探测/规则与正常导航，不断言实际预取、prerender、命中率或线上流量收益；浏览器可忽略提示。无账户/支付/副作用页面。
5. Node客户端实际读取103 informational Link再最终200，说明103协议事件。此server仍HTTP/1.1，不把Node信息事件当Chrome HTTP2/3优化结果；HTTP3和真实TLS/CDN未部署。
6. /public-data的公开缓存key包含v1/q/lang，查询顺序规范化、最多32项。请求带Cookie/Authorization（即使空头）或未知维度直接BYPASS/private,no-store；四并发公开Alice/Bob合成fixture不进入公共cache，再取公开结果不受污染。它不是认证，任意人可伪造scope；内存模型不等于真实CDN已配置。真实边缘必须在查cache前按凭据/会话策略旁路，并审所有变体。

Node4项：key/凭据边界、推测计划回退、真实cache四并发、真实103。浏览器390/1440两组：当前候选/尺寸/LQIP、字体实际加载与请求复用、FCP/CSS先后、推测规则/普通导航、无横溢出和pageerror。仅本地实验，不是真机、多浏览器、真实读屏/生产RUM或跨网络基准。
