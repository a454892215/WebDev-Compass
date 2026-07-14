/**
 * 0.2.1 配套示例 — Node.js 与 npm 依赖
 * 运行：npm install && npm start
 */
import chalk from 'chalk';

const pkg = {
  name: '0.2.1-package-demo',
  lesson: 'Node.js 在终端运行 JS；npm 管理 chalk 等第三方包',
};

console.log(chalk.cyan.bold('\n=== WebDev Compass · 0.2.1 Node/npm 演示 ===\n'));
console.log(chalk.green('✓ Node 版本:'), process.version);
console.log(chalk.green('✓ 当前目录:'), process.cwd());
console.log(chalk.yellow('\n项目信息:'));
console.log(JSON.stringify(pkg, null, 2));

console.log(chalk.gray('\n提示: 打开 package.json 查看 scripts 与 dependencies'));
console.log(chalk.gray('尝试: npm run info\n'));
