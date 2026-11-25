# 测试范围、状态矩阵与运行边界

## 按风险选证据

| 风险/状态                     | 当前实际证据                                            | 不能推导                       |
| ----------------------------- | ------------------------------------------------------- | ------------------------------ |
| 按钮默认/disabled/attrs/click | dist组件单测、宿主浏览器                                | 全部原生属性组合/全浏览器      |
| 字段label/hint/error/v-model  | dist组件单测、真实提交/错误焦点                         | 完整表单框架/读屏符合          |
| HTML文本注入                  | SSR escape及宿主literal无img执行                        | 任何富HTML输入已安全           |
| 原生dialog                    | showModal、初始focus、Esc/显式关闭及返回触发点          | 屏幕阅读器/所有关闭策略        |
| 主题/RTL/pseudo               | html lang/dir、computed色、axe、两视口无溢出            | 完整阿拉伯语翻译/母语审校      |
| SSR/payload/并发              | 有效原始A/B互斥HTML、无Cookie；reads增1+browserprofile0 | 真实身份/生产缓存/CDN安全      |
| 包发布边界                    | tgz真实解包消费、ESM/types/CSS、未用marker缺席          | 所有导出/打包器或远程发布      |
| Vue解析                       | peer声明、external、真实路径一致                        | 所有满足peer版本已测试         |
| 版本记录                      | 真实CLI临时patch/changelog                              | 主库升版/registry发布/tag/push |

Nuxt宿主默认fixture访客；测试通过HttpOnly固定Cookie选择A/B，Cookie可改、不是真身份。草稿只页面内存。公开reads只有有限计数，为观察SSR重复请求服务，生产必须移除或另做授权/保留策略。本例保守的全路由private/no-store规则也覆盖其他资源；测试重点是个性化HTML/API。生产应拆分静态hash资源与私有响应，不把本地规则当通用缓存建议。

## 运行与CI

先安装/构建库再检查；check:ci串接类型/规范/格式、4单元、真实pack/type/CSS/Tree-shaking、Changesets、生产构建与5E2E。各命令失败即返回非零，本轮在本机验证，未执行远程CI或平台审批。

CI使用已核验Node/pnpm/锁文件与浏览器，记录OS、引擎版本、locale/DPR/字体。截图baseline只在人工审查后更新；不在失败时自动接受。独立strategy-lab基线是macOS/Chrome158本地环境，不能拿到任意Linux/Firefox环境强行字节比较；主E2E没有依赖该金图。

不重试掩盖确定性缺陷：先看输入/环境/首个失败与隔离，query使用可访问角色/名称和可等待状态。unhandled错误与测试缺前提分开，quarantine有owner/期限和关键流程替代覆盖。真机、读屏、多引擎按适用风险补证，不写成当前通过。

## 本轮修正与复验

- 小型workspace加包后重解析锁文件；沙箱DNS失败的重试已停止，允许联网安装后最终冻结离线通过，未改旧阶段依赖。
- 首次并行prepare/检查遇类型文件尚未就绪，改顺序等待安装结束。SSR htmlAttrs dir需要保留literal类型，已明确返回值。
- dialog中默认button不提交form method=dialog，关闭控件已显式submit；夜间skip link背景/焦点使用主题token。真实两视口交互/axe通过。
- Changesets3 init已是交互流程，管道调用会等待输入，未把退出13当成功；查实际CLI后改读已安装默认配置写临时config并执行真实version，无TTY提示、无发布。
- pack检查读取真实Vue路径与真实消费者types/CSS；漏CSS和非法variant为明确负例，不接受任意失败代替预期机制。

## 未执行

Pact SDK/Broker、Stryker、Chromatic/Percy/LostPixel、Testcontainers/Docker、LHCI、Firefox/WebKit/BrowserStack、屏幕阅读器/真机、Figma/TokensStudio远程同步、完整ASTcodemod、跨框架/SSR CustomElement、远程CI/生产发布或真实学习者试学。相关条目是官方观察、限定模板或独立扩展，不以品牌名推导已安装/已运行。
