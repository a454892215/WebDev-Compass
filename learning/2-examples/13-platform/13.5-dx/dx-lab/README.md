# 开发工具实验

Node26.0.0/pnpm11.4.0；官方registry核对ESLint10.15.0、jscodeshift17.4.0。仅本地文件/AST，无HTTP、浏览器或真实账户。

```bash
pnpm install --frozen-lockfile
pnpm test
```

七组实际检查：

1. RuleTester：3个合法/4个禁止import/re-export/dynamic-literal，固定messageId。
2. 真实ESLint Flat Config：目标domain文件生效、合法与违规、目录作用域。
3. 真实jscodeshift AST：只改@demo/core的value命名导出，保留local/alias/shadow/object/其他模块/type-only，重跑幂等及解析失败。
4. 真实jscodeshift CLI：只写临时fixture，二次一致，--fail-on-error让非法语法非零。
5. 生成器：临时正常输出、sentinel/目录/symlink拒覆盖、非法名称拒绝、实际CLI。
6. VSCode workspace/snippets：仅JSON结构/相对路径/placeholder静态检查，没有打开编辑器。
7. 共享配置包：真实pnpm pack并解到临时目录，从包加载规则，再lintText确认拒绝；无registry发布。

规则只声明JS静态模块字面量的特定模式，不是全解析器/沙箱，也不覆盖TS/Vue或所有alias/computed/CJS。主工程边界gate与本lab分开。

迁移保留local绑定是有意选择，假设newTitle调用签名兼容；不是把所有引用改名。本轮修正过Recast shorthand range问题：整体替换ImportSpecifier而非只改imported，避免生成newTitle却调用oldTitle。真实CLI已验证。

generate.mjs只接受小写字母起始、最多40位的字母/数字/连字符；调用者先准备可信空根目录，再执行node generate.mjs <已有根目录> <新项目名>。不自动安装、Git或下载模板，无force；本例信任根目录且不防御并发恶意文件系统替换的全部竞态。

templates是可复制审查模板：workspace路径相对其文件目录；snippet需复制到目标.vscode或用户snippets后才加载。扩展推荐不会强制安装或代替CI，真实编辑器/扩展行为未运行。

所有测试临时目录finally清理；依赖/缓存/产物不提交。没有生成外部宿主项目、改全局VSCode配置、安装扩展、执行远程transform或发布npm包。
