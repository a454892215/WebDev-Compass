# Vite8 + TypeScript真实实验

Node24.15+或26，pnpm11.4.0；本轮固定Vite8.3.8、TypeScript6.0.3，不追随latest。类型检查与Vite转换独立。

```bash
# 进入本目录
pnpm install --frozen-lockfile
pnpm typecheck
pnpm build
pnpm check:output
pnpm dev
# 打开 http://127.0.0.1:4201/
# 另可 pnpm preview，在4202预览dist；不是生产部署
```

1. 点击计数到3，修改`src/message.ts`，文字改变而计数保持3；HMR只覆盖本例accept边界，其他变化可能整页刷新。
2. 点击按需统计，实际加载stats chunk；打包检查确认至少两个JS资产和未用纯导出被去除。
3. `public/mark.svg`按原名复制；应用通过`BASE_URL + mark.svg`消费，静态HTML检查不解析JS动态URL，浏览器与产物断言验证实际资源。
4. `.env.example`仅公开示例。若复制到本地`.env`，只填公开标签，重启dev server观察；不得放密钥，`.env`不提交。测试通过进程环境注入固定公开标签。
5. `build.sourcemap:true`生成可解析map；发布策略需另外审查，map存在不等于所有断点映射已人工验收。
6. `webpack.config.cjs`仅作旧工具配置阅读，本轮不安装Webpack或声称运行其构建。

真实验证脚本在上一级verify.mjs。它会启动自己的dev/preview、改变并恢复本实验message文件，在临时副本制造类型错误，完成后关闭自己进程；不要与手工编辑同一文件同时运行。Playwright是外部QA工具，不作为课程运行依赖。

本实验使用 pnpm 11，`pnpm-workspace.yaml` 的 `storeDir: node_modules/.pnpm-store` 保持安装和运行的缓存位置一致；`.npmrc` 不再接受这些专有配置。通过 `pnpm config get storeDir` 与 `pnpm store path` 核实。参见 [pnpm 11 配置迁移](https://pnpm.io/blog/releases/11.0)（2026-11-24）。
