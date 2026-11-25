# 阶段12.4逐点审查

2026-11-25，5点四部分逐点对照实际lib、脚本、宿主和测试；专项分工独立只读复审。

- 12.4.1：具名ESM、exports、sideEffects/实际消费产物区分；真实tgz独立消费者只导入UiButton，未用marker缺席。顶层JS副作用需同步metadata/优先避免，不能一边声明只有CSS有副作用一边假设JS被保留。
- 12.4.2：peer/external/解析路径职责分开；实际Vue3.5.46同路径且库仍import Vue，本轮兼容范围不夸大为所有版本、CJS/UMD或多打包器。临时consumer显式链接宿主Vue，不假称registry安装。
- 12.4.3：提取CSS与宿主显式import、CSS sideEffects匹配清楚；真实正例CSS规则存在，漏样式重新构建无CSS。不冒称所有构建器sideEffects:false必表现相同。
- 12.4.4：CLI3.0.3真实临时patch version/changelog；init交互前提由源码核实，不在无TTY硬跑；配置来自已安装默认值。非法bump/包名工具错误与合法但语义不当patch的人审职责分开，主库版本未改/无publish。
- 12.4.5：原生type、attrs、disabled、label/error/v-model、SSR纯文本，实际dialog/键盘/axe状态有矩阵；Storybook已有真实play交互，不贬为“仅文档”，也不替代包/SSR/人工。check:ci串接必要门禁，远程CI/读屏未运行。

主4单元/5E2E、真实pack/类型正负/CSS负例/Tree-shaking/Changesets均实际通过，证据见主运行JSON。日间/夜间axe、禁用/错误组件断言和dialog焦点分别记录，不统称所有状态都经axe。独立specialized-lab有标签与布局真实负例。

复审指出三处措辞：新增JS副作用与metadata、Storybook play事实、非法bump与语义审查，已收紧理论/练习/逐点数据；未改变库行为，不冒称额外浏览器重跑。24任务与索引由主整合。Pact/Stryker/平台/registry/真机等未执行边界保持。
