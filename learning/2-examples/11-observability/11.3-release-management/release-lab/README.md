# 发布管理本地实验

Node26、pnpm11，后台Chrome由CHROME_PATH或macOS安装路径选择。仅loopback与三个公开合成fixture，不接真实身份/生产平台。先阅读本组理论再预测结果。

```
pnpm install --frozen-lockfile
pnpm test
pnpm verify
pnpm rollback
node server.mjs
# http://127.0.0.1:4534/
```

第一次维护锁文件由作者执行pnpm install；学习者使用已提交锁文件。verify自动起停服务/Chrome，单独server用Ctrl-C关闭。

core.mjs：SHA-256派生0–9999桶（教学算法，不兼容Unleash的MurmurHash）；配置来自服务端，kill优先白名单、区域和百分比。未加载/无效配置保守关闭，不实现远程刷新、配置TTL、平台签名或授权。固定分组与主体时扩大百分比保留旧群组；更换group会重新分配。区域来自固定合成上下文，不是读取用户自报值授予权限。

assignment只分配，不产生曝光。点击“显示实验卡片”后IntersectionObserver观察50%交叉才记录；这是可操作的视口近似，不证明人确实看见，也未处理遮挡/后台标签注意力。服务端验证固定主体/分配版本/前置曝光，重复曝光和转化幂等。三个fixture共用公开内存计数，重启清空，无多实例存储。浏览器事件可伪造，不是订单真实转化或统计显著性/无机器人保证。切换fixture是教学操作，不是允许生产用户挑选试验组。

rollback.mjs在系统临时目录创建stable/candidate manifest及真实SHA-256命名的资源，用同目录rename切换并恢复稳定manifest，两版本资源保留，finally删除整个临时目录。这验证文件层机制，不运行实际SSR进程、不操作CDN或数据库、不证明跨平台/跨卷/分布式原子发布。真实Nuxt部署需要版本完整的.output及服务切换和健康验证；数据库按扩展—兼容—收缩协调，不能机械反向迁移。

HTTP事件只收variant/kind，2048字节允许上限（读超8192停止），固定Origin拒绝、未知主体/额外字段拒绝；不是生产限流/认证/完整慢流防护。仅本地无敏感数据，不使用Cookie，不上报外部服务。

[示例目录](../README.md)
