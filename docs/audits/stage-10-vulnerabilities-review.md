# 阶段10.2漏洞防护八点逐点审查

2026-11-25，开始10:01:22 UTC。按AUTHORING规则版本1，保留8点旧路径；只负责本组和独立lab，不替代主Nuxt/全阶段验收。

## 规划与递进

阶段5/6已有Cookie、CSRF、XSS/CSP基础，本组深化解析/信任/签名绑定与失败证据。先输出上下文和CSP，再会话写入/嵌入、导航/结构、字节完整性与消息。没有新增编号或安装全套攻击工具。

- 10.2.1：DOMPurify3.5.0官方registry核对，p/b/em无属性与SANITIZE_NAMED_PROPS；实际文本、净化、再解析与无害named元素对照。保留b无img/script/form/input，未执行onerror。不是全部mXSS或模板引擎防护认证。
- 10.2.2：CSPRNG每响应nonce，仅显式开发者模板脚本拿nonce；可信执行/非nonce拒绝，report-only明确仍执行。MWG禁止对渲染后HTML用regex给全部script授权，已提醒主代理使用框架集成。本lab无Trusted Types强制，report-uri兼容演示不冒充report-to生产投递。
- 10.2.3：HMAC绑定sid与随机nonce、header/cookie相等、精确Origin；真实合法200/缺token403/错origin403/跨源no-cors简单写不变，Node跨sid重放失败。匿名会话、HTTP Secure=false、不同端口同站均明确，不叫真实登录或跨站HTTPS验证。
- 10.2.4：实际跨源父页受保护/允许frame对照；受保护祖先策略阻挡，允许样例正常，HTTP200不是嵌入成功。frame-src方向、meta与XFO白名单限制清楚。
- 10.2.5：只允许/与/account精确路径，协议相对/绝对/编码/query反例真实400，允许Location302；不把startsWith或跳转当授权。
- 10.2.6：平面枚举schema拒绝自有__proto__与未知键，输出null-prototype，未污染全局；parse与后续merge区别、constructor.prototype和深度约束明确。
- 10.2.7：实际跨源好hash+ACAO执行1，坏字节拒绝、正确字节无CORS也拒绝；该页不套主页CSP以免掩盖单项机制，不把SRI叫完整供应链审计。
- 10.2.8：origin/source/version/schema全部核对，合法7/8、兄弟99/错版本88/同WindowProxy导航换源55拒绝。最终用显式reject计数等待处理而不是固定sleep猜未发生；后续合法事件另作顺序屏障。

## 四部分和R01–R09

8理论/8操作卡/8独立变体、3组README与8项integration-cases（各两标准），points逐点完整映射。R01范围齐；R02术语→机制→对照→变体；R03先MWG再OWASP/MDN/DOMPurify；R04上述实际与未实现分开；R05每点不同故障与恢复；R06主工程与独立lab/副本扩展分明；R07输出/Cookie/签名/origin/site/权限术语一致；R08必要运行通过；R09限制、版本和非真实用户说明单列。父README/tasks与全阶段契约由主代理整合，不以本组通过代替主阶段验收。

## 真实运行与复验

Node26.0.0、pnpm11.4.0、Playwright1.65.1、DOMPurify3.5.0。锁文件初装、最终frozen离线安装通过；3项Node验证签名绑定/重定向-schema/消息；390/1440两组后台Chrome及HTTP补充（nonce差异、redirect/proto/4096体积限制、README）最终通过。

最后追加报告数组32项上限、错误消息已处理计数屏障、真实5000字节413反例后，复跑两视口与HTTP通过；guards未改仍复跑3Node。随后Prettier仅格式化，语法检查通过，不把格式变化称安全提升。vendor node_modules不提交，报告只留固定kind/received，未保存原始URL/脚本样本或发送外网。

自建4522/4525/Chrome在finally关闭，无系统服务或浏览器安全设置变更。默认沙盒loopback受限时按既有授权升级本地验证，没有绕过访问限制或测试外站。原结果在ignored artifacts，摘要runtime保存。

未测：生产身份/授权、真实HTTPS/SameSite跨站、全面mXSS/DOM Clobbering、安全审计认证、Trusted Types全局强制、真实report-to可靠投递、多浏览器/真机/辅助技术/学习者试学。没有暂存提交；主代理统一交付。

追加本地路径复核：允许的/account目标原无页面，补固定教学目标页（无身份数据），只复验相关HTTP：302后follow到200与外部目标400。未改既有安全/浏览器机制，复用上述两视口记录，不称再次全量运行。
