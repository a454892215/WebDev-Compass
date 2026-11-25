# 阶段5.1/5.4请求与数据：逐点质量审查

日期2026-11-25；子任务开始06:52:54 UTC。范围13点（5.1原6点+新增5.1.7，5.4原6点）。依据AUTHORING版本1的R01–R09。分组完成不替代主代理的全阶段集成验收。

## 规划与递进

现有规划覆盖读取、取消、上传、文档、mock、环境及DTO/分页/错误/选修协议；明显缺口是安全重试与写入结果不确定性，独立新增5.1.7合适。其余细节补入既有条目：稳定排序tie-break、重复query/边界、上传总量/文件量、MIME不可盲信、HTTP与JSON/结构错误分层。没有为了数量新增多个重叠工具。

推荐：5.1.1与5.4.1先建立读取/解码→5.1.2生命周期→5.4.2分页→5.1.3/5.4.3上传→5.1.4文档与5.4.4错误→5.1.5 mock/5.1.6环境→5.1.7重试；GraphQL/grpc-web两点为观察型选修，不阻塞Vue/Nuxt主线。先修为阶段2异步/HTTP、阶段3TS、阶段4框架。

## 逐点核对

| 编号 | 机制/实际实验 | 独立故障与综合边界 |
| --- | --- | --- |
| 5.1.1 | fetch404不自动reject；HTTP、Content-Type、parse、schema、204真实分层 | 删ok检查导致错误分类，恢复原status；Nuxt读取与提交生命周期不同，Axios未强装 |
| 5.1.2 | 真实AbortError/TimeoutError；deferred旧loader忽略abort仍不覆盖，清空/dispose无回写 | 删除代次guard重现A覆盖B；取消不等于服务器回滚，Nuxt请求由主工程另验 |
| 5.1.3 | 浏览器XHR实际上传progress100+最终201、超限413；Blob实际下载sample.txt且读取完成文件内容 | 手写multipart头漏boundary400；对象URL替换/离开释放，进度不当保存成功 |
| 5.1.4 | 本地OpenAPI3.1.1参数/响应/上传规范+真实size99→400 | 文档范围与实现漂移，用实际请求暴露；只是已知不变量检查，非完整验证器 |
| 5.1.5 | 真正loopback HTTP mock生成坏JSON/慢响应/429，不是伪终端 | 错误fixture改200应让测试失败；未注册MSW/Service Worker，不声称其生命周期实测 |
| 5.1.6 | URL解析allowlist拒绝未知origin与逃逸绝对URL，未实际访问.invalid | 错环境先阻止请求，不关浏览器安全；Nuxt配置公私/SSR凭据由主工程处理 |
| 5.1.7 | 429第二次成功，持续503最多3次，Retry-After120超预算只一次，403不重试，POST策略拒绝 | key/body重放同id/冲突409；内存无用户无持久事务的示例不当生产幂等服务 |
| 5.4.1 | unknown逐字段检查/唯一id与DTO新对象；HTTP错误结构实际读取后拒绝 | as断言不能验证；与Nuxt带owner/version的DTO不同，未混淆两套协议 |
| 5.4.2 | 固定fixture offset跨页5个唯一id，title并列按id；size/重复参数400、越界空页 | 稳定排序不保证动态数据快照；副本新增筛选须重置页码 |
| 5.4.3 | 合法文件201、单文件和总multipart超限413、伪装文本NUL415、漏boundary400 | 不存盘/不执行/不声称恶意扫描；独立lab阈值不同于Nuxt协议，分别明确 |
| 5.4.4 | HTTP状态与可选包壳分清，204不读JSON、403不刷新绕权、409不是认证失败 | 消息/诊断分离；综合由真实API状态制定恢复，不一律code/data/message |
| 5.4.5 | 本地query与data/errors样本及官方HTTP观察清单 | HTTP成功仍可能局部字段null；未安装GraphQL执行器，未伪造执行证据 |
| 5.4.6 | 本地.proto+官方gRPC-Web代理/媒体类型/RPC状态观察 | 字段编号兼容与浏览器限制清楚；无protoc/Envoy/后端或双向流实装声明 |

更具体理论、示例、练习与综合任务建议见[逐点JSON](./stage-5-requests-data-points.json)。13份独立练习都有动手、至少2条标准、具体故障和参考；综合建议分别位于两组integration-cases.json，最终以主代理tasks.md为准。

## 实际运行

Node26.0.0、pnpm11.4.0，HTTP lab零第三方运行依赖，空依赖锁文件离线冻结安装通过。pnpm11专有设置在YAML，不创建失效.npmrc或改全局策略。

`pnpm check`运行语法与9组测试（多断言），真实监听随机loopback端口；HTTP状态/解析/解码、取消超时、受控竞态、分页、multipart/Blob、预算与次数、key契约、URL及OpenAPI局部检查均通过。`pnpm test:browser`使用阶段4已安装Playwright工具和本机后台Chrome，390/1440两组实际流程通过；查询/空态、XHR进度、服务端最终响应/413、blob:下载、无横向溢出/pageerror。GraphQL/gRPC-Web未运行，OpenAPI非全规范校验器；这些边界在操作卡明确。

初次sandbox listen EPERM按权限流程重跑，未把环境限制当机制失败；复用Playwright时修正CJS/ESM导出适配，随后实际浏览器通过。补强了实际HTTP错结构解码、持续503的3次上限和总multipart限额验证。所有自建服务/浏览器在finally关闭，未stage/commit。

## R01–R09与未测范围

R01共13唯一编号且三部分及综合建议齐全；R02按错误分层→生命周期→协议→恢复递进；R03先读MWG Forms/Security，再查MDN Fetch/XHR/FormData、Nuxt配置、RFC9110、OpenAPI、MSW及GraphQL/gRPC官方；R04真实运行和观察清单分开；R05独立变体/故障/标准具体；R06不虚构Nuxt已有功能，主工程会话和上传阈值按实际源码协议；R07源码/命令/正文核对；R08发现均关闭；R09编写/实测/学习掌握分开。公共索引、完整任务及阶段门禁由主代理集成。

未测：真实业务后台/生产认证、MSW注册、GraphQL/gRPC执行、生产幂等事务/持久化与用户绑定、病毒扫描/对象存储、真机、多浏览器、真实学习者试学。Node fetch不当浏览器CORS证明，XHR传输100%不当服务端保存。

[运行JSON](./stage-5-requests-data-runtime.json)记录具体结果和限制。主工程的Nuxt身份/SSR/授权由主代理另验，不能用本组无身份fixture结果替代。
