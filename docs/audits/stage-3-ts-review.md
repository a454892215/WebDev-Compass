# 阶段3.3 TypeScript逐点审查

核对日期：2026-11-24。范围为12点理论、真实类型实验、独立练习和综合任务映射；本组审查不替代阶段整体验收或学习者独立完成证据。

## 前置与递进

先完成阶段2的JavaScript、函数、异步与ES模块和3.1包管理。3.3.1–3.3.10依次建立类型、收窄、模块和编译配置；3.3.11是Vue类型桥接，不是前十点的先修；3.3.12用于移动经验迁移回顾。React不安装，也不作为主线前置。

## 逐点审查

| 知识点 | 机制与实际证据 | 练习、综合任务与边界 | 结论 |
|---|---|---|---|
| 3.3.1 | 类型擦除；真实断言保留数字，string接收number被拒绝 | 独立建模、重现as误信，任务板unknown入口；类型不代替运行校验 | 通过 |
| 3.3.2 | 原始值、元组、enum、unknown/any/void/never；enum有运行对象、any可产生NaN | 字段模型与坏输入排错；任务板筛选不强制enum，readonly不是冻结 | 通过 |
| 3.3.3 | interface合并、type和结构兼容；额外属性仍在，缺少title被拒绝 | 对象契约与字面量多余属性排错；任务板避免巨型可选接口 | 通过 |
| 3.3.4 | 判别联合分支、never穷尽及交叉同时满足约束；未收窄字段被拒绝 | 增加状态重现漏分支；综合工程副本按需整理状态，不虚构现有功能 | 通过 |
| 3.3.5 | 泛型保留输入/输出关系与id约束；Partial/Pick/Omit/Record不修改运行数据 | 缺失id及返回undefined排错；综合按实际复用抽象，不为泛型而泛型 | 通过 |
| 3.3.6 | unknown逐字段守卫、typeof/instanceof、自定义谓词；错误id被过滤，as未转换值 | 独立解码与谎报谓词排错；外部JSON不靠断言通过 | 通过 |
| 3.3.7 | 函数参数/返回、可选/默认与回调；undefined启用默认值，错参数类型被拒绝 | 独立格式化与null/default排错；综合函数替身保留Promise/失败契约 | 通过 |
| 3.3.8 | TS private可反射访问，readonly可在JS中写入；#private品牌真实拒绝伪造实例 | 独立类与运行反射排错；综合只分析适用性，不强制class或把其当安全边界 | 通过 |
| 3.3.9 | type-only导入擦除、声明与实现分离；BUILD_META运行时仍undefined | 拆模块并重现仅有声明的ReferenceError；综合审查真实导出，不用declare any补洞 | 通过 |
| 3.3.10 | strict不是全部安全选项；索引处理undefined；paths真实检查通过但Node找不到未重写别名 | 配置/运行分别复验；target/lib不提供polyfill，NodeNext不能直接当Vite模板 | 通过 |
| 3.3.11 | 真Vue defineComponent/Ref/VNode契约；错误Props和事件回调均被tsc拒绝 | 独立卡片契约；综合主工程原生TS，Vue副本桥接，不声称已做DOM挂载 | 通过 |
| 3.3.12 | 结构兼容、空值守卫与索引边界在TS侧实际运行 | 独立迁移差异及坏响应排错；不把TS strict等同Dart sound null safety，也未运行Dart/Kotlin | 通过 |

更具体的四部分路径及逐点内容证据见[审查JSON](./stage-3-ts-points.json)。综合目标由示例组integration-cases.json交给主代理挂接tasks.md；此处“通过”是本组内容审查结论，综合工程运行、锚点和阶段契约由主代理集成复验。

## 实际运行

固定TypeScript 6.0.3、Vue 3.5.46、pnpm 11.4.0；实际Node 26.0.0。已真实安装依赖并通过pnpm install --frozen-lockfile。未全局安装或修改宿主项目依赖。

在learning/2-examples/03-engineering/3.3-typescript运行pnpm check，真实执行tsc --noEmit、tsc和verify.mjs，通过27项记录：12个含断言的Node正例、12个真实编译拒绝、有效/过期@ts-expect-error、别名解析边界、JS/声明产物边界。Vue反例还明确检查两个TS2322。反例临时生成并删除，不混入正式tsconfig；预期失败是机制证明，不是项目可正常运行的声明。

最终补强产物检查后再次运行verify.mjs，通过27项。contracts.js中无interface而contracts.d.ts保留；输出有enum对象和#private，类型导入擦除，声明不产生值。每条实际返回与结果见[运行JSON](./stage-3-ts-runtime.json)。一条记录可含多个断言，不将断言数包装成学习掌握率。

## 来源与限制

先检索并读取[Modern Web Guidance Performance](https://developer.chrome.com/docs/modern-web-guidance/guides/performance/performance)模块交付相关正文；没有找到覆盖TypeScript类型系统语义的专门指南，具体语义查[TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)、[tsconfig](https://www.typescriptlang.org/tsconfig/)和[Vue TypeScript组合式API](https://vuejs.org/guide/typescript/composition-api.html)。每节附具体官方来源和核对日期。移动比较参考[Dart空安全](https://dart.dev/null-safety/understanding-null-safety)与[Kotlin空安全](https://kotlinlang.org/docs/null-safety.html)。

本轮验证为实际编译器、Node和Vue VNode/composable；未进行本组浏览器DOM、真机、Dart/Kotlin运行或浏览器兼容矩阵。未声称学习者已经独立试学，不修改地图学习复选框。综合主工程、全仓结构和阶段验收由主代理最后完成。
