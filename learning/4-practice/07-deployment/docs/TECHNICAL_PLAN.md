# 技术方案：同一源码的三种发布profile

目标：从干净依赖环境构建，按托管能力部署公开课程，直接刷新详情可用，缺失资源不冒充成功，身份与配置边界可验收。非目标：真实账号、真实后端、公开上线、完整CDN/日志平台、Docker运行或全套业务选修安装。

默认Node SSR适合需要每请求逻辑的场景；SSG将公开课程在生成时写为HTML/payload，适合内容可随构建更新的场景；CSR生成壳页面，首屏正文依赖JS，不当作SSR等价SEO。三个profile是比较实验，不表示业务应同时部署三份。

源码共享课程与UI，构建环境STAGE7_PROFILE控制SSR、预渲染路由、hasServer及Nitro preset；build-profile脚本完成后分别保存artifacts/ssr、ssg、csr。严格顺序执行，不能并发写同一个.nuxt/.output，也不能把最后一次generate的.output当原SSR包。

公开课程由shared常量返回Promise进入useAsyncData；不是远程API性能基准。SSR-only /account通过useRequestFetch读取合成身份接口，请求内状态、cache:false/no-store/prerender:false同时约束。stage7-demo=alice/bob只是公开fixture选择，任何人均可伪造，绝非认证。真实身份流程在阶段5，不借演示Cookie替代。

备选为两个独立项目；本例只比较部署，不存在两个业务UI，因此共用源码更容易核对变量。真实PC/H5宿主仍可独立仓库。

验收：类型/规范/单元、三个真实构建、直接HTTP及后台Chrome；Nginx和版本回滚使用7.1独立lab。上线前还需真实域名/HTTPS/托管规则、后端权限、监测与恢复责任人。静态不是只要index.html存在；SSR也不是只上传public。

恢复：不可变release产物、候选健康检查、切换后冒烟、异常回旧版本；保留旧hash资源。应用回滚不能撤销数据迁移，真实数据库须额外设计前后兼容和恢复，实验无数据库。
