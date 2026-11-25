# 阶段13.2逐点审查

2026-11-25，保留5点，理论/操作卡/独立练习/综合任务数据逐点交叉阅读。主实践、manifest、父索引及全阶段R09由root整合，不以本组passed替代全阶段验收。

- 13.2.1：真实Changesets3.0.3 core major→widget patch/changelog与pack范围转换；widget仅内部使用core并保持公开布尔契约，源schema1/2前后在独立Node进程都真测true。若直接暴露breaking API，自动patch也可能错，正文明确需另写major/人工审查。独立/固定/linked/0.x与semantic-release未测范围说明，不冒称完整发布。
- 13.2.2：scope/读取安装/发布权限/registry路由与pack分开。GitHub Packages npm认证规则按当前官方，不把npmjs OIDC当通用。Verdaccio/Artifactory仅官方观察/配置，未建服务/账户/发包，模板没有真实token。回退保留已知版本/锁/产物，不把覆盖版本/unpublish当常规。
- 13.2.3：Bot发现候选与质量/授权分开，0.x/peer/major与紧急安全更新均保留必要检查。真实3项政策Node负例/正例；配置仅审查，不称Bot PR/自动合并。Dependabot groups的patch/minor与ignore的version-update值分开。
- 13.2.4：纯本地workspace先冻结成功，再改workspace:*→workspace:^明确OUTDATED_LOCKFILE；恢复冻结成功且lock字节不变。初外部依赖失配先查元数据遇DNS/超时，不当作锁拒绝；已停止等待/改独立负例，无关闭安全策略。offline不是整条供应链检查绝不联网，工具版本/锁/缓存/安全职责清楚。
- 13.2.5：真实default catalog6.3.2、普通依赖override7.8.6分开验证，显式重解析临时锁再冻结。故意跨major只证明解析，并非推荐升级或兼容；不推断catalog+override组合优先级。在线文档最新含v12，教材仅称本轮11.4实际范围。

## 实际读取与来源

先读AGENTS/AUTHORING/LEARNING_STRUCTURE/地图及MWGsecurity正文，再pnpm workspaces/catalog/install/settings、Changesets当前站与CLI安装源码、GitHub Packages/Dependabot、Renovate、Verdaccio、JFrog/npm/Yarn官方。旧JFrog路径404后检索并读有效docs.jfrog.com页面，源码/笔记/逐点来源已同步，不把失败页当依据。pnpm版本化文档重定向最新页，故明确不照搬v12新增项。

实读主13-platform/package.json、pnpm-workspace.yaml、apps/preview与packages/core manifests：主是真实Nuxt/Vite/core workspace及Vue/TS catalog，无registry/Bot平台。任务要求核对已有图、升级分组与交接，没假称主已有Changesets发布工作流或外部registry。

## 发现、验证与边界

所有教材有机制/实际例子/误区/移动端差异/来源；练习含exact四标题、两个标准、具体故障与参考。章节入口推荐先锁与工具，再版本/pack和平台/更新策略，保持编号且无循环前置。

真实冻结离线lab安装、3Node政策测试、完整CLI/pack/锁/catalog/override验证通过；最终功能修正后再跑完整verify，stdout结果保存runtime，临时目录finally清理。单命令30秒截止；早期外部元数据DNS重试未被算通过。最后允许官方npm元数据读取，无真实凭据、远程写入或安全策略降级。无服务监听或浏览器测试，当前CLI/文件层最小充分；未恢复Docker/Colima。

R01五编号四部分任务数据齐；R02推荐顺序明确；R03来源/版本/语义与工具责任核对；R04真实CLI与观察分开；R05变体/故障具体；R06主/独立/新增能力区分；R07版本/包源/锁/范围前后一致；R08问题关闭并实际复验；R09本组状态/未测清楚，最终索引留root整合。无真实学习者试学或能力认证。

## 主工程与28任务额外只读整合复核

读取主13-platform的README、docs/PLATFORM、全部tasks及package/scripts，并对照本组integrationCase。root报告的3单元/5E2E/check:ci与Turbo图/cache证据由root负责，本次只读，不重复执行或冒称独立测试。

主与独立实验/官方观察总体清楚：主仅pnpm/Turbo两应用/core、本地cache/边界/基线；无Changesets发布、registry/Bot、MF、SCM affected或remote cache，preview另有tsc。其他28任务明确插件/双格式/AST/兼容lab与新增扩展，不强行把这些能力归入主项目。

发现两处需root收紧措辞，已发送：
1. 13.2.1“core→两个host的依赖”应与实际依赖箭头web/preview/root-tools→core区分，core到消费者是变更影响方向。
2. 13.2.2主core交接表“本地pack已测”可能误指主core；实际pack归档证据来自独立release-lab/widget，主脚本未做core pack。应标主core待新增打包验证，并与独立已测分栏。

未发现新增代码阻断项；这两条是事实/图示范围问题，修正文案即可，不要求重复运行原代码证据。

## 上述两项关闭复核

已只读核对root修正后的13.2.1/13.2.2逐点evidence.practice/integrationCase.task与主tasks：依赖明确为两个host及根工具→core，core到消费者另标变更影响；主core打包明确待隔离副本新增，独立widget pack已测与registry待接分别列。另核13.1.6将core#build→Nuxt/Vite#build标作构建前置，而包依赖为反向。两项均关闭，无新增矛盾。

仅措辞/任务事实修正，无代码行为变化；本次只读，不重新执行测试或增加主运行宣称。
