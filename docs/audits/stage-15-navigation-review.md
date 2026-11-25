# 15.6.1–15.6.4逐点与实验审查

核对2026-11-25。四点理论→操作卡→独立变体→综合任务数据均已逐点审阅，稳定编号/路径与地图相符；主代理统一写共享索引和综合tasks。默认Vue/Nuxt主线不要求引入这些可选能力。已读取主实践app/app.vue，确认NuxtLink/NuxtPage/NuxtRouteAnnouncer实际存在，所以保持框架路由owner；没有借此声称主已接Navigation API或原生转场。

| 点 | 原理/示例/练习/综合任务的对应结论 |
| --- | --- |
| 15.6.1 | 原生ViewTransition实测，与DOM更新/路由/焦点区分；唯一name、finished后焦点、减弱动画和forced fallback均清晰；列表卡片为学习者新增，不声称lab已有列表。 |
| 15.6.2 | 真实同文档Navigation拦截、marker、标题和后退；筛选canIntercept/同源/path/hash/download/formData，深链服务可响应；Nuxt集成为取舍评审，不重复注册路由器。 |
| 15.6.3 | 真实OPFS写/close/读/finally删唯一fixture，断言无该前缀残留；不清空用户存储。配额/持久/站点清理与专用Worker同步句柄边界准确；版本草稿和失败恢复为新增。 |
| 15.6.4 | 真实双RTCPeerConnection/SDP/ICE/DataChannel收发和关闭，不是消息模型；本地交换不是远端信令服务，音视频/STUN/TURN/公网未测。消息缓冲/权限/媒体轨道作为具体扩展。 |

## 发现与修复

- 最初只允许/nav/one与/nav/two，漏了初始/，后退没有重新渲染初始视图；加入/，并以同文档marker和实际标题验证前进/返回。保留缺陷暴露的用例，不只等URL。最初立即读取goBack后的DOM也不应当作导航完成，现等待明确标题条件。
- HTML原来根相对路由/模块会被仓库离线检查按仓库根解析；本lab明确以固定loopback绝对URL表达实际服务器路由与模块，真实浏览器测试负责该链路，未修改全库检查器或造虚假磁盘路由文件。
- 浏览器启动失败时也关闭实验HTTP服务；测试成功路径与finally关闭均已复核。所有生成文件仅dist，未提交浏览器产物。

## 依据与验证

先检索并读取MWG same-document-transitions、安全和隐私正文；转场采用特性检测、内容回退、唯一命名、减弱动画和焦点落点，DOM输出采用textContent，不采集实际用户文件/媒体。尝试platform/navigation路径未读到有效指南，Navigation/OPFS/WebRTC细节转MDN/平台文档核对，不编造不存在的MWG内容。

本轮Chrome158.0.8127.37 / Node26.0.0 / Playwright1.65.1，7组行为断言通过，pageerror为空；详见[运行记录](./stage-15-navigation-runtime.json)。只本地单引擎后台浏览器，无真机/读屏/用户试学、生产CDN、真实媒体权限、STUN/TURN、远端音视频或Nuxt集成。
