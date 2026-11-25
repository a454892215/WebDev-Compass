# 阶段6规划复核：页面性能、安全、无障碍、国际化与SEO

复核日期：2026-11-25。本文记录编写前的范围判断及编写过程中的来源核对，服务于《阶段编写与验收总则》R01–R03；实际质量结论与运行证据由阶段正式验收记录负责。正文数量不等于知识掌握，也不是高级开发能力保证。

## 1. 从原42点到43点：只补一个明确缺口

复核对象为 [阶段6地图](../../knowledge-map/03-application-stages-6-7.md)。原规划为性能17、安全7、无障碍7、国际化4、SEO7，合计42点。原有五组能覆盖本阶段主要职责，但无障碍目录没有明确承接文字缩放、窄视口重排、触控目标及运动偏好，因此新增 **6.3.8 缩放与重排、触控目标和用户偏好：按WCAG 2.2适用准则验收**。调整后为17+7+8+4+7=43点，保护旧编号与路径。

| 范围 | 复核后处理 | 边界 |
| --- | --- | --- |
| 6.1 性能 | 保留17点；在既有点补充lab/field、指标采集、取消清理、虚拟列表无障碍和缓存隔离 | 不把一次Lighthouse或本地时长当生产性能保证 |
| 6.2 安全 | 保留7点；深化输出上下文、CSP、Cookie/CSRF/CORS职责、依赖及公开产物 | 不把浏览器防护当完整服务端授权，也不把演示nonce称真实登录 |
| 6.3 无障碍 | 原7点加6.3.8；名称、焦点、表单、对比度等在原点深化 | 工具零违规不等于WCAG符合性 |
| 6.4 国际化 | 保留4点；vue-i18n/Nuxt为主线，明确SSR实例、locale、时区和RTL | i18next随React选修，不增加第二套必修框架 |
| 6.5 SEO | 保留7点；在原点补canonical/hreflang、状态码、robots/noindex和JSON-LD输出安全 | SSR有助于内容可获取，不保证索引、排名或富结果展示 |

没有必要把每条HTTP头、每项WCAG成功准则或每个工具选项各自扩成新知识点。能在既有点中准确解释、演示及验收的内容，就在既有点完成。后续只有发现独立能力缺口、现有知识点无法合理承接，才提出带理由的目录修订；不无止境扩目录。

## 2. 推荐递进顺序

稳定编号用于索引，不要求所有内容严格按编号首次阅读。读者应已完成阶段2–4的异步、浏览器、工程化及Vue/Nuxt，并具备阶段5的HTTP、会话与私有缓存基础。

1. **先建立判断标准**：读6.1.1.1及6.1.2.6，分清真实用户与实验室、指标与诊断条目；同步读6.3.1，明确A/AA/AAA和工具边界。先定义观察目标再优化。
2. **从浏览器加载到主线程**：按6.1.1加载主题，再6.1.2运行时主题，最后6.1.3缓存。布局、DOM和事件循环沿用前置，不引入框架“万能优化口诀”。
3. **在原有HTTP与会话基础上深化安全**：按6.2的输出/输入边界、自动携带Cookie、嵌入策略、公开产物及供应链逐步推演；CORS读取限制与CSRF写入防护分开解释。安全与隐私约束同样用于前一组缓存及第三方资源。
4. **从语义到操作和状态反馈**：6.3.2/3→6.3.4→6.3.5/6→6.3.8，最后用6.3.7自动检查与人工清单交叉复核。工具在实现后验证，不能代替前面的语义和焦点设计。
5. **从locale到多语言页面输出**：6.4文案、vue-i18n、Intl及RTL，再6.5抓取、语义、元信息、分享、站点文件、结构化数据和SSR/SSG。SEO所用语义能力前面已建立，不重复当新概念讲解。
6. **在Nuxt公开多语言目录中整合**：验证首响应内容、语义/键盘/表单/dialog、动态资源、Worker、locale/dir及元信息。虚拟列表、公开SW、压缩及安全攻击负例放在独立受控lab；新增扩展与主工程已有功能明确区分。

这些主题可交叉回读；安全、无障碍不是优化完成后才追加的装饰验收。每点仍须满足理论、代码示例、独立练习、综合任务四部分。

## 3. Modern Web Guidance与官方正文核对

已检索指南目录并读取匹配正文，采用原生HTML、浏览器能力及可兼容回退，再结合Vue/Nuxt和本项目职责选择实现。指南是工程参考，不是替代标准和目标浏览器核对的最高事实来源。

| 已读指南 | 影响本阶段的选择 | 还需核对的边界 |
| --- | --- | --- |
| [performance/performance](https://developer.chrome.com/docs/modern-web-guidance/guides/performance/performance) | 资源发现/优先级、图片尺寸、动态加载、长任务、读写布局、分层缓存与测量 | 实际候选条目不是完整CWV算法；指南中的bfcache绝对说法按下文更新 |
| [security/security](https://developer.chrome.com/docs/modern-web-guidance/guides/security/security) | 优先文本安全输出，检查危险DOM入口、Cookie、嵌入和消息来源，按依赖与场景部署策略 | 前端防护不替代服务端认证授权；HTML解析器不自动净化；不能未经分析整套强制隔离头 |
| [accessibility/accessibility](https://developer.chrome.com/docs/modern-web-guidance/guides/accessibility/accessibility) | 原生语义、名称描述、自然键盘顺序、dialog焦点、表单反馈、尺寸和用户偏好 | 按W3C适用条款、等级和例外判断；分数不能证明真实可用性 |

性能额外核对 [web.dev Core Web Vitals](https://web.dev/articles/vitals)、[Lighthouse评分](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring)与[Vue性能指南](https://vuejs.org/guide/best-practices/performance.html)。LCP≤2.5秒、INP≤200毫秒、CLS≤0.1是良好阈值，真实用户按第75百分位并区分移动/桌面；单次实验室审计的TBT不是INP，原生PerformanceObserver候选也不是完整正式算法。没有场数据，就不写生产p75通过。

安全实现与各点的OWASP/MDN资料交叉核对，防止把指南例子机械推广。例如[DOMParser说明](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString)明确指出解析入口具有注入风险；独立文档中的暂不执行不意味着节点插入活动文档后安全，富文本仍需要经过核对的净化策略。

### 缓存事实差异：no-store与bfcache

MWG性能正文将no-store阻止bfcache写得过于绝对。更具体的[Chrome no-store/bfcache说明](https://developer.chrome.com/docs/web-platform/bfcache-ccns)记录了2025年的安全条件下启用；[web.dev bfcache](https://web.dev/articles/bfcache)亦区分HTTP缓存和页面历史快照。故6.1.3.1不得写成“任何浏览器都永久禁止no-store页进入bfcache”。敏感响应仍按隐私需要设置no-store，不因优化移除保护；具体恢复与退出行为须按目标浏览器验证。

### WCAG数值、等级与本轮证据边界

以[WCAG 2.2规范](https://www.w3.org/TR/WCAG22/)为依据；WAI Understanding帮助解释，不另立强制规则。

| 内容 | 准确边界 | 本阶段如何表达 |
| --- | --- | --- |
| [2.5.8 最小目标](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | AA：24×24 **CSS像素**；存在间距、等效控件、行内、用户代理、必要性等例外 | 不把所有小于24px的行内链接一律判错，也不把CSS像素等同设备物理像素 |
| [2.5.5 增强目标](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html) | AAA：44×44 CSS像素，也有适用例外 | lab采用44px是设计选择，不能称“AA统一强制44px” |
| [1.4.4 文字缩放](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) | AA：除字幕和文字图像外，文字无需辅助技术可放大至200%，内容及功能不丢失 | 根字号200%实验只证明受控CSS文字变体，不能冒充真实浏览器zoom完整测试 |
| [1.4.10 重排](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) | AA：通常纵向内容在等效320 CSSpx宽度、横向内容在256 CSSpx高度下无需双向滚动；必要二维内容有例外 | 320宽实测与1280宽400%zoom等效关系需解释，但不声称已操作真实zoom或验证全部二维例外 |
| 动效与用户偏好 | 交互动效2.3.3属AAA；其他闪烁/移动内容按各自准则判断 | 尊重prefers-reduced-motion，不写成“任何动画都违反AA” |

## 4. 编写与验收落点

本次范围判断不声称覆盖所有Web专题。部署、生产TLS/CDN、回滚和监测由后续阶段深化；认证和接口契约沿用阶段5。先完成43点的准确递进及四部分对应，按最小充分验证修复真实缺陷，再由主代理统一核对跨章节内容、主工程、契约与正式验收。

自动检查、浏览器模拟、真实设备、辅助技术、生产流量与学习者掌握分别记录。正文覆盖率按实际文件统计，验收按证据判断；任何一项都不能通过“目录数字增加”自动获得。
