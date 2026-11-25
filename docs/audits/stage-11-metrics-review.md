# 阶段11.2日志与指标逐点审查

2026-11-25；5个稳定编号，理论/示例/练习和综合任务数据逐点交叉阅读。主项目、全阶段tasks/manifest由主作者整合，本组不代替整阶段验收。

## 逐点结论

- 11.2.1：日志/trace/metric分工、采集前字段允许列表、原始query/token/身份不输出；HMAC固定教学密钥与假名仍可关联的边界明确。字段level不自动对应事故P级。safeLog正反单测及浏览器输入诱饵检查通过。
- 11.2.2：W3C合法/全零无效、当前父span传播与不可信header、不从trace授权明确。使用真实当前OTel SDK、AsyncLocalStorage与内存导出，并发延迟相反仍隔离、parent/child均实际检查。没有Collector/多服务自动插桩。
- 11.2.3：单位、count/sum、累积le桶与OTel内部互斥桶、跨实例p75不可平均、有限标签基数正确。四合成样本手算/单测；真实MeterProvider counter/histogram与HTTP耗时采集通过。耗时不是INP；真实web-vitals复用阶段9入口而不冒称本轮重跑。
- 11.2.4：Replay不是单纯视频，DOM/network/URL各自边界；厂商Private by Default条件与掩码/排除差别参考已读官方。纯门控单测与零第三方请求不证明供应商脱敏或录屏，教材和任务明确官方观察。
- 11.2.5：真实RUM/合成分开、抽样缺失/分母/样本、SLO预算/burn rate、双窗及无数据分支明确。99.9%/14.4和最少100样本分别是参考示例与本lab选择，非普适默认/线上承诺。fetchLater按MWG官方方案阅读，本lab即时fetch用于需要响应的诊断，未冒称完整session末尾交付。

## 规划与递进

保留5点。将真实缺口补入原有条目：日志秘密边界、trace上下文/采样信任、低基数指标、Replay初始化/撤回、SLO/无数据/长短窗；无重复新ID。建议日志→trace→指标→RUM/SLO，Replay按需。每点有独立变体、至少两条验收、可复现故障、纠正参考、移动端差异和主/独立/新增综合任务界定。

## 版本/来源复核与发现

先检索并阅读MWG full-session-analytics/security/privacy正文，再W3C Trace Context、OTel instrumentation/SDK3发布/实际安装源码、Prometheus histogram、Google SRE alerting、LogRocket privacy与Fullstory Private by Default。一个旧Fullstory标题路径不可达，已改检索到的官方有效页面并阅读。未将不可达页记为成功依据。

registry初查latest发现API1.10/metrics3.1但trace-node/base仍2.12且peer不兼容。安装提示弃用后，阅读2026-11-05官方SDK3迁移及sdk-trace README，采用api1.10.0、core/sdk-trace/sdk-metrics/context-async-hooks3.1.1；真实SDK3手动context/provider配置通过，未沿用旧register API。初次旧包短暂用于核对，最终package/lock仅新版依赖，不包含旧node/base。

导航初版仓库链接虽有文件，本地server未提供README；补为text/plain并实际HTTP200检查。资源路径修正后重跑5Node、HTTP与390/1440后台Chrome通过。格式化仅自有lab。缺少真实身份、远程端点与Replay授权账户时不去连接真实服务。

## 验证与R01–R09

冻结离线安装通过，5项Node通过；真实HTTP未知PII400、跨源403、实际1600B413、并发合法traceheader隔离；390/1440 Chrome均默认可选无上报、主动开启204、关闭后不再新增、敏感输入不出现在快照、业务trace对应、无pageerror/横溢出/第三方请求。循环结束关闭Chrome/server，4533无残留；4536只作伪造Origin，未启动服务。两秒/超大流/完整DoS、真实用户RUM与SaaS未验证。

R01五编号/四部分数据完整；R02顺序/前置明确；R03一手来源及真实版本/机制核对；R04真实SDK与观察分清；R05练习变体/故障/两标准；R06主最小关联与独立OTel/扩展区分；R07理论与源码/任务一致；R08发现修正且受影响复验；R09实际运行和未测如实单列，学习勾选不改。逐点JSON记录实质判断，AI审阅不冒称人类试学。

## 追加：11.4基础设施分组独立只读复审

执行者stage11_metrics，2026-11-25。逐点阅读11.4五篇理论/五张示例/五篇练习、infra-lab README/verify、Docker/K8s/Actions模板和逐点integrationCase；只读核验主作者/tmp/stage11-infra-result.json，不重复运行Nginx或容器。另核对Nginx proxy_cache_bypass/proxy_no_cache、limit_req、Docker EXPOSE、K8s probes及GitHub secure-use官方正文。

结论：CDN/本地代理区分、读取绕过与禁止写入分工、公共缓存未污染、限流proxy_pass路径、两上游、健康/就绪/活性、HPA指标前提、远程审批/密钥和SHA占位边界均合理。移除cache_bypass的故障可命中旧公共缓存而非期望私有回源；rewrite return 200的故障会离开预期限流阶段，练习与配置对应。Docker/K8s/远程CI/真实Purge/Geo/WAF明确未运行，没有以模板或原生Nuxt健康替代生产部署证据；不恢复用户已删除的Colima。

发现两项已向主作者报告，待其修复/确认并归档最终结果：
1. verify的NGINX_BIN仅用于-t/启动，版本输出仍调用固定nginx；自定义二进制且PATH无nginx时可能末尾null.trim/报错或报告错误版本。应复用同一binary并校验结果。
2. K8s模板/对应说明应显式提示NUXT_SITE_ORIGIN需设部署域名；当前项目默认4531且写接口有Origin核对，不能只改HOST/PORT/Ingress。Docker点已有提醒，建议K8s同步。

### 上述两项关闭复核

2026-11-25 10:50 UTC，只读确认最新源码和主作者运行证据：
- verify.mjs定义同一binary用于-t、启动和-v，版本命令检查status并读取stderr/stdout；主作者以NGINX_BIN=/opt/homebrew/bin/nginx及PATH=/usr/bin:/bin执行通过，/tmp/stage11-infra-result.json含nginx1.31.8与全部缓存/上游/限流结果。NGINX_BIN问题关闭。
- Kubernetes env已显式NUXT_SITE_ORIGIN=https://preview.example.invalid，README要求与实际TLS入口/域名相配，未配置会403；仍明确镜像/IngressClass/集群验证待实施。Origin提示缺项关闭，不扩大成真实K8s部署通过。
- 只读核对/tmp/stage11-infra-fault-results.json：主作者真正运行两个隔离故障副本，删除cache bypass触发HIT/BYPASS断言失败，rewrite return200触发8个全200的限流断言失败；检查预期AssertionError机制而非泛指任何非零退出。故障可复现有新增实测支持。
本复审不重复运行，执行者仍为主作者；无新增阻断项。
