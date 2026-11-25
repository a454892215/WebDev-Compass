# 阶段12.2逐点审查

2026-11-25，保留4点。逐篇理论、操作卡、练习及integrationCase对照实际源码，主Nuxt/全阶段tasks由主作者整合，本组不代替整阶段验收。

- 12.2.1：axe检查当前DOM自动规则，与键盘/辅助技术分别记录；真实正常零违规、去label-for出现label违规、恢复零违规，跳转正文与原生dialog焦点/Esc/返回触发点均实测。没有屏幕阅读器/残障用户验收，不称完整WCAG符合。
- 12.2.2：实际读取Vite JS/CSS产物raw/逐文件gzip；正常3184/1592字节。临时源副本注入随机大字符串保留在DOM dataset后真实第二次构建，43222/32304字节，增量40038/30712并超20KB/10KB预算被拒（随机gzip可随次变化）。缺产物必失败。LHCI仅读官方、给配置/前提，没有运行分数、上传或生产RUM证明。
- 12.2.3：伪本地化与RTL分开，明确中文导航是教学支架而非全站翻译。html lang/dir、逻辑属性、长文本换行、bdi LTR标识实测；390固定900宽故障出现横溢出，恢复后消失。当前截图不是已审批golden；实际查看rtl-390 PNG确认内容完整，无裁切或横溢出。母语审校/日期货币/复数扩展明确待用户实现。
- 12.2.4：真实环境只Chrome158.0.8127.37、390/1440模拟视口；多引擎config配实际smoke用例，--list发现3测试，不记运行通过。Firefox/WebKit/BrowserStack/真机未执行，不用项目名称假造引擎/设备。

## 来源与递进

先查并读MWG accessibility/html/performance正文，再Playwright accessibility/projects/browsers、W3C WAI/国际化、LighthouseCI配置/性能计分、BrowserStack官方。采用原生语义/dialog、自动化不代替键盘/辅助技术、实际产物与实验方差、RTL方向语义、支持矩阵与证据分类。四点有移动端对照，按无障碍任务→性能信号→文本布局→目标矩阵递进，不机械要求每项跑所有平台。

实读主Nuxtindex.vue、UiButton/UiField等已存在路径：主有组件dist消费、locale/dir主题、表单错误与原生dialog；本组任务仍要求先核已有状态、缺项在副本新增，未把独立lab数据称主运行或假设主已跑多浏览器。

## 发现与验证

静态server根路径尾斜杠使边界检查误拒正常文件，规范化resolve后修复；axe要求显式独立browser context，改newContext后可运行辅助页面分析。格式化自有lab后重跑冻结离线安装、3项Node、Vite真实构建/第二次负例构建、两视口后台Chrome，全部通过。使用已有本地pnpm store，无网络安装或新浏览器下载，无真实凭据/账号。

每组无pageerror、外站请求0；finally关闭Chrome/server，4543无监听，临时负例目录清理。artifacts当前观察图忽略提交。HTML资源当时190页702引用0错，不冒充其他分组后续最终门禁。

R01四点/四部分任务数据齐；R02前置/顺序明确；R03来源与实测边界准确；R04真实正反实验/观察分清；R05每点独立变体、两条标准、具体故障与参考；R06主组件/独立lab/扩展区分；R07术语与实际代码一致；R08上述发现关闭且受影响复验；R09本组结果/未测列清，学习者勾选未动，整合索引/manifest/正式阶段指纹留主作者。AI审阅不是人类试学。

## 未执行

LighthouseCI、屏幕阅读器、Firefox、WebKit、BrowserStack、真机、远程CI或生产性能/完整语言/无障碍认证。没有修改旧阶段、父索引或全局检查器，没有暂存/提交。

## 12.4及主库额外独立只读复审

2026-11-25 11:30起，只读核对12.4五点理论、操作卡、独立练习与stage-12-library-points.json的integrationCase；另读主lib/package.json/vite.config.ts/src、verify-package.mjs、verify-changesets.mjs、package scripts、unit/e2e源和Nuxt实际样式/对话框使用。重新核读Vite库模式/external、webpack CSS sideEffects、npm peer以及Changesets3.0.3官方version/publish正文。没有运行主项目测试、改主源码或把审阅当新增运行。

确认：ESM导出/CSS公开路径/types对应真实包结构；Vue peer与external职责分明，只有3.5.46/Nuxt4.7实测边界明确；pack后抽出tgz的真实独立构建、样式遗漏负例与类型正反、未用marker检查均有实际断言，不把一个marker当全部摇树证明。消费者Vue由脚本明确symlink至宿主，未冒充远程registry安装/全版本peer兼容测试。Changesets仅临时fixture version与changelog，无publish/主版本修改；默认配置按固定CLI读取，更新需复验。UiButton默认button且主dialog关闭显式submit，UiField实际label/hint/error/v-model路径与测试相符，axe/键盘/读屏边界清楚。未发现需要修改代码的阻断项。

向主作者报告三个教材收紧建议，待主作者最终同步：
1. 12.4.5“Storybook故事仅源码文档”易与12.3真实play交互证据矛盾，建议改为“Storybook源码故事/交互证据不能替代打包消费者、SSR/宿主和人工验收”。
2. 12.4.1新增JS顶层副作用的练习应同时说明本包sideEffects仅保留CSS、等价将其他文件声明为无副作用。新增真实JS副作用必须同步metadata或避免该设计，不能假设错误声明下打包器仍无条件保留。
3. 12.4.4“错误bump”需区分非法枚举值的工具错误与合法但语义错误的patch；后者必须人审，工具不自动识别breaking。

### 12.4三项教材建议关闭复核

2026-11-25 11:35，只读确认最新理论/练习/points与主README、TESTING：Storybook表述已承认真实play证据并保留与pack/SSR/人工的层级区别；12.4.1新增JS顶层副作用练习已要求同步sideEffects元数据并优先避免顶层副作用；12.4.4练习/points已区分非法bump值工具错误与合法但语义不当patch需人工审查。三项均关闭，无新增阻断项。主README也明确Vue消费者路径、UiField内部描述关联、scope和未测平台。未改主文件、未运行主check:ci；该链路由主作者实际执行，本组仅核对声明与源码。
