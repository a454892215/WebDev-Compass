# 阶段12.1逐点审查

2026-11-25，保留8编号。逐篇交叉核对理论、操作、独立练习与integrationCase；主tasks/manifest/索引由主作者整合，不以文件存在数量验收。

- 12.1.1：风险→层级→数据/环境→退出条件/owner完整；STRATEGY.md是真实可读文档并链接已运行脚本，不把固定coverage或测试数当质量保证。生产支付/灾备未运行。
- 12.1.2：纯函数/组件/契约/旅程职责、jsdom限制及mock目标边界清楚；API-only Playwright不叫浏览器E2E。主组件契约与Nuxt旅程单独取证，未为了比例增加重复测试。
- 12.1.3：consumer/provider/provider state与Pact生成/验证链按官方说明；本地真实HTTP200+decoder正反及投影实际通过，明确不是Pact SDK/Broker或跨团队发布门禁。增加字段与依赖字段改型分开。
- 12.1.4：baseline与verify写入边界分开；固定OS/浏览器/字体/locale/DPR、正常PNG和故意padding变化已真实检测。作者看正常/变化图，未称人类学习者/平台审批。PNG字节比较不是生产pixel diff，跨环境假阳性限制清楚。
- 12.1.5：原实现先通过，合法>=0手工变体弱测试放过、强边界抛AssertionError。未把SyntaxError算杀死，equivalent/invalid/score与一个样本分开；未装Stryker。
- 12.1.6：worker/测试粒度shard/测试数据隔离清楚。实际两片各2测试/2worker，四标题无遗漏/重复依赖；每test request context Cookie隔离。当前同机顺序两片，无远程CI、blob合并或Testcontainers。
- 12.1.7：真实80ms延迟是fixture产生，不是固定sleep建议；expect自动重试等待目标状态。重试类别纯函数不冒充实际flaky发生率，首错/重试/quarantine责任分开。未伪造长期事故历史。
- 12.1.8：已读主index.vue useAsyncData/useRequestFetch、server/api/profile当前Cookie+reads、no-store配置。正文/任务要求原始HTML/接管/双fixture/凭据/网络范围，不拿静态卡片代替SSR；已只读核对主E2E源码与root实际5passed/JSON，原始A/B并发HTML/DTO无交叉及Cookie、private/no-store，两个视口reads.a只增1且浏览器profile请求为空并完成表单/dialog接管。执行者root，本组不重复运行；本点passed。

## 来源与修正

先检索/阅读MWG accessibility与security正文，采用真实语义/键盘证据及合成/减量数据；再读Vue测试/SSR、Nuxt data fetching、Playwright isolation/assertions/retries/sharding/parallel/snapshots、Pact how works/introduction、Stryker mutant states/equivalent及Chromatic visual官方正文。两个旧Chromatic/Pact地址失败后改可达官方页，并同步笔记/JSON；不可达不计为已读。

样例最初Cookie fixture配置用GET改为POST语义，最终格式化后4Node、视觉/异步与两片实际复验；受控动态状态不在card裁剪区，不改现有正常基线。测试中的weak/strong为明确手工mutation模型，不称完整引擎。

## 实际验证与限制

冻结离线安装成功。4Node、390/1440后台Chrome正常基线相等/变化不等/异步状态自动等待、两shard各2pass已通过。视觉基线仅初建时运行baseline，verify始终只读；本轮作者实际查看正常/changed390图。具体版本/命令/清理见runtime，4542无监听。

R01八编号/四部分数据齐；R02顺序与前置明确；R03来源/机制/工具边界核对；R04真实本地lab与观察区分，SSR按主作者本轮实际证据核对；R05每点独立变体/两标准/故障参考；R06主/独立/新增明确；R07用词与代码对照；R08本组必要运行与修正通过，主SSR本轮证据已只读集成；R09未测/下一步如实，不改学习勾选。不冒称真机、多浏览器、读屏、生产平台或真实学习者试学。

## 主SSR最终证据复核

核读flow/http spec、/tmp/stage12-e2e.log和test-results JSON（expected5/unexpected0/flaky0）。主API读取当前Cookie并返回新DTO，reads只是合成统计而非共享currentUser；浏览器在可交互提交后核reads.a增1/profile请求0，原始HTTP并发A/B字符串互斥、原Cookie缺席及private/no-store。有效SSR内容、接管与双fixture分别有断言，未把console无mismatch当唯一证明。主项目只本页内存保存、可改fixture，不是真身份/生产缓存认证；教材没有假称数据库保存、Pact/真实CDN、未实现登录或服务器漏洞。12.1.8 pending已关闭，本组8/8passed。主运行执行者root，额外工作仅源码/证据只读审查。
