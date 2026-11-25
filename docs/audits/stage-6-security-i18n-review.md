# 阶段6.2/6.4安全与国际化逐点审查

日期2026-11-25，分组开始07:27:30 UTC。范围6.2安全7点与6.4国际化4点，共11点；按AUTHORING版本1 R01–R09，分组记录不替代主审全阶段验收。

## 规划与递进

原11点大类没有需要另增编号的明显缺口。把输出上下文/净化/CSP、会话CSRF与CORS、审计范围/日期、map发布边界补入原条目；国际化补参数/复数/回退、每应用实例、显式locale/timeZone、lang/dir/逻辑属性。先机制，再共享实验，再独立变体。Nuxt完整SSR/路由与主项目最终运行另验，不重复安装另一大型Nuxt项目。

## 逐点核对

| 编号 | 机制与具体事实 | 练习与边界 |
| --- | --- | --- |
| 6.2.1 | 文本/富文本上下文、DOMPurify最小白名单、CSP与HttpOnly职责；Chrome无img执行/保留b且inline被拒 | 净化后拼原始值故障可复现；主课程页不引入危险默认v-html |
| 6.2.2 | Cookie自动携带、Origin/session nonce与CORS读写区别；正确写加一，缺token/跨源不能增加 | 本lab匿名合成计数，真实Cookie登录由阶段5已有证据对照，主课程无认证写 |
| 6.2.3 | 真实父iframe允许/拒绝对照，protected未执行脚本并出现祖先策略拒绝；frame-src不同方向 | meta无效与伙伴来源练习；未声称生产点击劫持攻防认证 |
| 6.2.4 | hidden map仍有公开源码注释；server-only合成canary不进assets | 扫描只覆盖定义的标记，非未知秘密证明；无真实密钥 |
| 6.2.5 | 2026-11-25生产依赖audit真实成功且已知公告0；锁文件/脚本策略和修复判断 | 明确不含开发依赖/主Nuxt全树，不盲目force，不把网络失败当0 |
| 6.2.6 | 错误Origin反射+credentials实际读取合成私有值；精确Origin跨源读取拒绝 | CORS不是认证/CSRF，固定目标代理与生产权限不同；无外网攻击 |
| 6.2.7 | Web DOM、原生UI、WebView桥和消息边界不同，实际source/origin校验示例 | 仅浏览器对照，未运行原生bridge/Flutter/RN或真机 |
| 6.4.1 | 参数/英语复数/中文回退与阿语Intl类别真实测试；安全文本输出 | 不拼语序，语言样例非母语审校，主Nuxt阿语中性标签不冒称完整复数 |
| 6.4.2 | Vue-i18n每实例修改不串；已读Nuxt每应用插件与URL locale中间件 | global scope非Node全局；已核读主Nuxt三语并发SSR与导航实测通过 |
| 6.4.3 | 显式UTC与日期/货币真实格式化、formatToParts语义检查 | 格式化非汇率/金额运算，纯日期与瞬间分开；主Nuxt UTC/gregory/货币unit与无hydration错误已核读 |
| 6.4.4 | en/ar语言/方向切换、START/END实际盒子位置与逻辑属性；两视口无溢出 | 不整页镜像或反转字符，键盘/辅助技术/母语质量不由截图证明 |

四部分路径及更完整的事实在stage-6-security-i18n-points.json；两组integration-cases.json供主审集成11项综合任务。每点有独立变体、至少两标准、具体故障和参考，已有/扩展明确。

## 实际运行

固定Vue3.5.46、vue-i18n11.4.23、DOMPurify3.5.0、Vite8.3.8、Playwright1.65.1，官方registry核对。Node26.0.0、pnpm11.4.0，专有设置YAML；锁文件安装与构建实际通过，不改全局工具或其他项目。

独立实验4组Node消息/Intl/实例测试、真实Vite构建、2项map/公开资产检查、Chrome390/1440各3组共6组通过。浏览器组包括文本/净化/CSP、iframe/CSRF/CORS误配、vue-i18n/Intl/RTL。正式实际结果和未测范围见stage-6-security-i18n-runtime.json。审计只对本lab的production依赖查询：31项依赖、当前已知公告计数全0，命令成功；不作为全工程永久安全结论。

server.mjs和verify-browser.mjs在finally关闭自建两个HTTP服务与Chrome；没有调用公网攻击目标，没有真实Cookie凭据/秘密上报或浏览器安全设置修改。CSP/iframe/CORS拒绝是预期观测，未把失败隐藏成成功读取。

## 主Nuxt集成核对（实际证据）

已读root主工程app/plugins/i18n.ts、shared/utils/catalog.ts与seo.ts：createI18n在defineNuxtPlugin内每应用创建，从URL解析允许locale，fallback en；locale/时区/货币明确；HTML lang/dir与导航更新由主工程处理；JSON-LD转义小于号与分隔符。主headers只声明frame/base/object子策略，不冒称完整script CSP；课程公开无认证写，不虚构新增CSRF后端。

已读取主工程最终Playwright原始JSON（6 expected/0 unexpected）、实际flow/inspection脚本及日志：en/ar/zh-CN并发raw SSR各200，title/lang/dir按请求独立；英语课程客户端切阿语后h1/description/lang/dir更新，两视口无pageerror/hydration mismatch且初始API不重复请求。主工程12个unit含显式UTC/gregory与USD、英语plural/实例隔离、恶意JSON-LD结束标签与分隔符往返保真；实际浏览器恶意搜索不产生img/script执行。320px阿语暗色/减少动效及CSS200%排版无溢出，axe检查未发现违规；不把这些说成真正400%浏览器缩放或全部WCAG/翻译认证。

这些共享运行由主代理执行，本组核读证据，未冒称独立再次运行。11点现在全部passed，无本组必达未关闭问题；正式全阶段契约/指纹仍由主审集成。

## R01–R09与依据

R01十一编号三部分/综合建议齐；R02先机制后实验；R03先MWG安全正文，再OWASP、MDN、Vue-i18n和Nuxt；R04实际与观察区分；R05具体变体/故障；R06独立lab与主Nuxt已有/扩展分清；R07源/站点/作用域/格式化/缓存术语一致；R08独立必要运行及主SSR共享证据已通过；R09无生产/真机/学习者掌握保证。最终正式验收由主代理完成。

[MWG Security](https://developer.chrome.com/docs/modern-web-guidance/guides/security/security) · [OWASP XSS](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) · [OWASP CSRF](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) · [CSP祖先](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors) · [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) · [Vue-i18n](https://vue-i18n.intlify.dev/guide/advanced/composition) · [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) · [方向](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir) · [pnpm审计](https://pnpm.io/cli/audit)。具体每点附精确来源，不用训练记忆冒充本轮查阅。
