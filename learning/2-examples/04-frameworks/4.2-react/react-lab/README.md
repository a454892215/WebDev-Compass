# React选修共享实验：组件、路由和数据边界

这不是Vue/Nuxt主工程。用于4.2的跨生态对照，先学JavaScript、TypeScript、DOM和阶段3工具链；React Native经验可帮助理解部分概念，但Web表单、history、CSS和服务端边界仍需重新核对。

## 安装与运行

从仓库根目录进入本目录：

```bash
cd learning/2-examples/04-frameworks/4.2-react/react-lab
pnpm install --frozen-lockfile
pnpm check
pnpm verify:artifacts
pnpm dev
# http://127.0.0.1:4304/
```

Node要求24.15+的24主线或26+，本轮Node26.0.0/pnpm11.4.0。固定React/ReactDOM19.3.1、React Router8.5.2、TS6.0.3、Vite8.3.8、Vitest5.1.1；生态工具版本见package.json。pnpm11的专有store设置在pnpm-workspace.yaml，安装需要访问公共npm注册表；未全局安装，不改宿主项目依赖。

Vite在这里按tsconfig处理TSX，未安装React Fast Refresh插件或React Compiler，所以本实验不证明React组件热更新状态保持或Compiler优化效果。React Router采用当前8.x声明式模式，从react-router导入；不要混用旧版或数据/框架模式特有API。

## 逐步阅读源码

1. `src/Core.tsx`：JSX文本、props/children、state、effect、DOM ref、memo、Context、reducer、Hook、错误边界、Portal、Suspense。
2. `src/RoutesDemo.tsx`：共同布局/Outlet、id/query、导航、占位登录重定向、懒路由与404。
3. `src/stores.ts`：真实Zustand工厂、RTK thunk与QueryClient。它们主要通过独立测试运行，不声称页面同时接入了三套store。
4. `src/schema.ts`与`src/FormDemo.tsx`：Zod运行校验与React Hook Form注册/字段错误/提交；未安装resolver适配器，validate显式调用safeParse，提交parse取得转换后值。
5. `src/App.tsx`与`Card.module.css`：容器回调和真实CSS Modules。`src/main.tsx`开发入口保留根StrictMode。
6. `tests/mechanisms.test.tsx`：24个有编号的真实断言。jsdom中的组件交互与纯库测试分开，不把它们叫布局或系统真机测试。

每点操作卡可用`pnpm exec vitest run -t '4.2.1.4'`只跑对应实验；编号匹配是标题过滤，不是新的测试入口。先读测试怎样改变输入与观察结果，再在自己的副本写变体。

## 后台浏览器与产物核对

```bash
pnpm build
pnpm verify:artifacts
pnpm verify:browser
```

浏览器脚本用本机`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`，可用CHROME_PATH指定。脚本自己启动127.0.0.1:4305预览，结束关闭；只接受本地loopback，不下载浏览器。没有Chrome可先完成类型、jsdom测试、构建和产物检查，不能把未执行浏览器写成通过。

浏览器范围：390×844、1440×900，真实计数+2、输入焦点、RHF错误后Zod trim成功、URL查询/深链刷新、匿名重定向、懒模块、横向溢出/pageerror。Vite preview深链回退可用不证明未来任意生产托管配置正确。

产物检查确认独立LazyNote chunk与转换后的CSS Modules类。本例没有性能基准，未把文件小/分块多自动当性能提升。浏览器构建中依赖的`use client`指令可能出现Rolldown提示；此工程全部是客户端Vite应用，不提供React Server Components构建，不能拿这里的产物用于验证Next服务端边界。

## 实验与未测边界

- 组件错误边界只演示渲染错误回退；不会自动处理任意事件/异步错误。
- Portal只移动说明文本，没有实现完整模态对话框。简单模态先考虑原生dialog及正确焦点。
- 守卫只使用占位signedIn，不包含真实会话或后端授权。
- QueryClient测试是缓存/失效/保存旧值恢复；未实现完整乐观mutation并发和真实HTTP。
- UI库、React中的Styled Components/Tailwind、Next只作[明确的官方观察清单](../observations.md)，未安装或构建。CSS Modules是真实运行部分。
- 没有生产部署、真机、多浏览器、屏幕阅读器或真实学习者试学；不要求把全部选修库装进Vue/Nuxt主线。

依据：[MWG Forms](https://developer.chrome.com/docs/modern-web-guidance/guides/forms/forms)、[React](https://react.dev/learn)、[React Router](https://reactrouter.com/start/declarative/routing)及各知识点附带的官方来源。核对日期2026-11-24。
