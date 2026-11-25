# 阶段8：Vue/Nuxt 模块化学习工作台

前置：阶段0–7。目标是能根据约束写RFC/ADR，划分模块和依赖，确定URL/组件/服务端状态归属，解释渲染选择与BFF失败边界。当前采用模块化单体；目录不是所有产品的强制规范，微前端/Edge/CRDT仍按需求选修。

## 运行与验证

在本目录执行；固定Nuxt4.7.0、Vue3.5.46、TypeScript6.0.3及锁文件基线，本轮Node26.0.0/pnpm11.4.0。不是每章自动升级最新版。

```bash
pnpm install --frozen-lockfile
pnpm dev
# http://127.0.0.1:4512/?scope=alice
pnpm typecheck
pnpm lint
pnpm boundaries
pnpm test
pnpm build
pnpm test:e2e
pnpm format:check
```

test:e2e需要先build，启动生产Node与后台Chrome后自动关闭。默认macOS Chrome，其他环境用CHROME_PATH。无需真实业务服务、外部账号或凭据；主项目4512，模块隔离lab4513/4516，BFF lab4514，状态lab4515。产物/依赖/数据库测试文件不提交。pnpm workspace只含当前目录，严格验证失败应显式冻结安装，保留供应链约束。

## 从实际源码逐层阅读

1. app/pages是路由/容器，通过features/catalog/index.ts公共入口调用能力；CourseList只接受公开DTO和收藏props，用emits传递动作，保持纯展示职责，不直接读取服务器fixture。
2. catalog/domain/filter与application/view是纯函数；Nuxt数据/状态留在composables。URL q是已提交搜索，input draft是局部ref；scope是公开样例选择，不是登录，任何人都能改。
3. useWorkspace经useAsyncData和requestFetch读取/api/workspace。key包含scope与failOptional情景；q只过滤已读课程，不影响远程结果所以不进入该key。SSR payload接管避免初始浏览器重复API；未知API scope400，未知详情404。
4. useFavorites调用Nuxt useState，每Nuxt应用创建一份值，scope:slug区分收藏。它只在当前客户端会话导航内保留，刷新重置，既不持久化也不跨设备同步；不是生产用户/租户权限实现。
5. server/api/workspace校验输入、组装application与infra。应用服务依赖domain端口接口，不import具体fixture；fixture是进程内立即返回Promise的合成adapter，没有真实HTTP网络/超时预算。必要课程DTO非法则拒绝；可选进度失败为null+warning且保留课程，合法0与失败分开。shared/contracts负责公开DTO和浏览器运行时解码，内部字段不输出。
6. scripts/check-boundaries.mjs解析显式TS/Vue script import图、别名和循环，10项unit含五组边界正反例；规则覆盖与未覆盖详见[架构文档](./docs/ARCHITECTURE.md)。未安装eslint-plugin-boundaries，不把自定义有限门禁称完整安全沙箱或所有Nuxt依赖解析器。

GET /api/workspace?scope=alice返回version:1、scope、courses、completed、warnings；scope=bob隔离合成数据。failOptional=1让可选adapter失败但HTTP200/进度null/警告；不在URL接收任意上游地址。主API必要DTO错误映射502的路径由单元故障注入验证，主HTTP正常fixture不伪装为真实上游故障测试。

公开合成scope也按private/no-store/cache:false处理以演示请求结果边界；这不是实际认证或授权。所有浏览器payload都是公开信息，runtimeConfig私有canary不输出；缺少真实身份能力时不能拿本项目保护真实账号。

## 四部分与专项实验

[理论](../../1-notes/08-architecture/README.md) → [代码与观察](../../2-examples/08-architecture/README.md) → [独立练习](../../3-exercises/08-architecture/README.md) → [39项综合任务](./tasks.md)。

- 模块/隔离lab：真实注册/清理、版本事件、Shadow样式、History与跨源iframe校验；没有装真正Module Federation或single-spa，不把普通动态import称联邦。
- BFF lab：固定loopback真实HTTP上游、deadline/取消、必要失败、可选降级、日期/DTO与版本兼容；GraphQL和Edge是明确官方观察。
- 状态lab：真实IndexedDB草稿/刷新、网络不可用时队列保留、显式重试/幂等/revision冲突；没有SW离线导航、真实Background Sync或CRDT库运行。

已有功能与要求副本新增的任务分别写明。RSC/Islands/ISR/GraphQL/微前端/CRDT/CQRS不因课程出现就全部安装或默认采用。

## 决策与交付

[RFC](./docs/RFC.md)比较三个候选；[ADR](./docs/ADR-001.md)记录选择与后果；[NFR](./docs/NFR.md)给可观察约束；[架构视图](./docs/ARCHITECTURE.md)区分C4、源码依赖与调用流程。

本轮结果见[验收记录](../../../docs/audits/STAGE_8_ACCEPTANCE.md)。本地Chrome两视口不是移动真机，axe不是完整无障碍认证；没有真实身份、生产容量/监控、远程部署、真实读屏或学习者试学。架构正确性不能只凭文件数、测试绿或一张图保证。
