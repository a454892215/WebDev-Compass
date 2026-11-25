# 多语言、RTL与无障碍本地实验

本目录对应15.5.1–15.5.6。Node26、pnpm11；固定intl-messageformat10.7.18、Playwright1.65.1和axe4.14.1，教学固定版本不代表最新。运行：

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm test:browser
```

浏览器脚本仅启动127.0.0.1:4574，使用本机Google Chrome或CHROME_PATH，后台无界面、不抢焦点；退出关闭浏览器与服务器。生成证据仅写dist/browser-results.json。交互可另执行pnpm serve，再打开回环地址；结束Ctrl+C，不与自动测试同时占端口。

## 代码与顺序

- messages.mjs与两个messages-*.mjs：真实ICU复数/select，catalog语义的一组消息按语言动态import；只允许en/ar，不把任意locale拼成路径。这里没有Nuxt插件或完整业务namespace分包，扩展需显式增加允许的locale/namespace加载表。
- unit.test.mjs：ICU 0/1/多、阿拉伯语双数、gender/select兜底及实例隔离；同一UTC瞬间的纽约DST缺口/重复小时和无时区输入拒绝。
- index.html/style.css/ui.mjs：原生语义与逻辑CSS、BiDi隔离，简单同文档History导航、标题/焦点/status、可编辑建议combobox及原生dialog。
- browser.mjs：1440/390两视口实际跳转/返回、skip focus、RTL边框、combobox键盘、dialog内两个控件间Tab、关闭与返回、选定axe规则和溢出检查。英文教学控件明确body lang=en，阿拉伯语段落lang=ar，lang和dir分别负责发音与布局。这里只切换布局，不翻译英文教学控件，因此html主语言保持en。

## 限制

ICU是Node真实库测试，HTML没有把该库打包到浏览器；浏览器RTL/焦点实验是另一条真实路径，不能声称已接Nuxt完整国际化。字体/翻译与性别语法需产品语言人员审查。原生Intl在本例足够，dayjs timezone仅作为可选官方对照，未安装运行。

SPA滚动表按pathname存储，只展示最小模型；同一路径多历史条目、hash、异步内容高度、嵌套滚动和Nuxt路由策略需另做per-entry恢复。浏览器脚本验证返回路由及标题，不将其称为完整滚动恢复验收。

combobox仅固定三城市、单选建议，未实现虚拟列表/异步查询/复杂输入法；日期选择器仅读APG官方示例，没有自定义日期网格。dialog用showModal，不手写全页面Tab拦截；允许用户访问浏览器界面，不以阻止离开浏览器内容区当作测试目标。axe零违规和本次键盘结果不是WCAG2.2 AA合规认证；未做真实读屏、残障用户试用、真机或多引擎评估。VPAT/ACR是教学评审材料，未出具对外报告。
