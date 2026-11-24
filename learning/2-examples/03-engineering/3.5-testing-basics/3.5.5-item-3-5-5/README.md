# 3.5.5 覆盖率与测试边界：用报告发现遗漏而非追逐数字：真实示例入口

此点共享[质量与测试实验工程](../quality-lab/README.md)，不是伪造工具输出的HTML演示。

## 运行

从仓库根进入 `learning/2-examples/03-engineering/3.5-testing-basics/quality-lab`，先按共享README安装锁定依赖，再运行 `pnpm coverage`。脚本工作目录必须是 lab；无需在主仓库安装 hooks。

## 对照代码

- [vitest.config.ts](../quality-lab/vitest.config.ts)
- [tests/domain.test.ts](../quality-lab/tests/domain.test.ts)
- [tests/service.test.ts](../quality-lab/tests/service.test.ts)

## 操作与预期

pnpm coverage 实际执行14项测试，报告包含3个目标源码。本轮语句96.42%、分支93.33%、函数100%、行100%；数字只描述此fixture，此例防御分支仍有未执行路径。检查漏行要结合协议和可达性，不能制造无意义用例凑100%。

先预测结果，再执行命令并对照文件。失败负例在工具脚本内生成和清理，`expected nonzero` 是验证目标，不代表正常工程应失败。

## 边界

适合发现错误分支和未覆盖模块。报告 include 不含浏览器 main.ts；该UI流程另由Playwright验收，此测试报告不是全工程100%。生产服务、跨浏览器、安全攻防和真实学习掌握均未由这些数字证明。

[理论](../../../../1-notes/03-engineering/3.5-testing-basics/3.5.5.item-3-5-5.md) · [练习](../../../../3-exercises/03-engineering/3.5-testing-basics/3.5.5.item-3-5-5.md)
