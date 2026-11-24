# 0.2.1 package-demo

对应笔记：[0.2.1 Node.js 与包管理器](../../../../1-notes/00-environment/0.2-dev-environment/0.2.1.node.js.md)

## 运行

```bash
cd learning/2-examples/00-environment/0.2-dev-environment/0.2.1.package-demo
npm ci  # 依赖尚未安装时按锁文件安装；已就绪无需重复
npm start
npm run info
```

## 观察要点

1. `npm install` 根据 `package.json` 安装 `chalk`，生成 `node_modules/`，必要时更新已有 lock；npm ci 严格使用 lock
                 总结：在项目根目录执行 npm install，会根据 package.json 安装其中声明的依赖（默认包括 dependencies 和 devDependencies），生成 node_modules/，并尽量按 package-lock.json 锁定版本。
2. `npm start` 执行 `scripts.start` → `node index.js`
3. `chalk` 在 `dependencies` 中声明，代码里 `import chalk from 'chalk'` 即可使用

## 练习

- 当前样本已包含 dayjs 并打印时间；独立练习请修改输出格式并说明依赖与导入关系
- 新增 script `"hello": "echo hello from npm script"` 并运行 `npm run hello`
              注释：npm run hello 会把这段当作 shell 命令执行。shell 把第一个词当成命令名

本样本 engines 的下限只是代码兼容说明，不是团队当前版本建议；使用受官方支持的 LTS 并记录实际版本。
