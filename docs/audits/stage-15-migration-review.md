# 15.4 迁移六点与主Nuxt逐点复核

2026-11-25；按理论→实际源码/操作→变体练习→综合任务逐点核对，不用文件数量代替质量。

| 编号 | 机制与项目事实 | 练习/任务对应 |
| --- | --- | --- |
| 15.4.1 | 单一只读目录切片，/entry接缝、old/new独立fixture、DTO适配；旧路由保留 | 新增库存只读切片，单位/搜索/回退，写数据与旧系统移除另验 |
| 15.4.2 | 旧GET完整MPA与Vue路由分开DOM，未安装jQuery；搜索/URL/生命周期为迁移对象 | 模拟外部监听挂卸两轮，实际jQuery插件清理保持官方观察/未来扩展 |
| 15.4.3 | 比较独立旧/新源公开语义，注入1分差可识别；bucket/rollback仅本请求fixture | 新增/删除/changed差异与25%边界，生产开关/稳定分组/写副作用不冒称已测 |
| 15.4.4 | MPA不同文档与同页scoped/namespace对照分别说明；非Shadow DOM/安全边界 | 注入全局important冲突，Computed和焦点/窄屏，层叠与stacking context分开 |
| 15.4.5 | 只读/可分接缝适合渐进，写订单约束可能改变选择；成本含过渡/退出 | 两种场景候选/假设/回退，未开会/真实切流不虚报 |
| 15.4.6 | TypeScript6 AST精确导入改名，保留alias/local binding，拒绝mixed/default | 12有效+8错误等价、幂等/普通字符串保持、边界扩展先有拒绝测试 |

主项目专项审查关闭：skip移到nav前、main tabindex=-1并真实Tab/Enter；详情先处理useFetch.error，503与404分别验证；page:finish只在path变化后聚焦，初始/同页query不抢焦点；query watcher同步浏览器后退搜索框。模板中URLSearchParams转到script computed，实际typecheck通过。新增同页搜索按钮保持焦点与goBack恢复输入专项已最终通过。

最终pnpm check含类型/ESLint/格式、3单元、真实AST实验与生产build；pnpm test:e2e三项包括1440/390流程和HTTP专项，后台异常日志为空。受影响源码改动后完整最小检查已复验，后续仅文案/任务/索引不重跑浏览器。结论限于合成只读切片，不保证生产数据迁移、发布控制面、全局开关传播、完整历史滚动或所有旧插件行为。

[逐点证据](./stage-15-migration-points.json) · [主运行](./stage-15-practice-runtime.json) · [整阶段验收](./STAGE_15_ACCEPTANCE.md)
