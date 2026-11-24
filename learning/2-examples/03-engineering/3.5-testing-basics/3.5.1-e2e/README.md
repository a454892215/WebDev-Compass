# 3.5.1 测试分层：单元、组件与端到端如何配合：真实示例入口

此点共享[质量与测试实验工程](../quality-lab/README.md)，不是伪造工具输出的HTML演示。

## 运行

从仓库根进入 `learning/2-examples/03-engineering/3.5-testing-basics/quality-lab`，先按共享README安装锁定依赖，再运行 `pnpm test`。脚本工作目录必须是 lab；无需在主仓库安装 hooks。

## 对照代码

- [tests/domain.test.ts](../quality-lab/tests/domain.test.ts)
- [tests/component.test.ts](../quality-lab/tests/component.test.ts)
- [e2e/tasks.spec.ts](../quality-lab/e2e/tasks.spec.ts)

## 操作与预期

lab 的 domain/service 测试运行在 Vitest；Vue 组件 mount 在 jsdom；Playwright 在真实 Chrome 打开原生页面。三类证据各有范围：mock HTTP 没有验证真实服务器，jsdom 没有验证真实排版。

先预测结果，再执行命令并对照文件。失败负例在工具脚本内生成和清理，`expected nonzero` 是验证目标，不代表正常工程应失败。

## 边界

适合制定最小充分回归。导入解析的多种非法输入放单元；props/emits 放组件；表单可用和文本安全放关键 E2E。移动视口只验证布局尺寸，不能称手机真机或完整无障碍认证。

[理论](../../../../1-notes/03-engineering/3.5-testing-basics/3.5.1.e2e.md) · [练习](../../../../3-exercises/03-engineering/3.5-testing-basics/3.5.1.e2e.md)
