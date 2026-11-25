# 阶段7.3业务选修逐点编写与审查

日期2026-11-25；本组开始07:57:01 UTC。按AUTHORING版本1 R01–R09，9点保持原地图路径和编号，不增加前置门槛；Vue/Nuxt首次交付不依赖这些选修。

## 逐点核对

| 点 | 四部分能力、证据与边界 |
| --- | --- |
| 7.3.1 | 微前端与Module Federation不同层；宿主/远端契约、共享版本与失败降级。官方设计观察，未运行联邦，不称安全沙箱。练习明确不引入架构也可能合理。 |
| 7.3.2 | 原生CustomElement稳定函数监听、断开清理、重连、composed事件与原生button。两视口真实断开不变/重连一次/Enter激活通过；shadow不是安全边界，跨树ARIA不误用。 |
| 7.3.3 | GraphQL数据/部分错误/HTTP成功分开，Apollo策略及每请求客户端隔离。合成响应与官方观察，无真实服务或Apollo/urql实例。练习包含部分失败与身份缓存清理。 |
| 7.3.4 | 内嵌可核对WAT/二进制，Node和Chrome真实instantiate/export。负数/i32溢出/截断失败实际验证；无Emscripten、性能基准、线程或天然更快承诺。 |
| 7.3.5 | Electron渲染/桥/核心与Tauri capabilities职责，最小导出接口、取消与输入来源检查。只有官方安全观察，不安装或启动桌面壳，不把Chrome结果当原生权限测试。 |
| 7.3.6 | RNW/Expo复用边界、平台入口与静态导入陷阱，URL/键盘/语义保留。官方观察与适配设计，不强行切离Vue主线或保证100%复用。 |
| 7.3.7 | D3低级工具、ECharts配置、Chart.js canvas职责差异。真实实现为原生SVG+表格同源数据，有限值/范围/三行数值/两视口实测；未宣称图库或真实读屏认证。 |
| 7.3.8 | 文档结构、操作/事务、selection/IME、schema与净化不同；Tiptap/Slate官方观察，ProseMirror原站403如实注明。未装完整编辑器，lab文本schema不是编辑器替身。 |
| 7.3.9 | 白名单schema/version/整体校验后渲染，拒绝未知属性/节点/超限；textContent恶意标签保持文本。Node与浏览器实测，无eval、不伪装完整JSON Schema或低代码平台。 |

## R01–R09

R01九点理论/操作卡/练习/综合任务建议齐，points与integration-cases逐点映射。R02先判断需求，再平台机制与可选集成；各点前置明确、独立变体渐进。R03先读匹配MWG，再核对各官方资料，移动对照按主题解释差异，没有复用框架名就照搬底层。R04真实机制与观察型材料分别标注。R05每练习有情景变体、至少2标准、可复现故障及参考。R06综合任务明确主Nuxt未实现的选修扩展。R07图形数据/文字、schema/安全、组件/原生语义、构建/平台边界一致。R08必要运行通过，发现lab运行说明链接范围问题已修正，补真实README HTTP检查。R09未测范围、版本、清理和观察型交付记入runtime，不把AI审阅当学习者试学。

## 实测与来源

3项Node测试和390/1440两组后台Chrome通过，零pageerror、无横溢出；服务与浏览器finally关闭。冻结离线安装通过；第一次离线缺tarball即停止，随后显式联网安装3项锁定Playwright依赖，未修改全局工具/浏览器安全设置。最终代码由已有Prettier格式化为逐行可读，不以格式变化声称新一轮行为测试。173HTML/644资源引用零错为检查当时全库快照；父README/tasks由主代理集成，最终门禁仍需统一核对。

已检索并读取[MWG Web Components](https://developer.chrome.com/docs/modern-web-guidance/guides/html/web-components)、[Custom Elements](https://developer.chrome.com/docs/modern-web-guidance/guides/html/custom-elements)、[WASM](https://developer.chrome.com/docs/modern-web-guidance/guides/wasm/cpp-on-the-web)、[security](https://developer.chrome.com/docs/modern-web-guidance/guides/security/security)正文。采用默认Vue/原生控件、幂等连接与清理、安全DOM/权限边界，不为概念演示强装完整工具链。各点继续链接Webpack、GraphQL/Apollo、Electron/Tauri、Expo/RNW、MDN、D3/Chart.js/ECharts、Tiptap/Slate、JSON Schema官方正文。

各未安装SDK/框架仅提供具体观察和副本设计；原生四机制不冒充这些平台运行。无真实移动设备、辅助技术、人类试学或生产发布。9点在以上资料类型和范围内通过，不代替全阶段主实践/契约验收。未暂存、未提交，由主代理统一集成。
