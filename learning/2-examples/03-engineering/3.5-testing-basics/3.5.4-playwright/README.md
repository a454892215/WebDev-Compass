# 3.5.4 Playwright：用可访问定位和条件等待验收用户流程：真实示例入口

此点共享[质量与测试实验工程](../quality-lab/README.md)，不是伪造工具输出的HTML演示。

## 运行

从仓库根进入 `learning/2-examples/03-engineering/3.5-testing-basics/quality-lab`，先按共享README安装锁定依赖，再运行 `pnpm test:e2e`。脚本工作目录必须是 lab；无需在主仓库安装 hooks。

## 对照代码

- [playwright.config.ts](../quality-lab/playwright.config.ts)
- [e2e/tasks.spec.ts](../quality-lab/e2e/tasks.spec.ts)
- [index.html](../quality-lab/index.html)

## 操作与预期

完整 e2e/tasks.spec.ts 以实际按钮名称/结构为准。Chrome 启动Vite后添加含HTML字符的标题、确认没有注入节点、完成和撤销；桌面1440×900与手机视口390×844各执行一次，并检查页面错误与横向溢出。

先预测结果，再执行命令并对照文件。失败负例在工具脚本内生成和清理，`expected nonzero` 是验证目标，不代表正常工程应失败。

## 边界

适合关键跨层流程；稳定选择器仍依赖正确标签和明确范围。两个视口不是所有浏览器和手机真机。现有Chrome路径仅为本机便利；其他机器用 CHROME_PATH 或按官方方式安装匹配浏览器，不能宣称零环境依赖。Cypress为选修对照。

[理论](../../../../1-notes/03-engineering/3.5-testing-basics/3.5.4.playwright.md) · [练习](../../../../3-exercises/03-engineering/3.5-testing-basics/3.5.4.playwright.md)
