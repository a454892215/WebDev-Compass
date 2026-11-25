# 阶段13.3逐点审查

2026-11-25，5点理论/操作卡/独立练习/integrationCase逐点交叉审阅。主Nuxt/Turbo和本地build-lab职责分开，不按文件数量/工具名判断质量。

- 13.3.1：MF container/remote/shared与普通dynamic import、仓库布局和安全沙箱区别准确。官方runtime/expose/init/版本/缓存诊断路径完整，federation-review.json是明确配置推演，不冒称运行MF或从本lab产生官方错误码。第一次旧runtime链接404，改可达官方runtime/runtime-api并实读，失败页不记依据。
- 13.3.2：精确virtual id、空字符内部id、load模块JSON与generateBundle emitFile实际执行；plugin audit与Vite内建manifest不同。公开label白名单，不把全部env注入。已有源码transform的filter/map与dev/build hook差异注明，未安装Webpack不写实装。
- 13.3.3：核Vite8官方与当前配置，默认Rolldown/Oxc而非旧esbuild/Rollup双默认。真实隔离错误TS由Vite成功输出，tsc报TS2322，证明转换不做完整类型语义；esbuild/SWC仅官方API阅读，不因依赖树出现包名声称执行。
- 13.3.4：真实显式本地wrapper fixed input/env/Node/Vite/platform key，cold miss、删输出后warm restore、配置/源改miss、内容损坏重建均通过。故意漏label的隔离模块真实命中旧label，说明遗漏输入的危险。不称Vite内部/远程缓存或生产profile，不把hash当认证；新增依赖须扩输入。
- 13.3.5：真实ESM/CJS库产物，条件exports分别选.mjs/.cjs与.d.ts/.d.cts，临时链接消费者的import/require/两种类型入口正反通过。复制.d.cts仅当前无相对声明模块图API成立，复杂库另生成/验证。实读主core package.json目前只有ESM与d.ts，任务不假称主已有CJS；不称registry发布。

每点有机制/场景/最小例/误区/移动差异/一手来源；练习至少两标准、隔离故障与参考，综合任务明确主项目、独立lab或新增需求。R01五稳定编号；R02先必要性与工具角色，再插件/转换/缓存/库输出；R03来源/版本/边界；R04真实与观察分开；R05具体变体；R06主/独立对应；R07术语源码一致；R08必要验证与修正；R09本组真实结果/未测如实。正式stage manifest/父索引/整体R09由主代理整合，不改学习勾选。

## 实际验证

Node26.0.0/pnpm11.4.0，Vite8.3.8/TS6.0.3/Playwright1.65.1固定。冻结离线安装、真实app/library构建、3项Node及390/1440后台Chrome通过。每视口虚拟公开值、插件audit/内建manifest200、键盘计数、README200、无pageerror/横溢出/外站请求。真实临时库ESM/CJS各返回5，两种声明由tsc和预期错误参数检查；缓存五个正负阶段及漏输入反例均断言。

最初生成脚本只需恢复路径和运行前提，没有把任意语法失败当缓存失效或类型负例；最终代码格式化后完整重跑。测试变体生成改用格式稳健regex，防格式化后未实际移除label；最终漏键断言证明旧label确实命中。server对畸形URL返回400，不向外监听；finally关闭Chrome/server与临时目录。输出dist/artifacts ignored，没有把构建产物计入教材或指纹。

未运行MF runtime、esbuild/SWC API、远程缓存/CI、真实生产profile/部署、多浏览器/真机/读屏或真实学习者试学；不能从本实验推导普遍速度倍数、任意缓存来源可信或完整跨格式生态兼容。没有真实账号、凭据或第三方攻击。
