# 本地教学接口与错误契约

仅Node SSR提供接口；静态服务器/api/*一律404，不用SPA fallback200假装API存在。无真实凭据、用户或数据库。

| 方法与路径       | 成功                                                                                                   | 失败/边界                                                         | 缓存                          |
| ---------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | ----------------------------- |
| GET /api/health  | 200 application/json，{"status":"ok","release":"local-a"}；release可被运行时NUXT_PUBLIC_RELEASE_ID覆盖 | 仅表示本进程当前能响应，不证明所有依赖、容量或外网健康            | no-store                      |
| GET /api/catalog | 200，courses数组，slug/title/summary                                                                   | 公开固定目录，非实时业务后端                                      | Nitro swr:30，绝无身份数据    |
| GET /api/private | 200，name为Alice fixture或Bob fixture，notice为公开合成说明                                            | 未设/非法stage7-demo Cookie为401；任何人可伪造fixture选择，非认证 | cache:false，private,no-store |

/account匿名HTTP200包含可见401说明，不称页面HTTP401；/api/private才返回401。/courses/absent在SSR返回404；CSR托管先回壳HTTP200，由客户端显示404，此时不能声称服务端已知路由不存在。静态SSG未知文档托管404；/account不预渲染也不提供私有能力。

客户端类型不是运行响应验证；若替换为真实外部后端，须先定义unknown解码、超时、授权、重试与错误展示。示例仅可信本地固定服务，不能拿公开接口的类型断言当通用解码器。
