# 阶段 1 综合实践：学习资源目录

这是 HTML/CSS/JavaScript 的组合练习。界面提供语义结构、宽窄布局、筛选/收藏、主题和真实的同源 fixture 请求；服务端只读，不需要账户或外部服务。

## 运行

在仓库根目录执行：

```bash
node learning/4-practice/01-web-fundamentals/server.mjs
```

打开 http://127.0.0.1:4174/ 。用 STAGE1_PORT 可调整端口。直接打开 HTML 或普通静态服务器不能提供本项目的 `/practice-api/resources` 接口。

## 文件与机制

- index.html：语义、表单、状态区域和无脚本可用的普通资料链接。
- styles.css：内容优先的 Grid/Flex、尺寸约束、焦点和主题变量。
- app.mjs：模块、DOM、事件、数据解码、请求取消及版本归属。
- server.mjs：标准库 HTTP/文件服务和确定性 fixture。正常/空/慢/HTTP 503/坏 JSON 是真实的本机响应，不是浏览器里假冒 fetch 成功。
- [tasks.md](./tasks.md)：逐知识点的综合任务和验收映射，允许一个项目覆盖多项。

## 先运行，再独立实现

1. 不看 app.mjs，先根据页面行为列出状态与数据结构。
2. 独立实现筛选和收藏，再对照参考实现解释差异。
3. 使用 Network 面板区分正常、HTTP 503、无效 JSON、取消；观察 `response.ok` 与 JSON 解析失败是两种边界。
4. 在慢请求期间发起新查询，确认旧结果不覆盖新结果；取消后能再次查询。
5. 使用 Tab、Enter、Esc 和窄视口检查控件可达性；切换主题后检查文字与焦点。
6. 禁用脚本或阻断接口，确认普通资料链接仍可用。先说明哪些功能降级，再决定是否提供替代流程。

## 总体验收

- [ ] 列表、筛选、收藏与刷新重置的行为可解释，空状态有下一步操作。
- [ ] HTTP、解析、取消和请求先后顺序分别可复现；旧请求不能覆盖新请求的状态。
- [ ] 未把接口数据当可信 HTML 插入；无真实凭据、持久化个人数据或外部上报。
- [ ] 390px 与桌面宽度内容可用，键盘有可见焦点，缩放不被禁止。
- [ ] 关闭 JS 后可阅读基础内容和打开静态资料；不会声称“所有动态功能无JS也能运行”。
- [ ] 独立完成一个新增主题筛选或排序功能，并提交代码、测试方法和一次排错记录。

## 验证边界

这是教学 fixture，不是生产登录/API服务。测试视口不能代替手机软键盘、安全区和 Safari 验证。工具链选修按关联任务完成真实构建或解释编译边界，不往业务代码里强塞所有语言特性。

## 参考

[Modern Web Guidance HTML](https://developer.chrome.com/docs/modern-web-guidance/guides/html/html) · [CSS 布局](https://developer.chrome.com/docs/modern-web-guidance/guides/css/css-layout) · [MDN Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
