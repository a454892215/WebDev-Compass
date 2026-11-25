# 渐进迁移交付包

主项目只迁移一个合成只读商品目录。旧MPA在server/routes/legacy/catalog.get.ts，新Vue在app/pages/catalog.vue；两源fixture位于server/utils/catalog.ts，公共DTO和影子差异位于shared/catalog.ts。

1. 基线：id/标题/分币价格、搜索与安全文本为兼容契约。旧源有internal_cost，但公开响应必须投影丢弃。
2. 接缝：/entry固定路由白名单，bucket边界0–99，50%阈值演示，rollback=1回旧版。这个bucket与回退仅单请求演示，不持久化全局开关、不提供授权。
3. 双跑：/api/shadow比较独立旧/新fixture，mismatch=1可注入价格差；只读比较，不对真实服务重复写、不发生产影子流量。
4. 验证：pnpm check和pnpm test:e2e；包含过滤/详情深链、安全文本、503恢复路径、CSS共存/键盘焦点/两视口与axe。机器人扫描不能声明WCAG合规。
5. 退回：优先保持旧入口可达、搜索参数保留，失效的新源不影响旧fixture；真实发布还须持久开关、监测阈值、会话/写数据兼容和负责人。
6. 退出旧系统：示例没有删除旧路由；真实迁移在旧流量/链接/数据/回退窗口确认后另排清理，不因新版首页能开就卸载全部旧系统。

## Codemod最小实验

从主实践目录执行pnpm test:migration。codemod/transform.mjs用锁定TypeScript AST只迁移精确的命名导入：旧模块formatPrice变为新模块formatMoney，保留本地绑定名/alias，不改字符串与局部同名变量。混入其他命名导出或default时拒绝自动处理，交给人工拆分。verify.mjs真实执行迁移前后模块：12组有效输入和8组错误输入语义一致、重复运行幂等，并验证两种必须人工审查的输入。

这只是受限语法迁移，不解析全项目符号/路径别名/命名空间导入，不承诺注释格式字节不变。自动修改函数/运行测试不能证明大规模业务等价；本轮未批量改其他项目。临时生成文件只在dist/，finally清理。
