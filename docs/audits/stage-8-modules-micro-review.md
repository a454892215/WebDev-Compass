# 阶段8.2/8.4模块与微前端逐点审查

2026-11-25；开始09:23:01 UTC。范围8.2六点和8.4七点，共13点。按AUTHORING版本1 R01–R09，分组审查不替代全阶段集成和学习者独立实践。

## 规划、递进与核心更正

没有需要再加编号的明显缺口；把失败回退、版本/事件、清理和执行权限落在已有主题。先模块/依赖/组件，再配置与可信扩展；微前端先动机和备选，再集成、依赖/样式/路由/消息，最后反模式。Vue/Nuxt主线不依赖联邦工具或多框架安装。

FSD不是任意feature文件夹，完整层语义与项目适配区分，processes已废弃。分层运行调用与源码导入分开，Domain不能机械导入Infrastructure；端口由内层约束、外层组合。Module Federation有构建配置与运行时remote加载，不归为纯构建时静态集成。Registry/Shadow DOM不提供不可信代码权限沙箱。

## 13点具体审查

| 点 | 四部分对应、证据与边界 |
| --- | --- |
|8.2.1|FSD层/切片导入与Nuxt约定协调；主项目是适配版，reports变体不制造完整FSD认证。|
|8.2.2|结构端口注入listTitles、坏DTO拒绝，主server domain ports→application与API composition source实际核读；运行箭头非导入箭头。|
|8.2.3|主CourseList只props/emits与NuxtLink；副本移除直接父对象修改，数据/URL和加载失败由容器负责，不称lab为Vue组件测试。|
|8.2.4|功能/URL/chunk不等同；lab History与直接刷新/资源404真实；Nuxt chunk由主实际构建另验，不用普通文件夹证明分包。|
|8.2.5|有限schema先整体校验、未知属性拒绝、label/input、恶意文本不执行；非完整JSON Schema引擎或业务授权。|
|8.2.6|注册/重复/未知拒绝、幂等dispose、卸载后不消费全局tick、重挂只一份；可信插件失败前资源仍需作者清理。|
|8.4.1|独立团队/交付收益与协议/质量成本，官方观察+ADR，不强拆主Nuxt。|
|8.4.2|Webpack local/remote及异步加载正文核读；single-spa/iframe/WebComponent职责是不同维度，不把lab当联邦部署。|
|8.4.3|shared/singleton与版本协商、remote入口/旧chunk/回滚；仅官方观察与兼容矩阵，未装WebpackFederation。|
|8.4.4|真实全局同名badge红、Shadow内部蓝；仅此选择器范围证明，继承/token/part与权限边界明确。|
|8.4.5|单一URL owner、History/刷新/未知404；实际lab地址/catalog.html与/reports.html便于静态资源复核，不叫完整独立子应用。|
|8.4.6|真实4513↔4516 postMessage，合法目标接受，错误source/版本拒绝；同目标WindowProxy导航到错误源后拒绝，origin与source缺一不可。BroadcastChannel只官方观察。|
|8.4.7|模块化单体/独立宿主/微前端比较，有不采用理由、引入阈值和退出策略；AI成本不消除协调成本。|

各点三部分39份有机制、具体操作、不同变体、至少两标准、故障与参考。两个integration-cases逐点13项建议供主代理组装tasks；最终契约/索引由主代理负责，不提前把父入口缺失伪装通过。

## 实际验证与问题关闭

Node26.0.0，pnpm11.4.0，Playwright1.65.1；运行时无第三方框架，验证依赖固定锁文件。冻结安装真实通过。3项Node测试覆盖协议拒绝、registry幂等清理与有限schema/端口。390/1440两组后台Chrome最终通过：挂载/重挂/卸载、样式、跨源/导航后的来源校验、schema安全文本、History导航/刷新/404、零pageerror和无横溢出。

最后自审发现正则会将undefined/null转成字符串，parseFields补显式id类型、重复id与空白label拒绝，Node增加失败反例，并复验受影响两视口通过，避免配置生成错误label关联。

测试导航同一iframe后等待其load，再发送消息，消除旧文档抢先点击的竞争；不以固定sleep凑通过。资源检查发现lab根路径被仓库HTML检查视作缺失，改为真实catalog.html/reports.html及相对child资源，保持实际History地址与href一致；复验两视口。没有修改通用检查器掩盖错误。全库当时178HTML/665本地引用0错，最终由主代理再核对。

main实际核读：features/catalog/application/view、domain/filter、CourseList，server workspace/domain/ports、application/load和server/api composition；数据来自合成进程内adapter，不是真远程HTTP/认证。main没有registry/schema/真实微前端，本组操作卡未虚构这些能力。主运行由主代理执行，本组没有重复构建。

## R01–R09与一手来源

R01十三编号与任务建议完整；R02上述顺序和前置明确；R03先MWG security/WebComponents，再FSD、Vue/Nuxt、Webpack、single-spa、MDN与JSON Schema正文；R04真实lab与官方观察分开；R05变体/故障/两标准具体；R06main实际与副本扩展分开；R07术语与协议/源码一致；R08必达本地问题修正复验；R09未测边界和执行者明确，不改学习勾选。

实际阅读[MWG Security](https://developer.chrome.com/docs/modern-web-guidance/guides/security/security)、[WebComponents](https://developer.chrome.com/docs/modern-web-guidance/guides/html/web-components)、[FSD layers](https://feature-sliced.design/docs/reference/layers)、[Webpack Federation](https://webpack.js.org/concepts/module-federation/)、[single-spa](https://single-spa.js.org/docs/microfrontends-concept/)、[Vue props](https://vuejs.org/guide/components/props.html)、[Nuxt pages](https://nuxt.com/docs/4.x/directory-structure/app/pages)、[postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)、[BroadcastChannel](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API)、[JSON Schema objects](https://json-schema.org/understanding-json-schema/reference/object)与CSS scoping。官方single-spa页面部分“一tab一个进程/线程”简化描述未照抄；浏览器多进程模型不由微前端统一决定。

未验证Webpack联邦、single-spa工具运行、真实跨团队部署/生产身份、完整插件沙箱、全套CSS/无障碍认证、其他浏览器、真实移动设备/读屏器或学习者试学。只本地服务4513/4516，finally关闭浏览器与服务，未更改系统浏览器安全设置，未暂存提交。

## 追加主文档独立审阅

按主代理请求只读审阅RFC/ADR/NFR/ARCHITECTURE、8.1六点三部分及门禁源码/测试，未改主文件、未重复运行其测试。发现并上报：收藏仅客户端toggle，单改模块ref不能保证并发SSR显示泄露，需要副本新增SSR写入或改为风险分析；target解析只existsSync会把目录当模块，应只选文件以正确解析index.ts并增加回归。其余文档的Container、调用/源码方向、合成scope非认证、主进程内adapter与有限门禁能力说明未见明显矛盾。两发现由主代理统一修复和验收，不在本组虚报已关闭。
