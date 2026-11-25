# 浏览器选修实验：认证、模块、Wasm与3D

这是15.6.5–8共用的独立最小实验。Node26、已安装Google Chrome；Playwright解析自本仓库阶段14项目的锁定依赖。先在learning/4-practice/14-bff-runtime执行pnpm install --frozen-lockfile，随后回到仓库根运行：

```sh
node learning/2-examples/15-project-delivery/15.6-web-platform-advanced/specialized-lab/verify.mjs
```

CHROME_PATH可指定浏览器路径。脚本自动启动127.0.0.1:4576、以http://localhost:4576访问、创建临时浏览器上下文与虚拟认证器，结束后关闭。必须允许loopback和后台Chrome。不要同时启动本lab手动服务。运行摘要写dist/runtime.json；该产物忽略不提交。

手动观察：在本目录node server.mjs，再打开http://localhost:4576。真实用户点击WebAuthn按钮可能出现系统认证器交互；自动化使用隔离虚拟认证器，不会读写你的真实passkey。想避免系统交互可只观察其他三个区域，或用?fallback。Payment只typeof，没有show和订单。

## 文件与教学顺序

1. index.html先声明本地Import Map，经典bootstrap检测后才加载app.mjs；不支持路径保留基础文字。
2. app.mjs使用catalog-utils裸名；catalog.mjs为受控本地模块，无CDN。
3. Wasm按钮实际执行标量/SIMD微型模块、grow内存。普通文档不启动共享内存Worker；/isolated和worker响应给隔离头后才测试shared Memory与JS Atomics。
4. WebGL渲染倾斜橙色三角形，实际像素与资源句柄有断言；释放按钮解除使用并delete缓冲/程序/着色器。
5. WebAuthn浏览器仪式明确serverVerified:false。生产服务端验证仅见理论与练习责任表。

?fallback强制Wasm/GL/WebAuthn不可用分支；?no-importmap只测试Import Map门控且不加载依赖模块。这些是当前Chrome内故障分支，不是真实旧引擎兼容验证。隔离头仅本实验路径，未更改主Nuxt部署。

## 未执行范围

没有服务端WebAuthn验签/登录/真实passkey、支付UI/商户/结算、CDN跨源加载、Emscripten构建/pthread、Three.js、物理GPU性能、真实上下文丢失/恢复、多引擎或真机。Chrome用SwiftShader验证渲染，不能当手机帧率数据。普通WebGL非MWG Origin Trial HTML-in-Canvas，本项目未启用试验能力。

[返回组索引](../README.md)
