# 阶段11.1逐点审查

2026-11-25，五点四部分。逐篇阅读理论、操作卡、练习与拟整合任务；主Nuxt和独立Sentry lab职责分开，非文件计数验收。

- 11.1.1：事件捕获→transport→平台职责清楚；release/环境与同次JS/map配对，当前官方默认Debug ID关联，CI上传token不进浏览器。真实SDK11.17.0、Vite8.3.8压缩产物与trace-mapping还原app.mjs已测；SaaS上传/符号化未测。BugSnag仅官方对应概念，不冒称安装。
- 11.1.2：P0–P3为教学约定、非通用标准；影响分母/窗口/恢复/安全事件优先升级/owner兜底明确。本地priority四级与非法NaN负例通过；平台自动指派和通知仅观察/草案，没有发送消息。
- 11.1.3：实际阅读主FaultyPanel、index、error.vue和config；点击后CSR局部故障，先移除broken再clearBoundaryError，全局clearError另处。当前Nuxt4.7官方已支持实验ssrErrorBoundary/未来5默认，但主未启用，所以不把旧“仅客户端”写成所有配置永远如此，也不声称默认局部捕获SSR。异步data.error/showError/middleware范围分别说明。主运行由主作者另记录，本组不冒称已跑Nuxt。
- 11.1.4：错误sampleRate与Tracing/Replay率区分；beforeSend允许列表、已知Abort与本页配额分开；scope字段、原异常文本、query和vars合成canary移除。0/1确定性边界实测，不用少量0.1样本证明统计性质；本页配额不当接收端防滥用。
- 11.1.5：固定语义动作，不收输入；真实SDK最近3条顺序与过滤实测。默认集成关闭，不能据此声称生产自动breadcrumbs都安全；SSR/换用户scope隔离明确为真实集成的后续专项。

## R01–R09与修正

五编号与四部分契约/至少两标准齐；机制→事件/影响→恢复→采样/上下文递进。先MWG privacy正文，后Sentry选项/filtering/breadcrumb/source map/Nuxt、BugSnag、Vue/Nuxt当前文档及GoogleSRE一手资料。来源、工具版本、固定fixture与观察边界明确。

发现并修正栈帧使用对象spread可能透传vars：改成具体字段，补vars canary负例，最终3Node/重建/两视口复验通过。小代码节选不引用不存在的memoryTransport；局部Nuxt片段链接真实FaultyPanel/index/error.vue，不用假功能制造练习前提。所有练习不同变体、有具体现象/修复判据，综合任务标明既有/扩展/平台未执行。

真实冻结离线安装、3Node、Vite生产构建、390与1440后台Chrome通过。SDK版本/2信封/取消0/样本0/3条面包屑/敏感canary缺失/压缩帧还原源码/外站请求0均由断言验证，详见runtime。最末复验是在栈帧允许列表与代码格式化后。服务和浏览器在finally关闭，无4532监听；未生成真实凭据/上传token、未改浏览器安全设置。

父索引/manifest/tasks由主作者整合，本组逐点JSON附integrationCase。阶段整体R09、主项目实际运行、全库门禁和最终指纹待主整合；本组passed不等于SaaS接收/平台告警、生产事故响应或真实学习者掌握。

## 主项目整合后的只读复核

追加阅读主README、docs/OPERATIONS.md、tasks.md前五点以及最新index/observability hook、flow/http spec和主作者共享运行结果：/tmp/stage11-e2e.log与e2e-results.json显示2026-11-25T10:49:19Z开始的5项E2E通过，无skip/unexpected/flaky。执行者为主作者，本组只核读，不计第二次运行。默认浏览器事件关闭、API503独立catch、局部clearBoundaryError、全局clearError、SSR显式trace关联和v-if真实门控与现有说明相符；主运行日志仍独立存在的隐私边界也已说明。

发现教材已有能力措辞需收紧：当前主项目没有SSR页面渲染失败专用路由/测试，实际是/api/demo-failure服务端API503以及客户端showError全局页。已向主作者指出11.1.3“独立SSR失败路由/主Nuxt已有SSR失败路径”和11.1.2“SSR服务503”应改为服务端API失败，SSR页面故障作为官方观察或隔离副本新增。此为文档事实同步，不要求新增路由或重复运行。最终关闭由主作者整合记录核对。

主作者关闭复核：已逐处将既有能力收紧为局部CSR/客户端全局/服务端API503，并在操作卡标明SSR页面抛错尚未实装、仅观察/新增。准备步骤改主Nuxt4531，无需先跑独立Sentry lab。主tasks按更新后的integrationCase重新生成；只修正文/任务，复用本轮代码未变的5E2E证据，不新增运行宣称。
