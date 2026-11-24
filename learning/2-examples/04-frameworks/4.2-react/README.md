# 4.2 React / React Router / Next.js选修

Vue 3 + Nuxt为主线；本章是跨生态对照，React Native经验可迁移但不要求双修。前置为JavaScript、TypeScript、DOM和阶段3工程测试。推荐核心→路由→状态选择→工程比较；组件库、样式和Next按需。

26点均有理论、真实实验/明确观察清单、独立练习与综合任务映射。复用一个React小实验，不为每点复制完整项目。

- [4.2.1.1 JSX：表达式、转义与组件树](./4.2.1.1.jsx-demo.md)
- [4.2.1.2 函数组件与类组件：渲染纯度和实例边界](./4.2.1.2.item-4-2-1-2-demo.md)
- [4.2.1.3 Props与children：只读输入和组合](./4.2.1.3.props-children-demo.md)
- [4.2.1.4 useState：快照、更新队列与不可变数据](./4.2.1.4.usestate-demo.md)
- [4.2.1.5 useEffect：同步外部系统、依赖与清理](./4.2.1.5.useeffect-demo.md)
- [4.2.1.6 useRef：DOM引用与不参与渲染的可变值](./4.2.1.6.useref-demo.md)
- [4.2.1.7 useMemo、useCallback与memo：性能缓存的适用边界](./4.2.1.7.usememo-demo.md)
- [4.2.1.8 Context：跨层依赖与更新范围](./4.2.1.8.createcontext-demo.md)
- [4.2.1.9 useReducer：集中状态转换与纯函数](./4.2.1.9.usereducer-demo.md)
- [4.2.1.10 自定义Hook：复用有状态逻辑而非共享实例](./4.2.1.10.hook-demo.md)
- [4.2.1.11 错误边界：渲染失败的局部回退](./4.2.1.11.error-boundary-demo.md)
- [4.2.1.12 Fragment、Portal与Suspense：三种不同边界](./4.2.1.12.portal-demo.md)
- [4.2.1.13 StrictMode：开发期纯度与清理探测](./4.2.1.13.strict-mode-demo.md)
- [4.2.2.1 React Router：URL、路由声明与导航](./4.2.2.1.react-router-demo.md)
- [4.2.2.2 嵌套与布局路由：Outlet和相对路径](./4.2.2.2.layout-route-demo.md)
- [4.2.2.3 客户端路由守卫：重定向与服务端授权的分工](./4.2.2.3.item-4-2-2-3-demo.md)
- [4.2.2.4 lazy路由：按需代码、等待与失败](./4.2.2.4.react.lazy-demo.md)
- [4.2.3.1 何时全局状态：按所有权与生命周期选择](./4.2.3.1.item-4-2-3-1-demo.md)
- [4.2.3.2 Zustand：选择器、订阅与工厂隔离](./4.2.3.2.zustand-demo.md)
- [4.2.3.3 Redux Toolkit：slice、异步action与中间件](./4.2.3.3.redux-toolkit-demo.md)
- [4.2.3.4 TanStack Query：服务端缓存、失效与乐观更新](./4.2.3.4.tanstack-query-react-query-demo.md)
- [4.2.3.5 React Hook Form + Zod：输入注册与运行校验](./4.2.3.5.react-hook-form-demo.md)
- [4.2.4.1 展示组件与容器：按职责组合而非机械分层](./4.2.4.1.vs-demo.md)
- [4.2.4.2 React组件库：Ant Design、MUI与shadcn/ui选型](./4.2.4.2.ant-design-demo.md)
- [4.2.4.3 React样式：CSS Modules、CSS-in-JS与工具类](./4.2.4.3.css-css-modules-styled-components-demo.md)
- [4.2.4.4 Next.js App Router：页面、Route Handlers与服务端边界](./4.2.4.4.next.js-demo.md)

真实工具版本、步骤和未测边界见[React实验](../../../2-examples/04-frameworks/4.2-react/react-lab/README.md)。
