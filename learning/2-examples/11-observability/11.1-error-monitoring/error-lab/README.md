# Sentry Browser本地错误实验

真实Sentry Browser11.17.0（2026-11-25从官方registry核对）、Vite8.3.8、trace-mapping0.3.31、Playwright1.65.1。Node26/pnpm11.4，服务仅loopback4532。所有邮箱、token为公开合成canary，不输入真实数据。

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm build
pnpm verify
pnpm dev
# http://127.0.0.1:4532/
```

verify自动启动静态服务和后台Chrome，390/1440视口验证后关闭，CHROME_PATH可覆盖本地Chrome路径。产物、map、依赖、缓存与artifacts不提交；运行结果另归档到docs/audits。

## 实际代码与能力

- app.mjs调用真实SDK init/captureException/addBreadcrumb；DSN为example.invalid占位，custom transport只存当前页内存信封。关闭所有默认集成与client reports，仅手动捕获，不开Tracing/Replay/Logs，不向SaaS或外站发送事件。
- policy.mjs通过beforeSend重建允许字段，移除原异常消息、user/request/extra/context和URL query；保留同次构建栈位置/版本。仅ui.action固定动作进入breadcrumbs，最多3条、没有输入值/data。
- 本页最多2条允许错误，AbortError不占额度；?sample=0证明SDK错误采样为0，普通页为1。不是平台全局限流，刷新可重置。
- 真正的压缩栈经TraceMap还原到app.mjs。build.sourcemap=hidden仅去掉sourceMappingURL，本静态服务仍提供.map；不是安全部署策略，不在互联网运行本服务。
- priority是明确的教学分级函数，不是Sentry默认级别或生产事故唯一判据。平台告警、owner自动指派、通知送达、Debug ID/CI上传均未执行。
- NuxtErrorBoundary与error.vue在主综合项目；本lab不是Vue组件边界测试，也未验证Sentry Nuxt SSR请求隔离。

## 学习动作

先运行3组Node测试，再构建与verify。手动页面点击取消应无信封，正常连续3次只保留2信封；重载?sample=0后正常错误也为0。通过window.lab.crumb仅加入固定动作，检查最近3条；不要把控制台接口作为生产调试功能公开。

生产后续应采用框架官方集成、按运行时隔离scope、CI受限上传token、同次产物关联、接收端配额/隐私策略及测试告警。这里证明SDK钩子和本地source map消费，不证明SaaS接收/分组/告警。
