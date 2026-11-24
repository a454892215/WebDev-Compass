# 阶段 3 综合实践：可检查的阅读任务板

前置：阶段1原生页面/事件/模块及阶段2异步、HTTP与数据边界。主线仍是原生Vite+TypeScript，Vue/Nuxt组件化在阶段4继续。目标是把“能跑的页面”变成可安装、类型检查、lint、测试和构建的小工程。

## 运行顺序

在本目录执行（不是仓库根目录）：

```bash
pnpm install --frozen-lockfile
pnpm dev
```

打开 http://127.0.0.1:4200/ 。开发和预览仅监听loopback；端口占用先停止自己服务或调整配置，不关闭其他任务进程。

```bash
pnpm typecheck      # TypeScript静态检查，不产生代码
pnpm lint           # ESLint规则检查
pnpm format:check   # Prettier检查；pnpm format才会写文件
pnpm test           # 单元与服务边界集成测试
pnpm test:coverage  # 实际V8覆盖率，仅统计所配置模型/服务范围
pnpm build          # 类型检查通过后执行Vite生产构建
pnpm verify:build   # 核对动态入口、未用导出与hidden map
pnpm preview       # 本机预览dist，生产部署另选静态托管
pnpm test:e2e      # 自动启动预览；先完成build，且不要同时占用4200
pnpm check         # lint→格式→覆盖率测试→类型/构建→产物检查
```

本轮Node26.0.0/pnpm11.4.0。engines按依赖交集选择Node24.15+的24分支或26+，不把当前机器版本当Web平台要求。Playwright优先使用本机Chrome或CHROME_PATH；其他机器可另用`pnpm exec playwright install chromium`安装测试浏览器，本轮未下载浏览器。普通HTML服务器不能转译本项目TS，务必使用Vite。

## 看懂目录与依赖

| 文件/目录                                 | 职责                                                      |
| ----------------------------------------- | --------------------------------------------------------- |
| package.json、pnpm-lock.yaml              | 脚本、固定工具版本与完整解析结果；private阻止误发布       |
| src/domain/                               | 运行期解码、纯状态操作、按需统计，不依赖DOM               |
| src/services/                             | 可注入fetch的状态/JSON/协议边界                           |
| src/main.ts、styles.css                   | 原生DOM交互与样式，不假装已经使用Vue组件                  |
| public/fixtures/                          | 正常、坏JSON、坏字段样本；不是真实后端                    |
| tests/unit、integration、e2e              | 分层检查，Vitest只收前两类，Playwright收后一类            |
| vite.config.ts                            | Vite别名、构建、Source Map和开发/预览404教学响应          |
| tsconfig*.json                            | 浏览器源码与Node工具配置分别检查；paths与Vite别名同时配置 |
| eslint/prettier/editorconfig              | 规则、格式与编辑器约定，职责不混淆                        |
| dist、coverage、node_modules、.pnpm-store | 生成物或依赖缓存，不提交                                  |

pnpm11的专有配置放在`pnpm-workspace.yaml`；本实验用`storeDir`固定相对store位置，使安装与后续run一致。`.npmrc`主要用于registry/auth，不能继续用旧写法配置store。不要把实验缓存策略当成所有项目必需。pnpm11本次自动记录了精确的新发布依赖例外清单于pnpm-workspace.yaml，该文件在单包工程也可保存pnpm配置，不代表这里已经搭了monorepo。锁文件和实际配置一同保留；不要为了消除报错随意放开全局策略。

## 先掌握关键区别

1. `decodeTasks(value: unknown)`检查外部数据结构和重复id；`as ReadingTask[]`不能替代它。TS类型通常不留在运行期。
2. Vite会转译TS但不负责类型检查；本工程build脚本显式先运行tsc。仅vite build成功不能证明类型正确。
3. 添加、完成、筛选在内存中；重新加载恢复fixture。输入通过textContent展示，错误时保留重试路径。没有登录、数据库或真实服务端业务。
4. 统计按钮才动态import模块；产物检查验证当前构建实际拆分，并确认一个无副作用未用导出被移除。这不是任意代码都能摇掉的保证。
5. VITE_APP_TITLE是公开客户端配置；没有.env也有默认标题。.env.example可复制到本机.env再重启开发服务器，禁止放真实密钥。
6. hidden Source Map仍是存在的文件，不是保密手段；正式托管的地图公开策略需另行决定。target也不自动补齐浏览器API。
7. 单元测试检查模型边界；集成测试注入fetch模拟传输；E2E在真实浏览器访问本地预览和404教学响应。模拟不等于生产后端实测。

先照正常路径运行，再完成[36项综合任务](./tasks.md)。首次可以保留命令提示，随后独立在副本新增排序/边界样本，说明更改影响哪层测试。不要为了涵盖每个语言特性把主工程改复杂。

## 本项目验收

- [ ] 按锁文件安装；能分别运行typecheck/lint/format/test/build并解释各自职责。
- [ ] 正常数据、HTTP404、坏JSON、错结构得到不同结果；恢复正常后可继续添加。
- [ ] 添加、切换完成、筛选和动态统计一致；恶意形状标题只作为文本。
- [ ] 390px与桌面视口可用，标签与键盘操作保留；模拟视口不称真机。
- [ ] 能用一个真实错误样本说明某项检查会失败，不盲目删除规则或用any压过错误。
- [ ] 理解覆盖率只覆盖配置范围，未覆盖的无用调试导出不必为了100%强造调用。

本工程不安装真实仓库hooks或自动发布。Husky、lint-staged、pack与workspace实验在各章节独立示例，临时Git验证不改本仓库配置。

依据：已先读Modern Web Guidance [Performance](https://developer.chrome.com/docs/modern-web-guidance/guides/performance/performance)与HTML，采用原生语义及真实动态导入；再核对Vite/TS/ESLint/Vitest/Playwright官方文档。核对日期2026-11-24。实际运行与限制见阶段3验收报告，学习者仍需独立实现与排错。
