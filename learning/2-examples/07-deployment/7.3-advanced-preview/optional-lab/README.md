# 阶段7选修：原生机制实验

本lab有4种真实机制：CustomElement原生按钮与连接/断开清理、内嵌WASM i32 add、SVG和等价表格、受限schema渲染。没有安装或运行完整微前端、GraphQL服务、Electron/Tauri、Expo或富文本编辑器；图库为官方比较，图形实现为原生SVG。

前置：JS模块、事件、异步与DOM；Node>=24.15、pnpm11.4、可用Chrome。固定Playwright1.65.1仅用于自动验证，无业务运行依赖。

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm serve
# 打开 http://127.0.0.1:4509
# 结束手工服务后，再运行自动验证
pnpm verify
```

verify自己启动/关闭loopback服务与后台Chrome；macOS默认Chrome路径，其他位置用CHROME_PATH指定，不自动下载浏览器或修改安全设置。浏览器结果保存在忽略的artifacts/browser.json。Node测试无服务器。端口被占用应先确认归属，不杀其他任务进程。

## 建议顺序与结果

1. 看logic.mjs中的WAT注释与字节；点击计算7+5得到12。Node同时验证负数、i32溢出和截断模块失败。本轮没有运行Emscripten，也未证明WASM比JS更快。
2. 看CourseCounter：constructor仅初始化内部DOM；connected绑定稳定函数，disconnected移除；button承担键盘语义。点击计数收到父容器事件，重新连接后保持计数。verify断开时发全局事件确认不变化，重连后只变化一次。
3. 数据先校验后绘SVG，同时生成30/50/20分钟表格；SVG有名称，表格是精确文字等价。viewport390/1440下不横溢出；不是完整无障碍认证，未用真实读屏器。
4. schema整体校验成功后才改DOM，未知script类型被拒绝且旧内容保留；标签字符串只显示文本。没有eval、任意HTML属性和组件名动态执行。它不是完整JSON Schema库或低代码设计器。

## 自己尝试

按对应独立练习扩展收藏状态、WASM边界、第四个图形数据和受限notice节点。先预测再运行，记录失败与恢复。微前端/桌面壳等选修先完成官方观察与设计，有真实产品需求后再引入工具链。

[返回操作卡目录](../README.md) · [理论](../../../../1-notes/07-deployment/7.3-advanced-preview/README.md) · [独立练习](../../../../3-exercises/07-deployment/7.3-advanced-preview/README.md) · [综合任务](../../../../4-practice/07-deployment/tasks.md)
