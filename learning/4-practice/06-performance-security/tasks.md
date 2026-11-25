# 阶段6逐知识点综合任务

先运行[多语言课程目录](./README.md)，再在副本完成变体。43项分别指向已有Nuxt能力、独立lab或明确新增扩展；任务不是已经实现的声明。保留操作、原始结果、解释和修复证据。

<a id="p-6-1-1-1"></a>

## 6.1.1.1 Core Web Vitals：场数据与实验数据

在Nuxt资料目录副本写测量计划并读取现有资源/交互观测；不把主工程一次运行或本lab审计当生产CWV。

验收：

- [ ] LCP/INP/CLS名称、单位、良好阈值和p75口径准确，不把TBT叫INP。
- [ ] 记录环境/操作/原始条目与限制，未用单次Lighthouse分数证明生产达标。

[理论](../../1-notes/06-performance-security/6.1-performance/6.1.1.1.core-web-vitals.md) · [示例](../../2-examples/06-performance-security/6.1-performance/6.1.1.1.core-web-vitals-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.1-performance/6.1.1.1.core-web-vitals.md)

<a id="p-6-1-1-2"></a>

## 6.1.1.2 网络：压缩、请求成本与HTTP/2

对Nuxt产物/托管计划选择文本压缩和缓存变体；真实编码实验在独立lab，主工程未部署HTTP/2/CDN。

验收：

- [ ] 解码后与原文一致，Content-Encoding/Vary正确，区分Fetch解码长度和原始传输字节。
- [ ] 是否启用压缩/合包有具体资源和缓存依据，HTTP/2未测就标明。

[理论](../../1-notes/06-performance-security/6.1-performance/6.1.1.2.gzip-brotli-http.md) · [示例](../../2-examples/06-performance-security/6.1-performance/6.1.1.2.gzip-brotli-http-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.1-performance/6.1.1.2.gzip-brotli-http.md)

<a id="p-6-1-1-3"></a>

## 6.1.1.3 图片：格式、尺寸、srcset与加载时机

核对主Nuxt目录现有图片的尺寸/候选/优先级，按业务素材做副本对照，不拿lab几何图压缩比当业务收益。

验收：

- [ ] 候选文件真实可解码、currentSrc属于声明集合，下载前后比例稳定。
- [ ] 首屏/离屏策略按位置区分，sizes反映实际CSS，质量与无障碍没有被忽略。

[理论](../../1-notes/06-performance-security/6.1-performance/6.1.1.3.webp-avif.md) · [示例](../../2-examples/06-performance-security/6.1-performance/6.1.1.3.webp-avif-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.1-performance/6.1.1.3.webp-avif.md)

<a id="p-6-1-1-4"></a>

## 6.1.1.4 关键CSS、非关键样式与闪烁边界

分析Nuxt真实HTML/样式产物并在副本拆一处非关键样式；主工程没有宣称额外关键CSS自动提取。

验收：

- [ ] 关键内容与焦点样式没有晚到，样式分离有实际依赖依据。
- [ ] 记录HTML增量/缓存取舍，CSP或无JS条件不会使主内容无样式。

[理论](../../1-notes/06-performance-security/6.1-performance/6.1.1.4.css-css.md) · [示例](../../2-examples/06-performance-security/6.1-performance/6.1.1.4.css-css-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.1-performance/6.1.1.4.css-css.md)

<a id="p-6-1-1-5"></a>

## 6.1.1.5 JS：动态加载、摇树与产物证据

追踪主Nuxt按需统计与Worker产物；在副本新增一个合理边界并验证失败，不为了练习把每个函数都切块。

验收：

- [ ] 动态资产真实存在且首次消费时加载，失败有可恢复路径。
- [ ] 副作用声明正确，优化后功能不变，不把map中的源码字符串当运行JS。

[理论](../../1-notes/06-performance-security/6.1-performance/6.1.1.5.js-import-tree-shaking-bundle.md) · [示例](../../2-examples/06-performance-security/6.1-performance/6.1.1.5.js-import-tree-shaking-bundle-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.1-performance/6.1.1.5.js-import-tree-shaking-bundle.md)

<a id="p-6-1-1-6"></a>

## 6.1.1.6 第三方脚本：加载时机、隐私与降级

主目录不接外网脚本；副本对一个可选能力设计动作加载与失败降级，实际时序在lab本地替身观察。

验收：

- [ ] 动作前没有模块请求或数据上报，重复点击不重复初始化外部实例。
- [ ] 拒绝或失败时核心页面可用，隐私/来源边界有明确说明。

[理论](../../1-notes/06-performance-security/6.1-performance/6.1.1.6.item-6-1-1-6.md) · [示例](../../2-examples/06-performance-security/6.1-performance/6.1.1.6.item-6-1-1-6-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.1-performance/6.1.1.6.item-6-1-1-6.md)

<a id="p-6-1-1-7"></a>

## 6.1.1.7 资源提示：preload、preconnect与prefetch

核对主Nuxt真实head提示和消费资源，不额外重复框架已有preload；公网连接取舍作为设计观察。

验收：

- [ ] 提示URL/候选、as/type/CORS与消费一致，没有明显重复下载。
- [ ] 只提示关键/高概率资源，注明浏览器可忽略和流量取舍。

[理论](../../1-notes/06-performance-security/6.1-performance/6.1.1.7.item-6-1-1-7.md) · [示例](../../2-examples/06-performance-security/6.1-performance/6.1.1.7.item-6-1-1-7-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.1-performance/6.1.1.7.item-6-1-1-7.md)

<a id="p-6-1-1-8"></a>

## 6.1.1.8 CDN：缓存键、版本与部署边界

为公开Nuxt目录输出CDN部署profile与缓存键/回滚设计；本轮未部署CDN，不能报告加速比例。

验收：

- [ ] 缓存对象、key、失效/保留旧资源和身份边界具体。
- [ ] 没有把本地响应或HTTP/1.1实验当CDN/HTTP2上线验收。

[理论](../../1-notes/06-performance-security/6.1-performance/6.1.1.8.cdn.md) · [示例](../../2-examples/06-performance-security/6.1-performance/6.1.1.8.cdn-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.1-performance/6.1.1.8.cdn.md)

<a id="p-6-1-2-1"></a>

## 6.1.2.1 布局读写：定位强制布局与批处理

为Nuxt副本一个实际DOM/测量操作做同条件对照，勿为没有证据的组件批量加will-change。

验收：

- [ ] 读取/写入顺序和影响元素清楚，改后布局结果一致。
- [ ] 有可复现操作与环境，未用一次耗时夸大普遍收益。

[理论](../../1-notes/06-performance-security/6.1-performance/6.1.2.1.item-6-1-2-1.md) · [示例](../../2-examples/06-performance-security/6.1-performance/6.1.2.1.item-6-1-2-1-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.1-performance/6.1.2.1.item-6-1-2-1.md)

<a id="p-6-1-2-2"></a>

## 6.1.2.2 虚拟列表：DOM窗口与可访问内容

虚拟列表只在独立lab；评估Nuxt目录规模是否真的需要，若副本采用先补阅读/焦点/打印策略。

验收：

- [ ] DOM窗口数量受限，滚动时文本与数据索引对应，完整模式可切回。
- [ ] 说明窗口外内容不可访问的影响，焦点不无故丢失，动态行高未支持就明示。

[理论](../../1-notes/06-performance-security/6.1-performance/6.1.2.2.item-6-1-2-2.md) · [示例](../../2-examples/06-performance-security/6.1-performance/6.1.2.2.item-6-1-2-2-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.1-performance/6.1.2.2.item-6-1-2-2.md)

<a id="p-6-1-2-3"></a>

## 6.1.2.3 防抖与节流：频率、尾调用与清理

在Nuxt副本选择一处高频副作用，不延迟原生输入本身；用可控时钟/迟到响应分别验频率与正确性。

验收：

- [ ] 同一时间窗口实际调用次数和最后参数可核验，取消后不回写。
- [ ] 输入/键盘立即可用，清理发生在所属生命周期，未声称自动消除网络竞态。

[理论](../../1-notes/06-performance-security/6.1-performance/6.1.2.3.item-6-1-2-3.md) · [示例](../../2-examples/06-performance-security/6.1-performance/6.1.2.3.item-6-1-2-3-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.1-performance/6.1.2.3.item-6-1-2-3.md)

<a id="p-6-1-2-4"></a>

## 6.1.2.4 Web Worker：移出主线程与协议清理

核对主Nuxt已有Worker的输入/结果/生命周期；在副本加一次失败与过时任务保护，而不虚构已有任务池。

验收：

- [ ] 同一输入结果一致，任务返回与当前请求对应，错误可恢复。
- [ ] Worker完成/取消/离开时释放；没有DOM调用或把私有数据无意发给第三方。

[理论](../../1-notes/06-performance-security/6.1-performance/6.1.2.4.web-worker.md) · [示例](../../2-examples/06-performance-security/6.1-performance/6.1.2.4.web-worker-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.1-performance/6.1.2.4.web-worker.md)

<a id="p-6-1-2-5"></a>

## 6.1.2.5 Vue/React性能：先测量再选择机制

在Nuxt副本分析已有computed派生与数据依赖，选择一个真实热点再改；React只做机制对照不加到宿主。

验收：

- [ ] 改造前后功能与依赖关系一致，没有因缓存漏依赖返回旧值。
- [ ] 解释为什么选择Vue机制，不把React的内联对象/memo规则当Vue强制规范。

[理论](../../1-notes/06-performance-security/6.1-performance/6.1.2.5.react-vue-memo-key.md) · [示例](../../2-examples/06-performance-security/6.1-performance/6.1.2.5.react-vue-memo-key-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.1-performance/6.1.2.5.react-vue-memo-key.md)

<a id="p-6-1-2-6"></a>

## 6.1.2.6 Performance API与Lighthouse：可复核测量

在Nuxt副本做一处受控改进并保存本地测量证据，不把lab分数升级为生产指标承诺。

验收：

- [ ] 指标单位、测量边界、环境和未测项清楚，数据不是手填预期。
- [ ] observer退出时断开，审计只访问自己的本地服务，分数不当认证。

[理论](../../1-notes/06-performance-security/6.1-performance/6.1.2.6.performance-api-lighthouse.md) · [示例](../../2-examples/06-performance-security/6.1-performance/6.1.2.6.performance-api-lighthouse-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.1-performance/6.1.2.6.performance-api-lighthouse.md)

<a id="p-6-1-3-1"></a>

## 6.1.3.1 缓存层：HTTP、内存、bfcache与Cache API

分析主Nuxt payload/key与HTTP头，和独立SW/bfcache分开；未来加入身份数据时不得套公开缓存。

验收：

- [ ] no-cache与no-store、HTTP缓存与bfcache/Cache API概念分清。
- [ ] 实测命中有可核对证据，不因看不到请求就认定一定来自某一层。

[理论](../../1-notes/06-performance-security/6.1-performance/6.1.3.1.item-6-1-3-1.md) · [示例](../../2-examples/06-performance-security/6.1-performance/6.1.3.1.item-6-1-3-1-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.1-performance/6.1.3.1.item-6-1-3-1.md)

<a id="p-6-1-3-2"></a>

## 6.1.3.2 Service Worker：公开白名单、离线与更新

主工程没有SW；在独立lab完成离线/版本任务，再决定Nuxt公开目录是否需要，先排除身份与API范围。

验收：

- [ ] 缓存仅明确公开GET白名单；错误/未命中回退有状态，不缓存私有数据。
- [ ] 更新/注销只影响自己前缀与scope，离线/版本变化均真实观察。

[理论](../../1-notes/06-performance-security/6.1-performance/6.1.3.2.service-worker-cache-first-network.md) · [示例](../../2-examples/06-performance-security/6.1-performance/6.1.3.2.service-worker-cache-first-network-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.1-performance/6.1.3.2.service-worker-cache-first-network.md)

<a id="p-6-1-3-3"></a>

## 6.1.3.3 Nuxt数据缓存与HTTP响应缓存的失效

核对主工程实际useFetch/useAsyncData key与HTTP缓存头；如果副本加写入/身份，先补失效和用户隔离，不虚构原有登录功能。

验收：

- [ ] 同key选项一致，身份/条件变化不复用错误用户或旧查询数据。
- [ ] 明确刷新/清理的是哪一层，不靠禁用所有缓存掩盖模型错误。

[理论](../../1-notes/06-performance-security/6.1-performance/6.1.3.3.react-query-http.md) · [示例](../../2-examples/06-performance-security/6.1-performance/6.1.3.3.react-query-http-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.1-performance/6.1.3.3.react-query-http.md)

<a id="p-6-2-1"></a>

## 6.2.1 XSS：按输出上下文防护，而非依赖HttpOnly

已有Nuxt标题/表单文字插值和JSON-LD序列化边界；在隔离安全lab验证净化与CSP，不把攻击fixture搬到默认课程页。

验收：

- [ ] 恶意形状标题只作为文本；富文本只留下明确允许内容，事件属性/危险URL不能执行。
- [ ] 能分别解释净化、CSP和HttpOnly的作用，没有声称其中任意一个单独解决全部XSS。

[理论](../../1-notes/06-performance-security/6.2-web-security/6.2.1.xss.md) · [示例](../../2-examples/06-performance-security/6.2-web-security/6.2.1.xss-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.2-web-security/6.2.1.xss.md)

<a id="p-6-2-2"></a>

## 6.2.2 CSRF：凭据自动携带、Origin与会话绑定Token

公开课程主项目没有认证写操作；本点在独立lab验证CSRF，在阶段5会话项目对照已有真实拒绝路径，新增写接口属于副本扩展。

验收：

- [ ] 跨站/缺token的变更被服务端拒绝，失败后业务计数未变。
- [ ] 能指出SameSite/HttpOnly/CORS的不同作用，不把响应不可读当请求未发送。

[理论](../../1-notes/06-performance-security/6.2-web-security/6.2.2.csrf.md) · [示例](../../2-examples/06-performance-security/6.2-web-security/6.2.2.csrf-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.2-web-security/6.2.2.csrf.md)

<a id="p-6-2-3"></a>

## 6.2.3 点击劫持：frame-ancestors与嵌入需求

核对Nuxt主响应的frame-ancestors子策略，并在独立lab用真实父iframe检验拒绝/允许对照；主目录不需要第三方嵌入。

验收：

- [ ] 默认保护页无法在未授权父源内执行，正常顶层访问可用。
- [ ] 能区分frame-src与frame-ancestors，未用meta冒充生效响应头。

[理论](../../1-notes/06-performance-security/6.2-web-security/6.2.3.item-6-2-3.md) · [示例](../../2-examples/06-performance-security/6.2-web-security/6.2.3.item-6-2-3-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.2-web-security/6.2.3.item-6-2-3.md)

<a id="p-6-2-4"></a>

## 6.2.4 前端秘密与Source Map：构建、发布和读取边界

主项目按公开目录配置和资产检查，独立lab演示hidden map；不为证明扫描而写入真实密钥。

验收：

- [ ] 私有合成标记不进入公开产物，公开标签可以在客户端看到。
- [ ] 能核实map是否生成/发布/可读，不把hidden或压缩当秘密保护。

[理论](../../1-notes/06-performance-security/6.2-web-security/6.2.4.source-map.md) · [示例](../../2-examples/06-performance-security/6.2-web-security/6.2.4.source-map-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.2-web-security/6.2.4.source-map.md)

<a id="p-6-2-5"></a>

## 6.2.5 依赖安全：审计快照、锁文件与升级判断

核对Nuxt主工程锁与部署依赖范围；本独立lab的生产依赖快照不能代替Nuxt全树审计，新增依赖需按其风险另验。

验收：

- [ ] 记录审计日期、范围和服务是否成功；无法查询不伪报0。
- [ ] 处置解释修复版本/兼容风险和必要回归，不盲目强制升级或把锁文件当安全认证。

[理论](../../1-notes/06-performance-security/6.2-web-security/6.2.5.npm-audit.md) · [示例](../../2-examples/06-performance-security/6.2-web-security/6.2.5.npm-audit-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.2-web-security/6.2.5.npm-audit.md)

<a id="p-6-2-6"></a>

## 6.2.6 CORS错误配置：凭据读取与来源白名单

Nuxt主目录保持同源公开API；跨源误配用独立lab的合成私有值验证，不引入真实账号数据或外网攻击。

验收：

- [ ] 不可信来源无法读取受保护响应；允许来源仍可正常运行。
- [ ] 不把CORS当认证/CSRF，不把dev代理的成功当生产部署证明。

[理论](../../1-notes/06-performance-security/6.2-web-security/6.2.6.cors.md) · [示例](../../2-examples/06-performance-security/6.2-web-security/6.2.6.cors-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.2-web-security/6.2.6.cors.md)

<a id="p-6-2-7"></a>

## 6.2.7 移动经验迁移：Web、原生UI与WebView脚本边界

对Nuxt iframe/dialog/外链方案画权限边界；原生WebView集成不在主项目，明确作为迁移分析而非已实现能力。

验收：

- [ ] 每项类比都指出平台差异和权限边界，没有宣称DOM与原生控件等价。
- [ ] 没有让任意页面/消息执行原生能力；未做真机明确写未测。

[理论](../../1-notes/06-performance-security/6.2-web-security/6.2.7.web-xss-rn-webview.md) · [示例](../../2-examples/06-performance-security/6.2-web-security/6.2.7.web-xss-rn-webview-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.2-web-security/6.2.7.web-xss-rn-webview.md)

<a id="p-6-3-1"></a>

## 6.3.1 WCAG 2.2：等级、范围与验收证据

为Nuxt目录的列表、详情、dialog与错误反馈建立一张小范围验收表，记录自动、键盘、视觉与未测证据；不要求照抄所有WCAG条款。

验收：

- [ ] 能区分A/AA/AAA、适用范围与检测覆盖，不用分数替代符合性。
- [ ] 至少一种动态失败状态有实际操作证据，自动无法证明的条目标明人工/辅助技术待验。

[理论](../../1-notes/06-performance-security/6.3-a11y/6.3.1.wcag-a-aa.md) · [示例](../../2-examples/06-performance-security/6.3-a11y/6.3.1.wcag-a-aa-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.3-a11y/6.3.1.wcag-a-aa.md)

<a id="p-6-3-2"></a>

## 6.3.2 语义HTML、无障碍树与读屏观察边界

在Nuxt副本找到一个无语义可点击容器，改成原生button或正确链接；用键盘与role/name确认，不只看样式。

验收：

- [ ] 页面有明确主内容和标题层级，重复导航有合适名称。
- [ ] 新增操作能用键盘触发，工具识别正确角色/名称；未实测读屏时不写“读屏通过”。

[理论](../../1-notes/06-performance-security/6.3-a11y/6.3.2.html.md) · [示例](../../2-examples/06-performance-security/6.3-a11y/6.3.2.html-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.3-a11y/6.3.2.html.md)

<a id="p-6-3-3"></a>

## 6.3.3 替代文本、可访问名称和ARIA的正确边界

为Nuxt课程图和图标分别判断信息/装饰用途，写最短有效替代文本并审查按钮名称；不要为避免报错给所有图片同一alt。

验收：

- [ ] 信息图含任务相关等价描述，装饰图不会制造重复名称。
- [ ] 所有可操作图标/按钮有准确名称，无aria-hidden下仍可聚焦控件。

[理论](../../1-notes/06-performance-security/6.3-a11y/6.3.3.alt.md) · [示例](../../2-examples/06-performance-security/6.3-a11y/6.3.3.alt-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.3-a11y/6.3.3.alt.md)

<a id="p-6-3-4"></a>

## 6.3.4 键盘、焦点顺序、跳过链接与dialog还焦

在Nuxt课程dialog验证从触发、初始焦点、正反Tab、Escape到还焦的完整路径，并检查窄屏/放大后焦点不被遮挡。

验收：

- [ ] 键盘可到达和操作全部关键功能，无正tabindex或无意焦点陷阱。
- [ ] dialog关闭还焦合理、skip可用；可见焦点与遮挡情况有实际证据。

[理论](../../1-notes/06-performance-security/6.3-a11y/6.3.4.tabindex.md) · [示例](../../2-examples/06-performance-security/6.3-a11y/6.3.4.tabindex-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.3-a11y/6.3.4.tabindex.md)

<a id="p-6-3-5"></a>

## 6.3.5 对比度、非颜色线索与状态可理解性

检查Nuxt页面正常/错误/焦点/选中状态的颜色；记录至少两组实际对比结果并补一种非颜色线索。

验收：

- [ ] 适用文字和必要UI线索的实际颜色通过目标阈值或说明规范例外。
- [ ] 把页面转灰或忽略颜色时，错误/选择仍能由文字或结构理解。

[理论](../../1-notes/06-performance-security/6.3-a11y/6.3.5.item-6-3-5.md) · [示例](../../2-examples/06-performance-security/6.3-a11y/6.3.5.item-6-3-5-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.3-a11y/6.3.5.item-6-3-5.md)

<a id="p-6-3-6"></a>

## 6.3.6 表单标签、描述、错误反馈与焦点恢复

在Nuxt表单完成一次无效提交→定位字段→修正→成功，保存标签、描述、焦点和结果的证据；不要只断言某段红字存在。

验收：

- [ ] 错误具体、与字段关联，提交失败后可从键盘继续修复。
- [ ] 修正后旧错误和aria-invalid清除；成功反馈不抢走无关焦点。

[理论](../../1-notes/06-performance-security/6.3-a11y/6.3.6.label.md) · [示例](../../2-examples/06-performance-security/6.3-a11y/6.3.6.label-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.3-a11y/6.3.6.label.md)

<a id="p-6-3-7"></a>

## 6.3.7 axe与Lighthouse：自动发现、人工验证和回归边界

在Nuxt当前页面/表单错误/dialog状态分别保存axe结果，保留incomplete清单并用键盘补验；可选运行Lighthouse，但单独记录版本和范围。

验收：

- [ ] 坏样本或受控缺陷能使检查失败，修复后相同范围恢复。
- [ ] 报告明确规则/版本/状态与人工未测项，不用零违规宣称完整WCAG符合。

[理论](../../1-notes/06-performance-security/6.3-a11y/6.3.7.axe-devtools-lighthouse-a11y.md) · [示例](../../2-examples/06-performance-security/6.3-a11y/6.3.7.axe-devtools-lighthouse-a11y-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.3-a11y/6.3.7.axe-devtools-lighthouse-a11y.md)

<a id="p-6-3-8"></a>

## 6.3.8 缩放、重排、目标尺寸与运动偏好

对Nuxt目录在320CSSpx、200%文字、长翻译/RTL与reduce模式逐项检查；记录必要二维滚动例外及目标间距，不只存截图。

验收：

- [ ] 关键内容/操作不因受控文字放大或窄宽消失，溢出有实际测量和可解释例外。
- [ ] 触控目标/间距符合选定适用标准；reduce模式取消非必要动效，等级与证据准确。

[理论](../../1-notes/06-performance-security/6.3-a11y/6.3.8.reflow-target-preferences.md) · [示例](../../2-examples/06-performance-security/6.3-a11y/6.3.8.reflow-target-preferences-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.3-a11y/6.3.8.reflow-target-preferences.md)

<a id="p-6-4-1"></a>

## 6.4.1 文案管理：语义键、参数、复数与回退

在已有三语Nuxt目录补一个参数/数量消息与回退用例；不改变默认阿语中性标签却声称已经覆盖完整阿语语法。

验收：

- [ ] 参数位置由消息决定，0/1/多与目标语言规则匹配。
- [ ] 缺项与不支持locale有明确结果，输入参数按文本安全输出。

[理论](../../1-notes/06-performance-security/6.4-i18n/6.4.1.item-6-4-1.md) · [示例](../../2-examples/06-performance-security/6.4-i18n/6.4.1.item-6-4-1-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.4-i18n/6.4.1.item-6-4-1.md)

<a id="p-6-4-2"></a>

## 6.4.2 Vue-i18n与Nuxt：应用实例、URL语言和SSR一致

核对Nuxt主插件每请求实例、三语路径与中间件顺序；独立lab用于消息API，SSR真实证明以主项目记录为准。

验收：

- [ ] 不同SSR请求的语言/payload不串，导航后消息与lang/dir一致。
- [ ] 初始化不依赖浏览器专属值造成hydration差异，同一源码不保存进程级用户locale。

[理论](../../1-notes/06-performance-security/6.4-i18n/6.4.2.i18next.md) · [示例](../../2-examples/06-performance-security/6.4-i18n/6.4.2.i18next-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.4-i18n/6.4.2.i18next.md)

<a id="p-6-4-3"></a>

## 6.4.3 Intl：显式locale、时区、日历与货币

核对主目录日期UTC/gregory和价格USD明确配置；副本比较另一时区但不要改变原始课程时间/金额。

验收：

- [ ] 服务器/浏览器用相同locale与timeZone，输出表达同一个期望日期。
- [ ] 格式化不改变数值/币种含义；测试不依赖不必要的跨引擎标点完全一致。

[理论](../../1-notes/06-performance-security/6.4-i18n/6.4.3.intl.md) · [示例](../../2-examples/06-performance-security/6.4-i18n/6.4.3.intl-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.4-i18n/6.4.3.intl.md)

<a id="p-6-4-4"></a>

## 6.4.4 RTL：方向语义、逻辑属性与混排

主三语Nuxt已用html dir/逻辑属性，副本核对混排与组件；独立lab盒子断言不是完整RTL语言/辅助技术认证。

验收：

- [ ] RTL/LTR直接访问和导航都保持正确方向，无整页镜像或字符反转。
- [ ] 长文案与混排不溢出，DOM/焦点顺序仍可解释；未做辅助技术验证如实记录。

[理论](../../1-notes/06-performance-security/6.4-i18n/6.4.4.rtl.md) · [示例](../../2-examples/06-performance-security/6.4-i18n/6.4.4.rtl-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.4-i18n/6.4.4.rtl.md)

<a id="p-6-5-1"></a>

## 6.5.1 抓取、渲染、索引与SPA内容可发现性

为Nuxt目录列出首页→课程的可发现链接，并比较原始HTML与客户端导航；补一个未知slug与错误接口场景。

验收：

- [ ] 无需点击运行JS即可在SSR响应找到关键公开内容和href。
- [ ] 未知页面返回真实404；抓取/渲染/索引/排名概念和未测范围分清。

[理论](../../1-notes/06-performance-security/6.5-seo/6.5.1.spa-seo.md) · [示例](../../2-examples/06-performance-security/6.5-seo/6.5.1.spa-seo-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.5-seo/6.5.1.spa-seo.md)

<a id="p-6-5-2"></a>

## 6.5.2 内容语义、标题层级与搜索可理解结构

为课程详情整理主标题/目标/前置/目录层级，把“点击这里”改成明确目标文案；从SSR和DOM两侧核对。

验收：

- [ ] 标题与可见内容主题一致，层级不只是视觉字号。
- [ ] 内部链接文字可理解，alt不堆关键词；语义修改没有破坏键盘/焦点。

[理论](../../1-notes/06-performance-security/6.5-seo/6.5.2.html.md) · [示例](../../2-examples/06-performance-security/6.5-seo/6.5.2.html-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.5-seo/6.5.2.html.md)

<a id="p-6-5-3"></a>

## 6.5.3 title、description、canonical与多语言对应URL

对三种locale的课程详情核对自指canonical、互返hreflang、查询页noindex，并在导航后检查无陈旧标题/描述。

验收：

- [ ] SSR和客户端导航的title/description与当前页面一致。
- [ ] canonical来自可信基址，语言映射正确且不混用查询；noindex与robots不互相阻断。

[理论](../../1-notes/06-performance-security/6.5-seo/6.5.3.meta-title-description-canonical.md) · [示例](../../2-examples/06-performance-security/6.5-seo/6.5.3.meta-title-description-canonical-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.5-seo/6.5.3.meta-title-description-canonical.md)

<a id="p-6-5-4"></a>

## 6.5.4 Open Graph与Twitter Card：分享元信息和验证边界

为课程详情配置一致的分享标题/摘要/图片，列出将来公网验证步骤，区分本地源码检查与真实消费者结果。

验收：

- [ ] 当前页面SSR标签与可信绝对URL正确，图片说明/尺寸/资源路径可核对。
- [ ] 未发布域名/未调用平台调试时不写“分享预览通过”，不向URL填凭证。

[理论](../../1-notes/06-performance-security/6.5-seo/6.5.4.open-graph-twitter-card.md) · [示例](../../2-examples/06-performance-security/6.5-seo/6.5.4.open-graph-twitter-card-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.5-seo/6.5.4.open-graph-twitter-card.md)

<a id="p-6-5-5"></a>

## 6.5.5 sitemap与robots：发现、抓取指令和索引边界

对照主工程路由/canonical审查sitemap条目，并证明robots不是HTTP授权；不要向真实搜索服务提交本地站点。

验收：

- [ ] XML条目数量/URL/编码与已知公开规范路由一致，无虚构更新时间。
- [ ] 能解释Disallow/noindex/认证的不同，预览页noindex可读而私有API仍要独立授权。

[理论](../../1-notes/06-performance-security/6.5-seo/6.5.5.sitemap.xml.md) · [示例](../../2-examples/06-performance-security/6.5-seo/6.5.5.sitemap.xml-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.5-seo/6.5.5.sitemap.xml.md)

<a id="p-6-5-6"></a>

## 6.5.6 JSON-LD：内容一致、结构和script注入边界

为课程生成最小真实JSON-LD，并加含结束script形状的输入测试；核对可见标题/描述和机器数据一致。

验收：

- [ ] 输出可解析且类型/URL/字段与公开内容一致，无捏造评分或排名承诺。
- [ ] 恶意形状文本不闭合数据script，未泄露SID/密钥；安全序列化和schema资格分开验证。

[理论](../../1-notes/06-performance-security/6.5-seo/6.5.6.schema.org-json-ld.md) · [示例](../../2-examples/06-performance-security/6.5-seo/6.5.6.schema.org-json-ld-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.5-seo/6.5.6.schema.org-json-ld.md)

<a id="p-6-5-7"></a>

## 6.5.7 Nuxt SSR/SSG的搜索价值、代价与验证

按公开课程/查询页/预览/未知slug四类写渲染与索引策略，运行原始响应和导航检查；如选择SSG，另验生成集合和真实404托管行为。

验收：

- [ ] 模式取舍与内容时效/部署能力一致，原始HTML/状态/head有实际证据。
- [ ] 未把SSR、静态生成或Lighthouse分数当排名保证，未实现能力明确为扩展/后续。

[理论](../../1-notes/06-performance-security/6.5-seo/6.5.7.ssr-ssg-seo-next.js-nuxt.md) · [示例](../../2-examples/06-performance-security/6.5-seo/6.5.7.ssr-ssg-seo-next.js-nuxt-demo.md) · [独立练习](../../3-exercises/06-performance-security/6.5-seo/6.5.7.ssr-ssg-seo-next.js-nuxt.md)
