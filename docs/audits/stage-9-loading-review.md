# 阶段9.3加载组逐点审查

日期2026-11-25，开始09:41:43 UTC。6点保留原路径与编号；理论/操作卡/独立练习/综合建议每点逐读，未修改父目录、地图或主Nuxt。

## 六点事实与递进

1. 9.3.1从关键路径而非“全部内联”开始：真实600ms非关键CSS、首屏与焦点必需样式内联、media非匹配下载再激活；记录FCP/CSS先后。没有自动提取器或生产LCP保证。焦点反例自审修为先新增outline:none再延迟唯一替代样式，避免错误假定浏览器默认焦点不可见。
2. 9.3.2真实官方Roboto Latin400 WOFF2 21884字节、OFL与来源记录，字体加载成功且一次资源请求、font-display swap；子集由Google提供而非本轮工具生成，中文系统回退，未测完整FOIT/FOUT/多语言度量。
3. 9.3.3真实AVIF/WebP/PNG候选、固有尺寸、LQIP和currentSrc；图片复制自仓库阶段6原创几何fixture，不改旧资料。只验证当前Chrome候选，未冒称全部fallback禁用路径/CDN变换或业务照片收益。
4. 9.3.4能力/Save-Data回退、固定公开GET prefetch规则和普通导航；建议可被忽略，不将支持/发出规则说成实际预取/prerender/激活。本组不对账户/支付等真实副作用页面试错。
5. 9.3.5 Node真实103 informational Link→最终200，并明确HTTP1.1客户端机制不等于Chrome H2/H3部署优化；HTTP3/CDN和Push未测，Chrome Push历史由官方原文核对。
6. 9.3.6真实公共key包含v1/q/lang、重排相同key、最多32项；任意Cookie/Authorization存在均旁路（含空值），四并发Alice/Bob合成请求不读写公共cache，之后匿名仍public。不是认证或真实CDN已配置。

R01六点四部分建议完整；R02按关键路径→字体/图→预测/协议→缓存维度；R03MWG+专题官方来源与日期核对；R04上述真实机制/观察区别；R05六份不同变体、至少2标准、故障与参考；R06主Nuxt聚焦SSR，字体/CDN不虚构其已有能力，综合任务明确副本/lab；R07资源/字段/证据边界一致；R08最小专项通过，修正证据viewport字段与凭据空值/类型语义，未用旧数字冒充新测；R09未测范围单列，不改学习勾选、不称真实学习者试学。正式全阶段契约与父索引由主代理集成。

## 实测与复验范围

Node26.0.0、pnpm11.4.0、Playwright1.65.1。固定锁文件离线安装通过，复用3包缓存；Roboto官方字体/许可证单独公开下载，不在运行时访问外网。Node4项最终通过；390/1440 Chrome两组通过，FCP分别132/128ms、CSS结束617.5/609.2ms，两个视口各一个font请求和loaded/swap、候选可解码、无横溢出/pageerror。数值仅本机本次，不是可保证的性能阈值。

最后凭据fixture细化与HTTP103只影响server相关Node测试，重跑4项通过；未改变已测页面机制，未重复Chrome称新运行。格式用现有Prettier处理，node语法检查通过。证据runtime记录原始浏览器结果，viewportWidth与图像width分开，避免把640图像属性当视口。全库HTML检查当时182页/681引用0错，后续集成以主代理最终门禁为准。

已读MWG performance、optimize-image-priority、optimize-preload-priority正文，再Chrome prerender/early-hints/removing-push、web.dev optimize-webfont-loading、MDN Vary/font-display等；font-best-practices首次超时、旧Push链接不可达后使用实际可读官方页面，不把失败页算成功。Roboto来源/实际字体URL及OFL在assets，完整原始版权文本保留。

服务/Chrome finally关闭，4519无监听。无公网TLS/HTTP3/CDN、真实预渲染命中、生产RUM/业务压缩比、真机/多浏览器/真实读屏或母语/学习者试学。没有暂存或提交，由主代理整合。
