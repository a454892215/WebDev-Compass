# 认证、刷新与授权隔离实验

先修阶段5会话、阶段6安全和阶段8请求边界。本实验只使用公开合成Alice/Bob/tenant；浏览器可以创建Alice fixture，不是真实用户认证。主Nuxt工程另按自己的入口运行，不能将本lab端点当主工程已有能力。

```bash
# 当前auth-lab目录，Node26.0.0 / pnpm11.4.0
pnpm install --frozen-lockfile
pnpm test
pnpm verify
```

jose6.2.18由本轮官方npm registry核对并锁文件固定，Playwright1.65.1。verify使用现有macOS Chrome后台运行，4523 loopback临时服务和浏览器在finally关闭；其他平台需调整脚本中的Chrome路径或安装Playwright对应浏览器。无外部业务服务、真实凭据或真实passkey。产物/缓存忽略，不提交临时token或私钥。

## 四项Node机制

1. core.mockAuthorizationFlow：真实随机state/verifier/code和S256比较、固定redirect、单次消费；错误state/verifier/redirect/replay拒绝。是内存受控协议模型，client state和server exchange为教学放在一个函数，不是真实OAuth/OIDC服务器、IdP或登录。
2. createRefreshStore：32族/1小时过期/每族16次上限；只存token哈希索引，同步consume-and-rotate；旧token复用族撤销。两个并发调用严格策略一个成功、另一个复用撤销，连赢家的新token也不可用。不是跨进程事务，不自动适合生产重试策略。
3. createJwtFixture：成熟jose临时ES256密钥签验；固定alg/iss/aud/typ/kid、requiredClaims/maxTokenAge和业务claim类型；错算法/签名/key/issuer/audience/exp/type/roles、jti撤销均拒绝。未做JWKS/KMS/多副本耐久撤销，不手写JWT加密。key仅内存，不记录原token。
4. authorize：每次role+owner+tenant+action；坏roles类型/未知动作默认拒绝。角色存在不自动获得所有对象权限。

## 真实HTTP与浏览器

POST /session要求精确Origin并创建60秒随机HttpOnly/SameSiteStrict fixture Cookie。本地HTTP未用Secure，不冒充HTTPS生产策略。任何访问者都可获Alice演示身份，无真实密码/IdP。

GET /api/note默认note-a为Alice/t1；note-b属于Bob/t1、note-c属于Alice/t2，服务器拒绝越owner/tenant；DELETE需admin，reader被拒。这个端点不依赖前端隐藏按钮。403是本教学契约，未对真实私有对象做枚举防护认证。

POST /logout要求精确Origin，服务端删除session并清Cookie；旧Cookie直接HTTP重放401。浏览器document.cookie为空但fetch可读200，证明HttpOnly“不可读”不等于“不会自动请求”。verify在390/1440各执行创建/读/注销/再读，记录httpOnly属性与无pageerror/横向溢出。

本例只验证精确Origin，不称完整CSRF token策略；主Nuxt会话写接口另有Origin+session CSRF。没有真实跨站SameSite矩阵、HTTPS Secure验证、XSS安全认证、原生Keychain/Keystore或多浏览器测试。未知方法/路径404，不提供通用生产网关。

## WebAuthn与后续

10.3.4为W3C/MDN官方仪式观察，明确challenge/origin/RP ID/flags/签名/恢复，不调用navigator.credentials或用户认证器，不把理论流程记成实际passkey登录成功。

[七点操作卡](../README.md) · [主综合项目](../../../../4-practice/10-security/README.md) · [逐点任务](../../../../4-practice/10-security/tasks.md)
