# 3.5.3 Vue Test Utils：挂载 Vue 3 组件并验证 props/emits：真实示例入口

此点共享[质量与测试实验工程](../quality-lab/README.md)，不是伪造工具输出的HTML演示。

## 运行

从仓库根进入 `learning/2-examples/03-engineering/3.5-testing-basics/quality-lab`，先按共享README安装锁定依赖，再运行 `pnpm test`。脚本工作目录必须是 lab；无需在主仓库安装 hooks。

## 对照代码

- [src/TaskButton.ts](../quality-lab/src/TaskButton.ts)
- [tests/component.test.ts](../quality-lab/tests/component.test.ts)

## 操作与预期

完整 component.test.ts 导入 mount/expect，enableAutoUnmount(afterEach) 清理挂载。点击后检查 emitted，再 setProps(done:true) 检查 aria-pressed；没有把 jsdom 挂载称为真实浏览器截图。

先预测结果，再执行命令并对照文件。失败负例在工具脚本内生成和清理，`expected nonzero` 是验证目标，不代表正常工程应失败。

## 边界

适合组件公开契约。await trigger/setProps 等待 Vue 更新；不要只断言内部实例私有变量。jsdom不提供可靠真实布局，ARIA属性存在也不证明屏幕阅读器全部通过。此例用h避开尚未学习的SFC编译配置。

[理论](../../../../1-notes/03-engineering/3.5-testing-basics/3.5.3.react-testing-library.md) · [练习](../../../../3-exercises/03-engineering/3.5-testing-basics/3.5.3.react-testing-library.md)
