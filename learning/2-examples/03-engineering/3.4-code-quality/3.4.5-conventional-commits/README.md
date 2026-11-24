# 3.4.5 Conventional Commits：写清变更类型、范围与破坏性变化：真实示例入口

此点共享[质量与测试实验工程](../../3.5-testing-basics/quality-lab/README.md)，不是伪造工具输出的HTML演示。

## 运行

从仓库根进入 `learning/2-examples/03-engineering/3.5-testing-basics/quality-lab`，先按共享README安装锁定依赖，再运行 `pnpm verify:tools`。脚本工作目录必须是 lab；无需在主仓库安装 hooks。

## 对照代码

- [verify-tools.mjs](../../3.5-testing-basics/quality-lab/verify-tools.mjs)

## 操作与预期

verify:tools 检查两个合法教学标题和一个无结构标题；使用的是项目标题子集正则，并非完整规范解析器。真实规范包括正文/footer，多行内容不能靠这一个正则完全验证。

先预测结果，再执行命令并对照文件。失败负例在工具脚本内生成和清理，`expected nonzero` 是验证目标，不代表正常工程应失败。

## 边界

适合变更日志和回溯。标题格式不会保证业务质量、测试充分或自动发布安全；语义版本和发布仍需团队规则、兼容分析与授权。本仓库默认中文描述，保留英文 type/scope。

[理论](../../../../1-notes/03-engineering/3.4-code-quality/3.4.5.conventional-commits.md) · [练习](../../../../3-exercises/03-engineering/3.4-code-quality/3.4.5.conventional-commits.md)
