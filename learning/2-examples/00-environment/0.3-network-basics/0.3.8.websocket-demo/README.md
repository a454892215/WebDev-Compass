# 0.3.8 WebSocket 迷你示例

对应笔记：[0.3.8 WebSocket](../../../../1-notes/00-environment/0.3-network-basics/0.3.8.websocket.md)

零依赖 Node.js：HTTP 提供页面，同一端口升级为 WebSocket 聊天室（广播）。

## 运行

```bash
cd learning/2-examples/00-environment/0.3-network-basics/0.3.8.websocket-demo
node server.js
```

浏览器打开 `http://127.0.0.1:3788`，可再开一个标签页模拟多客户端。

## 观察要点

1. DevTools → Network → WS：查看握手（101）、Frames 收发
2. 一方发送，另一方实时收到（全双工）
3. 停止 `server.js` 后页面触发 `close`；重启后点「重连」
4. 对比若用 HTTP 轮询需要多少次请求

## 说明

本示例为教学用极简实现（文本帧 + 广播），**勿用于生产**。生产请使用成熟库（如 `ws`）并补齐心跳、鉴权、限流与 `wss`。

协议边界：仅演示小型、完整文本帧广播和浏览器 open/message/close；不实现完整分片、控制帧 ping/pong、背压、Origin/认证和限流。服务只监听 loopback，不收集真实数据；不要用此实现作为生产 WebSocket 协议参考。浏览器 JS 的业务 JSON 心跳与协议 ping 控制帧不同。
