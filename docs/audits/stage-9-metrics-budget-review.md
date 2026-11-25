# 阶段9.1/9.2测量与预算逐点审查

2026-11-25，开始09:41:33 UTC。范围12点，先按AUTHORING R01–R09与地图核对；未发现需要新编号的明显缺口，补采样/隐私/缺样本、支持检测、字段与单位、确定性门禁和工具边界。

## 逐点事实

- 9.1.1：Lab与真实访问分布、冷热缓存、设备/样本/分位数区别。nearest-rank的合成数组是计算练习，不叫RUM；Lighthouse/WebPageTest本轮仅官方观察。
- 9.1.2：真实web-vitals6.2.3 attribution注册，LCP/INP/CLS均有本地回调；INP分项、90ms合成长任务和650ms后CLS样本，没把TBT或业务耗时当INP。LCP DOM/selector只本地临时诊断，不上传。
- 9.1.3：只注册一次、reportAllChanges诊断、name/id更新最新value、有界去重/采样拒绝、最小route/build/数值分项。真实发送只在用户动作时POST本地并确认204，未实现fetchLater/full-session可靠投递。
- 9.1.4：真实Navigation/Resource/Longtask/Measure条目，支持检测/缓冲/上限/清理；无跨源TAO实测，不从0 transferSize推断零网络成本。
- 9.1.5：同名mark/measure清理与真实异步20ms/DOM写入边界；明确不是呈现完成或INP。Vue/React工具UI未操作，主Nuxt业务measure由主代理另验。
- 9.1.6：真实产物预算有超限/缺目录/空报告失败，LHCI collect/assert按官方观察不冒称远端CI或LHCI已运行；不追单次分数。
- 9.1.7：移动APM与Web文档/软导航/后台/bfcache/投递区别，不搬原生生命周期或完整URL；soft-navigation仅支持检测后的渐进增强。
- 9.2.1：raw/gzip逐文件库存及教学阈值范围明确，不冒充首路由transfer/Brotli/CPU/CWV；功能/无障碍/安全不因预算削减。
- 9.2.2：真实按文件排序表与模块可视化区别；Vite8 Rolldown/Oxc由官方迁移页核实，未安装visualizer/webpack/map分析器，不把文件表叫依赖树。
- 9.2.3：CLI非零退出与真实子进程负例，build && budget可接pipeline；已核读主Nuxt package复用同一纯Node工具，远端Actions/评论未运行。
- 9.2.4：真实lab外部请求为0，只打包web-vitals；供应商清单/本地替身为副本扩展，不假装审计真实广告/聊天SDK。执行/网络/数据/同意是不同维度。
- 9.2.5：Partytown官方DOM代理/节流/UI密集不适配及回退取舍，只观察未安装；普通Worker不是该工具已集成或安全沙箱。

每点理论、操作卡、独立变体均有具体两标准、故障与参考；两个integration-cases供主代理生成12个任务。现有/扩展、真实/官方观察分清，没有以同一通用任务充数。

## 实际运行与问题关闭

官方npm registry实核web-vitals6.2.3、Vite8.3.8、Playwright1.65.1；Node26/pnpm11.4，冻结离线安装最终通过。4项Node验证安全payload/有界去重与采样/非空合成分位数/真实构建与门禁正反例。最终Vite资产raw17207、gzip6681，声明限额100000/50000通过；1字节限额、缺目录、空产物、非法阈值均失败。

两视口390/1440后台Chrome通过：真实LCP/INP/CLS值，Longtask/Navigation/Resource/Measure；发送前无collector记录，手动发送后204/一快照；原始query token与DOM不上传，额外url字段400，17000字节body413；无外部请求、无pageerror/横向溢出。最终collector超限逻辑先有界读取/排空再返回413，复验两视口完成，避免提前结束迭代破坏响应。最后仅格式与重新构建/Node预算，未改浏览器行为，复用本轮该两视口结果，不冒称重跑。

本轮不运行Lighthouse/LHCI/WebPageTest远端，无真实RUM/生产p75、跨浏览器/真机/真实读屏或学习者试学。代码没有隐式外网上报；manual snapshot需要响应确认，和无需响应的fetchLater延后投递目标不同，未冒称实现后者。

## R01–R09及来源

R01十二编号完整；R02指标/范围→采集→归因→预算/门禁顺序；R03先MWG performance/INP/full-session，再web.dev/web-vitals/Vite/LHCI/Partytown官方；R04实际库/产物与观察工具区分；R05每点独立变体和可复现错误；R06主Nuxt/独立lab/新增扩展明确；R07指标/单位/时间原点/隐私一致；R08最小必要检查通过、collector413复验；R09版本/结果/范围单列，正式全阶段由主代理集成。

Partytown旧builder.io地址本轮timeout，已改读当前partytown.qwik.dev/trade-offs正文；未把失败页算已读。MWG no-store/bfcache过时绝对说法不复用；指标/工具官方细节优先更具体资料。

自建4518服务/Chrome已finally关闭，内存collector清空。依赖/dist/artifacts忽略，未暂存/提交，由主代理统一处理。
