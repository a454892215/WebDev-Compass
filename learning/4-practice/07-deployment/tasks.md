# 阶段7逐点综合实践

先按[项目说明](./README.md)理解三种profile，再在副本做独立变体。29项分别对应主Nuxt、独立release/optional lab或明确观察任务，不将要求新增的能力当作已实现。7.3与Next可选，不阻塞Vue/Nuxt首次交付。保留命令/实际状态/解释与恢复证据，不要求复杂打卡。

<a id="p-7-1-1"></a>

## 7.1.1 Vite dist 与 Nuxt .output：识别可部署产物

对主工程三个profile保存可交付目录清单，解释不能混用的入口；对照lab中合成hash而非宣称lab重新实现Nuxt构建。

验收：

- [ ] SSR保留server/public并从server入口启动；静态profile仅托管public且不能依赖同包API。
- [ ] 新增路由直接访问和刷新都验证；内容摘要/清单能对应源提交和profile。

[理论](../../1-notes/07-deployment/7.1-build-deploy/7.1.1.dist.md) · [示例](../../2-examples/07-deployment/7.1-build-deploy/7.1.1.dist-demo.md) · [独立练习](../../3-exercises/07-deployment/7.1-build-deploy/7.1.1.dist.md)

<a id="p-7-1-2"></a>

## 7.1.2 静态与托管平台：Vercel、Netlify、Pages 的能力核对

为主Nuxt的SSG和SSR各选择一个候选托管方案并填能力对照；本轮不部署到真实账户。

验收：

- [ ] 静态与SSR适配器输出、运行时能力明确，不把Pages称Node托管。
- [ ] 子路径资源/深链/404/秘密边界有实际验收计划；未发布时明确标观察。

[理论](../../1-notes/07-deployment/7.1-build-deploy/7.1.2.vercel.md) · [示例](../../2-examples/07-deployment/7.1-build-deploy/7.1.2.vercel-demo.md) · [独立练习](../../3-exercises/07-deployment/7.1-build-deploy/7.1.2.vercel.md)

<a id="p-7-1-3"></a>

## 7.1.3 Nginx 静态文件、反向代理与 gzip

对主Nuxt明确静态profile与Node SSR需要的两套location；独立lab实际验证代理/压缩，不冒充公网TLS已经配置。

验收：

- [ ] nginx -t成功，静态内容/代理JSON的Content-Type和路径正确；API失败不回HTML。
- [ ] 文本gzip协商有效且解码正文相同；HTML与hash资源缓存不同。

[理论](../../1-notes/07-deployment/7.1-build-deploy/7.1.3.nginx.md) · [示例](../../2-examples/07-deployment/7.1-build-deploy/7.1.3.nginx-demo.md) · [独立练习](../../3-exercises/07-deployment/7.1-build-deploy/7.1.3.nginx.md)

<a id="p-7-1-4"></a>

## 7.1.4 构建变量、Nuxt 运行配置与秘密边界

核对主项目runtimeConfig源码和合成canary回归，保留公开label/releaseId与privateCanary的边界；不把无命中当未知秘密绝不泄露证明。

验收：

- [ ] 公开变量在预期页面可见，私有标记不进入客户端产物/响应；结果只证明定义的标记。
- [ ] Node生产启动与静态重建的配置生效时间写清，不依赖自动读取.env。

[理论](../../1-notes/07-deployment/7.1-build-deploy/7.1.4.item-7-1-4.md) · [示例](../../2-examples/07-deployment/7.1-build-deploy/7.1.4.item-7-1-4-demo.md) · [独立练习](../../3-exercises/07-deployment/7.1-build-deploy/7.1.4.item-7-1-4.md)

<a id="p-7-1-5"></a>

## 7.1.5 History 深链与静态 fallback：路由不能吞掉资源错误

对主项目SSR/SSG/CSR分别验证直接访问与缺失资源；独立Nginx观察只承担fallback机制，不替代框架导航证据。

验收：

- [ ] 合法深链可直接加载/刷新，资源URL与base路径正确。
- [ ] 缺失API/脚本不变200HTML，未知页面的HTTP状态和客户端错误体验明确。

[理论](../../1-notes/07-deployment/7.1-build-deploy/7.1.5.spa-history-fallback.md) · [示例](../../2-examples/07-deployment/7.1-build-deploy/7.1.5.spa-history-fallback-demo.md) · [独立练习](../../3-exercises/07-deployment/7.1-build-deploy/7.1.5.spa-history-fallback.md)

<a id="p-7-1-6"></a>

## 7.1.6 Docker 多阶段构建：构建工具与 Node 运行镜像分离

按主项目pnpm build和artifacts/ssr入口审查多阶段模板，真正容器执行属于可选扩展，不为入门重装本地虚拟化环境。

验收：

- [ ] 构建上下文/锁文件/构建命令/输出匹配，最终镜像不含.env与开发缓存；静态和SSR入口不混。
- [ ] 运行用户、端口、启动环境、信号与检查步骤完整；未实际运行明确记录。

[理论](../../1-notes/07-deployment/7.1-build-deploy/7.1.6.docker-dockerfile.md) · [示例](../../2-examples/07-deployment/7.1-build-deploy/7.1.6.docker-dockerfile-demo.md) · [独立练习](../../3-exercises/07-deployment/7.1-build-deploy/7.1.6.docker-dockerfile.md)

<a id="p-7-1-7"></a>

## 7.1.7 GitHub Actions：验证门禁、产物和受控发布

对主项目检查脚本和本地已验证profile制定CI门禁，阅读固定SHA模板；真实账户CD配置为明确后续扩展。

验收：

- [ ] 失败停止推广，产物与提交/profile可追溯；缓存与产物职责分开。
- [ ] 权限最小、可信代码边界与固定Action SHA明确；未运行远端不记通过。

[理论](../../1-notes/07-deployment/7.1-build-deploy/7.1.7.github-actions.md) · [示例](../../2-examples/07-deployment/7.1-build-deploy/7.1.7.github-actions-demo.md) · [独立练习](../../3-exercises/07-deployment/7.1-build-deploy/7.1.7.github-actions.md)

<a id="p-7-1-8"></a>

## 7.1.8 健康检查、版本标识与最小监测

对主Nuxt /api/health记录最小公开版本；独立lab演练503/恢复和日志脱敏；生产告警采集器尚未部署，不能称已经上线监控。

验收：

- [ ] 健康失败/恢复真实可观察且不被缓存，不能仅检查进程ID。
- [ ] 监测能关联release/status/耗时，记录不含query/token；告警有阈值窗口和责任动作。

[理论](../../1-notes/07-deployment/7.1-build-deploy/7.1.8.health-observability.md) · [示例](../../2-examples/07-deployment/7.1-build-deploy/7.1.8.health-observability-demo.md) · [独立练习](../../3-exercises/07-deployment/7.1-build-deploy/7.1.8.health-observability.md)

<a id="p-7-1-9"></a>

## 7.1.9 版本化发布、回滚与旧资源兼容

运行独立发布lab的真实A→B→A与资产兼容；主Nuxt按部署profile建立恢复清单，不声称Node内存指针是云平台零停机发布。

验收：

- [ ] 候选未健康不切流，A→B→A有真实HTTP版本证据；回滚后关键路径恢复。
- [ ] 旧资源仍可取，HTML可更新；列出API/数据/配置兼容及保留期限，不能只改UI标签。

[理论](../../1-notes/07-deployment/7.1-build-deploy/7.1.9.release-rollback.md) · [示例](../../2-examples/07-deployment/7.1-build-deploy/7.1.9.release-rollback-demo.md) · [独立练习](../../3-exercises/07-deployment/7.1-build-deploy/7.1.9.release-rollback.md)

<a id="p-7-2-1"></a>

## 7.2.1 CSR、SSR、SSG与增量再生成：先选产物，再选托管

对综合项目三种真实profile建立简短选择记录；新增“课程每分钟变化”需求只在副本修改策略。

验收：

- [ ] SSR/SSG/CSR证据分别指向原始HTML、生成文件与浏览器结果，未将最终DOM等同初始HTML。
- [ ] 说明更新/失效和托管职责，私有页不进入公开SSG或共享缓存。

[理论](../../1-notes/07-deployment/7.2-ssr/7.2.1.csr-vs-ssr-vs-ssg.md) · [示例](../../2-examples/07-deployment/7.2-ssr/7.2.1.csr-vs-ssr-vs-ssg-demo.md) · [独立练习](../../3-exercises/07-deployment/7.2-ssr/7.2.1.csr-vs-ssr-vs-ssg.md)

<a id="p-7-2-2"></a>

## 7.2.2 Next.js选修：Pages/App路由、组件边界与部署模型

把现有Nuxt部署决策对照Next Pages/App官方资料，写一份最多一页的迁移边界说明；不往主Nuxt工程安装Next。

验收：

- [ ] 标明观察型、未实装Next；Pages/App/Cache Components边界准确。
- [ ] 说明同一身份页的秘密/DTO与托管要求，不承诺静态export实现请求时认证。

[理论](../../1-notes/07-deployment/7.2-ssr/7.2.2.next.js.md) · [示例](../../2-examples/07-deployment/7.2-ssr/7.2.2.next.js-demo.md) · [独立练习](../../3-exercises/07-deployment/7.2-ssr/7.2.2.next.js.md)

<a id="p-7-2-3"></a>

## 7.2.3 Nuxt生产部署：Node SSR、静态托管与身份缓存

按综合项目实际Node/SSG产物建立托管清单；记录公开runtime配置与server-only标记的边界，检查现有私有路径响应。

验收：

- [ ] 产物/入口/环境变量与实际构建一致，静态站点未被描述成带Nitro服务。
- [ ] 公开缓存和身份路径分开；合成私有标记不出现在客户端可达内容。

[理论](../../1-notes/07-deployment/7.2-ssr/7.2.3.nuxt.md) · [示例](../../2-examples/07-deployment/7.2-ssr/7.2.3.nuxt-demo.md) · [独立练习](../../3-exercises/07-deployment/7.2-ssr/7.2.3.nuxt.md)

<a id="p-7-2-4"></a>

## 7.2.4 Hydration生产排查：原始HTML、payload与重复请求

对主工程详情完成HTTP→payload→hydration→交互的单条证据链，在副本制造一个浏览器API或裸$fetch故障再修复。

验收：

- [ ] 原始HTML包含预期公开内容，接管后按钮/导航有效且无未解释错误。
- [ ] 初始读取与后续动作可区分；未用全局数据缓存或关闭SSR掩盖问题。

[理论](../../1-notes/07-deployment/7.2-ssr/7.2.4.hydration.md) · [示例](../../2-examples/07-deployment/7.2-ssr/7.2.4.hydration-demo.md) · [独立练习](../../3-exercises/07-deployment/7.2-ssr/7.2.4.hydration.md)

<a id="p-7-2-5"></a>

## 7.2.5 同构部署验收：依赖兼容、请求隔离与静态边界

在主SSR对合成Alice/Bob/匿名并发检查身份与缓存；对SSG/CSR输出检查私有页面和server-only端点的缺失。

验收：

- [ ] 并发返回只含当前请求允许的数据，匿名/非法身份按契约处理，未把合成Cookie称真实认证。
- [ ] 静态文件未泄露私有内容，浏览器/Node/静态各环境能力与实际结果对应。

[理论](../../1-notes/07-deployment/7.2-ssr/7.2.5.api.md) · [示例](../../2-examples/07-deployment/7.2-ssr/7.2.5.api-demo.md) · [独立练习](../../3-exercises/07-deployment/7.2-ssr/7.2.5.api.md)

<a id="p-7-3-1"></a>

## 7.3.1 微前端与Module Federation：先确认独立发布边界

在Nuxt发布演练的副本为可选推荐模块写一页独立发布决策与失败恢复；当前主工程没有联邦。

验收：

- [ ] 能列出至少一个需要独立发布的真实业务理由及对应额外成本，不以代码量为唯一依据。
- [ ] 给出远端超时/版本不兼容的降级与责任人；明确远端JS不是安全沙箱。

[理论](../../1-notes/07-deployment/7.3-advanced-preview/7.3.1.item-7-3-1.md) · [示例](../../2-examples/07-deployment/7.3-advanced-preview/7.3.1.item-7-3-1-demo.md) · [独立练习](../../3-exercises/07-deployment/7.3-advanced-preview/7.3.1.item-7-3-1.md)

<a id="p-7-3-2"></a>

## 7.3.2 Custom Elements与Shadow DOM：生命周期、语义和边界

运行独立lab生命周期与事件测试；仅当课程控件要提供给非Vue宿主时，在Nuxt副本设计嵌入接口，不声称主工程已使用自定义元素。

验收：

- [ ] 断开后全局事件不改变状态，重连后一次输入只产生一次变化；状态保留规则明确。
- [ ] 真实button可用Tab/Enter操作，状态有文字或适当aria-pressed，名称不引用另一shadow tree的id。

[理论](../../1-notes/07-deployment/7.3-advanced-preview/7.3.2.web-components.md) · [示例](../../2-examples/07-deployment/7.3-advanced-preview/7.3.2.web-components-demo.md) · [独立练习](../../3-exercises/07-deployment/7.3-advanced-preview/7.3.2.web-components.md)

<a id="p-7-3-3"></a>

## 7.3.3 GraphQL客户端：查询、部分错误与身份缓存

在主目录副本为课程/推荐准备GraphQL对接设计与部分失败样本；当前主工程使用既定本地数据，不虚构已迁移GraphQL。

验收：

- [ ] 保留可用课程内容的同时显示推荐失败，不把HTTP200或data存在当全成功。
- [ ] 说明变量与实体ID/参数的缓存关系；SSR请求不共享身份客户端，注销后不展示前用户私有数据。

[理论](../../1-notes/07-deployment/7.3-advanced-preview/7.3.3.graphql.md) · [示例](../../2-examples/07-deployment/7.3-advanced-preview/7.3.3.graphql-demo.md) · [独立练习](../../3-exercises/07-deployment/7.3-advanced-preview/7.3.3.graphql.md)

<a id="p-7-3-4"></a>

## 7.3.4 WebAssembly：二进制模块、i32与JS边界

运行WASM lab并提交数值边界说明；只有业务真实计算瓶颈时再为Nuxt副本增加Worker/WASM，不为发布流程强加工具链。

验收：

- [ ] 输出符合i32语义；损坏字节以CompileError失败，不能显示旧成功结果。
- [ ] 性能方案包含下载/编译/调用/拷贝成本和JS基线，不宣称小加法证明WASM更快。

[理论](../../1-notes/07-deployment/7.3-advanced-preview/7.3.4.webassembly-wasm.md) · [示例](../../2-examples/07-deployment/7.3-advanced-preview/7.3.4.webassembly-wasm-demo.md) · [独立练习](../../3-exercises/07-deployment/7.3-advanced-preview/7.3.4.webassembly-wasm.md)

<a id="p-7-3-5"></a>

## 7.3.5 Electron/Tauri：桌面壳与原生权限边界

为Nuxt发布产物写桌面封装可行性与权限草案，保持主Web发布独立；当前仓库没有桌面打包验收。

验收：

- [ ] 区分页面、桥、核心三层权限；输入/来源/文件范围验证位置具体。
- [ ] 说明静态前端与SSR后端如何部署，列出签名/更新/系统测试尚需验证的项目。

[理论](../../1-notes/07-deployment/7.3-advanced-preview/7.3.5.electron.md) · [示例](../../2-examples/07-deployment/7.3-advanced-preview/7.3.5.electron-demo.md) · [独立练习](../../3-exercises/07-deployment/7.3-advanced-preview/7.3.5.electron.md)

<a id="p-7-3-6"></a>

## 7.3.6 React Native Web/Expo Web：复用边界与平台行为

比较Nuxt双宿主与RNW方案的团队/产品约束，输出适配清单；当前主目录保持Vue/Nuxt，不声称已实现Expo替代宿主。

验收：

- [ ] 共享模型与UI适配分别列明，保留真实href/键盘/可见焦点等Web行为。
- [ ] 说明原生依赖不会被Web构建静态导入；验证矩阵区分浏览器、SSR与原生设备。

[理论](../../1-notes/07-deployment/7.3-advanced-preview/7.3.6.react-native-web.md) · [示例](../../2-examples/07-deployment/7.3-advanced-preview/7.3.6.react-native-web-demo.md) · [独立练习](../../3-exercises/07-deployment/7.3-advanced-preview/7.3.6.react-native-web.md)

<a id="p-7-3-7"></a>

## 7.3.7 数据可视化：原生SVG基础与D3/ECharts/Chart.js取舍

在Nuxt发布演练副本展示构建/检查的合成数据，先保留HTML表格；按真实交互需要决定是否添加图库，不把合成工时当生产测量。

验收：

- [ ] 数据校验拒绝NaN/Infinity/负值/越界，图形与文字使用同一份有效数据。
- [ ] 有明确单位、等价表格和图像名称，窄屏可读，不依赖颜色辨识数值。

[理论](../../1-notes/07-deployment/7.3-advanced-preview/7.3.7.d3.js.md) · [示例](../../2-examples/07-deployment/7.3-advanced-preview/7.3.7.d3.js-demo.md) · [独立练习](../../3-exercises/07-deployment/7.3-advanced-preview/7.3.7.d3.js.md)

<a id="p-7-3-8"></a>

## 7.3.8 富文本编辑：文档模型、Schema与安全输出

为Nuxt目录副本写课程备注编辑器对接设计和威胁/验收清单；当前主工程未集成完整编辑器，若实施须另做组件与实际浏览器验证。

验收：

- [ ] 区分编辑器schema、存储验证、展示安全和资源授权，不能把schema称通用净化器。
- [ ] 保存含格式版本/revision，失败不丢未保存输入；测试含IME、粘贴、撤销和不可信URL。

[理论](../../1-notes/07-deployment/7.3-advanced-preview/7.3.8.prosemirror-slate-tiptap.md) · [示例](../../2-examples/07-deployment/7.3-advanced-preview/7.3.8.prosemirror-slate-tiptap-demo.md) · [独立练习](../../3-exercises/07-deployment/7.3-advanced-preview/7.3.8.prosemirror-slate-tiptap.md)

<a id="p-7-3-9"></a>

## 7.3.9 低代码原理：Schema白名单、渲染器与版本迁移

在独立lab新增受限notice并验证迁移；给主Nuxt发布流程设计schema/渲染器兼容与回滚清单，不称现有课程页已是低代码平台。

验收：

- [ ] 未知节点/字段/tone/超长输入在改DOM前拒绝，错误不会半渲染；已有内容仍可读。
- [ ] 文本中的标签保持文字，版本不支持有明确提示；服务端授权不依靠schema隐藏按钮。

[理论](../../1-notes/07-deployment/7.3-advanced-preview/7.3.9.item-7-3-9.md) · [示例](../../2-examples/07-deployment/7.3-advanced-preview/7.3.9.item-7-3-9-demo.md) · [独立练习](../../3-exercises/07-deployment/7.3-advanced-preview/7.3.9.item-7-3-9.md)

<a id="p-7-4-1"></a>

## 7.4.1 阅读官方文档与RFC：区分规范、实现和项目决定

把“Nuxt项目只上传public就能运行所有server/api”作为待证伪命题，使用静态profile验证。

验收：

- [ ] SSG里没有可执行的Node接口；API404不能用SPA HTML200伪装。
- [ ] 说明文档日期、Nuxt版本和实测命令，引用原始来源而非AI总结。

[理论](../../1-notes/07-deployment/7.4-soft-skills/7.4.1.rfc.md) · [示例](../../2-examples/07-deployment/7.4-soft-skills/7.4.1.rfc-demo.md) · [独立练习](../../3-exercises/07-deployment/7.4-soft-skills/7.4.1.rfc.md)

<a id="p-7-4-2"></a>

## 7.4.2 需求与技术方案：先写可验收行为再选部署profile

新增“产品每5分钟更新、没有Node预算、需个人账号”的约束组合，写两种方案与降级范围。

验收：

- [ ] 对每个需求给一个实际URL/状态或可观察结果，不只写高性能。
- [ ] 明确API来源/身份/缓存及静态限制，有回滚触发条件。

[理论](../../1-notes/07-deployment/7.4-soft-skills/7.4.2.item-7-4-2.md) · [示例](../../2-examples/07-deployment/7.4-soft-skills/7.4.2.item-7-4-2-demo.md) · [独立练习](../../3-exercises/07-deployment/7.4-soft-skills/7.4.2.item-7-4-2.md)

<a id="p-7-4-3"></a>

## 7.4.3 代码评审：从请求与失败路径检查交付

在隔离副本把/account整个rule替换为{swr:60,prerender:false}，重新build并重启后比较Alice/Bob/匿名响应、Cookie转发与缓存头；记录实际缓存/旁路行为，不预言必然泄露。另把静态所有缺失资源回退index，稳定复现缺JS/API被HTML200掩盖；写具体评审并恢复原规则。

验收：

- [ ] 并发alice/bob测试不能交叉出现，响应仍private/no-store。
- [ ] 缺JS/API返回404与合适类型，修复后保留失败回归。

[理论](../../1-notes/07-deployment/7.4-soft-skills/7.4.3.code-review.md) · [示例](../../2-examples/07-deployment/7.4-soft-skills/7.4.3.code-review-demo.md) · [独立练习](../../3-exercises/07-deployment/7.4-soft-skills/7.4.3.code-review.md)

<a id="p-7-4-4"></a>

## 7.4.4 技术债与渐进重构：保留行为和恢复路径

把课程数据从数组换成只读索引，保持顺序/未知slug/详情语义；写一条迁移债务记录。

验收：

- [ ] 三个profile的深链与缺失行为保持原契约。
- [ ] 说明回退时旧URL/资源/配置如何兼容，未执行的数据库迁移明确不涉及。

[理论](../../1-notes/07-deployment/7.4-soft-skills/7.4.4.item-7-4-4.md) · [示例](../../2-examples/07-deployment/7.4-soft-skills/7.4.4.item-7-4-4-demo.md) · [独立练习](../../3-exercises/07-deployment/7.4-soft-skills/7.4.4.item-7-4-4.md)

<a id="p-7-4-5"></a>

## 7.4.5 前后端与设计协作：对齐接口、状态和交互验收

设计一个健康接口503时的用户文案与运维动作，补接口样例及宽窄键盘状态；不向外部团队发送消息。

验收：

- [ ] HTTP错误/业务错误/网络中断分别有明确负责层和重试条件。
- [ ] 说明“选fixture非认证”、不缓存私有资料、无真实凭据；设计有非颜色提示。

[理论](../../1-notes/07-deployment/7.4-soft-skills/7.4.5.item-7-4-5.md) · [示例](../../2-examples/07-deployment/7.4-soft-skills/7.4.5.item-7-4-5-demo.md) · [独立练习](../../3-exercises/07-deployment/7.4-soft-skills/7.4.5.item-7-4-5.md)

<a id="p-7-4-6"></a>

## 7.4.6 交付文档：README、CHANGELOG与API契约

给没有聊天记录的同事写一页SSG交接：从安装到直接访问详情/404，再到回滚和限制。

验收：

- [ ] 命令可复现、环境和输出目录明确；不依赖全局旧版本或隐藏文件。
- [ ] 变更说明包含兼容影响与恢复，接口例子与真实返回一致，秘密只写占位。

[理论](../../1-notes/07-deployment/7.4-soft-skills/7.4.6.readme-changelog-api.md) · [示例](../../2-examples/07-deployment/7.4-soft-skills/7.4.6.readme-changelog-api-demo.md) · [独立练习](../../3-exercises/07-deployment/7.4-soft-skills/7.4.6.readme-changelog-api.md)
