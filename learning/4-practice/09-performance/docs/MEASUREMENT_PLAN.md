# 可复现测量方案

问题：两个独立读取是否不必要串行？首屏payload是否重复请求？非关键组件何时真正接管？HTTP分段是否真的到达读取端？预算是否检查真实产物？

保持同一源码/Node/浏览器、loopback与合成数据，记录环境、状态、原值及未测范围。每模式3次API样本用于验证机制，不用于统计真实用户p75。unit用gate验证依赖，避免靠“快于Xms”的易抖动断言证明因果。

| 来源                         | 测量范围                            | 不能据此声称                                  |
| ---------------------------- | ----------------------------------- | --------------------------------------------- |
| API durationMs/Server-Timing | 合成服务函数开始到两个结果齐备      | 整页SSR、网络TTFB、FCP或生产SLA               |
| Navigation.responseStart     | 当前文档time origin后首响应原始时间 | 完整web-vitals TTFB校正或跨环境可比           |
| first-contentful-paint       | 本次浏览器首次内容绘制原始条目      | LCP或整体加载完成                             |
| stage9:action Measure        | 处理函数开始到Vue nextTick之后      | 真正呈现完成、EventTiming或INP                |
| optional mounted/@hydrated   | 可选组件接管的局部信号              | 全JS未下载或整体水合CPU收益                   |
| stream reader块              | 此Node直连环境的实际分段            | 每个代理/CDN都实时转发或Nuxt组件Streaming SSR |
| 所有JS/CSS raw/gzip总和      | 全产物静态字节政策                  | 首路由transfer、Brotli、CPU或CWV              |

复现步骤：冻结安装→类型/规范/unit→build→budget→E2E，读取test-results中的JSON附件；只保留需要的摘要，不提交依赖/构建/heap/trace。错误/空样本应明确，不伪造成0指标。比较字段与预算定义必须跨版本稳定；不同压缩器、浏览器版本、缓存和设备须分开标注。

回归：必要功能/键盘/首击回放先通过，字节超预算返回非零；测试只验证受控样本与机制，不靠同一机器反复追分。远程CI模板未部署；上线RUM还需最小化数据、采样、分段维度、权限/保留、合规与可靠性设计，不能照抄本地collector收用户数据。
