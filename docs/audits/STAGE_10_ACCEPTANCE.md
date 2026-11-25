# 阶段10编写与质量验收

日期2026-11-25。29点，基线4/漏洞8/认证7/供应链5/隐私5，保留已有编号。按AUTHORING版本1逐点阅读四部分并集成复核，不以文件数或脚本代替内容审查。4名代理参与：主作者基线/Nuxt与整合，三个分工分别审查8、7、10点。认证分工另独立复核主项目/基线文档。

## 范围、顺序与结论

前置以阶段5认证/HTTP、6浏览器安全、7部署、8状态边界为重点；先资产与威胁模型，再输入输出/浏览器防护、身份和授权，供应链与隐私贯穿。Nuxt匿名笔记用于会话、CSRF、对象授权、安全文本与SSR；完整身份事务/JWT/刷新等采用独立lab，Passkey/商业SCA/SBOM/法律审计为明确观察或扩展。没有把不同lab的能力写成主项目已集成。

开始前核对MWG安全/隐私正文、现行OWASP Top10:2025及官方框架/规范。29点可容纳本阶段目标，补充session绑定、SSR nonce信任边界、实际流式请求限额、默认拒绝与隐私撤回，不为重复内容增加编号。具体来源与规划见[规划复核](./STAGE_10_PLAN_REVIEW.md)。

| 规则 | 逐点及集成结论 |
| --- | --- |
| R01 | 29个稳定编号全部有理论、真实示例/明确观察、独立练习、综合任务契约；无空文充数。 |
| R02 | 每组有前置/推荐顺序，机制解释先于操作；移动端类比明确浏览器Cookie/SSR不同。 |
| R03 | OWASP采用2025；同源/同站、HttpOnly/CSRF、认证/授权、nonce/可信模板、匿名/身份、合规/技术分别说明；版本和一手来源实核。 |
| R04 | Nuxt与漏洞/认证/隐私lab有实际构建、Node、HTTP、Chrome证据；真实IdP/认证器/商业平台未运行则明确标注。 |
| R05 | 每点独立变体、至少两条验收、具体故障输入/定位/修正与参考；仅对loopback合成数据操作。 |
| R06 | 29综合任务有稳定锚点和至少两条标准；现有主项目、独立lab、隔离副本新增和官方观察分开。 |
| R07 | 理论/代码/练习/任务对照审查；所有权来自服务端session，正文不假设主项目集成OAuth/JWT/Passkey。 |
| R08 | 下列发现已修正并按影响复验；实际执行与复用/只读复审、未测范围明确。 |
| R09 | 当前454/590正文、76.9%，待136；阶段11下一步，索引同步，学习者勾选未修改。 |

## 逐点证据

- [基线4点](./stage-10-baseline-points.json)、[审查](./stage-10-baseline-review.md)。
- [漏洞8点](./stage-10-vulnerabilities-points.json)、[审查](./stage-10-vulnerabilities-review.md)。
- [认证7点](./stage-10-auth-points.json)、[审查及主项目独立复审](./stage-10-auth-review.md)。
- [供应链/隐私10点](./stage-10-supply-privacy-points.json)、[审查](./stage-10-supply-privacy-review.md)。

每点记录机制、示例、练习、综合任务和来源审查，不只打统一passed标签。四组覆盖4+8+7+10=29点。认证复审不作为第二次主项目运行。

## 发现、处理与必要复验

1. **CSP测试前提错误**：DevTools已可信执行环境创建policy/动态script，不等于未信任parser输入。保留主TT/CSP，改固定开发者模板的独立parser探针：带nonce控制执行，无nonce脚本阻止，并实际收到最小报告204；两视口通过。
2. **真实模块nonce边界**：实际阅读nuxt-security2.7.0的40-cspSsrNonce.js，正则为渲染片段脚本补nonce；若不可信SSR HTML已进入片段，不能靠该后处理兜底。主项目只用Vue转义文本，无v-html；文档/威胁模型/任务同步残余风险。独立parser探针绕过该模块，不能拿探针结果替主模块作任意HTML安全保证。
3. **实际请求体限额**：模块Content-Length限制不覆盖全部chunked输入，增加实际字节读取上限；测试显式Transfer-Encoding:chunked并write/end，避免end(data)自动补长度。已测声明长度及真实chunked6000B均413；两秒/超16KiB断连接路径未全部测，不宣称完整DoS防护或保证408可达。
4. **过期清理陈述**：Map过期记录在后续访问时惰性清理，并非时间一到后台删除。UI/文档修正后重建及5 E2E通过；退出立即删除当前教学会话笔记。
5. **授权默认拒绝**：认证lab拒绝缺失/空subject、tenant、jti，避免undefined相等误授权，补负例并重跑4项Node组；已合法浏览器fixture证据明确复用。
6. **资源/异步测试**：独立lab资源改相对路径并重跑浏览器；同意实验先注册响应等待再触发，未用固定sleep修饰结果。漏洞lab内部重定向目标补固定无身份页，额外复验302跟随200/外部400，不冒称末次全浏览器重跑。
7. **范围与安全配置**：报告仅允许directive计数，上限100但无时间TTL；本地Secure=false、style unsafe-inline、关闭的中间件与HSTS/COEP写清。Cookie与CSRF是不同防护，SRI需要实际允许CORS/完整性匹配。未安装/运行的工具不写通过。

## 实际验证

主Nuxt冻结安装、typecheck、ESLint、5项Vitest、生产SSR构建、5项Playwright通过。1440/390模拟视口分别验证会话、HttpOnly、安全文本、SSR重载、导航、axe、退出和CSP/TT探针；独立HTTP用两个会话验证owner拒绝、CSRF/Origin、mass assignment、两种413、并发SSR隔离和撤销旧Cookie401。

独立漏洞lab：3项Node、HTTP及两视口Chrome；认证lab：4项Node、真实jose签验/拒绝、HTTP及两视口；隐私lab：3项Node、Vite真实产物、HTTP及两视口。每组实际执行命令、版本和最后复验范围见运行JSON：
[主Nuxt](./stage-10-practice-runtime.json)、
[基线共享证据](./stage-10-baseline-runtime.json)、
[漏洞](./stage-10-vulnerabilities-runtime.json)、
[认证](./stage-10-auth-runtime.json)、
[供应链隐私](./stage-10-supply-privacy-runtime.json)。

全库知识/链接、四部分、HTML资源及检查器回归，以及阶段0–10验收门禁通过；这些仅是结构与已记录审查新鲜度，不能自动证明语义质量。运行结果由本轮收尾核验，不扩大到旧阶段重新浏览器验收。

## 限制与下一步

本地匿名/fixture、内存Map及HTTP不是真实生产身份系统，非持久化多节点。nuxt-security后处理风险、样式unsafe-inline和部分关闭的中间件需按真实业务再设计。依赖audit仅隐私lab当日锁树零已知公告，不代表主项目或未知漏洞；真实IdP、Passkey、CMP/SBOM/商业SCA、SOC/PCI/法律认证未实测。无真机、多浏览器、生产攻防/容量、屏幕阅读器或真实学习者试学。

上述范围内R01–R09达标；下一阶段11，学习者掌握仍需独立完成变体和实际交付。
