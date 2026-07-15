# 0.3 网络基础（Web 开发者必备）

> [← 返回阶段 0](../README.md) · [← 返回知识库地图](../../../knowledge-map/01-foundation-stages-0-2.md#03-网络基础web-开发者必备)

浏览器与服务器之间靠 **URL、HTTP(S)、DNS、TLS、Cookie/存储、REST、WebSocket** 这套网络栈协作。本节建立 Web 开发者日常调试与对接 API 所需的网络心智模型。

## 知识点列表

| 序号 | 知识点 | 笔记 | 示例 |
| --- | --- | --- | --- |
| 0.3.1 | URL 结构 | [0.3.1.url.md](./0.3.1.url.md) | [0.3.1.url-parse-demo.html](../../../examples/00-environment/0.3-network-basics/0.3.1.url-parse-demo.html) |
| 0.3.2 | HTTP/HTTPS：方法、状态码、头 | [0.3.2.http-https.md](./0.3.2.http-https.md) | [0.3.2.http-methods-demo.html](../../../examples/00-environment/0.3-network-basics/0.3.2.http-methods-demo.html) |
| 0.3.3 | HTTP/1.1、HTTP/2、HTTP/3 差异 | [0.3.3.http-http-http.md](./0.3.3.http-http-http.md) | [0.3.3.http-versions.md](../../../examples/00-environment/0.3-network-basics/0.3.3.http-versions.md) |
| 0.3.4 | Cookie / Session / Storage | [0.3.4.cookie-session-localstorage-sessionstorage.md](./0.3.4.cookie-session-localstorage-sessionstorage.md) | [0.3.4.storage-demo.html](../../../examples/00-environment/0.3-network-basics/0.3.4.storage-demo.html) |
| 0.3.5 | DNS 与 CDN | [0.3.5.dns.md](./0.3.5.dns.md) | [0.3.5.dns-cdn.md](../../../examples/00-environment/0.3-network-basics/0.3.5.dns-cdn.md) |
| 0.3.6 | TLS/SSL 与 HTTPS | [0.3.6.tls-ssl.md](./0.3.6.tls-ssl.md) | [0.3.6.tls-overview.md](../../../examples/00-environment/0.3-network-basics/0.3.6.tls-overview.md) |
| 0.3.7 | RESTful API 设计约定 | [0.3.7.restful-api.md](./0.3.7.restful-api.md) | [0.3.7.rest-api-demo/](../../../examples/00-environment/0.3-network-basics/0.3.7.rest-api-demo/) |
| 0.3.8 | WebSocket 与长连接 | [0.3.8.websocket.md](./0.3.8.websocket.md) | [0.3.8.websocket-demo/](../../../examples/00-environment/0.3-network-basics/0.3.8.websocket-demo/) |
| 0.3.9 | 📱 移动端对照 | [0.3.9.retrofit-okhttp-dio-fetch-axios.md](./0.3.9.retrofit-okhttp-dio-fetch-axios.md) | — |

## 学习建议

1. **0.3.1 → 0.3.2** 先打牢「地址 + 报文」基础，后续所有调试都依赖它们。
2. **0.3.3、0.3.5、0.3.6** 偏原理：理解概念即可，不必手写协议实现。
3. **0.3.4、0.3.7、0.3.8** 边读边跑示例，对照 DevTools Network / Application 面板。
4. **0.3.9** 有移动端背景时最后通读，做工具链对照。

## 学完后自测

- [ ] 能拆解任意 URL 的协议、主机、端口、路径、查询、锚点
- [ ] 能说出常见 HTTP 方法语义与 2xx / 3xx / 4xx / 5xx 状态码类别
- [ ] 能说明 Cookie 与 localStorage 的核心区别及适用场景
- [ ] 能解释 HTTPS 相对 HTTP 多了哪些安全能力（加密、完整性、身份）
- [ ] 能按 REST 约定设计一组 CRUD 接口路径与方法
- [ ] 能说出 WebSocket 相比轮询的优势与适用场景
