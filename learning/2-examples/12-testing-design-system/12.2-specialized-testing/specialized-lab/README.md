# 专项测试实验

真实运行型：Node26.0.0/pnpm11.4.0、Vite8.3.8、Playwright1.65.1、axe4.14.1。只有本机Chrome，端口4543；默认浏览器路径为macOS Chrome，其他环境用CHROME_PATH。不加载外部资源，不输入真实资料。

~~~bash
pnpm install --frozen-lockfile
pnpm test
pnpm build
pnpm verify
# 手动观察源码
pnpm dev
~~~

verify读取同次真实JS/CSS产物raw/gzip，按20KB/10KB教学预算检查；在临时副本注入随机合成大字符串并实际第二次Vite构建，报告增量且要求预算拒绝。不是生产版本对比/用户性能；gzip是逐文件合计，不代表实际CDN传输、缓存或RUM。基线工程不含这段膨胀代码，临时目录finally清理。

后台Chrome分别390/1440：正常axe无违规、去label关联必检出/恢复、跳转正文、原生dialog焦点/Esc/返回触发点、伪本地化扩展不横溢出、RTL与bdi LTR、390固定宽度必横溢出/恢复。artifacts保存pseudo/RTL当前截图供观察，不是已审批golden baseline或像素差回归证明。四张图片不提交。

lighthouserc.cjs是官方观察配置，本轮未安装/执行LHCI或上传结果。playwright.matrix.config.mjs是多引擎配置模板，本轮未执行Firefox/WebKit；已提供表单/dialog smoke用例，须准备匹配Playwright浏览器后运行pnpm test:matrix；本轮仅--list发现三项目。BrowserStack只是官方服务观察，无云账号/会话。屏幕阅读器按课程清单另验，未把axe或模拟视口当读屏/真机通过。

[返回本组入口](../README.md)
