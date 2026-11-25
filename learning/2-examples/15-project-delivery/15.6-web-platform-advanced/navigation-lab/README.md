# 原生导航、OPFS与WebRTC实验

对应15.6.1–15.6.4；先读理论，再预测结果，最后运行。Node26、pnpm11，锁定Playwright1.65.1。进入本目录：

```sh
pnpm install --frozen-lockfile
pnpm test
```

使用已安装Google Chrome，默认路径为macOS标准安装路径，其他环境通过CHROME_PATH指定；若无浏览器，先按Playwright官方说明安装或指定可用版本。verify.mjs后台启动4575回环服务和独立临时浏览器上下文，结束自动关闭，不切换前台、不访问真实账号/公网服务。报告写dist/runtime.json，不提交生成物。

交互观察可运行pnpm serve，打开http://127.0.0.1:4575。完成后Ctrl+C。不要同时运行test与serve争用端口。

## 四个机制

1. ViewTransition包住局部文字更新，等待finished后聚焦h2；API缺失/强制fallback/减弱动画走直接更新。
2. Navigation API只拦截同源允许路径，排除锚点/下载/表单，不吞外部链接；同文档marker和返回标题验证历史行为。?fallback=1使用普通a整页导航，服务器直接支持深链。
3. OPFS写入唯一的compass-fixture文件，close后读回，再finally仅删除这一个文件；测试确认该合成前缀没有残留。不会清空整个源或用户磁盘。
4. 两个真实RTCPeerConnection本地交换offer/answer和ICE，打开RTCDataChannel传synthetic-ping，再关闭两peer/channel/timer。无camera/microphone、STUN/TURN或远端连接。

本轮Chrome158.0.8127.37通过7组断言。源码app.mjs包含机制，verify.mjs是具体证据，serve.mjs只提供固定本地资源/路径。未知路径404，无任意文件代理。HTML中的路由和模块使用固定loopback绝对URL，以表达真实服务路由而非仓库静态文件路径；修改端口需同步页面、服务和测试。实际模块与路由由浏览器测试核验。

## 已发现的故障与边界

最初只允许/nav/one和/nav/two，漏掉初始/路径；后退时未正确重渲染初始视图。已将/纳入同一处理器，并让测试等待实际标题、核同文档marker，而不是只等URL。普通链接回退路径另有验证。

这不是Vue/Nuxt路由插件，主Nuxt继续使用原路由owner。没有多浏览器/真机/读屏、真实音视频权限、弱网或生产TURN测试。OPFS不是永久备份，强制unsupported是受控测试分支而非另一浏览器的真实兼容证据。浏览器API要在目标支持范围内特性检测，失败保留明确替代入口。

[返回操作卡索引](../README.md)
