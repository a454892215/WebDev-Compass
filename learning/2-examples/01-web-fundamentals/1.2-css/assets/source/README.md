# 构建型主题的源码与fixture

这些文件用于区分浏览器CSS与构建语法，不是已经运行成功的完整工程。

- Card.module.css 是CSS Modules输入示意；实际局部类名由所用构建工具生成，不应手写依赖hash。
- card.scss 是真实SCSS语法，card.expected.css 是人工审查的预期输出fixture；没有自动执行编译器。
- 1.2.6.4的lesson-*是自有工具类，展示原子化思想，不冒充Tailwind框架输出。

若需要验证Sass工具链，在独立临时环境安装选定版本Dart Sass后，运行 `sass card.scss card.actual.css --no-source-map`，检查实际CSS与预期的语义等价，不按格式化空格比较。记录版本与退出码后才能说构建通过。

CSS Modules可在阶段3的Vite练习中导入此文件，对照实际classes对象与产物选择器。Tailwind按所采用版本的官方安装、源码检测和构建命令验证，不向本零依赖示例插入CDN脚本。

返回[CSS示例目录](../../README.md)。
