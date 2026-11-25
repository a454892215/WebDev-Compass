# 安全输出与国际化独立实验

前置：阶段3模块/构建、阶段4Vue组合式API、阶段5请求/来源与Cookie。本lab覆盖6.2与6.4的局部机制，不包含真实账号、秘密、第三方攻击或Nuxt SSR；主Nuxt并发语言与hydration另验。

## 安装与运行

```bash
cd learning/2-examples/06-performance-security/6.2-web-security/security-i18n-lab
pnpm install --frozen-lockfile
pnpm check
pnpm verify:browser
```

固定Vue3.5.46、vue-i18n11.4.23、DOMPurify3.5.0、Vite8.3.8、Playwright1.65.1、pnpm11.4.0；本轮Node26.0.0，project engines为24.15+的24主线或26+。pnpm11 store在YAML，不全局安装。

首次安装需要公共npm注册表。浏览器使用已有macOS Chrome或CHROME_PATH，不自动下载；verify:browser自动在127.0.0.1的4503/4504启动服务并在finally关闭。本lab故意包含会被CSP拒绝的内联脚本与错误CORS端点，且所有数据是合成fixture；不要把这些反例拷到主项目、生产服务或外网站点。

## 按源码阅读

| 文件 | 机制与预期 |
| --- | --- |
| security-entry.js | 相同恶意形状字符串作为textContent不会生成标签；DOMPurify白名单净化后仅允许b/em，不再拼未信任HTML |
| security.html / server.mjs | CSP允许同源外部模块，拒绝未授权inline；frame-ancestors拒绝本地父iframe，不混同frame-src |
| server.mjs / verify-browser.mjs | 匿名演示Cookie/同步nonce与变更计数；正确同源token成功，缺token/跨源写不改变计数；错误反射CORS可让另端口读到合成私有值 |
| messages.mjs | 参数、英语复数、中文缺项回退、阿语自定义6类pluralRules、每实例locale |
| i18n-entry.js / style.css | Vue-i18n实际挂载与切换，html lang/dir、逻辑间距和RTL盒子位置 |
| verify-domain.mjs | 4组Node真实消息/Intl/实例隔离与locale拒绝；不能当作Nuxt SSR证明 |
| check-artifacts.mjs | hidden仍生成map且含公开源码注释；server-only合成canary未进入公开JS/map；不能证明没有其他秘密 |

已知缺项专门用于回退实验，所以本lab关闭missing/fallback日志；真实产品仍需按策略监测缺项和翻译完整性。

CSP拒绝、frame拒绝、CORS读取拒绝是预期安全结果，测试核对实际结果；不是把所有控制台错误都忽略。source map canary只是无秘密教学字符串，未放真实密钥。

## 依赖审计的范围

本轮2026-11-25实际执行`pnpm audit --prod --json`成功，当前production依赖31项、已知公告计数均0。快照记录在[本组运行证据](../../../../../docs/audits/stage-6-security-i18n-runtime.json)。这不包括开发依赖，不代表主Nuxt全树、不代表未知漏洞为零。之后按风险需要重新查询；不能因有一次快照就无限期宣称安全，更不要盲目audit fix force。

## 验证与限制

实际pnpm check通过4组domain+Vite build+2项map/公开资产检查；Chrome390/1440各3组（文本/净化/CSP、iframe/CSRF/CORS、i18n/Intl/RTL），共6组。browser.json是忽略的临时输出；正式事实保存在上方审查记录，便于主审复核。

未测：真机、其他浏览器、屏幕阅读器、母语翻译审校、生产HTTPS/HSTS、真实登录/密钥/凭据、完整供应链攻防或真实Nuxt SSR。Arabic示例仅证明特定参数/规则，不是专业翻译质量认证。安全策略、净化支持与部署都须按实际产品继续选择。
