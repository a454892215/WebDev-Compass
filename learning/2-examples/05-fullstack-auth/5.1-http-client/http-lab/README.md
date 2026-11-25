# HTTP、上传与数据契约实验

前置：阶段2异步/HTTP、阶段3TypeScript与阶段4框架。实验用Node26内建HTTP/fetch/Request/FormData/File/Blob，没有第三方运行依赖。固定pnpm11.4，提供空依赖锁文件，不需要注册真实账号或连接外部业务接口。

```bash
# 仓库根目录进入
cd learning/2-examples/05-fullstack-auth/5.1-http-client/http-lab
pnpm install --frozen-lockfile --offline
pnpm check
pnpm start
# http://127.0.0.1:4401/
```

`pnpm check`只监听临时loopback端口，测试后自动关闭；手动server需自行停止。sandbox禁止listen时应按权限流程运行，不当成协议失败。Node HTTP与浏览器行为各自报告，不能用Node fetch证明CORS策略。

## 先读源码，再操作

1. client.mjs：HTTP/Content-Type/JSON/DTO错误分层、latestLoader的代次与清理、只读重试预算及allowlist URL。
2. server.mjs：独立可重置fixture、分页/过滤、坏JSON/错结构/404、429→成功、POST幂等key与上传/download。
3. openapi.json：固定3.1.1版本的本地规范。测试只检查已知不变量，并非完整OpenAPI验证工具。
4. browser.mjs：语义表单、真实XHR上传progress、最终HTTP结果与Blob对象URL清理。

`pnpm check`运行9组测试：真实HTTP分类、取消/超时、受控慢旧结果、稳定分页、multipart/限额/Blob、重试预算、幂等key、URL目标、OpenAPI局部契约。一组可包含多个断言，不把测试组数当知识掌握率。

## 浏览器专项

```bash
pnpm test:browser
```

专项从阶段4 Nuxt综合工程已安装的`@playwright/test`复用浏览器工具；尚未安装时先按阶段4工程README安装，或将PLAYWRIGHT_MODULE设为可导入Playwright工具的绝对路径。CHROME_PATH可指定Chrome，本轮使用macOS现有Google Chrome，不下载浏览器。后台390/1440视口分别实际验证搜索/空态、XHR上传进度100、服务端413、Blob下载名及无横向溢出/pageerror。脚本finally自动关闭浏览器与4401服务；输出在忽略的test-results中。

## 协议与教学边界

- `/api/v1/items`返回`{items:[{id,title}],total}`，page从1开始，size1..3，title再id稳定排序，q只允许单值。固定数据的offset分页不证明生产并发列表不会漂移。
- `/api/upload`仅一个file；总multipart4096字节、文件1024字节，text/plain/.txt并拒绝NUL和非法UTF-8。返回`stored:false`，不保存/执行文件，不提供生产扫描或存储服务。
- XHR进度表示传输，不表示业务已接受。普通浏览器fetch没有本例使用的传统upload progress回调；不要伪造进度百分比。
- `/api/create`展示无用户的内存key+body摘要去重；同key同body返回同id、不同body409。无数据库事务、并发持久化、过期或用户主体绑定，不能作为生产支付/订单实现。
- safeRead只自动重试GET/HEAD的429/503，最多3次；Retry-After超过1秒本地预算就停止，不偷偷缩短服务端等待。网络错误与非读取操作交给上层显式决策，取消不能证明服务端回滚。
- GraphQL/gRPC-Web为[独立协议观察清单](../../5.4-data-protocols/protocol-observations/README.md)，本实验不实现它们的执行器、代理或认证。
- 没有注册MSW/Service Worker，本章选择真实HTTP mock服务器；没有真实生产授权、TLS部署、手机真机、多浏览器或人类试学结论。

核对日期2026-11-25。先读[MWG Forms](https://developer.chrome.com/docs/modern-web-guidance/guides/forms/forms)与[Security](https://developer.chrome.com/docs/modern-web-guidance/guides/security/security)，再核对MDN Fetch/XHR、RFC9110及OpenAPI官方规范。逐点操作卡说明每个机制的实际验证范围。
