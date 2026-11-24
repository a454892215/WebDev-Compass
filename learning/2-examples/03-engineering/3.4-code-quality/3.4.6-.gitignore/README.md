# 3.4.6 Git ignore 与 npm 打包：分别核对跟踪范围和发布产物：真实示例入口

此点共享[质量与测试实验工程](../../3.5-testing-basics/quality-lab/README.md)，不是伪造工具输出的HTML演示。

## 运行

从仓库根进入 `learning/2-examples/03-engineering/3.5-testing-basics/quality-lab`，先按共享README安装锁定依赖，再运行 `pnpm verify:tools`。脚本工作目录必须是 lab；无需在主仓库安装 hooks。

## 对照代码

- [.gitignore](../../3.5-testing-basics/quality-lab/.gitignore)
- [verify-tools.mjs](../../3.5-testing-basics/quality-lab/verify-tools.mjs)
- [package.json](../../3.5-testing-basics/quality-lab/package.json)

## 操作与预期

verify:tools 在临时仓库证明已跟踪 sample.js 后来被忽略仍留在索引；临时 npm 包用无敏感内容的 dummy-secret.txt 证明 .npmignore 与 .gitignore 的差异，补规则后 dry-run 清单不再包含它。没有发布任何包。

先预测结果，再执行命令并对照文件。失败负例在工具脚本内生成和清理，`expected nonzero` 是验证目标，不代表正常工程应失败。

## 边界

适合阻止产物和本地配置误入库/包；忽略不是加密或秘密防线。真实凭据泄漏须撤销/轮换，删除工作区文件不删除历史。git rm --cached 会修改索引，先核对目标，不在本课程主仓库批量执行。private:true 防误发布但不替代产物审查。

[理论](../../../../1-notes/03-engineering/3.4-code-quality/3.4.6..gitignore.md) · [练习](../../../../3-exercises/03-engineering/3.4-code-quality/3.4.6..gitignore.md)
