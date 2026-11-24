# 3.4.3 EditorConfig：约定编辑器缩进、换行与编码：真实示例入口

此点共享[质量与测试实验工程](../../3.5-testing-basics/quality-lab/README.md)，不是伪造工具输出的HTML演示。

## 运行

从仓库根进入 `learning/2-examples/03-engineering/3.5-testing-basics/quality-lab`，先按共享README安装锁定依赖，再运行 `pnpm verify:tools`。脚本工作目录必须是 lab；无需在主仓库安装 hooks。

## 对照代码

- [.editorconfig](../../3.5-testing-basics/quality-lab/.editorconfig)
- [verify-tools.mjs](../../3.5-testing-basics/quality-lab/verify-tools.mjs)

## 操作与预期

verify:tools 在隔离目录把 indent_size 设成4，通过 Prettier.resolveConfig(...,{editorconfig:true}) 读到 tabWidth:4，并实际格式化出四空格。这证明支持工具的读取；没有冒充所有编辑器保存行为已测试。

先预测结果，再执行命令并对照文件。失败负例在工具脚本内生成和清理，`expected nonzero` 是验证目标，不代表正常工程应失败。

## 边界

适合跨编辑器基础约定。Prettier 显式配置可以覆盖其映射的 EditorConfig 属性；charset 不会替你把既有二进制或坏编码自动修好。Markdown 尾空格可能有意义，可单独设 trim_trailing_whitespace=false。

[理论](../../../../1-notes/03-engineering/3.4-code-quality/3.4.3.editorconfig.md) · [练习](../../../../3-exercises/03-engineering/3.4-code-quality/3.4.3.editorconfig.md)
