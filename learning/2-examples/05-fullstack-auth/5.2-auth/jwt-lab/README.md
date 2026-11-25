# 认证机制实验：jose签验与刷新协调

类型：真实Node/WebCrypto+jose运行，固定jose6.2.18、pnpm11.4.0。本轮Node26.0.0；按项目engines支持24.15+的24主线或26+。

```bash
# 仓库根目录
cd learning/2-examples/05-fullstack-auth/5.2-auth/jwt-lab
pnpm install --frozen-lockfile
pnpm check
```

首次需要公共npm注册表。YAML保存pnpm11专有storeDir/ignoreScripts；没有全局安装、服务启动或凭据上传。verify.mjs用jose和WebCrypto生成临时RS256密钥，进程结束即丢弃；不导出私钥、不打印token、不使用真实issuer服务。issuer.example.test只是本地claims比较字符串。

16组检查分别证明：正确签名；只解码可看到伪造role但验签拒绝；错误key；过期exp；未来nbf；错误issuer/audience；缺失必要exp；错误typ；算法allowlist；最大token年龄；Bearer header语法；owner/admin策略；同会话refresh单飞；退出代次拦截迟到结果；不同协调实例隔离。一次检查可以含多个断言，不能把检查数当掌握率。

时间固定在测试用currentDate，不依赖墙钟等真实过期。篡改payload只制造负例，不实现自己的签名算法；密码学交给jose。contracts.mjs中Bearer解析与服务器验签分开，纯owner策略假定输入身份已经由服务器认证。

refresh使用受控Promise：没有真实token endpoint、refresh轮换或网络业务重放。loader只返回结果，不自行写会话状态；epoch检查不能撤销loader已产生的外部副作用。本地single-flight只降低同会话并发，不能代替发行者轮换/复用检测。对POST的自动重试还要看幂等契约。每个客户端会话独立建协调器，不能放SSR进程全局。

运行报告写入忽略的artifacts/runtime.json；阶段审查保存摘要。Cookie属性、CSRF、服务器会话撤销、Nuxt SSR和真实浏览器另由[综合项目](../../../../4-practice/05-fullstack-auth/README.md)验证，不能用本实验代替。

依据：[jose官方](https://github.com/panva/jose)、[JWT规范](https://www.rfc-editor.org/rfc/rfc7519.html)、[JWT BCP](https://www.rfc-editor.org/rfc/rfc8725.html)、[OAuth安全BCP](https://www.rfc-editor.org/rfc/rfc9700.html)。先读MWG Security/Forms后核对这些专属协议资料；核对日期2026-11-25。
