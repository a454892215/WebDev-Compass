# 阶段5.2认证与授权：逐点审查

日期2026-11-25；子任务开始06:53:13 UTC。范围为原8点与新增5.2.9，共9点；依据AUTHORING版本1 R01–R09。本组内容/独立JWT与共享Nuxt证据已审查通过；共享运行由主代理执行，本组核读，不把分组完成代替全阶段集成。

## 规划与教学顺序

新增5.2.9是明确缺口：阶段4每请求状态不等于SSR恢复服务器会话，需要单独核对当前请求Cookie转发、payload DTO和私有缓存。其他必要细节补已有点：登录轮换/撤销/过期与CSRF、同角色对象所有权、并发刷新与退出代次、OAuth/OIDC分工、SSO退出范围。

推荐先Session→会话恢复→对象权限→Nuxt SSR；JWT/Bearer、OAuth/SSO按服务端契约选读，不强制把Cookie教学应用改成JWT系统。代码片段明确页面/协议/真实lab上下文，完整实现与操作卡相互对应。

| 编号 | 逐点内容、练习与证据 |
| --- | --- |
| 5.2.1 | opaque Session、Cookie属性、登录轮换、过期/撤销、Origin和会话绑定CSRF；旧Cookie重放/仅删UI故障。本地HTTP Secure=false不是生产建议。 |
| 5.2.2 | JWT与OAuth分工、签名非加密、access/refresh角色、算法/iss/aud/time/type策略；真实jose签验和拒绝反例，不把解码当认证。 |
| 5.2.3 | 匿名/恢复中/成功/失效/失败、Cookie恢复不默认存token；真实受控Promise单飞、退出迟到拦截、独立协调器；不冒称真实refresh服务器。 |
| 5.2.4 | Bearer不一定JWT、解析与验证两步、header/URL/日志及CORS边界；真实合法/多凭证/错误scheme/控制字符检查。 |
| 5.2.5 | OAuth授权、OIDC身份、本应用会话分工；Code+PKCE/S256、事务/redirect/issuer与适用state/nonce；官方观察清单，不接真实提供方。 |
| 5.2.6 | A/B/IdP三会话、issuer+subject、Cookie域及本地/IdP/全应用退出矩阵；官方协议观察，不把单应用logout称SSO。 |
| 5.2.7 | 客户端反馈非服务器授权；role加owner，匿名/owner/同角色非owner/admin反例；纯策略实际通过，HTTP集成由主项目另验。 |
| 5.2.8 | Web Storage脚本可读、HttpOnly不可直接读但仍自动发送、memory与移动OS存储差异；教学值观察后清理，不运行Dart/原生存储。 |
| 5.2.9 | 相对useFetch/useRequestFetch当前请求转发、absolute不自动带headers、无SetCookie自动回程假设、payload不含sid、no-store与缓存隔离；双用户SSR故障与修正任务。 |

更具体的四部分路径和事实见stage-5-auth-points.json。9份独立练习均有动手、至少2项标准、具体复现故障和参考；integration-cases.json提供综合建议，最终项目事实和锚点由主代理集成。

## 本组实际运行

固定jose6.2.18、pnpm11.4.0，本轮Node26.0.0。通过官方npm registry核对版本，安装固定锁、冻结离线安装、node语法及pnpm check通过16组。密钥在WebCrypto进程中生成，不持久化、不输出token或私钥。

正反例包括真实RS256签验、篡改role、错key、exp/nbf/iss/aud/typ/alg/maxTokenAge/缺必要exp拒绝；Bearer解析、owner与admin策略；三并发refresh同实例单飞、退出后迟到结果拒绝、两实例不共享pending。详细结果存stage-5-auth-runtime.json。每组可含多个断言，不包装成学习掌握率。

## 综合工程源码复核与共享运行

已读server/utils/session-store.ts、auth.ts、login/logout/session/bootstrap、私有响应中间件和页面。会话随机32字节、不把body角色当身份；固定Origin、当前session绑定CSRF；登录轮换旧sid；GET session只返回user/CSRF DTO，不创建/回传SetCookie；bootstrap在浏览器建立匿名会话；进程内后端Map有容量/TTL限制，明确不等于Vue顶层用户ref。Cookie本地配置与生产限制明确。

已向主审反馈：同key session useFetch应保持默认选项一致；异步笔记请求不能仅靠账号字符串判断代次，退出后同账号重登仍可能相同，应加session epoch/CSRF比较。主代理已新增useLabSession统一默认factory，并给笔记异步handler加入epoch/CSRF/账号三重比较（包括catch），源码复核确认这两项已关闭；admin响应又加明确stage5-admin key并在forget清理，均已读源码确认。

已核读主代理首轮E2E原始JSON/日志：4项通过（协议、SSR两用户/匿名、两视口过期恢复），2项完整UI在搜索的多元素strict locator处中断；Cookie存在/HttpOnly/Lax及脚本不可读在中断前已通过。随后读取/tmp/webdev-stage5-e2e-ui.log和当前JSON：两视口目标UI2项均通过，覆盖后续上传、下载、SSR刷新、错误结构恢复和退出。修正是将动态列表标量strict断言改为数组内容可重试断言，没有更改产品代码。最终6个逻辑测试均有通过证据（首轮4项+专项续验2项），不称首次全套6pass；共享运行由主代理执行，本组只读取证据。OAuth/SSO无真实提供方、无真机/多浏览器/生产HTTPS与真实密码验证。OAuth/SSO的观察类型和本地HTTP/临时后端边界均明确；无本组未关闭必达问题。最终阶段索引、综合映射、门禁与提交仍由主代理集成。

## 官方依据

先检索并读MWG Security与Forms正文，采用Cookie属性、原生表单和明确反馈；其余细节读取MDN Cookie/Authorization/Web Storage、OWASP Session/CSRF/Authorization、RFC7519/8725/6750/9700、OIDC Core与RP-Initiated Logout、Nuxt数据获取/useRequestFetch等官方正文。确切链接在逐点笔记及OAuth/SSO观察清单。useRequestFetch当前只向以/开头路径转发header，absolute同应用URL也不自动携带；没有把训练知识冒充本次查询。

## R01–R09与收尾

9点编号及三部分正文/操作卡/练习、9项综合建议齐全；前置/顺序与按契约选读明确；官方来源、版本与机制核对；真实密码学和HTTP/SSR/浏览器证据与观察类型分开；练习变体、至少两项标准、故障/参考具体；综合已有与扩展明确；session查询200 user:null与受保护API401、Cookie/JWT/SSO边界一致；源码及测试发现已关闭；正文/质量/学习者掌握独立。运行不存在真实提供方、真机或生产认证声明。

本组MD链接/映射9点核对通过（公共README/tasks由主代理集成），Node语法及冻结离线安装通过；MJS格式整理未改变行为。未暂存/提交，也未启动自建HTTP服务，交主代理统一最终验收。

## 主审最终集成补充

主审在最终日志检查发现超限请求提前结束默认Node异步迭代会销毁socket，虽HTTP413断言过但Nitro出现未捕获异常；未据此提前验收。共用读取器改为destroyOnReturn:false并排空未缓冲请求，加入uncaughtExceptionMonitor与teardown。修复后重新类型/lint/13单元/build及最终完整6项E2E全部通过，服务端异常日志0字节；最新结果以stage-5-practice-runtime.json为准。上文首轮4+专项2仍是历史执行记录，不冒充最后一次结果。
