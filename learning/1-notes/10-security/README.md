# 阶段10：XSS/CSRF防护、认证安全与隐私 — 理论知识与原理

前置0–9，重点认证/浏览器边界/部署/状态。目标是按真实模型选择防护，复现拒绝并说明残余风险。29点不以库、header或audit数量当完整安全认证。

先10.1资产/基线/建模，再10.2输入输出与请求、10.3身份授权；10.4发布信任和10.5隐私贯穿。每点机制→最小实验/明确观察→独立变体→综合任务。

- [基线、风险分类与威胁建模](./10.1-security-baseline/README.md)
- [注入、CSRF与浏览器边界](./10.2-vulnerabilities/README.md)
- [认证、刷新与服务端授权](./10.3-auth-advanced/README.md)
- [供应链、秘密与源码发布](./10.4-supply-chain/README.md)
- [数据目的、选择与隐私边界](./10.5-privacy-compliance/README.md)

[四部分入口](../../README.md) · [安全笔记](../../4-practice/10-security/README.md) · [29任务](../../4-practice/10-security/tasks.md)

匿名fixture、真实认证、授权、浏览器策略和合规分开。只在loopback使用合成数据；静态检查/AI审阅不是渗透测试或人类试学。
