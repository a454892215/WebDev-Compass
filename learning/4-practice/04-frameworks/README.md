# 阶段4综合实践：Vue 3 + Nuxt学习资料库

前置：阶段1原生Web、阶段2模块/异步/HTTP与阶段3TypeScript/工程工具。先读4.1，随后4.3.3.1 SFC→Vue核心→Router/Pinia→4.5 Nuxt，按需读4.4样式。React26点在独立选修实验，不阻塞主线；这里是Vue/Nuxt教学项目，不修改独立web-common或两端宿主。

目标：用一个小应用解释组件契约、响应式、文件路由、数据获取、SSR接管、状态边界与错误恢复，而不是堆叠工具。框架工程入口是nuxt.config.ts，没有手写index.html。

## 安装与运行

本目录使用Node24.15+的24主线或26+；本轮实际Node26.0.0、pnpm11.4.0。固定Nuxt4.7.0、Vue3.5.46、TypeScript6.0.3、vue-tsc3.3.14，保留锁文件。先确认本机工具版本，勿把latest当可复现安装。

```bash
# 从仓库根目录进入：
cd learning/4-practice/04-frameworks
pnpm install --frozen-lockfile
pnpm dev
# http://127.0.0.1:4300/
```

首次安装需要公共npm注册表；pnpm-workspace.yaml保存pnpm11专有策略，本项目不是多包工程。依赖脚本esbuild:false为明确选择，本轮预编译平台包可用且实际prepare/build已验证，不表示所有机器都可无条件禁用所有依赖脚本。minimumReleaseAgeExclude若有条目，是本次已核对的具体新版本，不要复制成永久通配豁免。postinstall只执行nuxt prepare，生成可重建的.nuxt类型/ESLint配置。

```bash
pnpm typecheck       # Nuxt app/server/shared/node类型上下文
pnpm lint
pnpm format:check
pnpm test            # 纯模型 + Vue组件公开契约
pnpm build           # 默认node-server、动态SSR；不是类型检查的替代品
HOST=127.0.0.1 PORT=4300 pnpm preview
# 停止手动服务后：
pnpm test:e2e        # 自动启动生产服务，后台Chrome；两个视口
```

Playwright优先使用本机Google Chrome；其他路径可设置CHROME_PATH，或另按Playwright官方安装受支持浏览器。这里没有自动下载浏览器。pnpm check组合类型、lint、格式、单元测试与build；E2E另行执行，不能把纯逻辑测试当SSR认证。

## 从最小部分逐步阅读

| 步骤 | 文件/能力                                            | 观察重点                                          |
| ---- | ---------------------------------------------------- | ------------------------------------------------- |
| 1    | shared/utils/resources.ts                            | 纯模型、公开固定fixture与unknown标题校验          |
| 2    | app/components/ResourceCard.vue                      | Props输入、toggle事件、具名/默认插槽、局部笔记    |
| 3    | app/composables/useReadingList.ts                    | Nuxt useState书单；同应用共享，新SSR请求独立      |
| 4    | app/pages/index.vue                                  | computed、稳定key、搜索草稿与URL、空/错/恢复      |
| 5    | app/pages/resources/[id].vue                         | 文件动态路由、同组件参数变更、插件与标题          |
| 6    | server/api/                                          | 本地GET/POST、400/404/503与输入边界，不是生产后台 |
| 7    | nuxt.config.ts、layers/learning、modules/learning.ts | 配置、Layer复用与构建期Module的不同职责           |

Layer按Nuxt约定可自动注册，配置中显式extends展示依赖；Nuxt会合并解析。本地模块只在构建配置阶段增加meta，不储存用户数据；format插件按Nuxt应用创建，无进程级用户单例。

## 已有功能与边界

- 列表3项，搜索提交后更新q参数；刷新仍按URL筛选。书单和卡片笔记为本次应用内存状态，不写数据库或localStorage。刷新重建书单；卡片被过滤卸载后局部笔记也可丢失。
- 每张卡输入不同临时笔记，再反转顺序：笔记仍属于相同resource.id；不是只验证排序文字。父级管理书单，子级只发toggle，组件测试核对Props不会被子级修改。
- 首页用useFetch，数据随SSR payload传给浏览器，正常接管不应重复请求同一API；详情使用响应式URL。完整useAsyncData/signal取消实验在操作卡和Vue侦听实验，不冒称主项目有取消按钮。
- /?fail=1是503教学fixture；页面显示局部失败并可恢复；未知详情/api返回真实404。about中间件notice仅做公开导航演示，不作认证。路由守卫不能替代API授权。
- /about表单用事件$fetch POST校验标题，返回saved:false，**不保存**。浏览器约束可绕过，服务器对unknown仍校验；文本输出使用插值，不执行用户HTML。
- /isolation?seed=alpha是公开请求隔离实验，seed不是登录身份；独立SSR请求分别初始化useState。客户端同应用、同key继续复用，这是另一种生命周期。
- runtimeConfig.public.courseLabel会进入客户端；privateDemoLabel仅服务器使用，/api/config只返回是否配置的boolean。演示标记不是凭据，不在URL/源码放真实秘密。更改生产Node运行配置应使用对应NUXT_变量，静态产物不能靠托管机器env动态变值。
- /client-demo通过routeRules ssr:false提供CSR对照：原始HTML没有内容，JS运行后出现。其余页面默认每请求SSR。useHead/useSeoMeta在首屏和导航时更新标题/描述；不是完整SEO课程。
- NuxtRouteAnnouncer负责导航播报；表单另有具名status。原生search标签已在Vue编译器显式保留；避免setup函数与标签同名被解析为组件。原生HTML能用不代表所有编译器版本都自动识别。

## SSG独立对照

```bash
pnpm generate
pnpm verify:static  # 检查真实静态HTML/标题与私有标记未进入客户端产物
```

scripts/generate.mjs给本次子进程设置COMPASS_PRERENDER=1，只预渲染/、/about、两个资料详情，关闭链接爬取以避免把教学失败链接当生成目标。.output/public是静态产物，必须与默认Node SSR构建区分。

**静态托管不提供POST校验、任意动态API/query或新SSR请求初始化。** 若要完整交互，需要另外的后端/托管方案；预生成GET响应不是所有接口都可运行。隔离实验和动态查询以Node SSR模式验收。本项目不声称SSG与SSR能力完全等价。generate会替换.output；之后如需SSR预览或E2E，重新pnpm build。

## 本项目验收

- [ ] 安装与类型/lint/格式/单元测试/build能分别运行，知道失败属于哪层。
- [ ] SSR HTML有真实资料；浏览器接管无hydration警告且不重复初始API请求。
- [ ] 卡片事件、插槽、稳定key、详情参数切换、URL筛选和刷新行为准确。
- [ ] 错误恢复、未知资源404、标题校验400/成功和中间件重定向可复现。
- [ ] 四个并发SSR seed各自独立；客户端源码/payload没有私有配置值。
- [ ] 390/1440视口可用，原生标签/焦点样式保留；视口测试不是手机真机或屏幕阅读器验收。
- [ ] 清楚区分SSR/CSR/SSG、模拟接口/真实后台、已有能力/副本新增任务。

接着完成[59项逐点综合任务](./tasks.md)，按主线/选修选择，不要求把各UI库都装进同一项目。依据先查[MWG HTML](https://developer.chrome.com/docs/modern-web-guidance/guides/html/html)、[Forms](https://developer.chrome.com/docs/modern-web-guidance/guides/forms/forms)、[Accessibility](https://developer.chrome.com/docs/modern-web-guidance/guides/accessibility/accessibility)，再核对Vue与Nuxt4官方API。实际验证与限制以[阶段4验收](../../../docs/audits/STAGE_4_ACCEPTANCE.md)为准。
