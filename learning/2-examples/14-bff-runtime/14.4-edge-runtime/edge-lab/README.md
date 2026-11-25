# Edge 策略实验：本地 Web API，不冒充云部署

前置：14.1、14.2，随后按14.4.1→14.4.5阅读。产出是一个可测试的处理策略、受信来源说明、存储与缓存选型记录；主 Nuxt 仍采用 Node/Nitro。无需安装云CLI或启动服务器，无第三方依赖、无真实凭据、无外网请求。

从仓库根目录运行，Node26：

~~~bash
node --test learning/2-examples/14-bff-runtime/14.4-edge-runtime/edge-lab/policy.test.mjs
~~~

也可进入本目录执行 node --test policy.test.mjs。正常10项通过。Request URL为https://local.invalid，仅构造对象，没有连接该地址。

| 编号 | 实现与真实观察 |
| --- | --- |
| 14.4.1 | createHandler使用Request/Response，目录JSON可解析；不证明Node模块在Workers兼容 |
| 14.4.2 | 固定/catalog、/private，未知路径404，非GET405，不接受代理目标URL |
| 14.4.3 | resolveSession注入固定fixture表，伪造身份Header401；A/B姓名隔离，Geo回调不读客户端x-country，散列桶稳定 |
| 14.4.4 | 两位置Map模型明确演示旧读，刷新前旧值、刷新后新值；不是真实KV/D1 |
| 14.4.5 | 注入时钟区分fresh/stale/expired，真实Promise后台刷新/同键合并、有限条目、语言键、凭据绕过 |

## 代码如何阅读

先读policy.test.mjs的输入和断言，再追policy.mjs中的对应函数。resolveSession是依赖边界，测试用Cookie精确固定值查表，不进行真实身份认证；Cookie解析故意简化。trustedCountry回调代表未来平台适配器需提供的受信信息，示例没有真实Geo定位。chooseVariant仅返回分组，不改变权限。

createPublicCache缓存的是合成公开JSON值，无用户字段。条目数有上限，pending合并仅同键；真实生产还需上游截止时间、请求速率/并发限额、缓存容量预算和生命周期保证。后台刷新失败时保留旧值到原窗口结束，不重新延长时间戳；过期请求失败由调用方处理，不能假装云端已有自动恢复。

## 云平台观察核对卡（尚未执行）

1. 固定目标平台、Nuxt/Nitro版本和compatibility_date，核对对应preset与当前Node API支持；逐个审查原生模块和持久化假设。
2. 明确代码入口、env绑定、密钥、可信身份/Geo来源；客户端同名Header不被当受信元数据。没有真实绑定时保持未验证。
3. 构建目标平台产物，再在真实预览路由检查状态、Header、身份隔离和失败。部署或外部请求需要真实账号及后续授权，不是运行此实验的一部分。
4. KV记录最终一致与负缓存影响；D1记录参数绑定、batch事务范围和读副本Sessions；Global Config记录读多写少、配置暴露范围与更新责任。
5. 在真实缓存层核对缓存键、Cookie/Authorization/Set-Cookie、失效和错误；Cloudflare Cache API的cache.put/match不支持stale-while-revalidate/stale-if-error，不能只写Header就声称自动刷新已生效。
6. 最后做代表性端到端基准和回滚演练，区分用户到函数与函数到数据源延迟；本实验未测冷启动、真实多区域、配额或生产吞吐。

[返回阶段示例](../../README.md) · [Edge 理论入口](../../../../1-notes/14-bff-runtime/14.4-edge-runtime/README.md)
