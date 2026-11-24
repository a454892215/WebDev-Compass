# 阶段 0 示例运行入口

```bash
# 仓库根目录；两个端口一起启动，Ctrl+C 一起关闭
node learning/2-examples/00-environment/server.mjs
```

打开 `http://127.0.0.1:4180/learning/2-examples/00-environment/0.1-what-is-web-app/0.1.1.request-response-demo.html`。

本服务仅监听 127.0.0.1，提供 HTTP/1.1、静态教材与确定性 HTTP/CORS fixture；4180 为页面源，4181 为跨源目标。可用 `STAGE0_PORT`、`STAGE0_CROSS_PORT` 调整，跨源实验读取页面查询参数 `crossPort`（默认为 4181）。fixture 的 POST 是回显、不落库；真实内存 CRUD 与 WS 按各自 README 另启动。不支持生产认证、TLS、DNS/CDN 或 HTTP/2/3 验收。

网络演示不再默认调用公网 API。外部 DNS、TLS、协议观察按清单选择获准对象，无法运行时记录未验证。
