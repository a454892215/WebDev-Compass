# 15.6.5–8逐点审查

2026-11-25；分工开始13:19:59 UTC。先读AGENTS、AUTHORING、四部分规范、地图和阶段14样式，再检索并阅读MWG passkey-authentication、cpp-on-the-web、security、secure-external-subresources正文。原生ImportMap和普通WebGL按MDN/官方资料核对。HTML-in-Canvas为Origin Trial门槛，未启用。

## 逐点与四部分对应

| 点 | 核对结论 |
| --- | --- |
| 15.6.5 | 两API职责分开；真实虚拟WebAuthn浏览器create/get，不声称服务端验证。challengeMatches不是可信登录。Payment只有接口检测，练习另做服务器责任/取消状态观察；不调用支付，不编造结算证据。 |
| 15.6.6 | 原生ImportMap裸名实测，先于依赖模块；feature gate保留基础内容。与构建器/npm/CORS/CSP/完整性职责分清；CDN为明确观察/新增，不将本地ESM当网络供应链验证。 |
| 15.6.7 | 真实标量/SIMD、64KiB页、普通内存grow的旧buffer detach；普通/隔离两文档比较。shared Memory+Worker中JS Atomics不是编译Wasm线程；练习的数组批处理/线程编译属于新增。 |
| 15.6.8 | 原生WebGL真实shader/倾斜三角形/投影和两像素，GPU句柄生命周期清楚，等价文字始终可读。Three仅官方职责观察，未安装；SwiftShader非硬件性能，context loss/恢复和shader失败未测试明示。 |

每点正文都有前置、原理/场景、具体最小源码、移动类比及边界、一手来源；示例明确命令/输入/预期、练习有变体/两个标准/具体故障/参考。points JSON含相应综合任务和稳定锚点，交主代理生成tasks。主Nuxt没有因此自动接入认证/支付、ImportMap、Wasm或Three；综合全为明确扩展/选型。

## R01–R09与验证

R01范围四点无漏、R02选修前置清楚、R03按实际版本与正文核实；R04真实后台Chrome158八项检查通过、R05具体失败情景与变体、R06主项目新增边界准确；R07术语/数字/文件与实际源码一致；R08问题已关闭，R09运行/观察/未测分清，阶段总索引由主维护。

实际Node26.0.0、Chrome158.0.8127.37、本仓库阶段14锁定Playwright；8项检查通过，pageerror空。GL回退文案与实际橙色三角形一致；隔离入口改为明确loopback运行URL后，于13:27:57 UTC再次8项检查通过；运行证据见[摘要](./stage-15-specialized-runtime.json)。stdout原始摘要在lab/dist/runtime.json忽略，不提交生成物。临时服务器/浏览器上下文/Worker/虚拟认证器均关闭，无caffeinate或Git变动。

关闭的问题：Worker缺隔离响应头导致共享通道失败→补COEP后真实复验；ImportMap依赖模块缺门控→支持检测及no-importmap分支；清屏不足以展示3D→加真实shader/投影/中心像素；Three旧文档404→当前manual/pages正文。资源清理不声称驱动即刻回收全部显存。

## 适用限制

无服务器验签/生产登录/真实passkey、真实支付、CDN、Emscripten/pthread、Three安装、物理GPU、上下文丢失恢复、真机、多引擎、读屏、学习者试学。虚拟认证器与能力检测不能替代生产接口集成；Chrome内强制回退不是旧浏览器证据。共享隔离头仅独立路径，不修改主宿主策略。

离线导航核对：隔离入口是动态HTTP路由，不伪造isolated文件，不改检查器；href已标明确loopback地址。组README为主代理统一生成，离线文件链接随共享索引补齐。

主代理集成复核：按W3C Level3补充多设备凭证备份/同步边界，网站API不暴露私钥不等于所有认证器均为不可导出硬件；仅正文准确性修订，未改实验代码，不重跑仪式。
