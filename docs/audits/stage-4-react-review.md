# 阶段4.2 React选修：逐点编写与质量审查

日期：2026-11-24。分组开始16:15:18 UTC。范围为4.2全部26点，依据AUTHORING.md版本1的R01–R09；本记录是分组证据，阶段整体和共享综合任务由主代理集成复核。React/Next不是Vue/Nuxt主线的先修。

## 规划检查与范围

既有26点已涵盖核心13、路由4、状态/表单5、工程比较4，没有需要新增编号的明显大类缺口。将容易混淆但可在原编号内补足的内容写入正文：受控输入与所有权、Effect依赖/清理/迟到结果、memo非正确性保证、SSR store工厂、客户端守卫非服务端授权、React Router模式/版本和Next App Router。Next旧式API Routes表述已由主代理调整为App Router/Route Handlers，正文不混用pages/api。

本组交付26份理论、26张真实实验/明确观察操作卡、26份独立变体与排错验收；integration-cases.json给出26项具体综合建议。综合任务以主代理最终tasks.md为准，不假称Nuxt已安装React、Redux或Next。

## 逐点审查

| 编号 | 机制、例子与练习核对 | 结论 |
| --- | --- | --- |
| 4.2.1.1 | JSX表达式、文本转义和稳定key；真实输入含b标签形状却不产生b；事件提前调用故障 | 通过 |
| 4.2.1.2 | 函数优先、类仍支持、纯渲染；两版props输出；局部变量不能保存state的故障 | 通过 |
| 4.2.1.3 | props只读快照、children组合和回调所有权；真实Panel契约；innerHTML误用排错 | 通过 |
| 4.2.1.4 | 快照/函数更新队列/不可变；单击实际+2；旧快照连写只+1变体 | 通过 |
| 4.2.1.5 | 外部同步、完整依赖、清理和请求竞态；startA-stopA-startB真实顺序；删依赖故障 | 通过 |
| 4.2.1.6 | ref写入不触发渲染、挂载前null；真实DOM焦点；渲染时访问null故障 | 通过 |
| 4.2.1.7 | 依赖完整的缓存、Compiler未启用、非正确性条件；改query真实更新；未作性能基准 | 通过 |
| 4.2.1.8 | 最近Provider/默认/更新范围；真实Context输出；Provider位置错误排错 | 通过 |
| 4.2.1.9 | 纯reducer/判别action、普通reducer不带Immer；旧输入保持；直接push故障 | 通过 |
| 4.2.1.10 | 自定义Hook复用逻辑而非实例；A/B状态独立；条件调用故障 | 通过 |
| 4.2.1.11 | 渲染错误边界与事件异步边界；受控throw显示alert；事件错误单独处理 | 通过 |
| 4.2.1.12 | Fragment/Portal/Suspense职责不同；真实Portal与lazy；无完整模态或通用Effect-fetch挂起声明 | 通过 |
| 4.2.1.13 | 根StrictMode开发探测、清理与生产差异；实际双setup/旧cleanup；定时器泄漏变体 | 通过 |
| 4.2.2.1 | Router8声明式、URL参数/query/nav、深链；MemoryRouter和Chrome均跑；不当生产托管证明 | 通过 |
| 4.2.2.2 | Outlet/index/布局身份；真实nav DOM保持；漏Outlet故障 | 通过 |
| 4.2.2.3 | 匿名/加载/成功边界与服务端授权；实际占位重定向；无真实认证声明 | 通过 |
| 4.2.2.4 | lazy定义/default、等待/错误与route.lazy区别；真实懒模块及产物；未以分块数量推性能 | 通过 |
| 4.2.3.1 | 局部/提升/URL/远程缓存的所有权；实际独立Hook；双真相故障 | 通过 |
| 4.2.3.2 | Zustand工厂、合并、取消订阅与SSR隔离；真实两实例和unsubscribe；Jotai未装 | 通过 |
| 4.2.3.3 | slice/Immer/默认中间件/thunk与unwrap；实际成功和拒绝；无react-redux UI声明 | 通过 |
| 4.2.3.4 | Query key/新鲜与保留/失效/有界重试/失败回滚；真实QueryClient、受控失败恢复；无真实并发mutation UI | 通过 |
| 4.2.3.5 | RHF注册与Zod真实运行输出；空白字段错误、Chrome纠正并trim保存；未接resolver或后端 | 通过 |
| 4.2.4.1 | 展示输入/容器所有权，非机械文件分层；真实回调；复制props导致陈旧排错 | 通过 |
| 4.2.4.2 | 三库维护方式和同需求选型清单；官方观察，不安装三库；标明未测 | 通过（观察型） |
| 4.2.4.3 | CSS Modules真构建、层叠边界；其他方案仅官方对照；实际产物类验证 | 通过（运行+观察） |
| 4.2.4.4 | Next App Router目录、Server/Client、HTTP与秘密边界；官方具体观察清单；未安装/构建Next | 通过（观察型） |

具体四部分路径、独立故障和事实见[逐点JSON](./stage-4-react-points.json)。每点练习至少两条标准，示例上下文指向真实源码；不把孤立片段当完整工程。

## 实际运行与边界

实际环境Node26.0.0、pnpm11.4.0。已通过官方registry核实并固定React19.3.1、Router8.5.2、Zustand5.1.0、RTK2.15.0、TanStack Query5.108.4、RHF7.92.0、Zod4.6.7；TS6.0.3、Vite8.3.8、Vitest5.1.1。冻结离线安装通过，pnpm11 storeDir YAML实际读取和路径正确。未全局安装或修改宿主项目。

真实验证：24项Vitest（ReactDOM/jsdom组件契约+MemoryRouter+纯数据工具）通过；tsc与Vite生产构建通过；产物2项检查证明LazyNote独立chunk及CSS Modules生成类；后台Chrome390×844/1440×900两组流程通过，含计数、焦点、RHF错误后纠正/trim、URL查询与深链刷新、占位守卫、懒路由、无溢出/pageerror。Query新增受控写失败/快照回滚和显式一次重试，不把直接setData操作包装成完整生产乐观并发。

React Router依赖use client指令在纯客户端Vite构建有Rolldown提示。此工程没有RSC服务端构建，客户端实际运行通过；未隐去提示，也不据此证明Next服务端能力。Vite未接React Fast Refresh插件/Compiler，所以没有热更新保持状态或Compiler性能验证声明。

未测：真实后端/授权/部署、真机、多浏览器、屏幕阅读器、人类试学、完整模态焦点、乐观mutation并发。Ant Design/MUI/shadcn、React中的Styled Components/Tailwind、Next仅明确的官方观察任务；本组不称这些工具实装通过。主线4.4的Tailwind与4.5的Nuxt由相应分组另验。

## R01–R09与收尾

R01编号完整；R02核心→路由→所有权/数据工具→工程比较；R03官方资料/版本和平台边界已核对；R04真实工具与观察类型区分；R05具体变体/故障/标准；R06与Nuxt仅作独立对照，扩展不冒充已有；R07源码/命令/文字一致；R08必要运行通过、无本组必达未关闭问题；R09实际/未测边界和逐点证据清楚。最终公共目录、阶段契约与tasks.md、进度/验收指纹及提交由主代理集成。

已修正的局部问题：表单schema与数据工具模块分离，避免UI无意引入所有store实验；Query保留时间由0改为60秒并显式clear，不依赖计时竞态；lazy单测等待真实import而不是固定sleep；编号过滤使用pnpm exec vitest run -t。格式由已有Prettier工具整理为可读源码，不改根配置。

本组Markdown本地链接83份核对（只排除主代理待落盘tasks）零错误；HTML资源当时162页/612引用零错误，最终全库数量由主审复验。所有本组服务/浏览器已关闭，未暂存/提交。

## 已核对的一手来源

先检索并读[MWG Forms](https://developer.chrome.com/docs/modern-web-guidance/guides/forms/forms)，应用label、语义表单和原生按钮。MWG没有专门React API百科，具体语义读React官方JSX/Props/更新队列/Effects/Refs/Context/Reducer/Hook/Memo/Boundary/Portal/Suspense/StrictMode正文；逐点附确切页面。

[React官方](https://react.dev/learn) · [React Router声明式](https://reactrouter.com/start/declarative/routing) · [Zustand官方仓库](https://github.com/pmndrs/zustand) · [Redux Toolkit](https://redux.js.org/toolkit/api/createAsyncThunk) · [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates) · [RHF](https://react-hook-form.com/docs/useform) · [Zod](https://zod.dev/basics) · [Next Server/Client](https://nextjs.org/docs/app/getting-started/server-and-client-components) · [Ant](https://ant.design/docs/react/introduce/) · [MUI](https://mui.com/material-ui/getting-started/) · [shadcn](https://ui.shadcn.com/docs) · [Vite CSS Modules](https://vite.dev/guide/features#css-modules)。
