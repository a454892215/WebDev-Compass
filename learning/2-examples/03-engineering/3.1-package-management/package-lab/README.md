# 包管理与workspace真实实验

从本目录运行（Node24.15+或26，pnpm11.4.0；本机验证Node26）：

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm workspace
mkdir -p /tmp/stage3-pack
pnpm --filter @compass/math pack --pack-destination /tmp/stage3-pack
```

根包private防误发布；@compass/demo通过workspace:*依赖@compass/math，运行输出total=5。semver是教学断言工具，8个样本覆盖caret/tilde/0.x/预发布边界。

`pnpm pack`只生成本地归档，**未发布任何包**。可用`tar -tzf /tmp/stage3-pack/compass-math-1.0.0.tgz`检查归档；不把pack成功当作注册表权限或发布流程验收。

锁文件与manifest一起提交，node_modules不提交。冻结拒绝实验在临时副本改声明，失败后删除副本；不要改本库锁来制造永久错误。完整复跑见上一级verify.mjs及阶段3构建审查报告。

本实验使用 pnpm 11，`pnpm-workspace.yaml` 的 `storeDir: node_modules/.pnpm-store` 保持安装和运行的缓存位置一致；`.npmrc` 不再接受这些专有配置。通过 `pnpm config get storeDir` 与 `pnpm store path` 核实。参见 [pnpm 11 配置迁移](https://pnpm.io/blog/releases/11.0)（2026-11-24）。
