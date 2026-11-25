# 第14阶段14.3逐点编写与审查

日期：2026-11-25。责任范围：14.3.1–14.3.5；未修改共享索引、主项目和检查器。

## 范围与来源核对

先阅读总则与四部分契约。MWG security正文影响Cookie属性和凭据传播；MWG out-of-order-html-streaming明确volatile，本轮不引入。Nuxt4官方server目录、state、data fetching、useRequestFetch正文已读取；Next官方Server/Client Components用于选修观察。官方server旧guide路径404，已改用实际directory-structure/server。

现有规划无须新增编号。把请求隔离、动态缓存、上游目标/头白名单、取消与已发头错误纳入既有知识点，不把Next作为主线前置。

## 逐点与四部分核对

| 点 | 理论/示例 | 练习/综合任务 | 审查结论 |
| --- | --- | --- | --- |
|14.3.1|Next RSC/Client与初次预渲染、HTTP Route Handler边界；官方观察非运行项目|改换props泄漏场景，静态图可验；综合案例在points JSON，主集成tasks|通过：未声称安装Next，输出保密与代码位置分开|
|14.3.2|模块作用域与请求局部；真实Node闸门模型；已查主Nitro context/state/config代码|可控交错复现currentUser串线；主双会话隔离检查|通过：内存Session共享与当前用户状态分开，主框架运行证据由集成记录|
|14.3.3|数据依赖、payload与hydration；真实启动闸门断言；读主allSettled聚合|故意串行并用started定位，身份依赖不可抢跑|通过：调度测试不依赖抖动时间阈值，Promise.all不自动取消|
|14.3.4|本地SSR与外部上游两跳；主固定origin/显式授权实际代码|注入入站Cookie/Authorization/代理头检查额外传播|通过：fixture不是生产认证，Secure本地例外明确|
|14.3.5|NDJSON与框架组件stream区分；真实首块、503、200+error、断开清理|新增拆行消费者和done缺失处理，未声称已有UI|通过：协议业务成功与HTTP状态分开，浏览器消费者列新增|

## R01–R09

R01五点均有理论、代码/观察、练习与逐点综合案例映射；共享tasks由主集成。R02推荐顺序2→3→4→5，Next选修；前置明确。R03核对官方机制和实际主代码，示意authenticate明确非现有函数。R04 Node六测真实通过，Next仅观察。R05每题有至少两项标准、可复现故障和修复判据。R06综合案例针对主BFF或新增扩展，未假设已有浏览器stream客户端。R07术语和路径已交叉检查；本地HTTP与生产HTTPS分开。R08初次loopback EPERM后在授权的回环权限下重跑六测通过，服务器自动关闭，无持久后台进程。R09points/runtime记录含实际/未测范围；全阶段契约、指纹和进度由主完成后复核。

## 实际验证与限制

在runtime-lab运行node --test test.mjs：6 passed，0 failed，Node26.0.0，约352ms。真实HTTP仅127.0.0.1随机端口；未测生产代理/CDN、Nuxt组件HTML streaming、Next运行、多引擎/真机/读屏。Node请求作用域模型不冒充Nuxt集成；主项目真实框架构建和HTTP/SSR结果以主代理验收记录为准。

没有未关闭的本分组必达缺陷；全阶段最终结论仍需共享tasks生成、主项目执行和总门禁。
