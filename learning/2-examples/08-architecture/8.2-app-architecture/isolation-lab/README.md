# 模块生命周期、样式与通信隔离实验

Node26/pnpm11.4；运行时无第三方库，Playwright1.65.1只用于验证。

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm verify
# 或 pnpm serve，浏览器 http://127.0.0.1:4513
```

后台Chrome测试390/1440，两个本地服务4513/4516，finally关闭。跨源端口不同是真正不同源，但不是完整生产sandbox。原生registry仅可信代码扩展点，不运行远程ModuleFederation；样式隔离不是权限隔离；配置解析器仅有限白名单，并非完整JSON Schema。真实路由使用History且直接刷新，未知资源/路由404。

按顺序：先logic.mjs端口/协议/registry，再app.mjs挂载、幂等dispose、ShadowCSS、消息source+origin+payload检查；最后verify.mjs看失败断言。两个跨源frame同源但source不同，一个非受信origin；错误版本来自受信frame。

每点操作卡会明确已有机制、官方观察与副本新增；此lab不提供真实多团队独立发布、认证、ModuleFederation版本协商或完整无障碍认证。
