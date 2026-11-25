# 基础设施协作实验

实际执行型：本机Node、Nginx（本轮1.31.8）与loopback端口4535/4537/4538。无npm依赖，不修改系统Nginx配置。

~~~bash
node verify.mjs
~~~

脚本生成临时私有配置，nginx -t后启动前台子进程；公共请求MISS/HIT，Cookie/Authorization请求BYPASS且不污染公共缓存，新revision MISS。/balance轮询两上游；/rate真实上游配合leaky-bucket产生200/429。finally关闭自建进程/服务并删除临时缓存。NGINX_BIN可指定二进制；未安装时按官方说明准备，不自动安装Docker/Colima。

仅本地代理/限流，不是CDN平台、全球Geo路由、商业Purge或WAF实测。日志关闭避免请求URL泄漏。缓存仅明确公共路径；真实身份SSR与遥测不缓存，按上游Cache-Control/Set-Cookie处理，不使用proxy_ignore_headers强行缓存。

templates是审查/迁移模板：
- Dockerfile.example/dockerignore.example：复制到主Nuxt根目录后调整可信基础镜像digest、目标架构与运行期Origin配置。Docker服务端本轮不可用，未构建镜像，未恢复Colima。原生Nuxt构建和HTTP健康接口由主项目单独实测。
- kubernetes.yaml.example：示例镜像/IngressClass未填；NUXT_SITE_ORIGIN也必须匹配实际TLS入口/域名，否则写请求403；先核集群及metrics-server。readiness当前用廉价进程探针仅适合本例无强依赖；业务须扩展就绪判定，liveness不应因下游短暂故障反复杀进程。HPA需要CPU request/指标，单开Deployment不会自动扩容。未运行集群/API schema验证。
- quality.yml.example：按项目根目录写的审查骨架，SHA占位符须核官方仓库提交替换；environment保护规则要在平台配置。四格矩阵执行质量，缓存不替代锁文件，不给PR secrets；deploy只打印review说明，无云平台动作。远程CI、OIDC授信与审批未运行。

模板不是“已经部署成功”的证据，平台接入后按课程练习取得自己的证据。
