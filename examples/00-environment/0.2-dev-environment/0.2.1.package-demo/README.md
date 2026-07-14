# 0.2.1 package-demo

对应笔记：[0.2.1 Node.js 与包管理器](../../../notes/00-environment/0.2-dev-environment/0.2.1.node.js.md)

## 运行

```bash
cd examples/00-environment/0.2-dev-environment/0.2.1.package-demo
npm install
npm start
npm run info
```

## 观察要点

1. `npm install` 根据 `package.json` 安装 `chalk`，生成 `node_modules/` 与 `package-lock.json`
2. `npm start` 执行 `scripts.start` → `node index.js`
3. `chalk` 在 `dependencies` 中声明，代码里 `import chalk from 'chalk'` 即可使用

## 练习

- 在 `dependencies` 添加 `dayjs`，在 `index.js` 打印当前时间
- 新增 script `"hello": "echo hello from npm script"` 并运行 `npm run hello`
