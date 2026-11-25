# Node运行时实验

无第三方依赖，Node22+；本轮实际Node26.0.0。仓库根目录执行：

~~~sh
node learning/2-examples/14-bff-runtime/14.1-node-runtime/node-lab/verify.mjs
~~~

- loop.cjs / loop.mjs：模块求值、nextTick/微任务和I/O回调内调度，断言不泛化为所有timer竞速。
- stream.mjs：相同32KiB输入的背压/无背压队列对照，以及真实pipeline写错清理；不是RSS基准。
- cpu.mjs / worker.mjs：有界求和、非法输入、错误、超时和终止；一次性线程，不是生产线程池。
- config.mjs / config-cli.mjs：严格字符串转换、私有配置与公开投影、临时env-file与宿主优先级。fixture不是凭据。
- processes.mjs：真实cluster两个子进程，各自count=1、双正常退出；无HTTP监听、数据库或PM2。
- pm2-observe.config.cjs：选修配置阅读，不会由验证器启动。要用于真实Nuxt服务必须结合部署平台、就绪、排空与共享状态另验收。

完整断言在verify.mjs。生成内容只在dist/，每次覆盖报告并删除临时配置。普通实验可单独运行node loop.cjs、node loop.mjs、node processes.mjs（在本目录下）；其余是由verify导入的模块。不要把源码文件名当成生产服务命令。

故障练习在副本中进行，不要提交故意失败的代码。遇到超时先检查具体子进程；验证器单次子进程有6秒上限，cluster另有4秒退出兜底。实验不运行后台守护程序，不改机器环境变量、系统配置或用户缓存。

[返回操作卡索引](../README.md)
