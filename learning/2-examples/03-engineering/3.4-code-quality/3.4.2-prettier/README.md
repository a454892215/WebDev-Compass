# 3.4.2 Prettier：统一排版并用 check 阻止漂移：真实示例入口

此点共享[质量与测试实验工程](../../3.5-testing-basics/quality-lab/README.md)，不是伪造工具输出的HTML演示。

## 运行

从仓库根进入 `learning/2-examples/03-engineering/3.5-testing-basics/quality-lab`，先按共享README安装锁定依赖，再运行 `pnpm verify:tools`。脚本工作目录必须是 lab；无需在主仓库安装 hooks。

## 对照代码

- [.prettierrc.json](../../3.5-testing-basics/quality-lab/.prettierrc.json)
- [package.json](../../3.5-testing-basics/quality-lab/package.json)
- [verify-tools.mjs](../../3.5-testing-basics/quality-lab/verify-tools.mjs)

## 操作与预期

实验配置使用 semi:false、singleQuote:true。verify:tools 对未排版 fixture 调用 --check，确认返回非零且文件未被重写；校验样本显式跳过 ignore 文件，避免误把“无匹配文件”当有效检查。

先预测结果，再执行命令并对照文件。失败负例在工具脚本内生成和清理，`expected nonzero` 是验证目标，不代表正常工程应失败。

## 边界

适合提交前和自动化检查中统一差异。格式正确不代表类型、业务逻辑或安全正确；--write 先看差异，避免对整个他人仓库做无关排版。配置必须由执行入口读取才生效。

[理论](../../../../1-notes/03-engineering/3.4-code-quality/3.4.2.prettier.md) · [练习](../../../../3-exercises/03-engineering/3.4-code-quality/3.4.2.prettier.md)
