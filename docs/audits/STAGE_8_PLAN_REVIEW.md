# 阶段8规划复核

2026-11-25，原39点，保持39点，不为数量增加专题。前置0–7已完成首个Vue/Nuxt交付闭环；本阶段按项目深化架构，不作为第一次写页面的门槛。

明显问题先修：8.4.2原把Module Federation归为构建时，与运行时加载机制混淆，改为构建组合/运行时模块/应用编排与iframe组件边界；8.2.2将层级箭头改为区分调用与源码依赖，使用端口隔离infra；8.1.6不以≈把移动模块和FSD等同。旧路径/编号/学习勾选保留。

范围39点分组：8.1六、8.2六、8.3七、8.4七、8.5六、8.6七。跨切需求补入原点而非重复：8.2明确schema/registry非安全沙箱；8.3身份/序列化与运行差异；8.5增加总deadline、必要/可选失败、DTO和版本兼容、固定源；8.6增加revision/epoch、离线幂等/冲突与按scope清理。没有再造完整框架、微前端/CRDT/GraphQL课程。

推荐顺序：8.1先约束与ADR，8.2建立域和依赖；8.6.1/2确定状态归属与key；8.5接口适配/故障边界；8.3按已有第7阶段产物选择渲染，最后按需求选微前端、插件、local-first/CQRS。编号是稳定索引，选修不全线强制。

已先搜索MWG application architecture state，无Nuxt目录强制规范；阅读[Security](https://developer.chrome.com/docs/modern-web-guidance/guides/security/security)、[Performance](https://developer.chrome.com/docs/modern-web-guidance/guides/performance/performance)正文，再Nuxt state/data/rendering、Vue、C4/ADR、TS/ESLint和各专题官方。指南用于最小数据、真实边界、先测量再取舍；不拿HTTPcache/bfcache过时绝对说法或“延迟阈值”作架构定律。

主例选择模块化Nuxt单体、port注入与纯DTO；固定4.7/Vue3.5.46/TS6.0.3工具基线。不是从Flutter硬抄底层技术，也不默认上Pinia/Query/微前端/Edge。收藏为简单useState，SSR数据由useAsyncData，更多状态机制在独立真实lab验证。

每点四部分；微前端、BFF、状态有隔离lab，RSC/GraphQL/ISR/Edge等未安装/未部署可用明确官方观察。源/范围、共享主项目实测、独立lab实测和学习者掌握分别记录。无公网部署、真实身份、跨浏览器/设备/读屏、生产SLA或真实学习者试学保证。
