# 阶段13.4逐点审查

2026-11-25。7点理论、操作卡、独立练习及integrationCase逐点阅读并交叉核对实际lab；主Nuxt尚在集成，本组任务按核对/新增写，不虚构主已有legacy/PDF/完整polyfill。

- 13.4.1：Browserslist查询/消费工具/转译/API矩阵分开。真实4.29.6查询及非法query负例；Vite8显式es2022构建，不说普通Vite自动读取.browserslistrc。plugin-legacy按官方现行README仅观察，Terser版本条件和ES/DOM polyfill边界准确。
- 13.4.2：原生无fallback请求、注入缺失按需本地import、加载失败保留基线均实测。本地顿号拼接只是有限业务回退，不称完整Intl polyfill；无prototype改写、远程polyfill或供应链审计认证。
- 13.4.3：无JS真实context仍能阅读/展开details，增强失败仍保留，声明核心任务仅阅读/展开，不代表所有业务无JS。原生与注入回退/无JS/网络失败分别取证。
- 13.4.4：支持承诺/实际/模拟/待验分栏，matrix.md清楚；390/1440与UA改名仍一个Chrome，不冒称Safari/真机。Browserslist含Safari不是Safari运行。
- 13.4.5：具体API函数检测与调用错误处理，UA伪装仍native真实通过；没有指纹或client能力当权限。MWG moveBefore仅读指南，不冒称此lab实现了重排API。
- 13.4.6：合法/非法CSS.supports、真实computed grid，隔离无效supports CSS得基础block；900px故障出现横溢出，恢复消失。不是在真实旧引擎运行，CSS存在不等于布局质量/JS支持。
- 13.4.7：真实print媒体隐藏操作/显示必要正文副本/block、A4 PDF头与大小，已查看修正后的390截图无裁切。闭合details不假设display覆盖就能打印，采用明确print-only内容；未做长表分页、物理打印或系统对话框。

## 递进、来源与发现

先读取AGENTS/总则/目录，按支持策略→能力/回退→基线→证据矩阵→CSS/打印推进；每点移动端对照、独立变体、两个具体标准、故障参考与来源齐。

先检索/读MWG get-started Baseline、persistent-top-layer-ui、HTML/a11y正文，再Browserslist/Vite/pluginlegacy、MDN polyfill/渐进增强/优雅降级/UA/CSS/printing与Playwright当前一手资料。实际官方npm依赖版本固定，缓存缺electron-to-chromium后允许联网补齐，再冻结离线通过，无浏览器下载。

初版打印重要折叠正文未显示，去掉“display足以展开”的误导并使用显式打印副本，重跑并目视检查。格式化令CSS字符串故障注入未命中，改可匹配空白的语义模式，断言computed=block与溢出正反；未用任意退出码充当预期故障。静态服务读取文件成功后才写200，不先写成功状态再处理404。

## 实际结果

最终冻结离线安装、3Node、Vite生产构建、390/1440后台Chrome通过；另真实无JS、UA伪装、CSS无效条件/宽度故障、增强网络失败、print media/PDF均通过。每视口0pageerror/0外站请求，finally关闭浏览器/server，4554无监听。dist/artifacts/cache忽略，不提交PDF/截图产物。源码模块浏览器证据与生产Vite产物分开，不虚报运行legacy产物。

R01七编号四部分数据齐；R02前置与顺序明确；R03官方现行资料与边界核实；R04真实机制/官方观察分开；R05独立变体/故障/参考；R06主待核/独立/新增明确；R07术语一致；R08发现修正且受影响复验；R09本组证据/限制如实，整体索引/manifest/tasks与指纹由主整合，不动学习勾选。

未运行其他引擎、真机、屏幕阅读器、完整polyfill、legacy插件、生产策略或真实学习者试学。

分组收尾HTML资源检查为191页/699引用/0错误（并行编写时快照，最终总数由主复验）。4554无监听，未暂存或提交。
