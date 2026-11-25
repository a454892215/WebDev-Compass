# 发布与依赖治理实验

Node26.0.0/pnpm11.4.0；真实Changesets CLI3.0.3，semver测试用版本来自本地缓存。此目录是独立小工程，不在知识库根目录安装。

~~~bash
pnpm install --frozen-lockfile --offline
pnpm test
pnpm verify
~~~

首次没有缓存时按受控源准备依赖；offline要求相应归档已在store。pnpm供应链策略仍可能查询元数据，不能把offline写成绝无网络；网络不可用时明确失败前提，不关闭策略。本轮最后验证允许读取官方npm元数据，无token或远程写入。

verify每次创建/删除自己的临时workspace：
1. core/widget/host纯本地依赖安装和冻结成功。
2. 只将host的workspace:*声明改成workspace:^，真正冻结因OUTDATED_LOCKFILE失败；恢复后冻结通过且锁字节不变。DNS/超时不计成功负例。
3. core major changeset由真实CLI version得到core2.0.0/widget1.0.1及changelog。CLI3 init交互，本脚本从已安装默认配置生成确定临时config，commit:false。
4. 真正pnpm pack widget，tar中core为^2.0.0而源仍workspace:^。只打包，不运行publish或创建registry、tag/push。
5. 另一个临时工程真实catalog解析semver6.3.2；然后普通依赖+override解析7.8.6。显式开发重解析临时锁，再冻结通过。故意跨major只证明强制解析，不证明兼容；两机制隔离，不声称组合优先级或所有selector适用。

本地3个Node测试是升级政策模型：major/peer人工迁移，失败检查/未保护分支hold，安全更新加速评审而非自动批准。不是Renovate/Dependabot真实PR或合并。

templates目录是评审与官方观察：
- npmrc.example/publish-package.json.example需替换实际scope/registry，并按平台权限管理token环境变量，不把真实令牌放仓库、日志或缓存；未连接GitHub Packages/Artifactory/Verdaccio。
- dependabot.yml.example与renovate.json.example供实际JS项目接入前审查。当前不放到本指南根目录启用，也不配置真实自动合并。各Bot任选，不需要同时运行。
- GitHub Packages npm认证规则与npmjs OIDC不同，不能用统一口号替代平台核对。

不恢复Docker/Colima、不跑云CI、不修改旧阶段或主实践版本、不接真实账户/凭据。临时目录finally删除，包归档不留教材；若命令超30秒即报错，先查日志/网络，不把超时当锁或版本验证成功。
