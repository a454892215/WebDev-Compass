# 阶段8.3渲染与8.5 BFF逐点编写审查

2026-11-25，本组开始09:23:09 UTC。范围13点：8.3七点、8.5六点；保持原编号、路径。按AUTHORING版本1 R01–R09，先核对业务约束，再机制、最小观察、独立变体、综合任务。不重复安装另一套Nuxt或把选修框架设为主线门槛。

## 规划与递进

没有需要新增编号的明显缺口。失败预算/超时取消/必要与可选依赖补入8.5.1，固定目标与SSRF边界补8.5.2，结构化Deprecation日期/兼容窗口补8.5.4。渲染以身份、时效和运行时为先，性能不能只凭TTFB/框架名字保证。

| 编号 | 核对的机制、四部分与具体边界 |
| --- | --- |
| 8.3.1 | CSR/SSR/SSG与托管维度、ISR平台和流式边界；比较官方模型与阶段7历史产物，不冒称重跑三profile或真实Streaming。 |
| 8.3.2 | RSC非SSR同义词，Client props可见，Server Functions入口需验证/授权；React19.3官方观察，未安装。 |
| 8.3.3 | Astro岛、Vue延迟接管、React选择接管机制不互换；关键交互/静态fallback与跨岛状态明确；无Astro实装声明。 |
| 8.3.4 | 首次输入/DOM一致、payload/客户端API、mounted后更新；主工程没有视口显示，练习明确副本先新增再造错。 |
| 8.3.5 | 请求作用域/公开payload/可序列化DTO/缓存与key不同；main scope为公开fixture，非真实身份认证。 |
| 8.3.6 | Edge计算位置不等于数据位置，Node兼容/时限/一致性/驻留成本；具体平台官方观察，未部署/测地区速度。 |
| 8.3.7 | 决策树有身份、时效、路由/托管、至少两备选和可推翻条件；不虚构测试预算数值。 |
| 8.5.1 | 真实lab必要502/504、可选200 degraded/null/warning、80ms总deadline与取消；主Nuxt进程内adapter和真实HTTP lab分开。 |
| 8.5.2 | BFF收益抵偿运维成本；固定上游、禁跳转、未知url400不发请求，不变任意URL代理、不绕过后端授权。 |
| 8.5.3 | GraphQL data/errors/200部分结果与REST降级对照、权限/N+1/复杂度；官方观察，不冒称运行GraphQL服务。 |
| 8.5.4 | v1/v2兼容与窗口；Deprecation按RFC9745结构日期@秒，Sunset按HTTP-date；实验真实取头，不称已经关闭真实旧版本。 |
| 8.5.5 | unknown运行校验、显式白名单、null/0/缺失、UTC秒精度日期范围；内部字段移除和2月30日拒绝真实测试。 |
| 8.5.6 | 客户端adapter、gateway、BFF、业务服务职责/信任位置；UI独立不自动要求复制权限与后端，main公开fixture不当真实租户认证。 |

每点理论/操作卡/独立练习有具体不同变体、至少两项标准、故障和参考；两个integration-cases.json有13项综合建议。真实实现/副本新增/官方观察分别注明，不把每一练习故障注入说成本轮作者已运行。

## 主Nuxt源码复核

读取main nuxt.config、server/api/workspace、loadWorkspace、domain ports/infra fixture、shared/contracts、首页与catalogueView。主项目确为Node SSR、禁止缓存/预渲染、合成scope验证、Promise.allSettled进程内适配、必要DTO校验/映射、可选null/warnings、useAsyncData及scope key。没有HTTP上游deadline、生产授权、GraphQL/RSC或Edge实现，不把独立lab的能力写到主项目。

shared公开DTO与原始上游分开，internal_note只在服务端fixture；作用域从当前请求解析、未把lastUser放进模块全局。现有必要失败应用测试和optional null vs0测试可核读；真实共享build/HTTP/browser最终证据已核读，相关5点已关闭；本组不冒称亲自重复运行主项目。

## 独立lab实际验证

Node26.0.0，无第三方npm依赖。node --check与两组node --test通过：DTO形状/允许字段/null/非法日期含2026-02-30；真实HTTP聚合、四并发fixture、degraded与必要错误、deadline导致上游close、v1/v2/header、未知target输入不发上游、405。默认沙盒阻止loopback EPERM后按已有授权执行成功。日期往返校验与可读格式调整后已复验这两组。

固定BFF4514，上游随机loopback端口；finally关闭两服务、清理未完成定时器，不访问其他内部或外部服务。没有浏览器UI需要重复截图/axe；80ms只为可控fixture策略，不是业务P95。响应大小/流式压缩保护、生产网络出口、日志平台和真实权限仍未实现，README明确边界。

## R01–R09与来源

R01十三编号/三部分/综合建议完整；R02先约束后机制，官方观察不强装；R03先MWG性能/安全正文再Nuxt、React、Astro、Cloudflare、OWASP、GraphQL、RFC9745/8594、TS/MDN和Azure BFF原文；R04独立HTTP真实通过、共享main已核读真实结果；R05具体变体及故障可定位；R06主/独立/新增能力分清；R07术语/返回/null/日期/作用域前后一致；R08独立及共享必要证据已齐；R09不冒称真实生产/真机/学习掌握。

MWG no-store/bfcache绝对表述继续以阶段6更具体Chrome事实为准；本组不重复该过时断言。Azure页面有登录提示但正文可读，不把提示当内容不可获得。React当前官方Server Functions/Actions名称区分，Nuxt基线行为最终以实际4.7源码和构建为准。

无ISR平台、流式代理、Edge部署、RSC/Astro/GraphQL安装、生产用户/权限、真机、真实辅助技术或学习者试学。本分组不替代全阶段主审/契约/进度/提交。

## 主项目最终证据核读

已实读主代理保存的build/type/lint/unit/boundaries/e2e日志、两spec及最终原始JSON（5expected/0unexpected/0skipped/0flaky），并核对实际RFC/ADR/NFR/架构图。9项unit、18显式本地边/0错误、生产Node SSR构建、5项HTTP+两视口流程通过；具体断言和执行/核读归属见runtime。四并发不同scope、no-store/内部字段剔除、optional null与警示、非法400/缺失404、初始0重复API、URL/状态/标题/reload与键盘axe有实测证据。

初次测试中两项失败由主代理确认是点击搜索后测试立即reload旧URL，补toHaveURL等待路由后最终5项通过；本组读最终源码与结果，不把测试等待修正说成业务安全修复。阶段7三种profile只按2026-11-25既有记录来源复用，未重跑；Streaming/ISR/Edge/RSC/Astro/GraphQL未安装或未部署的边界保持不变。13点现均passed，无本组必达遗留。
