# 阶段9：Nuxt首屏、数据瀑布与按需水合实践

前置阶段0–8，重点6性能机制、7产物/部署、8模块和状态。目标是能提出测量问题、找出依赖/呈现成本、保留真实对照和回归证据；不是追一次Lighthouse高分或把合成访问称RUM。

## 运行和验证

在本目录执行；Node26.0.0/pnpm11.4.0，本轮沿用Nuxt4.7.0、Vue3.5.46、TS6.0.3锁文件基线。

```bash
pnpm install --frozen-lockfile
pnpm dev
# http://127.0.0.1:4517/?mode=parallel 或 mode=serial
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm budget
pnpm test:e2e
pnpm format:check
```

budget读取真实.output/public/_nuxt中的全部JS/CSS，逐文件求raw与gzip字节总和，阈值500000/200000是本教学项目的显式政策，不是CWV官方阈值、首路由传输量、Brotli或CPU成本。无目录/空产物/非法阈值不能假通过。预算脚本复用本知识库metrics-lab工具，独立拷贝项目时须一起搬走或正式封装工具，不能期待仓库外相对路径仍存在。pnpm check最后构建并执行字节预算；远程CI未运行。

test:e2e需要先build，自动启动loopback生产服务器和后台Chrome后关闭；默认macOS Chrome，其他环境设置CHROME_PATH。主4517、metrics4518、loading4519、runtime4520。依赖/store/产物/trace/heap快照不提交。

## 按源码理解实际机制

1. server/utils/load-catalog.ts的两独立合成源各等待30ms。serial先后调用，parallel用Promise.all；unit用受控gate证明启动顺序，而不硬断言所有机器总会快两倍。不是网络/数据库基准，也没有生产负载。
2. GET /api/catalog?mode=serial|parallel返回公开课程与durationMs，Server-Timing:catalogue只描述服务函数跨度；该API头不自动成为HTML导航的Server-Timing。页面SSR中通过requestFetch调用本地路由可走Nitro内部调用，不代表SSR额外发了真实外网请求。
3. useAsyncData按mode建key并接管payload。初始浏览器无重复API，模式切换会正确读取，refresh重新SSR不算错误重复。未知mode400、未知文档404；没有真实用户/秘密。
4. OptionalPanel使用defineLazyHydrationComponent的interaction/click策略：HTML已在SSR响应，首次点击才接管并回放，计数从0到1。@hydrated与局部onMounted mark证明接管，不证明所有JS都没下载/CPU下降/INP达标。局部mark在重新挂载前清旧值、卸载清理。
5. 主交互用performance.mark/measure覆盖JS到Vue nextTick，明确不叫正式INP或浏览器绘制完成。Playwright另记录Navigation.responseStart与FCP原始条目；无值不写0成功，不是web-vitals完整校正TTFB。
6. /stream-demo是H3 sendStream的独立静态HTTP HTML响应，先头/正文再40ms后尾段，测试reader实际读到多段。它不经过Nuxt组件渲染，不称Nuxt默认Streaming SSR。当前生产Nuxt renderer先await renderToString的源码已核读；代理缓冲/压缩/网络仍可能合并实际传输。

## 四部分及三个实验

[理论](../../1-notes/09-performance/README.md) → [代码与观察](../../2-examples/09-performance/README.md) → [独立练习](../../3-exercises/09-performance/README.md) → [30项综合任务](./tasks.md)。

- metrics-lab：真实web-vitals attribution、Navigation/Resource/Longtask/Measure，本地手动发送最小快照，有界采样/去重和真实字节预算正反例；不是生产用户分布，没有自动外网上报。
- loading-lab：延迟非关键CSS、开放授权字体/许可、响应式格式/LQIP、推测能力检测/回退、公开缓存key与带凭据旁路、Node真实103。没有真实HTTP3/CDN发布或浏览器实际prerender保证。
- runtime-lab：真实长任务/分片/取消、变高虚拟窗口与全量模式、有界Worker队列/transfer/取消、idle回退与清理；通过CDP HeapProfiler观察合成保留对象与element引用，原始快照只在ignored artifacts，不是所有页面无内存泄漏证明。

所有Task区分已有、独立lab和要求副本新增；Partytown、React渲染、Edge、远程CI/LHCI为明确观察/选修，不全部默认安装。

[测量方案](./docs/MEASUREMENT_PLAN.md)与[CI门禁示例](./docs/quality.yml.example)帮助别人复现。本轮范围/结果见[验收](../../../docs/audits/STAGE_9_ACCEPTANCE.md)。没有真实RUM/生产p75、真机/跨浏览器/读屏、生产TLS/CDN/Edge、远程CI或学习者试学；本轮未运行Lighthouse/LHCI，不把字节检查冒称这些工具已通过。
