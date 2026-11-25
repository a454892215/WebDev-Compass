# 阶段5.3/5.5：跨域、安全传输与实时协议逐点审查

日期2026-11-25；分组开始06:53:26 UTC。覆盖5.3的5点和5.5的4点，共9点。依据AUTHORING版本1的R01–R09，分组通过不替代主代理的全阶段集成与学习者独立掌握。

## 规划与递进

大类无需新增编号。必要边界补入原条目：源/站点、CORS读取/跨站写、精确Origin/credentials/Vary、代理与生产授权不同；WS/Socket.IO线协议、SSE cursor/重复事件、有限重连与页面所有者。本组先SOP→CORS→代理→历史JSONP→安全传输，再原生WS→Socket.IO→SSE→移动生命周期比较。前置是阶段2浏览器/HTTP、阶段3模块/测试，真实登录与授权由5.2和Nuxt主工程另验。

## 逐点核对

| 编号 | 理论、实际例子、练习与综合边界 |
| --- | --- |
| 5.3.1 | 真浏览器跨源读取拒绝，简单text/plain POST动作却已发生；两端口不同源但同站；no-cors不解锁JSON，Node不受浏览器CORS约束。独立排错opaque响应，综合保持Nuxt同源会话。 |
| 5.3.2 | 允许/拒绝预检对应实际POST1/0，精确Origin+凭据可读，通配*即使ACAC仍拒绝；Vary真实返回。练习删Allow-Headers和Cookie独立排查，不用命令行代替浏览器。 |
| 5.3.3 | Node固定目标代理真实读到plain；Vite配置仅官方对照，未冒称本lab跑Vite/生产代理。前后两跳、rewrite与凭据转发边界明确。 |
| 5.3.4 | 本地跨源script执行固定JSONP回调，对照Fetch仍不可读。无外网脚本或真实Token；源码对非固定callback返回400，未把该分支额外算成浏览器用例。历史了解与Fetch/CORS迁移任务明确。 |
| 5.3.5 | 实际CSP允许self外部脚本、拒绝内联脚本，响应头真实核对；TLS证书/HSTS/公网部署未测。练习按Nuxt真实接管设计nonce/来源，不套固定严格头破坏应用。 |
| 5.5.1 | 原生WS真实一次app ping/pong、1012关闭、一次有限重连及echo，stop和pagehide后活动连接归零；错误Origin握手403。练习完整心跳超时/限额，不冒称本例已有生产保活。 |
| 5.5.2 | Socket.IO4.8.4客户端/服务器实际事件ack；独立/ws原生协议不混用。确认/持久化/恰好一次分开；多节点与恢复窗口未测。 |
| 5.5.3 | SSE真实重复id1去重、断流后Last-Event-ID:1、id2及显式close；无活动连接残留。固定fixture不是持久历史；EventSource不能任意带Authorization。 |
| 5.5.4 | 页面连接所有者、停止/pagehide清理与后台节流边界；不把WS/SSE称移动系统推送。迁移练习明确多标签/登录失效/恢复各自职责，无真机后台保活声明。 |

[逐点JSON](./stage-5-cors-realtime-points.json)包含四部分路径、具体机制、反例和综合任务建议。每点练习有动手、至少2条具体验收、可复现故障和参考，理论最小片段说明完整上下文；9项integration-cases由主审映射综合tasks，主工程不虚构已存在实时功能。

## 真实验证

Node26.0.0、pnpm11.4.0；固定ws8.23.0、Socket.IO/server-client4.8.4、Playwright1.65.1并保留锁文件。官方registry实查版本；pnpm11配置YAML，未全局安装或修改其他项目。

冻结离线安装和Node语法检查通过。11组实际验收：Node错误Origin握手拒绝1组，以及Chrome390/1440各CORS、JSONP、WS/SSE、Socket.IO、CSP5组，共10组。CORS组有多项实际读/写/预检/凭据/代理断言，不把分组数量当学习掌握率。两视口无溢出；CSP受控拒绝、CORS读拒绝属于预期安全结果，不隐藏为成功读取。

[运行JSON](./stage-5-cors-realtime-runtime.json)保存真实观测与限制。verify.mjs在finally关闭浏览器/服务器，4404/4405最后无监听。分组时HTML资源165页/617引用零错误；最终全库数量由主审集成复验。

发现已关闭：APIResponse头API与页面Response不同，改headers()后复验；动态CSP页改为物理可链接文件，真实点击和静态资源同时验证；SSE重复fixture和离开页面清理补实际证据；代码经格式化后保持真实运行。未做公网HTTPS/HSTS、真实用户认证、真机/其他浏览器、生产负载、持久消息恢复或学习者试学。

## R01–R09与依据

R01九编号与三部分材料/综合建议完整；R02按上述前置递进；R03先检索MWG Security并读CORS/安全头正文，再读MDN与标准；R04真实Node/Chrome协议观测、HTTPS仅明确清单；R05具体变体/故障/标准；R06独立网络lab与Nuxt已有能力分清；R07源/站点/认证/授权/协议/状态一致；R08必要检查与必达发现关闭；R09边界与分组状态清楚。主审负责正式契约、整体验收、索引与提交。

来源：[MWG Security](https://developer.chrome.com/docs/modern-web-guidance/guides/security/security)、[MDN SOP](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)、[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)、[WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)、[EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)、[HTML SSE标准](https://html.spec.whatwg.org/multipage/server-sent-events.html)、[Socket.IO](https://socket.io/docs/v4/)、[Vite代理](https://vite.dev/config/server-options#server-proxy)、[CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy)。未将单引擎隔离建议或整套安全头盲目套在此教学应用。
