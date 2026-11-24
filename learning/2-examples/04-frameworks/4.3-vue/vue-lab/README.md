# Vue 3组件与状态实验室

这是原生Vite+Vue3客户端工程，服务本章13个知识点，不是Nuxt宿主基座，也没有真实业务后端。

## 安装与运行

在本目录执行：

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm dev
# http://127.0.0.1:4301/
pnpm test:e2e
```

环境：本轮Node26.0.0、pnpm11.4.0；支持Node24.15+的24主线或26+。固定Vue3.5.46、Router5.5.1、Pinia4.1.0、Vite8.3.8、plugin-vue6.0.11、vue-tsc3.3.14、TypeScript6.0.3，版本和完整解析图见package.json/pnpm-lock.yaml。首次安装访问公共npm注册表；不需要全局安装或修改其他项目。

pnpm11专有设置在pnpm-workspace.yaml，store放node_modules内；不沿用旧.npmrc的非认证配置。安装与冻结验证均实际执行。未来新版本需核对peer/引擎范围与回归，不能仅替换latest。

## 命令各查什么

- typecheck：vue-tsc检查TS和SFC契约，不拿Vite转换代替类型检查。
- test：11个Vitest/VTU用例，覆盖实例独立、响应式解构、watchEffect、Props/emits/model/slots、注入、更新后焦点、Pinia隔离、路由参数复用、KeepAlive与受控迟到结果。
- verify:negative：临时创建错误SFC，实际让vue-tsc拒绝错误Props、model和事件payload（TS2322/TS2345）；finally删除fixture，不把预期失败混进正常源码。
- build：先类型检查再实际Vite产物；各页为动态import。生产部署仍要配置深链回退，本实验只使用开发服务器。
- verify:output：检查真实scoped属性选择器及三个动态路由chunk。
- test:e2e：后台真实Chrome，1440×900与390×844各一个流程；自动启动/结束本地4301服务。默认复用本机Chrome路径，也支持CHROME_PATH；没有Chrome时可按Playwright官方安装浏览器，但本轮未下载。

## 按机制观察

1. 从CounterPanel的SFC结构开始，点击计数；两个独立组件实例状态不同。
2. Playground的筛选/空态、v-show帮助、稳定key、文本插值和组件草稿。注入主题从祖先提供，不是全局单例。
3. ReadingCard的Props只读输入、toggle事件、命名draft模型和作用域slot。主状态在父/Pinia，草稿在父页面；没有子级直接改props。
4. FocusInput先v-if显示，nextTick后聚焦。KeepAlive页签保留计数/笔记，记录激活/停用，不把缓存当永久存储。
5. 搜索输入error、empty和普通文字。数据来自内存延迟fixture，**不访问HTTP业务接口**；可恢复状态由watch管理。单测用可控Promise让旧loader忽略abort，仍证明慢旧结果不会覆盖新结果，停止scope后不回写。
6. 详情1→详情2复用组件仍响应params；页内完成状态可在详情读取。受限演示恒重定向，仅展示客户端体验，不是登录或后端授权。刷新详情依赖Vite回退；生产状态码另学Nuxt。

模板使用原生search元素；当前Vue编译器未把它识别成内置HTML标签，因此Vite/Vitest两侧显式将tag===search保留为原生元素，避免未解析组件警告。它不是自定义Web Component，也不需要运行时注册。

组件库选型点使用原生基线和官方比较清单，不声称Nuxt UI/Vant已安装；Nuxt概览点是迁移阅读，实际Nuxt运行见4.5和综合项目。Teleport/Transition/异步组件只是按需对照边界，不声称本lab已演示全部Vue内置组件。

## 验证范围

实际vue-tsc、11测试、3类类型错误、生产构建、两视口E2E通过。jsdom组件测试不是布局/真机验证；Chrome视口不是手机真机。未验证屏幕阅读器、真实移动键盘、多浏览器、生产后端/认证/部署/SSR或真实学习者试学。

[本章操作卡](../README.md) · [Modern Web Guidance Forms](https://developer.chrome.com/docs/modern-web-guidance/guides/forms/forms) · [Vue官方指南](https://vuejs.org/guide/introduction.html)
