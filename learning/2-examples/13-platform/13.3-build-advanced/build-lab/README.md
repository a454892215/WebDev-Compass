# 构建实验

Node26/pnpm11；Vite8.3.8、TypeScript6.0.3、Playwright1.65.1固定，默认已安装macOS Chrome，可用CHROME_PATH指定。只用公开合成标签，服务loopback4553。

~~~bash
pnpm install --frozen-lockfile
pnpm build
pnpm test
pnpm verify
~~~

真实机制：
- plugin.mjs精确resolve/load virtual:build-info并用JSON.stringify发公开常量，generateBundle输出build-audit.json；Vite另生成.vite/manifest.json。没有把process.env全展开进浏览器。
- cache.mjs是显式本地产物缓存wrapper，不是Vite dev依赖优化器、Rolldown内部持久缓存或远程缓存。固定输入清单包含app/CSS/HTML/plugin/config/cache代码/package/lock，加Node/Vite/platform/arch和公开label。新增入口/环境/插件依赖必须扩展输入；不是通用依赖图分析器。
- verify真实构建cold、删除输出后warm恢复、改label/源失效、改缓存内容校验失败后重建。hash用于一致性不是签名/来源认证；不从不可信远程缓存直接执行。计时是一次本地小样本，不承诺普遍加速。
- library生成.mjs/.cjs及.d.ts/.d.cts，临时ESM/CJS消费者通过包exports实际import/require并真实tsc检查。当前声明没有相对模块图，才可同内容复制.d.cts；复杂双格式库需分别生成/验证，不能机械改后缀。
- 额外故意错误TS由Vite成功转换发JS，tsc报告TS2322，说明快速转换不等于类型正确。没有运行esbuild/SWC API，不因安装树含其名字就推导执行。
- 390/1440 Chrome验证虚拟值、manifest、键盘计数/无溢出/无pageerror，finally关闭。无新浏览器、真实账号、厂商遥测或外站请求。

library/dist、dist、artifacts、node_modules与store均忽略。根README以text/plain提供，仅是说明导航，不当页面执行。Module Federation另见13.3.1官方观察，实验没有假装通过普通动态import实现MF。
