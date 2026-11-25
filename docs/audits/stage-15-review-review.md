# 15.2 代码评审与渐进重构：逐点审查

核对日期2026-11-25。范围15.2.1–15.2.4，四点理论、操作卡、独立练习与综合任务定义已逐点阅读。主代理统一生成共享README/tasks/manifest及最终阶段验收；本文件不代替主项目集成验证。

## 逐点结论

- 15.2.1：从输入契约/用户影响到具体blocking意见；badTotal是未接UI的明确反例。子进程真实触发AssertionError，固定版拒绝错误类型/负数/分数/超界，公开DTO不含内部字段。含标签title仅为字符串，不借纯函数结果宣称DOM安全。新增标题边界练习与主项目评审任务分清。
- 15.2.2：按可独立理解/验证/回退的行为切片，不强设行数阈值；实现和相关测试同片。validateSlices真实拒绝逆序及漏项，但它只检清单，不构建提交或批准合并。LGTM/阻断/Nit范围与Google原文原则一致，未冒称真实团队审批。
- 15.2.3：真实隔离临时Git仓库六提交，touches3/1/2与生成文件分类可复算；人工教学权重不是测得的圈复杂度，乘积只是候选且有敏感性反例。练习新增实际提交后区分touches/增删行及低频高风险债务，不给个人绩效排名。主项目候选须实际读代码，可判无需修。
- 15.2.4：纯合法域legacy/extracted前后12组公开DTO相等，+1偏移可检测。输入硬化属于单独行为修改，特征测试不强制保留已知Bug；小乘法提取仅机制例，不鼓励无收益工具化。主Nuxt重构为学习者隔离副本任务，不冒称已运行主项目迁移。

## 来源和教学顺序

先读MWG security与accessibility正文，采用可信输出/原生语义/实际验证边界；Google What to look for/Small CLs/Standard of Code Review与Fowler Technical Debt/Opportunistic Refactoring核对流程和取舍，git-log核对历史命令。每点实际来源链接在正文和points JSON中。参考原则非逐段翻译，不将Google行数建议当项目强制阈值。

顺序为可复现问题→评审切片→债务候选→有界重构；前置类型/测试/安全/测试策略清楚。移动端经验用于分层/走查/特征测试类比，明确Web的SSR/缓存/DOM/辅助技术差异。

## 实际验证

- node .../review-lab/verify.mjs：5项检查通过，最新2026-11-25T13:23:46.805Z，Node26.0.0/Git2.54.0。报告见stage-15-review-runtime.json。
- 两个.mjs的node --check通过。
- 四点标题、路径、四练习标题及两标准、自有Markdown本地链接检查通过；共享tasks由主代理生成后全局验证。
- 临时Git路径仅本lab dist/history-*，finally删除；每条Git命令屏蔽调用者仓库/index变量与全局配置、hooks、签名，避免教学实验依赖用户Git策略。不会修改主仓库历史或用户全局配置。

## 限制

无浏览器/UI/SSR/性能实测，无真正PR、团队评审、生产债务统计或学习者试学。evidenceComplete只检查本fixture证据清单，不是自动approval；rankCandidates不具备生产通用输入校验或客观质量含义。主项目已有能力以实际源码和主运行记录为准，本组未改变主项目/共享索引/检查器/Git暂存提交，也未启动caffeinate或常驻进程。

## 主Nuxt实际源码专项审查（本组只读）

随后已实际读取learning/4-practice/15-project-delivery下shared/catalog.ts、server/api与routes/utils、app/pages/app/error/CSS及route-focus.client.ts和现有测试。

确认的实现边界：旧MPA是独立完整HTML文档，不与Vue同时拥有同一DOM；旧形状经显式normalizeLegacy到公开DTO，新数据也经parseProducts；比较仅两个只读fixture，不双写；/entry目标固定且bucket/rollback明确公开教学输入非授权；旧输出escapeHTML、新模板文本插值，私有成本字段不返回。CSS共存用范围前缀与scoped，主采用Node/Nitro，不声称做了生产迁移。

此前反馈的三项已核源码修复：app/app.vue将skip放header前；各页main目标有tabindex=-1，实际测试用Tab/Enter断言目标聚焦。product/[id].vue先处理useFetch.error，保留上游503，再对真实无产品返回404，HTTP用例分别覆盖/product/p1?broken=1和/product/p999。route-focus初始化previousPath，只在page:finish发生真实path变化时移焦，初次与query-only刷新不抢焦点；catalog.vue新增route.query.q watcher以同步浏览器后退输入。

本组只读复核上述四个文件与flow/http测试，确认实现和断言已针对原发现；主代理报告首轮3项E2E通过，追加搜索后按钮保持focus与goBack输入恢复的专项已写入，最终执行证据以主stage-15-practice-runtime.json和阶段验收为准，不把本组静态复核当作本组重跑浏览器。main而非heading作为skip目标是本项目明确选择，可程序聚焦；该选择不表示已经读屏或真实用户验证。
