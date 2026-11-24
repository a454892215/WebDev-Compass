# 3.4.4 Husky + lint-staged：在暂存文件上执行提交前检查：真实示例入口

此点共享[质量与测试实验工程](../../3.5-testing-basics/quality-lab/README.md)，不是伪造工具输出的HTML演示。

## 运行

从仓库根进入 `learning/2-examples/03-engineering/3.5-testing-basics/quality-lab`，先按共享README安装锁定依赖，再运行 `pnpm verify:tools`。脚本工作目录必须是 lab；无需在主仓库安装 hooks。

## 对照代码

- [verify-tools.mjs](../../3.5-testing-basics/quality-lab/verify-tools.mjs)
- [package.json](../../3.5-testing-basics/quality-lab/package.json)

## 操作与预期

本例不在学习仓库运行 husky init/prepare。pnpm verify:tools 创建临时 Git 仓库、设置该临时仓库 .husky/_，暂存 debugger 并证明提交失败；修复、重新暂存后提交成功。临时仓库随后删除。

先预测结果，再执行命令并对照文件。失败负例在工具脚本内生成和清理，`expected nonzero` 是验证目标，不代表正常工程应失败。

## 边界

适合快速本地反馈；hook 可被跳过，不是服务端权限或安全边界。团队仍需独立自动化检查。husky init 会改 package.json 和仓库配置，不能未经判断在已有仓库执行；本例不提供真实主仓库 hook 安装。

[理论](../../../../1-notes/03-engineering/3.4-code-quality/3.4.4.husky.md) · [练习](../../../../3-exercises/03-engineering/3.4-code-quality/3.4.4.husky.md)
