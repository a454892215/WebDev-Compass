# 真实web-vitals与产物预算实验

Node26/pnpm11.4；锁定web-vitals6.2.3、Vite8.3.8、Playwright1.65.1，官方registry于2026-11-25实核。目录内执行：

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm test
pnpm budget
pnpm verify
```

verify在loopback4518启动服务和后台Chrome，1440/390视口结束自动关闭。其他Chrome可设CHROME_PATH。不联系第三方，不收集真实用户。记录默认仅内存；手动发送才POST当前本地/collect，测试结束删除内存记录。没有生产认证/同意管理/数据库；不要将教学collector公开部署。

app.mjs真实注册web-vitals/attribution的onLCP/onINP/onCLS，reportAllChanges仅用于本地诊断；库依据生命周期和交互输出，不是每个点击一次，也不能把尚未回调写0。90ms阻塞是合成长任务，CLS样本650ms后改变布局，原生Performance条目和业务measure分别存有界内存。按metric name/id更新同一访问的最新值，不对value再次求和。buffered支持此前条目，但不能恢复所有未知会话。

safeMetric只保留度量值、短期metric id、固定route模板、build和有限数值分项；DOM/selector、原始URL/query、用户输入与attribution原对象不发送。buffer采样开关/去重/上限有测试；实际sampled:true只因合成实验，不是上线100%采样建议。collector拒绝额外字段和非法值。本轮手动fetch需要确认响应，不是full-session fetchLater后台投递实现；生产生命周期方案需另核对支持、配额/取消和失败，不能保证关页时必达。

budget.mjs真实读取目录全部.js/.css，逐文件raw和gzip字节后求和：

```bash
node budget.mjs dist 100000 50000
# 通用工具也可在Nuxt根运行：
# node ../../2-examples/09-performance/9.1-performance-metrics/metrics-lab/budget.mjs .output/public/_nuxt 500000 200000
```

目录不存在、没有匹配产物、阈值非法或超预算均非零退出；unit用真实Vite产物和极低阈值证明会失败。该量是全产物JS/CSS库存，不是首路由实际下载、Brotli、CPU或LCP预算。每项阈值是教学项目选择，不把本机一次值当生产标准。

没有跑本轮Lighthouse/LHCI、WebPageTest远端或真实RUM；相关教程为明确官方观察。Partytown未装，worker不能天然让脚本兼容。浏览器数据只代表本轮合成操作与设备，p75函数演示用合成数组，不能声称真实用户达标。
