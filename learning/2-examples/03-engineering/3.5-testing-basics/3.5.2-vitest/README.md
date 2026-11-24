# 3.5.2 Vitest：边界断言、异步失败和依赖替身：真实示例入口

此点共享[质量与测试实验工程](../quality-lab/README.md)，不是伪造工具输出的HTML演示。

## 运行

从仓库根进入 `learning/2-examples/03-engineering/3.5-testing-basics/quality-lab`，先按共享README安装锁定依赖，再运行 `pnpm test`。脚本工作目录必须是 lab；无需在主仓库安装 hooks。

## 对照代码

- [tests/domain.test.ts](../quality-lab/tests/domain.test.ts)
- [tests/service.test.ts](../quality-lab/tests/service.test.ts)
- [src/service.ts](../quality-lab/src/service.ts)

## 操作与预期

查看 service.test.ts 的完整 import 与 fixture：HTTP错误时不解析 JSON；还验证传输、JSON解析和协议失败。domain.test.ts 测空白、重复ID、非法 unknown 输入与不可变更新。verify:tools 的受控错误断言确实导致非零退出后清理。

先预测结果，再执行命令并对照文件。失败负例在工具脚本内生成和清理，`expected nonzero` 是验证目标，不代表正常工程应失败。

## 边界

适合快速业务边界回归。mock 成功只证明代码处理这个替身，不证明真实网络协议；外部响应仍要 runtime decode。Jest 可选对照，本课程主线不重复安装。

[理论](../../../../1-notes/03-engineering/3.5-testing-basics/3.5.2.vitest.md) · [练习](../../../../3-exercises/03-engineering/3.5-testing-basics/3.5.2.vitest.md)
