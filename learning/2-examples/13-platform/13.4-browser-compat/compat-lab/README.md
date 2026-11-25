# 浏览器兼容与回退实验

Node26/pnpm11、现有本机Chrome；全部loopback端口4554，不改前台应用或浏览器安全设置。

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm build
pnpm verify
```

真实Node测试：Browserslist4.29.6显式查询/非法query、本地能力选择与按需加载、狭窄字符串列表回退契约。Vite8.3.8 build.target显式es2022，生成JS/CSS与独立fallback chunk；这不是legacy插件或所有旧浏览器兼容证明。legacy.config.mjs.example只官方观察模板，本轮未装插件。

verify启动原生Node静态服务，读取源码模块；真实390/1440后台Chrome：

- 原生Intl.ListFormat存在，不请求list-fallback；fixture=missing只注入能力缺失分支，按需请求本地模块，不冒充旧浏览器或完整Intl polyfill。
- 原生CSS.supports/grid与computed；隔离替换CSS为无效supports条件后基础block正常，900px故障出现溢出并恢复。
- javaScriptEnabled:false仍能阅读/操作原生details。UA改名仍检测到同样能力，明确同一个引擎。
- abort本地增强模块后显示失败/禁用增强，原生基线仍可读。
- print媒体隐藏导航/按钮、显示必要正文副本、布局为block；生成A4 headless PDF检查头和字节。artifacts截图/PDF不提交。没有系统打印对话框或物理打印结果。

默认关闭的details正文可能不被各引擎打印，不能只改display猜测；此小例使用明确print-only正文副本，真实项目应从共享数据生成专用打印视图并校对分页。头检查/文件存在不等于全部页面排版认证。

浏览器只验证本机Chrome，视口模拟不是手机或Safari；CHROME_PATH可指向用户已有Chrome。无新的浏览器下载、remote polyfill、指纹、真实账号或外站上报。finally关闭浏览器/server，生成dist/artifacts被忽略。

[支持矩阵模板](./matrix.md) · [返回本组](../README.md)
