# 阶段9规划复核

2026-11-25，30点保持原编号/路径，不增分母。分组9.1测量7、9.2预算5、9.3加载6、9.4运行时7、9.5SSR5。阶段6已建立基础，这里用更完整的归因/回归/生命周期证据深化，而非再次列术语。

明显缺口可由现有条目承接：9.1.3采样/去重/有界缓冲/最小数据与生命周期，软导航新API只能力增强；9.2预算范围、空报告/阈值/超额负例与CI失败语义；9.3字体授权/首屏与非关键CSS/推测支持与隐私/凭据缓存旁路；9.4真实保留路径/清理、有界队列/transfer/cancel与idle超时；9.5发送/渲染边界、首次交互回放、计时起终点/样本和payload。无需另立重复章节。移动RUM类比标题改为明确指标/生命周期差异，不保留等同暗示。

推荐先9.1提出问题/测量，9.2定义适合风险的预算，再按实际瓶颈选9.3加载、9.4运行时或9.5SSR。没有要求所有项目必须有Worker池、Partytown、Edge或真实CDN账号才会优化。前置0–8，包括SSR每请求、公开payload和部署限制。

实际先检索MWG measure performance interactions，读[Performance](https://developer.chrome.com/docs/modern-web-guidance/guides/performance/performance)、[INP causes](https://developer.chrome.com/docs/modern-web-guidance/guides/performance/identify-inp-causes)、[Interaction paint timing](https://developer.chrome.com/docs/modern-web-guidance/guides/performance/interaction-paint-timing)，再web.dev CWV/lab-field/TTFB，Nuxt按需水合/data/performance、H3 v1 sendStream、Nitro与专题官方。新软导航entry能力检测，不把默认稳定支持泛化全部浏览器。

CWV仍LCP/INP/CLS，p75来自真实访问分布；TBT、Longtask、JS到nextTick时长不等于INP；三个合成样本不叫RUM。MWG固定50/250ms建议是启发不是架构定律；no-store与bfcache旧绝对表述沿用阶段6具体Chrome事实纠正，不为优化移除敏感保护。

主Nuxt保持4.7.0/Vue3.5.46/TS6.0.3。实际生产renderer await renderToString，单独stream-demo只演示HTTP静态流，不假装Nuxt组件Streaming SSR。按需水合只证明局部接管/首击，不假定总JS未下载；API ServerTiming不自动成为文档导航头。

真实机制由主Nuxt与三个独立lab组合：web-vitals最小本地collector/预算、加载字体/图片/缓存/103、运行时/CDP堆/队列。预算复用同一个Node工具测真正Nuxt输出，负例不接公网。已验证工具可复用，不安装所有可选分析库；本轮不跑Lighthouse/LHCI，相关点明确观察，既不跳过实际字节回归也不伪报工具通过。

R01–R09逐点审阅四部分；结构、机制实际运行与学习者掌握分开。无生产数据/上报、真实用户p75、远程CI/CDN/Edge、真机/跨浏览器/读屏或真实学习者试学。
