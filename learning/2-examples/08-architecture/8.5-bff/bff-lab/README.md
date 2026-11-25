# 固定目标BFF、失败预算与DTO实验

前置：阶段3 Node/类型、阶段5 HTTP、阶段6安全、阶段7部署。Node26，本lab无npm依赖，命令在仓库根执行：

```bash
node --test learning/2-examples/08-architecture/8.5-bff/bff-lab/verify.mjs
# 手动观察，结束Ctrl-C；固定4514，upstream随机loopback端口
node learning/2-examples/08-architecture/8.5-bff/bff-lab/server.mjs
```

GET /api/v1/workspace?scope=alice 或 /api/v2/workspace?scope=bob；scenario允许ok、slow-optional、slow-required、bad-required。scope只选公开合成fixture，任何人可请求，不是认证。拒绝额外url/未知scope，不向外网或私网服务发攻击请求。所有上游地址来自本进程创建的固定127.0.0.1服务，fetch redirect:error。

正常聚合200 complete；可选progress慢于80ms总deadline则200 degraded、progress:null及警示；必要catalog超时504，必要DTO错502。deadline取消fetch，upstream close记录未完成请求被取消；不无界等待，不把进度未知当0。真实业务还须并发限额、重试/幂等、上游身份/权限、出口控制与日志监测，本lab无真实用户。

mapCatalog从unknown形状检查后只映射id/title/updatedAt，移除internal_note；时间仅支持UTC秒精度ISO或null，用解析后往返拒绝溢出日期，不能宣称支持全部ISO8601。上游固定小响应是可信合成fixture，未实现生产流式响应大小限制或恶意压缩包保护。

v1/v2共享原字段，v2增加meta.schemaVersion；v1有Deprecation结构日期@秒、Sunset HTTP-date、successor-version链接。日期只是教学fixture，不代表真实服务下线。兼容迁移仍需消费者契约和窗口。

两个Node测试组实际覆盖DTO正/负/日期样本、真实HTTP聚合、四并发scope、可选降级/必要超时/坏DTO、取消、header格式、未知URL不发上游、405。HTTP断言有2秒上限；80ms是可控fixture deadline，不是业务P95/SLO或机器性能保证。服务在finally关闭。

主Nuxt的进程内adapter不是这个HTTP lab；GraphQL/RSC/Edge/Astro只按其操作卡官方观察，未安装/部署不算通过。阶段7三profile历史证据标注来源，不为目录比较重复构建。

[操作卡目录](../README.md) · [综合项目](../../../../4-practice/08-architecture/README.md)
