# 3.4.1 ESLint：用 flat config 检查代码质量：真实示例入口

此点共享[质量与测试实验工程](../../3.5-testing-basics/quality-lab/README.md)，不是伪造工具输出的HTML演示。

## 运行

从仓库根进入 `learning/2-examples/03-engineering/3.5-testing-basics/quality-lab`，先按共享README安装锁定依赖，再运行 `pnpm verify:tools`。脚本工作目录必须是 lab；无需在主仓库安装 hooks。

## 对照代码

- [eslint.config.mjs](../../3.5-testing-basics/quality-lab/eslint.config.mjs)
- [src/domain.ts](../../3.5-testing-basics/quality-lab/src/domain.ts)
- [verify-tools.mjs](../../3.5-testing-basics/quality-lab/verify-tools.mjs)

## 操作与预期

运行 pnpm lint；再运行 pnpm verify:tools，临时 debugger 触发 no-debugger，进程返回非零。配置文件不会自己执行；编辑器诊断依赖对应插件和工作区设置，终端脚本才是可复现入口。

先预测结果，再执行命令并对照文件。失败负例在工具脚本内生成和清理，`expected nonzero` 是验证目标，不代表正常工程应失败。

## 边界

适合捕捉未使用变量、危险写法等。规则作用域必须匹配 ts 文件；不要用关闭全部规则解决误报。推荐集随版本变化，锁定依赖和锁文件。ESLint 不负责取代测试或统一所有排版。

[理论](../../../../1-notes/03-engineering/3.4-code-quality/3.4.1.eslint.md) · [练习](../../../../3-exercises/03-engineering/3.4-code-quality/3.4.1.eslint.md)
