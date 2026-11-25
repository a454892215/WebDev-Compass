# 阶段13规划复核

2026-11-25。28点保持编号：多包6、依赖发布5、构建5、兼容7、DX5。前置3工具/TS、7交付、12包契约；按团队复用和职责学习，不把单应用强行升级为平台或迁现有独立仓库。

核对后将真实缺口放进原条目：包/源码/task/SCM集合区别；缓存输入/env/输出/权限与损坏；依赖显式声明/公开入口；版本联动不等于兼容；锁/安全验证/离线边界；Vite8角色；浏览器target/API能力/回退失败；AST绑定与幂等；generator路径/覆写及编辑器静态/实际分开。无重复新增ID需求。

先检索并读MWG [security](https://developer.chrome.com/docs/modern-web-guidance/guides/security/security)、[accessibility](https://developer.chrome.com/docs/modern-web-guidance/guides/accessibility/accessibility)、[Baseline配置与回退](https://developer.chrome.com/docs/modern-web-guidance/get-started)、[persistent-top-layer-ui](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/persistent-top-layer-ui)。采用安全文本/可信依赖、原生可用基线、能力检测与明确回退，不引入未经审计远程polyfill。

再核pnpm/Turbo/Nx/Vite/Nuxt/Vue/TypeScript/ESLint/Changesets及registry/Bot/兼容官方，结合真实安装API。pnpm在线最新含v12新增项，本例固定11.4且不照搬；Vite8默认Rolldown/Oxc，转换不代替tsc；Changesets3 init交互；Turbo boundaries官方仍实验，主自有TS gate不冒称该工具。旧TypeScript handbook/compiler-api地址404，改已读微软官方Wiki并同步来源。

主沿Nuxt4.7/Vue3.5.46/TS6.0.3/Vite8.3.8，新增Turbo2.11.13官方registry实核固定。真实小型core+Nuxt/Vite workspace、反向selector/本地cache，不为跑课程接远程账户。主只有ESM、无MF；独立lab提供双格式/AST/版本等目标证据，各自限制保留。

R01–R09逐点四部分审查；实际/观察/推演/扩展分开。原目录覆盖不作为掌握保证，也不因教学workspace更改用户生产仓库Git选择。
