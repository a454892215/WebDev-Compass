# 阶段11.4逐点审查

2026-11-25，5点理论/示例/独立练习/综合任务数据由主作者逐点交叉复核，日志指标分工另独立只读核查。

- 11.4.1：缓存key/数据分类/上游规则与CDN/浏览器区分，Purge200仅接收需回读。真实local MISS/HIT、凭据BYPASS、r2 MISS不称全球CDN/Purge/Geo。
- 11.4.2：真实两个上游轮询，限流用proxy而非return，200/429小突发；可信代理/IP/WAF/POST重试边界说明。删bypass与return200故障均真跑，分别预期HIT代BYPASS与全200 AssertionError，不以任意语法退出当排错证据。
- 11.4.3：多阶段仅复制.output、非root、HOST/PORT/Origin、Node引擎和health配置清楚。本机Dockerdaemon缺失，没有镜像构建/运行；模板对digest/架构与权限留交接，不恢复Colima。
- 11.4.4：K8s选修、readiness/liveness/startup差异、HPA requests/指标、Ingress控制器与内存跨Pod问题清楚；占位镜像/IngressClass与Origin需适配，未运行集群/schema。
- 11.4.5：矩阵四格、锁文件/缓存、低权限PR/受保护main分开；SHA明确待审占位，environment审批不由YAML自动保证。deploy只有review提示，不是远程已部署。

各练习含两个具体验收与独立故障/参考，Docker/K8s/CI故障标配置推演，无运行条件不伪造状态。综合任务针对主工作台的个性化SSR/日志/发布交接，未假设主已有CDN/K8s。

只读复审发现NGINX_BIN版本仍用PATH命令及K8sOrigin未明确，已统一二进制查询/启动/status检查并加Origin配置，复审确认关闭。显式NGINX_BIN且PATH无homebrew下真实正常lab通过；故障副本也已真跑。finally结束进程并删除临时缓存，不改系统Nginx配置。

R01–R09在本分组范围满足；完整阶段门禁与进度由主集成。未测Docker/K8s/远程Actions/云Purge/Geo/WAF与生产容量，不冒称通过。
