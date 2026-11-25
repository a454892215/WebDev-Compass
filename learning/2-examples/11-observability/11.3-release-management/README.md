# 11.3 发布管理：示例

前置阶段5/7/8。先开关→稳定灰度→实验归因，再预览→回滚→事件响应。目标是解释信任边界并在本地复现稳定分配、止损和恢复；平台接入/真实部署不冒称已做。

- [11.3.1 Feature Flag与Kill Switch：配置开关、失效默认值与服务端边界](./11.3.1.feature-flag-demo.md)
- [11.3.2 Canary灰度：稳定群组、分版本指标与停止条件](./11.3.2.canary-demo.md)
- [11.3.3 A/B实验：分配、可见曝光、转化与污染控制](./11.3.3.a-b-demo.md)
- [11.3.4 PR预览环境：环境隔离、秘密边界与销毁](./11.3.4.preview-deployment-demo.md)
- [11.3.5 回滚：不可变产物、旧资源保留与数据库兼容](./11.3.5.item-11-3-5-demo.md)
- [11.3.6 事件响应：先恢复、再定位，形成可执行Runbook与复盘](./11.3.6.incident-response-demo.md)

[运行release-lab](./release-lab/README.md)：稳定分桶、可见曝光、真实临时产物回退。预览为官方观察，响应为明确桌面推演。

[四部分入口](../../README.md) · [综合项目](../../../4-practice/11-observability/README.md)
