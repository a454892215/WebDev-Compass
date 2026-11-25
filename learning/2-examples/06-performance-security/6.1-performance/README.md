# 6.1 性能：先测量，再优化加载、交互与缓存

17点按加载→运行时→缓存组织，前置阶段2–4。指标先分lab/field；核心应用是Vue/Nuxt，React机制仅按需对照。

- [6.1.1.1 Core Web Vitals：场数据与实验数据](./6.1.1.1.core-web-vitals-demo.md)
- [6.1.1.2 网络：压缩、请求成本与HTTP/2](./6.1.1.2.gzip-brotli-http-demo.md)
- [6.1.1.3 图片：格式、尺寸、srcset与加载时机](./6.1.1.3.webp-avif-demo.md)
- [6.1.1.4 关键CSS、非关键样式与闪烁边界](./6.1.1.4.css-css-demo.md)
- [6.1.1.5 JS：动态加载、摇树与产物证据](./6.1.1.5.js-import-tree-shaking-bundle-demo.md)
- [6.1.1.6 第三方脚本：加载时机、隐私与降级](./6.1.1.6.item-6-1-1-6-demo.md)
- [6.1.1.7 资源提示：preload、preconnect与prefetch](./6.1.1.7.item-6-1-1-7-demo.md)
- [6.1.1.8 CDN：缓存键、版本与部署边界](./6.1.1.8.cdn-demo.md)
- [6.1.2.1 布局读写：定位强制布局与批处理](./6.1.2.1.item-6-1-2-1-demo.md)
- [6.1.2.2 虚拟列表：DOM窗口与可访问内容](./6.1.2.2.item-6-1-2-2-demo.md)
- [6.1.2.3 防抖与节流：频率、尾调用与清理](./6.1.2.3.item-6-1-2-3-demo.md)
- [6.1.2.4 Web Worker：移出主线程与协议清理](./6.1.2.4.web-worker-demo.md)
- [6.1.2.5 Vue/React性能：先测量再选择机制](./6.1.2.5.react-vue-memo-key-demo.md)
- [6.1.2.6 Performance API与Lighthouse：可复核测量](./6.1.2.6.performance-api-lighthouse-demo.md)
- [6.1.3.1 缓存层：HTTP、内存、bfcache与Cache API](./6.1.3.1.item-6-1-3-1-demo.md)
- [6.1.3.2 Service Worker：公开白名单、离线与更新](./6.1.3.2.service-worker-cache-first-network-demo.md)
- [6.1.3.3 Nuxt数据缓存与HTTP响应缓存的失效](./6.1.3.3.react-query-http-demo.md)

[真实性能实验](../../../2-examples/06-performance-security/6.1-performance/performance-lab/README.md) · [本组验收](../../../../docs/audits/stage-6-performance-review.md)
