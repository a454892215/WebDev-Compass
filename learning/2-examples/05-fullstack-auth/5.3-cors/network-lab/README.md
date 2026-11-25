# CORS、CSP与实时协议实验

共享阶段5.3/5.5共9点。先完成阶段2浏览器/HTTP、阶段3模块与CLI；认证/授权另见5.2。目标是区分“请求发送”“服务器动作”“浏览器可读响应”以及协议连接的所有者，不把控制台报错或连接成功当完整安全结论。

## 运行

在本目录运行，Node24.15+的24主线或26+、pnpm11.4；实际Node26.0.0。

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm start
# 打开 http://127.0.0.1:4404/
```

固定ws8.23.0、Socket.IO/server-client4.8.4、Playwright1.65.1，提交锁文件；首次安装需公共npm registry。pnpm11配置放YAML；ignoreScripts:true只针对本隔离lab，本轮冻结离线安装与实际执行已验证，不是所有工程通用建议。

页面4404，公开API/WS/Socket.IO/SSE4405，监听只在127.0.0.1。先关闭自己的手动服务，再执行：

```bash
pnpm test
# 优先本机 /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
# 可用CHROME_PATH指定现有Chrome；没有自动下载浏览器。
```

verify.mjs自启两个服务，真实后台Chrome在390/1440宽度运行，finally关闭服务器/浏览器。遇到端口被占用不要杀其他项目进程，先查来源。结果保存在忽略的artifacts/runtime.json；本轮摘要复制到docs/audits/stage-5-cors-realtime-runtime.json，由主阶段统一验收。

## 手动观察顺序

1. 点击“跨域读取与写入”：simple成功；plain/简单POST读失败，但write计数增加；JSON+X-Course需要OPTIONS；拒绝预检后实际POST计数为0。
2. seed设置本地HttpOnly Cookie，精确Origin+credentials读到hasCookie；通配*即使有ACAC也不能凭据读取。两端口不同源但同站，不能据此宣称跨站Cookie策略全部通过。
3. 同源/proxy由Node请求固定API目标，浏览器可以读；这不是认证，也不说明生产有反向代理。无任意target参数，不转发用户秘密。
4. verify.mjs另外执行本地JSONP：返回代码调用固定courseReceiver，展示跨源脚本执行能力，未访问外网。未知callback直接400；JSONP不用于新业务。
5. 点击“运行WS与SSE”：原生WS按app字符串ping/pong收发，SSE按id更新；“停止”或pagehide关闭本页面控制器。自动验收还故意drop一次原生WS，检查有限重连和again回应。
6. SSE第一次把同一id1发送两遍再断流，客户端seen去重；EventSource重连带Last-Event-ID:1后收到id2，显式close。fixture按id选择下一条，不是持久历史服务。
7. Socket.IO通过本地同版本客户端和服务端完成真实事件ack，与/ws原生协议分开。未验证多节点恢复、长轮询回退或业务持久投递。
8. 点“查看CSP实验”：真实响应头允许同源allowed.js、阻止内联脚本，并检查pagehide释放前页连接。HTTPS证书/HSTS/公网部署为另行观察清单，本轮只有loopback HTTP，未改浏览器安全设置。

## 文件与契约

- server.mjs：显式端点、计数、CORS、CSP、固定目标代理、WS Origin校验与Socket.IO/SSE。
- public/client.mjs：Fetch组合实验、原生WS有限指数退避、EventSource去重/错误预算及stop/pagehide。
- public/csp.html与allowed.js：可被静态检查和真实服务同时引用的CSP对照。
- verify.mjs：真实浏览器正/负例与连接计数；Node错误Origin握手获403。Origin仍可被非浏览器伪造，不是用户身份。

默认页面没有生产CSP，故意允许本地JSONP观察；/csp才有明确严格策略。不要把其script-src 'self'直接粘进Nuxt破坏payload/接管后宣称安全；需要按真实资源设计nonce/hash等。

## 验收与边界

- [ ] 能同时证明浏览器CORS读失败与简单POST动作已发生，不把CORS当CSRF防线。
- [ ] 预检、凭据、代理各自用对应请求/头/计数解释；Cookie是公开fixture，不是生产会话。
- [ ] WS停止后不再重连，SSE重复id不重复应用，close/pagehide后服务端active归零。
- [ ] 区分Socket.IO ack、消息收到、事务持久化与恰好一次。
- [ ] CSP拒绝/允许有实际证据，HTTPS/HSTS未测范围明确。

真实测试不等于手机后台保活、OS推送、真机、多浏览器、生产认证/吞吐/TLS部署或学习者掌握；心跳只验证一次应用层往返，完整定时超时/抖动/恢复窗口是练习。Nuxt综合项目本轮没有实时能力，相关任务是独立实验或宿主副本扩展。

依据：先读[MWG Security](https://developer.chrome.com/docs/modern-web-guidance/guides/security/security)，再核对[MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)、[WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)、[HTML SSE标准](https://html.spec.whatwg.org/multipage/server-sent-events.html)、[Socket.IO协议区别](https://socket.io/docs/v4/#what-socketio-is-not)。核对日期2026-11-25。
