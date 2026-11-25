# 供应链与隐私独立实验

本目录执行pnpm install --frozen-lockfile、pnpm build、pnpm test、pnpm verify。Node26/pnpm11.4，后台Chrome；4524主服务、4526跨源图片，finally关闭。只有合成数据，无真实用户或外部分析上报。

Vite真实hidden sourcemap保留源码注释但不在JS加map注释，HTTP仍可取.map；这不是访问控制。服务器环境合成canary不进入客户端产物，扫描只证明已知标记不在该产物，不保证没有未知秘密。

默认/拒绝不加载可选模块或事件，允许后才加载并发本地最小事件，撤回终止并清理可选localStorage。已下载代码不能“撤回下载”；真实供应商需其停用/删除机制，lab不是完整CMP或合规认证。只记录allowlist route/status/kind，不收query/headers/表单；生产路由、IP、平台日志仍另审。

/isolation真实COOP same-origin+COEP require-corp，跨源图片允许带CORP cross-origin，缺CORP图片阻挡；不代表所有OAuth/嵌入兼容。Chrome loopback secure-context结果不代替公网TLS/多浏览器。

日志在本地内存最多50条，服务关闭时清空；撤回按钮只清自有本地可选存储并停止新处理，不声称删除全部已有记录或第三方数据。用于证据的artifact只含合成事件，默认忽略不提交。
