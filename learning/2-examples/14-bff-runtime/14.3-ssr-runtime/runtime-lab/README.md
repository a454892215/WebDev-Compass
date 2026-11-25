# SSR边界模型与真实HTTP流实验

Node22+（本轮26.0.0），无外部依赖。从本目录运行：

~~~sh
node --test test.mjs
~~~

六项测试分别验证请求局部交错、头部白名单、并行启动、真实HTTP首块/完成、提交头前后错误和断开清理。runtime.mjs给出实现，test.mjs给出可核对输入与断言。

前三项为独立Node机制模型；后三项启动随机127.0.0.1端口验证真实HTTP字节与关闭，测试结束自动释放。没有运行Next或Nuxt组件HTML Streaming，也没有浏览器增量UI、CDN和生产代理。Nuxt实际会话/SSR隔离与聚合另见[主项目](../../../../4-practice/14-bff-runtime/README.md)。网络块不等于NDJSON行，200不等于协议done，客户端半行缓冲列为新增练习。

[返回操作卡](../README.md)
